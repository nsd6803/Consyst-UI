import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function SwitchDemo() {
  const [email, setEmail] = useState(true);
  return (
    <div style={{ display: "grid", gap: 16, width: 360 }}>
      <Switch label="Уведомления на почту" description="О новых заданиях и согласованиях" checked={email} onCheckedChange={setEmail} />
      <Switch label="Push-уведомления" labelPosition="left" />
      <Switch label="Компактный" size="sm" defaultChecked />
      <Switch label="Недоступно" disabled />
    </div>
  );
}
