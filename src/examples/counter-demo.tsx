import { Counter } from "@/components/ui/counter";
import { Button } from "@/components/ui/button";
import { IconBell } from "@/components/ui/icons";

export default function CounterDemo() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
      <Counter count={4} />
      <Counter count={128} />
      <Counter count={12} tone="primary" />
      <Counter count={3} tone="neutral" />
      <Counter dot />
      <Counter count={7}>
        <Button variant="secondary" iconOnly aria-label="Уведомления, новых: 7">
          <IconBell />
        </Button>
      </Counter>
      <Counter dot>
        <Button variant="secondary" iconOnly aria-label="Уведомления, есть новые">
          <IconBell />
        </Button>
      </Counter>
    </div>
  );
}
