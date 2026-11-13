import { Status } from "@/components/ui/status";
import { IconCircleCheck, IconClock } from "@/components/ui/icons";

export default function StatusDemo() {
  return (
    <div style={{ display: "grid", gap: 14, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Status tone="warning">Ожидает подбор</Status>
        <Status tone="info">На согласовании</Status>
        <Status tone="primary">Согласован</Status>
        <Status tone="success">Проходит практику</Status>
        <Status tone="danger">Отклонён</Status>
        <Status tone="accent">Новое</Status>
        <Status>Черновик</Status>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Status tone="success" dot>
          Онлайн
        </Status>
        <Status tone="success" icon={<IconCircleCheck />}>
          Завершено
        </Status>
        <Status tone="warning" icon={<IconClock />}>
          3 дня до дедлайна
        </Status>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Status tone="success" variant="solid">
          Solid
        </Status>
        <Status tone="danger" variant="solid">
          Solid
        </Status>
        <Status tone="info" variant="solid">
          Solid
        </Status>
        <Status tone="warning" size="sm">
          Small
        </Status>
      </div>
    </div>
  );
}
