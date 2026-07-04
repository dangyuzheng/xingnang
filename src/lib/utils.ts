import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 颜色映射表：Tailwind 颜色类名 -> CSS 颜色值
const colorMap: Record<string, string> = {
  // Emerald
  'emerald-400': '#34d399',
  'emerald-300': '#6ee7b7',
  'emerald-200': '#a7f3d0',
  // Green
  'green-300': '#86efac',
  'green-200': '#bbf7d0',
  'green-100': '#dcfce7',
  // Amber
  'amber-300': '#fcd34d',
  'amber-200': '#fde68a',
  'amber-100': '#fef3c7',
  // Sky
  'sky-400': '#38bdf8',
  'sky-300': '#7dd3fc',
  'sky-200': '#bae6fd',
  'sky-100': '#e0f2fe',
  // Blue
  'blue-300': '#93c5fd',
  'blue-200': '#bfdbfe',
  'blue-100': '#dbeafe',
  // Pink
  'pink-300': '#f9a8d4',
  'pink-200': '#fbcfe8',
  'pink-100': '#fce7f3',
  // Rose
  'rose-400': '#fb7185',
  'rose-300': '#fda4af',
  'rose-200': '#fecdd3',
  // Red
  'red-400': '#f87171',
  'red-300': '#fca5a5',
  'red-200': '#fecaca',
  // Orange
  'orange-300': '#fdba74',
  'orange-200': '#fed7aa',
  'orange-100': '#ffedd5',
  // Purple
  'purple-300': '#d8b4fe',
  'purple-200': '#e9d5ff',
  'purple-100': '#f3e8ff',
  // Cyan
  'cyan-300': '#67e8f9',
  'cyan-200': '#a5f3fc',
  'cyan-100': '#cffafe',
  // Teal
  'teal-400': '#2dd4bf',
  'teal-300': '#5eead4',
  'teal-200': '#99f6e4',
  // Indigo
  'indigo-300': '#a5b4fc',
  'indigo-200': '#c7d2fe',
  'indigo-100': '#e0e7ff',
  // Violet
  'violet-300': '#c4b5fd',
  'violet-200': '#ddd6fe',
  'violet-100': '#ede9fe',
  // Yellow
  'yellow-300': '#fde047',
  'yellow-200': '#fef08a',
  'yellow-100': '#fef9c3',
  // Slate
  'slate-300': '#cbd5e1',
  'slate-200': '#e2e8f0',
  'slate-100': '#f1f5f9',
  // Gray
  'gray-300': '#d1d5db',
  'gray-200': '#e5e7eb',
  'gray-100': '#f3f4f6',
  // White
  'white': '#ffffff',
};

/**
 * 将 Tailwind 渐变类转换为 CSS 渐变字符串
 * 例如: "from-emerald-400 via-green-300 to-amber-200" -> "linear-gradient(to bottom right, #34d399, #86efac, #fde68a)"
 */
export function tailwindGradientToCSS(gradient: string): string {
  // 解析 from, via, to 颜色
  const fromMatch = gradient.match(/from-([a-z]+-\d+|white)/);
  const viaMatch = gradient.match(/via-([a-z]+-\d+|white)/);
  const toMatch = gradient.match(/to-([a-z]+-\d+|white)/);
  
  const fromColor = fromMatch ? colorMap[fromMatch[1]] || fromMatch[1] : '#ffffff';
  const viaColor = viaMatch ? colorMap[viaMatch[1]] || viaMatch[1] : null;
  const toColor = toMatch ? colorMap[toMatch[1]] || toMatch[1] : '#ffffff';
  
  // 构建渐变色数组
  const colors = [fromColor];
  if (viaColor) colors.push(viaColor);
  colors.push(toColor);
  
  return `linear-gradient(to bottom right, ${colors.join(', ')})`;
}
