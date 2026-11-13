import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { IconDownload, IconPen, IconTrash } from "@/components/ui/icons";

export default function TooltipDemo() {
  return (
    // TooltipProvider достаточно положить один раз в корень приложения
    <TooltipProvider>
      <div style={{ display: "flex", gap: 8 }}>
        <Tooltip content="Редактировать">
          <Button variant="ghost" iconOnly aria-label="Редактировать">
            <IconPen />
          </Button>
        </Tooltip>
        <Tooltip content="Скачать отчёт в .xlsx" side="bottom">
          <Button variant="ghost" iconOnly aria-label="Скачать отчёт">
            <IconDownload />
          </Button>
        </Tooltip>
        <Tooltip content="Удалить безвозвратно" side="right">
          <Button variant="ghost" tone="danger" iconOnly aria-label="Удалить">
            <IconTrash />
          </Button>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
