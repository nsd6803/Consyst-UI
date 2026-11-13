import { Header, HeaderAction, HeaderLink } from "@/components/ui/header";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { IconFileXls, IconGear, IconUserPlus } from "@/components/ui/icons";

export default function HeaderDemo() {
  return (
    <div style={{ display: "grid", gap: 16, width: "100%" }}>
      {/* ФИО и роль — только в меню под аватаром */}
      <Header userName="Афанасьева Мария" userRole="Наставник" notifications={3} />
      <Header
        userName="Иванов Пётр"
        userRole="Кадровый администратор"
        userMenu={<DropdownMenuItem icon={<IconGear />}>Настройки</DropdownMenuItem>}
        actions={
          <>
            <HeaderAction aria-label="Создать отчёт .xls">
              <IconFileXls />
            </HeaderAction>
            <HeaderAction aria-label="Добавить наставника">
              <IconUserPlus />
            </HeaderAction>
          </>
        }
      />
      <Header
        userName="Иванов Пётр"
        userRole="Кадровый администратор"
        actions={
          <>
            <HeaderLink>Создать отчёт .xls</HeaderLink>
            <HeaderLink>Добавить наставника</HeaderLink>
          </>
        }
      />
    </div>
  );
}
