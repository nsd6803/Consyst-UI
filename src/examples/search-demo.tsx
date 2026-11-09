import { useState } from "react";
import { Search } from "@/components/ui/search";

const students = ["Комарова Елена", "Афанасьева Мария", "Иванов Пётр", "Смирнов Олег"];

export default function SearchDemo() {
  const [query, setQuery] = useState("");
  const found = students.filter((s) => s.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{ display: "grid", gap: 12, width: 280 }}>
      <Search placeholder="Поиск по ФИО" value={query} onChange={(e) => setQuery(e.target.value)} onClear={() => setQuery("")} />
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#4a5565" }}>
        {found.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <Search size="small" placeholder="Маленький поиск" />
    </div>
  );
}
