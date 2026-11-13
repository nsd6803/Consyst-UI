import { useState } from "react";
import { Table } from "@/components/ui/table";
import { Tabs } from "@/components/ui/tabs";

const rows = [
  { id: "1", doc: "Договор о практике", owner: "Комарова Е.", size: "128 КБ" },
  { id: "2", doc: "Индивидуальное задание", owner: "Иванов П.", size: "64 КБ" },
  { id: "3", doc: "Отчёт по практике", owner: "Смирнова А.", size: "1,2 МБ" },
];

export default function TableDensity() {
  const [density, setDensity] = useState<"default" | "compact">("compact");
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Tabs
        variant="pill"
        size="sm"
        value={density}
        onValueChange={(v) => setDensity(v as typeof density)}
        items={[
          { value: "default", label: "Default · 72" },
          { value: "compact", label: "Compact · 48" },
        ]}
      />
      <Table
        density={density}
        rowKey={(r) => r.id}
        data={rows}
        columns={[
          { key: "doc", title: "Документ" },
          { key: "owner", title: "Автор" },
          { key: "size", title: "Размер", align: "right" },
        ]}
      />
    </div>
  );
}
