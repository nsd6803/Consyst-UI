import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal, ModalClose } from "@/components/ui/modal";

export default function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      trigger={<Button tone="danger" variant="soft">Завершить практику</Button>}
      title="Завершить практику?"
      description="Практикант больше не сможет загружать документы. Действие нельзя отменить."
      size="sm"
      footer={
        <>
          <ModalClose asChild>
            <Button variant="soft">Отмена</Button>
          </ModalClose>
          <Button tone="danger" onClick={() => setOpen(false)}>
            Завершить
          </Button>
        </>
      }
    />
  );
}
