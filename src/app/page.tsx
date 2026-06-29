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
  seasonLabels,
  getCurrentSeason,
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
  Building2,
  Footprints,
  ChevronDown,
  ChevronUp,
  Map,
  Star,
  Heart,
  Luggage,
  TrendingUp,
  Shield,
} from "lucide-react";

const destTypeIcons: Record<string, React.ReactNode> = {
  mountain: <Mountain className="w-4 h-4" />,
  island: <Palmtree className="w-4 h-4" />,
  ancient_city: <Castle className="w-4 h-4" />,
  food_city: <Utensils className="w-4 h-4" />,
  flower: <Flower2 className="w-4 h-4" />,
  ethnic: <Users className="w-4 h-4" />,
  nature: <TreePine className="w-4 h-4" />,
  city_walk: <Building2 className="w-4 h-4" />,
  hiking: <Footprints className="w-4 h-4" />,
};

export default function HomePage() {
  const router = useRouter();
  const { visitedCityIds, lists } = useFavorites();
  const [isSpinning, setIsSpinning] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDestTypes, setSelectedDestTypes] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string[]>([]);
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

  const hasFilters = selectedDestTypes.length > 0 || selectedDuration.length > 0 || selectedBudget.length > 0 || selectedSeason.length > 0;

  const handleExplore = useCallback(() => {
    setIsSpinning(true);
    const filtered = filterCities({
      destTypes: selectedDestTypes.length > 0 ? selectedDestTypes : undefined,
      durationRange: selectedDuration.length > 0 ? selectedDuration : undefined,
      budgetRange: selectedBudget.length > 0 ? selectedBudget : undefined,
      seasons: selectedSeason.length > 0 ? selectedSeason : undefined,
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
  }, [selectedDestTypes, selectedDuration, selectedBudget, selectedSeason, visitedCityIds, router]);

  const totalFavorites = lists.reduce((sum, l) => sum + l.cityIds.length, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* 顶部导航 */}
      <nav className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#C8956C]/10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C8956C] to-[#A67B5B] flex items-center justify-center">
              <Luggage className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[#4A6670] text-lg">行囊</span>
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
        <div className="pt-12 pb-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#C8956C] to-[#A67B5B] flex items-center justify-center shadow-lg shadow-[#C8956C]/20">
            <Compass className={`w-10 h-10 text-white ${isSpinning ? "animate-spin" : ""}`} />
          </div>
          <h1 className="text-3xl font-bold text-[#4A6670] mb-2">下一站去哪？</h1>
          <p className="text-[#4A6670]/60 text-base">
            {hasFilters ? "按偏好精准推荐" : "选好偏好，一键解锁你的专属目的地"}
          </p>
        </div>

        {/* 偏好筛选区 */}
        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-[#C8956C]/10 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 text-[#4A6670]">
              <Sparkles className="w-4 h-4 text-[#C8956C]" />
              <span className="text-sm font-medium">
                {hasFilters ? `已选 ${selectedDestTypes.length + selectedDuration.length + selectedBudget.length + selectedSeason.length} 个偏好` : "偏好筛选（可选）"}
              </span>
            </div>
            {showFilters ? <ChevronUp className="w-4 h-4 text-[#4A6670]/40" /> : <ChevronDown className="w-4 h-4 text-[#4A6670]/40" />}
          </button>

          {showFilters && (
            <div className="mt-3 bg-white rounded-xl border border-[#C8956C]/10 shadow-sm p-4 animate-fade-in space-y-5">
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

              {/* 出行季节 */}
              <div>
                <h3 className="text-xs font-semibold text-[#4A6670]/50 uppercase tracking-wider mb-2">出行季节</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSeason(selectedSeason.includes(currentSeason) ? selectedSeason.filter((s) => s !== currentSeason) : [currentSeason])}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                      selectedSeason.includes(currentSeason)
                        ? "bg-[#C8956C] text-white shadow-sm"
                        : "bg-[#F5EDE4] text-[#4A6670] hover:bg-[#C8956C]/10"
                    }`}
                  >
                    当前{seasonLabels[currentSeason]}推荐
                  </button>
                  {Object.entries(seasonLabels)
                    .filter(([key]) => key !== currentSeason)
                    .map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => toggleFilter(selectedSeason, setSelectedSeason, key)}
                        className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                          selectedSeason.includes(key)
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
                    setSelectedSeason([]);
                  }}
                  className="text-xs text-[#C8956C] hover:underline"
                >
                  清除所有筛选
                </button>
              )}
            </div>
          )}
        </div>

        {/* 主操作按钮 */}
        <div className="mb-8">
          <button
            onClick={handleExplore}
            disabled={isSpinning}
            className="w-full py-4 bg-gradient-to-r from-[#C8956C] to-[#A67B5B] text-white rounded-2xl font-bold text-lg shadow-lg shadow-[#C8956C]/25 hover:shadow-xl hover:shadow-[#C8956C]/30 active:scale-[0.98] transition-all disabled:opacity-70"
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

        {/* 本月最佳 */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-[#C8956C]" />
            <h2 className="text-base font-bold text-[#4A6670]">本月最佳</h2>
            <span className="text-xs text-[#4A6670]/40">{mounted ? seasonLabels[currentSeason] : ""}推荐</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {monthlyRecs.map((city) => (
              <button
                key={city.id}
                onClick={() => router.push(`/city/${city.id}`)}
                className="bg-white rounded-xl border border-[#C8956C]/10 p-4 text-left hover:shadow-md transition-shadow group"
              >
                <div className={`w-full h-20 rounded-lg bg-gradient-to-br ${city.gradient} mb-3 flex items-end p-2`}>
                  <span className="text-white font-bold text-sm drop-shadow">{city.name}</span>
                </div>
                <p className="text-xs text-[#4A6670]/60 line-clamp-2">{city.tagline}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F5EDE4] text-[#C8956C]">{city.duration}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F5EDE4] text-[#C8956C]">{city.budget.split("人均")[1] || city.budget}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 底部快捷专区 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Map className="w-4 h-4 text-[#C8956C]" />
            <h2 className="text-base font-bold text-[#4A6670]">快捷入口</h2>
          </div>

          {/* 周边短途 */}
          <button
            onClick={() => router.push("/nearby")}
            className="w-full bg-white rounded-xl border border-[#C8956C]/10 p-4 flex items-center gap-4 hover:shadow-md transition-shadow text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-300 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-white" />
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-300 flex items-center justify-center shrink-0">
              <Star className="w-6 h-6 text-white" />
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-300 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[#4A6670] text-sm">节假日避坑</h3>
              <p className="text-xs text-[#4A6670]/50 mt-0.5">热门景区预警 + Plan B替代方案</p>
            </div>
            <ChevronDown className="w-4 h-4 text-[#4A6670]/30 -rotate-90" />
          </button>
        </section>
      </main>
    </div>
  );
}
