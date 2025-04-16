# PWCode

## Mô tả
Trang web hỗ trợ viết và chạy code HTML, CSS và Javascript.

Dựa trên đó,  xây dựng các tính năng sau:
- Chia sẻ code đã viết, hỏi đáp cơ bản với code được người khác chia sẻ
- Xây dựng lớp học để giao bài tập, cung cấp công cụ làm bài. Hỗ trợ giáo viên chấm điểm, có AI hỗ trợ so sánh code.
- Xem lại các bài tập đã làm.

## Xây dựng môi trường chạy

Để có thể chạy được dự án cần, đổi tên file `env.example` thành `.env.local`.

Cung cấp các API Key cần thiết

1. Cài đặt thư viện cần thiết
```bash
pnpm install
```
2. Tạo cơ sở dữ liệu
```bash
pnpm run push
```

3. Chạy dự án
```bash
pnpm run dev
```

4 (Tùy chọn). Tạo dữ liệu mẫu
```bash
pnpm run seed
```