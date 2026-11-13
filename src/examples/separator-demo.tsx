import { Separator } from "@/components/ui/feedback";

export default function SeparatorDemo() {
  return (
    <div style={{ display: "grid", gap: 20, width: 360, fontSize: 14 }}>
      <div>Профиль</div>
      <Separator />
      <div style={{ display: "flex", gap: 12, alignItems: "center", height: 20 }}>
        <span>Документы</span>
        <Separator orientation="vertical" />
        <span>Задания</span>
        <Separator orientation="vertical" />
        <span>Отчёты</span>
      </div>
      <Separator label="или" />
    </div>
  );
}
