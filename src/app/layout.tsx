import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '行囊 | 旅行盲盒',
    template: '%s | 行囊',
  },
  description:
    '背上行囊，说走就走。随机推荐国内旅行目的地，包含最佳时间、避坑指南、好玩好吃好逛推荐。',
  keywords: [
    '旅行攻略',
    '国内旅游',
    '城市推荐',
    '避坑指南',
    '美食推荐',
  ],
  authors: [{ name: '行囊' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: '行囊 | 旅行盲盒',
    description:
      '不必纠结去哪，轻点开启旅行盲盒，随机邂逅一座城，收获全套游玩攻略。',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="zh-CN">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
