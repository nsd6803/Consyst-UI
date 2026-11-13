import { useState } from "react";
import { Sidebar, sidebarRoleItems, type SidebarRole } from "@/components/ui/sidebar";
import { Tabs } from "@/components/ui/tabs";

export default function SidebarDemo() {
  const [role, setRole] = useState<SidebarRole>("admin");
  const [active, setActive] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Tabs
        variant="pill"
        size="sm"
        value={role}
        onValueChange={(v) => {
          const next = v as SidebarRole;
          setRole(next);
          setActive(sidebarRoleItems[next][0].key);
        }}
        items={[
          { value: "admin", label: "Администратор" },
          { value: "mentor", label: "Наставник" },
          { value: "student", label: "Практикант" },
        ]}
      />
      <div
        style={{
          display: "flex",
          height: 480,
          overflow: "hidden",
          borderRadius: 16,
          background: "var(--color-surface)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {/* role подставляет пункты меню роли из макета; свои пункты — items или groups */}
        <Sidebar role={role} activeKey={active} onSelect={setActive} collapsed={collapsed} onCollapsedChange={setCollapsed} />
        <div style={{ flex: 1, padding: 24, fontSize: 14, color: "var(--color-fg-secondary)" }}>Контент страницы</div>
      </div>
    </div>
  );
}
