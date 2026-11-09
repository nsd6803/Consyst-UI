import * as React from "react";
import { IconBell, IconChevronDown, IconRocket } from "./icons";
import "./header.css";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Название продукта рядом с логотипом */
  productName?: React.ReactNode;
  /** Иконка логотипа */
  logo?: React.ReactNode;
  /** Действия слева от колокольчика: иконки или текстовые ссылки */
  actions?: React.ReactNode;
  avatarSrc?: string;
  userName?: string;
  /** Есть непрочитанные уведомления */
  hasNotifications?: boolean;
  onNotificationsClick?: () => void;
  onUserClick?: () => void;
}

export function Header({
  productName = "ПроДвижение",
  logo = <IconRocket size={22} />,
  actions,
  avatarSrc,
  userName = "Пользователь",
  hasNotifications = false,
  onNotificationsClick,
  onUserClick,
  className,
  ...props
}: HeaderProps) {
  return (
    <header className={["cs-header", className].filter(Boolean).join(" ")} {...props}>
      <a className="cs-header__brand" href="/">
        <span className="cs-header__logo">{logo}</span>
        <span className="cs-header__name">{productName}</span>
      </a>
      <div className="cs-header__right">
        {actions && <div className="cs-header__actions">{actions}</div>}
        <button type="button" className="cs-header__icon-btn" onClick={onNotificationsClick} aria-label="Уведомления">
          <IconBell size={16} />
          {hasNotifications && <span className="cs-header__badge" />}
        </button>
        <button type="button" className="cs-header__user" onClick={onUserClick} aria-label={userName}>
          {avatarSrc ? (
            <img className="cs-header__avatar" src={avatarSrc} alt="" />
          ) : (
            <span className="cs-header__avatar cs-header__avatar--initials">{userName.slice(0, 1)}</span>
          )}
          <IconChevronDown size={14} />
        </button>
      </div>
    </header>
  );
}

/** Иконка-действие в шапке */
export function HeaderAction({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={["cs-header__icon-btn", className].filter(Boolean).join(" ")} {...props} />;
}

/** Текстовое действие в шапке */
export function HeaderLink({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={["cs-header__link", className].filter(Boolean).join(" ")} {...props} />;
}
