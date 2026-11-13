import { Field } from "@/components/ui/field";
import { RadioGroup } from "@/components/ui/radio";

export default function RadioDemo() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Field label="Формат практики">
        <RadioGroup
          defaultValue="office"
          options={[
            { value: "office", label: "Очно", description: "В офисе компании" },
            { value: "remote", label: "Удалённо" },
            { value: "hybrid", label: "Гибрид" },
            { value: "none", label: "Недоступно", disabled: true },
          ]}
        />
      </Field>
      <Field label="Период">
        <RadioGroup
          orientation="horizontal"
          defaultValue="summer"
          options={[
            { value: "summer", label: "Лето" },
            { value: "autumn", label: "Осень" },
            { value: "winter", label: "Зима" },
          ]}
        />
      </Field>
    </div>
  );
}
