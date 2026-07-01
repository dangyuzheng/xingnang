import type { CityGuide } from "./types";

export const moreCities: CityGuide[] = [
  {
    id: "suzhou", name: "苏州", province: "江苏", tagline: "姑苏城外寒山寺，夜半钟声到客船", gradient: "from-teal-300 via-emerald-200 to-pink-100",
    isNiche: false, destTypes: ["ancient_city"], durationRange: "4-7d", budgetRange: "comfort", seasons: ["spring", "autumn"],
    bestTime: "3-5月 / 9-11月", duration: "3-4天", budget: "人均1500-2500元", transportHub: "苏南硕放机场/苏州站",
    coreTip: "拙政园7:30开门第一批进去体验好10倍",
    funSpots: [
      { name: "拙政园", tagline: "四大名园之首", ticket: "70元(旺季80)", duration: "2-3小时", bestTime: "7:30第一批入", tips: "早去！7:30入园是最佳策略", priority: "must" },
      { name: "平江路", tagline: "枕河老街", ticket: "免费", duration: "2-3小时", bestTime: "下午+傍晚", tips: "评弹声声入耳，猫的天空之城书店", priority: "must" },
      { name: "苏州博物馆", tagline: "贝聿铭封山之作", ticket: "免费(需预约)", duration: "2-3小时", bestTime: "上午", tips: "建筑本身就是展品，周一闭馆", priority: "must" },
      { name: "虎丘", tagline: "吴中第一名胜", ticket: "60元", duration: "2小时", bestTime: "上午", tips: "斜塔比萨还早400年", priority: "niche" },
      { name: "金鸡湖", tagline: "现代苏州地标", ticket: "免费", duration: "1-2小时", bestTime: "晚上看喷泉", tips: "夜景喷泉很震撼", priority: "nearby" },
    ],
    food: [
      { name: "松鼠桂鱼", pricePerPerson: "60-80元", howToEat: "外酥里嫩酸甜口，苏帮菜头牌", pitfall: "楼外楼最出名但本地人更爱外婆家" },
      { name: "苏式汤面", pricePerPerson: "15-30元", howToEat: "浇头是灵魂，焖肉+爆鱼双浇", pitfall: "同得兴、裕兴记最正宗" },
      { name: "生煎包", pricePerPerson: "10-15元", howToEat: "哑巴生煎，底部焦脆汁水足", pitfall: "排队30分钟起" },
      { name: "鸡头米", pricePerPerson: "15-25元", howToEat: "8-10月限定甜品，桂花糖水煮", pitfall: "过了10月就吃不到了" },
    ],
    foodAreas: [
      { name: "平江路", location: "姑苏区平江路", bestTime: "下午茶/晚餐", direction: "沿河小馆+咖啡馆" },
      { name: "十全街", location: "姑苏区十全街", bestTime: "午餐/下午茶", direction: "新晋网红街，咖啡馆和买手店扎堆" },
    ],
    shopping: [
      { name: "平江路", category: "old_street", duration: "2-3小时", highlight: "手工艺品+丝绸+苏绣小物", forWho: "购物/文艺" },
      { name: "十全街", category: "old_street", duration: "2小时", highlight: "买手店+咖啡馆", forWho: "文艺/购物" },
    ],
    pitfalls: [
      { category: "scenic", content: "拙政园旺季排队1小时+，7:30开门第一批进去体验好10倍" },
      { category: "food", content: "观前街已沦为普通商业街，别当重点" },
      { category: "general", content: "丝绸店导购热情过头，水太深别冲动" },
      { category: "scenic", content: "苏州博物馆周一闭馆，务必提前预约" },
    ],
    itinerary: {
      easy: [
        { label: "Day1", morning: ["拙政园(7:30入园)"], afternoon: ["苏州博物馆→平江路"], evening: ["平江路晚餐+评弹"], walkLevel: "约1.2万步", transport: "步行", nearbyFood: "平江路" },
        { label: "Day2", morning: ["虎丘"], afternoon: ["山塘街→留园"], evening: ["十全街"], walkLevel: "约1万步", transport: "地铁+步行", nearbyFood: "十全街" },
        { label: "Day3", morning: ["金鸡湖"], afternoon: ["斜塘老街"], evening: ["金鸡湖夜景"], walkLevel: "约8千步", transport: "地铁", nearbyFood: "斜塘老街" },
      ],
      intense: [
        { label: "Day1", morning: ["拙政园(7:30)→狮子林"], afternoon: ["苏博→平江路→相门城墙"], evening: ["平江路评弹+晚餐"], walkLevel: "约2万步", transport: "步行", nearbyFood: "平江路" },
        { label: "Day2", morning: ["虎丘→留园"], afternoon: ["山塘街→寒山寺→西园寺"], evening: ["十全街+观前街"], walkLevel: "约2万步", transport: "地铁+步行", nearbyFood: "十全街" },
      ],
    },
    packingList: [
      { name: "舒适步行鞋", category: "clothing", required: true },
      { name: "防晒霜", category: "gear", required: true },
      { name: "身份证", category: "docs", required: true },
      { name: "充电宝", category: "electronics", required: true },
    ],
    nearbyFrom: ["上海"], nearbyDistance: "高铁30分钟",
  },
  {
    id: "dali", name: "大理", province: "云南", tagline: "风花雪月，苍山洱海", gradient: "from-indigo-300 via-blue-200 to-green-200",
    isNiche: false, destTypes: ["ancient_city", "nature", "ethnic"], durationRange: "4-7d", budgetRange: "comfort", seasons: ["spring", "autumn"],
    bestTime: "3-5月 / 9-11月", duration: "4-5天", budget: "人均1500-3000元", transportHub: "大理机场/大理站",
    coreTip: "环洱海别骑电动车全程，风大日晒太累，自驾更好",
    funSpots: [
      { name: "洱海环湖", tagline: "风花雪月的具象", ticket: "免费", duration: "1天", bestTime: "上午才村→下午双廊", tips: "自驾或骑行，才村-喜洲-双廊段风景最美", priority: "must" },
      { name: "苍山索道", tagline: "俯瞰洱海全景", ticket: "洗马潭索道280元", duration: "半天", bestTime: "7月看杜鹃花海", tips: "感通索道便宜但只到半山", priority: "must" },
      { name: "喜洲古镇", tagline: "白族民居博物馆", ticket: "免费", duration: "3小时", bestTime: "上午", tips: "喜洲粑粑必吃，比古城安静", priority: "must" },
      { name: "寂照庵", tagline: "中国最美尼姑庵", ticket: "免费", duration: "1小时", bestTime: "上午", tips: "多肉植物花园，不像寺庙像花园", priority: "niche" },
    ],
    food: [
      { name: "喜洲粑粑", pricePerPerson: "5-10元", howToEat: "甜咸两种，现烤最好吃", pitfall: "别买预包装的，现烤的才是灵魂" },
      { name: "乳扇", pricePerPerson: "5-10元", howToEat: "烤着吃蘸玫瑰糖，很云南", pitfall: "奶味重，不爱奶的慎点" },
      { name: "饵丝", pricePerPerson: "10-15元", howToEat: "比米线更有嚼劲，大理人早餐标配", pitfall: "跟米线口感不同，别混为一谈" },
      { name: "酸辣鱼", pricePerPerson: "30-50元", howToEat: "木瓜酸+洱海鱼，酸爽开胃", pitfall: "真正的洱海鱼越来越少，别太执着" },
    ],
    foodAreas: [
      { name: "大理古城人民路", location: "大理古城内", bestTime: "午餐/晚餐", direction: "文艺小店+小馆子，比复兴路好" },
      { name: "喜洲四方街", location: "喜洲古镇", bestTime: "午餐", direction: "粑粑+白族菜，就地取材" },
    ],
    shopping: [
      { name: "大理古城人民路", category: "old_street", duration: "2小时", highlight: "文艺小店多，格调在线", forWho: "文艺/购物" },
      { name: "周城扎染", category: "old_street", duration: "2小时", highlight: "白族扎染之乡，亲手体验制作", forWho: "体验/手作" },
    ],
    pitfalls: [
      { category: "traffic", content: "双廊修路多年，出行前查路况" },
      { category: "traffic", content: "环洱海别骑电动车全程，风大日晒太累，自驾更好" },
      { category: "general", content: "古城客栈参差不齐，看评价再订" },
      { category: "traffic", content: "出租车不打表是常态，上车先谈价" },
    ],
    itinerary: {
      easy: [
        { label: "Day1", morning: ["大理古城漫步"], afternoon: ["人民路+复兴路"], evening: ["古城夜景"], walkLevel: "约8千步", transport: "步行", nearbyFood: "人民路" },
        { label: "Day2", morning: ["洱海环湖(才村→喜洲)"], afternoon: ["喜洲古镇"], evening: ["双廊看日落"], walkLevel: "约6千步", transport: "自驾/包车", nearbyFood: "喜洲粑粑" },
        { label: "Day3", morning: ["苍山索道"], afternoon: ["寂照庵"], evening: ["古城晚餐"], walkLevel: "约8千步", transport: "索道+步行", nearbyFood: "古城内" },
      ],
      intense: [],
    },
    packingList: [
      { name: "防晒霜SPF50+", category: "gear", required: true },
      { name: "帽子墨镜", category: "gear", required: true },
      { name: "薄外套(昼夜温差)", category: "clothing", required: true },
      { name: "身份证", category: "docs", required: true },
      { name: "充电宝", category: "electronics", required: true },
    ],
  },
  {
    id: "changsha", name: "长沙", province: "湖南", tagline: "星城不夜，辣味人间", gradient: "from-orange-400 via-amber-300 to-yellow-200",
    isNiche: false, destTypes: ["food_city"], durationRange: "4-7d", budgetRange: "comfort", seasons: ["spring", "autumn"],
    bestTime: "3-5月 / 9-11月", duration: "3-4天", budget: "人均1000-2000元", transportHub: "黄花机场/长沙南站",
    coreTip: "茶颜悦色无处不在，别在一家排队，下个路口还有",
    funSpots: [
      { name: "橘子洲头", tagline: "毛泽东青年雕塑", ticket: "免费(观光车40元)", duration: "2-3小时", bestTime: "日落时分", tips: "工作日去更舒服，周末人巨多", priority: "must" },
      { name: "岳麓山", tagline: "千年学府+红叶", ticket: "免费", duration: "3-4小时", bestTime: "11月看红叶", tips: "南门进东门出，索道/滑道下山", priority: "must" },
      { name: "湖南省博物馆", tagline: "辛追夫人", ticket: "免费(需预约)", duration: "2-3小时", bestTime: "上午", tips: "提前预约，周一闭馆", priority: "must" },
      { name: "IFS国金中心", tagline: "KAWS雕塑", ticket: "免费", duration: "30分钟", bestTime: "白天光线好", tips: "顶楼拍照打卡长沙最火", priority: "niche" },
    ],
    food: [
      { name: "臭豆腐", pricePerPerson: "10-15元", howToEat: "黑色经典、罗家，闻着臭吃着香", pitfall: "别买白的，黑豆腐才正宗" },
      { name: "茶颜悦色", pricePerPerson: "15-20元", howToEat: "幽兰拿铁是招牌，奶油顶+碧根果", pitfall: "排队时看旁边的店，可能不用排" },
      { name: "口味虾", pricePerPerson: "80-120元", howToEat: "夏天宵夜之王，配啤酒绝了", pitfall: "别在景区吃，去四方坪夜市" },
      { name: "糖油粑粑", pricePerPerson: "3-5元", howToEat: "金黄酥甜，3元一串的快乐", pitfall: "趁热吃，凉了会变硬" },
    ],
    foodAreas: [
      { name: "太平老街", location: "天心区太平街", bestTime: "下午/晚餐", direction: "小吃+老字号+文艺店" },
      { name: "四方坪夜市", location: "开福区四方坪", bestTime: "夜宵", direction: "本地人夜市，口味虾+烧烤" },
      { name: "坡子街", location: "天心区坡子街", bestTime: "午餐/晚餐", direction: "火宫殿打卡，但不是最好吃的" },
    ],
    shopping: [
      { name: "黄兴步行街", category: "mall", duration: "2-3小时", highlight: "长沙第一商圈", forWho: "购物/吃货" },
      { name: "太平老街", category: "old_street", duration: "1-2小时", highlight: "文艺+小吃+古建", forWho: "散步/吃货" },
    ],
    pitfalls: [
      { category: "scenic", content: "橘子洲周末人巨多，工作日去更舒服" },
      { category: "food", content: "坡子街火宫殿是打卡点但不是最好吃的" },
      { category: "food", content: "文和友排队2小时起，味道没多特别" },
      { category: "general", content: "夏天是真热，35度+是常态" },
    ],
    itinerary: {
      easy: [
        { label: "Day1", morning: ["橘子洲头"], afternoon: ["太平老街"], evening: ["坡子街+黄兴路"], walkLevel: "约1.2万步", transport: "地铁+步行", nearbyFood: "太平老街" },
        { label: "Day2", morning: ["岳麓山"], afternoon: ["湖南大学+湖南博物院"], evening: ["四方坪夜市"], walkLevel: "约1.5万步", transport: "地铁+步行", nearbyFood: "四方坪" },
        { label: "Day3", morning: ["IFS KAWS"], afternoon: ["南门口+都正街"], evening: ["茶颜悦色 farewell"], walkLevel: "约8千步", transport: "步行", nearbyFood: "南门口" },
      ],
      intense: [],
    },
    packingList: [
      { name: "舒适步行鞋", category: "clothing", required: true },
      { name: "防晒霜", category: "gear", required: true },
      { name: "肠胃药", category: "medicine", required: true },
      { name: "身份证", category: "docs", required: true },
      { name: "充电宝", category: "electronics", required: true },
    ],
  },
  {
    id: "dunhuang", name: "敦煌", province: "甘肃", tagline: "大漠孤烟，千年丝路", gradient: "from-amber-400 via-orange-200 to-red-200",
    isNiche: false, destTypes: ["ancient_city", "nature", "hiking"], durationRange: "4-7d", budgetRange: "luxury", seasons: ["summer"],
    bestTime: "5-10月", duration: "3-4天", budget: "人均2500-4000元", transportHub: "敦煌机场/敦煌站",
    coreTip: "莫高窟门票必须提前1个月预约，A类票每天只有6000张",
    funSpots: [
      { name: "莫高窟", tagline: "千年壁画艺术宝库", ticket: "A类票238元(需预约)", duration: "3-4小时", bestTime: "按预约时间", tips: "数字中心先看影片再入窟，必须请讲解", priority: "must" },
      { name: "鸣沙山月牙泉", tagline: "沙泉共存奇迹", ticket: "110元(3日有效)", duration: "3-4小时", bestTime: "下午5点后入场看日落", tips: "骑骆驼+滑沙+看日落一条龙", priority: "must" },
      { name: "雅丹魔鬼城", tagline: "风蚀地貌奇观", ticket: "50元+观光车70元", duration: "2-3小时", bestTime: "日落时分", tips: "日落时金色光芒照在雅丹体上最震撼", priority: "must" },
    ],
    food: [
      { name: "驴肉黄面", pricePerPerson: "25-40元", howToEat: "敦煌第一名吃，驴肉+手工黄面", pitfall: "顺张黄面馆最正宗" },
      { name: "杏皮水", pricePerPerson: "5-8元", howToEat: "酸甜解暑沙漠必备", pitfall: "李广杏熬制，别买浓缩冲泡的" },
      { name: "羊肉粉汤", pricePerPerson: "15-25元", howToEat: "西北早餐标配，汤浓肉烂", pitfall: "早上才有，下午基本卖完" },
    ],
    foodAreas: [
      { name: "沙洲夜市", location: "阳关东路沙洲夜市", bestTime: "晚餐/夜宵", direction: "敦煌夜生活唯一据点，吃喝逛全有" },
    ],
    shopping: [
      { name: "沙洲夜市", category: "night_market", duration: "1-2小时", highlight: "夜光杯、驼绒制品、干果", forWho: "淘货/吃货" },
    ],
    pitfalls: [
      { category: "scenic", content: "莫高窟必须提前1个月预约，A类票每天只有6000张" },
      { category: "general", content: "沙漠温差大，中午40度晚上15度，带厚外套" },
      { category: "scenic", content: "鸣沙山别正午去，下午5点后凉爽又好看" },
      { category: "general", content: "防晒SPF50+不够，还需物理防晒+多喝水" },
    ],
    itinerary: {
      easy: [
        { label: "Day1", morning: ["莫高窟(全天)"], afternoon: ["莫高窟数字中心+洞窟"], evening: ["沙洲夜市"], walkLevel: "约8千步", transport: "景区大巴+步行", nearbyFood: "沙洲夜市" },
        { label: "Day2", morning: ["休息(避开正午)"], afternoon: ["鸣沙山月牙泉(5点入场)"], evening: ["沙漠日落+骑骆驼"], walkLevel: "约6千步", transport: "打车", nearbyFood: "沙洲夜市" },
        { label: "Day3", morning: ["阳关/玉门关"], afternoon: ["雅丹魔鬼城(看日落)"], evening: ["返回市区"], walkLevel: "约5千步", transport: "包车", nearbyFood: "市区餐馆" },
      ],
      intense: [],
    },
    packingList: [
      { name: "厚外套", category: "clothing", required: true },
      { name: "防晒霜SPF50+", category: "gear", required: true },
      { name: "墨镜+魔术头巾", category: "gear", required: true },
      { name: "身份证", category: "docs", required: true },
      { name: "充电宝", category: "electronics", required: true },
      { name: "大水量水杯", category: "gear", required: true },
    ],
  },
  {
    id: "beijing", name: "北京", province: "北京", tagline: "一座北京城，半部中国史", gradient: "from-red-400 via-amber-200 to-yellow-100",
    isNiche: false, destTypes: ["ancient_city", "food_city"], durationRange: "4-7d", budgetRange: "luxury", seasons: ["spring", "autumn"],
    bestTime: "4-5月 / 9-10月", duration: "5-7天", budget: "人均2500-4000元", transportHub: "首都机场/大兴机场/北京南站",
    coreTip: "故宫门票必须提前网上预约，当天几乎买不到",
    funSpots: [
      { name: "故宫", tagline: "世界最大宫殿建筑群", ticket: "60元(旺季)", duration: "4小时+", bestTime: "8:30第一批进", tips: "从午门到神武门至少留4小时，周一闭馆", priority: "must" },
      { name: "慕田峪长城", tagline: "比八达岭清净10倍", ticket: "40元+缆车120元", duration: "3-4小时", bestTime: "上午8点前到", tips: "缆车上下轻松游，滑道下山很刺激", priority: "must" },
      { name: "颐和园", tagline: "皇家园林", ticket: "30元(联票60元)", duration: "3-4小时", bestTime: "上午", tips: "昆明湖坐船看十七孔桥", priority: "must" },
      { name: "798艺术区", tagline: "工厂里的当代艺术", ticket: "免费", duration: "2-3小时", bestTime: "下午", tips: "免费看展拍照，周末更热闹", priority: "niche" },
    ],
    food: [
      { name: "北京烤鸭", pricePerPerson: "80-150元", howToEat: "四季民福、大董，别只认全聚德", pitfall: "四季民福故宫店可看角楼，排队2小时+" },
      { name: "炸酱面", pricePerPerson: "15-25元", howToEat: "黄瓜丝萝卜丝码满碗，拌开吃", pitfall: "海碗居、方砖厂最正宗" },
      { name: "涮羊肉", pricePerPerson: "80-120元", howToEat: "铜锅清汤+手切鲜羊肉", pitfall: "冬天吃才是正经涮肉季" },
      { name: "豆汁焦圈", pricePerPerson: "5-10元", howToEat: "北京味觉试金石，爱恨分明", pitfall: "90%外地人喝不惯，别多点" },
    ],
    foodAreas: [
      { name: "簋街", location: "东城区东直门内大街", bestTime: "晚餐/夜宵", direction: "24小时美食街，小龙虾+烤鱼" },
      { name: "南锣鼓巷(外围)", location: "东城区南锣鼓巷", bestTime: "下午", direction: "主街过气，胡同里藏着好馆子" },
    ],
    shopping: [
      { name: "五道营胡同", category: "old_street", duration: "1-2小时", highlight: "精品小店+咖啡馆", forWho: "文艺/散步" },
      { name: "潘家园", category: "night_market", duration: "2-3小时", highlight: "周末旧货市场，淘宝天堂", forWho: "淘货/体验" },
      { name: "三里屯太古里", category: "mall", duration: "2-3小时", highlight: "潮流风向标", forWho: "购物/打卡" },
    ],
    pitfalls: [
      { category: "scenic", content: "故宫门票必须提前网上预约，当天几乎买不到" },
      { category: "scenic", content: "长城别去八达岭挤，慕田峪人少景美" },
      { category: "traffic", content: "一日游团99%是坑，自由行更靠谱" },
      { category: "scenic", content: "故宫周一闭馆，提前规划行程" },
    ],
    itinerary: {
      easy: [
        { label: "Day1", morning: ["故宫(8:30首批入)"], afternoon: ["景山公园俯瞰故宫"], evening: ["王府井步行街"], walkLevel: "约1.5万步", transport: "地铁+步行", nearbyFood: "王府井小吃" },
        { label: "Day2", morning: ["慕田峪长城"], afternoon: ["返回市区"], evening: ["簋街晚餐"], walkLevel: "约1万步", transport: "包车/大巴", nearbyFood: "簋街" },
        { label: "Day3", morning: ["颐和园"], afternoon: ["圆明园(可选)"], evening: ["五道营胡同"], walkLevel: "约1.5万步", transport: "地铁+步行", nearbyFood: "五道营" },
      ],
      intense: [
        { label: "Day1", morning: ["天安门广场→故宫(8:30)"], afternoon: ["景山→北海→什刹海"], evening: ["南锣鼓巷→簋街"], walkLevel: "约2.5万步", transport: "步行", nearbyFood: "簋街" },
        { label: "Day2", morning: ["慕田峪长城(全天)"], afternoon: ["长城→798艺术区"], evening: ["三里屯"], walkLevel: "约2万步", transport: "包车+地铁", nearbyFood: "三里屯" },
        { label: "Day3", morning: ["颐和园(3小时)"], afternoon: ["圆明园→清华北大外围"], evening: ["五道口/五道营"], walkLevel: "约2万步", transport: "地铁+步行", nearbyFood: "五道口" },
        { label: "Day4", morning: ["天坛公园"], afternoon: ["798/潘家园(周末)"], evening: ["前门大街→烤鸭 farewell"], walkLevel: "约1.5万步", transport: "地铁", nearbyFood: "前门" },
      ],
    },
    packingList: [
      { name: "舒适步行鞋", category: "clothing", required: true },
      { name: "防晒霜", category: "gear", required: true },
      { name: "身份证", category: "docs", required: true },
      { name: "充电宝", category: "electronics", required: true },
      { name: "薄外套", category: "clothing", required: true },
    ],
    nearbyFrom: ["天津"], nearbyDistance: "高铁30分钟",
  },
  {
    id: "guilin", name: "桂林", province: "广西", tagline: "桂林山水甲天下", gradient: "from-green-300 via-emerald-200 to-sky-200",
    isNiche: false, destTypes: ["nature", "ancient_city"], durationRange: "4-7d", budgetRange: "comfort", seasons: ["spring", "summer", "autumn"],
    bestTime: "4-10月", duration: "4-5天", budget: "人均1500-2500元", transportHub: "两江机场/桂林站",
    coreTip: "漓江竹筏选杨堤-兴坪段，是20元人民币取景地",
    funSpots: [
      { name: "漓江竹筏(杨堤-兴坪)", tagline: "20元人民币取景地", ticket: "216元/筏", duration: "2小时", bestTime: "上午光线好", tips: "这是漓江最精华段，必须体验", priority: "must" },
      { name: "阳朔十里画廊", tagline: "田园风光如画", ticket: "免费", duration: "半天", bestTime: "上午骑行", tips: "租电动车骑行，大榕树+月亮山", priority: "must" },
      { name: "龙脊梯田", tagline: "壮美梯田奇观", ticket: "80元", duration: "1天", bestTime: "4-10月(有水/金秋)", tips: "金坑大寨比平安寨更壮观，住一晚看日出", priority: "must" },
      { name: "遇龙河漂流", tagline: "比漓江更安静", ticket: "160元/筏", duration: "1.5小时", bestTime: "上午", tips: "人工撑筏，比漓江安静10倍", priority: "niche" },
    ],
    food: [
      { name: "桂林米粉", pricePerPerson: "8-15元", howToEat: "干捞+骨汤，先拌后加汤", pitfall: "老东江、明桂最出名，别在景区吃" },
      { name: "啤酒鱼", pricePerPerson: "50-80元", howToEat: "漓江鱼配啤酒焖制，阳朔必吃", pitfall: "真正的漓江鱼越来越少，剑骨鱼也算" },
      { name: "荔浦芋扣肉", pricePerPerson: "30-50元", howToEat: "芋头吸满肉汁，入口即化", pitfall: "量大，2-3人点一份" },
    ],
    foodAreas: [
      { name: "阳朔西街", location: "阳朔县西街", bestTime: "晚餐/夜宵", direction: "热闹但溢价，当体验就好" },
      { name: "东西巷", location: "桂林市区", bestTime: "午餐/晚餐", direction: "比西街干净精致" },
    ],
    shopping: [
      { name: "阳朔西街", category: "old_street", duration: "1-2小时", highlight: "热闹是热闹，砍价5折起", forWho: "体验" },
      { name: "东西巷", category: "mall", duration: "1-2小时", highlight: "新古风街区，比西街干净", forWho: "散步/购物" },
    ],
    pitfalls: [
      { category: "scenic", content: "漓江船票别买最便宜的，风景差异很大" },
      { category: "general", content: "阳朔西街已纯商业化，住可以但别当重点" },
      { category: "scenic", content: "龙脊梯田冬天没水是枯景，4-10月去" },
      { category: "general", content: "路边拉客的一日游别信，正规渠道报团" },
    ],
    itinerary: {
      easy: [
        { label: "Day1", morning: ["漓江竹筏(杨堤-兴坪)"], afternoon: ["兴坪古镇"], evening: ["阳朔西街"], walkLevel: "约8千步", transport: "竹筏+大巴", nearbyFood: "阳朔" },
        { label: "Day2", morning: ["十里画廊骑行"], afternoon: ["遇龙河漂流"], evening: ["印象刘三姐(可选)"], walkLevel: "约6千步", transport: "电动车+竹筏", nearbyFood: "阳朔" },
        { label: "Day3", morning: ["龙脊梯田(全天)"], afternoon: ["金坑大寨"], evening: ["住梯田看星空"], walkLevel: "约1万步", transport: "包车+步行", nearbyFood: "农家乐" },
      ],
      intense: [],
    },
    packingList: [
      { name: "防晒霜", category: "gear", required: true },
      { name: "防蚊水", category: "gear", required: true },
      { name: "舒适步行鞋", category: "clothing", required: true },
      { name: "身份证", category: "docs", required: true },
      { name: "充电宝", category: "electronics", required: true },
    ],
  },
  {
    id: "harbin", name: "哈尔滨", province: "黑龙江", tagline: "冰城夏都，东方莫斯科", gradient: "from-blue-400 via-indigo-200 to-slate-200",
    isNiche: false, destTypes: ["ancient_city"], durationRange: "4-7d", budgetRange: "comfort", seasons: ["winter"],
    bestTime: "12-2月(冰雪)/6-8月(避暑)", duration: "4-5天", budget: "人均1500-3000元", transportHub: "太平机场/哈尔滨站",
    coreTip: "室外手机会冻关机，贴暖宝宝在手机背面",
    funSpots: [
      { name: "冰雪大世界", tagline: "冰灯童话世界", ticket: "300元(12月-2月)", duration: "3-4小时", bestTime: "下午3点入场看日落+亮灯", tips: "门票虽贵但绝对值，别省这个钱", priority: "must" },
      { name: "中央大街", tagline: "百年欧式建筑街", ticket: "免费", duration: "2-3小时", bestTime: "晚上灯火最美", tips: "马迭尔冰棍零下20度也要吃", priority: "must" },
      { name: "圣索菲亚教堂", tagline: "拜占庭风格东正教堂", ticket: "20元(内部)", duration: "30分钟-1小时", bestTime: "傍晚灯光", tips: "外部免费拍照，内部可不去", priority: "must" },
      { name: "老道外", tagline: "中华巴洛克建筑群", ticket: "免费", duration: "2小时", bestTime: "下午", tips: "最地道的哈尔滨味，好吃又好逛", priority: "niche" },
    ],
    food: [
      { name: "锅包肉", pricePerPerson: "30-50元", howToEat: "哈尔滨原创菜，酸甜酥脆", pitfall: "老厨家最正宗，别点番茄酱版" },
      { name: "马迭尔冰棍", pricePerPerson: "5元", howToEat: "零下20度站在中央大街吃", pitfall: "冬天吃更有仪式感" },
      { name: "红肠+大列巴", pricePerPerson: "20-40元", howToEat: "秋林公司买最正宗，俄式风味", pitfall: "红肠认准秋林里道斯" },
    ],
    foodAreas: [
      { name: "中央大街", location: "道里区中央大街", bestTime: "下午/晚餐", direction: "俄餐+东北菜+马迭尔" },
      { name: "老道外", location: "道外区靖宇街", bestTime: "午餐/晚餐", direction: "老字号扎堆，最地道的哈尔滨味" },
    ],
    shopping: [
      { name: "中央大街", category: "old_street", duration: "2-3小时", highlight: "俄式伴手礼、红肠、巧克力", forWho: "购物/拍照" },
      { name: "秋林公司", category: "mall", duration: "1小时", highlight: "百年俄式商场", forWho: "购物" },
    ],
    pitfalls: [
      { category: "general", content: "穿羽绒服+雪地靴，零下30度不是开玩笑" },
      { category: "general", content: "室外手机会冻关机，贴暖宝宝在手机背面" },
      { category: "general", content: "别舔铁栏杆，真的会粘住" },
      { category: "traffic", content: "打车冬天很难，地铁+公交更靠谱" },
    ],
    itinerary: {
      easy: [
        { label: "Day1", morning: ["中央大街+圣索菲亚"], afternoon: ["防洪纪念塔+松花江"], evening: ["马迭尔冰棍+俄餐"], walkLevel: "约1万步", transport: "步行", nearbyFood: "中央大街" },
        { label: "Day2", morning: ["冰雪大世界(3点入场)"], afternoon: ["看日落+亮灯"], evening: ["回程晚餐"], walkLevel: "约8千步", transport: "地铁+步行", nearbyFood: "市区" },
        { label: "Day3", morning: ["老道外"], afternoon: ["秋林公司买红肠"], evening: ["铁锅炖 farewell"], walkLevel: "约8千步", transport: "地铁+步行", nearbyFood: "老道外" },
      ],
      intense: [],
    },
    packingList: [
      { name: "厚羽绒服", category: "clothing", required: true },
      { name: "雪地靴", category: "clothing", required: true },
      { name: "暖宝宝(含手机用)", category: "gear", required: true },
      { name: "帽子+围脖+手套", category: "clothing", required: true },
      { name: "身份证", category: "docs", required: true },
      { name: "充电宝(低温耗电快)", category: "electronics", required: true },
    ],
  },
  {
    id: "zhuhai", name: "珠海", province: "广东", tagline: "百岛之市，浪漫之城", gradient: "from-cyan-300 via-teal-200 to-blue-200",
    isNiche: false, destTypes: ["island", "food_city"], durationRange: "1-3d", budgetRange: "comfort", seasons: ["spring", "autumn", "winter"],
    bestTime: "10月-次年3月", duration: "2-3天", budget: "人均800-1500元", transportHub: "金湾机场/珠海站",
    coreTip: "长隆海洋王国提前网上订票便宜",
    funSpots: [
      { name: "长隆海洋王国", tagline: "世界级海洋主题公园", ticket: "395元", duration: "1天", bestTime: "全天", tips: "提前网上订票，避开周末", priority: "must" },
      { name: "情侣路", tagline: "浪漫海滨路", ticket: "免费", duration: "2-3小时", bestTime: "傍晚", tips: "渔女雕像打卡，看日落", priority: "must" },
      { name: "圆明新园", tagline: "皇家园林复原", ticket: "免费", duration: "2-3小时", bestTime: "上午", tips: "1:1复原圆明园部分景观", priority: "niche" },
      { name: "东澳岛", tagline: "海岛度假", ticket: "船票150元", duration: "1-2天", bestTime: "5-10月", tips: "沙滩细腻，适合度假", priority: "nearby" },
    ],
    food: [
      { name: "海鲜", pricePerPerson: "100-200元", howToEat: "横琴蚝最出名", pitfall: "湾仔海鲜街买海鲜加工" },
      { name: "横琴蚝", pricePerPerson: "60-100元", howToEat: "清蒸或蒜蓉，鲜嫩肥美", pitfall: "横琴镇最正宗" },
      { name: "葡式蛋挞", pricePerPerson: "10-15元", howToEat: "外酥内滑，焦糖香", pitfall: "安德鲁饼店" },
    ],
    foodAreas: [
      { name: "湾仔海鲜街", location: "香洲区湾仔", bestTime: "晚餐", direction: "买海鲜加工" },
      { name: "拱北口岸", location: "香洲区拱北", bestTime: "晚餐", direction: "小吃+餐厅" },
    ],
    shopping: [
      { name: "华发商都", category: "mall", duration: "2-3小时", highlight: "珠海最大商场", forWho: "购物" },
      { name: "拱北口岸", category: "old_street", duration: "1-2小时", highlight: "免税商品", forWho: "购物" },
    ],
    pitfalls: [
      { category: "scenic", content: "长隆海洋王国周末人多，工作日去" },
      { category: "food", content: "海鲜先问价再买，防宰客" },
      { category: "general", content: "带防晒霜，海边紫外线强" },
    ],
    itinerary: {
      easy: [
        { label: "Day1", morning: ["长隆海洋王国"], afternoon: ["长隆"], evening: ["湾仔海鲜街"], walkLevel: "约1.5万步", transport: "打车", nearbyFood: "湾仔" },
        { label: "Day2", morning: ["情侣路"], afternoon: ["圆明新园"], evening: ["拱北口岸"], walkLevel: "约1万步", transport: "公交", nearbyFood: "拱北" },
      ],
      intense: [
        { label: "Day1", morning: ["长隆海洋王国"], afternoon: ["长隆"], evening: ["湾仔海鲜街"], walkLevel: "约2万步", transport: "打车", nearbyFood: "湾仔" },
        { label: "Day2", morning: ["东澳岛"], afternoon: ["东澳岛"], evening: ["情侣路"], walkLevel: "约1.5万步", transport: "船", nearbyFood: "情侣路" },
        { label: "Day3", morning: ["圆明新园"], afternoon: ["拱北口岸"], evening: ["华发商都"], walkLevel: "约1.2万步", transport: "公交", nearbyFood: "拱北" },
      ],
    },
    packingList: [
      { name: "泳衣", category: "clothing", required: true },
      { name: "防晒霜", category: "gear", required: true },
      { name: "轻薄外套", category: "clothing", required: true },
      { name: "身份证", category: "docs", required: true },
    ],
    nearbyFrom: ["深圳", "广州", "澳门"],
    nearbyDistance: "高铁1小时/自驾2小时",
    holidayWarning: "国庆/五一大长隆排队2小时+",
    holidayAlternative: "东澳岛人少",
  },
  {
    id: "huizhou", name: "惠州", province: "广东", tagline: "岭南名郡，半城山色半城湖", gradient: "from-green-300 via-emerald-200 to-teal-200",
    isNiche: false, destTypes: ["nature", "ancient_city"], durationRange: "1-3d", budgetRange: "budget", seasons: ["spring", "autumn", "winter"],
    bestTime: "10月-次年3月", duration: "2-3天", budget: "人均600-1200元", transportHub: "惠州站/惠州南站",
    coreTip: "巽寮湾周末人满为患，工作日去",
    funSpots: [
      { name: "巽寮湾", tagline: "天赐白沙堤", ticket: "免费", duration: "3-4小时", bestTime: "下午", tips: "沙质细腻，水清见底", priority: "must" },
      { name: "西湖", tagline: "惠州西湖", ticket: "免费", duration: "2-3小时", bestTime: "傍晚", tips: "苏东坡遗迹，比杭州西湖人少", priority: "must" },
      { name: "罗浮山", tagline: "道教名山", ticket: "54元", duration: "半天", bestTime: "上午", tips: "冲虚古观+飞来石", priority: "niche" },
      { name: "双月湾", tagline: "双湾奇观", ticket: "免费", duration: "3-4小时", bestTime: "下午", tips: "两个半月形海湾，观景台看全景", priority: "nearby" },
    ],
    food: [
      { name: "海鲜", pricePerPerson: "80-150元", howToEat: "巽寮湾海鲜大排档", pitfall: "先问价再点" },
      { name: "梅菜扣肉", pricePerPerson: "40-60元", howToEat: "惠州特产，肥而不腻", pitfall: "东江菜馆最正宗" },
      { name: "盐焗鸡", pricePerPerson: "50-80元", howToEat: "皮爽肉滑，咸香入味", pitfall: "东江盐焗鸡" },
    ],
    foodAreas: [
      { name: "巽寮湾", location: "惠东县巽寮湾", bestTime: "晚餐", direction: "海鲜大排档" },
      { name: "步行街", location: "惠城区步行街", bestTime: "晚餐", direction: "小吃+餐厅" },
    ],
    shopping: [
      { name: "华贸天地", category: "mall", duration: "2-3小时", highlight: "惠州最大商场", forWho: "购物" },
    ],
    pitfalls: [
      { category: "scenic", content: "巽寮湾周末人挤人，工作日去" },
      { category: "food", content: "海鲜先问价，防宰客" },
      { category: "traffic", content: "去巽寮湾堵车严重，提前出发" },
    ],
    itinerary: {
      easy: [
        { label: "Day1", morning: ["巽寮湾"], afternoon: ["巽寮湾游泳"], evening: ["巽寮湾海鲜"], walkLevel: "约8千步", transport: "自驾", nearbyFood: "巽寮湾" },
        { label: "Day2", morning: ["西湖"], afternoon: ["罗浮山"], evening: ["步行街"], walkLevel: "约1.2万步", transport: "自驾", nearbyFood: "步行街" },
      ],
      intense: [
        { label: "Day1", morning: ["巽寮湾"], afternoon: ["双月湾"], evening: ["巽寮湾"], walkLevel: "约1.5万步", transport: "自驾", nearbyFood: "巽寮湾" },
        { label: "Day2", morning: ["西湖"], afternoon: ["罗浮山"], evening: ["步行街"], walkLevel: "约1.8万步", transport: "自驾", nearbyFood: "步行街" },
        { label: "Day3", morning: ["南昆山"], afternoon: ["南昆山→返程"], evening: ["惠州市区"], walkLevel: "约1.5万步", transport: "自驾", nearbyFood: "市区" },
      ],
    },
    packingList: [
      { name: "泳衣", category: "clothing", required: true },
      { name: "防晒霜", category: "gear", required: true },
      { name: "轻薄外套", category: "clothing", required: true },
      { name: "身份证", category: "docs", required: true },
    ],
    nearbyFrom: ["深圳", "广州"],
    nearbyDistance: "自驾1.5小时/高铁1小时",
    holidayWarning: "国庆/五一巽寮湾堵车3小时+",
    holidayAlternative: "双月湾人少",
  },
  {
    id: "dongguan", name: "东莞", province: "广东", tagline: "世界工厂，制造之都", gradient: "from-gray-300 via-slate-200 to-zinc-200",
    isNiche: false, destTypes: ["ancient_city"], durationRange: "1-3d", budgetRange: "budget", seasons: ["spring", "autumn", "winter"],
    bestTime: "10月-次年3月", duration: "1-2天", budget: "人均500-1000元", transportHub: "东莞站/东莞东站",
    coreTip: "松山湖适合骑行，环境好",
    funSpots: [
      { name: "松山湖", tagline: "科技产业园", ticket: "免费", duration: "2-3小时", bestTime: "下午骑行", tips: "华为欧洲小镇，环境优美", priority: "must" },
      { name: "可园", tagline: "岭南四大名园", ticket: "8元", duration: "1-2小时", bestTime: "上午", tips: "岭南园林代表，小巧精致", priority: "must" },
      { name: "观音山", tagline: "森林公园", ticket: "45元", duration: "半天", bestTime: "上午", tips: "天然氧吧，登山健身", priority: "niche" },
      { name: "下坝坊", tagline: "东莞鼓浪屿", ticket: "免费", duration: "2小时", bestTime: "下午", tips: "文艺小巷，咖啡馆", priority: "nearby" },
    ],
    food: [
      { name: "烧鹅", pricePerPerson: "50-80元", howToEat: "皮脆肉嫩，蘸酸梅酱", pitfall: "厚街烧鹅最出名" },
      { name: "濑粉", pricePerPerson: "10-15元", howToEat: "东莞米粉，汤鲜粉滑", pitfall: "厚街濑粉" },
      { name: "道滘粽", pricePerPerson: "5-10元", howToEat: "咸肉粽，料足味美", pitfall: "道滘镇最正宗" },
    ],
    foodAreas: [
      { name: "下坝坊", location: "南城区下坝坊", bestTime: "下午茶", direction: "咖啡馆+小吃" },
      { name: "东城步行街", location: "东城区东城步行街", bestTime: "晚餐", direction: "餐厅+小吃" },
    ],
    shopping: [
      { name: "东城万达广场", category: "mall", duration: "2-3小时", highlight: "东莞热闹商场", forWho: "购物" },
    ],
    pitfalls: [
      { category: "scenic", content: "景点较少，适合短途休闲" },
      { category: "traffic", content: "高峰期堵车，地铁不方便" },
    ],
    itinerary: {
      easy: [
        { label: "Day1", morning: ["可园"], afternoon: ["松山湖骑行"], evening: ["下坝坊"], walkLevel: "约1万步", transport: "自驾", nearbyFood: "下坝坊" },
      ],
      intense: [
        { label: "Day1", morning: ["可园"], afternoon: ["松山湖"], evening: ["下坝坊"], walkLevel: "约1.2万步", transport: "自驾", nearbyFood: "下坝坊" },
        { label: "Day2", morning: ["观音山"], afternoon: ["观音山→返程"], evening: ["东城步行街"], walkLevel: "约1.5万步", transport: "自驾", nearbyFood: "东城" },
      ],
    },
    packingList: [
      { name: "舒适步行鞋", category: "clothing", required: true },
      { name: "身份证", category: "docs", required: true },
    ],
    nearbyFrom: ["深圳", "广州"],
    nearbyDistance: "自驾1小时/高铁30分钟",
    holidayWarning: "国庆/五一松山湖人多",
    holidayAlternative: "可园人少",
  },
  {
    id: "zhongshan", name: "中山", province: "广东", tagline: "伟人故里，香山文化", gradient: "from-amber-300 via-orange-200 to-red-200",
    isNiche: false, destTypes: ["ancient_city", "food_city"], durationRange: "1-3d", budgetRange: "budget", seasons: ["spring", "autumn", "winter"],
    bestTime: "10月-次年3月", duration: "1-2天", budget: "人均500-1000元", transportHub: "中山站/中山北站",
    coreTip: "孙中山故居免费，了解历史",
    funSpots: [
      { name: "孙中山故居", tagline: "伟人故里", ticket: "免费", duration: "2小时", bestTime: "上午", tips: "了解孙中山生平，免费参观", priority: "must" },
      { name: "中山影视城", tagline: "民国风情", ticket: "65元", duration: "2-3小时", bestTime: "全天", tips: "民国建筑，拍照圣地", priority: "must" },
      { name: "岐江公园", tagline: "工业遗址公园", ticket: "免费", duration: "1-2小时", bestTime: "傍晚", tips: "旧船厂改造，工业风", priority: "niche" },
      { name: "詹园", tagline: "岭南私家园林", ticket: "50元", duration: "1-2小时", bestTime: "上午", tips: "岭南园林代表，小巧精致", priority: "nearby" },
    ],
    food: [
      { name: "石岐乳鸽", pricePerPerson: "60-100元", howToEat: "皮脆肉嫩，一口爆汁", pitfall: "石岐鸽最出名" },
      { name: "小榄炸鱼球", pricePerPerson: "15-25元", howToEat: "外酥里嫩，蘸蚬蚧酱", pitfall: "小榄镇最正宗" },
      { name: "东升脆肉鲩", pricePerPerson: "60-100元", howToEat: "鱼肉爽脆，打边炉", pitfall: "东升镇最正宗" },
    ],
    foodAreas: [
      { name: "孙文西路步行街", location: "石岐区孙文西路", bestTime: "晚餐", direction: "小吃+餐厅" },
      { name: "大信新都汇", location: "石岐区大信", bestTime: "晚餐", direction: "现代餐厅" },
    ],
    shopping: [
      { name: "大信新都汇", category: "mall", duration: "2-3小时", highlight: "中山热闹商场", forWho: "购物" },
      { name: "孙文西路步行街", category: "old_street", duration: "1-2小时", highlight: "骑楼建筑", forWho: "散步" },
    ],
    pitfalls: [
      { category: "scenic", content: "景点较少，适合短途休闲" },
      { category: "food", content: "石岐乳鸽要趁热吃" },
    ],
    itinerary: {
      easy: [
        { label: "Day1", morning: ["孙中山故居"], afternoon: ["中山影视城"], evening: ["孙文西路"], walkLevel: "约1万步", transport: "自驾", nearbyFood: "孙文西路" },
      ],
      intense: [
        { label: "Day1", morning: ["孙中山故居"], afternoon: ["中山影视城"], evening: ["孙文西路"], walkLevel: "约1.2万步", transport: "自驾", nearbyFood: "孙文西路" },
        { label: "Day2", morning: ["詹园"], afternoon: ["岐江公园"], evening: ["大信新都汇"], walkLevel: "约1万步", transport: "自驾", nearbyFood: "大信" },
      ],
    },
    packingList: [
      { name: "舒适步行鞋", category: "clothing", required: true },
      { name: "身份证", category: "docs", required: true },
    ],
    nearbyFrom: ["深圳", "广州", "珠海"],
    nearbyDistance: "自驾1.5小时/高铁1小时",
    holidayWarning: "国庆/五一孙中山故居排队",
    holidayAlternative: "詹园人少",
  },
  {
    id: "foshan", name: "佛山", province: "广东", tagline: "武术之乡，美食之都", gradient: "from-red-300 via-rose-200 to-pink-200",
    isNiche: false, destTypes: ["ancient_city", "food_city"], durationRange: "1-3d", budgetRange: "budget", seasons: ["spring", "autumn", "winter"],
    bestTime: "10月-次年3月", duration: "1-2天", budget: "人均500-1000元", transportHub: "佛山站/佛山西站",
    coreTip: "祖庙看黄飞鸿武术表演",
    funSpots: [
      { name: "祖庙", tagline: "佛山地标", ticket: "20元", duration: "2-3小时", bestTime: "上午", tips: "黄飞鸿纪念馆+武术表演", priority: "must" },
      { name: "南风古灶", tagline: "陶瓷文化", ticket: "25元", duration: "2小时", bestTime: "上午", tips: "500年古窑，体验陶艺", priority: "must" },
      { name: "清晖园", tagline: "岭南四大名园", ticket: "15元", duration: "1-2小时", bestTime: "上午", tips: "岭南园林代表，小巧精致", priority: "niche" },
      { name: "岭南天地", tagline: "历史文化街区", ticket: "免费", duration: "2-3小时", bestTime: "下午+晚上", tips: "骑楼建筑，文艺小店", priority: "nearby" },
    ],
    food: [
      { name: "双皮奶", pricePerPerson: "10-15元", howToEat: "顺德双皮奶最正宗", pitfall: "民信老铺" },
      { name: "盲公饼", pricePerPerson: "10-15元", howToEat: "佛山特产，酥脆香甜", pitfall: "盲公饼最出名" },
      { name: "扎蹄", pricePerPerson: "30-50元", howToEat: "佛山酝扎蹄，卤味", pitfall: "李禧记最正宗" },
      { name: "顺德鱼生", pricePerPerson: "60-100元", howToEat: "鱼肉切片，配料拌食", pitfall: "顺德最正宗" },
    ],
    foodAreas: [
      { name: "岭南天地", location: "禅城区岭南天地", bestTime: "晚餐", direction: "餐厅+咖啡馆" },
      { name: "华辉拉肠", location: "禅城区", bestTime: "早餐", direction: "拉肠粉" },
    ],
    shopping: [
      { name: "岭南天地", category: "old_street", duration: "2-3小时", highlight: "历史文化街区", forWho: "散步/购物" },
      { name: "祖庙商圈", category: "mall", duration: "2-3小时", highlight: "热闹商圈", forWho: "购物" },
    ],
    pitfalls: [
      { category: "scenic", content: "祖庙武术表演时间固定，提前查" },
      { category: "food", content: "顺德菜最正宗，去顺德吃" },
    ],
    itinerary: {
      easy: [
        { label: "Day1", morning: ["祖庙"], afternoon: ["岭南天地"], evening: ["岭南天地"], walkLevel: "约1万步", transport: "步行", nearbyFood: "岭南天地" },
      ],
      intense: [
        { label: "Day1", morning: ["祖庙"], afternoon: ["南风古灶"], evening: ["岭南天地"], walkLevel: "约1.2万步", transport: "公交", nearbyFood: "岭南天地" },
        { label: "Day2", morning: ["清晖园"], afternoon: ["顺德吃鱼生"], evening: ["顺德→返程"], walkLevel: "约1万步", transport: "自驾", nearbyFood: "顺德" },
      ],
    },
    packingList: [
      { name: "舒适步行鞋", category: "clothing", required: true },
      { name: "身份证", category: "docs", required: true },
    ],
    nearbyFrom: ["广州", "深圳"],
    nearbyDistance: "自驾1小时/高铁30分钟",
    holidayWarning: "国庆/五一祖庙人多",
    holidayAlternative: "岭南天地人少",
  },
  {
    id: "macau", name: "澳门", province: "澳门", tagline: "东方蒙特卡洛，中西交融", gradient: "from-purple-300 via-violet-200 to-fuchsia-200",
    isNiche: false, destTypes: ["ancient_city", "food_city"], durationRange: "1-3d", budgetRange: "luxury", seasons: ["spring", "autumn", "winter"],
    bestTime: "10月-次年3月", duration: "2-3天", budget: "人均2000-5000元", transportHub: "澳门机场/拱北口岸",
    coreTip: "赌场免费进场，别赌太大",
    funSpots: [
      { name: "大三巴牌坊", tagline: "澳门地标", ticket: "免费", duration: "1小时", bestTime: "上午", tips: "拍照打卡，人很多", priority: "must" },
      { name: "威尼斯人", tagline: "豪华度假村", ticket: "免费", duration: "2-3小时", bestTime: "全天", tips: "室内运河+贡多拉，拍照圣地", priority: "must" },
      { name: "妈阁庙", tagline: "澳门最古老庙宇", ticket: "免费", duration: "1-2小时", bestTime: "上午", tips: "澳门名称来源", priority: "must" },
      { name: "路环岛", tagline: "宁静海岛", ticket: "免费", duration: "半天", bestTime: "下午", tips: "远离赌场喧嚣，安静", priority: "niche" },
      { name: "议事亭前地", tagline: "喷水池广场", ticket: "免费", duration: "1-2小时", bestTime: "傍晚", tips: "欧式建筑，拍照好看", priority: "nearby" },
    ],
    food: [
      { name: "葡式蛋挞", pricePerPerson: "15-25元", howToEat: "外酥内滑，焦糖香", pitfall: "安德鲁饼店最正宗" },
      { name: "猪扒包", pricePerPerson: "30-50元", howToEat: "猪排酥脆，面包松软", pitfall: "大利来咖啡" },
      { name: "水蟹粥", pricePerPerson: "80-120元", howToEat: "蟹肉鲜甜，粥底绵滑", pitfall: "诚昌饭店" },
      { name: "非洲鸡", pricePerPerson: "60-100元", howToEat: "葡国菜代表，香料浓郁", pitfall: "船屋葡国餐厅" },
    ],
    foodAreas: [
      { name: "官也街", location: "氹仔官也街", bestTime: "下午+晚餐", direction: "小吃+餐厅" },
      { name: "大三巴街", location: "澳门半岛大三巴街", bestTime: "下午", direction: "小吃+手信" },
    ],
    shopping: [
      { name: "威尼斯人", category: "mall", duration: "3-4小时", highlight: "豪华购物中心", forWho: "购物" },
      { name: "新马路", category: "old_street", duration: "2-3小时", highlight: "传统商业街", forWho: "购物/散步" },
    ],
    pitfalls: [
      { category: "scenic", content: "大三巴人挤人，早上去" },
      { category: "food", content: "官也街小吃贵，但味道好" },
      { category: "general", content: "赌场免费进场，别赌太大" },
      { category: "traffic", content: "拱北口岸周末排队1小时+" },
    ],
    itinerary: {
      easy: [
        { label: "Day1", morning: ["大三巴牌坊"], afternoon: ["议事亭前地"], evening: ["威尼斯人"], walkLevel: "约1.5万步", transport: "步行+赌场巴士", nearbyFood: "官也街" },
        { label: "Day2", morning: ["妈阁庙"], afternoon: ["路环岛"], evening: ["新马路"], walkLevel: "约1.2万步", transport: "公交", nearbyFood: "新马路" },
      ],
      intense: [
        { label: "Day1", morning: ["大三巴牌坊"], afternoon: ["议事亭前地→妈阁庙"], evening: ["威尼斯人"], walkLevel: "约2万步", transport: "步行+赌场巴士", nearbyFood: "官也街" },
        { label: "Day2", morning: ["路环岛"], afternoon: ["黑沙海滩"], evening: ["新马路"], walkLevel: "约1.5万步", transport: "公交", nearbyFood: "新马路" },
        { label: "Day3", morning: ["渔人码头"], afternoon: ["旅游塔"], evening: ["拱北口岸"], walkLevel: "约1.5万步", transport: "公交", nearbyFood: "拱北" },
      ],
    },
    packingList: [
      { name: "舒适步行鞋", category: "clothing", required: true },
      { name: "身份证+港澳通行证", category: "docs", required: true },
      { name: "充电宝", category: "electronics", required: true },
    ],
    nearbyFrom: ["深圳", "珠海", "广州"],
    nearbyDistance: "自驾2小时/船1小时",
    holidayWarning: "国庆/春节拱北口岸排队2小时+",
    holidayAlternative: "横琴口岸人少",
  },
  {
    id: "hongkong", name: "香港", province: "香港", tagline: "东方之珠，购物天堂", gradient: "from-blue-400 via-indigo-300 to-purple-200",
    isNiche: false, destTypes: ["ancient_city", "food_city"], durationRange: "4-7d", budgetRange: "luxury", seasons: ["spring", "autumn", "winter"],
    bestTime: "10月-次年3月", duration: "3-5天", budget: "人均3000-8000元", transportHub: "香港机场/西九龙站",
    coreTip: "八达通必备，交通购物都能用",
    funSpots: [
      { name: "维多利亚港", tagline: "世界三大夜景", ticket: "免费", duration: "2小时", bestTime: "晚上", tips: "星光大道看夜景，幻彩咏香江", priority: "must" },
      { name: "太平山顶", tagline: "香港之巅", ticket: "缆车88元", duration: "2-3小时", bestTime: "傍晚", tips: "凌霄阁观景台看全景", priority: "must" },
      { name: "迪士尼乐园", tagline: "童话世界", ticket: "639元", duration: "1天", bestTime: "全天", tips: "提前网上订票，避开周末", priority: "must" },
      { name: "旺角", tagline: "繁华商圈", ticket: "免费", duration: "2-3小时", bestTime: "下午+晚上", tips: "女人街+波鞋街，购物天堂", priority: "niche" },
      { name: "大屿山", tagline: "佛教圣地", ticket: "免费(缆车另付)", duration: "半天", bestTime: "上午", tips: "天坛大佛+宝莲禅寺", priority: "nearby" },
    ],
    food: [
      { name: "港式奶茶", pricePerPerson: "15-25元", howToEat: "丝袜奶茶，茶味浓郁", pitfall: "兰芳园最正宗" },
      { name: "菠萝油", pricePerPerson: "10-15元", howToEat: "菠萝包+黄油，冷热交融", pitfall: "金华冰厅" },
      { name: "云吞面", pricePerPerson: "30-50元", howToEat: "竹升面爽滑，云吞鲜美", pitfall: "吴财记" },
      { name: "烧腊饭", pricePerPerson: "40-60元", howToEat: "烧鹅叉烧饭，肉香饭软", pitfall: "再兴烧腊" },
      { name: "鸡蛋仔", pricePerPerson: "15-20元", howToEat: "外酥内软，甜香", pitfall: "利强记" },
    ],
    foodAreas: [
      { name: "庙街夜市", location: "油麻地庙街", bestTime: "夜宵", direction: "大排档+小吃" },
      { name: "铜锣湾", location: "铜锣湾", bestTime: "晚餐", direction: "餐厅+小吃" },
      { name: "旺角", location: "旺角", bestTime: "晚餐/夜宵", direction: "小吃+餐厅" },
    ],
    shopping: [
      { name: "海港城", category: "mall", duration: "3-4小时", highlight: "香港最大商场", forWho: "购物" },
      { name: "铜锣湾", category: "mall", duration: "3-4小时", highlight: "时尚购物区", forWho: "购物" },
      { name: "旺角", category: "old_street", duration: "2-3小时", highlight: "女人街+波鞋街", forWho: "购物" },
    ],
    pitfalls: [
      { category: "scenic", content: "迪士尼周末人多，工作日去" },
      { category: "food", content: "茶餐厅排队久，避开高峰" },
      { category: "traffic", content: "地铁高峰期拥挤，避开高峰" },
      { category: "general", content: "消费水平高，做好预算" },
    ],
    itinerary: {
      easy: [
        { label: "Day1", morning: ["太平山顶"], afternoon: ["中环"], evening: ["维多利亚港"], walkLevel: "约1.5万步", transport: "地铁+缆车", nearbyFood: "中环" },
        { label: "Day2", morning: ["迪士尼乐园"], afternoon: ["迪士尼"], evening: ["旺角"], walkLevel: "约2万步", transport: "地铁", nearbyFood: "旺角" },
        { label: "Day3", morning: ["大屿山"], afternoon: ["东涌"], evening: ["铜锣湾"], walkLevel: "约1.2万步", transport: "地铁+缆车", nearbyFood: "铜锣湾" },
      ],
      intense: [
        { label: "Day1", morning: ["太平山顶"], afternoon: ["中环→兰桂坊"], evening: ["维多利亚港"], walkLevel: "约2万步", transport: "地铁+缆车", nearbyFood: "中环" },
        { label: "Day2", morning: ["迪士尼乐园"], afternoon: ["迪士尼"], evening: ["旺角"], walkLevel: "约2.5万步", transport: "地铁", nearbyFood: "旺角" },
        { label: "Day3", morning: ["大屿山"], afternoon: ["东涌"], evening: ["铜锣湾"], walkLevel: "约1.5万步", transport: "地铁+缆车", nearbyFood: "铜锣湾" },
        { label: "Day4", morning: ["海洋公园"], afternoon: ["海洋公园"], evening: ["庙街夜市"], walkLevel: "约2万步", transport: "地铁", nearbyFood: "庙街" },
        { label: "Day5", morning: ["南丫岛"], afternoon: ["南丫岛→返程"], evening: ["机场"], walkLevel: "约1.5万步", transport: "船", nearbyFood: "南丫岛" },
      ],
    },
    packingList: [
      { name: "舒适步行鞋", category: "clothing", required: true },
      { name: "身份证+港澳通行证", category: "docs", required: true },
      { name: "充电宝", category: "electronics", required: true },
      { name: "八达通", category: "electronics", required: true },
    ],
    nearbyFrom: ["深圳", "广州", "澳门"],
    nearbyDistance: "高铁1小时/船1小时",
    holidayWarning: "国庆/春节迪士尼排队2小时+",
    holidayAlternative: "南丫岛人少",
  },
];
