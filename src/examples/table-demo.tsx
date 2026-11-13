import { useState } from "react";
import { Table, type TableColumn } from "@/components/ui/table";
import { Status, type StatusTone } from "@/components/ui/status";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IconDots, IconDownload, IconPen } from "@/components/ui/icons";

type Student = {
  id: string;
  name: string;
  status: { label: string; tone: StatusTone };
  mentor: string | null;
  university: string;
  start: string;
};

const data: Student[] = Array.from({ length: 27 }, (_, i) => ({
  id: String(i + 1),
  name: ["Комарова Елена Сергеевна", "Иванов Пётр Андреевич", "Смирнова Анна Олеговна"][i % 3],
  status: [
    { label: "Ожидает подбор", tone: "warning" as const },
    { label: "Согласован", tone: "info" as const },
    { label: "Проходит практику", tone: "success" as const },
  ][i % 3],
  mentor: i % 3 === 0 ? null : "Афанасьева Мария",
  university: ["РТУ МИРЭА", "НИЯУ МИФИ", "МГТУ им. Баумана"][i % 3],
  start: `${String((i % 28) + 1).padStart(2, "0")}.12.2025`,
}));

const columns: TableColumn<Student>[] = [
  { key: "name", title: "ФИО", sortable: true },
  {
    key: "status",
    title: "Статус",
    sortable: true,
    sortValue: (r) => r.status.label,
    render: (r) => <Status tone={r.status.tone}>{r.status.label}</Status>,
  },
  {
    key: "mentor",
    title: "Наставник",
    render: (r) =>
      r.mentor ? (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <Avatar name={r.mentor} size="sm" />
          {r.mentor}
        </span>
      ) : (
        <Button size="sm" variant="secondary">
          Подобрать
        </Button>
      ),
  },
  { key: "university", title: "ВУЗ", sortable: true },
  { key: "start", title: "Начало", align: "right" },
  {
    key: "actions",
    title: <span className="cs-sr-only">Действия</span>,
    sticky: true,
    width: 56,
    render: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" iconOnly aria-label="Действия">
            <IconDots />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem icon={<IconPen />}>Редактировать</DropdownMenuItem>
          <DropdownMenuItem icon={<IconDownload />}>Скачать резюме</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function TableDemo() {
  const [state, setState] = useState("data");
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Tabs
        variant="pill"
        size="sm"
        value={state}
        onValueChange={setState}
        items={[
          { value: "data", label: "Данные" },
          { value: "loading", label: "Загрузка" },
          { value: "empty", label: "Пусто" },
        ]}
      />
      <Table
        caption="Практиканты"
        columns={columns}
        data={state === "empty" ? [] : data}
        loading={state === "loading"}
        rowKey={(r) => r.id}
        selectable
        pageSize={5}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  );
}
