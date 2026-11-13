import { useState } from "react";
import { Timeline } from "@/components/ui/timeline";

const steps = [
  { title: "Загрузка документов", dates: "01.09 – 07.09" },
  { title: "Согласование плана", dates: "08.09 – 14.09" },
  { title: "Прохождение практики", dates: "15.09 – 15.11" },
  { title: "Оценка практики", dates: "16.11 – 23.11" },
  { title: "Проверка администратором", dates: "24.11 – 30.11" },
  { title: "Завершение", dates: "01.12" },
];

export default function TimelineDemo() {
  const [selected, setSelected] = useState<number>(2);
  return (
    <div style={{ width: "100%" }}>
      <Timeline steps={steps} current={2} selected={selected} onSelect={setSelected} />
    </div>
  );
}
