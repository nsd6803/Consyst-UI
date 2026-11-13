import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { IconPlus, IconSearch } from "@/components/ui/icons";

export default function EmptyStateDemo() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, width: "100%" }}>
      <EmptyState
        title="Пока нет практикантов"
        description="Добавьте первого практиканта или загрузите список из Excel"
        action={
          <>
            <Button leftIcon={<IconPlus />}>Добавить</Button>
            <Button variant="soft">Загрузить</Button>
          </>
        }
      />
      <EmptyState
        icon={<IconSearch />}
        title="Ничего не найдено"
        description="Попробуйте изменить запрос или сбросить фильтры"
        action={<Button variant="link">Сбросить фильтры</Button>}
      />
    </div>
  );
}
