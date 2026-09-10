# Mystical Self

Website tiếng Việt khám phá bản thân qua chín hệ biểu tượng. React, TypeScript, Vite, CSS có design token, Framer Motion và Lucide. Phiên bản hiện tại có Worker + D1 + xác thực người dùng để đồng bộ kết quả và khu vực quản trị nội dung.

## Chạy dự án

Yêu cầu Node.js 22.12+ hoặc 24 LTS.

```sh
npm install
npm run dev
```

Mở địa chỉ Vite in trong terminal (thường là http://localhost:5173).

```sh
npm run build
npm run preview
npm test
```

## Chức năng

- Trang chủ, tìm kiếm và lọc 9 công cụ, đề xuất và lịch sử truy cập.
- Thần số học giữ 11/22/33; Tarot 78 lá, 1 hoặc 3 lá xuôi/ngược; ba bài quiz có điểm và quy tắc hòa ổn định.
- Pha trăng gần đúng; con giáp xét Tết qua lịch Trung Hoa Intl; từ điển giấc mơ local; cung Mặt Trời theo mốc ngày.
- Kết quả riêng, lưu/bỏ lưu, thêm/bỏ khỏi hồ sơ, ghi chú suy ngẫm, Web Share/clipboard, thẻ PNG tải xuống.
- Bản nháp phục hồi khi tải lại trang, hộp xác nhận xóa kết quả hoặc toàn bộ dữ liệu, trang 404 và trạng thái trống.
- Dữ liệu kết quả thuộc về tài khoản đang đăng nhập, đồng bộ qua API Worker và D1. Khi API tạm thời không sẵn sàng, giao diện giữ bản sao localStorage để không làm mất thao tác hiện tại.
- `/admin` cho quản trị viên chỉnh nội dung chín công cụ và xem tổng số tài khoản/kết quả. Mặc định Site owner có quyền quản trị; để giới hạn rõ ràng, đặt biến môi trường `ADMIN_USER_IDS` (danh sách user ID hoặc email, phân tách bằng dấu phẩy).
- Điều hướng desktop/mobile, bàn phím, modal HTML native quản lý focus, reduced motion, page splitting.

## Cấu trúc

`src/data` giữ cấu hình công cụ, câu hỏi và diễn giải. `src/lib/engine.ts` chứa hàm tính độc lập; `storage.ts` tập trung lưu trữ. `src/components` chứa visual và UI dùng chung; `src/pages` chứa tool flow và trang cá nhân. `src/styles.css` tổ chức token, bố cục, component, responsive theo nhóm. Nội dung chuyên môn ở data; nội dung giao diện nằm trong các page để có thể trích sang catalog i18n khi bổ sung ngôn ngữ.

## Riêng tư và giới hạn

Dữ liệu nháp, tùy chọn gần đây và bản sao dự phòng lưu dưới namespace `mystical-self:`. Kết quả chính được lưu theo user ID trong D1 sau khi đăng nhập; server chỉ lưu inputSummary và result đã tạo, không lưu ngày sinh, họ tên đầy đủ, mô tả giấc mơ hay câu hỏi gốc. Không đưa dữ liệu cá nhân vào URL; ID kết quả chỉ là định danh opaque. Không có liên kết kết quả công khai. Font giao diện tải từ Google Fonts, với font hệ thống dự phòng.

Các kết quả là giải trí và tự suy ngẫm, không phải chẩn đoán hay dự đoán. Pha Mặt Trăng là phép xấp xỉ chu kỳ (giờ UTC+7); bản đồ sao chỉ có cung Mặt Trời gần đúng, không có cung Mọc/Mặt Trăng giả định. Con giáp cần hỗ trợ lịch Chinese Intl trong trình duyệt.

## Triển khai

Worker được bundle tại `dist/server/index.js`, client tại `dist/client` và migration tại `drizzle/`. `.openai/hosting.json` khai báo D1 binding `DB`. Worker phục vụ asset qua `env.ASSETS`, route `/api/*` xử lý xác thực, kết quả và quản trị; các route SPA còn lại dùng fallback về `index.html`. Không cấu hình cache HTML vĩnh viễn; asset có hash có thể cache lâu.
