import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "./utils";
import "./avatar.css";

export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  src?: string;
  /** ФИО — из него строятся инициалы и alt */
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

/** Цвет фона инициалов стабилен для одного имени */
const tones = ["primary", "success", "warning", "accent", "info"] as const;
const toneFor = (name: string) => tones[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % tones.length];

export function Avatar({ src, name, size = "md", className, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root className={cn("cs-avatar", `cs-avatar--${size}`, `cs-avatar--${toneFor(name)}`, className)} {...props}>
      {src && <AvatarPrimitive.Image className="cs-avatar__image" src={src} alt={name} />}
      <AvatarPrimitive.Fallback className="cs-avatar__fallback" delayMs={src ? 300 : 0} aria-label={name}>
        {initials(name)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Сколько аватаров показать, остальные — «+N» */
  max?: number;
  size?: AvatarProps["size"];
  children: React.ReactElement<AvatarProps>[];
}

export function AvatarGroup({ max = 4, size = "md", className, children, ...props }: AvatarGroupProps) {
  const visible = children.slice(0, max);
  const rest = children.length - visible.length;
  return (
    <div className={cn("cs-avatar-group", className)} {...props}>
      {visible.map((child) => React.cloneElement(child, { size }))}
      {rest > 0 && <span className={cn("cs-avatar", `cs-avatar--${size}`, "cs-avatar--more")}>+{rest}</span>}
    </div>
  );
}
