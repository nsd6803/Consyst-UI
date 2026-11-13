import { ApprovalHistory } from "@/components/ui/approval";

export default function ApprovalDemo() {
  return (
    <div style={{ width: 380 }}>
      <ApprovalHistory
        height={420}
        events={[
          { status: "neutral", title: "Практикант направил задание", date: "24.06.2024 10:02" },
          { status: "neutral", title: "Практикант направил задание", date: "26.06.2024 12:20" },
          {
            status: "returned",
            title: "Наставник вернул на доработку",
            date: "26.06.2024 14:05",
            comment: {
              author: "Иванова М. С.",
              text: "Не хватает литературных источников. Добавьте минимум 5 источников и оформите список по ГОСТ.",
            },
          },
          { status: "neutral", title: "Практикант направил задание", date: "27.06.2024 09:12" },
          { status: "approved", title: "Наставник согласовал документы", date: "27.06.2024 16:44" },
          { status: "approved", title: "Кадровый администратор согласовал завершение практики", date: "28.06.2024 11:00" },
        ]}
      />
    </div>
  );
}
