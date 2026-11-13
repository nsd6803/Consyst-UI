import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { IconChevronDown } from "./icons";
import { cn } from "./utils";
import "./accordion.css";

export interface AccordionItemData {
  value: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

type AccordionProps = {
  items: AccordionItemData[];
  /** Обёртка: plain — разделители, card — каждая секция в рамке */
  variant?: "plain" | "card";
  className?: string;
} & (
  | { type?: "single"; defaultValue?: string; value?: string; onValueChange?: (v: string) => void; collapsible?: boolean }
  | { type: "multiple"; defaultValue?: string[]; value?: string[]; onValueChange?: (v: string[]) => void }
);

/** Раскрывающиеся секции: FAQ, детали заявки, группы настроек. Клавиатура и ARIA — из Radix */
export function Accordion({ items, variant = "plain", className, ...props }: AccordionProps) {
  const rootProps = props.type === "multiple" ? props : { collapsible: true, ...props, type: "single" as const };
  return (
    <AccordionPrimitive.Root
      {...(rootProps as React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>)}
      className={cn("cs-accordion", `cs-accordion--${variant}`, className)}
    >
      {items.map((it) => (
        <AccordionPrimitive.Item key={it.value} value={it.value} disabled={it.disabled} className="cs-accordion__item">
          <AccordionPrimitive.Header className="cs-accordion__header">
            <AccordionPrimitive.Trigger className="cs-accordion__trigger">
              <span>{it.title}</span>
              <IconChevronDown size={12} className="cs-accordion__chevron" />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="cs-accordion__content">
            <div className="cs-accordion__inner">{it.content}</div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
