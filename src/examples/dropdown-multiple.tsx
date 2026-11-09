import { Dropdown } from "@/components/ui/dropdown";

const statuses = [
  { value: "waiting", label: "Ожидает подбор" },
  { value: "review", label: "На согласовании" },
  { value: "approved", label: "Согласован" },
  { value: "active", label: "Проходит практику" },
  { value: "done", label: "Завершил" },
];

export default function DropdownMultiple() {
  return (
    <Dropdown
      multiple
      searchable
      resettable
      placeholder="Статус"
      options={statuses}
      defaultValue={["waiting", "review"]}
      onChange={(v) => console.log(v)}
    />
  );
}
