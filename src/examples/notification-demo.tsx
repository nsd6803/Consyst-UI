import { Button } from "@/components/ui/button";
import { NotificationItem, NotificationList } from "@/components/ui/notification-item";

export default function NotificationDemo() {
  return (
    <NotificationList style={{ width: 420 }}>
      <NotificationItem
        title="Новое задание"
        description="Наставник добавил задание «Анализ требований». Срок — до 15.12.2025."
        time="2 ч назад"
        unread
        action={<Button size="sm">Открыть</Button>}
      />
      <NotificationItem title="Отчёт согласован" time="2 ч назад" unread />
      <NotificationItem title="Изменён план практики" description="Кадровый администратор обновил сроки второго этапа." time="вчера" />
    </NotificationList>
  );
}
