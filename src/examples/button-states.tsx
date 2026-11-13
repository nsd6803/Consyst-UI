import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ButtonStates() {
  const [loading, setLoading] = useState(false);
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Button
        loading={loading}
        onClick={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 1500);
        }}
      >
        {loading ? "Отправляем…" : "Отправить отчёт"}
      </Button>
      <Button disabled>Недоступно</Button>
      <Button variant="soft" disabled>
        Недоступно
      </Button>
      <Button asChild variant="link">
        <a href="#/components/button">Ссылка-кнопка</a>
      </Button>
    </div>
  );
}
