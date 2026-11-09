import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { IconInfo } from "@/components/ui/icons";

export default function TooltipDemo() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <Tooltip content="Скачать отчёт в .xls">
        <Button variant="ghost" size="small">
          Наведи на меня
        </Button>
      </Tooltip>
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side} content={`side="${side}"`} side={side}>
          <span tabIndex={0} style={{ color: "var(--color-icon-secondary)", display: "inline-flex" }}>
            <IconInfo />
          </span>
        </Tooltip>
      ))}
    </div>
  );
}
