import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { MultiSelect } from "@/components/ui/multi-select";
import { Select } from "@/components/ui/select";
import { IconFilter } from "@/components/ui/icons";

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="soft" leftIcon={<IconFilter />}>
          Фильтры
        </Button>
      </PopoverTrigger>
      <PopoverContent title="Фильтры">
        <div style={{ display: "grid", gap: 12 }}>
          <Field label="Статус">
            <MultiSelect
              placeholder="Все статусы"
              options={[
                { value: "active", label: "Проходит практику" },
                { value: "review", label: "На согласовании" },
                { value: "done", label: "Завершил" },
              ]}
            />
          </Field>
          <Field label="ВУЗ">
            <Select
              placeholder="Все ВУЗы"
              options={[
                { value: "mirea", label: "РТУ МИРЭА" },
                { value: "mephi", label: "НИЯУ МИФИ" },
              ]}
            />
          </Field>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 4 }}>
            <PopoverClose asChild>
              <Button size="sm" variant="ghost">
                Сбросить
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button size="sm">Применить</Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
