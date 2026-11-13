import { ProgressStep, TimelineStep } from "@/components/ui/timeline";

export default function TimelineSteps() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <ProgressStep number={1} status="done" />
        <ProgressStep number={2} status="current" />
        <ProgressStep number={3} status="next" />
        <ProgressStep number={1} status="done" active />
        <ProgressStep number={2} status="current" active />
        <ProgressStep number={3} status="next" active />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 180px)" }}>
        <TimelineStep number={1} title="Подача заявки" status="done" />
        <TimelineStep number={2} title="Согласование" status="current" selected />
        <TimelineStep number={3} title="Практика" status="next" connector={false} />
      </div>
    </div>
  );
}
