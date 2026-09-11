// Short cultural references; these are traditions, not scientific explanations.
export const zodiacMyths = [
 ['Cừu vàng → Jason', 'Bộ lông cừu vàng gắn với hành trình của Jason.', 'oxford'],
 ['Bò trắng → Europa', 'Zeus mang hình bò trong truyện Europa.', 'oxford'],
 ['Song sinh → Dioscuri', 'Castor và Polydeuces được ghi nhớ qua hình tượng song sinh.', 'theoi'],
 ['Cua → Hydra', 'Con cua trợ giúp Hydra trong cuộc chiến với Heracles.', 'theoi'],
 ['Sư tử → Heracles', 'Sư tử gắn với chiến công đầu tiên của Heracles.', 'oxford'],
 ['Thiếu nữ → Astraea', 'Astraea là một truyền thống gắn với hình tượng Virgo.', 'theoi'],
 ['Cán cân → Astraea', 'Truyền thống Astraea cũng gắn với hình tượng cán cân.', 'theoi'],
 ['Bọ cạp → Scorpius', 'Theoi ghi hình tượng Scorpius trong hệ truyện sao Hy Lạp.', 'theoi'],
 ['Người bắn cung → Chiron', 'Chiron là một cách liên hệ được ghi nhận, không phải cách duy nhất.', 'theoi'],
 ['Dê–cá → Pan', 'Pan đổi hình khi trốn Typhon; nửa dưới hóa cá.', 'oxford'],
 ['Người rót nước → Ganymedes', 'Ganymedes trở thành người dâng chén cho các thần.', 'theoi'],
 ['Đôi cá → Ichthyes', 'Theoi liên hệ Pisces với hình tượng đôi cá Ichthyes.', 'theoi'],
] as const;
export const mythSources = { oxford: 'https://www.gtc.ox.ac.uk/about/history/radcliffe-observatory/zodiac-signs/', theoi: 'https://www.theoi.com/greek-mythology/star-myths.html' };
export const houseGroups = [
 {name:'Angular · Nhà góc', numbers:[1,4,7,10], description:'Bốn vị trí góc trong hệ phân nhóm nhà.'},
 {name:'Succedent · Nhà kế tiếp', numbers:[2,5,8,11], description:'Bốn nhà theo sau các nhà góc.'},
 {name:'Cadent · Nhà tiếp chuyển', numbers:[3,6,9,12], description:'Bốn nhà còn lại trước nhóm góc kế tiếp.'},
];
export const houseGroupsSource='https://libsysdigi.library.uiuc.edu/oca/Books2007-10/astrologyitstech00libr/astrologyitstech00libr.pdf';
