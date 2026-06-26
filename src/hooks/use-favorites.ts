"use client";

import { useState, useEffect, useCallback } from "react";

export type VisitStatus = "want_to_go" | "been_there" | "none";

export interface FavoriteList {
  id: string;
  name: string;
  cityIds: string[];
  createdAt: number;
}

export interface CityFootprint {
  cityId: string;
  status: VisitStatus;
  visitedAt?: string;
  cost?: string;
  rating?: number;
}

interface FavoritesState {
  lists: FavoriteList[];
  footprints: CityFootprint[];
}

const STORAGE_KEY = "xingnang_favorites_v2";

function loadState(): FavoritesState {
  if (typeof window === "undefined") return { lists: [], footprints: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return { lists: [], footprints: [] };
}

function saveState(state: FavoritesState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useFavorites() {
  const [state, setState] = useState<FavoritesState>({ lists: [], footprints: [] });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setState(loadState());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveState(state);
  }, [state, loaded]);

  // 创建收藏夹
  const createList = useCallback((name: string) => {
    setState((prev) => ({
      ...prev,
      lists: [
        ...prev.lists,
        { id: `list_${Date.now()}`, name, cityIds: [], createdAt: Date.now() },
      ],
    }));
  }, []);

  // 删除收藏夹
  const deleteList = useCallback((listId: string) => {
    setState((prev) => ({
      ...prev,
      lists: prev.lists.filter((l) => l.id !== listId),
    }));
  }, []);

  // 重命名收藏夹
  const renameList = useCallback((listId: string, name: string) => {
    setState((prev) => ({
      ...prev,
      lists: prev.lists.map((l) => (l.id === listId ? { ...l, name } : l)),
    }));
  }, []);

  // 添加城市到收藏夹
  const addToList = useCallback((listId: string, cityId: string) => {
    setState((prev) => ({
      ...prev,
      lists: prev.lists.map((l) =>
        l.id === listId && !l.cityIds.includes(cityId)
          ? { ...l, cityIds: [...l.cityIds, cityId] }
          : l
      ),
    }));
  }, []);

  // 从收藏夹移除城市
  const removeFromList = useCallback((listId: string, cityId: string) => {
    setState((prev) => ({
      ...prev,
      lists: prev.lists.map((l) =>
        l.id === listId ? { ...l, cityIds: l.cityIds.filter((id) => id !== cityId) } : l
      ),
    }));
  }, []);

  // 城市是否在任一收藏夹
  const isFavorite = useCallback(
    (cityId: string) => state.lists.some((l) => l.cityIds.includes(cityId)),
    [state.lists]
  );

  // 获取城市所在的收藏夹
  const getCityLists = useCallback(
    (cityId: string) => state.lists.filter((l) => l.cityIds.includes(cityId)),
    [state.lists]
  );

  // 设置足迹状态
  const setFootprint = useCallback((cityId: string, status: VisitStatus, extra?: { visitedAt?: string; cost?: string; rating?: number }) => {
    setState((prev) => {
      const existing = prev.footprints.find((f) => f.cityId === cityId);
      const footprint: CityFootprint = {
        cityId,
        status,
        visitedAt: extra?.visitedAt,
        cost: extra?.cost,
        rating: extra?.rating,
      };
      if (existing) {
        return {
          ...prev,
          footprints: prev.footprints.map((f) => (f.cityId === cityId ? { ...f, ...footprint } : f)),
        };
      }
      return { ...prev, footprints: [...prev.footprints, footprint] };
    });
  }, []);

  // 获取足迹
  const getFootprint = useCallback(
    (cityId: string) => state.footprints.find((f) => f.cityId === cityId),
    [state.footprints]
  );

  // 已去过的城市ID列表（用于排除推荐）
  const visitedCityIds = state.footprints
    .filter((f) => f.status === "been_there")
    .map((f) => f.cityId);

  // 想去的城市ID列表
  const wantToGoCityIds = state.footprints
    .filter((f) => f.status === "want_to_go")
    .map((f) => f.cityId);

  // 对比模式
  const compareCities = useCallback(
    (cityIds: string[]) => {
      return cityIds.map((id) => {
        const list = state.lists.find((l) => l.cityIds.includes(id));
        const footprint = state.footprints.find((f) => f.cityId === id);
        return { cityId: id, listName: list?.name, footprint };
      });
    },
    [state.lists, state.footprints]
  );

  return {
    lists: state.lists,
    footprints: state.footprints,
    loaded,
    createList,
    deleteList,
    renameList,
    addToList,
    removeFromList,
    isFavorite,
    getCityLists,
    setFootprint,
    getFootprint,
    visitedCityIds,
    wantToGoCityIds,
    compareCities,
  };
}
