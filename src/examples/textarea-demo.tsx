import { Textarea } from "@/components/ui/textarea";

export default function TextareaDemo() {
  return (
    <div style={{ display: "grid", gap: 20, width: 320 }}>
      <Textarea label="Комментарий" />
      <Textarea label="Причина возврата" defaultValue="Не хватает литературных источников" error="Минимум 50 символов" />
    </div>
  );
}
