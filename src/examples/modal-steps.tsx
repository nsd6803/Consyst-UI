import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal, ModalSteps } from "@/components/ui/modal";

const slides = [
  { title: "Добро пожаловать", text: "Здесь вы проходите практику: загружаете документы и получаете задания." },
  { title: "Задания", text: "Наставник добавляет задания, а вы отправляете результаты на проверку." },
  { title: "Отчёты", text: "В конце практики сформируйте отчёт и отправьте его на согласование." },
];

export default function ModalStepsDemo() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const close = (o: boolean) => {
    setOpen(o);
    if (!o) setStep(0);
  };
  const last = step === slides.length - 1;

  return (
    <Modal
      open={open}
      onOpenChange={close}
      trigger={<Button variant="secondary">Онбординг</Button>}
      closable={false}
      title={slides[step].title}
      description={slides[step].text}
      footer={
        <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
          <Button variant="ghost" onClick={() => close(false)}>
            Пропустить
          </Button>
          <div style={{ flex: 1 }}>
            <ModalSteps count={slides.length} current={step} />
          </div>
          {step > 0 && (
            <Button variant="soft" onClick={() => setStep(step - 1)}>
              Назад
            </Button>
          )}
          <Button onClick={() => (last ? close(false) : setStep(step + 1))}>{last ? "Готово" : "Далее"}</Button>
        </div>
      }
    >
      <div style={{ height: 180, borderRadius: 12, background: "var(--color-bg-muted)" }} />
    </Modal>
  );
}
