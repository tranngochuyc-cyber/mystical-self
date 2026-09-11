# PROJECT STATUS

CURRENT PHASE: Dynamic Journal
CURRENT WORK UNIT: WU-12 — lưu trữ và biên tập bài viết
LAST SAFE CHECKPOINT: WU-12, 2026-09-11
SAFE TO STOP: YES

## COMPLETED
- Data graph 41 mục, quan hệ hai chiều, tìm kiếm tiếng Việt/Anh và theo quan hệ; 3 test dữ liệu pass.
- Zodiac wheel, constellation và artwork; Planet Explorer 3 lớp; House wheel; Elements/Modality matrix; comparison; Codex detail và Connection Map đã triển khai.
- Codex có lối vào trong thanh điều hướng mobile; route con giữ trạng thái active.
- Chặn khóa kế thừa không hợp lệ trong tra cứu entity; sửa thông báo lưu/xóa để phân biệt dữ liệu trình duyệt và tài khoản.
- Build client + Worker pass. Test backend/storage/data: 8/8 pass. Engine gốc: 8/8 pass ở checkpoint trước, source engine không đổi.
- Có sổ ghi chép động: danh sách, trang đọc, tạo, lưu nháp, xuất bản và sửa bài theo chủ sở hữu; không cần giao diện admin.
- Migration 0002 tạo bảng articles và hai index theo truy vấn thực tế. Backend kiểm tra quyền sửa theo author_id.
- Điều hướng desktop/mobile có mục Ghi chép; khu editorial trang chủ dẫn vào sổ.
- Build pass; backend/storage/knowledge 9/9 pass, gồm luồng bài viết qua hai tài khoản.

## PARTIAL
- Phase 2 đã có chức năng cốt lõi nhưng chưa đủ QA toàn bộ để tuyên bố hoàn thành.
- Responsive đã xem Codex/profile/map desktop 1440 và mobile 390/320; trang chủ/comparison 320 và 768 không tràn ngang; điều hướng Codex hoạt động. Chưa kiểm thử mọi tổ hợp trên thiết bị thật.
- Nội dung thần thoại cung mới là chú giải hình tượng ngắn; chưa có truyện/tích riêng cho từng cung.
- Beginner explanations có ở sections; cần hoàn thiện thuật ngữ ngay trong các trang Codex truy cập trực tiếp.

## NOT STARTED
- Fantasy Universe/lore lớn, ephemeris thật, transit, phục hồi/xử lý xung đột offline.
- Checkpoint WU-12 đã xuất bản riêng tư lên Site hiện có: https://mystical-self.aurora-vole-9148.chatgpt.site

## KNOWN ISSUES
- Local preview không chạy API Worker; chỉ lưu khách trên trình duyệt.
- Đồng bộ lỗi giữ cache nhưng chưa có UI retry/recovery; chưa QA end-to-end đăng nhập hai tài khoản trên bản triển khai mới.
- ADMIN_USER_IDS vẫn được giữ cho API nội dung công cụ cũ; Journal không dùng vai trò admin và kiểm quyền bằng chủ bài viết. Không ghi giá trị bí mật trong source.
- Dev server có thể dừng khi phiên công cụ kết thúc; khởi động lại bằng npm run dev nếu localhost không kết nối.

## NEXT ACTION
Sau khi người dùng kiểm tra bản online: WU-09A hoàn thiện giải thích ngắn cho người mới ở Codex detail. Không mở thêm tính năng Journal trước khi có phản hồi.

BUILD STATUS: PASS (npm run build, 2026-09-11). TEST STATUS: 9/9 PASS.

## IMPORTANT ARCHITECTURE NOTES
React/Vite/npm hiện hữu; giữ routes, migration, package-lock. knowledge.ts là nguồn quan hệ; cosmic components tái sử dụng. Nhà–cung chỉ là liên tưởng hiện đại có nhãn. Các chart cá nhân chưa tính thật phải giữ nhãn minh họa. Đọc PROJECT_TODO.md rồi chỉ đọc file của work unit tiếp theo; không full audit lại.
