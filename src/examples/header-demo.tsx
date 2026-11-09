import { Header, HeaderAction, HeaderLink } from "@/components/ui/header";
import { IconFile, IconGraduation, IconUser } from "@/components/ui/icons";

export default function HeaderDemo() {
  return (
    <div style={{ display: "grid", gap: 16, width: "100%" }}>
      <Header userName="Мария" hasNotifications />
      <Header
        userName="Мария"
        actions={
          <>
            <HeaderAction aria-label="Создать отчёт .xls">
              <IconFile size={16} />
            </HeaderAction>
            <HeaderAction aria-label="Загрузить резюме">
              <IconGraduation size={16} />
            </HeaderAction>
            <HeaderAction aria-label="Добавить наставника">
              <IconUser size={16} />
            </HeaderAction>
          </>
        }
      />
      <Header
        userName="Мария"
        actions={
          <>
            <HeaderLink>Создать отчёт .xls</HeaderLink>
            <HeaderLink>Загрузить резюме</HeaderLink>
            <HeaderLink>Добавить наставника</HeaderLink>
          </>
        }
      />
    </div>
  );
}
