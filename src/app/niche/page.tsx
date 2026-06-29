"use client";

import { useRouter } from "next/navigation";
import { nicheCitiesList } from "@/lib/data-index";
import { ArrowLeft, Star, Mountain, TreePine, Users, Footprints, Castle, Utensils, Palmtree } from "lucide-react";

const nicheIcons: Record<string, React.ReactNode> = {
  mountain: <Mountain className="w-4 h-4" />,
  nature: <TreePine className="w-4 h-4" />,
  ethnic: <Users className="w-4 h-4" />,
  hiking: <Footprints className="w-4 h-4" />,
  ancient_city: <Castle className="w-4 h-4" />,
  food_city: <Utensils className="w-4 h-4" />,
  island: <Palmtree className="w-4 h-4" />,
};

export default function NichePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <nav className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#C8956C]/10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white border border-[#C8956C]/10 flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-[#4A6670]" />
          </button>
          <div>
            <h1 className="font-bold text-[#4A6670]">小众秘境</h1>
            <p className="text-[10px] text-[#4A6670]/40">人少景美的宝藏目的地</p>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 pt-6 pb-20">
        <div className="bg-gradient-to-br from-purple-100 to-indigo-50 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-300 flex items-center justify-center shrink-0">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-[#4A6670] text-sm">远离人潮，独享秘境</h2>
            <p className="text-xs text-[#4A6670]/50 mt-0.5">这些小众目的地大多数人是不知道的，信息零散的地方，这里最全面</p>
          </div>
        </div>

        <div className="space-y-3">
          {nicheCitiesList.map((city) => (
            <button
              key={city.id}
              onClick={() => router.push(`/city/${city.id}`)}
              className="w-full bg-white rounded-xl border border-[#C8956C]/10 p-4 flex items-center gap-4 hover:shadow-md transition-shadow text-left"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${city.gradient} flex items-center justify-center shrink-0`}>
                <span className="text-white font-bold text-lg">{city.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-[#4A6670]">{city.name}</h3>
                  <span className="text-[10px] text-[#4A6670]/40">·{city.province}</span>
                </div>
                <p className="text-xs text-[#4A6670]/60 mt-0.5">{city.tagline}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {city.destTypes.slice(0, 3).map((t) => (
                    <span key={t} className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded bg-[#F5EDE4] text-[#C8956C]">
                      {nicheIcons[t]} {t === "mountain" ? "雪山" : t === "nature" ? "草原湖泊" : t === "ethnic" ? "民族风情" : t === "hiking" ? "徒步" : t === "ancient_city" ? "古城" : t === "island" ? "海岛" : t === "food_city" ? "城市美食" : t === "hot_spring" ? "温泉" : ""}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-[#C8956C]">{city.duration}</p>
                <p className="text-[10px] text-[#4A6670]/40">{city.budget}</p>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
