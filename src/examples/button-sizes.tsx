import { Button } from "@/components/ui/button";
import { IconPlus, IconSparkle } from "@/components/ui/icons";

export default function ButtonSizes() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      {(["large", "medium", "small", "tiny"] as const).map((size) => (
        <div key={size} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button size={size} leftIcon={<IconSparkle />} rightIcon={<IconSparkle />}>
            Button label
          </Button>
          <Button size={size} iconOnly aria-label="Добавить">
            <IconPlus />
          </Button>
        </div>
      ))}
    </div>
  );
}
