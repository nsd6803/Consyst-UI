import { Button } from "@/components/ui/button";

export default function ButtonDisabled() {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button disabled>Fill</Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
    </div>
  );
}
