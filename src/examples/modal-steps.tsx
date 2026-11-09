import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal, ModalSteps } from "@/components/ui/modal";

const slides = [
  { title: "Добро пожаловать", text: "Здесь вы будете проходить практику: загружать документы и получать задания." },
  { title: "Задания", text: "Наставник добавляет задания, а вы отправляете результаты на проверку." },
  { title: "Отчёты", text: "В конце практики сформируйте отчёт и отправьте его на согласование." },
];

export default function ModalStepsDemo() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const close = () => {
    setOpen(false);
    setStep(0);
  };
  const last = step === slides.length - 1;

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Онбординг
      </Button>
      <Modal open={open} onClose={close} closable={false} title={slides[step].title} width={520}>
        <p style={{ margin: "0 0 16px" }}>{slides[step].text}</p>
        <div style={{ height: 200, borderRadius: 12, background: "var(--color-gray-100)", marginBottom: 16 }} />
        <ModalSteps count={slides.length} current={step} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
          <Button color="neutral" size="small" onClick={close}>
            Пропустить
          </Button>
          <div style={{ display: "flex", gap: 8 }}>
            {step > 0 && (
              <Button color="neutral" size="small" onClick={() => setStep(step - 1)}>
                Назад
              </Button>
            )}
            <Button size="small" onClick={() => (last ? close() : setStep(step + 1))}>
              {last ? "Готово" : "Далее"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
