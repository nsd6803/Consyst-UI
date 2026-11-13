import { useState } from "react";
import { Tag } from "@/components/ui/tag";

const all = ["React", "TypeScript", "Figma", "SQL", "Python", "Аналитика"];

export default function TagDemo() {
  const [skills, setSkills] = useState(["React", "TypeScript", "Figma"]);
  const [filters, setFilters] = useState<string[]>(["SQL"]);

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div>
        <p style={{ margin: "0 0 8px", fontSize: 12, color: "var(--color-fg-secondary)" }}>Навыки (можно удалить)</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {skills.map((s) => (
            <Tag key={s} onRemove={() => setSkills((list) => list.filter((x) => x !== s))}>
              {s}
            </Tag>
          ))}
        </div>
      </div>
      <div>
        <p style={{ margin: "0 0 8px", fontSize: 12, color: "var(--color-fg-secondary)" }}>Фильтр (выбор)</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {all.map((s) => (
            <Tag
              key={s}
              selected={filters.includes(s)}
              onClick={() => setFilters((f) => (f.includes(s) ? f.filter((x) => x !== s) : [...f, s]))}
            >
              {s}
            </Tag>
          ))}
          <Tag disabled>Недоступно</Tag>
        </div>
      </div>
    </div>
  );
}
