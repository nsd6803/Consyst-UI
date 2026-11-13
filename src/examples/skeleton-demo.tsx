import { Skeleton } from "@/components/ui/feedback";
import { Card } from "@/components/ui/card";

export default function SkeletonDemo() {
  return (
    <Card style={{ width: 360 }} aria-busy="true" aria-label="Загрузка карточки">
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Skeleton circle height={40} />
        <div style={{ display: "grid", gap: 8, flex: 1 }}>
          <Skeleton width="60%" height={14} />
          <Skeleton width="40%" height={12} />
        </div>
      </div>
      <Skeleton height={12} />
      <Skeleton width="85%" height={12} />
      <Skeleton width={120} height={32} />
    </Card>
  );
}
