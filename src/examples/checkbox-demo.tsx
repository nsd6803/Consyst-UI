import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const docs = ["Договор о практике", "Индивидуальное задание", "Отчёт по практике"];

export default function CheckboxDemo() {
  const [checked, setChecked] = useState<string[]>([docs[0]]);
  const all = checked.length === docs.length;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Checkbox
        label="Все документы"
        checked={all ? true : checked.length ? "indeterminate" : false}
        onCheckedChange={() => setChecked(all ? [] : docs)}
      />
      <div style={{ display: "grid", gap: 10, paddingLeft: 26 }}>
        {docs.map((d) => (
          <Checkbox
            key={d}
            label={d}
            checked={checked.includes(d)}
            onCheckedChange={() => setChecked((c) => (c.includes(d) ? c.filter((x) => x !== d) : [...c, d]))}
          />
        ))}
      </div>
      <Checkbox label="Согласен на обработку данных" description="Без согласия отправить заявку нельзя" />
      <Checkbox label="Недоступно" disabled />
    </div>
  );
}
