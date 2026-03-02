import React, { useState } from 'react';
import { 
  MapPin, Utensils, Car, Bed, Info, Navigation, 
  CloudSun, Plane, Wallet, Phone, Plus, Trash2,
  Heart, Sparkles, Map as MapIcon, Compass
} from 'lucide-react';

// --- 最終完美版 14天行程資料 (4/9出發) ---
const itineraryData = [
  {
    day: 1, date: '4/9 (四)', title: '西雅圖快閃與抵達賭城', location: '西雅圖 / 拉斯維加斯', weather: '12°C ☁️ / 25°C 🌙',
    events: [
      { type: 'transport', time: '09:35', title: '達美航空出發 ✈️', desc: 'TPE (第二航廈) -> SEA (轉機停留 9h50m)', locationQuery: '桃園國際機場第二航廈' },
      { type: 'transport', time: '白天', title: '西雅圖輕軌 🚊', desc: '直達市區 Westlake Station。', locationQuery: 'Westlake Station Seattle',
        mapLink: 'https://maps.app.goo.gl/JMG4nduxF9Q5TaBP9'
      },
      { type: 'attraction', time: '上午', title: 'Starbucks Coffee Company', desc: '朝聖全球第一間星巴克 ☕。', locationQuery: 'Starbucks Coffee Company',
        mapLink: 'https://www.google.com/maps/place/Starbucks+Coffee+Company/@47.61004,-122.34259,17z/data=!3m2!4b1!5s0x54906ab2b8928821:0x66d5436614db27fb!4m6!3m5!1s0x54906b007b882aaf:0x97ce262f21d06791!8m2!3d47.61004!4d-122.34259!16s%2Fm%2F010865xh?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D',
        guide: '全球第一家星巴克成立於1971年！保留了最初的雙尾海妖Logo，非常具有紀念價值。',
        tags: [{ label: '🛍️ 必買伴手禮: 創始店限定隨行杯', type: 'buy' }]
      },
      { type: 'attraction', time: '上午', title: '派克市場 Pike Place Market', desc: '逛逛熱鬧的傳統市場，別忘了找吉祥物合照 🐷！', locationQuery: 'Rachel the Piggy Bank Seattle',
        guide: '在著名的「飛魚秀」招牌正下方，有一隻超大的銅豬存錢筒「瑞秋金豬」，摸摸豬鼻子會帶來好運喔！'
      },
      { type: 'attraction', time: '上午', title: '口香糖牆 The Gum Wall', desc: '派克市場底下的超奇葩熱門打卡景點 🍬。', locationQuery: 'The Gum Wall Seattle',
        mapLink: 'https://maps.app.goo.gl/y18K5tsdY9XLjawn7',
        tags: [{ label: '📸 獵奇打卡點', type: 'guide' }]
      },
      { type: 'restaurant', time: '午餐', title: 'Pike Place Chowder', desc: '西雅圖最著名的海鮮巧達濃湯 🥣。', locationQuery: 'Pike Place Chowder',
        mapLink: 'https://maps.app.goo.gl/rW7et9a4XtxkY7hH8',
        menuLink: 'https://www.pikeplacechowder.com/chinese?srsltid=AfmBOordXSR8ZMtF0mkvVtlvUTIreJ9GeXvKR5JQNPpd_JUYDNnnuU32',
        tags: [{ label: '🤤 必點菜單: 新英格蘭蛤蜊巧達湯', type: 'eat' }]
      },
      { type: 'attraction', time: '下午', title: 'Waterfront Park 散步', desc: '吃飽後到西雅圖海濱公園吹海風、散散步消化一下 🎡。', locationQuery: 'Waterfront Park Seattle' },
      { type: 'transport', time: '14:00', title: '搭輕軌返回機場', desc: '預計下午兩點左右搭輕軌準備回機場搭機 🚊。', locationQuery: 'SeaTac/Airport Station',
        mapLink: 'https://maps.app.goo.gl/znndm1QqQLzDQC9d6'
      },
      { type: 'transport', time: '18:20', title: '抵達拉斯維加斯', desc: '抵達LAS機場，搭乘 Uber 辦理入住 🚕。', locationQuery: 'Harry Reid International Airport',
        mapLink: 'https://maps.app.goo.gl/rPgPqbnu7hmPcskj9'
      },
      { type: 'accommodation', time: '晚間', title: '入住 Horseshoe 飯店 🏰', desc: '位於大道正中心，逛街看秀極度方便！', locationQuery: 'Horseshoe Las Vegas',
        mapLink: 'https://maps.app.goo.gl/H1jD6foFbdX6TPUr8'
      },
      { type: 'restaurant', time: '晚餐', title: 'In-N-Out Burger (外帶)', desc: '外帶道地美西神級漢堡 🍔。', locationQuery: 'In-N-Out Burger Las Vegas',
        mapLink: 'https://maps.app.goo.gl/s71fexwFMx72nX9S7',
        tags: [{ label: '🍔 必吃美食: 美西靈魂快餐', type: 'eat' }]
      },
      { type: 'attraction', time: '晚間', title: 'CVS 採買', desc: '走回飯店途中去 CVS 買大罐水與零食 🛒，再回房間休息。', locationQuery: 'CVS Las Vegas Strip',
        mapLink: 'https://maps.app.goo.gl/viKmqw5n4aJmohBv8',
        tags: [{ label: '💧 省錢秘訣: 買加侖桶裝水', type: 'buy' }]
      }
    ]
  },
  {
    day: 2, date: '4/10 (五)', title: 'Outlet血拼與悠閒時光', location: '拉斯維加斯', weather: '27°C 🌤️',
    events: [
      { type: 'restaurant', time: '早餐', title: 'CVS 簡便早餐', desc: '享用 Day 1 買好的麵包與點心，準備出發 🥐。', locationQuery: 'Horseshoe Las Vegas' },
      { type: 'restaurant', time: '10:00', title: 'Shake Shack 漢堡 (先吃再逛)', desc: '抵達 Outlet 後先填飽肚子，避開中午用餐尖峰時段 🍔。', locationQuery: 'Shake Shack Las Vegas North Premium Outlets',
        tags: [{ label: '🍔 必點菜單: 招牌 ShackBurger', type: 'eat' }]
      },
      { type: 'attraction', time: '白天', title: 'Outlet 瘋狂血拼 🛍️', desc: '吃飽喝足後，在 Las Vegas North Premium Outlets 享受折扣購物樂趣。', locationQuery: 'Las Vegas North Premium Outlets' },
      { type: 'transport', time: '傍晚', title: '回飯店放戰利品', desc: '帶著滿滿戰利品先搭車回 Horseshoe 飯店放東西，稍作休息 🛍️。', locationQuery: 'Horseshoe Las Vegas' },
      { type: 'restaurant', time: '18:00', title: 'Giordano\'s 芝加哥深盤披薩', desc: '直接在自家飯店樓下享用超牽絲的深盤披薩，免去奔波！🍕', locationQuery: 'Giordano\'s Las Vegas',
        tags: [{ label: '🍕 必吃美食: 經典芝加哥深盤披薩 (Deep Dish)', type: 'eat' }]
      },
      { type: 'attraction', time: '晚間', title: '百樂宮水舞秀 ⛲', desc: '吃飽後順路走到對面的百樂宮欣賞經典的免費水舞秀。', locationQuery: 'Fountains of Bellagio',
        guide: '水舞秀每 15-30 分鐘一場，夜晚搭配燈光與音樂非常浪漫！'
      },
      { type: 'attraction', time: '晚間', title: 'CVS 採買', desc: '看完水舞後，去 CVS 買明天的早餐。', locationQuery: 'CVS Las Vegas Strip',
        mapLink: 'https://maps.app.goo.gl/viKmqw5n4aJmohBv8'
      }
    ]
  },
  {
    day: 3, date: '4/11 (六)', title: '大道北段與威尼斯浪漫', location: '拉斯維加斯', weather: '29°C ☀️',
    events: [
      { type: 'restaurant', time: '早餐', title: 'CVS 簡便早餐', desc: '享用 Day 1 買好的麵包與點心 🥐。', locationQuery: 'Horseshoe Las Vegas' },
      { type: 'attraction', time: '白天', title: '威尼斯人與永利酒店 🛶', desc: '漫步威尼斯人室內浪漫運河、欣賞永利(Wynn)絕美室內花園。', locationQuery: 'The Venetian Las Vegas' },
      { type: 'restaurant', time: '12:00', title: 'The Buffet at Wynn (永利自助餐)', desc: '在夢幻花園環境中享用頂級自助午餐 🦞。', locationQuery: 'The Buffet at Wynn Las Vegas',
        tags: [{ label: '⚠️ 重要預約: 用餐限時 2 小時', type: 'booking' }, { label: '🤤 必吃美食: 雪蟹腳、精緻夢幻甜點', type: 'eat' }]
      },
      { type: 'attraction', time: '下午', title: 'The Sphere (球體館)', desc: '全新地標外圍拍照打卡 🌐。', locationQuery: 'The Sphere Las Vegas',
        mapLink: 'https://maps.app.goo.gl/9ynhQMQ8EHP2cwzk6',
        guide: '外牆擁有58萬個LED燈泡，是世界上最大的球體建築，晚上點燈後視覺效果超級震撼！'
      },
      { type: 'restaurant', time: '晚餐', title: '麥當勞 McDonald\'s', desc: '中午大餐後，晚餐輕鬆享用美式經典速食 🍔🍟。', locationQuery: 'McDonald\'s Las Vegas Strip',
        mapLink: 'https://maps.app.goo.gl/YeaZ3D8rrqGT8qbbA',
        tags: [{ label: '🍟 必吃: 感受美西在地口味的薯條與漢堡', type: 'eat' }]
      }
    ]
  },
  {
    day: 4, date: '4/12 (日)', title: '拉斯維加斯大道南段巡禮', location: '拉斯維加斯', weather: '28°C ☀️',
    events: [
      { type: 'restaurant', time: '早午餐', title: 'Eggslut', desc: '享用極具人氣的滑蛋漢堡 🍳。', locationQuery: 'Eggslut Las Vegas',
        tags: [{ label: '🤤 必點菜單: Fairfax 滑蛋漢堡', type: 'eat' }]
      },
      { type: 'attraction', time: '白天', title: '漫步大道南段 🌺', desc: '參觀百樂宮(Bellagio)絕美溫室花園、凱薩皇宮古羅馬購物街。', locationQuery: 'Bellagio Conservatory & Botanical Gardens',
        guide: '百樂宮的溫室花園全由真花打造，規模宏大且免費參觀，就像走進公主的後花園一樣好拍！'
      },
      { type: 'attraction', time: '下午', title: '特色主題店探索 🍫', desc: '參觀 M&M 巧克力與可口可樂旗艦店。', locationQuery: 'M&M\'s World Las Vegas' },
      { type: 'restaurant', time: '晚餐', title: 'Panda Express (外帶)', desc: '外帶美式中餐經典，撫慰長輩的亞洲胃 🥡。', locationQuery: 'Panda Express Las Vegas',
        mapLink: 'https://maps.app.goo.gl/9VsXtLYwVLSp2oGE7',
        tags: [{ label: '🥡 必點菜單: 橙汁雞 (Orange Chicken)、炒麵', type: 'eat' }]
      },
      { type: 'attraction', time: '晚間', title: 'Walgreens 採買', desc: '附近 Walgreens 買明天清晨出發大峽谷的早餐與水 🛒。', locationQuery: 'Walgreens Las Vegas',
        mapLink: 'https://maps.app.goo.gl/3ypcpnke4J5XsWs29',
        tags: [{ label: '🥐 為明日早起準備早餐', type: 'buy' }]
      }
    ]
  },
  {
    day: 5, date: '4/13 (一)', title: '取車出發與大峽谷壯遊', location: '大峽谷 / Kingman', weather: '20°C 🌤️',
    events: [
      { type: 'transport', time: '06:00', title: '辦理退房與專人交車 🚙', desc: '清晨 06:00 前完成退房，天馬租車將車開到飯店門口準備交車。', locationQuery: 'Horseshoe Las Vegas' },
      { type: 'attraction', time: '06:30', title: '啟程前往胡佛水壩 💧', desc: '交車手續完成，正式出發！第一站途經胡佛水壩觀光。', locationQuery: 'Hoover Dam',
        guide: '美國最大的水壩，也是內華達州與亞利桑那州的交界，可以體驗一腳踩在一個州！'
      },
      { type: 'accommodation', time: '中午', title: '金曼 (Kingman) 先寄行李 🧳', desc: '途經 Kingman 先至 Best Western Plus 寄放行李，減輕車輛負擔。', locationQuery: 'Best Western Plus A Wayfarer\'s Inn and Suites Kingman AZ' },
      { type: 'attraction', time: '下午', title: '大峽谷國家公園 (停留3小時) ⛰️', desc: '抵達南緣欣賞 Mather Point 壯麗景觀，預計停留約 3 小時後折返。', locationQuery: 'Mather Point Grand Canyon',
        tags: [{ label: '⚠️ 車程較長，司機需適時休息', type: 'guide' }]
      },
      { type: 'accommodation', time: '晚間', title: '自駕返回 Kingman 入住', desc: '天黑後開車返回 Kingman 辦理入住，完美切分超長車程，好好休息 🛌。', locationQuery: 'Best Western Plus A Wayfarer\'s Inn and Suites Kingman AZ' }
    ]
  },
  {
    day: 6, date: '4/14 (二)', title: '約書亞樹與加州小鎮', location: '加州 Anaheim', weather: '24°C ☀️',
    events: [
      { type: 'transport', time: '08:00', title: '離開 Kingman', desc: '辦理退房，準備前往加州 🚗。', locationQuery: 'Best Western Plus A Wayfarer\'s Inn and Suites Kingman AZ' },
      { type: 'attraction', time: '白天', title: '約書亞樹國家公園', desc: '欣賞獨特巨石群與超現實沙漠植物 🌵。', locationQuery: 'Joshua Tree National Park',
        guide: '充滿奇異魅力的沙漠仙境，這裡的沙漠植物和巨石陣如同外星世界般迷人！'
      },
      { type: 'accommodation', time: '傍晚', title: '入住 Anaheim 飯店 🏰', desc: '抵達 Anaheim 迪士尼周邊飯店辦理入住。', locationQuery: 'Alpine Inn Anaheim' },
      { type: 'restaurant', time: '晚餐', title: '飯店周邊享用', desc: '免開車直接在附近吃，為明天的樂園儲備體力 🍝。', locationQuery: 'Anaheim Resort' }
    ]
  },
  {
    day: 7, date: '4/15 (三)', title: '迪士尼樂園奇妙日', location: 'Anaheim', weather: '25°C ☀️',
    events: [
      { type: 'attraction', time: '全日', title: 'Disneyland Park (本園) 🎉', desc: '平日(星期三)入園避開人潮，輕鬆玩樂！', locationQuery: 'Disneyland Park',
        guide: '全球第一座迪士尼樂園！長輩累了隨時能走回飯店午休，超完美。'
      },
      { type: 'restaurant', time: '早餐', title: 'Starbucks / Panera Bread', desc: '園區外購買熱咖啡與麵包 ☕。', locationQuery: 'Disneyland Park' },
      { type: 'restaurant', time: '午餐', title: 'Blue Bayou 餐廳 🕯️', desc: '神鬼奇航設施內的紐奧良風情餐廳。', locationQuery: 'Blue Bayou Restaurant Disneyland',
        tags: [{ label: '⚠️ 重要預約: 需提早預約訂位', type: 'booking' }, { label: '✨ 沉浸式體驗: 微光河畔用餐', type: 'guide' }]
      },
      { type: 'restaurant', time: '晚餐', title: '巨無霸火雞腿 🍗', desc: '買著名小吃邊吃邊卡位等煙火！', locationQuery: 'Turkey Leg Cart Disneyland',
        tags: [{ label: '🍗 必吃美食: 煙燻火雞腿 Turkey Leg', type: 'eat' }]
      }
    ]
  },
  {
    day: 8, date: '4/16 (四)', title: '加州冒險樂園探索', location: 'Anaheim', weather: '26°C ☀️',
    events: [
      { type: 'attraction', time: '全日', title: 'Disney California Adventure', desc: '平日(星期四)必玩汽車總動員、皮克斯碼頭 🎢。', locationQuery: 'Disney California Adventure Park',
        guide: '獨家設施「Cars 汽車總動員」Radiator Springs Racers 絕對不能錯過！'
      },
      { type: 'restaurant', time: '午餐', title: 'Pym Test Kitchen', desc: '漫威區體驗「變大變小」趣味美式食物 🔬。', locationQuery: 'Pym Test Kitchen',
        tags: [{ label: '🥨 必點菜單: 巨大化食物', type: 'eat' }]
      },
      { type: 'restaurant', time: '晚餐', title: 'The Pizza Press', desc: '出園後享用自選配料現點現烤披薩 🍕。', locationQuery: 'The Pizza Press Anaheim' }
    ]
  },
  {
    day: 9, date: '4/17 (五)', title: '丹麥村異國風情', location: 'Solvang / 聖塔芭芭拉', weather: '22°C 🌤️',
    events: [
      { type: 'transport', time: '09:30', title: '驅車北上 🚗', desc: '避開早高峰，從 Anaheim 出發前往 Solvang。', locationQuery: 'Solvang CA' },
      { type: 'attraction', time: '中午', title: 'Solvang 丹麥村 🇩🇰', desc: '漫步充滿歐洲風情的童話小鎮，欣賞風車與木造建築。', locationQuery: 'Solvang CA',
        guide: '整個小鎮就像直接從北歐搬過來一樣，到處都是丹麥糕點店、特色精品店，非常適合長輩散步拍照。'
      },
      { type: 'restaurant', time: '午餐', title: '丹麥特色料理', desc: '在小鎮內享用正宗的丹麥香腸或 Aebleskiver (丹麥球) 🥞。', locationQuery: 'Solvang Restaurant' },
      { type: 'transport', time: '傍晚', title: '前往聖塔芭芭拉', desc: '開車約 45 分鐘南下回到聖塔芭芭拉。', locationQuery: 'Santa Barbara CA' },
      { type: 'accommodation', time: '晚間', title: '飯店 Check-in 🛌', desc: '入住聖塔芭芭拉周邊飯店休息。', locationQuery: 'Santa Barbara CA' }
    ]
  },
  {
    day: 10, date: '4/18 (六)', title: '絕美海岸聖塔芭芭拉', location: '聖塔芭芭拉', weather: '23°C ☀️',
    events: [
      { type: 'attraction', time: '上午', title: '聖塔芭芭拉慢活 🌴', desc: '漫步充滿西班牙風情的紅瓦白牆絕美城鎮。', locationQuery: 'Santa Barbara CA',
        guide: '被譽為「美國的蔚藍海岸」，風景如同畫作般優雅，氣候宜人。'
      },
      { type: 'attraction', time: '下午', title: 'Stearns Wharf 斯特恩碼頭', desc: '走上加州最古老的木造碼頭吹海風、看海鷗 🌊。', locationQuery: 'Stearns Wharf' },
      { type: 'attraction', time: '下午', title: 'Old Mission 古老修道院', desc: '參觀被稱為「修道院女王」的歷史建築。', locationQuery: 'Old Mission Santa Barbara' },
      { type: 'restaurant', time: '晚餐', title: '碼頭海鮮餐廳', desc: '在海邊找間餐廳享用新鮮的加州海鮮 🦞。', locationQuery: 'Santa Barbara Shellfish Company' }
    ]
  },
  {
    day: 11, date: '4/19 (日)', title: '加州海灘與洛杉磯地標', location: '洛杉磯', weather: '24°C ☀️',
    events: [
      { type: 'transport', time: '上午', title: '告別海岸前往LA 🚗', desc: '吃完早餐後，驅車前往聖塔莫尼卡。', locationQuery: 'Santa Monica Pier' },
      { type: 'attraction', time: '上午', title: '聖塔莫尼卡 Santa Monica 🎡', desc: '尋找66號公路終點牌，感受經典加州海灘活力。', locationQuery: 'Santa Monica Pier' },
      { type: 'restaurant', time: '午餐', title: '洛杉磯市區美食', desc: '前往好萊塢或比佛利山莊周邊享用午餐。', locationQuery: 'Beverly Hills' },
      { type: 'attraction', time: '下午', title: '好萊塢標誌與星光大道 ⭐', desc: '近距離拍攝 Hollywood 標誌，並去中國戲院看明星手印。', locationQuery: 'TCL Chinese Theatre' },
      { type: 'accommodation', time: '傍晚', title: '入住 Sheraton Universal 🏰', desc: '入住環球影城旁的喜來登，為明天的樂園做足準備！', locationQuery: 'Sheraton Universal Hotel',
        tags: [{ label: '💡 內行安排: 走路/免費接駁直達環球影城', type: 'guide' }]
      },
      { type: 'restaurant', time: '晚餐', title: 'CityWalk 晚餐', desc: '在環球影城外面的 CityWalk 輕鬆覓食。', locationQuery: 'Universal CityWalk Hollywood' }
    ]
  },
  {
    day: 12, date: '4/20 (一)', title: '環球影城魔法之旅', location: '洛杉磯', weather: '23°C ☀️',
    events: [
      { type: 'attraction', time: '全日', title: 'Universal Studios Hollywood', desc: '星期一人潮較少，輕鬆體驗真正的電影製片廠 🎬。', locationQuery: 'Universal Studios Hollywood',
        guide: '飯店就在旁邊，長輩早上不用塞車，玩累了隨時可以回飯店睡個午覺再繼續戰！'
      },
      { type: 'attraction', time: '必玩', title: '哈利波特與瑪利歐 🍄', desc: '暢遊兩大超人氣主題區！', locationQuery: 'Super Nintendo World Hollywood',
        tags: [{ label: '🪄 必買伴手禮: 魔杖、星星爆米花桶', type: 'buy' }]
      },
      { type: 'restaurant', time: '午餐', title: '影城之旅 (Studio Tour) 後午休', desc: '搭乘約45分鐘的遊園車後，找間餐廳吃午餐。', locationQuery: 'Universal Studios Hollywood' },
      { type: 'restaurant', time: '晚餐', title: 'Bubba Gump Shrimp Co.', desc: '阿甘正傳主題蝦餐廳 (CityWalk內) 🦐。', locationQuery: 'Bubba Gump Shrimp Co. CityWalk',
        tags: [{ label: '🦐 必點菜單: 綜合炸蝦拼盤', type: 'eat' }]
      }
    ]
  },
  {
    day: 13, date: '4/21 (二)', title: '完美賦歸與無縫還車', location: '洛杉磯', weather: '24°C ☀️',
    events: [
      { type: 'transport', time: '上午', title: '飯店退房', desc: '睡到自然醒，辦理退房準備最後的採買。', locationQuery: 'Sheraton Universal Hotel' },
      { type: 'attraction', time: '白天', title: 'Citadel Outlets 🛍️', desc: '前往洛杉磯經典 Outlet 進行最後的免稅血拼。', locationQuery: 'Citadel Outlets' },
      { type: 'restaurant', time: '晚餐', title: 'The Cheesecake Factory', desc: '傍晚開車到機場附近的 Marina del Rey 吃海鮮看夕陽 🌅。', locationQuery: 'The Cheesecake Factory Marina del Rey',
        tags: [{ label: '🍰 必點菜單: 招牌起司蛋糕', type: 'eat' }]
      },
      { type: 'transport', time: '19:00', title: '洛杉磯機場 (LAX) 還車', desc: '直接駛入租車中心交還車輛，完美結束自駕行程！🚙', locationQuery: 'LAX Airport' },
      { type: 'transport', time: '晚間', title: '星宇航空報到', desc: '抵達航廈櫃檯報到，逛逛機場準備返程 ✈️。', locationQuery: 'Tom Bradley International Terminal LAX' }
    ]
  },
  {
    day: 14, date: '4/22 (三)', title: '滿載幸福回台', location: '天空上', weather: '機艙空調 ❄️',
    events: [
      { type: 'transport', time: '00:35', title: '搭乘星宇航空 JX001起飛', desc: 'LAX -> TPE 🛫。', locationQuery: '' },
      { type: 'transport', time: '05:40 (+1)', title: '平安抵達台北 (4/23)', desc: '完美結束這趟精采的 14天美西家族旅行 💖。', locationQuery: '' }
    ]
  }
];

const InfoToolsData = {
  flights: [
    { type: '去程', date: '4/9 (四)', airline: '達美航空', route: 'TPE 09:35 -> SEA -> LAS 18:20', note: '西雅圖轉機 9h50m' },
    { type: '回程', date: '4/22 (三)', airline: '星宇航空 JX001', route: 'LAX 00:35 -> TPE 05:40(+1)', note: '4/21晚間抵達LAX報到' }
  ],
  hotels: [
    { date: '4/9 - 4/13 (4晚)', name: 'Horseshoe Las Vegas', location: '拉斯維加斯 (大道正中心)' },
    { date: '4/13 - 4/14 (1晚)', name: 'Best Western Plus', location: '金曼 Kingman (完美切分車程)' },
    { date: '4/14 - 4/17 (3晚)', name: 'Anaheim 迪士尼周邊飯店', location: 'Anaheim (迪士尼門口)' },
    { date: '4/17 - 4/19 (2晚)', name: 'Santa Barbara 周邊 (建議 Ventura)', location: '文圖拉 Ventura (平價絕美海鎮)' },
    { date: '4/19 - 4/21 (2晚)', name: 'Sheraton Universal Hotel', location: '洛杉磯 (環球影城旁)' }
  ],
  contacts: [
    { name: '駐洛杉磯台北經濟文化辦事處', phone: '+1-213-389-1215' },
    { name: '美國緊急求救電話', phone: '911' },
    { name: '天馬租車 (Sky Horse) 客服', phone: '請查看租約' }
  ]
};

// --- 組件區 (Components) ---

export default function App() {
  const [activeTab, setActiveTab] = useState('itinerary'); 
  const [selectedDay, setSelectedDay] = useState(1);

  // 可愛版底部導航
  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-pink-100 rounded-t-3xl flex justify-around items-center h-20 max-w-md mx-auto z-50 shadow-[0_-5px_20px_rgba(251,113,133,0.1)]">
      <button 
        onClick={() => setActiveTab('itinerary')}
        className={`flex flex-col items-center justify-center w-full h-full transition-all ${activeTab === 'itinerary' ? 'text-pink-500 scale-110' : 'text-gray-300 hover:text-pink-300'}`}
      >
        <MapIcon size={26} strokeWidth={activeTab === 'itinerary' ? 2.5 : 2} />
        <span className="text-[11px] mt-1.5 font-bold tracking-wider">行程卡片</span>
      </button>
      <button 
        onClick={() => setActiveTab('tools')}
        className={`flex flex-col items-center justify-center w-full h-full transition-all ${activeTab === 'tools' ? 'text-pink-500 scale-110' : 'text-gray-300 hover:text-pink-300'}`}
      >
        <Wallet size={26} strokeWidth={activeTab === 'tools' ? 2.5 : 2} />
        <span className="text-[11px] mt-1.5 font-bold tracking-wider">旅遊工具</span>
      </button>
    </div>
  );

  return (
    <div className="bg-[#FFF5F7] min-h-screen pb-24 font-sans text-gray-700 max-w-md mx-auto shadow-2xl relative overflow-x-hidden">
      
      {/* 頂部標題 - 可愛波浪/圓角風格 */}
      <div className="bg-gradient-to-r from-pink-400 to-rose-400 text-white p-5 rounded-b-[2rem] sticky top-0 z-40 shadow-[0_4px_15px_rgba(251,113,133,0.3)] flex items-center justify-center">
        <Sparkles size={20} className="mr-2 animate-pulse text-yellow-200" />
        <h1 className="text-xl font-extrabold text-center tracking-widest drop-shadow-sm">美西14天趴趴走</h1>
        <Plane size={20} className="ml-2 transform rotate-45 text-pink-100" />
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

// --- 視圖: 行程卡片 ---
function ItineraryView({ selectedDay, setSelectedDay }) {
  const currentDayData = itineraryData.find(d => d.day === selectedDay);

  const getIconConfig = (type) => {
    switch(type) {
      case 'transport': return { icon: <Car size={20} />, bg: 'bg-sky-100', text: 'text-sky-500', border: 'border-sky-300' };
      case 'restaurant': return { icon: <Utensils size={20} />, bg: 'bg-amber-100', text: 'text-amber-500', border: 'border-amber-300' };
      case 'accommodation': return { icon: <Bed size={20} />, bg: 'bg-purple-100', text: 'text-purple-500', border: 'border-purple-300' };
      default: return { icon: <Compass size={20} />, bg: 'bg-emerald-100', text: 'text-emerald-500', border: 'border-emerald-300' };
    }
  };

  return (
    <div className="animate-fade-in">
      {/* 橫向日期選擇器 - 膠囊形狀 */}
      <div className="py-4 px-3 overflow-x-auto flex space-x-3 scrollbar-hide sticky top-[68px] z-30 bg-gradient-to-b from-[#FFF5F7] to-transparent">
        {itineraryData.map(d => (
          <button
            key={d.day}
            onClick={() => setSelectedDay(d.day)}
            className={`flex flex-col items-center flex-shrink-0 px-5 py-2.5 rounded-full transition-all duration-300 border-2 ${
              selectedDay === d.day 
                ? 'bg-pink-500 text-white border-pink-500 shadow-[0_5px_15px_rgba(236,72,153,0.4)] transform scale-105' 
                : 'bg-white text-gray-500 border-pink-100 hover:bg-pink-50'
            }`}
          >
            <span className="text-[10px] font-bold tracking-wider opacity-90">Day {d.day}</span>
            <span className="text-sm font-extrabold mt-0.5">{d.date}</span>
          </button>
        ))}
      </div>

      <div className="px-4 pb-4">
        {/* 每日標頭 & 天氣 (圓潤卡片) */}
        <div className="bg-white rounded-[2rem] p-5 shadow-[0_8px_20px_rgba(251,113,133,0.08)] mb-6 border-2 border-pink-50 flex justify-between items-center relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-10 text-pink-500">
             <Heart size={80} fill="currentColor" />
          </div>
          <div className="relative z-10 w-2/3">
            <h2 className="text-lg font-black text-gray-800 leading-snug">{currentDayData.title}</h2>
            <div className="flex items-center text-gray-400 text-xs font-bold mt-2">
              <MapPin size={12} className="mr-1 text-pink-400" /> {currentDayData.location}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-amber-500 bg-amber-50 h-16 w-16 rounded-[1.2rem] border-2 border-amber-100 shadow-sm relative z-10 shrink-0">
            <CloudSun size={24} className="mb-1" />
            <span className="text-[10px] font-bold">{currentDayData.weather.split(' ')[0]}</span>
          </div>
        </div>

        {/* 時間軸卡片區 - 淺粉紅色的虛線軌道 */}
        <div className="space-y-5 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px before:h-full before:w-1 before:bg-pink-100 before:rounded-full">
          {currentDayData.events.map((evt, idx) => {
            const style = getIconConfig(evt.type);
            
            return (
              <div key={idx} className="relative flex items-start group">
                {/* 圓點圖示 */}
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-[3px] border-white shadow-md shrink-0 z-10 ${style.bg} ${style.text}`}>
                  {style.icon}
                </div>
                
                {/* 卡片內容 (Bubble Chat 風格) */}
                <div className={`w-full p-4 rounded-[1.5rem] rounded-tl-md bg-white shadow-[0_4px_15px_rgba(0,0,0,0.03)] border-2 ${style.border} ml-4 transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[11px] font-black text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{evt.time}</span>
                    {(evt.locationQuery || evt.mapLink) && (
                      <a 
                        href={evt.mapLink ? evt.mapLink : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(evt.locationQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 bg-pink-50 hover:bg-pink-100 p-2 rounded-full flex items-center transition-colors shadow-sm"
                        title="開啟導航"
                      >
                        <Navigation size={14} strokeWidth={3} />
                      </a>
                    )}
                  </div>
                  
                  <h3 className="text-[15px] font-extrabold text-gray-800 mb-1.5">{evt.title}</h3>
                  <p className="text-[13px] text-gray-500 font-medium leading-relaxed">{evt.desc}</p>
                  
                  {/* 中文菜單按鈕 */}
                  {evt.menuLink && (
                    <a 
                      href={evt.menuLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block mt-3 text-[12px] font-bold text-white bg-amber-400 hover:bg-amber-500 px-3 py-1.5 rounded-full shadow-sm transition-colors"
                    >
                      📄 查看中文菜單
                    </a>
                  )}

                  {/* 智能標籤區 */}
                  {evt.tags && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {evt.tags.map((tag, i) => {
                        let tagStyle = "bg-gray-100 text-gray-600";
                        if(tag.type === 'eat') tagStyle = "bg-orange-50 text-orange-600 border border-orange-200";
                        if(tag.type === 'buy') tagStyle = "bg-pink-50 text-pink-600 border border-pink-200";
                        if(tag.type === 'booking') tagStyle = "bg-red-50 text-red-600 border border-red-300 font-black";
                        
                        return (
                          <span key={i} className={`text-[10px] px-2.5 py-1 rounded-full font-bold shadow-sm ${tagStyle}`}>
                            {tag.label}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {/* 小知識補充框 */}
                  {evt.guide && (
                    <div className="mt-3.5 bg-sky-50/70 rounded-2xl p-3 border border-sky-100 flex items-start">
                      <div className="bg-sky-200 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Info size={12} className="text-sky-700" strokeWidth={3} />
                      </div>
                      <p className="text-[12px] text-sky-800 font-medium leading-relaxed">{evt.guide}</p>
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

// --- 視圖: 旅遊工具與記帳表 ---
function ToolsView() {
  const [expenses, setExpenses] = useState([
    { id: 1, name: '天馬租車費用 (基礎+異地還車)', amount: 1208.69, currency: 'USD' },
    { id: 2, name: '2026 America the Beautiful 國家公園年票', amount: 80.00, currency: 'USD' },
    { id: 3, name: '去程機票-達美航空4人 (NT$56,764)', amount: 1802.03, currency: 'USD' },
    { id: 4, name: 'The Buffet at Wynn (4人)', amount: 239.96, currency: 'USD' }
  ]);
  const [newItem, setNewItem] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const addExpense = () => {
    if(newItem && newAmount) {
      setExpenses([...expenses, { id: Date.now(), name: newItem, amount: parseFloat(newAmount), currency: 'USD' }]);
      setNewItem('');
      setNewAmount('');
    }
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const totalUSD = expenses.reduce((sum, item) => sum + item.amount, 0);
  const totalTWD = Math.round(totalUSD * 31.5); 

  return (
    <div className="p-5 space-y-6 animate-fade-in pb-10">
      
      {/* 航班資訊 */}
      <div className="bg-white rounded-[2rem] shadow-[0_8px_20px_rgba(56,189,248,0.08)] border-2 border-sky-50 overflow-hidden">
        <div className="bg-sky-100/50 p-4 border-b-2 border-sky-100 flex items-center text-sky-700 font-black">
          <Plane size={20} className="mr-2" /> ✈️ 航班小卡
        </div>
        <div className="p-5 space-y-5">
          {InfoToolsData.flights.map((f, i) => (
            <div key={i} className="flex flex-col relative">
              <span className="text-[11px] text-sky-400 font-black mb-1 bg-sky-50 w-fit px-2 py-0.5 rounded-full">{f.type} • {f.date}</span>
              <span className="text-[15px] font-black text-gray-800">{f.airline}</span>
              <span className="text-[13px] text-gray-500 font-medium mt-0.5">{f.route}</span>
              <span className="text-[11px] text-orange-500 font-bold mt-1.5 flex items-center">
                 <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-1.5"></span> {f.note}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 住宿資訊 */}
      <div className="bg-white rounded-[2rem] shadow-[0_8px_20px_rgba(168,85,247,0.08)] border-2 border-purple-50 overflow-hidden">
        <div className="bg-purple-100/50 p-4 border-b-2 border-purple-100 flex items-center text-purple-700 font-black">
          <Bed size={20} className="mr-2" /> 🛌 我們的秘密基地
        </div>
        <div className="p-5 space-y-4">
          {InfoToolsData.hotels.map((h, i) => (
            <div key={i} className="flex flex-col bg-purple-50/50 p-3 rounded-2xl border border-purple-100">
              <span className="text-purple-600 text-[11px] font-black mb-1">{h.date}</span>
              <span className="text-[14px] font-black text-gray-800">{h.name}</span>
              <span className="text-[12px] text-gray-500 font-medium mt-0.5 flex items-center">
                <MapPin size={10} className="mr-1" />{h.location}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 緊急聯絡 */}
      <div className="bg-white rounded-[2rem] shadow-[0_8px_20px_rgba(239,68,68,0.08)] border-2 border-red-50 overflow-hidden">
        <div className="bg-red-50 p-4 border-b-2 border-red-100 flex items-center text-red-600 font-black">
          <Phone size={20} className="mr-2" /> 🆘 緊急小幫手
        </div>
        <div className="p-5 space-y-3">
          {InfoToolsData.contacts.map((c, i) => (
            <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl">
              <span className="text-[13px] font-bold text-gray-600">{c.name}</span>
              <a href={`tel:${c.phone}`} className="text-red-500 font-black text-[13px] bg-red-100 px-3 py-1.5 rounded-full shadow-sm">
                {c.phone}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 預算記帳表 */}
      <div className="bg-white rounded-[2rem] shadow-[0_8px_20px_rgba(20,184,166,0.08)] border-2 border-teal-50 overflow-hidden">
        <div className="bg-teal-50 p-4 border-b-2 border-teal-100 flex items-center text-teal-700 font-black">
          <Wallet size={20} className="mr-2" /> 💸 旅費小豬公
        </div>
        <div className="p-5">
          <div className="bg-gradient-to-br from-teal-400 to-emerald-500 text-white p-5 rounded-[1.5rem] mb-5 text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-20"><Wallet size={60} /></div>
            <p className="text-[11px] font-bold text-teal-100 mb-1 relative z-10">目前總支出 (估算匯率 1:31.5)</p>
            <div className="text-3xl font-black tracking-wider relative z-10">${totalUSD.toFixed(2)} USD</div>
            <div className="text-[13px] font-bold text-emerald-100 mt-1 relative z-10">≈ ${totalTWD.toLocaleString()} TWD</div>
          </div>

          <div className="flex space-x-2 mb-5">
            <input 
              type="text" 
              placeholder="品項 (例: In-N-Out)" 
              className="flex-1 bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-2 text-[13px] font-bold focus:outline-none focus:border-teal-300 focus:bg-white transition-colors"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <input 
              type="number" 
              placeholder="USD$" 
              className="w-24 bg-gray-50 border-2 border-gray-100 rounded-2xl px-3 py-2 text-[13px] font-bold focus:outline-none focus:border-teal-300 focus:bg-white transition-colors"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
            />
            <button 
              onClick={addExpense}
              className="bg-teal-400 text-white w-11 flex justify-center items-center rounded-2xl shadow-md hover:bg-teal-500 transition-colors shrink-0"
            >
              <Plus size={20} strokeWidth={3} />
            </button>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-hide">
            {expenses.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100 group">
                <span className="text-[13px] font-bold text-gray-600 flex-1 pr-3 leading-tight">{item.name}</span>
                <div className="flex items-center shrink-0">
                  <span className="text-[14px] font-black text-teal-600 mr-3">${item.amount.toFixed(2)}</span>
                  <button onClick={() => removeExpense(item.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
            {expenses.length === 0 && (
              <div className="text-center py-6">
                <span className="text-4xl inline-block mb-2 opacity-50">🐷</span>
                <p className="text-gray-400 text-[13px] font-bold">還沒有花半毛錢喔！</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}