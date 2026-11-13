import { Progress } from "@/components/ui/feedback";

export default function ProgressDemo() {
  return (
    <div style={{ display: "grid", gap: 20, width: 360 }}>
      <Progress value={64} label="Прохождение практики" showValue />
      <Progress value={100} label="Документы" showValue tone="success" />
      <Progress value={85} label="Лимит заявок" showValue tone="warning" />
      <Progress value={30} size="sm" label="Загрузка файла" />
    </div>
  );
}
