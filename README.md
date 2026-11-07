# TIMEWISE24H

Ứng dụng React + TypeScript + Vite, đã tích hợp widget nghe YouTube nổi trên giao diện.

## Yêu cầu
- Node.js bản LTS (khuyến nghị Node 22 trở lên)
- npm

## Cài đặt và chạy trên Windows
1. Giải nén thư mục `TIMEWISE24H`.
2. Mở thư mục bằng VS Code.
3. Mở Terminal trong VS Code (`Ctrl + ``).
4. Chạy:

```bash
npm install
npm run dev
```

5. Mở địa chỉ Vite in trong Terminal (thường là http://localhost:5173).

## Tạo bản build để triển khai
```bash
npm run build
npm run preview
```
Thư mục `dist/` là bản website đã build, có thể triển khai lên Vercel hoặc Netlify.

## Lưu ý
- Dữ liệu hiện tại được lưu trong `localStorage` của trình duyệt trên từng thiết bị. Chưa có máy chủ/backend hoặc đồng bộ dữ liệu đa thiết bị.
- Widget nhạc nhúng trình phát YouTube chính thức. Một số video không cho phép phát nhúng, có giới hạn khu vực hoặc yêu cầu đăng nhập sẽ không phát được.
- Trình duyệt có thể chặn tự động phát; người dùng cần nhấn nút Phát.
