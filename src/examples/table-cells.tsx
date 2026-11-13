import {
  Table,
  TableCellActions,
  TableCellDate,
  TableCellDocument,
  TableCellRating,
  TableCellTags,
  TableCellText,
  TableCellUser,
  type TableColumn,
} from "@/components/ui/table";
import { Status } from "@/components/ui/status";
import { Button } from "@/components/ui/button";
import { IconChevronRight, IconDots } from "@/components/ui/icons";

type Row = {
  id: string;
  name: string;
  email: string;
  rating: number;
  doc: { name: string; size: string };
  skills: string[];
  period: [string, string];
  status: string;
};

const rows: Row[] = [
  {
    id: "1",
    name: "Комарова Елена",
    email: "komarova@mail.ru",
    rating: 4.2,
    doc: { name: "Отчёт по практике.pdf", size: "5 МБ" },
    skills: ["React", "TypeScript", "Figma", "SQL"],
    period: ["01.07.2025", "31.08.2025"],
    status: "Проходит практику",
  },
  {
    id: "2",
    name: "Иванов Пётр",
    email: "ivanov@mephi.ru",
    rating: 4.8,
    doc: { name: "Договор.docx", size: "128 КБ" },
    skills: ["Python", "ML"],
    period: ["12.12.2025", "12.02.2026"],
    status: "Проходит практику",
  },
];

const columns: TableColumn<Row>[] = [
  { key: "user", title: "Практикант", sortable: true, sortValue: (r) => r.name, render: (r) => <TableCellUser name={r.name} email={r.email} /> },
  { key: "rating", title: "Оценка", sortable: true, render: (r) => <TableCellRating value={r.rating} max={5} /> },
  { key: "doc", title: "Документ", render: (r) => <TableCellDocument name={r.doc.name} meta={r.doc.size} href="#" /> },
  { key: "skills", title: "Навыки", render: (r) => <TableCellTags tags={r.skills} /> },
  { key: "period", title: "Период", render: (r) => <TableCellDate from={r.period[0]} to={r.period[1]} /> },
  { key: "status", title: "Статус", render: (r) => <Status tone="success">{r.status}</Status> },
  { key: "note", title: "Комментарий", render: () => <TableCellText secondary>—</TableCellText> },
  {
    key: "actions",
    title: <span className="cs-sr-only">Действия</span>,
    sticky: true,
    render: () => (
      <TableCellActions>
        <Button size="sm">Оценить</Button>
        <Button size="sm" variant="ghost" iconOnly aria-label="Ещё">
          <IconDots />
        </Button>
        <Button size="sm" variant="ghost" iconOnly aria-label="Открыть">
          <IconChevronRight />
        </Button>
      </TableCellActions>
    ),
  },
];

export default function TableCells() {
  return <Table columns={columns} data={rows} rowKey={(r) => r.id} selectable />;
}
