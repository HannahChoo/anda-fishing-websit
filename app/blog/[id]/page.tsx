"use client"

import React from "react"
import Link from "next/link"
import { ChevronDown, Share2, Linkedin, Mail, MessageCircle, Heart } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"
import { FadeInOnScroll } from "@/components/FadeInOnScroll"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { notFound } from "next/navigation"

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image:string;
  images: string[];
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
  // Blog detail page translations
  publishedOn: string;
  by: string;
  category: string;
  relatedPosts: string;
  shareThis: string;
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
    // Blog detail page translations
    publishedOn: "Published on",
    by: "by",
    category: "Category",
    relatedPosts: "Related Posts",
    shareThis: "Share this post",
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
    // Blog detail page translations
    publishedOn: "发布于",
    by: "作者",
    category: "分类",
    relatedPosts: "相关文章",
    shareThis: "分享此文章",
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
    // Blog detail page translations
    publishedOn: "公開日",
    by: "著者",
    category: "カテゴリー",
    relatedPosts: "関連記事",
    shareThis: "この記事をシェア",
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
    // Blog detail page translations
    publishedOn: "게시일",
    by: "작성자",
    category: "카테고리",
    relatedPosts: "관련 게시물",
    shareThis: "이 게시물 공유",
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
    // Blog detail page translations
    publishedOn: "Publicado el",
    by: "por",
    category: "Categoría",
    relatedPosts: "Posts Relacionados",
    shareThis: "Compartir este post",
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
    // Blog detail page translations
    publishedOn: "Yayınlanma Tarihi",
    by: "yazar",
    category: "Kategori",
    relatedPosts: "İlgili Yazılar",
    shareThis: "Bu yazıyı paylaş",
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
    // Blog detail page translations
    publishedOn: "Опубликовано",
    by: "автор",
    category: "Категория",
    relatedPosts: "Похожие посты",
    shareThis: "Поделиться этим постом",
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
    // Blog detail page translations
    publishedOn: "Publicado em",
    by: "por",
    category: "Categoria",
    relatedPosts: "Posts Relacionados",
    shareThis: "Compartilhar este post",
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

// Sample blog posts data (same as in blog page)
const blogPosts: BlogPost[] = [
]

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { language } = useLanguage()
  const t = translations[language]

  // Unwrap params using React.use()
  const resolvedParams = React.use(params)

  // Find the blog post by ID
  const post = blogPosts.find(p => p.id === resolvedParams.id)

  // If post not found, show 404
  if (!post) {
    notFound()
  }

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
    const saved = typeof window !== 'undefined' ? localStorage.getItem('wishlist') : null
    if (saved) setWishlistCount(JSON.parse(saved).length)
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'wishlist') {
        try { setWishlistCount(e.newValue ? JSON.parse(e.newValue).length : 0) } catch {}
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3)

  // Sharing functions
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = post.title
  const shareText = post.excerpt

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  const shareToX = () => {
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`
    window.open(url, '_blank')
  }

  const shareToWeChat = () => {
    // For WeChat, we'll show a QR code or copy link functionality
    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareTitle} ${shareUrl}`)
      alert('Link copied to clipboard! You can now share it on WeChat.')
    }
  }

  const shareViaEmail = () => {
    const subject = encodeURIComponent(shareTitle)
    const body = encodeURIComponent(`${shareText}\n\nRead more: ${shareUrl}`)
    const url = `mailto:?subject=${subject}&body=${body}`
    window.location.href = url
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    alert('Link copied to clipboard!')
  }

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

      {/* Blog Post Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Post Header */}
            <FadeInOnScroll>
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <span>{t.publishedOn} {new Date(post.date).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{t.by} {post.author}</span>
                  <span className="mx-2">•</span>
                  <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                    {post.category}
                  </span>
                </div>
              </div>
            </FadeInOnScroll>

            {/* Featured Image */}
            <FadeInOnScroll delay={0.2}>
              <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </FadeInOnScroll>

            {/* Post Content */}
            <FadeInOnScroll delay={0.3}>
              <div className="prose prose-lg max-w-none">
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeInOnScroll>

            {/* Additional Images Gallery */}
            {post.images && post.images.length > 0 && (
              <FadeInOnScroll delay={0.4}>
                <div className="mt-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {post.images.map((image, index) => (
                      <div key={index} className="relative h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <Image
                          src={image}
                          alt={`${post.title} - Image ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInOnScroll>
            )}

            {/* Share Section */}
            <FadeInOnScroll delay={0.4}>
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.shareThis}</h3>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={shareToFacebook}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>
                  <button 
                    onClick={shareToX}
                    className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    X
                  </button>
                  <button 
                    onClick={shareToLinkedIn}
                    className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </button>
                  <button 
                    onClick={shareToWhatsApp}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    WhatsApp
                  </button>

                  <button 
                    onClick={shareViaEmail}
                    className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </button>
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Copy Link
                  </button>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <FadeInOnScroll>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.relatedPosts}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost, index) => (
                    <FadeInOnScroll key={relatedPost.id} delay={0.1 * index}>
                      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{relatedPost.title}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-3">{relatedPost.excerpt}</p>
                          <Link
                            href={`/blog/${relatedPost.id}`}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Read More →
                          </Link>
                        </CardContent>
                      </Card>
                    </FadeInOnScroll>
                  ))}
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}