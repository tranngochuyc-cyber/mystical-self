# Mystical Self

Website tiếng Việt khám phá bản thân qua chín công cụ và Cosmic Codex với 41 mục liên kết. React, TypeScript, Vite, CSS, Framer Motion và Lucide; Worker + D1 phục vụ dữ liệu tài khoản và quản trị nội dung.

## Chạy và kiểm tra

Dùng phiên bản Node phù hợp Vite 7 (máy hiện tại dùng Node 24).

```sh
npm install
npm run dev
npm run build
npm test
node --test scripts/backend.test.mjs scripts/storage.test.mjs scripts/knowledge.test.mjs
```

Vite xem trước giao diện tại localhost:5173, không chạy API Worker. Chế độ này giữ kết quả khách trên trình duyệt. Kiểm thử backend dùng SQLite trong bộ nhớ, không chạm dữ liệu thật.

## Chức năng

- Vòng hoàng đạo có chòm sao, artwork, chọn quan hệ nguyên tố/tính chất/đối diện.
- 10 thiên thể với lớp chiêm tinh, thiên văn và thần thoại; vòng 12 nhà; la bàn nguyên tố; ma trận 3 tính chất × 4 nguyên tố.
- Cosmic Codex: tìm tên tiếng Việt/Anh và quan hệ, hồ sơ trực quan, bản đồ liên kết, khám phá tiếp.
- Cosmic Journal: người dùng đăng nhập tạo bài, lưu bản nháp, xuất bản và chỉnh sửa bài của chính mình; dữ liệu được lưu trong D1.
- So sánh hai cung theo cấu trúc và câu hỏi suy ngẫm; pha trăng ước tính; thông điệp biên tập luân phiên theo ngày.
- Giữ 9 công cụ, nháp, lưu kết quả, hồ sơ, ghi chú và chia sẻ văn bản/PNG.
- Kết quả đăng nhập được lưu theo tài khoản trong D1; cập nhật từng bản ghi theo hàng đợi, không xóa cả tài khoản để lưu một kết quả.
- Việc viết bài nằm ngay trong /journal và /write, không cần trang quản trị. API cũ dành cho nội dung công cụ vẫn được giữ tương thích nhưng không còn trong điều hướng.
- Điều hướng bàn phím/touch, giao diện responsive, hỗ trợ giảm chuyển động.

## Cấu trúc

src/data/knowledge.ts là dữ liệu entity và relationship dùng chung. cosmos.ts giữ mô tả cung/thiên thể; constellations.ts giữ đường nối từ D3 Celestial. src/components/cosmic chứa các trải nghiệm tái sử dụng; src/pages/CodexPage.tsx cung cấp /codex và /codex/:entityId. src/cosmic.css mở rộng thiết kế, giữ stylesheet và kiến trúc công cụ gốc.

## Dữ liệu và giới hạn

Khách dùng localStorage; sau đăng nhập, cache kết quả tách theo tài khoản và tải dữ liệu máy chủ. Dữ liệu khách không tự nhập vào tài khoản. Ghi chú và nháp vẫn thuộc trình duyệt. Máy chủ nhận inputSummary và nội dung kết quả, có thể chứa thông tin người dùng đã nhập hoặc được diễn giải; không nên coi chúng là dữ liệu ẩn danh. Không có liên kết kết quả công khai.

Lỗi đồng bộ được thông báo và giữ bản sao cục bộ. Chưa có giao diện phục hồi xung đột/offline hoặc tự thử lại toàn bộ thao tác lỗi. Khi tải dữ liệu máy chủ, cache cũ được giữ ở khóa recovery; đây chưa phải hệ thống sao lưu nhiều phiên bản.

Chiêm tinh là diễn giải biểu tượng. Bản đồ sao chỉ xác định cung Mặt Trời theo ngày gần đúng; chưa tính cung Mọc, cung Mặt Trăng, nhà cá nhân hay góc chiếu. Pha trăng dùng chu kỳ trung bình. Nhà–cung là liên tưởng hiện đại có nhãn, không đồng nhất hai khái niệm. So sánh và daily reading không đo tương hợp hay dự báo. Chưa xây Fantasy Universe.

Artwork được tạo bằng AI và tối ưu thành hai atlas WebP; không phải ảnh thiên văn. Nguồn và giấy phép D3 Celestial ở public/credits.txt. Font có thể tải từ Google Fonts với font hệ thống dự phòng.

## Triển khai

Build tạo dist/server/index.js và dist/client. .openai/hosting.json khai báo Site và D1 binding DB; migration giữ ở drizzle/. Worker xử lý /api/* và fallback SPA. Biến môi trường quản trị đặt qua Sites, không lưu bí mật trong source.

Xem IMPLEMENTATION.md để biết audit, thay đổi theo phase và kết quả kiểm tra.
