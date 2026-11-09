import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const options = ["Документы загружены", "План практики согласован", "Отчёт отправлен"];

export default function CheckboxDemo() {
  const [checked, setChecked] = useState<string[]>([options[0]]);
  const all = checked.length === options.length;
  const some = checked.length > 0 && !all;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Checkbox
        label="Выбрать все"
        checked={all}
        indeterminate={some}
        onChange={() => setChecked(all ? [] : options)}
      />
      <div style={{ display: "grid", gap: 10, paddingLeft: 28 }}>
        {options.map((o) => (
          <Checkbox
            key={o}
            label={o}
            checked={checked.includes(o)}
            onChange={() => setChecked((c) => (c.includes(o) ? c.filter((x) => x !== o) : [...c, o]))}
          />
        ))}
      </div>
      <Checkbox label="Недоступно" disabled />
    </div>
  );
}
