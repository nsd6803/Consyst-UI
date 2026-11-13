import { Button } from "@/components/ui/button";
import { IconPlus } from "@/components/ui/icons";

export default function ButtonSizes() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button size={size} leftIcon={<IconPlus />}>
            Кнопка {size}
          </Button>
          <Button size={size} variant="soft">
            Soft
          </Button>
          <Button size={size} variant="secondary" iconOnly aria-label="Добавить">
            <IconPlus />
          </Button>
        </div>
      ))}
    </div>
  );
}
