# PROJECT TODO

## [P0] Must
- WU-12 DEPLOY: DONE — migration + Journal đã xuất bản riêng tư thành công.
- WU-09A: beginner explanations ngay tại Codex detail. Done = nội dung ngắn đúng ngữ cảnh, đọc bằng keyboard/touch, build pass, kiểm tra route cung + nhà.
- WU-09B: QA cuối Phase 2: đường dẫn liên quan, empty search, invalid entity, form tạo/lưu kết quả gốc, responsive tablet; sửa regression trước feature khác.
- WU-10: kiểm tra và xuất bản đúng bản đã xác minh khi đến checkpoint bàn giao Phase 2; xác nhận auth/admin trên máy chủ. Giữ audience hiện tại.

## [P1] Important
- Thêm tự động lưu bản nháp cục bộ và khôi phục nội dung đang gõ nếu kết nối mất trước lần lưu đầu.
- Cân nhắc xóa bài có hộp xác nhận và cơ chế phục hồi; chưa thêm vì yêu cầu hiện tại chỉ cần tạo/sửa.
- WU-11: bổ sung thần thoại riêng cho 12 cung từ nguồn tin cậy, phân biệt với astronomy và fantasy. Không dựng lore giả làm lịch sử.
- Kiểm thử nhiều tài khoản và thêm phục hồi/retry cho thao tác offline trước khi gọi đồng bộ là hoàn chỉnh.

## [P2] Enhancement
- Visual language riêng cho từng nguyên tố, cải thiện chuyển trạng thái sau core QA.
- Tên trang Codex detail cụ thể; nội dung sâu hơn và chú giải quan hệ ngược dễ đọc.

## [P3] Experimental
- Fantasy Universe: chỉ bắt đầu khi người dùng đã xem và duyệt Phase 2.
- Engine thiên văn thật: cần chọn dữ liệu/engine và xác minh trước, không mô phỏng kết quả thật.

## Execution rule
Một work unit một phạm vi, 0 dependency mặc định. Dành khoảng 10% cuối lượt cho build, checkpoint và bàn giao; không mở work unit mới khi không đủ phần dự phòng. Mỗi điểm dừng phải build pass và có NEXT ACTION. Không hứa đo chính xác phần trăm token nếu môi trường không cung cấp bộ đếm.
