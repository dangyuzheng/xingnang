import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { city, province, guide } = body as {
      city: string;
      province: string;
      guide: {
        bestTime: string;
        duration: string;
        pitfalls: string[];
        funSpots: { name: string; desc: string }[];
        food: { name: string; desc: string }[];
        shopping: { name: string; desc: string }[];
      };
    };

    const text = [
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

    const domain = process.env.COZE_PROJECT_DOMAIN_DEFAULT || "localhost:5000";
    const shareUrl = domain.startsWith("http") ? domain : `https://${domain}`;

    return NextResponse.json({ text, shareUrl });
  } catch {
    return NextResponse.json({ error: "生成分享内容失败" }, { status: 500 });
  }
}
