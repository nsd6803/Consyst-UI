import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IconChevronDown, IconCircleCheck, IconCopy, IconPen, IconRotate, IconTrash } from "@/components/ui/icons";

export default function DropdownMenuDemo() {
  const [cols, setCols] = useState({ mentor: true, university: true, period: false });
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="soft" rightIcon={<IconChevronDown />}>
            Действия
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem icon={<IconCircleCheck />}>Согласовать</DropdownMenuItem>
          <DropdownMenuItem icon={<IconRotate />}>На доработку</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem icon={<IconPen />} shortcut="Ctrl+E">
            Редактировать
          </DropdownMenuItem>
          <DropdownMenuItem icon={<IconCopy />} disabled>
            Дублировать
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem icon={<IconTrash />} danger>
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" rightIcon={<IconChevronDown />}>
            Колонки
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Показывать в таблице</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={cols.mentor} onCheckedChange={(v) => setCols({ ...cols, mentor: v })}>
            Наставник
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={cols.university} onCheckedChange={(v) => setCols({ ...cols, university: v })}>
            ВУЗ
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={cols.period} onCheckedChange={(v) => setCols({ ...cols, period: v })}>
            Период
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
