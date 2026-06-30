"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  allCities,
  filterCities,
  getMonthlyRecommendations,
  nicheCitiesList,
  destTypeLabels,
  durationLabels,
  budgetLabels,
  getCurrentSeason,
  seasonLabels,
} from "@/lib/data-index";
import { useFavorites } from "@/hooks/use-favorites";
import {
  MapPin,
  Compass,
  Sparkles,
  Mountain,
  Palmtree,
  Castle,
  Utensils,
  Flower2,
  Users,
  TreePine,
  Footprints,
  ChevronDown,
  ChevronUp,
  Map,
  Star,
  Heart,
  TrendingUp,
  Shield,
} from "lucide-react";

const destTypeIcons: Record<string, React.ReactNode> = {
  mountain: <Mountain className="w-4 h-4" />,
  island: <Palmtree className="w-4 h-4" />,
  ancient_city: <Castle className="w-4 h-4" />,
  food_city: <Utensils className="w-4 h-4" />,
  ethnic: <Users className="w-4 h-4" />,
  nature: <TreePine className="w-4 h-4" />,
  hiking: <Footprints className="w-4 h-4" />,
  hot_spring: <Flower2 className="w-4 h-4" />,
};

export default function HomePage() {
  const router = useRouter();
  const { visitedCityIds, lists } = useFavorites();
  const [isSpinning, setIsSpinning] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showMonthly, setShowMonthly] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [selectedDestTypes, setSelectedDestTypes] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string[]>([]);
  const [currentSeason, setCurrentSeason] = useState<string>("spring");
  const [monthlyRecs, setMonthlyRecs] = useState<ReturnType<typeof getMonthlyRecommendations>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const season = getCurrentSeason();
    setCurrentSeason(season);
    setMonthlyRecs(getMonthlyRecommendations(season, 4));
    setMounted(true);
  }, []);

  const toggleFilter = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const hasFilters = selectedDestTypes.length > 0 || selectedDuration.length > 0 || selectedBudget.length > 0;

  const handleExplore = useCallback(() => {
    setIsSpinning(true);
    const filtered = filterCities({
      destTypes: selectedDestTypes.length > 0 ? selectedDestTypes : undefined,
      durationRange: selectedDuration.length > 0 ? selectedDuration : undefined,
      budgetRange: selectedBudget.length > 0 ? selectedBudget : undefined,
      excludeVisited: visitedCityIds,
    });
    const pool = filtered.length > 0 ? filtered : allCities;
    const available = pool.filter((c) => !visitedCityIds.includes(c.id));
    const finalPool = available.length > 0 ? available : pool;
    const random = finalPool[Math.floor(Math.random() * finalPool.length)];

    setTimeout(() => {
      setIsSpinning(false);
      router.push(`/city/${random.id}`);
    }, 1200);
  }, [selectedDestTypes, selectedDuration, selectedBudget, visitedCityIds, router]);

  const totalFavorites = lists.reduce((sum, l) => sum + l.cityIds.length, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* 顶部导航 */}
      <nav className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#C8956C]/10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C8956C] to-[#A67B5B] flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
            </div>
            <span className="font-bold text-[#4A6670] text-lg tracking-wide">行囊</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/favorites")}
              className="flex items-center gap-1.5 text-sm text-[#4A6670]/70 hover:text-[#C8956C] transition-colors"
            >
              <Heart className="w-4 h-4" />
              {totalFavorites > 0 && (
                <span className="bg-[#E8655A] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {totalFavorites}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 pb-20">
        {/* 核心视觉区 */}
        <div className="pt-16 pb-10 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#C8956C] to-[#A67B5B] flex items-center justify-center shadow-lg shadow-[#C8956C]/20">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
          </div>
          <h1 className="text-3xl font-bold text-[#4A6670] mb-2">赴一场人间山海</h1>
          <p className="text-[#4A6670]/50 text-base">
            挑选心之所向，邂逅独属于你的风景
          </p>
        </div>

        {/* 主操作按钮 */}
        <div className="mb-6">
          <button
            onClick={handleExplore}
            disabled={isSpinning}
            className="w-full py-4.5 bg-gradient-to-r from-[#C8956C] to-[#A67B5B] text-white rounded-2xl font-bold text-lg active:scale-[0.98] transition-transform disabled:opacity-70 animate-breathe"
          >
            {isSpinning ? (
              <span className="flex items-center justify-center gap-2">
                <Compass className="w-5 h-5 animate-spin" />
                正在寻找目的地...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                探索下一站
              </span>
            )}
          </button>
          {visitedCityIds.length > 0 && (
            <p className="text-center text-xs text-[#4A6670]/40 mt-2">
              已为你屏蔽 {visitedCityIds.length} 个已去过的目的地
            </p>
          )}
        </div>

        {/* 偏好筛选 — 轻量文字链接 */}
        <div className="mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mx-auto flex items-center gap-1.5 text-sm text-[#4A6670]/40 hover:text-[#C8956C] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{hasFilters ? `已选 ${selectedDestTypes.length + selectedDuration.length + selectedBudget.length} 个偏好` : "偏好筛选"}</span>
            {showFilters ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {showFilters && (
            <div className="mt-3 bg-white rounded-xl border border-[#C8956C]/8 shadow-sm p-4 animate-fade-in space-y-5">
              {/* 目的地类型 */}
              <div>
                <h3 className="text-xs font-semibold text-[#4A6670]/50 uppercase tracking-wider mb-2">目的地类型</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(destTypeLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => toggleFilter(selectedDestTypes, setSelectedDestTypes, key)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                        selectedDestTypes.includes(key)
                          ? "bg-[#C8956C] text-white shadow-sm"
                          : "bg-[#F5EDE4] text-[#4A6670] hover:bg-[#C8956C]/10"
                      }`}
                    >
                      {destTypeIcons[key]}
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 出行天数 */}
              <div>
                <h3 className="text-xs font-semibold text-[#4A6670]/50 uppercase tracking-wider mb-2">出行天数</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(durationLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => toggleFilter(selectedDuration, setSelectedDuration, key)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                        selectedDuration.includes(key)
                          ? "bg-[#C8956C] text-white shadow-sm"
                          : "bg-[#F5EDE4] text-[#4A6670] hover:bg-[#C8956C]/10"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 预算档位 */}
              <div>
                <h3 className="text-xs font-semibold text-[#4A6670]/50 uppercase tracking-wider mb-2">预算档位</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(budgetLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => toggleFilter(selectedBudget, setSelectedBudget, key)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                        selectedBudget.includes(key)
                          ? "bg-[#C8956C] text-white shadow-sm"
                          : "bg-[#F5EDE4] text-[#4A6670] hover:bg-[#C8956C]/10"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {hasFilters && (
                <button
                  onClick={() => {
                    setSelectedDestTypes([]);
                    setSelectedDuration([]);
                    setSelectedBudget([]);
                  }}
                  className="text-xs text-[#C8956C] hover:underline"
                >
                  清除所有筛选
                </button>
              )}
            </div>
          )}
        </div>

        {/* 本月最佳 — 默认收起 */}
        <section className="mb-6">
          <button
            onClick={() => setShowMonthly(!showMonthly)}
            className="flex items-center gap-1.5 text-sm text-[#4A6670]/40 hover:text-[#C8956C] transition-colors"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>本月最佳{mounted ? ` · ${seasonLabels[currentSeason]}推荐` : ""}</span>
            {showMonthly ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {showMonthly && mounted && (
            <div className="mt-3 grid grid-cols-3 gap-3 animate-fade-in">
              {monthlyRecs.slice(0, 3).map((city) => (
                <button
                  key={city.id}
                  onClick={() => router.push(`/city/${city.id}`)}
                  className="flex flex-col group relative bg-white rounded-2xl border border-[#C8956C]/10 overflow-hidden hover:shadow-lg hover:shadow-[#C8956C]/10 transition-all text-left"
                >
                  <div className={`w-full aspect-[4/1] bg-gradient-to-br ${city.gradient} flex items-end p-2.5`}>
                    <span className="text-white font-bold text-sm drop-shadow-md">{city.name}</span>
                  </div>
                  <div className="p-2.5">
                    <p className="text-[11px] text-[#4A6670]/60 line-clamp-2 leading-relaxed mb-1.5">{city.tagline}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#F5EDE4] text-[#C8956C]">{city.duration}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* 快捷入口 — 默认收起 */}
        <section>
          <button
            onClick={() => setShowShortcuts(!showShortcuts)}
            className="flex items-center gap-1.5 text-sm text-[#4A6670]/40 hover:text-[#C8956C] transition-colors"
          >
            <Map className="w-3.5 h-3.5" />
            <span>快捷入口</span>
            {showShortcuts ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {showShortcuts && (
            <div className="mt-3 space-y-3 animate-fade-in">
              {/* 周边短途 */}
              <button
                onClick={() => router.push("/nearby")}
                className="w-full bg-white rounded-xl border border-[#C8956C]/10 p-4 flex items-center gap-4 hover:shadow-md transition-shadow text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-400 to-emerald-300 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#4A6670] text-sm">周边短途</h3>
                  <p className="text-xs text-[#4A6670]/50 mt-0.5">2小时高铁/自驾可达的周末目的地</p>
                </div>
                <ChevronDown className="w-4 h-4 text-[#4A6670]/30 -rotate-90" />
              </button>

              {/* 小众秘境 */}
              <button
                onClick={() => router.push("/niche")}
                className="w-full bg-white rounded-xl border border-[#C8956C]/10 p-4 flex items-center gap-4 hover:shadow-md transition-shadow text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-300 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#4A6670] text-sm">小众秘境</h3>
                  <p className="text-xs text-[#4A6670]/50 mt-0.5">{nicheCitiesList.length}个非网红人少景美的宝藏地</p>
                </div>
                <ChevronDown className="w-4 h-4 text-[#4A6670]/30 -rotate-90" />
              </button>

              {/* 节假日预警 */}
              <button
                onClick={() => router.push("/holiday")}
                className="w-full bg-white rounded-xl border border-[#C8956C]/10 p-4 flex items-center gap-4 hover:shadow-md transition-shadow text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-300 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#4A6670] text-sm">节假日避坑</h3>
                  <p className="text-xs text-[#4A6670]/50 mt-0.5">热门景区预警 + Plan B替代方案</p>
                </div>
                <ChevronDown className="w-4 h-4 text-[#4A6670]/30 -rotate-90" />
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
