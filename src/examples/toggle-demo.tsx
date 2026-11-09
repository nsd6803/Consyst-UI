import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";

export default function ToggleDemo() {
  const [email, setEmail] = useState(true);
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <Toggle label="Уведомления на почту" checked={email} onCheckedChange={setEmail} />
      <Toggle label="Push-уведомления" />
      <Toggle label="Недоступно" disabled />
    </div>
  );
}
