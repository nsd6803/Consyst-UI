import { Button } from "@/components/ui/button";

const colors = ["primary", "neutral", "error", "warning", "success"] as const;
const variants = ["fill", "secondary", "ghost", "text"] as const;

export default function ButtonColors() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {variants.map((variant) => (
        <div key={variant} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {colors.map((color) => (
            <Button key={color} variant={variant} color={color} size="small">
              {color}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}
