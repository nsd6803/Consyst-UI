import { Field } from "@/components/ui/field";
import { Select } from "@/components/ui/select";

export default function SelectDemo() {
  return (
    <div style={{ display: "grid", gap: 20, width: 320 }}>
      <Field label="ВУЗ">
        <Select
          placeholder="Выберите ВУЗ"
          options={[
            { value: "mirea", label: "РТУ МИРЭА", group: "Москва" },
            { value: "mephi", label: "НИЯУ МИФИ", group: "Москва" },
            { value: "bmstu", label: "МГТУ им. Баумана", group: "Москва" },
            { value: "itmo", label: "Университет ИТМО", group: "Санкт-Петербург" },
            { value: "spbpu", label: "СПбПУ", group: "Санкт-Петербург", disabled: true },
          ]}
        />
      </Field>
      <Field label="Роль" error="Выберите роль">
        <Select
          options={[
            { value: "student", label: "Практикант" },
            { value: "mentor", label: "Наставник" },
            { value: "admin", label: "Кадровый администратор" },
          ]}
        />
      </Field>
    </div>
  );
}
