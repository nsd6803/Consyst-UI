import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "./utils";
import "./popover.css";

/**
 * Всплывающая панель по клику: фильтры, быстрые формы, подробности.
 * Popover > PopoverTrigger (asChild) + PopoverContent
 */
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverClose = PopoverPrimitive.Close;

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & { title?: React.ReactNode }
>(({ className, sideOffset = 6, align = "start", title, children, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content ref={ref} sideOffset={sideOffset} align={align} className={cn("cs-popover", className)} {...props}>
      {title && <p className="cs-popover__title">{title}</p>}
      {children}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = "PopoverContent";
