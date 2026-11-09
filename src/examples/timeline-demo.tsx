import { useState } from "react";
import { Timeline } from "@/components/ui/timeline";

const steps = [
  { title: "Загрузка документов", dates: "01.09 – 07.09" },
  { title: "Согласование плана практики", dates: "08.09 – 14.09" },
  { title: "Прохождение практики", dates: "15.09 – 15.11" },
  { title: "Оценка практики", dates: "16.11 – 23.11" },
  { title: "Проверка кадровым администратором", dates: "24.11 – 30.11" },
  { title: "Завершение практики", dates: "01.12" },
];

export default function TimelineDemo() {
  const [selected, setSelected] = useState<number>();
  return <Timeline steps={steps} current={2} selected={selected} onSelect={setSelected} />;
}
