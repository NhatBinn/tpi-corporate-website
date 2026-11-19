import CrudManager from "@/components/admin/crud/CrudManager";
import { deleteFeedbackAction } from "@/actions/admin/feedback";
import { getAdminFeedback } from "@/services/admin/dashboard.service";
import { searchText, str } from "@/lib/admin-rows";
import type { ColumnDef, CrudRow, FieldDef } from "@/types/admin";

const columns: ColumnDef[] = [
  { key: "name", label: "Người gửi", type: "strong" },
  { key: "email", label: "Email" },
  { key: "phone", label: "SĐT" },
  { key: "company", label: "Công ty" },
  { key: "message", label: "Lời nhắn" },
];

// Liên hệ do khách gửi từ /lien-he → chỉ xem và xoá, không sửa.
const fields: FieldDef[] = [
  { name: "name", label: "Họ tên", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "phone", label: "Số điện thoại", type: "text" },
  { name: "company", label: "Công ty", type: "text" },
  { name: "message", label: "Lời nhắn", type: "textarea", full: true, rows: 8 },
];

export default async function AdminFeedbackPage() {
  const res = await getAdminFeedback();

  const rows: CrudRow[] = res.success
    ? res.data.map((f) => ({
        id: f.id,
        cells: { name: f.name, email: f.email, phone: f.phone, company: f.company, message: f.message },
        values: {
          name: f.name,
          email: f.email,
          phone: str(f.phone),
          company: str(f.company),
          message: f.message,
        },
        search: searchText(f.name, f.email, f.phone, f.company, f.message),
      }))
    : [];

  return (
    <CrudManager
      title="Liên hệ từ khách hàng"
      entity="liên hệ"
      columns={columns}
      fields={fields}
      rows={rows}
      deleteAction={deleteFeedbackAction}
      loadError={res.success ? null : res.error}
      note="gửi từ form trang Liên hệ"
    />
  );
}
