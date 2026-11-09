import { Button } from "@/components/ui/button";

export default function ButtonVariants() {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Button variant="fill">Fill</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="text">Text</Button>
    </div>
  );
}
