import { useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function AlertDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <div style={{ display: "grid", gap: 12, width: 520 }}>
      <Alert tone="info" title="Практика начнётся 12.12.2025">
        До начала нужно загрузить договор и индивидуальное задание.
      </Alert>
      <Alert tone="success">Документы успешно загружены</Alert>
      <Alert tone="warning" title="Осталось 3 дня до дедлайна" action={<Button size="sm" variant="soft">Открыть</Button>}>
        Отчёт по практике ещё не отправлен.
      </Alert>
      {visible && (
        <Alert tone="danger" title="Не удалось отправить отчёт" onClose={() => setVisible(false)}>
          Файл больше 10 МБ. Сожмите PDF и попробуйте снова.
        </Alert>
      )}
    </div>
  );
}
