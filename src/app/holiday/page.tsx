"use client";

import { useNavigate } from "react-router-dom";
import { allCities } from "@/lib/data-index";
import {
  ArrowLeft,
  AlertTriangle,
  MapPin,
  Shield,
  ChevronRight,
} from "lucide-react";

export default function HolidayPage() {
  const navigate = useNavigate();

  // 有节假日预警的城市
  const citiesWithWarning = allCities.filter((c) => c.holidayWarning);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <nav className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#C8956C]/10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white border border-[#C8956C]/10 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-[#4A6670]" />
          </button>
          <div>
            <h1 className="font-bold text-[#4A6670]">节假日避坑</h1>
            <p className="text-[10px] text-[#4A6670]/40">
              热门景区预警 + Plan B
            </p>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 pt-6 pb-20">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-300 flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-[#4A6670] text-sm">节假日出行预警</h2>
            <p className="text-xs text-[#4A6670]/50 mt-0.5">
              法定节假日期间热门景区人流预警，同时推荐替代小众目的地
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {citiesWithWarning.map((city) => (
            <div
              key={city.id}
              className="bg-white rounded-xl border border-red-100 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${city.gradient} flex items-center justify-center`}
                    >
                      <span className="text-white font-bold text-xs">
                        {city.name[0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#4A6670] text-sm">
                        {city.name}
                      </h3>
                      <span className="text-[10px] text-[#4A6670]/40">
                        {city.province}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/city/${city.id}`)}
                    className="text-[#C8956C]"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-red-50 rounded-lg p-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-700">{city.holidayWarning}</p>
                </div>
                {city.holidayAlternative && (
                  <div className="bg-green-50 rounded-lg p-3 flex items-start gap-2 mt-2">
                    <MapPin className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-green-700 font-medium">
                        Plan B 替代方案
                      </p>
                      <p className="text-xs text-green-600 mt-0.5">
                        {city.holidayAlternative}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
