import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

export default function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Открыть модалку</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Завершить практику?"
        footer={
          <>
            <Button color="neutral" size="large" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button size="large" onClick={() => setOpen(false)}>
              Завершить
            </Button>
          </>
        }
      >
        После завершения практиканту станет недоступна загрузка документов. Кадровый администратор получит
        уведомление и сможет проверить итоговый отчёт.
      </Modal>
    </>
  );
}
