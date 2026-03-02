<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <title>美西14天趴趴走</title>
  
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');
    body { font-family: 'Nunito', 'Microsoft JhengHei', sans-serif; background-color: #f8fafc; -webkit-tap-highlight-color: transparent;}
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    .animate-fade-in { animation: fadeIn 0.5s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState } = React;

    // --- 圖示元件 ---
    const IconWrapper = ({ children, size=24, className="", strokeWidth=2 }) => (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>{children}</svg>
    );
    const MapPin = (p) => <IconWrapper {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></IconWrapper>;
    const Utensils = (p) => <IconWrapper {...p}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></IconWrapper>;
    const Car = (p) => <IconWrapper {...p}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></IconWrapper>;
    const Bed = (p) => <IconWrapper {...p}><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></IconWrapper>;
    const Navigation = (p) => <IconWrapper {...p}><polygon points="3 11 22 2 13 21 11 13 3 11"/></IconWrapper>;
    const CloudSun = (p) => <IconWrapper {...p}><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/></IconWrapper>;
    const Plane = (p) => <IconWrapper {...p}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l7 4-3.5 3.5-2.5-.5L3 16l3 3 1 3 1-1-.5-2.5 3.5-3.5 4 7c.4-.2.7-.6.6-1.1Z"/></IconWrapper>;
    const Wallet = (p) => <IconWrapper {...p}><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></IconWrapper>;
    const Phone = (p) => <IconWrapper {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></IconWrapper>;
    const Plus = (p) => <IconWrapper {...p}><path d="M5 12h14"/><path d="M12 5v14"/></IconWrapper>;
    const Trash2 = (p) => <IconWrapper {...p}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></IconWrapper>;
    const Heart = (p) => <IconWrapper {...p}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></IconWrapper>;
    const Sparkles = (p) => <IconWrapper {...p}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M3 5h4"/><path d="M19 19v4"/><path d="M17 21h4"/></IconWrapper>;
    const MapIcon = (p) => <IconWrapper {...p}><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></IconWrapper>;
    const Compass = (p) => <IconWrapper {...p}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></IconWrapper>;

    const itineraryData = [
      {
        day: 1, date: '4/7 (二)', title: '西雅圖快閃與抵達賭城', location: '西雅圖 / 拉斯維加斯', weather: '12°C ☁️',
        events: [
          { type: 'transport', time: '09:35', title: '達美航空出發 (T2)', desc: 'TPE -> SEA (轉機 9h50m)', locationQuery: '桃園國際機場第二航廈' },
          { type: 'transport', time: '白天', title: '西雅圖輕軌 🚊', desc: '直達市區 Westlake Station。', locationQuery: 'Westlake Station Seattle' },
          { type: 'attraction', time: '上午', title: 'Starbucks Coffee 創始店', desc: '朝聖全球第一間星巴克 ☕。', locationQuery: 'Starbucks Coffee Company Seattle', tags: [{ label: '🛍️ 限定隨行杯', type: 'buy' }] },
          { type: 'restaurant', time: '午餐', title: 'Pike Place Chowder', desc: '世界著名巧達濃湯 🥣。', locationQuery: 'Pike Place Chowder', tags: [{ label: '🤤 必點蛤蜊濃湯', type: 'eat' }] },
          { type: 'transport', time: '18:20', title: '抵達拉斯維加斯', desc: '抵達LAS機場，搭乘 Uber 辦理入住 🚕。', locationQuery: 'Harry Reid International Airport' },
          { type: 'accommodation', time: '晚間', title: '入住 Horseshoe 飯店 🏰', desc: '位於大道正中心，逛街超方便！', locationQuery: 'Horseshoe Las Vegas' },
          { type: 'restaurant', time: '晚餐', title: 'In-N-Out Burger (外帶)', desc: '外帶道地美西神級漢堡回飯店享用 🍔。', locationQuery: 'In-N-Out Burger Las Vegas' }
        ]
      },
      {
        day: 2, date: '4/8 (三)', title: '專人交車與 Outlet 血拼', location: '拉斯維加斯', weather: '27°C 🌤️',
        events: [
          { type: 'transport', time: '10:00', title: '天馬租車交車 🚙', desc: '與專員在飯店會合，辦理交車手續。' },
          { type: 'restaurant', time: '10:30', title: 'Shake Shack 漢堡', desc: '抵達北 Outlet 後先吃飽，避開中午人潮 🍔。', locationQuery: 'Shake Shack LV Outlet' },
          { type: 'attraction', time: '下午', title: '北 Outlet 瘋狂血拼 🛍️', desc: 'Las Vegas North Premium Outlets。', locationQuery: 'Las Vegas North Premium Outlets' },
          { type: 'transport', time: '傍晚', title: '回飯店放戰利品', desc: '將戰利品放回房間，停妥車輛 (停車費 $25)。' },
          { type: 'restaurant', time: '18:00', title: 'Giordano\'s 深盤披薩', desc: '飯店正樓下享用超牽絲披薩 🍕。', locationQuery: 'Giordano\'s Las Vegas', tags: [{ label: '🍕 經典深盤', type: 'eat' }] },
          { type: 'attraction', time: '晚間', title: '百樂宮水舞秀 ⛲', desc: '順路走到對面欣賞壯麗免費水舞。', locationQuery: 'Bellagio Fountains' },
          { type: 'attraction', time: '晚間', title: 'CVS 採買', desc: '採買明天去大峽谷的早餐、午餐與零食。', locationQuery: 'CVS Las Vegas Strip' }
        ]
      },
      {
        day: 3, date: '4/9 (四)', title: '胡佛水壩與大峽谷壯遊', location: '大峽谷 / 金曼', weather: '20°C 🌤️',
        events: [
          { type: 'accommodation', time: '06:00', title: '辦理退房啟程 🌅', desc: 'Check-out Horseshoe，帶著早餐出發。' },
          { type: 'attraction', time: '07:00', title: '胡佛水壩 Hoover Dam 💧', desc: '變形金剛取景地，震撼的水壩美景。', locationQuery: 'Hoover Dam' },
          { type: 'accommodation', time: '中午', title: '金曼 (Kingman) 先寄行李 🧳', desc: '抵達飯店放行李，減輕車輛負擔。', locationQuery: 'Best Western Plus Kingman' },
          { type: 'attraction', time: '下午', title: '大峽谷國家公園 (停留3小時) ⛰️', desc: '自駕至南緣欣賞 Mather Point 壯麗景觀。', locationQuery: 'Mather Point' },
          { type: 'accommodation', time: '晚間', title: '返回 Kingman 入住', desc: '完美切分長途車程 (免停車費)，好好休息 🛌。', locationQuery: 'Best Western Plus Kingman' }
        ]
      },
      {
        day: 4, date: '4/10 (五)', title: '賭城奢華與舊城區不夜城', location: '拉斯維加斯', weather: '29°C ☀️',
        events: [
          { type: 'restaurant', time: '早餐', title: '飯店免費早餐', desc: '吃飽後 08:00 準時退房開回拉斯維加斯 🥐。' },
          { type: 'accommodation', time: '10:30', title: 'Nirvana Hotel 寄放行李', desc: '車停飯店(免停車費)，搭 DEUCE 前往 Strip。', locationQuery: 'Nirvana Hotel Las Vegas' },
          { type: 'restaurant', time: '12:00', title: 'The Buffet at Wynn (永利)', desc: '夢幻花園中的頂級自助午餐 🦞。', locationQuery: 'The Buffet at Wynn', tags: [{ label: '⚠️ 需提早預約', type: 'booking' }] },
          { type: 'attraction', time: '下午', title: 'The Sphere 打卡散步 🌐', desc: '在橋上與壯觀的球體館拍照，散步消化。', locationQuery: 'The Sphere Las Vegas' },
          { type: 'accommodation', time: '16:00', title: '回飯店 Check-in 休息', desc: '回 Nirvana 洗澡休息，準備晚上的行程。' },
          { type: 'attraction', time: '18:30', title: '舊城區 Fremont Street', desc: '開車前往超熱鬧的天幕燈光秀街區 🌟。', locationQuery: 'Fremont Street Experience', guide: '🚗 停在 "Fremont Street Experience Parking Garage"，約 $4/小時。' },
          { type: 'restaurant', time: '晚餐', title: '舊城區晚餐選擇', desc: '可吃天幕下的 Panda Express 或 Heart Attack Grill。' },
          { type: 'transport', time: '21:30', title: '與天馬專員會合還車', desc: '21:00 離開舊城區，開回飯店還車給專員 🚙。' }
        ]
      },
      {
        day: 5, date: '4/11 (六)', title: '大道散策與紅眼班機', location: '拉斯維加斯 / 飛機上', weather: '28°C ☀️',
        events: [
          { type: 'accommodation', time: '10:30', title: '睡到自然醒與退房', desc: '退房並將行李寄放在飯店櫃檯。' },
          { type: 'transport', time: '上午', title: '搭乘 DEUCE 遊大道', desc: '買 DEUCE 一日券前往大道南段。' },
          { type: 'restaurant', time: '午餐', title: 'Panda Express 🐼', desc: '在 Showcase Mall 附近享用美式中餐。', locationQuery: 'Panda Express Las Vegas Strip' },
          { type: 'attraction', time: '下午', title: '可口可樂與 M&M 旗艦店', desc: '採買特色紀念品，兩間店就在隔壁 🍫。', locationQuery: 'M&M\'s World Las Vegas' },
          { type: 'restaurant', time: '下午', title: '買 Eggslut 當點心', desc: '順路到 Cosmopolitan 買超人氣滑蛋漢堡 🍳。', locationQuery: 'Eggslut Las Vegas' },
          { type: 'attraction', time: '傍晚', title: 'Walgreens/CVS 採買', desc: '買晚上等飛機時吃的乾糧與水 🛒。' },
          { type: 'transport', time: '晚間', title: '搭計程車去機場', desc: '回飯店拿行李，前往機場報到。' },
          { type: 'transport', time: '23:45', title: '西南航空飛往奧蘭多 ✈️', desc: 'LAS -> MCO (航程約 4.5 小時)，機上補眠。', locationQuery: 'Harry Reid International Airport' }
        ]
      },
      {
        day: 6, date: '4/12 (日)', title: '早安奧蘭多與小鎮時光', location: '佛州 奧蘭多', weather: '26°C 🌤️',
        events: [
          { type: 'transport', time: '07:10', title: '抵達 MCO 奧蘭多機場', desc: '搭乘計程車/Uber前往迪士尼度假區飯店。', locationQuery: 'Orlando International Airport' },
          { type: 'accommodation', time: '上午', title: '飯店寄放行李 🧳', desc: '先至飯店櫃檯放行李。' },
          { type: 'attraction', time: '白天', title: 'Disney Springs 逛街', desc: '前往超大的迪士尼免費購物娛樂區。', locationQuery: 'Disney Springs' },
          { type: 'restaurant', time: '早午餐', title: 'Earl of Sandwich', desc: 'Disney Springs 內超高CP值的熱壓三明治 🥪。', locationQuery: 'Earl of Sandwich Disney Springs' },
          { type: 'accommodation', time: '16:00', title: '回飯店 Check-in', desc: '洗澡補眠，洗去紅眼班機的疲憊。' },
          { type: 'restaurant', time: '晚餐', title: 'The Boathouse 或 Homecomin\'', desc: '傍晚再回小鎮，推薦吃湖景海鮮或南方炸雞 🥩！', tags: [{ label: '⚠️ 需提早預約', type: 'booking' }] }
        ]
      },
      {
        day: 7, date: '4/13 (一)', title: '迪士尼：Magic Kingdom', location: '奧蘭多迪士尼', weather: '28°C ☀️',
        events: [
          { type: 'attraction', time: '全日', title: 'Magic Kingdom 魔法王國 🏰', desc: '最經典的迪士尼！必玩創光速戰記 (TRON)。', locationQuery: 'Magic Kingdom Park' },
          { type: 'attraction', time: '晚間', title: '城堡煙火秀 🎆', desc: '一定要留到晚上看「Happily Ever After」煙火！' }
        ]
      },
      {
        day: 8, date: '4/14 (二)', title: '迪士尼：Hollywood Studios', location: '奧蘭多迪士尼', weather: '29°C ☀️',
        events: [
          { type: 'attraction', time: '全日', title: 'Hollywood Studios 好萊塢影城 🎬', desc: '星際大戰與玩具總動員粉絲天堂。', locationQuery: 'Disney\'s Hollywood Studios' },
          { type: 'attraction', time: '晚間', title: 'Fantasmic! 水上秀 🌊', desc: '米奇與反派的華麗聲光水舞秀。' }
        ]
      },
      {
        day: 9, date: '4/15 (三)', title: '迪士尼：EPCOT', location: '奧蘭多迪士尼', weather: '28°C 🌤️',
        events: [
          { type: 'attraction', time: '全日', title: 'EPCOT 艾波卡特 🌐', desc: '世界各國櫥窗漫步，超適合長輩！', locationQuery: 'EPCOT' },
          { type: 'attraction', time: '必玩', title: '星際異攻隊過山車 🎢', desc: '全奧蘭多最好玩的室內過山車！' },
          { type: 'attraction', time: '晚間', title: 'Luminous 湖面煙火 🎆', desc: '絕美的跨國界煙火水舞秀。' }
        ]
      },
      {
        day: 10, date: '4/16 (四)', title: '環球影城：Epic Universe', location: '奧蘭多環球', weather: '27°C ☀️',
        events: [
          { type: 'attraction', time: '全日', title: 'Epic Universe 史詩宇宙 🪐', desc: '2025 全新神級樂園！任天堂與馴龍高手。', locationQuery: 'Universal Epic Universe' },
          { type: 'attraction', time: '晚間', title: '星體公園夜間秀 ⛲', desc: '中央 Celestial Park 的震撼水舞煙火秀。' }
        ]
      },
      {
        day: 11, date: '4/17 (五)', title: '環球影城：雙園魔法之旅', location: '奧蘭多環球', weather: '28°C ☀️',
        events: [
          { type: 'attraction', time: '全日', title: 'Universal 雙園暢遊 🎢', desc: '使用 Park-to-Park 跨園門票！', locationQuery: 'Universal Studios Florida' },
          { type: 'attraction', time: '必玩', title: '哈利波特魔法世界 🪄', desc: '逛斜角巷，搭乘「霍格華茲特快車」到活米村。' },
          { type: 'attraction', time: '晚間', title: 'CineSational 無人機秀 🛸', desc: '在 USF 湖面的大型交響夜間秀。' }
        ]
      },
      {
        day: 12, date: '4/18 (六)', title: '完美賦歸與機場採買', location: '奧蘭多 / 飛機上', weather: '28°C 🌤️',
        events: [
          { type: 'accommodation', time: '11:00', title: '退房寄放行李 🧳', desc: '睡到自然醒，辦理 Check-out。' },
          { type: 'attraction', time: '中午', title: 'Disney Springs 🛍️', desc: '吃早午餐、採買最後的紀念品與伴手禮。' },
          { type: 'transport', time: '下午', title: '前往 MCO 機場', desc: '回飯店拿行李，前往機場報到與逛逛。' },
          { type: 'transport', time: '18:11', title: '美國航空 AA1504 起飛', desc: 'MCO -> PHX (鳳凰城轉機停留 3.5 小時)。', locationQuery: 'Orlando International Airport' },
          { type: 'transport', time: '23:25', title: '星宇航空 JX025 起飛', desc: 'PHX -> TPE，舒舒服服睡回台灣 ✈️。' }
        ]
      },
      {
        day: 13, date: '4/19 (日)', title: '越過換日線', location: '飛機上', weather: '機艙空調 ❄️',
        events: [
          { type: 'transport', time: '全日', title: '享受星宇機上服務', desc: '看電影、品嚐機上特調，滿載回憶越過太平洋。' }
        ]
      },
      {
        day: 14, date: '4/20 (一)', title: '平安抵達台灣', location: '台北', weather: '溫暖家鄉 🏠',
        events: [
          { type: 'transport', time: '04:55', title: '降落桃園國際機場', desc: '順利抵達台灣，完美結束雙州樂園史詩旅！💖' }
        ]
      }
    ];

    const InfoToolsData = {
      flights: [
        { type: '去程 (國際)', date: '4/7 (二)', airline: '達美航空', route: 'TPE 09:35 -> SEA -> LAS 18:20', note: '機票4人約 NT$56,804' },
        { type: '去程 (國內)', date: '4/11 (六)', airline: '西南航空', route: 'LAS 23:45 -> MCO 07:10(+1)', note: '紅眼班機，票價 $613.6 USD' },
        { type: '回程 (國際)', date: '4/18 (六)', airline: '美航/星宇', route: 'MCO 18:11 -> PHX -> TPE 04:55(4/20)', note: '鳳凰城轉機 3h30m' }
      ],
      hotels: [
        { date: '4/7 - 4/9 (2晚)', name: 'Horseshoe Las Vegas', location: '賭城大道正中心' },
        { date: '4/9 - 4/10 (1晚)', name: 'Best Western Plus', location: '金曼 Kingman (切分車程)' },
        { date: '4/10 - 4/11 (1晚)', name: 'Nirvana Hotel', location: '賭城免費停車住宿' },
        { date: '4/12 - 4/18 (6晚)', name: '奧蘭多精選飯店', location: '奧蘭多度假區' }
      ]
    };

    function App() {
      const [activeTab, setActiveTab] = useState('itinerary'); 
      const [selectedDay, setSelectedDay] = useState(1);

      const BottomNav = () => (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-indigo-100 rounded-t-[2rem] flex justify-around items-center h-20 max-w-md mx-auto z-50 shadow-[0_-5px_25px_rgba(99,102,241,0.15)]">
          <button onClick={() => setActiveTab('itinerary')} className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 ${activeTab === 'itinerary' ? 'text-indigo-600 scale-110 drop-shadow-md' : 'text-slate-400 hover:text-indigo-400'}`}>
            <MapIcon size={26} strokeWidth={2.5} /><span className="text-[11px] mt-1.5 font-extrabold tracking-widest">行程卡片</span>
          </button>
          <button onClick={() => setActiveTab('tools')} className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 ${activeTab === 'tools' ? 'text-indigo-600 scale-110 drop-shadow-md' : 'text-slate-400 hover:text-indigo-400'}`}>
            <Wallet size={26} strokeWidth={2.5} /><span className="text-[11px] mt-1.5 font-extrabold tracking-widest">旅遊工具</span>
          </button>
        </div>
      );

      return (
        <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-700 max-w-md mx-auto shadow-2xl relative overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white p-6 rounded-b-[2rem] sticky top-0 z-40 shadow-lg flex items-center justify-center pt-10 border-b border-indigo-200/50">
            <Sparkles size={22} className="mr-2 animate-pulse text-yellow-300" />
            <h1 className="text-xl font-black tracking-widest drop-shadow-md text-center">雙州樂園史詩旅</h1>
            <Plane size={22} className="ml-2 transform rotate-45 text-indigo-100" />
          </div>

          {activeTab === 'itinerary' ? (
            <ItineraryView selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
          ) : (
            <ToolsView />
          )}
          <BottomNav />
        </div>
      );
    }

    function ItineraryView({ selectedDay, setSelectedDay }) {
      const currentDayData = itineraryData.find(d => d.day === selectedDay);
      const getIconConfig = (type) => {
        if(type==='transport') return { icon: <Car size={20} />, bg: 'bg-sky-100', text: 'text-sky-600', border: 'border-sky-300' };
        if(type==='restaurant') return { icon: <Utensils size={20} />, bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-300' };
        if(type==='accommodation') return { icon: <Bed size={20} />, bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-300' };
        return { icon: <Compass size={20} />, bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-300' };
      };

      return (
        <div className="animate-fade-in">
          <div className="py-4 px-3 overflow-x-auto flex space-x-3 scrollbar-hide sticky top-[84px] z-30 bg-slate-50/90 backdrop-blur-sm border-b border-slate-200">
            {itineraryData.map(d => (
              <button key={d.day} onClick={() => setSelectedDay(d.day)} className={`flex flex-col items-center flex-shrink-0 px-5 py-2.5 rounded-2xl transition-all duration-300 border-2 ${selectedDay === d.day ? 'bg-indigo-600 text-white border-indigo-600 shadow-[0_5px_15px_rgba(79,70,229,0.3)] transform scale-105' : 'bg-white text-slate-500 border-slate-200 hover:bg-indigo-50'}`}>
                <span className="text-[10px] font-bold opacity-90">Day {d.day}</span>
                <span className="text-[13px] font-black mt-0.5">{d.date.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          <div className="px-4 pb-4 mt-6">
            <div className="bg-white rounded-[1.5rem] p-5 shadow-sm mb-7 border border-slate-200 flex justify-between items-center relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-5 text-indigo-600"><Heart size={80} fill="currentColor" /></div>
              <div className="relative z-10 w-2/3">
                <h2 className="text-[17px] font-black text-slate-800 leading-snug">{currentDayData.title}</h2>
                <div className="flex items-center text-slate-500 text-[11px] font-bold mt-2"><MapPin size={12} className="mr-1 text-indigo-400" /> {currentDayData.location}</div>
              </div>
              <div className="flex flex-col items-center justify-center text-amber-500 bg-amber-50/80 h-14 w-14 rounded-xl border border-amber-100 shrink-0 shadow-sm">
                <CloudSun size={22} className="mb-1" /><span className="text-[9px] font-black">{currentDayData.weather?.split(' ')[0] || '24°C'}</span>
              </div>
            </div>

            <div className="space-y-5 relative before:absolute before:inset-0 before:ml-[1.4rem] before:h-full before:w-[3px] before:bg-indigo-100 before:rounded-full pb-8">
              {currentDayData.events.map((evt, idx) => {
                const style = getIconConfig(evt.type);
                return (
                  <div key={idx} className="relative flex items-start group">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-[3px] border-white shadow-sm shrink-0 z-10 ${style.bg} ${style.text}`}>{style.icon}</div>
                    <div className={`w-full p-4 rounded-2xl rounded-tl-none bg-white shadow-sm border ${style.border} ml-4 transition-all hover:shadow-md`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[11px] font-black text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">{evt.time || '全天'}</span>
                        {(evt.locationQuery || evt.mapLink) && (
                          <a href={evt.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(evt.locationQuery)}`} target="_blank" rel="noopener noreferrer" className="text-indigo-500 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-full shadow-sm transition-colors"><Navigation size={14} strokeWidth={2.5} /></a>
                        )}
                      </div>
                      <h3 className="text-[14px] font-black text-slate-800 mb-1">{evt.title}</h3>
                      <p className="text-[12px] text-slate-500 font-medium leading-relaxed">{evt.desc}</p>
                      
                      {evt.tags && <div className="mt-3 flex flex-wrap gap-2">{evt.tags.map((t, i) => <span key={i} className="text-[10px] px-2.5 py-1 rounded-md font-bold shadow-sm bg-orange-50 text-orange-600 border border-orange-100">{t.label}</span>)}</div>}
                      {evt.guide && (
                        <div className="mt-3.5 bg-indigo-50/60 rounded-xl p-3 border border-indigo-100 flex items-start">
                          <div className="bg-indigo-200/50 p-1 rounded-md mr-2 shrink-0 mt-0.5"><Info size={12} className="text-indigo-700" strokeWidth={3} /></div>
                          <p className="text-[11px] text-indigo-900 font-bold leading-relaxed">{evt.guide}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    function ToolsView() {
      const expenses = [
        { id: 1, name: '國際線-達美4人 (NT$56,804)', amount: 1803.30 },
        { id: 2, name: '國內線-西南4人 ($613.6)', amount: 613.60 },
        { id: 3, name: 'Wynn Buffet 4人預算', amount: 239.96 },
        { id: 4, name: '天馬租車 (3天)', amount: 600.00 },
        { id: 5, name: '奧蘭多樂園門票估算', amount: 2800.00 },
        { id: 6, name: '13天總伙食費預估', amount: 6000.00 }
      ];
      const totalUSD = expenses.reduce((sum, item) => sum + item.amount, 0);

      return (
        <div className="p-5 space-y-6 animate-fade-in pb-10">
          <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white p-6 rounded-[1.5rem] text-center shadow-md relative overflow-hidden mb-5">
              <div className="absolute top-2 right-2 opacity-20"><Wallet size={60} /></div>
              <p className="text-[11px] font-bold text-teal-100 mb-1 relative z-10">目前預估總支出 (匯率 1:31.5)</p>
              <div className="text-[32px] font-black relative z-10 drop-shadow-sm">${totalUSD.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              <div className="text-[13px] font-bold mt-1 relative z-10 opacity-90">≈ ${(totalUSD * 31.5).toLocaleString()} TWD</div>
            </div>
            <div className="space-y-3">
              {expenses.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-[13px] font-bold text-slate-600 leading-tight">{item.name}</span>
                  <span className="text-[14px] font-black text-teal-600">${item.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-200">
            <div className="flex items-center text-indigo-700 font-black mb-4 text-[15px]"><Plane size={20} className="mr-2"/> 航班與住宿速覽</div>
            
            <div className="space-y-3 mb-5">
              {InfoToolsData.flights.map((f, i) => (
                <div key={`f-${i}`} className="bg-sky-50/80 p-3.5 rounded-xl border border-sky-100">
                   <div className="text-[10px] text-sky-600 font-black mb-1 bg-sky-100 inline-block px-2 py-0.5 rounded-md">{f.type} • {f.date}</div>
                   <div className="text-[13px] font-black text-slate-800 mt-1">{f.airline}</div>
                   <div className="text-[11px] text-slate-600 font-bold mt-0.5">{f.route}</div>
                   <div className="text-[10px] text-amber-600 font-bold mt-1.5">{f.note}</div>
                </div>
              ))}
            </div>

            <div className="h-px bg-slate-200 my-4"></div>

            <div className="space-y-3">
              {InfoToolsData.hotels.map((h, i) => (
                <div key={`h-${i}`} className="bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100">
                  <div className="text-[10px] text-indigo-500 font-black mb-1">{h.date}</div>
                  <div className="text-[13px] font-black text-slate-800">{h.name}</div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center font-bold"><MapPin size={10} className="mr-1 text-indigo-400"/>{h.location}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>