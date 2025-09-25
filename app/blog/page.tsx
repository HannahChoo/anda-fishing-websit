"use client"

import Link from "next/link"
import { ChevronDown, Heart } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"
import { FadeInOnScroll } from "@/components/FadeInOnScroll"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

interface Translation {
  // Navigation translations
  home: string;
  aboutUs: string;
  blog: string;
  hardLure: string;
  softLure: string;
  metalLure: string;
  squidLure: string;
  accessory: string;
  // Blog page translations
  backToHome: string;
  blogTitle: string;
  blogSubtitle: string;
  readMore: string;
  publishedOn: string;
  by: string;
  categories: string;
  allPosts: string;
  // Product category translations
  jerkbait: string;
  crankBait: string;
  topWater: string;
  live: string;
  adstSeries: string;
  shrimp: string;
  craw: string;
  shinerSeries: string;
  shadSeries: string;
  gobySeries: string;
  fmSeries: string;
  splitTail: string;
  nfSeries: string;
  worm: string;
  softShad: string;
  grub: string;
  ftSeries: string;
  ptSeries: string;
  frog: string;
  spinner: string;
  garfish: string;
  metalShad: string;
  egiSeries: string;
  lsSeries: string;
  mslSeries: string;
}

const translations: Record<string, Translation> = {
  en: {
    // Navigation translations
    home: "HOME",
    aboutUs: "ABOUT US",
    blog: "BLOG",
    hardLure: "HARD LURE",
    softLure: "SOFT LURE",
    metalLure: "METAL LURE",
    squidLure: "SQUID LURE",
    accessory: "ACCESSORY",
    // Blog page translations
    backToHome: "Back to Home",
    blogTitle: "Latest News & Events",
    blogSubtitle: "Stay updated with the latest fishing industry news, product launches, and company events",
    readMore: "Read More",
    publishedOn: "Published on",
    by: "by",
    categories: "Categories",
    allPosts: "All Posts",
    // Product category translations
    jerkbait: "JERKBAIT",
    crankBait: "CRANK BAIT",
    topWater: "TOP WATER",
    live: "LIVE",
    adstSeries: "ADST SERIES",
    shrimp: "SHRIMP",
    craw: "CRAW",
    shinerSeries: "SHINER SERIES",
    shadSeries: "SHAD SERIES",
    gobySeries: "GOBY SERIES",
    fmSeries: "FM SERIES",
    splitTail: "SPLIT TAIL",
    nfSeries: "NF SERIES",
    worm: "WORM",
    softShad: "SOFT SHAD",
    grub: "GRUB",
    ftSeries: "FT SERIES",
    ptSeries: "PT SERIES",
    frog: "FROG",
    spinner: "SPINNER",
    garfish: "GARFISH",
    metalShad: "METAL SHAD",
    egiSeries: "EGI SERIES",
    lsSeries: "LS SERIES",
    mslSeries: "MSL SERIES",
  },
  zh: {
    // Navigation translations
    home: "首页",
    aboutUs: "关于我们",
    blog: "博客",
    hardLure: "硬饵",
    softLure: "软饵",
    metalLure: "金属饵",
    squidLure: "鱿鱼饵",
    accessory: "配件",
    // Blog page translations
    backToHome: "返回首页",
    blogTitle: "最新资讯与活动",
    blogSubtitle: "了解最新的钓鱼行业资讯、产品发布和公司活动",
    readMore: "阅读更多",
    publishedOn: "发布于",
    by: "作者",
    categories: "分类",
    allPosts: "所有文章",
    // Product category translations
    jerkbait: "抽停饵",
    crankBait: "摇摆饵",
    topWater: "水面系",
    live: "仿真活饵",
    adstSeries: "ADST系列",
    shrimp: "虾型",
    craw: "爬虫型",
    shinerSeries: "闪亮系列",
    shadSeries: "鲱鱼系列",
    gobySeries: "虾虎鱼系列",
    fmSeries: "FM系列",
    splitTail: "分叉尾",
    nfSeries: "NF系列",
    worm: "蠕虫型",
    softShad: "软鲱鱼",
    grub: "蛆型",
    ftSeries: "FT系列",
    ptSeries: "PT系列",
    frog: "青蛙型",
    spinner: "旋转亮片",
    garfish: "针鱼型",
    metalShad: "金属鲱鱼",
    egiSeries: "EGI系列",
    lsSeries: "LS系列",
    mslSeries: "MSL系列",
  },
  ja: {
    // Navigation translations
    home: "ホーム",
    aboutUs: "会社概要",
    blog: "ブログ",
    hardLure: "ハードルアー",
    softLure: "ソフトルアー",
    metalLure: "メタルルアー",
    squidLure: "イカルアー",
    accessory: "アクセサリー",
    // Blog page translations
    backToHome: "ホームに戻る",
    blogTitle: "最新ニュースとイベント",
    blogSubtitle: "釣り業界の最新ニュース、製品発表、会社イベントをお見逃しなく",
    readMore: "続きを読む",
    publishedOn: "公開日",
    by: "著者",
    categories: "カテゴリー",
    allPosts: "すべての投稿",
    // Product category translations
    jerkbait: "ジャークベイト",
    crankBait: "クランクベイト",
    topWater: "トップウォーター",
    live: "ライブベイト",
    adstSeries: "ADSTシリーズ",
    shrimp: "シュリンプ",
    craw: "クロウ",
    shinerSeries: "シャイナーシリーズ",
    shadSeries: "シャッドシリーズ",
    gobySeries: "ゴビーシリーズ",
    fmSeries: "FMシリーズ",
    splitTail: "スプリットテール",
    nfSeries: "NFシリーズ",
    worm: "ワーム",
    softShad: "ソフトシャッド",
    grub: "グラブ",
    ftSeries: "FTシリーズ",
    ptSeries: "PTシリーズ",
    frog: "フロッグ",
    spinner: "スピナー",
    garfish: "ガーフィッシュ",
    metalShad: "メタルシャッド",
    egiSeries: "EGIシリーズ",
    lsSeries: "LSシリーズ",
    mslSeries: "MSLシリーズ",
  },
  ko: {
    // Navigation translations
    home: "홈",
    aboutUs: "회사소개",
    blog: "블로그",
    hardLure: "하드루어",
    softLure: "소프트루어",
    metalLure: "메탈루어",
    squidLure: "오징어루어",
    accessory: "액세서리",
    // Blog page translations
    backToHome: "홈으로 돌아가기",
    blogTitle: "최신 뉴스 및 이벤트",
    blogSubtitle: "최신 낚시 업계 뉴스, 제품 출시 및 회사 이벤트를 놓치지 마세요",
    readMore: "더 읽기",
    publishedOn: "게시일",
    by: "작성자",
    categories: "카테고리",
    allPosts: "모든 게시물",
    // Product category translations
    jerkbait: "저크베이트",
    crankBait: "크랭크베이트",
    topWater: "탑워터",
    live: "라이브",
    adstSeries: "ADST시리즈",
    shrimp: "쉬림프",
    craw: "크로우",
    shinerSeries: "샤이너시리즈",
    shadSeries: "샤드시리즈",
    gobySeries: "고비시리즈",
    fmSeries: "FM시리즈",
    splitTail: "스플릿테일",
    nfSeries: "NF시리즈",
    worm: "웜",
    softShad: "소프트샤드",
    grub: "그럽",
    ftSeries: "FT시리즈",
    ptSeries: "PT시리즈",
    frog: "프로그",
    spinner: "스피너",
    garfish: "가피시",
    metalShad: "메탈샤드",
    egiSeries: "EGI시리즈",
    lsSeries: "LS시리즈",
    mslSeries: "MSL시리즈",
  },
  es: {
    // Navigation translations
    home: "INICIO",
    aboutUs: "ACERCA DE",
    blog: "BLOG",
    hardLure: "SEÑUELO DURO",
    softLure: "SEÑUELO BLANDO",
    metalLure: "SEÑUELO METÁLICO",
    squidLure: "SEÑUELO CALAMAR",
    accessory: "ACCESORIO",
    // Blog page translations
    backToHome: "Volver al Inicio",
    blogTitle: "Últimas Noticias y Eventos",
    blogSubtitle: "Mantente actualizado con las últimas noticias de la industria pesquera, lanzamientos de productos y eventos de la empresa",
    readMore: "Leer Más",
    publishedOn: "Publicado el",
    by: "por",
    categories: "Categorías",
    allPosts: "Todos los Posts",
    // Product category translations
    jerkbait: "JERKBAIT",
    crankBait: "CRANKBAIT",
    topWater: "TOPWATER",
    live: "LIVE",
    adstSeries: "ADST SERIES",
    shrimp: "SHRIMP",
    craw: "CRAW",
    shinerSeries: "SHINER SERIES",
    shadSeries: "SHAD SERIES",
    gobySeries: "GOBY SERIES",
    fmSeries: "FM SERIES",
    splitTail: "SPLIT TAIL",
    nfSeries: "NF SERIES",
    worm: "WORM",
    softShad: "SOFT SHAD",
    grub: "GRUB",
    ftSeries: "FT SERIES",
    ptSeries: "PT SERIES",
    frog: "FROG",
    spinner: "SPINNER",
    garfish: "GARFISH",
    metalShad: "METAL SHAD",
    egiSeries: "EGI SERIES",
    lsSeries: "LS SERIES",
    mslSeries: "MSL SERIES",
  },
  tr: {
    // Navigation translations
    home: "ANA SAYFA",
    aboutUs: "HAKKIMIZDA",
    blog: "BLOG",
    hardLure: "SERT YEM",
    softLure: "YUMUŞAK YEM",
    metalLure: "METAL YEM",
    squidLure: "KALAMAR YEMİ",
    accessory: "AKSESUAR",
    // Blog page translations
    backToHome: "Ana Sayfaya Dön",
    blogTitle: "Son Haberler ve Etkinlikler",
    blogSubtitle: "Balıkçılık sektöründeki son haberler, ürün lansmanları ve şirket etkinlikleri hakkında güncel kalın",
    readMore: "Devamını Oku",
    publishedOn: "Yayınlanma Tarihi",
    by: "yazar",
    categories: "Kategoriler",
    allPosts: "Tüm Yazılar",
    // Product category translations
    jerkbait: "JERKBAIT",
    crankBait: "CRANKBAIT",
    topWater: "TOPWATER",
    live: "LIVE",
    adstSeries: "ADST SERİSİ",
    shrimp: "SHRIMP",
    craw: "CRAW",
    shinerSeries: "SHINER SERİSİ",
    shadSeries: "SHAD SERİSİ",
    gobySeries: "GOBY SERİSİ",
    fmSeries: "FM SERİSİ",
    splitTail: "SPLIT TAIL",
    nfSeries: "NF SERİSİ",
    worm: "WORM",
    softShad: "SOFT SHAD",
    grub: "GRUB",
    ftSeries: "FT SERİSİ",
    ptSeries: "PT SERİSİ",
    frog: "FROG",
    spinner: "SPINNER",
    garfish: "GARFISH",
    metalShad: "METAL SHAD",
    egiSeries: "EGI SERİSİ",
    lsSeries: "LS SERİSİ",
    mslSeries: "MSL SERİSİ",
  },
  ru: {
    // Navigation translations
    home: "ГЛАВНАЯ",
    aboutUs: "О НАС",
    blog: "БЛОГ",
    hardLure: "ТВЁРДАЯ ПРИМАНКА",
    softLure: "МЯГКАЯ ПРИМАНКА",
    metalLure: "МЕТАЛЛИЧЕСКАЯ ПРИМАНКА",
    squidLure: "ПРИМАНКА ДЛЯ КАЛЬМАРА",
    accessory: "АКСЕССУАРЫ",
    // Blog page translations
    backToHome: "На главную",
    blogTitle: "Последние новости и события",
    blogSubtitle: "Будьте в курсе последних новостей рыболовной отрасли, запусков продуктов и корпоративных событий",
    readMore: "Читать далее",
    publishedOn: "Опубликовано",
    by: "автор",
    categories: "Категории",
    allPosts: "Все посты",
    // Product category translations
    jerkbait: "ДЖЕРКБЕЙТ",
    crankBait: "КРЕНКБЕЙТ",
    topWater: "ТОПВОДЕР",
    live: "ЛАЙВ",
    adstSeries: "ADST СЕРИЯ",
    shrimp: "ШРИМП",
    craw: "КРОУ",
    shinerSeries: "ШАЙНЕР СЕРИЯ",
    shadSeries: "ШАД СЕРИЯ",
    gobySeries: "ГОБИ СЕРИЯ",
    fmSeries: "FM СЕРИЯ",
    splitTail: "СПЛИТ ТЕЙЛ",
    nfSeries: "NF СЕРИЯ",
    worm: "ВОРМ",
    softShad: "СОФТ ШАД",
    grub: "ГРАБ",
    ftSeries: "FT СЕРИЯ",
    ptSeries: "PT СЕРИЯ",
    frog: "ФРОГ",
    spinner: "СПИННЕР",
    garfish: "ГАРФИШ",
    metalShad: "МЕТАЛ ШАД",
    egiSeries: "EGI СЕРИЯ",
    lsSeries: "LS СЕРИЯ",
    mslSeries: "MSL СЕРИЯ",
  },
  pt: {
    // Navigation translations
    home: "INÍCIO",
    aboutUs: "SOBRE NÓS",
    blog: "BLOG",
    hardLure: "ISCA RÍGIDA",
    softLure: "ISCA MACIA",
    metalLure: "ISCA METÁLICA",
    squidLure: "ISCA PARA LULA",
    accessory: "ACESSÓRIOS",
    // Blog page translations
    backToHome: "Voltar para o Início",
    blogTitle: "Últimas Notícias e Eventos",
    blogSubtitle: "Mantenha-se atualizado com as últimas notícias da indústria pesqueira, lançamentos de produtos e eventos da empresa",
    readMore: "Ler Mais",
    publishedOn: "Publicado em",
    by: "por",
    categories: "Categorias",
    allPosts: "Todos os Posts",
    // Product category translations
    jerkbait: "JERKBAIT",
    crankBait: "CRANKBAIT",
    topWater: "TOPWATER",
    live: "LIVE",
    adstSeries: "ADST SÉRIE",
    shrimp: "SHRIMP",
    craw: "CRAW",
    shinerSeries: "SHINER SÉRIE",
    shadSeries: "SHAD SÉRIE",
    gobySeries: "GOBY SÉRIE",
    fmSeries: "FM SÉRIE",
    splitTail: "SPLIT TAIL",
    nfSeries: "NF SÉRIE",
    worm: "WORM",
    softShad: "SOFT SHAD",
    grub: "GRUB",
    ftSeries: "FT SÉRIE",
    ptSeries: "PT SÉRIE",
    frog: "FROG",
    spinner: "SPINNER",
    garfish: "GARFISH",
    metalShad: "METAL SHAD",
    egiSeries: "EGI SÉRIE",
    lsSeries: "LS SÉRIE",
    mslSeries: "MSL SÉRIE",
  },
}

// Blog posts data
const blogPosts: BlogPost[] = [
]

export default function BlogPage() {
  const { language } = useLanguage()
  const t = translations[language]

  // Function to translate product names while keeping brand codes untranslated
  const translateProductName = (item: string) => {
    const words = item.toLowerCase().split(' ')
    const camelCaseKey = words[0] + words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')
    return (t as any)[camelCaseKey] || item
  }

  // Function to get the correct URL slug for a product
  const getProductSlug = (item: string) => {
    return item.toLowerCase().replace(/\s+/g, "-")
  }

  const hardLureItems = ["JERKBAIT", "CRANK BAIT", "TOP WATER", "LIVE"]
  const softLureItems = [
    "ADST SERIES",
    "SHRIMP",
    "CRAW",
    "SHINER SERIES",
    "SHAD SERIES",
    "GOBY SERIES",
    "FM SERIES",
    "SPLIT TAIL",
    "NF SERIES",
    "WORM",
    "SOFT SHAD",
    "GRUB",
    "FT SERIES",
    "PT SERIES",
    "FROG",
  ]
  const metalLureItems = ["SPINNER", "GARFISH", "METAL SHAD"]
  const squidLureItems = ["EGI SERIES", "LS SERIES"]
  const accessoryItems = ["MSL SERIES"]
  const [wishlistCount, setWishlistCount] = useState<number>(0)
  const navHeartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('wishlist')
    if (saved) setWishlistCount(JSON.parse(saved).length)
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'wishlist') {
        try { setWishlistCount(e.newValue ? JSON.parse(e.newValue).length : 0) } catch {}
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-blue-600 flex-shrink-0">
              <img src="/images/anda-logo.png" alt="ANDA Logo" className="h-8 w-auto" />
            </Link>

            {/* Navigation */}
            <nav className={`hidden lg:flex items-center ml-16 ${language === 'ru' ? 'space-x-10' : 'space-x-16 whitespace-nowrap'}`}>
              <Link href="/" className="text-sm font-small hover:text-blue-600">
                {t.home}
              </Link>

                             <Link href="/about" className="text-sm font-small hover:text-blue-600">
                 {t.aboutUs}
               </Link>

              {/* Hard Lure Dropdown */}
              <div className="relative group">
                <button className="text-sm font-small hover:text-blue-600 flex items-center gap-1">
                  {t.hardLure}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    {hardLureItems.map((item) => (
                      <Link
                        key={item}
                        href={`/category/${getProductSlug(item)}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {translateProductName(item)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Soft Lure Dropdown */}
              <div className="relative group">
                <button className="text-sm font-small hover:text-blue-600 flex items-center gap-1">
                  {t.softLure}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 max-h-96 overflow-y-auto">
                  <div className="py-2">
                    {softLureItems.map((item) => (
                      <Link
                        key={item}
                        href={`/category/${getProductSlug(item)}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {translateProductName(item)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metal Lure Dropdown */}
              <div className="relative group">
                <button className="text-sm font-small hover:text-blue-600 flex items-center gap-1">
                  {t.metalLure}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    {metalLureItems.map((item) => (
                      <Link
                        key={item}
                        href={`/category/${getProductSlug(item)}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {translateProductName(item)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Squid Lure Dropdown */}
              <div className="relative group">
                <button className="text-sm font-small hover:text-blue-600 flex items-center gap-1">
                  {t.squidLure}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    {squidLureItems.map((item) => (
                      <Link
                        key={item}
                        href={`/category/${getProductSlug(item)}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {translateProductName(item)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Accessory Dropdown */}
              <div className="relative group">
                <button className="text-sm font-small hover:text-blue-600 flex items-center gap-1">
                  {t.accessory}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    {accessoryItems.map((item) => (
                      <Link
                        key={item}
                        href={`/category/${getProductSlug(item)}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {translateProductName(item)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Language + Wishlist (stacked) */}
            <div className="ml-8 flex flex-col items-start">
              <LanguageSelector />
              <div ref={navHeartRef} className="mt-2">
                <Link href="/wishlist" className="inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 [&_svg]:size-3">
                  <Heart className="h-4 w-4 text-red-500" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1920&text=Blog+Hero"
            alt="Blog hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative z-10 mx-auto flex min-h-[400px] flex-col items-center justify-center px-4 py-20 text-center text-white sm:px-6 lg:px-8">
          <FadeInOnScroll delay={0.1}>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{t.blogTitle}</h1>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.3}>
            <p className="mb-10 max-w-2xl text-lg text-gray-200 sm:text-xl">
              {t.blogSubtitle}
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post, index) => (
                <FadeInOnScroll key={post.id} delay={0.1 * index}>
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-2 text-sm text-gray-500">
                        {t.publishedOn} {new Date(post.date).toLocaleDateString()} {t.by} {post.author}
                      </div>
                      <h3 className="mb-3 text-xl font-semibold text-gray-900">{post.title}</h3>
                      <p className="mb-4 text-gray-600">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                          {post.category}
                        </span>
                        <Link
                          href={`/blog/${post.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {t.readMore}
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </FadeInOnScroll>
              ))}
            </div>
          ) : (
            <FadeInOnScroll>
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Blog Posts Yet</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  We're working on bringing you the latest news and updates. Check back soon for exciting content about our fishing products and industry insights.
                </p>
              </div>
            </FadeInOnScroll>
          )}
        </div>
      </section>
    </div>
  )
}