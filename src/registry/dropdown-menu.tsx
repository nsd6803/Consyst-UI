import * as React from "react";
import * as Menu from "@radix-ui/react-dropdown-menu";
import { IconCheck } from "./icons";
import { cn } from "./utils";
import "./menu.css";

/**
 * Меню действий (⋯ в строке таблицы, меню пользователя).
 * Составной компонент: DropdownMenu > DropdownMenuTrigger + DropdownMenuContent > DropdownMenuItem
 */
export const DropdownMenu = Menu.Root;
export const DropdownMenuTrigger = Menu.Trigger;
export const DropdownMenuGroup = Menu.Group;

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof Menu.Content>,
  React.ComponentPropsWithoutRef<typeof Menu.Content>
>(({ className, sideOffset = 4, align = "end", ...props }, ref) => (
  <Menu.Portal>
    <Menu.Content ref={ref} sideOffset={sideOffset} align={align} className={cn("cs-menu", className)} {...props} />
  </Menu.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

export interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof Menu.Item> {
  icon?: React.ReactNode;
  shortcut?: string;
  /** Опасное действие (удалить, отклонить) */
  danger?: boolean;
}

export const DropdownMenuItem = React.forwardRef<React.ElementRef<typeof Menu.Item>, DropdownMenuItemProps>(
  ({ icon, shortcut, danger, className, children, ...props }, ref) => (
    <Menu.Item ref={ref} className={cn("cs-menu-item", danger && "cs-menu-item--danger", className)} {...props}>
      {icon && <span className="cs-menu-item__icon">{icon}</span>}
      <span className="cs-menu-item__text">{children}</span>
      {shortcut && <span className="cs-menu-item__shortcut">{shortcut}</span>}
    </Menu.Item>
  ),
);
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof Menu.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof Menu.CheckboxItem>
>(({ className, children, ...props }, ref) => (
  <Menu.CheckboxItem ref={ref} className={cn("cs-menu-item", className)} onSelect={(e) => e.preventDefault()} {...props}>
    <span className="cs-menu-item__box">
      <IconCheck />
    </span>
    <span className="cs-menu-item__text">{children}</span>
  </Menu.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

export function DropdownMenuLabel({ className, ...props }: React.ComponentPropsWithoutRef<typeof Menu.Label>) {
  return <Menu.Label className={cn("cs-menu__group-label", className)} {...props} />;
}

export function DropdownMenuSeparator({ className, ...props }: React.ComponentPropsWithoutRef<typeof Menu.Separator>) {
  return <Menu.Separator className={cn("cs-menu__separator", className)} {...props} />;
}
