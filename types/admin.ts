// Kiểu dùng chung cho bộ CRUD admin (components/admin/crud/*).
// Mọi giá trị đều phải serialize được vì được truyền từ Server Component sang Client Component.

export type FieldType = "text" | "textarea" | "number" | "checkbox" | "select" | "multiselect" | "date";

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: FieldOption[];
  rows?: number;
  // Chiếm cả 2 cột trong form.
  full?: boolean;
  // select: bỏ chính bản ghi đang sửa khỏi danh sách (vd. danh mục cha).
  excludeSelf?: boolean;
  defaultValue?: FormValue;
}

export type FormValue = string | boolean | string[];
export type FormValues = Record<string, FormValue>;

export type CellType = "text" | "strong" | "muted" | "bool" | "number";

export interface ColumnDef {
  key: string;
  label: string;
  type?: CellType;
  align?: "right";
}

export type CellValue = string | number | boolean | null;

export interface CrudRow {
  id: string;
  cells: Record<string, CellValue>;
  // Giá trị đổ vào form khi bấm "Sửa".
  values: FormValues;
  // Link xem trên website (nếu có).
  viewHref?: string;
  // Chuỗi đã chuẩn hoá để lọc phía client.
  search: string;
}

export type AdminActionResult =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Record<string, string[] | undefined> };

export type SaveAction = (id: string | null, values: FormValues) => Promise<AdminActionResult>;
export type DeleteAction = (id: string) => Promise<AdminActionResult>;
