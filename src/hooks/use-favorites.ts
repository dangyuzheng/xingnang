"use client";

import { useState, useEffect, useCallback } from "react";
import type { CityGuide } from "@/lib/city-data";

const STORAGE_KEY = "travel-favorites";

function getStoredFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getStoredFavorites());
  }, []);

  const toggleFavorite = useCallback((cityId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(cityId)
        ? prev.filter((id) => id !== cityId)
        : [...prev, cityId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (cityId: string) => favorites.includes(cityId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}
