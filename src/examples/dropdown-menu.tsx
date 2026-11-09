import { DropdownItem, DropdownMenu } from "@/components/ui/dropdown";
import { IconCircleCheck, IconRotate } from "@/components/ui/icons";

export default function DropdownMenuDemo() {
  return (
    <DropdownMenu style={{ width: 180 }}>
      <DropdownItem tone="success" icon={<IconCircleCheck size={14} />}>
        Согласовать
      </DropdownItem>
      <DropdownItem icon={<IconRotate size={14} />}>На доработку</DropdownItem>
    </DropdownMenu>
  );
}
