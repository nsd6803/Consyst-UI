import { RadioGroup } from "@/components/ui/radio";

export default function RadioDemo() {
  return (
    <RadioGroup
      name="format"
      defaultValue="office"
      options={[
        { value: "office", label: "Очно" },
        { value: "remote", label: "Удалённо" },
        { value: "hybrid", label: "Гибрид" },
        { value: "none", label: "Недоступно", disabled: true },
      ]}
      onChange={(v) => console.log(v)}
    />
  );
}
