import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function BreadcrumbDemo() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Breadcrumb
        items={[
          { label: "Главная", href: "#" },
          { label: "Практиканты", href: "#" },
          { label: "Комарова Елена Сергеевна" },
        ]}
      />
      <Breadcrumb
        maxItems={3}
        items={[
          { label: "Главная", href: "#" },
          { label: "Практики", href: "#" },
          { label: "Летняя практика 2026", href: "#" },
          { label: "Отдел разработки", href: "#" },
          { label: "Задание №3" },
        ]}
      />
    </div>
  );
}
