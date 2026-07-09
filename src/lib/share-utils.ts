export interface ShareGuide {
  bestTime: string;
  duration: string;
  pitfalls: string[];
  funSpots: { name: string; desc: string }[];
  food: { name: string; desc: string }[];
  shopping: { name: string; desc: string }[];
}

export function generateShareText(city: string, province: string, guide: ShareGuide): string {
  return [
    `🌍 ${city}·${province} 旅行攻略`,
    "",
    `📅 最佳时间：${guide.bestTime}`,
    `⏱ 建议天数：${guide.duration}`,
    "",
    "🎯 好玩",
    ...guide.funSpots.map((s) => `  · ${s.name} — ${s.desc}`),
    "",
    "🍜 好吃",
    ...guide.food.map((f) => `  · ${f.name} — ${f.desc}`),
    "",
    "🛍 好逛",
    ...guide.shopping.map((s) => `  · ${s.name} — ${s.desc}`),
    "",
    "⚠️ 避坑",
    ...guide.pitfalls.map((p) => `  · ${p}`),
    "",
    "—— 来自「行囊」旅行攻略",
  ].join("\n");
}
