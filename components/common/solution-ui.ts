// Chỉ đặt flex-grow từ md trở lên: trên mobile các card xếp dọc (flex-col),
// flex-1 (flex-basis: 0) sẽ làm card có nội dung absolute bị co về chiều cao 0.
export const solutionUI = {
  "nha-xuong": {
    span: "md:flex-5",
  },
  "cao-tang": {
    span: "md:flex-4",
  },
  "be-tong-tuoi": {
    span: "md:flex-3",
  },
  "be-tong-duc-san": {
    span: "md:flex-3",
    titleTight: true,
  },
  "cua-hang-vlxd": {
    span: "md:flex-6",
    titleLine2: "Kênh Phân Phối",
    titleTight: true,
  },
  "thau-tho": {
    span: "md:flex-3",
  },
} as const;
