import { useState } from "react";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function FieldDemo() {
  const [email, setEmail] = useState("ivanova@mail");
  const emailError = email && !/^\S+@\S+\.\S+$/.test(email) ? "Введите email в формате name@domain.ru" : undefined;

  return (
    <form style={{ display: "grid", gap: 20, width: 360 }} onSubmit={(e) => e.preventDefault()}>
      <Field label="ФИО" required>
        <Input placeholder="Иванова Мария Сергеевна" />
      </Field>
      <Field label="Email" required error={emailError}>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Field>
      <Field label="ВУЗ" description="Если вашего ВУЗа нет в списке — напишите в поддержку">
        <Select
          options={[
            { value: "mirea", label: "РТУ МИРЭА" },
            { value: "mephi", label: "НИЯУ МИФИ" },
            { value: "bmstu", label: "МГТУ им. Баумана" },
          ]}
        />
      </Field>
      <Field label="О себе">
        <Textarea maxLength={300} showCount placeholder="Пара предложений об опыте и интересах" />
      </Field>
      <Button type="submit">Сохранить</Button>
    </form>
  );
}
