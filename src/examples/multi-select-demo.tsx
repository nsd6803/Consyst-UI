import { useState } from "react";
import { MultiSelect } from "@/components/ui/multi-select";

const statuses = [
  { value: "waiting", label: "Ожидает подбор" },
  { value: "review", label: "На согласовании" },
  { value: "approved", label: "Согласован" },
  { value: "active", label: "Проходит практику" },
  { value: "returned", label: "На доработке" },
  { value: "done", label: "Завершил" },
  { value: "rejected", label: "Отклонён" },
  { value: "archive", label: "В архиве" },
];

export default function MultiSelectDemo() {
  const [value, setValue] = useState(["waiting", "review"]);
  return (
    <div style={{ width: 300 }}>
      <MultiSelect aria-label="Статус" placeholder="Статус" options={statuses} value={value} onValueChange={setValue} />
    </div>
  );
}
