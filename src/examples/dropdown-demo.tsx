import { Dropdown } from "@/components/ui/dropdown";

const universities = [
  { value: "mirea", label: "РТУ МИРЭА" },
  { value: "mephi", label: "НИЯУ МИФИ" },
  { value: "bmstu", label: "МГТУ им. Баумана" },
  { value: "mpei", label: "НИУ МЭИ" },
  { value: "itmo", label: "Университет ИТМО" },
];

export default function DropdownDemo() {
  return <Dropdown placeholder="Выберите ВУЗ" options={universities} onChange={(v) => console.log(v)} />;
}
