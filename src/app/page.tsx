"use client";

import { useState, useCallback, useRef } from "react";
import { cities } from "@/lib/city-data";
import type { CityGuide } from "@/lib/city-data";
import { useFavorites } from "@/hooks/use-favorites";

type TabKey = "fun" | "food" | "shop" | "pitfall";

const tabs: { key: TabKey; label: string; icon: string }[] = [
  { key: "fun", label: "好玩", icon: "🎯" },
  { key: "food", label: "好吃", icon: "🍜" },
  { key: "shop", label: "好逛", icon: "🛍" },
  { key: "pitfall", label: "避坑", icon: "⚠️" },
];

export default function HomePage() {
  const [currentCity, setCurrentCity] = useState<CityGuide | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("fun");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const [shareText, setShareText] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [isFavAnimating, setIsFavAnimating] = useState(false);
  const historyRef = useRef<Set<string>>(new Set());
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const handleRandom = useCallback(() => {
    setIsAnimating(true);
    setActiveTab("fun");

    // Weighted random: prefer cities not recently shown
    const available = cities.filter((c) => !historyRef.current.has(c.id));
    const pool = available.length > 0 ? available : cities;
    if (available.length === 0) historyRef.current.clear();

    const next = pool[Math.floor(Math.random() * pool.length)];
    historyRef.current.add(next.id);

    setTimeout(() => {
      setCurrentCity(next);
      setIsAnimating(false);
    }, 600);
  }, []);

  const handleToggleFavorite = useCallback(
    (cityId: string) => {
      setIsFavAnimating(true);
      toggleFavorite(cityId);
      setTimeout(() => setIsFavAnimating(false), 400);
    },
    [toggleFavorite]
  );

  const handleShare = useCallback(async () => {
    if (!currentCity) return;
    setShareLoading(true);
    setShowShareModal(true);
    try {
      const res = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: currentCity.name,
          province: currentCity.province,
          guide: {
            bestTime: currentCity.bestTime,
            duration: currentCity.duration,
            pitfalls: currentCity.pitfalls,
            funSpots: currentCity.funSpots,
            food: currentCity.food,
            shopping: currentCity.shopping,
          },
        }),
      });
      const data = await res.json();
      if (data.text) {
        setShareText(data.text);
      }
    } catch {
      setShareText("分享内容生成失败，请重试");
    }
    setShareLoading(false);
  }, [currentCity]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = shareText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  }, [shareText]);

  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${currentCity?.name}·${currentCity?.province} 旅行攻略`,
          text: shareText,
        });
      } catch {
        // user cancelled
      }
    }
  }, [currentCity, shareText]);

  const favoriteCities = cities.filter((c) => favorites.includes(c.id));

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF7F2]/80 border-b border-[#F5EDE4]">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎒</span>
            <h1 className="text-xl font-bold text-[#4A6670] tracking-wide">
              行囊
            </h1>
          </div>
          <button
            onClick={() => setShowFavorites(true)}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-sm border border-[#F5EDE4] hover:shadow-md transition-shadow"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={favorites.length > 0 ? "#E8655A" : "none"}
              stroke={favorites.length > 0 ? "#E8655A" : "#C8956C"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-sm font-medium text-[#4A6670]">
              收藏{favorites.length > 0 && `(${favorites.length})`}
            </span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 pb-20">
        {/* Hero Section */}
        {!currentCity && !isAnimating && (
          <section className="flex flex-col items-center justify-center pt-32 pb-20 text-center">
            <div className="mb-6 text-7xl">🧳</div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#4A6670] mb-4 tracking-tight">
              下一站去哪？
            </h2>
            <p className="text-[#4A6670]/60 text-lg mb-10 max-w-md leading-relaxed">
              背上行囊，说走就走
              <br />
              每一次点击，都是一场未知旅途
            </p>
            <button
              onClick={handleRandom}
              className="group relative px-10 py-4 bg-[#C8956C] text-white rounded-2xl text-lg font-semibold shadow-lg shadow-[#C8956C]/30 hover:shadow-xl hover:shadow-[#C8956C]/40 active:scale-95 transition-all duration-200"
            >
              <span className="relative z-10">探索下一站</span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#C8956C] to-[#B8845C] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Decorative tags */}
            <div className="mt-16 flex flex-wrap justify-center gap-2">
              {[
                "🏔 雪山",
                "🌊 海岛",
                "🏯 古城",
                "🍜 美食",
                "🌸 花海",
                "🎪 民族",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/60 text-[#4A6670]/50 rounded-full text-sm border border-[#F5EDE4]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Loading animation */}
        {isAnimating && (
          <section className="flex flex-col items-center justify-center pt-32 pb-20">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-[#F5EDE4] border-t-[#C8956C] animate-spin" />
              <span className="absolute inset-0 flex items-center justify-center text-3xl">
                ✈️
              </span>
            </div>
            <p className="mt-6 text-[#4A6670]/50 text-lg animate-pulse">
              正在寻找目的地...
            </p>
          </section>
        )}

        {/* City Guide Card */}
        {currentCity && !isAnimating && (
          <section className="pt-8 animate-fade-in">
            {/* City Header Card */}
            <div
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${currentCity.gradient} p-8 md:p-10 shadow-lg`}
            >
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/20" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/15" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="inline-block px-3 py-1 bg-white/25 backdrop-blur-sm rounded-full text-sm text-white/90 mb-3">
                      {currentCity.province}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-sm">
                      {currentCity.name}
                    </h2>
                    <p className="mt-2 text-white/80 text-lg italic">
                      {currentCity.tagline}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggleFavorite(currentCity.id)}
                    className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill={isFavorite(currentCity.id) ? "#E8655A" : "none"}
                      stroke={
                        isFavorite(currentCity.id) ? "#E8655A" : "white"
                      }
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform duration-300 ${
                        isFavAnimating ? "scale-125" : "scale-100"
                      }`}
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-white text-sm">
                    📅 {currentCity.bestTime}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-white text-sm">
                    ⏱ {currentCity.duration}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {currentCity.highlights.map((h) => (
                    <span
                      key={h}
                      className="px-3 py-1 bg-white/15 backdrop-blur-sm rounded-lg text-white/90 text-xs"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tips Bar */}
            {currentCity.tips.length > 0 && (
              <div className="mt-4 p-4 bg-white rounded-2xl border border-[#F5EDE4] shadow-sm">
                <div className="flex items-start gap-2">
                  <span className="text-lg shrink-0">💡</span>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {currentCity.tips.map((tip, i) => (
                      <span
                        key={i}
                        className="text-sm text-[#4A6670]/70 leading-relaxed"
                      >
                        {tip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab Navigation */}
            <div className="mt-6 flex gap-1 p-1 bg-white rounded-2xl border border-[#F5EDE4] shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? "bg-[#F5EDE4] text-[#C8956C] shadow-sm"
                      : "text-[#4A6670]/50 hover:text-[#4A6670]/70"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mt-4 space-y-3">
              {activeTab === "fun" &&
                currentCity.funSpots.map((spot) => (
                  <div
                    key={spot.name}
                    className="p-5 bg-white rounded-2xl border border-[#F5EDE4] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-[#F5EDE4] flex items-center justify-center text-sm">
                        🎯
                      </span>
                      <div>
                        <h4 className="font-semibold text-[#4A6670] text-base">
                          {spot.name}
                        </h4>
                        <p className="mt-1 text-sm text-[#4A6670]/60 leading-relaxed">
                          {spot.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

              {activeTab === "food" &&
                currentCity.food.map((item) => (
                  <div
                    key={item.name}
                    className="p-5 bg-white rounded-2xl border border-[#F5EDE4] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-[#F5EDE4] flex items-center justify-center text-sm">
                        🍜
                      </span>
                      <div>
                        <h4 className="font-semibold text-[#4A6670] text-base">
                          {item.name}
                        </h4>
                        <p className="mt-1 text-sm text-[#4A6670]/60 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

              {activeTab === "shop" &&
                currentCity.shopping.map((item) => (
                  <div
                    key={item.name}
                    className="p-5 bg-white rounded-2xl border border-[#F5EDE4] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-[#F5EDE4] flex items-center justify-center text-sm">
                        🛍
                      </span>
                      <div>
                        <h4 className="font-semibold text-[#4A6670] text-base">
                          {item.name}
                        </h4>
                        <p className="mt-1 text-sm text-[#4A6670]/60 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

              {activeTab === "pitfall" &&
                currentCity.pitfalls.map((pit, i) => (
                  <div
                    key={i}
                    className="p-5 bg-white rounded-2xl border border-[#F5EDE4] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-sm">
                        ⚠️
                      </span>
                      <p className="text-sm text-[#4A6670]/70 leading-relaxed">
                        {pit}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={handleRandom}
                className="flex-1 py-4 bg-[#C8956C] text-white rounded-2xl text-base font-semibold shadow-lg shadow-[#C8956C]/20 hover:shadow-xl hover:shadow-[#C8956C]/30 active:scale-[0.98] transition-all duration-200"
              >
                换一个目的地
              </button>
              <button
                onClick={handleShare}
                className="px-6 py-4 bg-white border border-[#F5EDE4] rounded-2xl text-base font-semibold text-[#4A6670] shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200"
              >
                分享攻略
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Favorites Drawer */}
      {showFavorites && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowFavorites(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#FAF7F2] shadow-2xl animate-slide-in-right">
            <div className="h-14 px-5 flex items-center justify-between border-b border-[#F5EDE4]">
              <h3 className="text-lg font-bold text-[#4A6670]">
                我的收藏 ({favoriteCities.length})
              </h3>
              <button
                onClick={() => setShowFavorites(false)}
                className="p-2 rounded-lg hover:bg-[#F5EDE4] transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4A6670"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-56px)] p-5">
              {favoriteCities.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <span className="text-5xl mb-4">💔</span>
                  <p className="text-[#4A6670]/40 text-base">
                    还没有收藏任何城市
                  </p>
                  <p className="text-[#4A6670]/30 text-sm mt-1">
                    点击城市卡片上的爱心来收藏
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {favoriteCities.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => {
                        setCurrentCity(city);
                        setActiveTab("fun");
                        setShowFavorites(false);
                      }}
                      className="w-full text-left p-4 bg-white rounded-2xl border border-[#F5EDE4] shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-[#4A6670]">
                            {city.name}
                          </span>
                          <span className="ml-2 text-sm text-[#4A6670]/40">
                            {city.province}
                          </span>
                        </div>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="#E8655A"
                          stroke="#E8655A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </div>
                      <p className="mt-1 text-sm text-[#4A6670]/50 italic">
                        {city.tagline}
                      </p>
                      <div className="mt-2 flex gap-1.5">
                        {city.highlights.slice(0, 3).map((h) => (
                          <span
                            key={h}
                            className="px-2 py-0.5 bg-[#F5EDE4] rounded text-xs text-[#4A6670]/60"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => {
              setShowShareModal(false);
              setShareText("");
              setCopySuccess(false);
            }}
          />
          <div className="relative w-full max-w-lg mx-4 mb-4 sm:mb-0 bg-[#FAF7F2] rounded-3xl shadow-2xl animate-slide-up overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#4A6670]">分享攻略</h3>
                <button
                  onClick={() => {
                    setShowShareModal(false);
                    setShareText("");
                    setCopySuccess(false);
                  }}
                  className="p-2 rounded-lg hover:bg-[#F5EDE4] transition-colors"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4A6670"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {shareLoading ? (
                <div className="py-12 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border-3 border-[#F5EDE4] border-t-[#C8956C] animate-spin" />
                  <p className="mt-4 text-sm text-[#4A6670]/40">
                    生成分享内容...
                  </p>
                </div>
              ) : (
                <>
                  <div className="max-h-64 overflow-y-auto p-4 bg-white rounded-2xl border border-[#F5EDE4] text-sm text-[#4A6670]/70 whitespace-pre-line leading-relaxed">
                    {shareText}
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={handleCopy}
                      className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        copySuccess
                          ? "bg-green-500 text-white"
                          : "bg-[#C8956C] text-white shadow-md shadow-[#C8956C]/20 hover:shadow-lg"
                      }`}
                    >
                      {copySuccess ? "已复制 ✓" : "复制到剪贴板"}
                    </button>
                    {typeof navigator !== "undefined" && "share" in navigator && (
                      <button
                        onClick={handleNativeShare}
                        className="px-6 py-3 bg-white border border-[#F5EDE4] rounded-xl text-sm font-semibold text-[#4A6670] hover:shadow-md transition-shadow"
                      >
                        系统分享
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
