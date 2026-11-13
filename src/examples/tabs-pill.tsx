import { Tabs } from "@/components/ui/tabs";

export default function TabsPill() {
  return (
    <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>
      <Tabs
        variant="pill"
        defaultValue="week"
        aria-label="Период"
        items={[
          { value: "day", label: "День" },
          { value: "week", label: "Неделя" },
          { value: "month", label: "Месяц" },
          { value: "year", label: "Год" },
        ]}
      />
      <Tabs
        variant="pill"
        size="sm"
        aria-label="Вид"
        items={[
          { value: "table", label: "Таблица" },
          { value: "cards", label: "Карточки" },
        ]}
      />
    </div>
  );
}
