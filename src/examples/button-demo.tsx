import { Button } from "@/components/ui/button";
import { IconDownload } from "@/components/ui/icons";

export default function ButtonDemo() {
  return (
    <Button leftIcon={<IconDownload />} onClick={() => alert("Скачиваем отчёт")}>
      Скачать отчёт
    </Button>
  );
}
