"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Heart } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"
import { ImageCarousel } from "@/components/ImageCarousel"
import { FadeInOnScroll } from "@/components/FadeInOnScroll" // Ensure this import is correct

const translations = {
  en: {
    home: "HOME",
    aboutUs: "ABOUT US",
    hardLure: "HARD LURE",
    softLure: "SOFT LURE",
    metalLure: "METAL LURE",
    squidLure: "SQUID LURE",
    accessory: "ACCESSORY",
    welcomeTitle: "Professional Fishing Lures Manufacturer",
    welcomeSubtitle: "ANDA - Your Trusted Partner in Fishing Excellence",
    watchVideo: "Watch Our Story",
    aboutTitle: "About ANDA",
    aboutText:
      "ANDA（WEIHAI ANDA SPORTS LTD.）is a high quality OEM for fishing lures and fishing lures and fishing accessories, which is specialized in hard baits, soft baits, spinner baits, metal jigs and squid lures.",
    series: "SERIES",
    ourProductCategories: "Our Product Categories",
    eventNotifications: "Event Notifications",
    event1: "testxxxxxxxxxxx",
    event2: "testxxxxxxxxxxxxxxx",
    event3: "testxxxxxxxxxxxxxxxxx",
    readytoWWU: "Ready to work with us?",
    readyText: "Contact our team today to discuss how we can help you achieve your business goals",
    GetinT: "Get in touch",
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
    viewAll: "View All Event"
  },
  zh: {
    home: "首页",
    aboutUs: "关于我们",
    hardLure: "硬饵",
    softLure: "软饵",
    metalLure: "金属饵",
    squidLure: "鱿鱼饵",
    accessory: "配件",
    welcomeTitle: "专业渔具制造商",
    welcomeSubtitle: "ANDA - 您值得信赖的钓鱼伙伴",
    watchVideo: "观看我们的故事",
    aboutTitle: "关于ANDA",
    aboutText: "ANDA（威海安达体育用品有限公司）是高品质钓鱼拟饵及配件的OEM制造商，专注于硬饵、软饵、旋转亮片、金属铁板和鱿鱼饵的生产。",
    series: "系列",
    ourProductCategories: "我们的产品类别",
    eventNotifications: "活动通知",
    event1: "测试xxxxxxxx",
    event2: "测试xxxxxxxxxxxx",
    event3: "测试xxxxxxxxxxxxxx",
    readytoWWU: "准备好与我们合作了吗？",
    readyText: "立即联系我们的团队，探讨如何助您实现商业目标",
    GetinT: "联系我们",
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
    viewAll: "查看所有活动"
  },
  ja: {
    home: "ホーム",
    aboutUs: "会社概要",
    hardLure: "ハードルアー",
    softLure: "ソフトルアー",
    metalLure: "メタルルアー",
    squidLure: "イカルアー",
    accessory: "アクセサリー",
    welcomeTitle: "プロフェッショナル釣具メーカー",
    welcomeSubtitle: "ANDA - 信頼できる釣りパートナー",
    watchVideo: "ストーリーを見る",
    aboutTitle: "ANDAについて",
    aboutText:
      "ANDA（威海安達体育用品有限公司）は、ハードベイト、ソフトベイト、スピナーベイト、メタルジグ、イカ用ルアーを専門とする高品質釣り用擬似餌・アクセサリーのOEMメーカーです。",
    series: "シリーズ",
    ourProductCategories: "製品カテゴリー",
    eventNotifications: "イベント通知",
    event1: "テストxxxxxxxx",
    event2: "テストxxxxxxxxxxxx",
    event3: "テストxxxxxxxxxxxxxx",
    readytoWWU: "ご一緒に仕事をしませんか？",
    readyText: "ビジネス目標達成のご支援方法について、本日お問い合わせください",
    GetinT: "お問い合わせ",
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
    viewAll: "全てのイベントを見る"
  },
  ko: {
    home: "홈",
    aboutUs: "회사소개",
    hardLure: "하드루어",
    softLure: "소프트루어",
    metalLure: "메탈루어",
    squidLure: "오징어루어",
    accessory: "액세서리",
    welcomeTitle: "전문 낚시용품 제조업체",
    welcomeSubtitle: "ANDA - 신뢰할 수 있는 낚시 파트너",
    watchVideo: "스토리 보기",
    aboutTitle: "ANDA 소개",
    aboutText:
      "ANDA(웨이하이 ANDA 스포츠 유한공사)는 하드 베이트, 소프트 베이트, 스피너 베이트, 메탈 징, 오징어 루어 전문 고품질 낚시 미끼 및 액세서리 OEM 제조업체입니다.",
    series: "시리즈",
    ourProductCategories: "제품 카테고리",
    eventNotifications: "이벤트 알림",
    event1: "테스트xxxxxxxx",
    event2: "테스트xxxxxxxxxxxx",
    event3: "테스트xxxxxxxxxxxxxx",
    readytoWWU: "함께 일할 준비가 되셨나요?",
    readyText: "비즈니스 목표 달성을 위한 지원 방안을 논의하려면 오늘 저희 팀에 연락하세요",
    GetinT: "연락하기",
    // Product category translations
    jerkbait: "저크베이트",
    crankBait: "크랭크베이트", 
    topWater: "탑워터",
    live: "라이브",
    adstSeries: "ADST 시리즈",
    shrimp: "쉬림프",
    craw: "크로우",
    shinerSeries: "샤이너 시리즈",
    shadSeries: "샤드 시리즈",
    gobySeries: "고비 시리즈",
    fmSeries: "FM 시리즈",
    splitTail: "스플릿테일",
    nfSeries: "NF 시리즈",
    worm: "웜",
    softShad: "소프트샤드",
    grub: "그럽",
    ftSeries: "FT 시리즈",
    ptSeries: "PT 시리즈",
    frog: "프로그",
    spinner: "스피너",
    garfish: "가피시",
    metalShad: "메탈샤드",
    egiSeries: "EGI 시리즈",
    lsSeries: "LS 시리즈",
    mslSeries: "MSL 시리즈",
    viewAll: "모든 이벤트 보기"
  },
  es: {
    home: "INICIO",
    aboutUs: "ACERCA DE",
    hardLure: "SEÑUELO DURO",
    softLure: "SEÑUELO BLANDO",
    metalLure: "SEÑUELO METÁLICO",
    squidLure: "SEÑUELO CALAMAR",
    accessory: "ACCESORIO",
    welcomeTitle: "Fabricante Profesional de Señuelos",
    welcomeSubtitle: "ANDA - Su Socio de Confianza en Pesca",
    watchVideo: "Ver Nuestra Historia",
    aboutTitle: "Acerca de ANDA",
    aboutText:
      "ANDA (WEIHAI ANDA SPORTS LTD.) es un fabricante OEM de alta calidad de señuelos y accesorios de pesca, especializado en señuelos duros, blandos, spinnerbaits, jigs metálicos y señuelos para calamar.",
    series: "SERIES",
    ourProductCategories: "Nuestras Categorías",
    eventNotifications: "Notificaciones de Eventos",
    event1: "testxxxxxxxxxxx",
    event2: "testxxxxxxxxxxxxxxx",
    event3: "testxxxxxxxxxxxxxxxxx",
    readytoWWU: "¿Listo para trabajar con nosotros?",
    readyText: "Contacte a nuestro equipo hoy para discutir cómo podemos ayudarle a alcanzar sus objetivos comerciales",
    GetinT: "Contáctenos",
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
    viewAll: "Ver todos los eventos"
  },
  tr: {
    home: "ANA SAYFA",
    aboutUs: "HAKKIMIZDA",
    hardLure: "SERT YEM",
    softLure: "YUMUŞAK YEM",
    metalLure: "METAL YEM",
    squidLure: "KALAMAR YEMİ",
    accessory: "AKSESUAR",
    welcomeTitle: "Profesyonel Balık Yemi Üreticisi",
    welcomeSubtitle: "ANDA - Güvenilir Balıkçılık Partneriniz",
    watchVideo: "Hikayemizi İzleyin",
    aboutTitle: "ANDA Hakkında",
    aboutText: "ANDA (WEIHAI ANDA SPORTS LTD.), sert yemler, yumuşak yemler, spinnerbaits, metal jigler ve kalamar yemleri konusunda uzmanlaşmış, yüksek kaliteli balık yemi ve aksesuarları OEM üreticisidir.",
    series: "SERİLER",
    ourProductCategories: "Ürün Kategorileri",
    eventNotifications: "Etkinlik Duyuruları",
    event1: "testxxxxxxxxxxx",
    event2: "testxxxxxxxxxxxxxxx",
    event3: "testxxxxxxxxxxxxxxxxx",
    readytoWWU: "Bizimle çalışmaya hazır mısınız?",
    readyText: "İş hedeflerinize ulaşmanıza nasıl yardımcı olabileceğimizi görüşmek için bugün ekibimizle iletişime geçin",
    GetinT: "İletişime Geçin",
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
    viewAll: "Tüm Etkinlikleri Görüntüle"
  },
  ru: {
    home: "ГЛАВНАЯ",
    aboutUs: "О НАС",
    hardLure: "ТВЁРДАЯ ПРИМАНКА",
    softLure: "МЯГКАЯ ПРИМАНКА",
    metalLure: "МЕТАЛЛИЧЕСКАЯ ПРИМАНКА",
    squidLure: "ПРИМАНКА ДЛЯ КАЛЬМАРА",
    accessory: "АКСЕССУАРЫ",
    welcomeTitle: "Профессиональный Производитель Приманок",
    welcomeSubtitle: "ANDA — Ваш Надёжный Партнёр в Рыбалке",
    watchVideo: "Наша История",
    aboutTitle: "О ANDA",
    aboutText: "ANDA (WEIHAI ANDA SPORTS LTD.) — производитель премиум-класса рыболовных приманок и аксессуаров по схеме OEM, специализирующийся на твёрдых приманках, мягких приманках, спиннербейтах, металлических джигах и приманках для кальмара.",
    series: "СЕРИИ",
    ourProductCategories: "Категории Продукции",
    eventNotifications: "Уведомления о Событиях",
    event1: "тестxxxxxxxxxxx",
    event2: "тестxxxxxxxxxxxxxxx",
    event3: "тестxxxxxxxxxxxxxxxxx",
    readytoWWU: "Готовы сотрудничать с нами?",
    readyText: "Свяжитесь с нашей командой сегодня, чтобы обсудить достижение ваших бизнес-целей",
    GetinT: "Связаться",
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
    viewAll: "Просмотреть все мероприятия"
  },
  pt: {
    home: "INÍCIO",
    aboutUs: "SOBRE NÓS",
    hardLure: "ISCA RÍGIDA",
    softLure: "ISCA MACIA",
    metalLure: "ISCA METÁLICA",
    squidLure: "ISCA PARA LULA",
    accessory: "ACESSÓRIOS",
    welcomeTitle: "Fabricante Profissional de Iscas",
    welcomeSubtitle: "ANDA - Seu Parceiro Confiável em Pesca",
    watchVideo: "Conheça Nossa História",
    aboutTitle: "Sobre a ANDA",
    aboutText: "ANDA (WEIHAI ANDA SPORTS LTD.) é uma OEM de alta qualidade para iscas e acessórios de pesca, especializada em iscas rígidas, iscas macias, spinnerbaits, jigs metálicos e iscas para lula.",
    series: "SÉRIES",
    ourProductCategories: "Nossas Categorias",
    eventNotifications: "Notificações de Eventos",
    event1: "testexxxxxxxxxxx",
    event2: "testexxxxxxxxxxxxxxx",
    event3: "testexxxxxxxxxxxxxxxx",
    readytoWWU: "Pronto para trabalhar conosco?",
    readyText: "Contate nossa equipe hoje para discutir como podemos ajudar a alcançar seus objetivos de negócio",
    GetinT: "Entre em Contato",
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
    viewAll: "Ver todos os eventos"
  },
}

export default function HomePage() {
  const { language } = useLanguage()
  const t = translations[language]

  // Mouse following effect for both hero and CTA sections
  React.useEffect(() => {
    const heroSection = document.getElementById('hero-section')
    const ctaSection = document.getElementById('cta-section')
    
    if (!heroSection && !ctaSection) return

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      
      // Get particles within the current section
      const particles = target.querySelectorAll('.particle')
      
      // Update particle positions with trail effect
      particles.forEach((particle, index) => {
        const delay = index * 50
        const offsetX = Math.sin(Date.now() * 0.001 + index) * 20
        const offsetY = Math.cos(Date.now() * 0.001 + index) * 20
        
        setTimeout(() => {
          if (particle instanceof HTMLElement) {
            particle.style.left = `${mouseX + offsetX}px`
            particle.style.top = `${mouseY + offsetY}px`
            particle.style.opacity = '1'
            particle.style.transform = `scale(${1 + Math.sin(Date.now() * 0.002) * 0.3})`
          }
        }, delay)
      })
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      const particles = target.querySelectorAll('.particle')
      
      particles.forEach((particle) => {
        if (particle instanceof HTMLElement) {
          particle.style.opacity = '0'
        }
      })
    }

    // Add event listeners to both sections
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove)
      heroSection.addEventListener('mouseleave', handleMouseLeave)
    }
    
    if (ctaSection) {
      ctaSection.addEventListener('mousemove', handleMouseMove)
      ctaSection.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (heroSection) {
        heroSection.removeEventListener('mousemove', handleMouseMove)
        heroSection.removeEventListener('mouseleave', handleMouseLeave)
      }
      if (ctaSection) {
        ctaSection.removeEventListener('mousemove', handleMouseMove)
        ctaSection.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  // Function to translate product names while keeping brand codes untranslated
  const translateProductName = (item: string) => {
    // Convert to camelCase to match translation keys
    const words = item.toLowerCase().split(' ')
    const camelCaseKey = words[0] + words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')
    return t[camelCaseKey as keyof typeof t] || item
  }

  // Function to get the correct URL slug for a product
  const getProductSlug = (item: string) => {
    // Keep the original English slug for URLs to maintain consistency
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
                <Image 
                  src="/images/anda-logo.png" 
                  alt="ANDA Logo" 
                  width={120}
                  height={32}
                  className="h-8 w-auto" 
                  priority
                />
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
      <section className="relative overflow-hidden text-white py-10" id="hero-section">
        {/* Dynamic Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 animate-gradient-flow"></div>
        
        {/* Mouse Following Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="particle-container">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className={`particle particle-${i}`} />
            ))}
          </div>
        </div>
        
        {/* Floating Light Orbs */}
        <div className="absolute inset-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`floating-orb orb-${i}`} />
          ))}
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.welcomeTitle}</h1>
          <p className="text-xl md:text-1xl mb-8 opacity-90">{t.welcomeSubtitle}</p>
          <Button asChild size="lg" variant="secondary" className="gap-2">
            <Link href="/about">
              {t.watchVideo}
            </Link>
          </Button>
        </div>
      </section>

      {/* Video Section */}
      <section className="w-full bg-gray-50">
        <div className="w-full">
          <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] bg-gray-900 overflow-hidden">
            <video
              className="w-full h-full object-cover"
              src="/videos/anda-intro.mp4"
              autoPlay
              loop
              muted
              playsInline
              poster="/images/video-poster.png"
              aria-label="ANDA Company Introduction Video"
            >
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              {/* You can add text or other elements here if desired */}
            </div>
          </div>
        </div>
      </section>

      {/* Event Notification Section */}
      {false && (
      <section className="py-16 bg-white">
        <FadeInOnScroll>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">{t.eventNotifications}</h2>
            <div className="relative">
              <ImageCarousel
                images={[
                  { src: "/Coming soon.gif?height=400&width=800&text=Event+1", alt: t.event1 },
                  { src: "/Coming soon.gif?height=400&width=800&text=Event+2", alt: t.event2 },
                  { src: "/Coming soon.gif?height=400&width=800&text=Event+3", alt: t.event3 },
                ]}
              />
              <Link 
                href="/blog" 
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors duration-300 rounded-lg"
                aria-label="View all events"
              >
                <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/90 px-6 py-3 rounded-lg shadow-lg">
                  <span className="text-gray-800 font-medium">{t.viewAll}</span>
                </div>
              </Link>
            </div>
          </div>
        </FadeInOnScroll>
      </section>
      )}

      {/* About Section */}
      <section className="py-16">
        <FadeInOnScroll>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.aboutTitle}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{t.aboutText}</p>
            </div>
          </div>
        </FadeInOnScroll>
      </section>

      {/* Product Categories Preview 从这里添加首页总类别的照片,放入public即可*/}
      <section className="py-16 bg-gray-50">
        <FadeInOnScroll>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t.ourProductCategories}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
              <Link href="/category/hard-lure" className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Image
                    src="/home/hard.png"
                    alt="Hard Lures"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                    quality={90}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg group-hover:text-blue-600">{t.hardLure}</h3>
                  </div>
                </div>
              </Link>

              <Link href="/category/soft-lure" className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Image
                    src="/home/soft.png"
                    alt="Soft Lures"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                    quality={90}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg group-hover:text-blue-600">{t.softLure}</h3>
                  </div>
                </div>
              </Link>

              <Link href="/category/metal-lure" className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Image
                    src="/home/metal.png"
                    alt="Metal Lures"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                    quality={90}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg group-hover:text-blue-600">{t.metalLure}</h3>
                  </div>
                </div>
              </Link>

              <Link href="/category/squid-lure" className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Image
                    src="/home/squid.png"
                    alt="Squid Lures"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                    quality={90}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg group-hover:text-blue-600">{t.squidLure}</h3>
                  </div>
                </div>
              </Link>

              <Link href="/category/accessory" className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Image
                    src="/home/access.png"
                    alt="Accessory"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                    quality={90}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg group-hover:text-blue-600">{t.accessory}</h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </FadeInOnScroll>
      </section>
      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-500 to-blue-900 py-16 sm:py-24" id="cta-section">
        {/* Mouse Following Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="particle-container">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className={`particle particle-${i}`} />
            ))}
          </div>
        </div>
        
        {/* Floating Light Orbs */}
        <div className="absolute inset-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`floating-orb orb-${i}`} />
          ))}
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.readytoWWU}</h2>
            <p className="mt-4 text-xl text-white/90">
              {t.readyText}
            </p>
            <div className="mt-10">
              <Link href="/contact">
                <Button size="lg" variant="secondary">
                 {t.GetinT}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}