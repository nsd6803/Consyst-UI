import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function FieldHorizontal() {
  return (
    <div style={{ display: "grid", gap: 16, width: 520 }}>
      <Field label="Название практики" orientation="horizontal">
        <Input defaultValue="Летняя практика 2026" />
      </Field>
      <Field label="Длительность" orientation="horizontal" description="В рабочих днях">
        <Input type="number" defaultValue={20} suffix="дней" />
      </Field>
      <Field label="Уведомления" orientation="horizontal">
        <Switch label="Присылать письма наставнику" defaultChecked />
      </Field>
    </div>
  );
}
