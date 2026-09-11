# Mystical Self — audit và kế hoạch nâng cấp

## Phase 0 — đã kiểm tra source trước khi sửa

React 19, TypeScript 5.9, Vite 7, npm với package-lock.json; React Router 7 (BrowserRouter). CSS thuần, token ở src/styles.css; Framer Motion 12 và Lucide. Không Tailwind, Next.js, GSAP hoặc Three.js. Build gốc thành công.

Frontend: App context giữ readings; ToolPage tạo kết quả từ engine và chuyển /result/:id; PersonalPages dùng chung readings để lưu, thêm hồ sơ, xóa, chia sẻ PNG/text; notes/drafts lưu localStorage. API Worker + D1 có users/readings/content; build client và Worker riêng. Schema server không nằm trong kiểm tra TypeScript hiện tại.

Sitemap giữ /, /explore, /tool/:slug (9 công cụ), /result/:id, /profile, /saved, /about, /admin. Trang chủ thêm các anchor zodiac, planets, chart, elements, moon, compatibility, daily, knowledge. Không thay routing architecture.

| Phần | Quyết định | Lý do |
|---|---|---|
| 9 engine và dữ liệu quiz/Tarot | KEEP | Logic tách độc lập, có 8 test; giới hạn được công bố |
| DateInput, TimeInput, ToolPage | KEEP / IMPROVE | Giữ validation, drafts, flow; thêm sơ đồ vào kết quả bản đồ sao |
| Profile, Saved, notes, share | KEEP | Luồng sản phẩm quan trọng |
| Home | REPLACE composition | Hero, 6 thẻ, 4 bước và 3 giá trị đang lặp; thiếu khám phá trực tiếp |
| Explore + ToolCard | KEEP | Grid phù hợp danh mục có tìm kiếm và bộ lọc |
| Celestial, favicon | KEEP | Tái sử dụng vòng thiên thể và nhận diện |
| Navigation | IMPROVE | Thêm điều hướng khu vực có active state, dùng được touch |
| CSS | IMPROVE | Giữ stylesheet cũ cho công cụ, thêm stylesheet trải nghiệm có scope; navy/gold/silver/rose |
| Animation | IMPROVE | Motion reveal theo viewport, transition có chủ đích; giảm chuyển động và dừng ngoài viewport |
| Empty / admin | IMPROVE | Admin đang ẩn trong component trạng thái trống; cần route rõ |
| Storage | IMPROVE | Save hiện DELETE toàn bộ rồi POST; cần cập nhật từng bản ghi và tránh chạy chồng |
| Backend | KNOWN ISSUE | Quyền admin mặc định quá rộng; chưa kiểm thử đầy đủ D1/auth; không khẳng định đã hoàn thiện |
| Assets / file | REMOVE: none | Không xóa asset hay migration hiện có |

## Kế hoạch thiết kế và luồng

Chủ đề: đài quan sát đêm, nền navy sâu, typography editorial màu champagne, sơ đồ vàng mảnh. Zodiac dùng composition tròn + panel; planets dùng thanh quỹ đạo ngang; moon dùng visual lớn + timeline; compatibility dùng hai biểu tượng và đường nối; knowledge dùng trang tạp chí bất đối xứng. Không dùng grid thẻ cho tất cả section.

Luồng: chọn cung trên hero/wheel → đọc thông tin → khám phá thiên thể → mở công cụ bản đồ sao → giữ kết quả trong hồ sơ → quay lại nhật ký. Các trải nghiệm phụ luôn có nhãn, hướng dẫn và CTA cụ thể.

P0: nền thị giác, hero/navigation, Zodiac Explorer, bảo toàn công cụ và sửa rủi ro ghi đè toàn bộ dữ liệu. P1: Planet/Moon, sơ đồ chart minh họa, Element Balance, compatibility suy ngẫm không chấm điểm thật, daily reveal, knowledge. P2 chưa triển khai: transits, ephemeris chính xác, WebGL, scroll pinning cưỡng bức.

File giữ: config, lockfile, types, engine/data gốc, form components, assets, migration. File sửa: App, main, storage, UI, PersonalPages và chỉnh tối thiểu server cho lỗi ownership nếu cần. Tạo: components/cosmic/*, data/cosmos.ts, pages/CosmicHome.tsx, cosmic.css và báo cáo này. Không dependency mới; Framer Motion hiện có. SVG cho sơ đồ mang thông tin, CSS cho ánh sáng và nền. Không thêm hàng nghìn particles, thư viện smooth-scroll hay 3D.

## Kiểm thử và giới hạn

Mỗi phase phải build trước phase sau. Final kiểm tra các routes, thao tác wheel/planet/moon/reveal, keyboard, mobile/tablet/desktop và reduced motion. Không xóa dữ liệu thật khi QA.

Birth chart chỉ có Sun sign theo ngày quy ước; các vòng/nhà/aspect mẫu phải ghi rõ minh họa. Moon dùng chu kỳ trung bình, ghi rõ ước tính. Compatibility và daily là nội dung biên tập tự suy ngẫm, không phải dự báo hoặc đo độ hợp nhau.

Phase 0: CREATED báo cáo này; MODIFIED none; REMOVED none; DEPENDENCIES none; TEST build gốc pass; KNOWN ISSUES như trên.

## Bổ sung yêu cầu — Phase 2: Astrology exploration

Audit lại trên source vừa hoàn thiện: KEEP CosmicHero, MotionConfig, ExperienceSection, MoonExperience, tool/result/profile routes và CSS tokens. IMPROVE ZodiacExplorer (artwork/chòm sao/quan hệ), PlanetExplorer (ba lớp thông tin), ElementBalance (liên hệ), CompatibilityExperience (so sánh cấu trúc). MERGE mô tả quan hệ vào data/knowledge.ts dùng chung. CREATE HouseExplorer, ZodiacMatrix, ConnectionMap, Codex page và navigation liên quan. REMOVE không có file; bỏ hai hàm HomePage/AboutPage cũ không còn caller đã xác minh để tránh nội dung riêng tư mâu thuẫn.

Data: entity có id/type/name/description/relationships/visual/metadata; dữ liệu tĩnh có kiểm tra liên kết, không thêm DB cho nội dung biên tập. Quan hệ House–Zodiac là phép liên tưởng hiện đại, phải ghi rõ không phải nhà cá nhân hoặc đồng nhất nhà với cung. Modality có 3 nhóm x 4 nguyên tố = 12 cung. Chủ tinh cổ điển/hiện đại được phân biệt. Fantasy bridge có type dự phòng, không có lore/entry trống trên giao diện.

Sitemap mở rộng /codex và /codex/:entityId; Home thêm Houses và matrix ở nhịp nghỉ giữa các trải nghiệm. ConnectionMap nằm trong Codex để không nhồi mọi diagram vào cùng một màn hình. Search tra tên, tiếng Anh và quan hệ. Mỗi entry dẫn tới entry liên quan; nút quay lại thư mục và browser history giữ được.

Artwork: hai atlas đồng nhất bằng imagegen built-in (12 cung và 10 thiên thể), trình bày crop bằng CSS; SVG riêng cho dữ liệu chòm sao và sơ đồ có tương tác. Dữ liệu chòm sao từ D3 Celestial, hiển thị sơ đồ phẳng đơn giản có nhãn, không dùng làm bản đồ định vị bầu trời thời gian thực.

Thứ tự: data → Zodiac → Planets → Houses → Elements/Modalities → ConnectionMap → Codex → Explore next → responsive/accessibility/performance → final QA. Build sau từng nhóm, dừng sửa lỗi trước khi tiếp tục. Không xây Fantasy Universe lớn; sau hoàn tất dừng cho người dùng kiểm tra.

## CHECKPOINT: WU-08A — 2026-09-11

STATUS: DONE cho phạm vi ổn định và điều hướng mobile. PHASE STATUS: PARTIAL.

COMPLETED: thêm Codex vào thanh điều hướng mobile và active state route con; tra entity không nhận khóa kế thừa; thông báo kết quả/xóa nêu đúng phạm vi tài khoản; cập nhật tài liệu lưu trữ. Các feature trước checkpoint: 41 entity, wheel cung/nhà, thiên thể, matrix, comparison, connection map, search và explore-next đã có implementation.

FILES MODIFIED: src/App.tsx, src/data/knowledge.ts, src/pages/PersonalPages.tsx, README.md, IMPLEMENTATION.md.

FILES CREATED: scripts/knowledge.test.mjs, PROJECT_STATUS.md, PROJECT_TODO.md. Các file cosmic/artwork/data và test backend/storage đã tạo ở phần triển khai trước WU-08A, còn trong working tree.

REMOVED: không xóa file/asset. DEPENDENCIES: 0 mới.

BUILD: PASS — npm run build sau thay đổi source cuối cùng. Không sửa source sau build.

TESTED: 8/8 backend/storage/knowledge tests pass. 8 engine tests đã pass trước đó, engine không đổi. Browser: Mars → đúng ba mục; chọn Nhà 8; matrix Song Ngư → đúng route; so sánh Bạch Dương/Thiên Bình mở được; Codex mobile navigation hoạt động. Console error log trong phiên QA: rỗng. Trang chủ không tràn ngang ở 320 (scrollWidth 305) và 768 (753); Codex/map đã xem 1440/390/320. Không khẳng định đã kiểm hết mọi route/thiết bị hoặc auth production.

KNOWN ISSUES: xem PROJECT_STATUS.md; mythology cung còn ngắn, beginner explanations chưa đầy đủ ở direct entry, offline recovery chưa có UI, auth/admin mới chưa QA production.

NEXT WORK UNIT: WU-09A — giải thích thuật ngữ cho người mới tại Codex detail.

SAFE TO STOP: YES. Chưa xuất bản bản nâng cấp; bản localhost dành cho kiểm tra. Dừng ở checkpoint theo execution protocol mới.

## CHECKPOINT: WU-12 — Dynamic Journal

STATUS: DONE và đã triển khai riêng tư. SAFE TO STOP: YES.

CREATED: drizzle/0002_articles.sql, src/pages/JournalPage.tsx. MODIFIED: server/index.ts, src/lib/api.ts, src/types.ts, src/App.tsx, src/components/cosmic/CosmicKnowledge.tsx, src/cosmic.css, scripts/backend.test.mjs và tài liệu checkpoint. REMOVED: không có. DEPENDENCIES: 0 mới.

FEATURES: danh sách bài, trang đọc, tạo bài, bản nháp/xuất bản, sửa bài; dữ liệu D1; author ownership; bản nháp chỉ hiện cho chủ sở hữu; điều hướng Ghi chép thay khu quản trị. API quản trị nội dung công cụ cũ được giữ tương thích nhưng không còn route/nav giao diện.

BUILD: PASS. TEST: 9/9 backend/storage/knowledge pass, trong đó test bài viết xác nhận tài khoản khác không thể đọc bản nháp hoặc sửa bài, và đọc được bài sau khi xuất bản. Local Vite không chạy Worker nên thao tác lưu thật chỉ hoạt động trên bản Sites.

## Artwork đã tạo

public/art/zodiac-atlas.webp: 1448×1086, 327270 bytes. Bố cục 4×3: Aries/Taurus/Gemini/Cancer; Leo/Virgo/Libra/Scorpio; Sagittarius/Capricorn/Aquarius/Pisces.

public/art/planet-atlas.webp: 1983×793, 229040 bytes. Bố cục 5×2: Sun/Moon/Mercury/Venus/Mars; Jupiter/Saturn/Uranus/Neptune/Pluto.

Prompt direction: equal square cells, no gaps/borders/text, deep navy #090e1b, champagne-gold and silver antique copperplate engraving, consistent scale and lighting, one centered subject per cell. Zodiac uses ram, bull, twins, crab, lion, wheat maiden, scales, scorpion, centaur archer, sea-goat, water bearer, two fish; planets use corresponding celestial bodies. Đây là artwork AI minh họa, không phải ảnh quan sát. Hai yêu cầu tạo ảnh; không tạo variants bổ sung. License đường nối chòm sao nằm trong public/credits.txt.
