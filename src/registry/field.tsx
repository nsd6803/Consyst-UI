import * as React from "react";
import { cn } from "./utils";
import "./field.css";

/* ------------------------------------------------------------------ */
/* Контекст поля: связывает подпись, подсказку и ошибку с контролом    */
/* ------------------------------------------------------------------ */

interface FieldContextValue {
  id: string;
  descriptionId?: string;
  errorId?: string;
  invalid: boolean;
  disabled?: boolean;
  required?: boolean;
  /** Подпись поля — контрол может забрать её внутрь (плавающая подпись) */
  label?: React.ReactNode;
  floating: boolean;
  claimLabel: () => () => void;
}
const FieldContext = React.createContext<FieldContextValue | null>(null);

/**
 * Подставляет в контрол id, aria-describedby, aria-invalid, disabled и required
 * из ближайшего <Field>. Используется внутри Input, Textarea, Select и др.
 */
export function useFieldControl<T extends { id?: string; disabled?: boolean; required?: boolean }>(
  props: T & { invalid?: boolean; "aria-describedby"?: string },
) {
  const field = React.useContext(FieldContext);
  const invalid = props.invalid ?? field?.invalid ?? false;
  const describedBy = [props["aria-describedby"], field?.descriptionId, field?.errorId].filter(Boolean).join(" ") || undefined;
  return {
    id: props.id ?? field?.id,
    disabled: props.disabled ?? field?.disabled,
    required: props.required ?? field?.required,
    invalid,
    "aria-invalid": invalid || undefined,
    "aria-describedby": describedBy,
  };
}

/**
 * Плавающая подпись: подпись стоит внутри поля как плейсхолдер и при фокусе
 * или вводе уезжает наверх. Контрол вызывает хук и рисует <FloatingLabel>.
 * Берёт собственный label контрола или подпись ближайшего <Field>
 * (тогда Field не рисует подпись сверху). Размер sm не поддерживает
 * плавающую подпись — для него подпись остаётся над полем.
 */
export function useFloatingLabel(ownLabel: React.ReactNode | undefined, size: "sm" | "md" | "lg" = "md") {
  const field = React.useContext(FieldContext);
  const fromField = ownLabel === undefined && !!field?.floating && field.label != null && size !== "sm";
  const claim = field?.claimLabel;
  React.useLayoutEffect(() => {
    if (fromField && claim) return claim();
  }, [fromField, claim]);
  const label = ownLabel ?? (fromField ? field?.label : undefined);
  return { label, floating: label != null && size !== "sm", required: field?.required };
}

export function FloatingLabel({
  htmlFor,
  id,
  required,
  children,
  as = "label",
}: {
  htmlFor?: string;
  id?: string;
  required?: boolean;
  children: React.ReactNode;
  /** span — когда подпись внутри кнопки (Select), где label недопустим */
  as?: "label" | "span";
}) {
  const Comp = as;
  return (
    <Comp className="cs-control__label" htmlFor={as === "label" ? htmlFor : undefined} id={id}>
      {children}
      {required && (
        <span className="cs-label__required" aria-hidden="true">
          *
        </span>
      )}
    </Comp>
  );
}

/* ------------------------------------------------------------------ */

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ required, className, children, ...props }: LabelProps) {
  return (
    <label className={cn("cs-label", className)} {...props}>
      {children}
      {required && (
        <span className="cs-label__required" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

/* ------------------------------------------------------------------ */

export interface FieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Подпись поля. Для Input, Textarea, Select и MultiSelect она стоит внутри поля и уезжает наверх при фокусе */
  label?: React.ReactNode;
  /** floating — подпись внутри поля (по умолчанию), top — всегда над полем */
  labelPlacement?: "floating" | "top";
  /** Подсказка под полем */
  description?: React.ReactNode;
  /** Текст ошибки. Если передан — поле подсвечивается и читается скринридером */
  error?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  /** Своё id для контрола (иначе создаётся автоматически) */
  id?: string;
  /** horizontal — подпись слева (для плотных форм настроек) */
  orientation?: "vertical" | "horizontal";
  children: React.ReactNode;
}

export function Field({
  label,
  description,
  error,
  required,
  disabled,
  id,
  orientation = "vertical",
  labelPlacement = "floating",
  className,
  children,
  ...props
}: FieldProps) {
  const [claimed, setClaimed] = React.useState(0);
  const claimLabel = React.useCallback(() => {
    setClaimed((n) => n + 1);
    return () => setClaimed((n) => n - 1);
  }, []);
  const floating = labelPlacement === "floating" && orientation === "vertical";
  const autoId = React.useId();
  const controlId = id ?? `field-${autoId}`;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;

  return (
    <FieldContext.Provider value={{ id: controlId, descriptionId, errorId, invalid: !!error, disabled, required, label, floating, claimLabel }}>
      <div className={cn("cs-field", `cs-field--${orientation}`, disabled && "cs-field--disabled", className)} {...props}>
        {label && !(floating && claimed > 0) && (
          <Label htmlFor={controlId} required={required} className="cs-field__label">
            {label}
          </Label>
        )}
        <div className="cs-field__body">
          {children}
          {error ? (
            <p id={errorId} className="cs-field__error" role="alert">
              {error}
            </p>
          ) : (
            description && (
              <p id={descriptionId} className="cs-field__description">
                {description}
              </p>
            )
          )}
        </div>
      </div>
    </FieldContext.Provider>
  );
}
