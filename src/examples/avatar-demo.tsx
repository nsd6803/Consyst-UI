import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { Counter } from "@/components/ui/counter";

export default function AvatarDemo() {
  return (
    <div style={{ display: "grid", gap: 20, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
          <Avatar key={s} size={s} name="Афанасьева Мария" />
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Avatar name="Комарова Елена" />
        <Avatar name="Иванов Пётр" />
        <Avatar name="Смирнов Олег" />
        <Counter dot>
          <Avatar name="Кузнецова Анна" size="lg" />
        </Counter>
      </div>
      <AvatarGroup max={3}>
        <Avatar name="Комарова Елена" />
        <Avatar name="Иванов Пётр" />
        <Avatar name="Смирнов Олег" />
        <Avatar name="Кузнецова Анна" />
        <Avatar name="Петров Илья" />
      </AvatarGroup>
    </div>
  );
}
