import { InfoField } from "@/components/ui/info-field";

export default function InfoFieldDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: 360 }}>
      <InfoField type="success">Документы успешно загружены</InfoField>
      <InfoField type="error">Не удалось отправить отчёт</InfoField>
      <InfoField type="info">Практика начнётся 12.12.2025</InfoField>
      <InfoField type="warning">Осталось 3 дня до дедлайна</InfoField>
      <InfoField type="info" icon={false}>
        Без иконки
      </InfoField>
    </div>
  );
}
