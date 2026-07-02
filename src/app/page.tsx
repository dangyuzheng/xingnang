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
  Mountain,
  Palmtree,
  Castle,
  Utensils,
  Flower2,
  Users,
  TreePine,
  Footprints,
  Star,
  Heart,
  TrendingUp,
  Shield,
  Menu,
  X,
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

type BlindboxPhase = "idle" | "shaking" ;

export default function HomePage() {
  const router = useRouter();
  const { visitedCityIds, lists } = useFavorites();
  const [showMenu, setShowMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDestTypes, setSelectedDestTypes] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string[]>([]);
  const [currentSeason, setCurrentSeason] = useState<string>("spring");
  const [monthlyRecs, setMonthlyRecs] = useState<ReturnType<typeof getMonthlyRecommendations>>([]);
  const [mounted, setMounted] = useState(false);
  const [blindboxPhase, setBlindboxPhase] = useState<BlindboxPhase>("idle");
  const [revealedCity, setRevealedCity] = useState<{ id: string; name: string; gradient: string } | null>(null);

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

    // Start blind box animation
    setBlindboxPhase("shaking");
    
    setTimeout(() => {
        setRevealedCity({ id: random.id, name: random.name, gradient: random.gradient });
        router.push(`/city/${random.id}`);
    }, 450);
    
  }, [selectedDestTypes, selectedDuration, selectedBudget, visitedCityIds, router]);

  const totalFavorites = lists.reduce((sum, l) => sum + l.cityIds.length, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] relative">
      {/* 顶部导航 */}
      <nav className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C8956C] to-[#A67B5B] flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
            </div>
            <span className="font-bold text-[#4A6670] text-lg tracking-wide">行囊</span>
          </div>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#C8956C]/10 transition-colors"
          >
            {showMenu ? <X className="w-5 h-5 text-[#4A6670]/60" /> : <Menu className="w-5 h-5 text-[#4A6670]/60" />}
          </button>
        </div>
      </nav>

      {/* 菜单下拉面板 */}
      {showMenu && (
        <div className="fixed inset-x-0 top-14 z-40 bg-white/95 backdrop-blur-md border-b border-[#C8956C]/10 shadow-lg animate-fade-in">
          <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
            {/* 收藏 */}
            <button
              onClick={() => { setShowMenu(false); router.push("/favorites"); }}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#F5EDE4] transition-colors text-left"
            >
              <Heart className="w-5 h-5 text-[#C8956C]" />
              <span className="text-sm text-[#4A6670]">我的收藏</span>
              {totalFavorites > 0 && (
                <span className="ml-auto bg-[#E8655A] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalFavorites}
                </span>
              )}
            </button>

            {/* 本月最佳 */}
            <div className="border-t border-[#C8956C]/10 pt-3">
              <div className="flex items-center gap-2 mb-3 px-3">
                <TrendingUp className="w-4 h-4 text-[#C8956C]" />
                <span className="text-sm text-[#4A6670]">本月最佳</span>
                <span className="text-xs text-[#4A6670]/40">{mounted ? seasonLabels[currentSeason] : ""}</span>
              </div>
              <div className="grid grid-cols-3 gap-3 px-3">
                {monthlyRecs.slice(0, 3).map((city) => (
                  <button
                    key={city.id}
                    onClick={() => { setShowMenu(false); router.push(`/city/${city.id}`); }}
                    className="flex flex-col rounded-xl overflow-hidden hover:shadow-md transition-shadow text-left"
                  >
                    <div className={`w-full aspect-[4/1] bg-gradient-to-br ${city.gradient} flex items-end p-2`}>
                      <span className="text-white font-bold text-sm drop-shadow-md">{city.name}</span>
                    </div>
                    <div className="w-full p-2.5 bg-[#F5EDE4]">
                      <p className="text-sm text-[#4A6670]/60 line-clamp-1">{city.duration}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 快捷入口 */}
            <div className="border-t border-[#C8956C]/10 pt-3 space-y-1">
              <button
                onClick={() => { setShowMenu(false); router.push("/nearby"); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#F5EDE4] transition-colors text-left"
              >
                <MapPin className="w-5 h-5 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm text-[#4A6670]">周边短途</p>
                  <p className="text-xs text-[#4A6670]/40">2小时可达的周末目的地</p>
                </div>
              </button>
              <button
                onClick={() => { setShowMenu(false); router.push("/niche"); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#F5EDE4] transition-colors text-left"
              >
                <Star className="w-5 h-5 text-purple-500" />
                <div className="flex-1">
                  <p className="text-sm text-[#4A6670]">小众秘境</p>
                  <p className="text-xs text-[#4A6670]/40">{nicheCitiesList.length}个宝藏地</p>
                </div>
              </button>
              <button
                onClick={() => { setShowMenu(false); router.push("/holiday"); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#F5EDE4] transition-colors text-left"
              >
                <Shield className="w-5 h-5 text-amber-500" />
                <div className="flex-1">
                  <p className="text-sm text-[#4A6670]">节假日避坑</p>
                  <p className="text-xs text-[#4A6670]/40">预警 + Plan B</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 主内容区 - 极致居中 */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-4">
        <div className="w-full max-w-md text-center">
          {/* 标题区 */}
          <h1 className="text-2xl font-bold text-[#4A6670] mb-2">把下一站，交给惊喜</h1>
          <p className="text-sm text-[#4A6670]/50 mb-10">
            一键开启旅行盲盒，解锁专属目的地与完整攻略
          </p>

          {/* 盲盒按钮区 */}
          {blindboxPhase === "idle" && (
            <button
              onClick={handleExplore}
              className="w-full py-5 bg-gradient-to-r from-[#C8956C] to-[#A67B5B] text-white rounded-2xl font-bold text-lg shadow-[0_20px_40px_-10px_rgba(200,149,108,0.5)] hover:shadow-[0_25px_50px_-10px_rgba(200,149,108,0.6)] active:scale-[0.98] transition-all animate-breathe"
            >
              <span className="flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" />
                  <path d="M3 8h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" />
                  <path d="M12 8v13" />
                  <path d="M8 12h8" />
                </svg>
                开启旅行盲盒
              </span>
            </button>
          )}

          {/* 盲盒动画阶段 */}
          {blindboxPhase === "shaking" && (
            <div className="w-full py-5 bg-gradient-to-r from-[#C8956C] to-[#A67B5B] text-white rounded-2xl font-bold text-lg shadow-[0_20px_40px_-10px_rgba(200,149,108,0.5)] animate-blindbox-shake">
              <span className="flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" />
                  <path d="M3 8h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" />
                  <path d="M12 8v13" />
                  <path d="M8 12h8" />
                </svg>
                正在开启...
              </span>
            </div>
          )}


          {/* 偏好筛选 - 按钮下方小字 */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mt-6 text-xs text-[#4A6670]/30 hover:text-[#C8956C] transition-colors"
          >
            {hasFilters ? `已选 ${selectedDestTypes.length + selectedDuration.length + selectedBudget.length} 个偏好 · 展开` : "想限定范围？自定义偏好"}
          </button>

          {/* 筛选面板 */}
          {showFilters && (
            <div className="mt-4 bg-white rounded-xl border border-[#C8956C]/8 shadow-sm p-4 animate-fade-in space-y-4 text-left">
              {/* 目的地类型 */}
              <div>
                <h3 className="text-xs font-semibold text-[#4A6670]/50 mb-2">目的地类型</h3>
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
                <h3 className="text-xs font-semibold text-[#4A6670]/50 mb-2">出行天数</h3>
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
                <h3 className="text-xs font-semibold text-[#4A6670]/50 mb-2">预算档位</h3>
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
      </main>

      {/* 底部极浅辅助信息 */}
      <footer className="fixed bottom-0 inset-x-0 pb-4 text-center pointer-events-none">
        <p className="text-[10px] text-[#4A6670]/20">已收录 200+ 目的地与原创攻略</p>
      </footer>
    </div>
  );
}
