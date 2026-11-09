import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { IconBook, IconFile, IconGraduation, IconHome, IconUser } from "@/components/ui/icons";

const items = [
  { key: "home", icon: <IconHome />, label: "Главная" },
  { key: "mentors", icon: <IconUser />, label: "Наставники" },
  { key: "students", icon: <IconGraduation />, label: "Практиканты", badge: 4 },
  { key: "reports", icon: <IconFile />, label: "Отчёты" },
  { key: "dicts", icon: <IconBook />, label: "Справочники" },
];

export default function SidebarDemo() {
  const [active, setActive] = useState("home");
  return (
    <div style={{ height: 420, display: "flex" }}>
      <Sidebar items={items} activeKey={active} onSelect={setActive} />
    </div>
  );
}
