import { Button } from "@/components/ui/button";
import { NotificationItem, NotificationList } from "@/components/ui/notification-item";

export default function NotificationDemo() {
  return (
    <NotificationList style={{ width: 400 }}>
      <NotificationItem
        title="Новое задание"
        description="Наставник добавил задание «Анализ требований». Срок — до 15.12.2025."
        time="2 ч назад"
        unread
        action={<Button size="tiny">Открыть</Button>}
      />
      <NotificationItem title="Отчёт согласован" time="2 ч назад" unread action={<Button size="tiny">Смотреть</Button>} />
      <NotificationItem
        title="Изменён план практики"
        description="Кадровый администратор обновил сроки второго этапа."
        time="вчера"
      />
      <NotificationItem title="Добро пожаловать!" time="3 дня назад" />
    </NotificationList>
  );
}
