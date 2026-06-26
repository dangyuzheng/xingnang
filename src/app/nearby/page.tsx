"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { allCities, getNearbyCities } from "@/lib/data-index";
import { ArrowLeft, MapPin, Train, Car, Clock } from "lucide-react";

const originCities = ["北京", "上海", "成都", "重庆", "广州", "杭州", "西安", "武汉"];

export default function NearbyPage() {
  const router = useRouter();
  const [selectedOrigin, setSelectedOrigin] = useState<string>("");

  // 查找周边城市（简化：基于 nearbyFrom 字段匹配）
  const nearbyResults = selectedOrigin
    ? allCities.filter((c) => c.nearbyFrom?.some((from) => from.includes(selectedOrigin) || selectedOrigin.includes(from)))
    : [];

  // 按距离分类
  const byCar1h = nearbyResults.filter((c) => c.nearbyDistance?.includes("30分钟") || c.nearbyDistance?.includes("45分钟"));
  const byCar2h = nearbyResults.filter((c) => c.nearbyDistance?.includes("1小时") || c.nearbyDistance?.includes("1.5小时"));
  const byTrain = nearbyResults.filter((c) => c.nearbyDistance?.includes("高铁"));

  const allNearby = selectedOrigin ? (nearbyResults.length > 0 ? nearbyResults : []) : [];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <nav className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#C8956C]/10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white border border-[#C8956C]/10 flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-[#4A6670]" />
          </button>
          <div>
            <h1 className="font-bold text-[#4A6670]">周边短途</h1>
            <p className="text-[10px] text-[#4A6670]/40">周末说走就走</p>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 pt-6 pb-20">
        {/* 选择出发城市 */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 mb-6">
          <h2 className="font-bold text-[#4A6670] text-sm mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C8956C]" /> 选择出发城市
          </h2>
          <div className="flex flex-wrap gap-2">
            {originCities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedOrigin(city)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedOrigin === city
                    ? "bg-[#C8956C] text-white"
                    : "bg-white text-[#4A6670] border border-[#C8956C]/10"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {!selectedOrigin && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-[#C8956C]/20 mx-auto mb-3" />
            <p className="text-sm text-[#4A6670]/40">选择出发城市，查看周边短途推荐</p>
          </div>
        )}

        {selectedOrigin && allNearby.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-[#4A6670]/40">暂无从{selectedOrigin}出发的周边推荐</p>
          </div>
        )}

        {/* 按交通方式分组 */}
        {byCar1h.length > 0 && (
          <div className="mb-6">
            <h3 className="flex items-center gap-1.5 text-xs font-semibold text-[#4A6670]/50 mb-3">
              <Car className="w-3.5 h-3.5" /> 自驾1小时内
            </h3>
            <div className="space-y-2">
              {byCar1h.map((city) => (
                <CityCard key={city.id} city={city} onClick={() => router.push(`/city/${city.id}`)} />
              ))}
            </div>
          </div>
        )}

        {byCar2h.length > 0 && (
          <div className="mb-6">
            <h3 className="flex items-center gap-1.5 text-xs font-semibold text-[#4A6670]/50 mb-3">
              <Car className="w-3.5 h-3.5" /> 自驾2小时内
            </h3>
            <div className="space-y-2">
              {byCar2h.map((city) => (
                <CityCard key={city.id} city={city} onClick={() => router.push(`/city/${city.id}`)} />
              ))}
            </div>
          </div>
        )}

        {byTrain.length > 0 && (
          <div className="mb-6">
            <h3 className="flex items-center gap-1.5 text-xs font-semibold text-[#4A6670]/50 mb-3">
              <Train className="w-3.5 h-3.5" /> 高铁可达
            </h3>
            <div className="space-y-2">
              {byTrain.map((city) => (
                <CityCard key={city.id} city={city} onClick={() => router.push(`/city/${city.id}`)} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function CityCard({ city, onClick }: { city: (typeof allCities)[number]; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full bg-white rounded-xl border border-[#C8956C]/10 p-3 flex items-center gap-3 hover:shadow-md transition-shadow text-left">
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${city.gradient} flex items-center justify-center shrink-0`}>
        <span className="text-white font-bold text-sm">{city.name[0]}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-[#4A6670] text-sm">{city.name}</h4>
        <p className="text-xs text-[#4A6670]/50">{city.tagline}</p>
      </div>
      <div className="text-right shrink-0">
        <span className="flex items-center gap-1 text-[10px] text-[#C8956C]">
          <Clock className="w-3 h-3" /> {city.nearbyDistance}
        </span>
        <span className="text-[10px] text-[#4A6670]/40">{city.duration}</span>
      </div>
    </button>
  );
}
