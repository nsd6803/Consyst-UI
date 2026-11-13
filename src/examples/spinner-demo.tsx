import { Spinner } from "@/components/ui/feedback";

export default function SpinnerDemo() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
      <span style={{ display: "inline-flex", gap: 8, alignItems: "center", fontSize: 14, color: "var(--color-fg-secondary)" }}>
        <Spinner size="sm" label="Сохраняем изменения" /> Сохраняем…
      </span>
    </div>
  );
}
