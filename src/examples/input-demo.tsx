import { Input } from "@/components/ui/input";
import { IconUser } from "@/components/ui/icons";

export default function InputDemo() {
  return (
    <div style={{ display: "grid", gap: 20, width: 280 }}>
      <Input label="ФИО" icon={<IconUser />} />
      <Input label="ВУЗ" defaultValue="РТУ МИРЭА" />
      <Input label="Недоступно" disabled />
      <Input label="Email" defaultValue="ivanova@mail" error="Введите корректный email" />
    </div>
  );
}
