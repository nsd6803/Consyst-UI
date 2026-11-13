import { Button } from "@/components/ui/button";

export default function ButtonVariants() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <Button tone="success">Согласовать</Button>
        <Button tone="danger">Отклонить</Button>
        <Button variant="soft" tone="danger">
          Удалить
        </Button>
        <Button variant="ghost" tone="danger">
          Удалить
        </Button>
      </div>
    </div>
  );
}
