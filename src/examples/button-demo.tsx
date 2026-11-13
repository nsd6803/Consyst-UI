import { Button } from "@/components/ui/button";
import { IconDownload, IconPlus } from "@/components/ui/icons";

export default function ButtonDemo() {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button leftIcon={<IconPlus />}>Добавить практиканта</Button>
      <Button variant="soft" leftIcon={<IconDownload />}>
        Скачать отчёт
      </Button>
    </div>
  );
}
