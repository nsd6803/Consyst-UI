import { SidebarItem } from "@/components/ui/sidebar";
import { IconHome } from "@/components/ui/icons";

export default function SidebarItemDemo() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 180px)", gap: 12, alignItems: "center" }}>
      <SidebarItem icon={<IconHome />} label="Главная" />
      <SidebarItem icon={<IconHome />} label="Главная" className="is-hover" style={{ background: "var(--color-bg-muted)" }} />
      <SidebarItem icon={<IconHome />} label="Главная" active />
      <SidebarItem icon={<IconHome />} label="Главная" badge={4} />
      <SidebarItem icon={<IconHome />} label="Главная" badge={4} style={{ background: "var(--color-bg-muted)" }} />
      <SidebarItem icon={<IconHome />} label="Главная" badge={4} active />
      <div style={{ display: "flex", gap: 8 }}>
        <SidebarItem icon={<IconHome />} label="Главная" collapsed />
        <SidebarItem icon={<IconHome />} label="Главная" collapsed badge={1} />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <SidebarItem icon={<IconHome />} label="Главная" collapsed active />
        <SidebarItem icon={<IconHome />} label="Главная" collapsed active badge={1} />
      </div>
    </div>
  );
}
