import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/** Поля и кнопки одного размера совпадают по высоте — их можно ставить в одну строку */
export default function InputSizes() {
  return (
    <div style={{ display: "grid", gap: 12, width: 420 }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} style={{ display: "flex", gap: 8 }}>
          <Input size={size} placeholder={`Размер ${size}`} aria-label={`Размер ${size}`} />
          <Button size={size}>Найти</Button>
        </div>
      ))}
    </div>
  );
}
