import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, Wallet, Search, LifeBuoy, CalendarCheck, Gamepad2, 
  Heart, Shield, User, X, RotateCcw, Sparkles, Mail, Lock, Bell, CheckCircle2, AlertTriangle, Play, Pause, Plus, Volume2, Music2, Youtube
} from 'lucide-react';

const TRANSLATIONS = {
  vi: {
    heroTag: "Hệ Sinh Thái Quản Lý Thời Gian Sinh Viên",
    heroTitle: "TAKE BACK YOUR TIME",
    heroSub: "Your Time. Your Choice. Your 24 Hours.",
    heroDesc: "Giải pháp toàn diện giúp sinh viên nhận diện kẻ cắp thời gian, phân bổ quỹ 24h khoa học, nâng cao hiệu suất và duy trì lối sống lành mạnh.",
    openWallet: "Mở Ví 24H Ngay",
    findThief: "Truy Tìm Kẻ Cắp",
    teamName: "Team THE FIVE",
    navWallet: "Ví 24H",
    navDetective: "Thám Tử",
    navRescue: "Cứu Quỹ",
    navChallenge: "Thử Thách 7 Ngày",
    navGame: "Mini Game",
    navPet: "Ấp Trứng Linh Thú",
    loginBtn: "Tài Khoản",
    syncStatus: "Đã Lưu Dữ Liệu Tự Động 📱💻",
    rulesBtn: "Luật",
    notifTitle: "Thông Báo Hệ Thống & Nhắc Nhở",
    
    // Wallet Module
    walletTitle: "Ví 24H - Tự Tạo Lịch Trình Cá Nhân",
    walletSubtitle: "Tự do thêm/xóa/sửa các hoạt động riêng của bạn trong ngày. Giữ tổng thời gian không vượt 24h!",
    remainingHours: "Quỹ Giờ Trống",
    usedHours: "Đã Lập Lịch",
    balanceIdeal: "Lịch trình hoàn hảo!",
    balanceDeficit: "Quá tải quỹ 24H!",
    balanceSurplus: "Còn giờ tự do",
    resetBtn: "Đặt lại",
    addActivityBtn: "Thêm Hoạt Động Mới",

    // Detective Module
    detectiveTitle: "Thám Tử Thời Gian - Vụ Án 24H",
    detectiveSubtitle: "Nhập vai Thám tử thời gian, kiểm tra chứng cứ hiện trường và truy tìm kẻ giấu mặt đang hút sạch quỹ thời gian của sinh viên!",
    inspectBtn: "Khám Xét Hiện Trường",
    solveCaseBtn: "Kết Luận Vụ Án",

    // Rescue Module
    rescueTitle: "Cứu Quỹ Thời Gian",
    rescueSubtitle: "Đồng hồ đếm ngược học tập tùy chỉnh thời gian & Bảng phân loại việc cần làm cực dễ hiểu.",
    pomodoro: "Đồng Hồ Tập Trung (Pomodoro)",
    start: "Start",
    pause: "Tạm dừng",
    eisenhower: "Bảng Phân Loại Việc Cần Làm",
    addTaskPlaceholder: "Ghi nhanh việc bạn cần làm...",
    add: "Thêm Việc",
    q1: "🔥 1. Việc Rất Gấp (Làm Ngay Lập Tức)",
    q2: "🎯 2. Việc Quan Trọng (Lên Lịch Làm Sau)",
    q3: "📩 3. Việc Vặt / Việc Nhờ (Ủy Quyền Hoặc Làm Nhanh)",
    q4: "🗑️ 4. Việc Lãng Phí (Hạn Chế Bớt)",

    // Challenge Module
    challengeTitle: "Thử Thách 7 Ngày - 7 Mục Tiêu Cá Nhân",
    challengeSubtitle: "Lên lịch mục tiêu riêng biệt cho từng ngày trong tuần từ Day 1 đến Day 7. Tự gõ mục tiêu tùy chỉnh!",

    // Game
    gameTitle: "Mini-Game 15s: Siêu Tốc Bắt Kẻ Cắp",
    gameSubtitle: "15 Giây Thử Thách Siêu Nhanh TAY! Nhấp liên tục vào icon lãng phí để tích lũy TimeCoin!",
    score: "Điểm Số",
    timeRemaining: "Thời Gian",

    // Pet Hatching System
    petTitle: "Vườn Linh Thú Thời Gian",
    petSubtitle: "Ấp trứng bằng TimeCoins để thu thập 20 Linh Thú Dễ Thương và 5 Linh Thú Secret Siêu Hiếm!",
    hatchEggBtn: "Nạp Năng Lượng (50 Coins / Lần)",
    eggProgress: "Tiến Độ Nở Trứng",
    collectionTitle: "Bộ Sưu Tập Linh Thú Đã Sở Hữu",
    secretTag: "✨ SECRET HIẾM",

    // Privacy & Settings
    privacyTitle: "Thông Báo Cấp Quyền Dữ Liệu Cá Nhân",
    privacyDesc: "Bạn có cho phép quyền truy cập dữ liệu cá nhân để người tạo ra trang web có thể thấy được dữ liệu nhằm hỗ trợ đồng bộ hóa giữa Máy tính và Điện thoại không?",
    allow: "Cho phép cấp quyền & Đồng bộ",
    deny: "Từ chối (Chỉ dùng cục bộ)",
    accountTitle: "Tài Khoản Cá Nhân / Biệt Danh",
    usernameLabel: "Nhập Biệt Danh / Tên của bạn:",
    loginAction: "Xác Nhận Đặt Tên",
    guestAction: "Vào Bằng Acc Khách (Guest Mode)"
  },
  en: {
    heroTag: "Student Time Management Ecosystem",
    heroTitle: "TAKE BACK YOUR TIME",
    heroSub: "Your Time. Your Choice. Your 24 Hours.",
    heroDesc: "A comprehensive solution helping university students spot time thieves, allocate 24 hours wisely, maximize focus, and maintain a balanced lifestyle.",
    openWallet: "Open 24H Wallet",
    findThief: "Track Time Thieves",
    teamName: "Team THE FIVE",
    navWallet: "24H Wallet",
    navDetective: "Detective",
    navRescue: "Time Rescue",
    navChallenge: "7-Day Challenge",
    navGame: "Mini Game",
    navPet: "Pet Hatchery",
    loginBtn: "Account",
    syncStatus: "Data Auto-Saved 📱💻",
    rulesBtn: "Rules",
    notifTitle: "System Notifications & Reminders",

    walletTitle: "24H Wallet - Custom Activities",
    walletSubtitle: "Freely add, edit & delete your daily routines. Keep your total hours within 24h!",
    remainingHours: "Free Unallocated Hours",
    usedHours: "Total Scheduled",
    balanceIdeal: "Ideal Schedule!",
    balanceDeficit: "24H Over-budget Deficit!",
    balanceSurplus: "Remaining Free Time",
    resetBtn: "Reset All",
    addActivityBtn: "Add Custom Activity",

    detectiveTitle: "Time Detective - 24H Crime Scene",
    detectiveSubtitle: "Roleplay as a Time Detective! Inspect clues and solve cases stealing student study hours!",
    inspectBtn: "Inspect Crime Clues",
    solveCaseBtn: "Solve Case",

    rescueTitle: "Time Rescue Toolkit",
    rescueSubtitle: "Easy-to-understand custom focus timer & task matrix.",
    pomodoro: "Focus Study Timer",
    start: "Start",
    pause: "Pause",
    eisenhower: "Task Priority Board",
    addTaskPlaceholder: "Type a task to complete...",
    add: "Add Task",
    q1: "🔥 1. Super Urgent (Do Immediately)",
    q2: "🎯 2. Important (Schedule for Later)",
    q3: "📩 3. Small Tasks (Delegate or Quick Do)",
    q4: "🗑️ 4. Wasteful (Reduce/Avoid)",

    challengeTitle: "7-Day Challenge - 7 Daily Targets",
    challengeSubtitle: "Set a unique target for each day from Day 1 to Day 7. Custom input available!",

    gameTitle: "15s Mini-Game: Blitz Time Catcher",
    gameSubtitle: "15 Seconds Ultra-Fast Challenge! Tap distraction icons to grab TimeCoins!",
    score: "Score",
    timeRemaining: "Time",

    petTitle: "Time Pet Hatchery",
    petSubtitle: "Hatch eggs using TimeCoins to collect 20 Cute Pets & 5 Ultra-Rare Secret Pets!",
    hatchEggBtn: "Feed Energy (50 Coins / Charge)",
    eggProgress: "Egg Hatch Progress",
    collectionTitle: "Unlocked Pets Collection",
    secretTag: "✨ ULTRA SECRET",

    privacyTitle: "Personal Data Access Permission Notice",
    privacyDesc: "Do you allow personal data access permission so the website creator can see your data to support cross-device synchronization between PC and phone?",
    allow: "Allow Access & Sync",
    deny: "Deny (Local Only)",
    accountTitle: "User Nickname / Guest Mode",
    usernameLabel: "Enter your nickname:",
    loginAction: "Save Username",
    guestAction: "Continue as Guest"
  }
};

const PET_DATABASE = [
  { id: 'p1', nameVi: 'Mèo Tri Thức', nameEn: 'Wisdom Cat', icon: '🐱', isSecret: false, descVi: 'Thích học đêm và uống trà sữa xanh.' },
  { id: 'p2', nameVi: 'Cú Đêm Chăm Học', nameEn: 'Study Owl', icon: '🦉', isSecret: false, descVi: 'Luôn nhắc bạn đi ngủ đúng 23h.' },
  { id: 'p3', nameVi: 'Cáo Kế Hoạch', nameEn: 'Planner Fox', icon: '🦊', isSecret: false, descVi: 'Chuyên gia sắp xếp To-Do list ngăn nắp.' },
  { id: 'p4', nameVi: 'Gấu Trúc Tập Trung', nameEn: 'Focus Panda', icon: '🐼', isSecret: false, descVi: 'Ăn trúc và bật Pomodoro 25 phút.' },
  { id: 'p5', nameVi: 'Thỏ Năng Lượng', nameEn: 'Energy Bunny', icon: '🐰', isSecret: false, descVi: 'Dậy sớm từ 6h sáng chạy thể dục.' },
  { id: 'p6', nameVi: 'Chú Chó Trung Thành', nameEn: 'Loyal Pup', icon: '🐶', isSecret: false, descVi: 'Giữ điện thoại xa bàn học giúp bạn.' },
  { id: 'p7', nameVi: 'Chim Yến Kỷ Luật', nameEn: 'Disciplined Robin', icon: '🐦', isSecret: false, descVi: 'Bay lượn kiểm tra chuỗi 7 ngày.' },
  { id: 'p8', nameVi: 'Hổ Quyết Tâm', nameEn: 'Resolve Tiger', icon: '🐯', isSecret: false, descVi: 'Đánh bại mọi deadline dồn dập.' },
  { id: 'p9', nameVi: 'Rùa Kiên Trì', nameEn: 'Steady Turtle', icon: '🐢', isSecret: false, descVi: 'Chậm mà chắc, tiến lên từng bước.' },
  { id: 'p10', nameVi: 'Hươu Sáng Tạo', nameEn: 'Creative Deer', icon: '🦌', isSecret: false, descVi: 'Nảy ra vô số ý tưởng thuyết trình hay.' },
  { id: 'p11', nameVi: 'Sóc Tiết Kiệm', nameEn: 'Saver Squirrel', icon: '🐿️', isSecret: false, descVi: 'Tích lũy từng phút giây tự do.' },
  { id: 'p12', nameVi: 'Hải Cẩu Thư Giãn', nameEn: 'Chill Seal', icon: '🦭', isSecret: false, descVi: 'Nhắc bạn nghỉ 5 phút giữa ca học.' },
  { id: 'p13', nameVi: 'Khỉ Nhanh Nhạy', nameEn: 'Agile Monkey', icon: '🐒', isSecret: false, descVi: 'Xử lý việc vặt trong chớp mắt.' },
  { id: 'p14', nameVi: 'Chim Cánh Cụt Bình Tĩnh', nameEn: 'Calm Penguin', icon: '🐧', isSecret: false, descVi: 'Không hề hoảng sợ trước tuần thi.' },
  { id: 'p15', nameVi: 'Chuột Ham Học', nameEn: 'Eager Mouse', icon: '🐭', isSecret: false, descVi: 'Đọc hết tài liệu trước giờ lên lớp.' },
  { id: 'p16', nameVi: 'Cừu Ngủ Ngon', nameEn: 'Sleepy Sheep', icon: '🐑', isSecret: false, descVi: 'Giúp bạn ngủ đủ 8 tiếng mỗi ngày.' },
  { id: 'p17', nameVi: 'Heo Đất Tích Coin', nameEn: 'Coin Piggy', icon: '🐷', isSecret: false, descVi: 'Tăng 10% thưởng TimeCoin.' },
  { id: 'p18', nameVi: 'Vịt Siêu Tốc', nameEn: 'Speedy Duck', icon: '🦆', isSecret: false, descVi: 'Gõ máy tính nhanh như chớp.' },
  { id: 'p19', nameVi: 'Ong Chăm Chỉ', nameEn: 'Busy Bee', icon: '🐝', isSecret: false, descVi: 'Không bao giờ nản lòng trước bài khó.' },
  { id: 'p20', nameVi: 'Khủng Long Đam Mê', nameEn: 'Dino Passion', icon: '🦖', isSecret: false, descVi: 'Sức mạnh vượt qua bài kiểm tra.' },

  { id: 's1', nameVi: 'Phượng Hoàng Thời Gian', nameEn: 'Time Phoenix', icon: '🦅', isSecret: true, descVi: 'Hồi sinh những quỹ thời gian tưởng như đã mất!' },
  { id: 's2', nameVi: 'Kỳ Lân 24H', nameEn: '24H Unicorn', icon: '🦄', isSecret: true, descVi: 'Linh thú thần thoại biểu tượng của sự cân bằng hoàn hảo.' },
  { id: 's3', nameVi: 'Rồng Thời Không', nameEn: 'Chronos Dragon', icon: '🐉', isSecret: true, descVi: 'Kiểm soát dòng chảy thời gian và nhân đôi tập trung.' },
  { id: 's4', nameVi: 'Cáo Vũ Trụ Secret', nameEn: 'Cosmic Fox', icon: '🦊✨', isSecret: true, descVi: 'Mang lại sự minh mẫn tuyệt đối từ dải ngân hà.' },
  { id: 's5', nameVi: 'Thần Thú Đồng Hồ Gold', nameEn: 'Golden Clock God', icon: '👑⏳', isSecret: true, descVi: 'Linh thú huyền thoại tối cao của TIMEWISE24H!' }
];


// Extract a YouTube video ID from supported watch, short, shorts, live and embed URLs.
const getYouTubeVideoId = (input) => {
  try {
    const parsed = new URL(input.trim());
    const host = parsed.hostname.replace(/^www\./, '').toLowerCase();
    const allowedHosts = ['youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtu.be', 'youtube-nocookie.com'];

    if (!allowedHosts.includes(host)) return null;

    let videoId = parsed.searchParams.get('v');

    if (host === 'youtu.be') {
      videoId = parsed.pathname.split('/').filter(Boolean)[0];
    } else if (!videoId) {
      const parts = parsed.pathname.split('/').filter(Boolean);
      const markerIndex = parts.findIndex(part => ['embed', 'shorts', 'live', 'v'].includes(part));
      if (markerIndex !== -1) videoId = parts[markerIndex + 1];
    }

    return videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId) ? videoId : null;
  } catch {
    return null;
  }
};

export default function App() {
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('tw24_coins');
    return saved !== null ? parseInt(saved, 10) : 120;
  });
  const [activeTab, setActiveTab] = useState('hero');
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [musicInput, setMusicInput] = useState(() => localStorage.getItem('tw24_music_url') || '');
  const [musicVideoId, setMusicVideoId] = useState(null);
  const [musicError, setMusicError] = useState('');

  useEffect(() => {
    localStorage.setItem('tw24_music_url', musicInput);
  }, [musicInput]);

  const loadYouTubeMusic = (e) => {
    e.preventDefault();
    const videoId = getYouTubeVideoId(musicInput);
    if (!videoId) {
      setMusicError('Link chưa hợp lệ. Vui lòng dán URL video YouTube đầy đủ.');
      return;
    }
    setMusicError('');
    setMusicVideoId(videoId);
    setIsMusicOpen(true);
  };

  const [lang, setLang] = useState('vi');
  const t = TRANSLATIONS[lang];

  // Sound Synth Effect Generator
  const playWebSound = (freq = 520, type = 'sine', duration = 0.15) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  };

  // User Profile
  const [username, setUsername] = useState(() => localStorage.getItem('tw24_user') || 'SinhViên_Guest');
  const [usernameInput, setUsernameInput] = useState('');

  // 24H Wallet Activities
  const [customActivities, setCustomActivities] = useState(() => {
    const saved = localStorage.getItem('tw24_activities');
    return saved ? JSON.parse(saved) : [
      { id: 'a1', labelVi: 'Giấc ngủ & Nghỉ ngơi', labelEn: 'Sleep & Rest', hours: 8, color: 'accent-indigo-500', icon: '🛌' },
      { id: 'a2', labelVi: 'Học trên lớp & Tự học', labelEn: 'Study & Classes', hours: 6, color: 'accent-emerald-500', icon: '📚' },
      { id: 'a3', labelVi: 'Sinh hoạt cá nhân & Ăn uống', labelEn: 'Personal & Meals', hours: 3, color: 'accent-amber-500', icon: '🍚' },
      { id: 'a4', labelVi: 'Mạng xã hội & Giải trí', labelEn: 'Social Media & Entertainment', hours: 3, color: 'accent-pink-500', icon: '📱' },
      { id: 'a5', labelVi: 'Sở thích & Đi làm thêm', labelEn: 'Hobbies & Part-time Work', hours: 2, color: 'accent-sky-500', icon: '💼' }
    ];
  });
  const [newActName, setNewActName] = useState('');
  const [newActHours, setNewActHours] = useState(2);

  // Eisenhower Task Matrix
  const [matrixTasks, setMatrixTasks] = useState(() => {
    const saved = localStorage.getItem('tw24_matrix');
    return saved ? JSON.parse(saved) : {
      q1: [{ id: 'm1', text: 'Nộp bài tập chuyên ngành trước 23h' }],
      q2: [{ id: 'm2', text: 'Ôn luyện thi chứng chỉ Tiếng Anh' }],
      q3: [{ id: 'm3', text: 'Trả lời tin nhắn nhóm câu lạc bộ' }],
      q4: [{ id: 'm4', text: 'Lướt tin tức mạng xã hội vô định' }]
    };
  });
  const [newTaskText, setNewTaskText] = useState('');

  // 7-Day Challenge Goals (Days 1 - 7 explicit rendering)
  const [dailyHabits, setDailyHabits] = useState(() => {
    const saved = localStorage.getItem('tw24_habits');
    return saved ? JSON.parse(saved) : [
      { day: 1, goal: '📱 Tắt thông báo điện thoại khi bắt đầu học' },
      { day: 2, goal: '🌅 Dậy sớm lúc 6:00 sáng tập thể dục' },
      { day: 3, goal: '📝 Hoàn thành To-Do List trước 22h' },
      { day: 4, goal: '📚 Đọc 15 trang sách chuyên ngành' },
      { day: 5, goal: '🌙 Tắt máy tính & đi ngủ trước 23h30' },
      { day: 6, goal: '🏃 Vận động nhẹ 30 phút buổi chiều' },
      { day: 7, goal: '🎯 Tổng kết tuần & chuẩn bị lịch tuần mới' }
    ];
  });
  const [habitDays, setHabitDays] = useState(() => {
    const saved = localStorage.getItem('tw24_habit_days');
    return saved ? JSON.parse(saved) : [false, false, false, false, false, false, false];
  });

  // Pet Collection State (Full 25 pets preserved)
  const [eggProgress, setEggProgress] = useState(() => parseInt(localStorage.getItem('tw24_egg_prog') || '20', 10));
  const [unlockedPets, setUnlockedPets] = useState(() => {
    const saved = localStorage.getItem('tw24_unlocked_pets');
    return saved ? JSON.parse(saved) : ['p1', 'p2', 'p3'];
  });
  const [lastHatchedPet, setLastHatchedPet] = useState(null);

  // AUTO-SAVE ALL STATE CHANGES TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem('tw24_coins', coins.toString());
    localStorage.setItem('tw24_user', username);
    localStorage.setItem('tw24_activities', JSON.stringify(customActivities));
    localStorage.setItem('tw24_matrix', JSON.stringify(matrixTasks));
    localStorage.setItem('tw24_habits', JSON.stringify(dailyHabits));
    localStorage.setItem('tw24_habit_days', JSON.stringify(habitDays));
    localStorage.setItem('tw24_egg_prog', eggProgress.toString());
    localStorage.setItem('tw24_unlocked_pets', JSON.stringify(unlockedPets));
  }, [coins, username, customActivities, matrixTasks, dailyHabits, habitDays, eggProgress, unlockedPets]);

  // Notifications State & Floating Popup Permission
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: '💡 Nhắc nhở lịch trình 24H', desc: 'Hãy cập nhật lại Ví 24H nếu hôm nay bạn có lịch học thay đổi nhé!', time: '10 phút trước', read: false },
    { id: 2, title: '🔥 Thử thách 7 ngày', desc: 'Bạn chưa check-in thói quen hôm nay. Hãy hoàn thành để giữ chuỗi liên tục!', time: '1 giờ trước', read: false },
    { id: 3, title: '🎉 Chào mừng đến với TIMEWISE24H', desc: 'Hệ thống đã sẵn sàng lưu trữ và đồng bộ dữ liệu hoạt động cá nhân.', time: 'Hôm qua', read: true }
  ]);
  const [showNotifPermissionModal, setShowNotifPermissionModal] = useState(false);

  const requestNativeNotifPermission = async (allowed) => {
    playWebSound(640, 'triangle');
    if (allowed && 'Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          new Notification('TIMEWISE24H', {
            body: '🎉 Thông báo nổi màn hình đã được bật thành công!',
            icon: '⏰'
          });
        }
      } catch (e) {}
    }
    setShowNotifPermissionModal(false);
  };

  const triggerNativeNotification = (title, body) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '⏰' });
    }
  };

  // Pomodoro Custom Timer & Time Break State
  const [customFocusMins, setCustomFocusMins] = useState(25);
  const [customBreakMins, setCustomBreakMins] = useState(5);
  const [timerMode, setTimerMode] = useState('focus'); // 'focus' | 'break'
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(prev => prev - 1), 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      playWebSound(880, 'triangle', 0.5);
      if (timerMode === 'focus') {
        setCoins(prev => prev + 15);
        triggerNativeNotification('⏰ Hoàn thành Ca Học!', 'Hết giờ học tập! Chuyển sang ca nghỉ giải lao.');
        alert('🔔 Hoàn thành ca học tập trung! +15 TimeCoins. Bắt đầu phiên nghỉ giải lao!');
        setTimerMode('break');
        setTimerSeconds(customBreakMins * 60);
      } else {
        triggerNativeNotification('☕ Hết giờ nghỉ!', 'Đã hết phiên giải lao! Sẵn sàng cho ca học mới.');
        alert('☕ Đã hết phiên giải lao! Sẵn sàng quay lại bài học.');
        setTimerMode('focus');
        setTimerSeconds(customFocusMins * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, timerMode, customFocusMins, customBreakMins]);

  const applyCustomTimerSettings = () => {
    playWebSound(580, 'sine');
    setIsTimerRunning(false);
    if (timerMode === 'focus') {
      setTimerSeconds(customFocusMins * 60);
    } else {
      setTimerSeconds(customBreakMins * 60);
    }
  };

  const toggleTimer = () => {
    playWebSound(600, 'square');
    setIsTimerRunning(!isTimerRunning);
  };
  const formatTime = (secs) => `${Math.floor(secs / 60).toString().padStart(2, '0')}:${(secs % 60).toString().padStart(2, '0')}`;

  // 24H Wallet logic
  const totalUsed = customActivities.reduce((acc, curr) => acc + curr.hours, 0);
  const remainingHours = 24 - totalUsed;

  const handleActivityHoursChange = (id, val) => {
    setCustomActivities(prev => prev.map(item => item.id === id ? { ...item, hours: parseFloat(val) || 0 } : item));
  };

  const addCustomActivity = (e) => {
    e.preventDefault();
    if (!newActName.trim()) return;
    playWebSound(700, 'sine');
    const newAct = {
      id: Date.now().toString(),
      labelVi: newActName.trim(),
      labelEn: newActName.trim(),
      hours: parseFloat(newActHours) || 1,
      color: 'accent-purple-500',
      icon: '📌'
    };
    setCustomActivities(prev => [...prev, newAct]);
    setNewActName('');
  };

  const removeCustomActivity = (id) => {
    playWebSound(350, 'sawtooth');
    setCustomActivities(prev => prev.filter(item => item.id !== id));
  };

  const resetWallet = () => {
    playWebSound(440, 'triangle');
    setCustomActivities([
      { id: 'a1', labelVi: 'Giấc ngủ & Nghỉ ngơi', labelEn: 'Sleep & Rest', hours: 8, color: 'accent-indigo-500', icon: '🛌' },
      { id: 'a2', labelVi: 'Học trên lớp & Tự học', labelEn: 'Study & Classes', hours: 6, color: 'accent-emerald-500', icon: '📚' },
      { id: 'a3', labelVi: 'Sinh hoạt cá nhân & Ăn uống', labelEn: 'Personal & Meals', hours: 3, color: 'accent-amber-500', icon: '🍚' },
      { id: 'a4', labelVi: 'Mạng xã hội & Giải trí', labelEn: 'Social Media & Entertainment', hours: 3, color: 'accent-pink-500', icon: '📱' },
      { id: 'a5', labelVi: 'Sở thích & Đi làm thêm', labelEn: 'Hobbies & Part-time Work', hours: 2, color: 'accent-sky-500', icon: '💼' }
    ]);
  };

  // Time Detective Expanded Case Database
  const [currentCaseId, setCurrentCaseId] = useState(0);
  const [inspectedClues, setInspectedClues] = useState([]);
  const [solvedCases, setSolvedCases] = useState([]);
  const [selectedSuspect, setSelectedSuspect] = useState(null);

  const DETECTIVE_CASES = [
    {
      id: 0,
      titleVi: "Vụ Án 01: Chiếc Điện Thoại Đêm Khuya",
      titleEn: "Case 01: Midnight Smartphone Mystery",
      sceneVi: "Hiện trường: Phòng trọ sinh viên lúc 1h30 sáng. Đèn tắt nhưng màn hình điện thoại phát ra ánh sáng xanh liên tục làm bốc cháy quỹ thời gian ngủ.",
      sceneEn: "Scene: Student room at 1:30 AM. Lights off but phone screen emitting blue light continuously, burning away sleep hours.",
      clues: [
        { id: 'c1', textVi: '📱 Lịch sử duyệt web: Lướt Shorts / TikTok 2.5 tiếng không nghỉ.', textEn: '📱 Browser history: 2.5 hours non-stop Shorts/TikTok.' },
        { id: 'c2', textVi: '⏰ Báo thức 6:00 sáng bị hoãn liên tiếp 4 lần.', textEn: '⏰ 6:00 AM alarm snoozed 4 times consecutively.' },
        { id: 'c3', textVi: '📝 Bài tập nhóm nộp 8h sáng chưa viết từ nào.', textEn: '📝 Group assignment due 8 AM completely blank.' }
      ],
      suspects: [
        { id: 's1', name: 'Bóng Ma Lướt Màn Hình (The Scroll Phantom)', isGuilty: true, reasonVi: 'Chính xác! Lướt thuật toán vô định về đêm đã cướp đi 3 tiếng ngủ.' },
        { id: 's2', name: 'Thần Ngủ Nướng (Snooze Demon)', isGuilty: false, reasonVi: 'Sai rồi! Đây chỉ là hậu quả phụ của việc thức khuya lướt điện thoại.' },
        { id: 's3', name: 'Bóng Ma Bài Tập (Assignment Ghost)', isGuilty: false, reasonVi: 'Không phải! Bài tập chưa làm là kết quả chứ không phải nguyên nhân chính.' }
      ]
    },
    {
      id: 1,
      titleVi: "Vụ Án 02: Bẫy Trì Hoãn Hạn Nộp (Deadline Trap)",
      titleEn: "Case 02: The Procrastination Deadline Trap",
      sceneVi: "Hiện trường: Bàn học ngổn ngang sách vở lúc 23h45. Bài tiểu luận 2000 từ mới viết được 50 từ.",
      sceneEn: "Scene: Messy study desk at 11:45 PM. 2000-word essay only has 50 words written.",
      clues: [
        { id: 'c4', textVi: '🎮 Game Steam vừa đăng nhập chơi 5 trận rank liên tiếp.', textEn: '🎮 Steam logged in for 5 consecutive ranked matches.' },
        { id: 'c5', textVi: '🥤 3 ly trà sữa rỗng đặt cạnh bàn học.', textEn: '🥤 3 empty boba cups sitting on desk.' },
        { id: 'c6', textVi: '💬 Tin nhắn: "Để mai làm cũng kịp mà mày ơi".', textEn: '💬 Message: "Bro, we can just do it tomorrow morning".' }
      ],
      suspects: [
        { id: 's4', name: 'Con Ma Trì Hoãn (Procrastination Imp)', isGuilty: true, reasonVi: 'Chính xác! Tâm lý "để mai làm" đã làm bốc cháy toàn bộ buổi chiều của bạn!' },
        { id: 's5', name: 'Ác Mộng Thần Trà Sữa (Boba Siren)', isGuilty: false, reasonVi: 'Sai rồi! Trà sữa chỉ để giải khát, không phải thủ phạm dời deadline.' }
      ]
    },
    {
      id: 2,
      titleVi: "Vụ Án 03: Bí Mật Nhóm Chat Đêm Khuya",
      titleEn: "Case 03: The Midnight Chatroom Secret",
      sceneVi: "Hiện trường: Nhóm chat lớp thông báo bài thuyết trình sáng mai. Rất nhiều tin nhắn drama làm xao nhãng.",
      sceneEn: "Scene: Class group chat alert at 2 AM with non-stop gossip.",
      clues: [
        { id: 'c7', textVi: '💬 142 tin nhắn mới không liên quan đến bài học.', textEn: '💬 142 new off-topic messages.' },
        { id: 'c8', textVi: '📁 File slide thuyết trình thiếu phần tổng kết.', textEn: '📁 Presentation slide missing conclusion.' }
      ],
      suspects: [
        { id: 's6', name: 'Thần Tán Dóc (Gossip Spirit)', isGuilty: true, reasonVi: 'Chính xác! Cuốn vào tin nhắn tán dóc đã ngốn mất thời gian duyệt slide.' },
        { id: 's7', name: 'Lỗi Mạng Wifi (Wifi Failure)', isGuilty: false, reasonVi: 'Sai rồi! Mạng hoàn toàn bình thường.' }
      ]
    }
  ];

  const inspectClue = (clueId) => {
    if (!inspectedClues.includes(clueId)) {
      playWebSound(720, 'sine', 0.1);
      setInspectedClues(prev => [...prev, clueId]);
    }
  };

  const solveCurrentCase = () => {
    if (!selectedSuspect) return;
    const currentCase = DETECTIVE_CASES[currentCaseId];
    const suspectObj = currentCase.suspects.find(s => s.id === selectedSuspect);

    if (suspectObj && suspectObj.isGuilty) {
      playWebSound(900, 'triangle', 0.4);
      if (!solvedCases.includes(currentCaseId)) {
        setSolvedCases(prev => [...prev, currentCaseId]);
        setCoins(prev => prev + 50);
        triggerNativeNotification('🕵️ TIMEWISE24H Thám Tử', `Phá thành công ${currentCase.titleVi}! +50 TimeCoins!`);
      }
      alert(`🎉 PHÁ ÁN THÀNH CÔNG!\n${suspectObj.reasonVi}\n+50 TimeCoins Thưởng Thám Tử!`);
    } else {
      playWebSound(280, 'sawtooth', 0.3);
      alert(`❌ Suy luận chưa chính xác! Hãy đọc lại chứng cứ hiện trường.`);
    }
  };

  // Task Matrix Add & Remove
  const addMatrixTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    playWebSound(550, 'sine');
    setMatrixTasks(prev => ({
      ...prev,
      q1: [...prev.q1, { id: Date.now().toString(), text: newTaskText.trim() }]
    }));
    setNewTaskText('');
  };

  const removeMatrixTask = (quadKey, taskId) => {
    playWebSound(300, 'sawtooth');
    setMatrixTasks(prev => ({
      ...prev,
      [quadKey]: prev[quadKey].filter(t => t.id !== taskId)
    }));
  };

  // 7-Day Challenge Habit Toggle
  const handleDailyGoalChange = (dayIndex, newText) => {
    setDailyHabits(prev => prev.map((item, idx) => idx === dayIndex ? { ...item, goal: newText } : item));
  };

  const toggleHabitDay = (index) => {
    playWebSound(750, 'triangle', 0.2);
    setHabitDays(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      if (updated[index]) {
        setCoins(c => c + 20);
        triggerNativeNotification('🔥 TIMEWISE24H Thử Thách', `Chúc mừng bạn đã hoàn thành mục tiêu Day ${index + 1}! +20 Coins!`);
      }
      return updated;
    });
  };

  // Game 15s Blitz
  const [gameScore, setGameScore] = useState(0);
  const [gameTimeLeft, setGameTimeLeft] = useState(15);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameTargets, setGameTargets] = useState([]);

  const feedEggEnergy = () => {
    if (coins < 50) {
      alert('Bạn cần tối thiểu 50 TimeCoins để nạp năng lượng ấp trứng!');
      return;
    }

    playWebSound(800, 'sine', 0.3);
    setCoins(prev => prev - 50);
    const newProgress = eggProgress + 40;

    if (newProgress >= 100) {
      setEggProgress(0);
      const lockedPets = PET_DATABASE.filter(p => !unlockedPets.includes(p.id));
      if (lockedPets.length > 0) {
        const randomPet = lockedPets[Math.floor(Math.random() * lockedPets.length)];
        setUnlockedPets(prev => [...prev, randomPet.id]);
        setLastHatchedPet(randomPet);
        triggerNativeNotification('🥚 QUẢ TRỨNG THẦN KỲ ĐÃ NỞ!', `Chúc mừng bạn đã sở hữu linh thú: ${randomPet.nameVi}!`);
      } else {
        alert('🎉 Bạn đã sưu tầm trọn bộ tất cả 25 Linh Thú của TIMEWISE24H!');
      }
    } else {
      setEggProgress(newProgress);
    }
  };

  const startGame = () => {
    playWebSound(650, 'square', 0.2);
    setGameScore(0);
    setGameTimeLeft(15);
    setIsGameActive(true);
    setGameTargets([]);
  };

  useEffect(() => {
    let timer = null;
    let spawner = null;

    if (isGameActive && gameTimeLeft > 0) {
      timer = setInterval(() => setGameTimeLeft(prev => prev - 1), 1000);
      spawner = setInterval(() => {
        const icons = ['📱', '🎮', '🍿', '🛌', '⏰'];
        const newTarget = {
          id: Date.now() + Math.random(),
          icon: icons[Math.floor(Math.random() * icons.length)],
          x: Math.floor(Math.random() * 260),
          y: Math.floor(Math.random() * 200)
        };
        setGameTargets(prev => [...prev.slice(-5), newTarget]);
      }, 450);
    } else if (gameTimeLeft === 0 && isGameActive) {
      setIsGameActive(false);
      const earnedCoins = Math.floor(gameScore * 0.5);
      setCoins(prev => prev + earnedCoins);
      playWebSound(880, 'triangle', 0.4);
      triggerNativeNotification('🎮 TIMEWISE24H Game Blitz', `Hết giờ! Điểm: ${gameScore} -> +${earnedCoins} TimeCoins!`);
      alert(`🎮 HẾT GIỜ!\nĐiểm số: ${gameScore}\nBạn nhận được: +${earnedCoins} TimeCoins!`);
    }

    return () => {
      clearInterval(timer);
      clearInterval(spawner);
    };
  }, [isGameActive, gameTimeLeft, gameScore]);

  const hitTarget = (target) => {
    playWebSound(700, 'sine', 0.1);
    setGameScore(prev => prev + 10);
    setGameTargets(prev => prev.filter(t => t.id !== target.id));
  };

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);

  const saveProfileNickname = (e) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;
    playWebSound(500, 'sine');
    setUsername(usernameInput.trim());
    setIsAuthModalOpen(false);
    setUsernameInput('');
    alert(`✅ Đã cập nhật biệt danh cá nhân: ${usernameInput.trim()}`);
  };

  const navTabs = [
    { id: 'vi24h', label: t.navWallet, icon: Wallet },
    { id: 'detective', label: t.navDetective, icon: Search },
    { id: 'rescue', label: t.navRescue, icon: LifeBuoy },
    { id: 'challenge', label: t.navChallenge, icon: CalendarCheck },
    { id: 'game', label: t.navGame, icon: Gamepad2, badge: '15s' },
    { id: 'pet', label: t.navPet, icon: Heart, badge: 'Mới' }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-stone-50 text-stone-900">
      
      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur-md border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { playWebSound(400); setActiveTab('hero'); }}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">TIMEWISE24H</span>
              <span className="block text-[9px] font-bold text-emerald-600 uppercase tracking-widest">{t.teamName}</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1 p-1 rounded-2xl bg-stone-100 border border-stone-200">
            {navTabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { playWebSound(520); setActiveTab(tab.id); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    isActive 
                      ? 'bg-emerald-600 text-white shadow-md' 
                      : 'text-stone-600 hover:text-emerald-600'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-900 uppercase">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2">
            <span className="hidden lg:inline-flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              {t.syncStatus}
            </span>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { playWebSound(500); setShowNotifDropdown(!showNotifDropdown); }} 
                className="p-2.5 rounded-xl border bg-white border-stone-200 text-stone-700 relative hover:bg-stone-50"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl border p-4 z-50 space-y-3 bg-white border-stone-200 text-stone-900">
                  <div className="flex justify-between items-center border-b pb-2 border-stone-100">
                    <span className="font-bold text-xs uppercase tracking-wider">{t.notifTitle}</span>
                    <button onClick={() => setShowNotifDropdown(false)} className="text-[10px] text-stone-400 hover:text-stone-600">Đóng</button>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex justify-between items-center text-xs">
                    <span className="font-bold text-amber-900">Thông báo nổi màn hình</span>
                    <button 
                      onClick={() => { setShowNotifDropdown(false); setShowNotifPermissionModal(true); }}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500 text-white hover:bg-amber-600"
                    >
                      Cài Đặt 🔔
                    </button>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className="p-2.5 rounded-xl border text-xs space-y-1 bg-emerald-50 border-emerald-200">
                        <div className="font-bold">{n.title}</div>
                        <p className="text-[11px] text-stone-600">{n.desc}</p>
                        <span className="text-[9px] text-stone-400 block text-right">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Rules Modal Button */}
            <button onClick={() => { playWebSound(450); setIsRulesModalOpen(true); }} className="p-2.5 rounded-xl border bg-white border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold">
              <Shield className="w-4 h-4" />
            </button>

            {/* Profile Nickname Button */}
            <button onClick={() => { playWebSound(480); setIsAuthModalOpen(true); }} className="flex items-center space-x-2 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all">
              <User className="w-4 h-4" />
              <span className="max-w-[100px] truncate">{username}</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN ROUTER CONTAINER (ALL 6 TABS FULLY RESTORED) */}
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {activeTab === 'hero' && (
          <div className="space-y-12 max-w-4xl mx-auto text-center py-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span>{t.heroTag}</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
                {t.heroTitle}
              </h1>
              <p className="text-xl font-bold text-amber-500 italic">{t.heroSub}</p>
              <p className="text-base max-w-2xl mx-auto leading-relaxed text-stone-600">{t.heroDesc}</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button onClick={() => { playWebSound(600); setActiveTab('vi24h'); }} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center justify-center space-x-2 transition-all">
                <Wallet className="w-5 h-5" /><span>{t.openWallet}</span>
              </button>
              <button onClick={() => { playWebSound(600); setActiveTab('detective'); }} className="px-8 py-4 font-bold rounded-2xl border bg-white border-stone-200 hover:bg-stone-50 flex items-center justify-center space-x-2 transition-all">
                <Search className="w-5 h-5 text-amber-500" /><span>{t.findThief}</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'vi24h' && (
          <div className="space-y-8 max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">Module 01</span>
              <h2 className="text-3xl font-extrabold mt-2 text-stone-900">{t.walletTitle}</h2>
              <p className="text-sm mt-1 text-stone-600">{t.walletSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 p-8 rounded-3xl border bg-white border-stone-200 shadow-md flex flex-col items-center">
                <h3 className="text-lg font-bold mb-4">{t.remainingHours}</h3>
                <div className="relative w-64 h-64 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle className="text-stone-200" strokeWidth="10" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                    <circle 
                      className={`transition-all duration-500 ${remainingHours < 0 ? 'text-red-500' : remainingHours === 0 ? 'text-emerald-500' : 'text-amber-500'}`} 
                      strokeWidth="10" 
                      strokeDasharray="251.2" 
                      strokeDashoffset={251.2 - (Math.min(totalUsed / 24, 1) * 251.2)} 
                      strokeLinecap="round" 
                      stroke="currentColor" 
                      fill="transparent" 
                      r="40" 
                      cx="50" 
                      cy="50" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-5xl font-black">{remainingHours >= 0 ? remainingHours : 0}</span>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wide mt-1">Giờ Trống</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 p-8 rounded-3xl border bg-white border-stone-200 shadow-md space-y-5">
                <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                  <h3 className="text-lg font-bold">{t.usedHours}: {totalUsed}h / 24h</h3>
                  <button onClick={resetWallet} className="text-xs font-bold text-stone-400 hover:text-red-500 flex items-center space-x-1">
                    <RotateCcw className="w-3.5 h-3.5" /><span>{t.resetBtn}</span>
                  </button>
                </div>

                <form onSubmit={addCustomActivity} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Thêm hoạt động mới..." 
                    value={newActName}
                    onChange={(e) => setNewActName(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-xl border text-xs bg-stone-50 border-stone-200"
                  />
                  <input 
                    type="number" 
                    min="0.5" 
                    max="12" 
                    step="0.5" 
                    value={newActHours}
                    onChange={(e) => setNewActHours(e.target.value)}
                    className="w-20 px-3 py-2 rounded-xl border text-xs font-bold bg-stone-50 border-stone-200"
                  />
                  <button type="submit" className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 flex items-center space-x-1">
                    <Plus className="w-3.5 h-3.5" /><span>Thêm</span>
                  </button>
                </form>

                <div className="space-y-4 pt-2 max-h-80 overflow-y-auto">
                  {customActivities.map((act) => (
                    <div key={act.id} className="space-y-1.5 p-3 rounded-2xl border border-stone-100 bg-stone-50/50">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="flex items-center space-x-1.5"><span>{act.icon}</span><span>{lang === 'vi' ? act.labelVi : act.labelEn}</span></span>
                        <div className="flex items-center space-x-2">
                          <span className="text-emerald-600 font-extrabold">{act.hours}h</span>
                          <button onClick={() => removeCustomActivity(act.id)} className="text-stone-400 hover:text-red-500"><X className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="24" 
                        step="0.5" 
                        value={act.hours} 
                        onChange={(e) => handleActivityHoursChange(act.id, e.target.value)} 
                        className={`w-full ${act.color} h-2 bg-stone-200 rounded-lg cursor-pointer`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DETECTIVE MODULE WITH MULTIPLE CASES */}
        {activeTab === 'detective' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">Module 02</span>
              <h2 className="text-3xl font-extrabold mt-2 text-stone-900">{t.detectiveTitle}</h2>
              <p className="text-sm mt-1 text-stone-600">{t.detectiveSubtitle}</p>
            </div>

            {/* Case Selector Tabs */}
            <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
              {DETECTIVE_CASES.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => { playWebSound(500); setCurrentCaseId(idx); setInspectedClues([]); setSelectedSuspect(null); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                    currentCaseId === idx 
                      ? 'bg-amber-500 text-white border-amber-500 shadow-md' 
                      : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {lang === 'vi' ? c.titleVi : c.titleEn} {solvedCases.includes(c.id) && '✅'}
                </button>
              ))}
            </div>

            <div className="p-8 rounded-3xl border bg-white border-stone-200 shadow-md space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Hồ Sơ Vụ Án #{currentCaseId + 1}</span>
                <h3 className="text-xl font-bold">{lang === 'vi' ? DETECTIVE_CASES[currentCaseId].titleVi : DETECTIVE_CASES[currentCaseId].titleEn}</h3>
                <p className="text-xs text-stone-500 leading-relaxed italic">{lang === 'vi' ? DETECTIVE_CASES[currentCaseId].sceneVi : DETECTIVE_CASES[currentCaseId].sceneEn}</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-stone-100">
                <h4 className="text-xs font-bold uppercase text-stone-400">1. Chứng Cứ Hiện Trường (Bấm vào để thu thập):</h4>
                <div className="space-y-2">
                  {DETECTIVE_CASES[currentCaseId].clues.map((clue) => {
                    const isInspected = inspectedClues.includes(clue.id);
                    return (
                      <div 
                        key={clue.id} 
                        onClick={() => inspectClue(clue.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer text-xs font-bold transition-all flex justify-between items-center ${
                          isInspected 
                            ? 'bg-amber-50 border-amber-300 text-amber-900' 
                            : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-amber-200'
                        }`}
                      >
                        <span>{lang === 'vi' ? clue.textVi : clue.textEn}</span>
                        {isInspected && <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-stone-100">
                <h4 className="text-xs font-bold uppercase text-stone-400">2. Chọn Nghi Phạm Đã Đánh Cắp Thời Gian:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DETECTIVE_CASES[currentCaseId].suspects.map((suspect) => {
                    const isSelected = selectedSuspect === suspect.id;
                    return (
                      <button
                        key={suspect.id}
                        onClick={() => { playWebSound(550); setSelectedSuspect(suspect.id); }}
                        className={`p-4 rounded-2xl border text-left text-xs font-bold transition-all ${
                          isSelected 
                            ? 'bg-amber-500 text-white border-amber-500 shadow-md' 
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-amber-300'
                        }`}
                      >
                        {suspect.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-stone-100">
                <span className="text-xs font-bold text-stone-400">Đã thu thập: {inspectedClues.length} / {DETECTIVE_CASES[currentCaseId].clues.length} chứng cứ</span>
                <button 
                  onClick={solveCurrentCase}
                  disabled={inspectedClues.length < DETECTIVE_CASES[currentCaseId].clues.length || !selectedSuspect}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md disabled:opacity-40"
                >
                  {t.solveCaseBtn} (+50 Coins)
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rescue' && (
          <div className="space-y-8 max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase tracking-wider">Module 03</span>
              <h2 className="text-3xl font-extrabold mt-2 text-stone-900">{t.rescueTitle}</h2>
              <p className="text-sm mt-1 text-stone-600">{t.rescueSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 p-8 rounded-3xl border bg-white border-stone-200 shadow-md flex flex-col items-center">
                <div className="w-full flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-stone-800 flex items-center space-x-1.5"><Clock className="w-5 h-5 text-red-500" /><span>{t.pomodoro}</span></h3>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${timerMode === 'focus' ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'}`}>
                    {timerMode === 'focus' ? '🎯 Phiên Học Tập' : '☕ Phiên Nghỉ Giải Lao (Time Break)'}
                  </span>
                </div>

                <div className="w-56 h-56 rounded-full bg-gradient-to-tr from-red-50 to-orange-50 border-4 border-red-500/20 flex flex-col items-center justify-center shadow-inner my-4">
                  <span className="text-5xl font-black font-mono tracking-tighter">{formatTime(timerSeconds)}</span>
                  <span className="text-[10px] font-bold text-stone-400 mt-1 uppercase tracking-widest">{timerMode === 'focus' ? '+15 Coins / Ca Học' : 'Thư Giãn Đầu Óc'}</span>
                </div>

                <div className="w-full bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3 mb-4 text-xs">
                  <span className="font-bold block text-stone-500 uppercase tracking-wider text-[10px]">Tự Cài Đặt Thời Gian Cá Nhân:</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-1">Ca Học (Phút):</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="120" 
                        value={customFocusMins}
                        onChange={(e) => setCustomFocusMins(parseInt(e.target.value) || 25)}
                        className="w-full px-3 py-1.5 rounded-xl border font-bold bg-white border-stone-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-1">Nghỉ (Phút):</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="60" 
                        value={customBreakMins}
                        onChange={(e) => setCustomBreakMins(parseInt(e.target.value) || 5)}
                        className="w-full px-3 py-1.5 rounded-xl border font-bold bg-white border-stone-200"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={applyCustomTimerSettings}
                    className="w-full py-2 bg-stone-800 hover:bg-black text-white font-bold rounded-xl shadow text-xs"
                  >
                    Áp Dụng Cài Đặt Thời Gian
                  </button>
                </div>

                <div className="flex space-x-3 w-full">
                  <button onClick={toggleTimer} className={`flex-1 py-3 font-bold rounded-2xl text-white shadow-md flex items-center justify-center space-x-2 transition-all ${isTimerRunning ? 'bg-amber-500' : 'bg-red-500'}`}>
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isTimerRunning ? t.pause : t.start}</span>
                  </button>
                  <button onClick={() => { setIsTimerRunning(false); setTimerSeconds(customFocusMins*60); setTimerMode('focus'); }} className="p-3 rounded-2xl border text-stone-400 hover:text-stone-700">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 p-8 rounded-3xl border bg-white border-stone-200 shadow-md space-y-4">
                <h3 className="text-lg font-bold pb-2 border-b border-stone-100">{t.eisenhower}</h3>
                
                <form onSubmit={addMatrixTask} className="flex gap-2">
                  <input 
                    type="text" 
                    value={newTaskText} 
                    onChange={(e) => setNewTaskText(e.target.value)} 
                    placeholder={t.addTaskPlaceholder} 
                    className="flex-1 px-4 py-2 rounded-xl border text-xs focus:outline-none bg-white border-stone-200"
                  />
                  <button type="submit" className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl">
                    {t.add}
                  </button>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {[
                    { key: 'q1', title: t.q1, bg: 'bg-red-50/70 border-red-200 text-red-900' },
                    { key: 'q2', title: t.q2, bg: 'bg-emerald-50/70 border-emerald-200 text-emerald-900' },
                    { key: 'q3', title: t.q3, bg: 'bg-amber-50/70 border-amber-200 text-amber-900' },
                    { key: 'q4', title: t.q4, bg: 'bg-stone-100/70 border-stone-200 text-stone-900' }
                  ].map((quad) => (
                    <div key={quad.key} className={`p-4 rounded-2xl border min-h-[140px] ${quad.bg}`}>
                      <h4 className="text-[11px] font-black uppercase tracking-wide mb-2">{quad.title}</h4>
                      <ul className="space-y-1.5 text-xs">
                        {matrixTasks[quad.key].map(task => (
                          <li key={task.id} className="flex justify-between items-center p-2 rounded-lg bg-white border border-stone-200">
                            <span className="truncate max-w-[160px]">{task.text}</span>
                            <button onClick={() => removeMatrixTask(quad.key, task.id)} className="text-stone-400 hover:text-red-500">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7-DAY CHALLENGE WITH CLEAR DAY 1 - DAY 7 LABELS */}
        {activeTab === 'challenge' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full uppercase tracking-wider">Module 04</span>
              <h2 className="text-3xl font-extrabold mt-2 text-stone-900">{t.challengeTitle}</h2>
              <p className="text-sm mt-1 text-stone-600">{t.challengeSubtitle}</p>
            </div>

            <div className="p-8 rounded-3xl border bg-white border-stone-200 shadow-md space-y-4">
              {dailyHabits.map((item, idx) => {
                const isChecked = habitDays[idx];
                return (
                  <div key={item.day} className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${isChecked ? 'bg-purple-50 border-purple-300' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                      <button 
                        onClick={() => toggleHabitDay(idx)} 
                        className={`w-9 h-9 rounded-xl font-black text-xs transition-all flex items-center justify-center ${isChecked ? 'bg-purple-600 text-white shadow-md' : 'bg-white border border-stone-300 text-stone-500 hover:border-purple-400'}`}
                      >
                        {isChecked ? '✓' : `D${item.day}`}
                      </button>
                      <span className="text-xs font-extrabold text-purple-700 uppercase tracking-widest shrink-0">DAY {item.day}:</span>
                    </div>
                    
                    <input 
                      type="text" 
                      value={item.goal} 
                      onChange={(e) => handleDailyGoalChange(idx, e.target.value)}
                      placeholder={`Nhập mục tiêu tùy chỉnh cho Day ${item.day}...`}
                      className="flex-1 w-full bg-white px-4 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-800"
                    />

                    <span className={`text-[10px] font-bold px-3 py-1.5 rounded-xl shrink-0 ${isChecked ? 'bg-purple-600 text-white' : 'bg-stone-200 text-stone-600'}`}>
                      {isChecked ? '+20 Coins Received' : 'Chưa Check-in'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'game' && (
          <div className="space-y-8 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-stone-900">{t.gameTitle}</h2>
            <div className="p-8 rounded-3xl border bg-white border-stone-200 shadow-md">
              <div className="flex justify-between items-center mb-4 text-xs font-bold">
                <span>Điểm: {gameScore}</span>
                <span>Thời gian: {gameTimeLeft}s</span>
              </div>
              <div className="w-full h-80 bg-slate-950 rounded-2xl relative overflow-hidden flex items-center justify-center">
                {!isGameActive && (
                  <button onClick={startGame} className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-2xl shadow">Start 🚀</button>
                )}
                {isGameActive && gameTargets.map((target) => (
                  <button
                    key={target.id}
                    onClick={() => hitTarget(target)}
                    style={{ left: `${target.x}px`, top: `${target.y}px` }}
                    className="absolute text-3xl transform hover:scale-125 transition-transform"
                  >
                    {target.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PET HATCHERY WITH FULL 25 PETS UNLOCKED DATABASE */}
        {activeTab === 'pet' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full uppercase tracking-wider">Linh Thú 24H</span>
              <h2 className="text-3xl font-extrabold mt-2 text-stone-900">{t.petTitle}</h2>
              <p className="text-sm mt-1 text-stone-600">{t.petSubtitle}</p>
            </div>

            <div className="p-8 rounded-3xl border bg-white border-stone-200 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left space-y-3 max-w-md">
                <h3 className="text-xl font-black text-stone-900">🥚 Quả Trứng Thần Kỳ TIMEWISE24H</h3>
                <p className="text-xs text-stone-500">Nạp năng lượng trứng bằng TimeCoins để nở linh thú dễ thương!</p>
                <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-pink-500 to-purple-600" style={{ width: `${eggProgress}%` }}></div>
                </div>
                <button onClick={feedEggEnergy} className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-2xl text-xs shadow-md">
                  {t.hatchEggBtn}
                </button>
              </div>
              <div className="w-40 h-40 rounded-3xl bg-pink-50 border-4 border-pink-200 flex items-center justify-center text-6xl shadow-inner animate-pulse">
                🥚
              </div>
            </div>

            {lastHatchedPet && (
              <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl flex justify-between items-center animate-in zoom-in">
                <div className="flex items-center space-x-4">
                  <span className="text-5xl">{lastHatchedPet.icon}</span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full">{lastHatchedPet.isSecret ? t.secretTag : 'Linh Thú Dễ Thương'}</span>
                    <h4 className="text-2xl font-black mt-1">{lang === 'vi' ? lastHatchedPet.nameVi : lastHatchedPet.nameEn}</h4>
                    <p className="text-xs text-white/80">{lang === 'vi' ? lastHatchedPet.descVi : lastHatchedPet.descEn}</p>
                  </div>
                </div>
                <button onClick={() => setLastHatchedPet(null)} className="px-4 py-2 bg-white text-slate-900 font-bold text-xs rounded-xl shadow">
                  Nhận Linh Thú
                </button>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{t.collectionTitle} ({unlockedPets.length} / {PET_DATABASE.length})</h3>
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">5 Secret Pets</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                {PET_DATABASE.map(pet => {
                  const isUnlocked = unlockedPets.includes(pet.id);
                  return (
                    <div 
                      key={pet.id} 
                      className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center relative ${
                        isUnlocked 
                          ? pet.isSecret 
                            ? 'bg-gradient-to-tr from-amber-50 to-purple-50 border-amber-400 shadow-md' 
                            : 'bg-white border-stone-200' 
                          : 'bg-stone-100 border-stone-200 opacity-40 grayscale'
                      }`}
                    >
                      {pet.isSecret && isUnlocked && (
                        <span className="absolute top-2 right-2 text-[9px] font-black text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full">SECRET</span>
                      )}
                      <span className="text-4xl my-2">{isUnlocked ? pet.icon : '❓'}</span>
                      <h5 className="font-bold text-xs truncate max-w-[120px]">{isUnlocked ? (lang === 'vi' ? pet.nameVi : pet.nameEn) : 'Chưa Mở Khoá'}</h5>
                      <p className="text-[10px] text-stone-400 line-clamp-1 mt-0.5">{isUnlocked ? (lang === 'vi' ? pet.descVi : pet.descEn) : 'Ấp trứng để nhận'}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* NICKNAME AUTH MODAL */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3 border-stone-100">
              <h3 className="text-lg font-bold text-stone-900">Tài Khoản Cá Nhân / Biệt Danh</h3>
              <button onClick={() => setIsAuthModalOpen(false)}><X className="w-4 h-4 text-stone-400" /></button>
            </div>
            
            <form onSubmit={saveProfileNickname} className="space-y-3">
              <label className="block text-xs font-bold text-stone-500">Nhập Biệt Danh Của Bạn:</label>
              <input 
                type="text" 
                value={usernameInput} 
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Ví dụ: TramAnh_SV" 
                className="w-full px-4 py-2.5 rounded-xl border text-xs bg-stone-50 border-stone-200"
              />
              <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow">
                Lưu Biệt Danh
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FLOATING PUSH NOTIFICATION PERMISSION MODAL */}
      {showNotifPermissionModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 border-b pb-3 border-stone-100">
              <div className="p-2.5 bg-amber-100 text-amber-600 rounded-2xl">
                <Bell className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">Cài Đặt Thông Báo Nổi Màn Hình</h3>
            </div>
            
            <p className="text-xs leading-relaxed text-stone-600">
              Bạn có cho phép ứng dụng hiển thị thông báo nổi trực tiếp ra màn hình thiết bị (PC & Điện thoại) để nhắc nhở ca học Pomodoro và hoạt động không?
            </p>

            <div className="flex space-x-2 pt-2">
              <button 
                onClick={() => requestNativeNotifPermission(true)}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Cho Phép Bật Thông Báo 🔔
              </button>
              <button 
                onClick={() => requestNativeNotifPermission(false)}
                className="px-4 py-2.5 border border-stone-200 text-stone-600 font-bold text-xs rounded-xl"
              >
                Từ Chối
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RULES MODAL (LUẬT TIMEWISE24H) */}
      {isRulesModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 border shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b pb-3 border-stone-100">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-amber-500" />
                <h3 className="text-xl font-bold text-stone-900">Bộ Quy Tắc "Sân Chơi Thời Gian"</h3>
              </div>
              <button onClick={() => setIsRulesModalOpen(false)}><X className="w-4 h-4 text-stone-400" /></button>
            </div>
            
            <div className="space-y-3.5 text-sm text-stone-600 leading-relaxed">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100">
                <h4 className="font-bold text-amber-900 mb-1">1. Tự Giác & Trung Thực</h4>
                <p className="text-xs text-amber-800">Khi kê khai tại "Ví 24H", sự trung thực là chìa khóa để quản lý lịch trình hiệu quả.</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                <h4 className="font-bold text-emerald-900 mb-1">2. Nguyên Tắc 80/20</h4>
                <p className="text-xs text-emerald-800">Tập trung tối đa vào các công việc quan trọng trên Ma trận Eisenhower.</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button onClick={() => setIsRulesModalOpen(false)} className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs">
                Đã Hiểu & Đã Sẵn Sàng!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TIMEWISE MUSIC - FLOATING YOUTUBE PLAYER */}
      <div className={`fixed bottom-5 right-5 z-40 transition-all duration-300 ${
        isMusicOpen
          ? 'w-[min(360px,calc(100vw-2.5rem))] opacity-100'
          : 'w-0 h-0 opacity-0 pointer-events-none overflow-hidden'
      }`}>
        <section className="rounded-3xl overflow-hidden border border-stone-200 bg-white shadow-2xl shadow-slate-900/20">
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                <Music2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-extrabold leading-tight">TIMEWISE MUSIC</p>
                <p className="text-[10px] text-emerald-50">Âm nhạc đồng hành cùng bạn</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsMusicOpen(false)}
              aria-label="Thu nhỏ trình phát nhạc"
              className="p-2 rounded-xl hover:bg-white/15 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 space-y-3">
            <form onSubmit={loadYouTubeMusic} className="flex gap-2">
              <input
                type="url"
                value={musicInput}
                onChange={(e) => { setMusicInput(e.target.value); setMusicError(''); }}
                placeholder="Dán link YouTube vào đây..."
                aria-label="YouTube video URL"
                className="min-w-0 flex-1 px-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
              <button
                type="submit"
                className="shrink-0 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
              >
                Phát
              </button>
            </form>

            {musicError && (
              <p role="alert" className="text-[11px] text-red-600">{musicError}</p>
            )}

            {musicVideoId ? (
              <div className="space-y-2">
                <div className="aspect-video overflow-hidden rounded-2xl bg-stone-900">
                  <iframe
                    key={musicVideoId}
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${musicVideoId}?autoplay=1&rel=0&playsinline=1`}
                    title="TIMEWISE MUSIC - YouTube player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <p className="text-[10px] text-stone-500 flex items-center gap-1">
                  <Youtube className="w-3.5 h-3.5 text-red-500" />
                  Điều khiển phát/dừng trực tiếp trong trình phát YouTube.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-stone-200 bg-stone-50 px-4 py-7 text-center">
                <div className="mx-auto mb-2 w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Music2 className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-stone-700">Chưa có bài nhạc nào</p>
                <p className="text-[10px] text-stone-500 mt-1">Dán link YouTube để bắt đầu nghe nhạc khi học tập.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Floating button shown while the music widget is minimized */}
      {!isMusicOpen && (
        <button
          type="button"
          onClick={() => setIsMusicOpen(true)}
          aria-label="Mở TIMEWISE MUSIC"
          className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-600/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        >
          <Music2 className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white" />
        </button>
      )}

      {/* FOOTER & TEAM CONTACTS */}
      <footer className="border-t py-8 px-4 sm:px-6 lg:px-8 mt-12 bg-white border-stone-200 text-stone-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <span className="font-extrabold text-lg text-emerald-600 tracking-tight">TIMEWISE24H</span>
            <p className="text-xs mt-0.5 text-stone-500">Dự án hệ sinh thái hỗ trợ sinh viên đại học - Phát triển bởi <span className="font-bold text-emerald-600">Team THE FIVE</span></p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 text-xs font-medium">
            <span className="font-bold text-stone-500">Email liên hệ nhóm [THE FIVE]:</span>
            <a href="mailto:nhuquynhnguyenta2650@gmail.com" className="hover:text-emerald-600 underline flex items-center space-x-1">
              <Mail className="w-3.5 h-3.5" />
              <span>nhuquynhnguyenta2650@gmail.com</span>
            </a>
            <span className="hidden sm:inline text-stone-300">•</span>
            <a href="mailto:Luhuynhtramanh9@gmail.com" className="hover:text-emerald-600 underline flex items-center space-x-1">
              <Mail className="w-3.5 h-3.5" />
              <span>Luhuynhtramanh9@gmail.com</span>
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}