import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaDemo() {
  return (
    <div style={{ display: "grid", gap: 20, width: 360 }}>
      <Field label="Комментарий наставнику">
        <Textarea placeholder="Опишите, что сделано за неделю" maxLength={500} showCount />
      </Field>
      <Field label="Растёт по мере ввода" description="autoResize — до 6 строк">
        <Textarea autoResize maxRows={6} rows={2} placeholder="Начните печатать…" />
      </Field>
      <Field label="Причина возврата" error="Минимум 30 символов">
        <Textarea defaultValue="Не хватает источников" />
      </Field>
    </div>
  );
}
