import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./utils";
import "./button.css";

export type ButtonVariant = "primary" | "secondary" | "soft" | "ghost" | "link";
export type ButtonTone = "default" | "danger" | "success";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * primary — главное действие (одно на экран/форму)
   * secondary — второстепенное (нейтральная заливка), soft — альтернативное (тонированная заливка),
   * ghost — в тулбарах и таблицах, link — как ссылка
   */
  variant?: ButtonVariant;
  /** Смысловой цвет: danger — удаление/отклонение, success — согласование */
  tone?: ButtonTone;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Квадратная кнопка-иконка. Обязательно передайте aria-label */
  iconOnly?: boolean;
  /** Показывает индикатор и блокирует кнопку */
  loading?: boolean;
  fullWidth?: boolean;
  /** Отрисовать дочерний элемент (например, <a>) со стилями кнопки */
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      tone = "default",
      size = "md",
      leftIcon,
      rightIcon,
      iconOnly = false,
      loading = false,
      fullWidth = false,
      asChild = false,
      disabled,
      className,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const classes = cn(
      "cs-button",
      `cs-button--${variant}`,
      tone !== "default" && `cs-button--${tone}`,
      `cs-button--${size}`,
      iconOnly && "cs-button--icon-only",
      loading && "cs-button--loading",
      fullWidth && "cs-button--full",
      className,
    );

    if (asChild) {
      return (
        <Slot ref={ref} className={classes} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && <span className="cs-button__spinner" aria-hidden="true" />}
        {!loading && leftIcon && <span className="cs-button__icon">{leftIcon}</span>}
        {iconOnly ? !loading && <span className="cs-button__icon">{children}</span> : <span className="cs-button__label">{children}</span>}
        {!iconOnly && rightIcon && <span className="cs-button__icon">{rightIcon}</span>}
      </button>
    );
  },
);
Button.displayName = "Button";
