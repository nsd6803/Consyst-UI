import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";

const items = [
  { value: "all", label: "Все" },
  { value: "active", label: "Активные" },
  { value: "review", label: "На согласовании" },
  { value: "done", label: "Завершённые" },
  { value: "archive", label: "Архив", disabled: true },
];

export default function TabsDemo() {
  const [tab, setTab] = useState("all");
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Tabs items={items} value={tab} onChange={setTab} />
      <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-secondary)" }}>Выбрана вкладка: {tab}</p>
    </div>
  );
}
