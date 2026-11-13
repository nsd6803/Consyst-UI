import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import "./tooltip.css";

/** Оберните приложение один раз — общая задержка для всех тултипов */
export const TooltipProvider = TooltipPrimitive.Provider;

export interface TooltipProps {
  content: React.ReactNode;
  /** Элемент, который получает фокус/наведение (кнопка, иконка с tabIndex) */
  children: React.ReactElement;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delay?: number;
}

/**
 * Короткая подсказка по наведению и фокусу клавиатурой.
 * Не кладите в тултип важную информацию и интерактивные элементы — для этого Popover.
 */
export function Tooltip({ content, children, side = "top", align = "center", delay = 300 }: TooltipProps) {
  return (
    <TooltipPrimitive.Root delayDuration={delay}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content side={side} align={align} sideOffset={6} className="cs-tooltip">
          {content}
          <TooltipPrimitive.Arrow className="cs-tooltip__arrow" width={10} height={5} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
