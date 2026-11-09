import { Table, type TableColumn } from "@/components/ui/table";
import { Status, type StatusState } from "@/components/ui/status";
import { Button } from "@/components/ui/button";
import { IconCalendar, IconDots } from "@/components/ui/icons";

type Student = {
  id: string;
  name: string;
  status: { label: string; state: StatusState };
  mentor: string | null;
  university: string;
  start: string;
};

const data: Student[] = Array.from({ length: 27 }, (_, i) => ({
  id: String(i + 1),
  name: ["Комарова Елена Сергеевна", "Иванов Пётр Андреевич", "Смирнова Анна Олеговна"][i % 3],
  status: [
    { label: "Ожидает подбор", state: "warning" as const },
    { label: "Согласован", state: "info" as const },
    { label: "Проходит практику", state: "success" as const },
  ][i % 3],
  mentor: i % 3 === 0 ? null : "Афанасьева М.А.",
  university: ["РТУ МИРЭА", "НИЯУ МИФИ", "МГТУ им. Баумана"][i % 3],
  start: `${String((i % 28) + 1).padStart(2, "0")}.12.2025`,
}));

const columns: TableColumn<Student>[] = [
  {
    key: "name",
    title: "ФИО",
    sortable: true,
    render: (r) => <span style={{ color: r.status.state === "success" ? "var(--color-accent-primary)" : undefined }}>{r.name}</span>,
  },
  {
    key: "status",
    title: "Статус",
    sortable: true,
    sortValue: (r) => r.status.label,
    render: (r) => <Status state={r.status.state}>{r.status.label}</Status>,
  },
  {
    key: "mentor",
    title: "Наставник",
    render: (r) =>
      r.mentor ? (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span className="avatar">{r.mentor[0]}</span>
          {r.mentor}
        </span>
      ) : (
        <Button size="tiny">Подобрать</Button>
      ),
  },
  { key: "university", title: "ВУЗ", sortable: true },
  {
    key: "start",
    title: "Начало",
    render: (r) => (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <IconCalendar size={12} color="var(--color-icon-secondary)" />
        {r.start}
      </span>
    ),
  },
  {
    key: "actions",
    title: "Действия",
    sticky: true,
    align: "right",
    render: () => (
      <Button variant="text" color="neutral" size="tiny" iconOnly aria-label="Ещё">
        <IconDots />
      </Button>
    ),
  },
];

export default function TableDemo() {
  return (
    <>
      <style>{`.avatar{width:24px;height:24px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:var(--color-blue-100);color:var(--color-accent-primary);font-size:11px}`}</style>
      <Table columns={columns} data={data} rowKey={(r) => r.id} selectable pageSize={5} pageSizeOptions={[5, 10, 20]} />
    </>
  );
}
