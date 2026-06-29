// ====== 筛选标签类型 ======
export type DestinationType =
  | "mountain"
  | "island"
  | "ancient_city"
  | "food_city"
  | "ethnic"
  | "nature"
  | "hiking"
  | "hot_spring";

export type DurationRange = "1-3d" | "4-7d" | "8d+";
export type BudgetRange = "budget" | "comfort" | "luxury" | "premium";
export type SeasonTag = "spring" | "summer" | "autumn" | "winter" | "all_season";

export const DEST_TYPE_LABELS: Record<DestinationType, string> = {
  mountain: "雪山",
  island: "海岛",
  ancient_city: "古城",
  food_city: "城市美食",
  ethnic: "民族风情",
  nature: "草原湖泊",
  hiking: "户外徒步",
  hot_spring: "温泉度假",
};

export const DURATION_LABELS: Record<DurationRange, string> = {
  "1-3d": "1-3天",
  "4-7d": "4-7天",
  "8d+": "8天以上",
};

export const BUDGET_LABELS: Record<BudgetRange, string> = {
  budget: "穷游 (<1k)",
  comfort: "舒适 (1-3k)",
  luxury: "轻奢 (3-6k)",
  premium: "高端 (6k+)",
};

export const SEASON_LABELS: Record<SeasonTag, string> = {
  spring: "春季限定",
  summer: "夏季度假",
  autumn: "秋季限定",
  winter: "冬季赏雪",
  all_season: "四季皆宜",
};

// ====== 详情条目类型 ======
export interface FunSpot {
  name: string;
  tagline: string;
  ticket: string;
  duration: string;
  bestTime: string;
  tips: string;
  priority: "must" | "niche" | "nearby";
}

export interface FoodItem {
  name: string;
  pricePerPerson: string;
  howToEat: string;
  pitfall: string;
}

export interface FoodArea {
  name: string;
  location: string;
  bestTime: string;
  direction: string;
}

export interface ShopArea {
  name: string;
  category: "mall" | "old_street" | "night_market";
  duration: string;
  highlight: string;
  forWho: string;
}

export interface PitfallItem {
  category: "traffic" | "scenic" | "food" | "general";
  content: string;
}

export interface DayPlan {
  label: string;
  morning: string[];
  afternoon: string[];
  evening: string[];
  walkLevel: string;
  transport: string;
  nearbyFood: string;
}

export interface Itinerary {
  easy: DayPlan[];
  intense: DayPlan[];
}

export interface PackingItem {
  name: string;
  category: "clothing" | "medicine" | "gear" | "docs" | "electronics";
  required: boolean;
}

// ====== 城市主类型 ======
export interface CityGuide {
  id: string;
  name: string;
  province: string;
  tagline: string;
  gradient: string;
  isNiche: boolean;

  // 筛选维度
  destTypes: DestinationType[];
  durationRange: DurationRange;
  budgetRange: BudgetRange;
  seasons: SeasonTag[];

  // 基础信息
  bestTime: string;
  duration: string;
  budget: string;
  transportHub: string;
  coreTip: string;

  // 四大Tab
  funSpots: FunSpot[];
  food: FoodItem[];
  foodAreas: FoodArea[];
  shopping: ShopArea[];
  pitfalls: PitfallItem[];

  // 懒人行程
  itinerary: Itinerary;

  // 工具
  packingList: PackingItem[];

  // 周边短途
  nearbyFrom?: string[];
  nearbyDistance?: string;

  // 节假日预警
  holidayWarning?: string;
  holidayAlternative?: string;
}

// ====== 收藏系统类型 ======
export interface FavCollection {
  id: string;
  name: string;
  icon: string;
  cityIds: string[];
}

export interface Footprint {
  cityId: string;
  status: "want" | "been";
  visitDate?: string;
  cost?: string;
  rating?: number;
}

export const DEFAULT_COLLECTIONS: FavCollection[] = [
  { id: "weekend", name: "周末短途", icon: "🎒", cityIds: [] },
  { id: "holiday", name: "长假备选", icon: "🏖", cityIds: [] },
  { id: "island_wish", name: "海岛心愿单", icon: "🏝", cityIds: [] },
];
