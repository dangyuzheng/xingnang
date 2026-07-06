"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { getCityById, packingCategoryLabels } from "@/lib/data-index";
import { useFavorites } from "@/hooks/use-favorites";
import type { CityGuide } from "@/lib/types";
import {
  ArrowLeft,
  Heart,
  Lightbulb,
  MapPin,
  Clock,
  Ticket,
  Utensils,
  ShoppingBag,
  AlertTriangle,
  Calendar,
  Wallet,
  Train,
  Star,
  Share2,
  CheckCircle2,
  ChevronRight,
  ListChecks,
  Calculator,
  X,
  Plus,
  Package,
  Users,
} from "lucide-react";

type TabKey = "fun" | "food" | "shop" | "pitfall";

const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "fun", label: "好玩", icon: <Star className="w-4 h-4" /> },
  { key: "food", label: "好吃", icon: <Utensils className="w-4 h-4" /> },
  { key: "shop", label: "好逛", icon: <ShoppingBag className="w-4 h-4" /> },
  { key: "pitfall", label: "避坑", icon: <AlertTriangle className="w-4 h-4" /> },
];

const priorityLabels: Record<string, { label: string; color: string }> = {
  must: { label: "必打卡", color: "bg-[#C8956C] text-white" },
  niche: { label: "小众好去处", color: "bg-[#4A6670] text-white" },
  nearby: { label: "顺路可逛", color: "bg-[#4A6670]/40 text-[#4A6670]" },
};

const pitfallCategoryLabels: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  traffic: { label: "交通", icon: <Train className="w-3 h-3" />, color: "bg-blue-50 text-blue-600 border-blue-100" },
  scenic: { label: "景点", icon: <MapPin className="w-3 h-3" />, color: "bg-green-50 text-green-600 border-green-100" },
  food: { label: "美食", icon: <Utensils className="w-3 h-3" />, color: "bg-orange-50 text-orange-600 border-orange-100" },
  general: { label: "出行", icon: <AlertTriangle className="w-3 h-3" />, color: "bg-red-50 text-red-600 border-red-100" },
};

const shopCategoryLabels: Record<string, string> = {
  mall: "商圈购物中心",
  old_street: "老城步道/老街",
  night_market: "夜市/市集",
};

export default function CityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const city = getCityById(id);
  const { isFavorite, getCityLists, addToList, lists, createList, setFootprint, getFootprint } = useFavorites();

  const [activeTab, setActiveTab] = useState<TabKey>("fun");
  const [itineraryMode, setItineraryMode] = useState<"easy" | "intense">("easy");
  const [showPacking, setShowPacking] = useState(false);
  const [showBudget, setShowBudget] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showAddToList, setShowAddToList] = useState(false);
  const [budgetPeople, setBudgetPeople] = useState(2);
  const [budgetHotelLevel, setBudgetHotelLevel] = useState<"budget" | "comfort" | "luxury">("comfort");

  if (!city) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#4A6670]/60 mb-4">城市未找到</p>
          <button onClick={() => router.push("/")} className="text-[#C8956C] hover:underline">
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const fav = isFavorite(city.id);
  const cityLists = getCityLists(city.id);
  const footprint = getFootprint(city.id);

  const handleShare = async () => {
    const text = `🌍 ${city.name}·${city.province} 旅行攻略\n\n📅 最佳时间：${city.bestTime}\n⏱ 建议天数：${city.duration}\n💰 预算：${city.budget}\n\n${city.funSpots.slice(0, 3).map((s) => `🎯 ${s.name} — ${s.tagline}`).join("\n")}\n\n⚠️ 核心提醒：${city.coreTip}\n\n—— 来自「行囊」旅行攻略`;

    if (navigator.share) {
      try {
        await navigator.share({ title: `${city.name}旅行攻略`, text });
        return;
      } catch {
        // fallback to clipboard
      }
    }
    await navigator.clipboard.writeText(text);
    setShowShare(true);
    setTimeout(() => setShowShare(false), 2000);
  };

  // 预算速算
  const budgetCalc = () => {
    const base = city.budget.match(/\d+/g);
    if (!base) return { low: 0, high: 0 };
    const perPerson = (parseInt(base[0]) + parseInt(base[1] || base[0])) / 2;
    const hotelPerNight = budgetHotelLevel === "budget" ? 150 : budgetHotelLevel === "comfort" ? 350 : 700;
    const days = parseInt(city.duration) || 3;
    const low = Math.round((perPerson * budgetPeople * 0.7 + hotelPerNight * (days - 1)));
    const high = Math.round((perPerson * budgetPeople * 1.3 + hotelPerNight * (days - 1) * 1.5));
    return { low, high, days, hotelPerNight };
  };

  const budget = budgetCalc();

  // 转换渐变字符串为内联样式（解决 Safari 兼容性问题）
  const getGradientStyle = (gradient: string) => {
    const colors = gradient
      .replace(/from-\[#([0-9A-Fa-f]{6})\]/g, '#$1')
      .replace(/via-\[#([0-9A-Fa-f]{6})\]/g, '#$1')
      .replace(/to-\[#([0-9A-Fa-f]{6})\]/g, '#$1')
      .match(/#[0-9A-Fa-f]{6}/g) || [];
    if (colors.length === 2) {
      return { backgroundImage: `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]})` };
    } else if (colors.length === 3) {
      return { backgroundImage: `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]}, ${colors[2]})` };
    }
    return { backgroundImage: `linear-gradient(to bottom right, #C8956C, #A67B5B)` };
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-24">
      {/* 顶部头图信息卡 */}
      <div className="relative pt-12 pb-8 px-4" style={getGradientStyle(city.gradient)}>
        <div className="absolute inset-0 bg-black/10" />
        {/* 导航 */}
        <div className="relative flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <Share2 className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setShowAddToList(true)}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                fav ? "bg-[#E8655A]" : "bg-white/20 backdrop-blur-sm"
              }`}
            >
              <Heart className={`w-5 h-5 ${fav ? "text-white fill-white" : "text-white"}`} />
            </button>
          </div>
        </div>

        {/* 城市信息 */}
        <div className="relative text-white">
          <h1 className="text-4xl font-bold mb-1">{city.name}</h1>
          <p className="text-white/80 text-lg mb-4">{city.tagline}</p>

          {/* 基础信息标签 */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs">
              <Calendar className="w-3 h-3" /> {city.bestTime}
            </span>
            <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs">
              <Clock className="w-3 h-3" /> {city.duration}
            </span>
            <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs">
              <Wallet className="w-3 h-3" /> {city.budget}
            </span>
            <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs">
              <Train className="w-3 h-3" /> {city.transportHub}
            </span>
          </div>
        </div>
      </div>

      {/* 核心提醒 */}
      <div className="mx-4 -mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2 shadow-sm">
        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 leading-relaxed">{city.coreTip}</p>
      </div>

      {/* 节假日预警 */}
      {city.holidayWarning && (
        <div className="mx-4 mt-3 bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-red-800 font-medium">{city.holidayWarning}</p>
            {city.holidayAlternative && (
              <p className="text-xs text-red-600 mt-1">替代方案：{city.holidayAlternative}</p>
            )}
          </div>
        </div>
      )}

      {/* 足迹标记 */}
      <div className="mx-4 mt-3 flex gap-2">
        <button
          onClick={() => {
            if (footprint?.status === "want_to_go") {
              setFootprint(city.id, "none");
            } else {
              setFootprint(city.id, "want_to_go");
            }
          }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-all ${
            footprint?.status === "want_to_go"
              ? "bg-[#C8956C] text-white"
              : "bg-white text-[#4A6670] border border-[#C8956C]/10"
          }`}
        >
          <Star className="w-3.5 h-3.5" /> 想去
        </button>
        <button
          onClick={() => {
            if (footprint?.status === "been_there") {
              setFootprint(city.id, "none");
            } else {
              setFootprint(city.id, "been_there");
            }
          }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-all ${
            footprint?.status === "been_there"
              ? "bg-[#4A6670] text-white"
              : "bg-white text-[#4A6670] border border-[#C8956C]/10"
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" /> 去过
        </button>
      </div>

      {/* 四大核心Tab */}
      <div className="mt-6">
        <div className="flex px-4 gap-1 bg-[#F5EDE4] mx-4 rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-white text-[#C8956C] shadow-sm"
                  : "text-[#4A6670]/60"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="px-4 mt-4">
          {activeTab === "fun" && <FunTab city={city} />}
          {activeTab === "food" && <FoodTab city={city} />}
          {activeTab === "shop" && <ShopTab city={city} />}
          {activeTab === "pitfall" && <PitfallTab city={city} />}
        </div>
      </div>

      {/* 懒人现成行程 */}
      <div className="mx-4 mt-8">
        <h2 className="text-base font-bold text-[#4A6670] mb-1 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#C8956C]" />
          {city.duration}省心行程
        </h2>
        <div className="flex gap-2 mt-3 mb-4">
          <button
            onClick={() => setItineraryMode("easy")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              itineraryMode === "easy" ? "bg-[#C8956C] text-white" : "bg-[#F5EDE4] text-[#4A6670]"
            }`}
          >
            松弛慢游版
          </button>
          <button
            onClick={() => setItineraryMode("intense")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              itineraryMode === "intense" ? "bg-[#C8956C] text-white" : "bg-[#F5EDE4] text-[#4A6670]"
            }`}
          >
            深度暴走版
          </button>
        </div>
        <ItineraryView city={city} mode={itineraryMode} />
      </div>

      {/* 出行实用工具区 */}
      <div className="mx-4 mt-8">
        <h2 className="text-base font-bold text-[#4A6670] mb-3 flex items-center gap-2">
          <Package className="w-4 h-4 text-[#C8956C]" />
          出行工具
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowPacking(true)}
            className="bg-white rounded-xl border border-[#C8956C]/10 p-4 text-left hover:shadow-md transition-shadow"
          >
            <ListChecks className="w-6 h-6 text-[#C8956C] mb-2" />
            <h3 className="font-bold text-[#4A6670] text-sm">行李清单</h3>
            <p className="text-xs text-[#4A6670]/50 mt-0.5">{city.packingList.length}项必备</p>
          </button>
          <button
            onClick={() => setShowBudget(true)}
            className="bg-white rounded-xl border border-[#C8956C]/10 p-4 text-left hover:shadow-md transition-shadow"
          >
            <Calculator className="w-6 h-6 text-[#C8956C] mb-2" />
            <h3 className="font-bold text-[#4A6670] text-sm">预算速算</h3>
            <p className="text-xs text-[#4A6670]/50 mt-0.5">一键算总预算</p>
          </button>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#FAF7F2]/90 backdrop-blur-md border-t border-[#C8956C]/10 p-4">
        <div className="max-w-2xl mx-auto flex gap-3">
          <button
            onClick={handleShare}
            className="flex-1 py-3 bg-white border border-[#C8956C]/20 rounded-xl text-[#C8956C] font-medium text-sm flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" /> 分享攻略
          </button>
          <button
            onClick={() => setShowAddToList(true)}
            className={`flex-1 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 ${
              fav
                ? "bg-[#E8655A] text-white"
                : "bg-gradient-to-r from-[#C8956C] to-[#A67B5B] text-white"
            }`}
          >
            <Heart className={`w-4 h-4 ${fav ? "fill-white" : ""}`} /> {fav ? "已收藏" : "收藏"}
          </button>
        </div>
      </div>

      {/* 行李清单弹窗 */}
      {showPacking && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end" onClick={() => setShowPacking(false)}>
          <div className="bg-white rounded-t-2xl w-full max-h-[80vh] overflow-y-auto animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[#C8956C]/10 p-4 flex items-center justify-between">
              <h3 className="font-bold text-[#4A6670]">行李清单</h3>
              <button onClick={() => setShowPacking(false)}>
                <X className="w-5 h-5 text-[#4A6670]/40" />
              </button>
            </div>
            <div className="p-4">
              {Object.entries(packingCategoryLabels).map(([cat, catLabel]) => {
                const items = city.packingList.filter((p) => p.category === cat);
                if (items.length === 0) return null;
                return (
                  <div key={cat} className="mb-4">
                    <h4 className="text-xs font-semibold text-[#4A6670]/50 uppercase tracking-wider mb-2">{catLabel}</h4>
                    {items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 py-1.5">
                        <div className={`w-5 h-5 rounded border ${item.required ? "bg-[#C8956C] border-[#C8956C]" : "border-[#4A6670]/20"} flex items-center justify-center`}>
                          {item.required && <CheckCircle2 className="w-3 h-3 text-white" />}
                        </div>
                        <span className="text-sm text-[#4A6670]">{item.name}</span>
                        {!item.required && <span className="text-[10px] text-[#4A6670]/30">选带</span>}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 预算速算弹窗 */}
      {showBudget && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end" onClick={() => setShowBudget(false)}>
          <div className="bg-white rounded-t-2xl w-full animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="border-b border-[#C8956C]/10 p-4 flex items-center justify-between">
              <h3 className="font-bold text-[#4A6670]">预算速算</h3>
              <button onClick={() => setShowBudget(false)}>
                <X className="w-5 h-5 text-[#4A6670]/40" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-xs text-[#4A6670]/50 mb-1 block">出行人数</label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setBudgetPeople(Math.max(1, budgetPeople - 1))} className="w-8 h-8 rounded-full bg-[#F5EDE4] flex items-center justify-center text-[#C8956C]">-</button>
                  <span className="text-lg font-bold text-[#4A6670]">{budgetPeople}人</span>
                  <button onClick={() => setBudgetPeople(budgetPeople + 1)} className="w-8 h-8 rounded-full bg-[#F5EDE4] flex items-center justify-center text-[#C8956C]">+</button>
                </div>
              </div>
              <div>
                <label className="text-xs text-[#4A6670]/50 mb-1 block">住宿档位</label>
                <div className="flex gap-2">
                  {([["budget", "经济型"], ["comfort", "舒适型"], ["luxury", "高端型"]] as const).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setBudgetHotelLevel(key)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium ${
                        budgetHotelLevel === key ? "bg-[#C8956C] text-white" : "bg-[#F5EDE4] text-[#4A6670]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-[#FAF7F2] rounded-xl p-4">
                <p className="text-xs text-[#4A6670]/50 mb-1">预计总预算（{budget.days}天）</p>
                <p className="text-2xl font-bold text-[#C8956C]">¥{budget.low.toLocaleString()} - ¥{budget.high.toLocaleString()}</p>
                <div className="mt-2 space-y-1 text-xs text-[#4A6670]/60">
                  <p>住宿：约¥{budgetHotelLevel === "budget" ? "150" : budgetHotelLevel === "comfort" ? "350" : "700"}/晚</p>
                  <p>交通+餐饮+门票：约¥{Math.round(budget.low * 0.5 / budgetPeople)}-{Math.round(budget.high * 0.5 / budgetPeople)}/人</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 收藏到清单弹窗 */}
      {showAddToList && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end" onClick={() => setShowAddToList(false)}>
          <div className="bg-white rounded-t-2xl w-full max-h-[60vh] overflow-y-auto animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="border-b border-[#C8956C]/10 p-4 flex items-center justify-between">
              <h3 className="font-bold text-[#4A6670]">收藏到清单</h3>
              <button onClick={() => setShowAddToList(false)}>
                <X className="w-5 h-5 text-[#4A6670]/40" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              {lists.map((list) => (
                <button
                  key={list.id}
                  onClick={() => {
                    if (list.cityIds.includes(city.id)) {
                      // already in list, could remove
                    } else {
                      addToList(list.id, city.id);
                    }
                    setShowAddToList(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#FAF7F2] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#F5EDE4] flex items-center justify-center">
                    <Heart className={`w-4 h-4 ${list.cityIds.includes(city.id) ? "text-[#E8655A] fill-[#E8655A]" : "text-[#C8956C]"}`} />
                  </div>
                  <span className="text-sm font-medium text-[#4A6670] flex-1">{list.name}</span>
                  <span className="text-xs text-[#4A6670]/40">{list.cityIds.length}个</span>
                  {list.cityIds.includes(city.id) && <CheckCircle2 className="w-4 h-4 text-[#C8956C]" />}
                </button>
              ))}
              <button
                onClick={() => {
                  const name = prompt("请输入清单名称");
                  if (name) {
                    createList(name);
                  }
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#FAF7F2] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[#C8956C]/10 flex items-center justify-center">
                  <Plus className="w-4 h-4 text-[#C8956C]" />
                </div>
                <span className="text-sm font-medium text-[#C8956C]">新建清单</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 分享成功提示 */}
      {showShare && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#4A6670] text-white px-4 py-2 rounded-xl text-sm shadow-lg animate-fade-in">
          已复制到剪贴板
        </div>
      )}
    </div>
  );
}

/** 好玩Tab */
function FunTab({ city }: { city: CityGuide }) {
  const grouped = {
    must: city.funSpots.filter((s) => s.priority === "must"),
    niche: city.funSpots.filter((s) => s.priority === "niche"),
    nearby: city.funSpots.filter((s) => s.priority === "nearby"),
  };

  return (
    <div className="space-y-4">
      {(["must", "niche", "nearby"] as const).map((group) => {
        const spots = grouped[group];
        if (spots.length === 0) return null;
        return (
          <div key={group}>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium mb-2 ${priorityLabels[group].color}`}>
              {priorityLabels[group].label}
            </span>
            <div className="space-y-2">
              {spots.map((spot, i) => (
                <div key={i} className="bg-white rounded-xl border border-[#C8956C]/10 p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-[#4A6670] text-sm">{spot.name}</h4>
                      <p className="text-xs text-[#4A6670]/50">{spot.tagline}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {spot.ticket && (
                      <span className="flex items-center gap-1 text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                        <Ticket className="w-3 h-3" /> {spot.ticket}
                      </span>
                    )}
                    {spot.duration && (
                      <span className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                        <Clock className="w-3 h-3" /> {spot.duration}
                      </span>
                    )}
                    {spot.bestTime && (
                      <span className="flex items-center gap-1 text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">
                        <Calendar className="w-3 h-3" /> {spot.bestTime}
                      </span>
                    )}
                  </div>
                  {spot.tips && (
                    <p className="text-xs text-[#C8956C] mt-2 flex items-start gap-1">
                      <Lightbulb className="w-3 h-3 shrink-0 mt-0.5" /> {spot.tips}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** 好吃Tab */
function FoodTab({ city }: { city: CityGuide }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-semibold text-[#4A6670]/50 uppercase tracking-wider mb-2">必吃特色</h3>
        <div className="space-y-2">
          {city.food.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#C8956C]/10 p-3">
              <div className="flex items-start justify-between">
                <h4 className="font-bold text-[#4A6670] text-sm">{item.name}</h4>
                <span className="text-xs text-[#C8956C]">{item.pricePerPerson}</span>
              </div>
              <p className="text-xs text-[#4A6670]/60 mt-1">{item.howToEat}</p>
              {item.pitfall && (
                <p className="text-xs text-amber-600 mt-1 flex items-start gap-1">
                  <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" /> {item.pitfall}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      {city.foodAreas && city.foodAreas.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-[#4A6670]/50 uppercase tracking-wider mb-2">本地人美食街区</h3>
          <div className="space-y-2">
            {city.foodAreas.map((area, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#C8956C]/10 p-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-[#4A6670] text-sm">{area.name}</h4>
                  <span className="text-[10px] text-[#4A6670]/40">{area.bestTime}</span>
                </div>
                <p className="text-xs text-[#4A6670]/40 mt-0.5">{area.location}</p>
                <p className="text-xs text-[#4A6670]/60 mt-1">{area.direction}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** 好逛Tab */
function ShopTab({ city }: { city: CityGuide }) {
  const grouped: Record<string, typeof city.shopping> = {};
  city.shopping.forEach((s) => {
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push(s);
  });

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat}>
          <h3 className="text-xs font-semibold text-[#4A6670]/50 uppercase tracking-wider mb-2">
            {shopCategoryLabels[cat] || cat}
          </h3>
          <div className="space-y-2">
            {items.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#C8956C]/10 p-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-[#4A6670] text-sm">{item.name}</h4>
                  <span className="text-[10px] text-[#4A6670]/40">{item.forWho}</span>
                </div>
                <p className="text-xs text-[#4A6670]/60 mt-1">{item.highlight}</p>
                {item.duration && (
                  <span className="flex items-center gap-1 text-[10px] text-[#4A6670]/40 mt-1">
                    <Clock className="w-3 h-3" /> {item.duration}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** 避坑Tab */
function PitfallTab({ city }: { city: CityGuide }) {
  const grouped: Record<string, typeof city.pitfalls> = {};
  city.pitfalls.forEach((p) => {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  });

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([cat, items]) => {
        const meta = pitfallCategoryLabels[cat];
        return (
          <div key={cat}>
            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium mb-2 border ${meta?.color || "bg-gray-50 text-gray-600"}`}>
              {meta?.icon} {meta?.label || cat}
            </div>
            <div className="space-y-2">
              {items.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-[#C8956C]/10 p-3">
                  <p className="text-sm text-[#4A6670] leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** 行程视图 */
function ItineraryView({ city, mode }: { city: CityGuide; mode: "easy" | "intense" }) {
  const days = city.itinerary[mode];
  if (!days || days.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#C8956C]/10 p-4 text-center">
        <p className="text-sm text-[#4A6670]/40">暂无{mode === "easy" ? "轻松版" : "暴走版"}行程</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {days.map((day, i) => (
        <div key={i} className="bg-white rounded-xl border border-[#C8956C]/10 overflow-hidden">
          <div className="bg-[#F5EDE4] px-3 py-2 flex items-center justify-between">
            <span className="font-bold text-[#C8956C] text-sm">{day.label}</span>
            <span className="text-[10px] text-[#4A6670]/40 flex items-center gap-1">
              <Users className="w-3 h-3" /> {day.walkLevel}
            </span>
          </div>
          <div className="p-3 space-y-2">
            {[
              { label: "上午", items: day.morning },
              { label: "下午", items: day.afternoon },
              { label: "晚上", items: day.evening.filter(Boolean) },
            ].map(({ label, items }) => {
              if (items.length === 0) return null;
              return (
                <div key={label} className="flex items-start gap-2">
                  <span className="text-[10px] text-[#4A6670]/40 w-8 shrink-0 pt-0.5">{label}</span>
                  <div className="flex-1">
                    {items.map((item, j) => (
                      <span key={j} className="text-xs text-[#4A6670]">
                        {j > 0 && <ChevronRight className="inline w-3 h-3 text-[#C8956C]/40 mx-0.5" />}
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
            <div className="flex items-center gap-3 text-[10px] text-[#4A6670]/40 mt-1 pt-1 border-t border-[#C8956C]/5">
              <span className="flex items-center gap-1"><Train className="w-3 h-3" /> {day.transport}</span>
              {day.nearbyFood && <span className="flex items-center gap-1"><Utensils className="w-3 h-3" /> {day.nearbyFood}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
