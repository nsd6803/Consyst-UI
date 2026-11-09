import { useState } from "react";
import { Tag } from "@/components/ui/tag";

export default function TagDemo() {
  const [skills, setSkills] = useState(["React", "TypeScript", "Figma", "SQL"]);
  const [active, setActive] = useState("React");

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <Tag>Default</Tag>
        <Tag state="active">Active</Tag>
        <Tag state="inactive">Inactive</Tag>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {skills.map((s) => (
          <Tag
            key={s}
            state={s === active ? "active" : "default"}
            onClick={() => setActive(s)}
            onEdit={() => alert(`Редактировать «${s}»`)}
            onRemove={() => setSkills((list) => list.filter((x) => x !== s))}
          >
            {s}
          </Tag>
        ))}
      </div>
    </div>
  );
}
