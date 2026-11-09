import { Status } from "@/components/ui/status";
import { IconCircleCheck, IconCircleX, IconInfo, IconUser, IconWarning } from "@/components/ui/icons";

export default function StatusDemo() {
  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Status state="success">Проходит практику</Status>
        <Status state="error">Отклонён</Status>
        <Status state="info">Согласован</Status>
        <Status state="warning">Ожидает подбор</Status>
        <Status state="default">Черновик</Status>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Status state="success" icon={<IconCircleCheck />}>Завершено</Status>
        <Status state="error" icon={<IconCircleX />}>Ошибка</Status>
        <Status state="info" icon={<IconInfo />}>Инфо</Status>
        <Status state="warning" icon={<IconUser />}>На согласовании</Status>
        <Status state="default" icon={<IconWarning />}>Архив</Status>
      </div>
    </div>
  );
}
