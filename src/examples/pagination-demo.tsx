import { useState } from "react";
import { Pagination } from "@/components/ui/pagination";

export default function PaginationDemo() {
  const [page, setPage] = useState(5);
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Pagination page={page} pageCount={20} onPageChange={setPage} />
      <Pagination page={page} pageCount={20} onPageChange={setPage} size="sm" siblings={0} />
    </div>
  );
}
