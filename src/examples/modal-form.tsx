import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal, ModalClose } from "@/components/ui/modal";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function ModalForm() {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      dismissible={false}
      trigger={<Button>Добавить наставника</Button>}
      title="Новый наставник"
      footer={
        <>
          <ModalClose asChild>
            <Button variant="soft">Отмена</Button>
          </ModalClose>
          <Button onClick={() => setOpen(false)}>Добавить</Button>
        </>
      }
    >
      <div style={{ display: "grid", gap: 16 }}>
        <Field label="ФИО" required>
          <Input placeholder="Иванова Мария Сергеевна" />
        </Field>
        <Field label="Отдел" required>
          <Select
            options={[
              { value: "dev", label: "Разработка" },
              { value: "analytics", label: "Аналитика" },
              { value: "hr", label: "HR" },
            ]}
          />
        </Field>
      </div>
    </Modal>
  );
}
