import type { CityGuide } from "./types";
import { cities } from "./city-data";
import { moreCities } from "./more-data";
import { nicheCities } from "./niche-data";

/** 所有城市数据（热门 + 更多 + 小众） */
export const allCities: CityGuide[] = [...cities, ...moreCities, ...nicheCities];

/** 热门城市（非小众） */
export const popularCities: CityGuide[] = allCities.filter((c) => !c.isNiche);

/** 小众秘境城市 */
export const nicheCitiesList: CityGuide[] = allCities.filter((c) => c.isNiche);

/** 按ID查找城市 */
export function getCityById(id: string): CityGuide | undefined {
  return allCities.find((c) => c.id === id);
}

/** 目的地类型标签映射 */
export const destTypeLabels: Record<string, string> = {
  mountain: "雪山",
  island: "海岛",
  ancient_city: "古城",
  food_city: "美食",
  flower: "花海",
  ethnic: "民族",
  nature: "自然风光",
  city_walk: "城市逛吃",
  hiking: "户外徒步",
};

/** 出行天数标签映射 */
export const durationLabels: Record<string, string> = {
  "1-2d": "1-2天短途",
  "3-4d": "3-4天",
  "5-7d": "5-7天",
  "7d+": "7天以上",
};

/** 预算档位标签映射 */
export const budgetLabels: Record<string, string> = {
  budget: "穷游(<1k)",
  comfort: "舒适(1-3k)",
  luxury: "轻奢(3-5k)",
  premium: "高端(5k+)",
};

/** 季节标签映射 */
export const seasonLabels: Record<string, string> = {
  spring: "春季",
  summer: "夏季",
  autumn: "秋季",
  winter: "冬季",
};

/** 获取当前季节 */
export function getCurrentSeason(): string {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

/** 获取当月推荐城市 */
export function getMonthlyRecommendations(count: number = 4): CityGuide[] {
  const season = getCurrentSeason();
  const suitable = allCities.filter((c) => c.seasons.includes(season as import("./types").SeasonTag));
  const shuffled = [...suitable].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/** 按偏好筛选城市 */
export function filterCities(filters: {
  destTypes?: string[];
  durationRange?: string[];
  budgetRange?: string[];
  seasons?: string[];
  excludeVisited?: string[];
}): CityGuide[] {
  let result = [...allCities];

  if (filters.destTypes?.length) {
    result = result.filter((c) => c.destTypes.some((t) => filters.destTypes!.includes(t)));
  }
  if (filters.durationRange?.length) {
    result = result.filter((c) => filters.durationRange!.includes(c.durationRange));
  }
  if (filters.budgetRange?.length) {
    result = result.filter((c) => filters.budgetRange!.includes(c.budgetRange));
  }
  if (filters.seasons?.length) {
    result = result.filter((c) => c.seasons.some((s) => filters.seasons!.includes(s)));
  }
  if (filters.excludeVisited && filters.excludeVisited.length > 0) {
    result = result.filter((c) => !filters.excludeVisited!.includes(c.id));
  }

  return result;
}

/** 获取周边短途城市 */
export function getNearbyCities(fromCityId: string): CityGuide[] {
  return allCities.filter((c) => c.nearbyFrom?.includes(fromCityId));
}

/** 行李清单类别映射 */
export const packingCategoryLabels: Record<string, string> = {
  clothing: "衣物",
  gear: "装备",
  medicine: "药品",
  docs: "证件",
  electronics: "电子",
};
