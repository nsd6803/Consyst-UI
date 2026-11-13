import { Button } from "@/components/ui/button";
import { Toaster, toast } from "@/components/ui/toast";

export default function ToastDemo() {
  return (
    <>
      {/* <Toaster /> кладётся один раз в корень приложения */}
      <Toaster />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Button
          variant="soft"
          onClick={() => toast({ tone: "success", title: "Отчёт отправлен", description: "Наставник получит уведомление" })}
        >
          Success
        </Button>
        <Button
          variant="soft"
          onClick={() =>
            toast({
              tone: "info",
              title: "Практикант удалён из группы",
              action: { label: "Отменить", onClick: () => toast({ tone: "success", title: "Действие отменено" }) },
            })
          }
        >
          С действием
        </Button>
        <Button variant="soft" onClick={() => toast({ tone: "danger", title: "Ошибка загрузки", description: "Файл больше 10 МБ" })}>
          Danger
        </Button>
        <Button variant="soft" onClick={() => toast({ tone: "warning", title: "Сессия скоро истечёт", duration: 0 })}>
          Без автоскрытия
        </Button>
      </div>
    </>
  );
}
