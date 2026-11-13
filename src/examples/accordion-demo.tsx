import { Accordion } from "@/components/ui/accordion";

export default function AccordionDemo() {
  return (
    <div style={{ display: "grid", gap: 32, width: 480 }}>
      <Accordion
        items={[
          { value: "1", title: "Как подобрать наставника?", content: "Откройте карточку практиканта и нажмите «Подобрать». Система предложит наставников из нужного отдела." },
          { value: "2", title: "Сколько длится согласование?", content: "Обычно 1–3 рабочих дня. Статус видно в блоке «Ход согласования»." },
          { value: "3", title: "Можно ли изменить сроки практики?", content: "Да, до начала практики — через кадрового администратора." },
        ]}
      />
      <Accordion
        variant="card"
        type="multiple"
        defaultValue={["docs"]}
        items={[
          { value: "docs", title: "Документы", content: "Договор, индивидуальное задание, отчёт." },
          { value: "tasks", title: "Задания", content: "5 заданий, 3 выполнено." },
          { value: "archive", title: "Архив (недоступно)", content: "", disabled: true },
        ]}
      />
    </div>
  );
}
