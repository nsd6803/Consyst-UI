import { Tabs } from "@/components/ui/tabs";

export default function TabsDemo() {
  return (
    <div style={{ width: "100%", maxWidth: 560 }}>
      <Tabs
        aria-label="Практиканты"
        items={[
          { value: "all", label: "Все", count: 27, content: <p style={{ margin: 0, fontSize: 14 }}>Все практиканты</p> },
          { value: "active", label: "Активные", count: 12, content: <p style={{ margin: 0, fontSize: 14 }}>Проходят практику</p> },
          { value: "review", label: "На согласовании", count: 4, content: <p style={{ margin: 0, fontSize: 14 }}>Ждут решения</p> },
          { value: "archive", label: "Архив", disabled: true },
        ]}
      />
    </div>
  );
}
