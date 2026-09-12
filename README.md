# Mystical Self · V1

Interactive Astrology Exploration + Cosmic Identity. Website tiếng Việt khám phá biểu tượng chiêm tinh, phân biệt nội dung thiên văn và diễn giải sáng tạo.

Public: https://tranngochuyc-cyber.github.io/mystical-self/

## Tính năng
- Zodiac, Planet, House Explorers; Element/Modality Matrix; Connection Map.
- Cosmic Codex: 41 mục kiến thức liên kết, giải thích cho người mới.
- Cosmic Profile: tự chọn Sun/Moon/Rising, tỷ lệ nguyên tố/tính chất, archetype sáng tạo, lưu/sửa/đặt lại riêng trên trình duyệt.
- Chín công cụ suy ngẫm, kết quả đã lưu; giao diện bàn phím và điện thoại.

## Phát triển
Stack: React 19, TypeScript, Vite 7, React Router, CSS, Framer Motion, Lucide. Dùng Node 24 và npm ci, sau đó npm run dev.

- npm run build: build Sites client + Worker.
- npm run build:pages: production GitHub Pages, base /mystical-self/.
- npm run preview -- --mode github-pages --port 4174 --strictPort: xem bản Pages tại http://localhost:4174/mystical-self/.
- npm test: engine tests.
- node scripts/phase2-suite.mjs: regression trên preview đang chạy.
- node scripts/cosmic-identity-browser.test.mjs và node scripts/v1-closure.test.mjs: hồ sơ, navigation, metadata, 404 và lỗi tải.
- node --test scripts/cosmic-identity.test.mjs scripts/storage.test.mjs scripts/backend.test.mjs scripts/knowledge-context.test.mjs: logic/data/storage.
- node scripts/phase3-release-smoke.mjs: public smoke; RELEASE_URL có thể trỏ preview. Kiểm thử dùng Cốc Cốc headless tại đường dẫn Windows trong script; chỉnh executablePath nếu chạy ở máy khác.

## Deploy
Workflow .github/workflows/deploy.yml build và deploy khi push main. Pages dùng HashRouter: link sâu dạng /mystical-self/#/profile; reload không cần server rewrite. Canonical là trang gốc, không có SEO riêng cho từng hash route. Chỉ push sau khi tests/build/preview PASS; không force push.

## Giới hạn V1
Public Pages là website tĩnh. Hồ sơ lưu trên trình duyệt, không có account/cloud sync; không nên xem đây là bản sao lưu. Source Worker/D1 vẫn được giữ nhưng không chạy trên Pages. Các công cụ bản đồ sao hiện mang tính minh họa/gần đúng; không có engine ephemeris thật. Archetype là sáng tạo, không phải chẩn đoán hoặc dự đoán.

## Trạng thái
V1 COMPLETE. Future ideas: engine chiêm tinh thật, account/cloud sync, PNG profile export, fantasy/lore, AI Oracle, offline mode. Không thuộc lỗi tồn đọng V1. Không có dependency mới trong closure pass.
