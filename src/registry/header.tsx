import * as React from "react";
import { IconArrowRightFromBracket, IconBell, IconChevronDown, IconCircleUser } from "./icons";
import { ProDvizhenieLogo } from "./logo";
import { Avatar } from "./avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { cn } from "./utils";
import "./header.css";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Логотип слева. По умолчанию — «ПроДвижение» */
  logo?: React.ReactNode;
  homeHref?: string;
  /** Действия слева от колокольчика: HeaderAction (иконки) или HeaderLink (текст) */
  actions?: React.ReactNode;
  /** ФИО — показывается в шапке меню пользователя, в самой шапке только аватар */
  userName: string;
  /** Роль под ФИО в меню: «Кадровый администратор» */
  userRole?: string;
  avatarSrc?: string;
  /** Число непрочитанных уведомлений: бейдж на колокольчике и счётчик в меню */
  notifications?: number;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  onLogout?: () => void;
  /** Дополнительные пункты меню (DropdownMenuItem) — между «Уведомления» и «Выйти» */
  userMenu?: React.ReactNode;
}

/** Шапка приложения: логотип, действия, уведомления, аватар с меню пользователя */
export function Header({
  logo = <ProDvizhenieLogo />,
  homeHref = "/",
  actions,
  userName,
  userRole,
  avatarSrc,
  notifications = 0,
  onNotificationsClick,
  onProfileClick,
  onLogout,
  userMenu,
  className,
  ...props
}: HeaderProps) {
  return (
    <header className={cn("cs-header", className)} {...props}>
      <div className="cs-header__row">
        <a className="cs-header__brand" href={homeHref} aria-label="На главную">
          {logo}
        </a>
        <div className="cs-header__right">
          {actions && (
            <>
              <div className="cs-header__actions">{actions}</div>
              <span className="cs-header__divider" aria-hidden="true" />
            </>
          )}
          <button
            type="button"
            className="cs-header__icon-btn cs-header__bell"
            onClick={onNotificationsClick}
            aria-label={notifications ? `Уведомления, новых: ${notifications}` : "Уведомления"}
          >
            <IconBell size={16} />
            {notifications > 0 && <span className="cs-header__badge" aria-hidden="true" />}
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className="cs-header__user" aria-label={`Меню пользователя: ${userName}`}>
                <Avatar name={userName} src={avatarSrc} size="md" />
                <IconChevronDown size={16} className="cs-header__chevron" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="cs-header__menu">
              <div className="cs-header__menu-user">
                <span className="cs-header__menu-name">{userName}</span>
                {userRole && <span className="cs-header__menu-role">{userRole}</span>}
              </div>
              <div className="cs-header__menu-items">
                <DropdownMenuItem icon={<IconCircleUser />} onSelect={onProfileClick}>
                  Профиль
                </DropdownMenuItem>
                <DropdownMenuItem icon={<IconBell />} onSelect={onNotificationsClick}>
                  Уведомления
                  {notifications > 0 && <span className="cs-header__menu-counter">{notifications > 99 ? "99+" : notifications}</span>}
                </DropdownMenuItem>
                {userMenu}
                <DropdownMenuItem icon={<IconArrowRightFromBracket />} onSelect={onLogout}>
                  Выйти
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

/** Иконка-действие в шапке. Обязательно передайте aria-label */
export function HeaderAction({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={cn("cs-header__icon-btn", className)} {...props} />;
}

/** Текстовое действие в шапке */
export function HeaderLink({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={cn("cs-header__link", className)} {...props} />;
}
