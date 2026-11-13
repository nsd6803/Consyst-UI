import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { IconX } from "./icons";
import { cn } from "./utils";
import "./modal.css";

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  /** Пояснение под заголовком (читается скринридером как описание окна) */
  description?: React.ReactNode;
  children?: React.ReactNode;
  /** Кнопки внизу. Главное действие — справа */
  footer?: React.ReactNode;
  /** sm 400 · md 520 · lg 720 · xl 960 */
  size?: "sm" | "md" | "lg" | "xl";
  /** Крестик в углу */
  closable?: boolean;
  /** Запретить закрытие кликом по фону (для форм с несохранёнными данными) */
  dismissible?: boolean;
  /** Кнопка, открывающая модалку (необязательно — можно управлять через open) */
  trigger?: React.ReactNode;
  className?: string;
}

/**
 * Модальное окно на Radix Dialog: фокус-ловушка, возврат фокуса, Esc,
 * блокировка прокрутки страницы, aria-labelledby/aria-describedby.
 */
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
  closable = true,
  dismissible = true,
  trigger,
  className,
}: ModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="cs-modal-overlay" />
        <DialogPrimitive.Content
          className={cn("cs-modal", `cs-modal--${size}`, className)}
          onPointerDownOutside={(e) => !dismissible && e.preventDefault()}
          {...(!description && { "aria-describedby": undefined })}
        >
          <div className="cs-modal__header">
            <DialogPrimitive.Title className="cs-modal__title">{title}</DialogPrimitive.Title>
            {description && <DialogPrimitive.Description className="cs-modal__description">{description}</DialogPrimitive.Description>}
          </div>
          {children && <div className="cs-modal__body">{children}</div>}
          {footer && <div className="cs-modal__footer">{footer}</div>}
          {closable && (
            <DialogPrimitive.Close className="cs-modal__close" aria-label="Закрыть">
              <IconX />
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

/** Кнопка, закрывающая модалку (оберните свою кнопку: <ModalClose asChild><Button/></ModalClose>) */
export const ModalClose = DialogPrimitive.Close;

/** Точки-индикатор шагов для пошаговых модалок (онбординг) */
export function ModalSteps({ count, current }: { count: number; current: number }) {
  return (
    <div className="cs-modal-steps" role="img" aria-label={`Шаг ${current + 1} из ${count}`}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={cn("cs-modal-steps__dot", i === current && "cs-modal-steps__dot--active")} />
      ))}
    </div>
  );
}
