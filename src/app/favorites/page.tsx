"use client";

import { useRouter } from "next/navigation";
import { allCities } from "@/lib/data-index";
import { useFavorites } from "@/hooks/use-favorites";
import {
  ArrowLeft,
  Heart,
  Star,
  CheckCircle2,
  Plus,
  Trash2,
  ListChecks,
  AlertTriangle,
  MapPin,
} from "lucide-react";

export default function FavoritesPage() {
  const router = useRouter();
  const { lists, createList, deleteList, renameList, setFootprint, getFootprint, footprints } = useFavorites();

  // 想去/去过分组
  const wantToGo = footprints.filter((f) => f.status === "want_to_go");
  const beenThere = footprints.filter((f) => f.status === "been_there");

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <nav className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#C8956C]/10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white border border-[#C8956C]/10 flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-[#4A6670]" />
          </button>
          <h1 className="font-bold text-[#4A6670]">我的收藏</h1>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 pt-6 pb-20">
        {/* 想去 / 去过 */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gradient-to-br from-[#C8956C]/10 to-[#C8956C]/5 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-[#C8956C]" />
              <span className="font-bold text-[#4A6670] text-sm">想去</span>
              <span className="text-xs text-[#4A6670]/40">{wantToGo.length}</span>
            </div>
            {wantToGo.length === 0 ? (
              <p className="text-xs text-[#4A6670]/30">标记想去的目的地</p>
            ) : (
              <div className="space-y-1">
                {wantToGo.slice(0, 5).map((f) => {
                  const city = allCities.find((c) => c.id === f.cityId);
                  if (!city) return null;
                  return (
                    <button key={f.cityId} onClick={() => router.push(`/city/${city.id}`)} className="flex items-center gap-2 w-full text-left hover:bg-white/50 rounded p-1">
                      <MapPin className="w-3 h-3 text-[#C8956C]" />
                      <span className="text-xs text-[#4A6670]">{city.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <div className="bg-gradient-to-br from-[#4A6670]/10 to-[#4A6670]/5 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#4A6670]" />
              <span className="font-bold text-[#4A6670] text-sm">去过</span>
              <span className="text-xs text-[#4A6670]/40">{beenThere.length}</span>
            </div>
            {beenThere.length === 0 ? (
              <p className="text-xs text-[#4A6670]/30">标记去过的目的地</p>
            ) : (
              <div className="space-y-1">
                {beenThere.slice(0, 5).map((f) => {
                  const city = allCities.find((c) => c.id === f.cityId);
                  if (!city) return null;
                  return (
                    <button key={f.cityId} onClick={() => router.push(`/city/${city.id}`)} className="flex items-center gap-2 w-full text-left hover:bg-white/50 rounded p-1">
                      <CheckCircle2 className="w-3 h-3 text-[#4A6670]" />
                      <span className="text-xs text-[#4A6670]">{city.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* 收藏夹列表 */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-[#4A6670] text-sm flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-[#C8956C]" /> 我的清单
          </h2>
          <button
            onClick={() => {
              const name = prompt("请输入清单名称");
              if (name) createList(name);
            }}
            className="flex items-center gap-1 text-xs text-[#C8956C] hover:underline"
          >
            <Plus className="w-3 h-3" /> 新建
          </button>
        </div>

        {lists.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-[#C8956C]/10">
            <Heart className="w-12 h-12 text-[#C8956C]/20 mx-auto mb-3" />
            <p className="text-sm text-[#4A6670]/40">还没有收藏夹</p>
            <p className="text-xs text-[#4A6670]/30 mt-1">在目的地详情页点击收藏创建</p>
          </div>
        ) : (
          <div className="space-y-3">
            {lists.map((list) => (
              <div key={list.id} className="bg-white rounded-xl border border-[#C8956C]/10 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#E8655A]" />
                    <h3 className="font-bold text-[#4A6670] text-sm">{list.name}</h3>
                    <span className="text-xs text-[#4A6670]/40">{list.cityIds.length}个</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        const newName = prompt("重命名清单", list.name);
                        if (newName) renameList(list.id, newName);
                      }}
                      className="text-[10px] text-[#4A6670]/40 hover:text-[#C8956C]"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("确定删除此清单？")) deleteList(list.id);
                      }}
                      className="text-[10px] text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                {list.cityIds.length === 0 ? (
                  <p className="text-xs text-[#4A6670]/30">清单为空</p>
                ) : (
                  <div className="space-y-1.5">
                    {list.cityIds.map((cityId) => {
                      const city = allCities.find((c) => c.id === cityId);
                      if (!city) return null;
                      return (
                        <button
                          key={cityId}
                          onClick={() => router.push(`/city/${cityId}`)}
                          className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-[#FAF7F2] transition-colors text-left"
                        >
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${city.gradient} flex items-center justify-center shrink-0`}>
                            <span className="text-white font-bold text-xs">{city.name[0]}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-sm text-[#4A6670] font-medium">{city.name}</span>
                            <p className="text-[10px] text-[#4A6670]/40">{city.duration} · {city.budget}</p>
                          </div>
                          <ArrowLeft className="w-3 h-3 text-[#4A6670]/20 rotate-180" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
