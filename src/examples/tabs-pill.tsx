import { Tabs } from "@/components/ui/tabs";

export default function TabsPill() {
  return (
    <Tabs
      variant="pill"
      items={[
        { value: "day", label: "День" },
        { value: "week", label: "Неделя" },
        { value: "month", label: "Месяц" },
        { value: "year", label: "Год" },
      ]}
      defaultValue="week"
    />
  );
}
