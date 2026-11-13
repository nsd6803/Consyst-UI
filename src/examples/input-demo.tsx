import { Input } from "@/components/ui/input";
import { IconCalendar, IconUser } from "@/components/ui/icons";

export default function InputDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: 320 }}>
      {/* Подпись стоит в поле и уезжает наверх при фокусе или вводе */}
      <Input label="ФИО" prefix={<IconUser />} />
      <Input label="ВУЗ" defaultValue="РТУ МИРЭА" clearable />
      <Input label="Пароль" type="password" defaultValue="secret-password" />
      <Input label="Дата начала" placeholder="ДД.ММ.ГГГГ" suffix={<IconCalendar />} />
      <Input label="Email" defaultValue="ivanova@mail" invalid />
      <Input label="Табельный номер" disabled />
      {/* Без подписи — обычный плейсхолдер */}
      <Input placeholder="Без подписи, обычный плейсхолдер" aria-label="Пример" />
    </div>
  );
}
