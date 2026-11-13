import { useState } from "react";
import { Search } from "@/components/ui/search";

const students = ["Комарова Елена", "Афанасьева Мария", "Иванов Пётр", "Смирнов Олег", "Кузнецова Анна"];

export default function SearchDemo() {
  const [query, setQuery] = useState("");
  const found = students.filter((s) => s.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{ display: "grid", gap: 12, width: 320 }}>
      <Search
        placeholder="Поиск по ФИО"
        aria-label="Поиск по ФИО"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClear={() => setQuery("")}
      />
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: "var(--color-fg-secondary)" }}>
        {found.map((s) => (
          <li key={s}>{s}</li>
        ))}
        {found.length === 0 && <li>Ничего не найдено</li>}
      </ul>
      <Search size="sm" placeholder="Компактный поиск" aria-label="Компактный поиск" />
    </div>
  );
}
