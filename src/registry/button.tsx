import * as React from "react";
import "./button.css";

export type ButtonVariant = "fill" | "secondary" | "ghost" | "text";
export type ButtonColor = "primary" | "neutral" | "error" | "warning" | "success";
export type ButtonSize = "large" | "medium" | "small" | "tiny";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** fill — залитая, secondary — полупрозрачная, ghost — контурная, text — текстовая */
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  /** Иконка слева от текста */
  leftIcon?: React.ReactNode;
  /** Иконка справа от текста */
  rightIcon?: React.ReactNode;
  /** Квадратная кнопка только с иконкой (передайте иконку в children) */
  iconOnly?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "fill",
      color = "primary",
      size = "medium",
      leftIcon,
      rightIcon,
      iconOnly = false,
      fullWidth = false,
      className,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const classes = [
      "cs-button",
      `cs-button--${variant}`,
      `cs-button--${color}`,
      `cs-button--${size}`,
      iconOnly && "cs-button--icon-only",
      fullWidth && "cs-button--full",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} type={type} className={classes} {...props}>
        {!iconOnly && leftIcon && <span className="cs-button__icon">{leftIcon}</span>}
        {iconOnly ? <span className="cs-button__icon">{children}</span> : children}
        {!iconOnly && rightIcon && <span className="cs-button__icon">{rightIcon}</span>}
      </button>
    );
  },
);
Button.displayName = "Button";
