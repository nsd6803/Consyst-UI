import { Button } from "@/components/ui/button";
import { Toaster, toast } from "@/components/ui/toast";

export default function ToastDemo() {
  return (
    <>
      {/* <Toaster /> достаточно положить один раз в корень приложения */}
      <Toaster />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Button
          size="small"
          color="success"
          onClick={() => toast({ type: "success", title: "Отчёт отправлен", description: "Наставник получит уведомление." })}
        >
          Success
        </Button>
        <Button
          size="small"
          color="error"
          onClick={() => toast({ type: "error", title: "Ошибка загрузки", description: "Файл больше 10 МБ." })}
        >
          Error
        </Button>
        <Button size="small" variant="secondary" onClick={() => toast({ type: "info", title: "Новая версия плана" })}>
          Info
        </Button>
      </div>
    </>
  );
}
