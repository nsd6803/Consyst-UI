import { ApprovalComment, ApprovalEvent, ApprovalMarker } from "@/components/ui/approval";

export default function ApprovalParts() {
  return (
    <div style={{ display: "grid", gap: 24, width: 320 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <ApprovalMarker status="neutral" />
        <ApprovalMarker status="returned" />
        <ApprovalMarker status="approved" />
      </div>
      <ApprovalComment author="Иванова М. С.">Не хватает литературных источников.</ApprovalComment>
      <ApprovalEvent title="Практикант направил задание" date="26.06.2024 12:20" connector={false} />
    </div>
  );
}
