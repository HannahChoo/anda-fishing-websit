"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Heart, Mail, Share2, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/LanguageContext"
import { useParams } from "next/navigation"
import { LanguageSelector } from "@/components/LanguageSelector"
import { FadeInOnScroll } from "@/components/FadeInOnScroll"

// Define types for better type safety
type Language = "en" | "zh" | "ja" | "ko" | "es" | "tr" | "ru" | "pt"

interface TranslationContent {
  home: string
  aboutUs: string
  hardLure: string
  softLure: string
  metalLure: string
  squidLure: string
  accessory: string
  backToCategory: string
  addToWishlist: string
  addedToWishlist: string
  contactSupplier: string
  share: string
  productDetails: string
  specifications: string
  productNotFound: string
  returnToHome: string
  keyFeatures: string
  productDetail: string
  newBadge: string
  specWeight: string
  specWaterDepth: string
  specSize: string
  // Product category translations
  jerkbait: string
  crankBait: string
  topWater: string
  live: string
  adstSeries: string
  shrimp: string
  craw: string
  shinerSeries: string
  shadSeries: string
  gobySeries: string
  fmSeries: string
  splitTail: string
  nfSeries: string
  worm: string
  softShad: string
  grub: string
  ftSeries: string
  ptSeries: string
  frog: string
  spinner: string
  garfish: string
  metalShad: string
  egiSeries: string
  lsSeries: string
  mslSeries: string
}

type Translations = Record<Language, TranslationContent>

interface ProductSpecifications {
  Weight?: string
  "Water Depth"?: string
  Size?: string
  // Add other potential spec keys here if needed
}

interface ProductDetail {
  id: string
  name: string
  description: string
  image: string
  images?: string[] // Add optional images array for additional product photos
  detailImages?: string[] // Add optional array for long detail images
  specifications: ProductSpecifications
  features: string[]
  isNew?: boolean
}

type ProductDetailsMap = Record<string, ProductDetail>

const translations: Translations = {
    en: {
      home: "HOME",
      aboutUs: "ABOUT US",
      hardLure: "HARD LURE",
      softLure: "SOFT LURE",
      metalLure: "METAL LURE",
      squidLure: "SQUID LURE",
      accessory: "ACCESSORY",
      backToCategory: "Back to Category",
      addToWishlist: "Add to Wish List",
      addedToWishlist: "Added to Wish List",
      contactSupplier: "Contact Supplier",
      share: "Share",
      productDetails: "Product Details",
      specifications: "Specifications",
      productNotFound: "Hot Selling - Info Updating",
      returnToHome: "Return to Home",
      keyFeatures: "Key Features",
      productDetail: "Product Detail",
      newBadge: "NEW",
      // NEW SPECIFICATION TRANSLATIONS
      specWeight: "Weight",
      specWaterDepth: "Water Depth",
      specSize: "Size",
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
      mslSeries: "MSL SERIES"
    },
    zh: {
      home: "首页",
      aboutUs: "关于我们",
      hardLure: "硬饵",
      softLure: "软饵",
      metalLure: "金属饵",
      squidLure: "鱿鱼饵",
      accessory: "配件",
      backToCategory: "返回分类",
      addToWishlist: "添加到愿望单",
      addedToWishlist: "已添加至愿望单",
      contactSupplier: "联系供应商",
      share: "分享",
      productDetails: "产品详情",
      specifications: "规格参数",
      productNotFound: "热销中-信息更新中",
      returnToHome: "返回首页",
      keyFeatures: "主要特点",
      productDetail: "产品详情",
      newBadge: "新品",
      // NEW SPECIFICATION TRANSLATIONS
      specWeight: "重量",
      specWaterDepth: "水深",
      specSize: "尺寸",
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
      mslSeries: "MSL系列"
    },
    ja: {
      home: "ホーム",
      aboutUs: "会社概要",
      hardLure: "ハードルアー",
      softLure: "ソフトルアー",
      metalLure: "メタルルアー",
      squidLure: "イカルアー",
      accessory: "アクセサリー",
      backToCategory: "カテゴリーに戻る",
      addToWishlist: "ウイッシュリストに追加",
      addedToWishlist: "ウイッシュリストに追加済み",
      contactSupplier: "サプライヤーに連絡",
      share: "共有",
      productDetails: "製品詳細",
      specifications: "仕様",
      productNotFound: "人気販売中 - 情報更新中",
      returnToHome: "ホームに戻る",
      keyFeatures: "主な特徴",
      productDetail: "製品詳細",
      newBadge: "新製品",
      // NEW SPECIFICATION TRANSLATIONS
      specWeight: "重量",
      specWaterDepth: "水深",
      specSize: "サイズ",
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
      mslSeries: "MSLシリーズ"
    },
    ko: {
      home: "홈",
      aboutUs: "회사소개",
      hardLure: "하드루어",
      softLure: "소프트루어",
      metalLure: "메탈루어",
      squidLure: "오징어루어",
      accessory: "액세서리",
      backToCategory: "카테고리로 돌아가기",
      addToWishlist: "위시리스트에 추가",
      addedToWishlist: "위시리스트에 추가됨",
      contactSupplier: "공급업체에 문의",
      share: "공유",
      productDetails: "제품 상세정보",
      specifications: "사양",
      productNotFound: "인기 판매중 - 정보 업데이트 중",
      returnToHome: "홈으로 돌아가기",
      keyFeatures: "주요 특징",
      productDetail: "제품 상세",
      newBadge: "신상품",
      // NEW SPECIFICATION TRANSLATIONS
      specWeight: "무게",
      specWaterDepth: "수심",
      specSize: "크기",
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
      mslSeries: "MSL 시리즈"
    },
    es: {
      home: "INICIO",
      aboutUs: "ACERCA DE",
      hardLure: "SEÑUELO DURO",
      softLure: "SEÑUELO BLANDO",
      metalLure: "SEÑUELO METÁLICO",
      squidLure: "SEÑUELO CALAMAR",
      accessory: "ACCESORIO",
      backToCategory: "Volver a Categoría",
      addToWishlist: "Agregar a lista de deseos",
      addedToWishlist: "Agregado a lista de deseos",
      contactSupplier: "Contactar proveedor",
      share: "Compartir",
      productDetails: "Detalles del producto",
      specifications: "Especificaciones",
      productNotFound: "Vendiendo mucho - Actualizando información",
      returnToHome: "Volver al inicio",
      keyFeatures: "Características clave",
      productDetail: "Detalle del producto",
      newBadge: "NUEVO",
      // NEW SPECIFICATION TRANSLATIONS
      specWeight: "Peso",
      specWaterDepth: "Profundidad del agua",
      specSize: "Tamaño",
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
      mslSeries: "MSL SERIES"
    },
    tr: {
      home: "ANA SAYFA",
      aboutUs: "HAKKIMIZDA",
      hardLure: "SERT YEM",
      softLure: "YUMUŞAK YEM",
      metalLure: "METAL YEM",
      squidLure: "KALAMAR YEMİ",
      accessory: "AKSESUAR",
      backToCategory: "Kategoriye Geri Dön",
      addToWishlist: "İstek Listesine Ekle",
      addedToWishlist: "İstek Listesine Eklendi",
      contactSupplier: "Tedarikçiyle İletişime Geç",
      share: "Paylaş",
      productDetails: "Ürün Detayları",
      specifications: "Özellikler",
      productNotFound: "Çok Satan - Bilgi güncelleniyor",
      returnToHome: "Ana Sayfaya Dön",
      keyFeatures: "Temel Özellikler",
      productDetail: "Ürün Detayı",
      newBadge: "YENİ",
      // NEW SPECIFICATION TRANSLATIONS
      specWeight: "Ağırlık",
      specWaterDepth: "Su Derinliği",
      specSize: "Boyut",
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
      mslSeries: "MSL SERİSİ"
    },
    ru: {
      home: "ГЛАВНАЯ",
      aboutUs: "О НАС",
      hardLure: "ТВЁРДАЯ ПРИМАНКА",
      softLure: "МЯГКАЯ ПРИМАНКА",
      metalLure: "МЕТАЛЛИЧЕСКАЯ ПРИМАНКА",
      squidLure: "ПРИМАНКА ДЛЯ КАЛЬМАРА",
      accessory: "АКСЕССУАРЫ",
      backToCategory: "Вернуться в категорию",
      addToWishlist: "Добавить в список желаний",
      addedToWishlist: "Добавлено в список желаний",
      contactSupplier: "Связаться с поставщиком",
      share: "Поделиться",
      productDetails: "Детали продукта",
      specifications: "Характеристики",
      productNotFound: "Хит продаж - Информация обновляется",
      returnToHome: "Вернуться на главную",
      keyFeatures: "Ключевые особенности",
      productDetail: "Детали продукта",
      newBadge: "НОВИНКА",
      // NEW SPECIFICATION TRANSLATIONS
      specWeight: "Вес",
      specWaterDepth: "Глубина воды",
      specSize: "Размер",
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
      mslSeries: "MSL СЕРИЯ"
    },
    pt: {
      home: "INÍCIO",
      aboutUs: "SOBRE NÓS",
      hardLure: "ISCA RÍGIDA",
      softLure: "ISCA MACIA",
      metalLure: "ISCA METÁLICA",
      squidLure: "ISCA PARA LULA",
      accessory: "ACESSÓRIOS",
      backToCategory: "Voltar à Categoria",
      addToWishlist: "Adicionar à lista de desejos",
      addedToWishlist: "Adicionado à lista de desejos",
      contactSupplier: "Contatar fornecedor",
      share: "Compartilhar",
      productDetails: "Detalhes do produto",
      specifications: "Especificações",
      productNotFound: "Em Alta - Atualizando informações",
      returnToHome: "Voltar ao início",
      keyFeatures: "Características principais",
      productDetail: "Detalhe do produto",
      newBadge: "NOVO",
      // NEW SPECIFICATION TRANSLATIONS
      specWeight: "Peso",
      specWaterDepth: "Profundidade da água",
      specSize: "Tamanho",
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
      mslSeries: "MSL SÉRIE"
    }
}

// Helper function to get translated spec key
const getTranslatedSpecKey = (key: keyof ProductSpecifications, currentLanguage: Language) => {
  const specKeyMap: Record<keyof ProductSpecifications, keyof TranslationContent> = {
    Weight: "specWeight",
    "Water Depth": "specWaterDepth",
    Size: "specSize",
  }
  const translationKey = specKeyMap[key]
  return translations[currentLanguage][translationKey] || key // Fallback to original key if translation not found
}



// 这里是商品详情页信息
const productDetails: ProductDetailsMap = {
  // Hard Lure - Jerkbait
jb50: {
  id: "jb50",
  name: "JB50",
  description:
    "50mm 2.8g Suspend/Long Cast",
  image: "/product/jb50/jb50-1.jpg?height=400&width=400&text=JB50-1",
  images: [
    "/product/jb50/jb50-6.png?height=400&width=400&text=JB50-6",
    "/product/jb50/jb50-7.png?height=400&width=400&text=JB50-7",
    "/product/jb50/jb50-8.png?height=400&width=400&text=JB50-8",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/jb50/jb50-2.png",
    "/product/jb50/jb50-3.png",
    "/product/jb50/jb50-4.png",
    "/product/jb50/jb50-5.jpg",
  ],
  specifications: {
    Size: "50mm",
    Weight: "2.8g",
    "Water Depth": "0-3ft(Suspend/Long Cast)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    "Great for casting long distances.",
  ],
},

jb65: {
  id: "jb65",
  name: "JB65",
  description:
    "65mm 7g Suspend/Magnet",
  image: "/product/jb65-85-95-120-150/jb65-1.jpg?height=400&width=400&text=JB65-1",
  images: [
    "/product/jb65-85-95-120-150/jb65-7.png?height=400&width=400&text=JB65-7",
    "/product/jb65-85-95-120-150/jb65-3.jpg?height=400&width=400&text=JB65-3",
    "/product/jb65-85-95-120-150/jb65-4.png?height=400&width=400&text=JB65-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/jb65-85-95-120-150/jb65-2.png",
    "/product/jb65-85-95-120-150/jb65-5.jpg",
    "/product/jb65-85-95-120-150/jb65-6.png",
  ],
  specifications: {
    Size: "65mm",
    Weight: "7g",
    "Water Depth": "3ft(Suspend/Magnet)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    "have a magnet weight transfer system.",
  ],
},

jb85: {
  id: "jb85",
  name: "JB85",
  description:
    "83mm 10g Suspend/Magnet",
  image: "/product/jb65-85-95-120-150/jb65-1.jpg?height=400&width=400&text=JB65-1",
  images: [
    "/product/jb65-85-95-120-150/jb65-7.png?height=400&width=400&text=JB65-7",
    "/product/jb65-85-95-120-150/jb65-3.jpg?height=400&width=400&text=JB65-3",
    "/product/jb65-85-95-120-150/jb85-1.png?height=400&width=400&text=JB85-1",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/jb65-85-95-120-150/jb65-2.png",
    "/product/jb65-85-95-120-150/jb65-5.jpg",
    "/product/jb65-85-95-120-150/jb65-6.png",
  ],
  specifications: {
    Size: "83mm",
    Weight: "10g",
    "Water Depth": "3ft(Suspend/Magnet)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    "have a magnet weight transfer system.",
  ],
},

jb95: {
  id: "jb95",
  name: "JB95",
  description:
    "95mm 15g Suspend/Magnet",
  image: "/product/jb65-85-95-120-150/jb65-1.jpg?height=400&width=400&text=JB65-1",
  images: [
    "/product/jb65-85-95-120-150/jb65-7.png?height=400&width=400&text=JB65-7",
    "/product/jb65-85-95-120-150/jb65-3.jpg?height=400&width=400&text=JB65-3",
    "/product/jb65-85-95-120-150/jb95-1.png?height=400&width=400&text=JB95-1",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/jb65-85-95-120-150/jb65-2.png",
    "/product/jb65-85-95-120-150/jb65-5.jpg",
    "/product/jb65-85-95-120-150/jb65-6.png",
  ],
  specifications: {
    Size: "95mm",
    Weight: "15g",
    "Water Depth": "3ft(Suspend/Magnet)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    "have a magnet weight transfer system.",
  ],
},

jb120: {
  id: "jb120",
  name: "JB120",
  description:
    "120mm 22g Suspend/Magnet",
  image: "/product/jb65-85-95-120-150/jb65-1.jpg?height=400&width=400&text=JB65-1",
  images: [
    "/product/jb65-85-95-120-150/jb65-7.png?height=400&width=400&text=JB65-7",
    "/product/jb65-85-95-120-150/jb65-3.jpg?height=400&width=400&text=JB65-3",
    "/product/jb65-85-95-120-150/jb120-1.png?height=400&width=400&text=JB120-1",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/jb65-85-95-120-150/jb65-2.png",
    "/product/jb65-85-95-120-150/jb65-5.jpg",
    "/product/jb65-85-95-120-150/jb65-6.png",
  ],
  specifications: {
    Size: "120mm",
    Weight: "22g",
    "Water Depth": "3ft(Suspend/Magnet)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    "have a magnet weight transfer system.",
  ],
},

jb150: {
  id: "jb150",
  name: "JB150",
  description:
    "150mm 40.2g Suspend/Magnet",
  image: "/product/jb65-85-95-120-150/jb65-1.jpg?height=400&width=400&text=JB65-1",
  images: [
    "/product/jb65-85-95-120-150/jb65-7.png?height=400&width=400&text=JB65-7",
    "/product/jb65-85-95-120-150/jb65-3.jpg?height=400&width=400&text=JB65-3",
    "/product/jb65-85-95-120-150/jb150-1.png?height=400&width=400&text=JB150-1",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/jb65-85-95-120-150/jb65-2.png",
    "/product/jb65-85-95-120-150/jb65-5.jpg",
    "/product/jb65-85-95-120-150/jb65-6.png",
  ],
  specifications: {
    Size: "150mm",
    Weight: "40.2g",
    "Water Depth": "1-4ft(Slow Floating)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},

ujs: {
  id: "ujs",
  name: "UJS",
  description:
    "110mm 15g Floating",
  image: "/product/ujs/ujs-1.png?height=400&width=400&text=UJS-1",
  images: [
    "/product//ujs/ujs-3.jpg?height=400&width=400&text=UJS-3",
    "/product//ujs/ujs-4.png?height=400&width=400&text=UJS-4",
    "/product//ujs/ujs-6.png?height=400&width=400&text=UJS-6",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/ujs/ujs-2.png",
    "/product//ujs/ujs-5.png",
  ],
  specifications: {
    Size: "110mm",
    Weight: "15g",
    "Water Depth": "3-5ft(Floating)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},

ujsM: {
  id: "ujsM",
  name: "UJS-M",
  description:
    "110mm 15.5g Suspending",
  image: "/product/ujs-m/ujsm-1.png?height=400&width=400&text=UJS-M-1",
  images: [
    "/product/ujs-m/ujsm-3.png?height=400&width=400&text=UJS-M+2",
    "/product/ujs-m/ujsm-4.png?height=400&width=400&text=UJS-M-3",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/ujs-m/ujsm-2.jpg",
    "/product/ujs-m/ujsm-5.png",
  ],
  specifications: {
    Size: "110mm",
    Weight: "15.5g",
    "Water Depth": "1-9ft(Suspending)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
  isNew: true,
},

ujs85M: {
  id: "ujs85M",
  name: "UJS85-M",
  description:
    "85mm 10.5g Suspending",
  image: "/product/ujs-m/ujsm-1.png?height=400&width=400&text=UJS-M-1",
  images: [
    "/product/ujs-m/ujsm-3.png?height=400&width=400&text=UJS-M-3",
    "/product/ujs-m/ujsm-4.png?height=400&width=400&text=UJS-M-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/ujs-m/ujsm-2.jpg",
    "/product/ujs-m/ujsm-5.png",
  ],
  specifications: {
    Size: "85mm",
    Weight: "10.5g",
    "Water Depth": "1-8ft(Suspending)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
  isNew: true,
},

inna60: {
  id: "inna60",
  name: "INNA60",
  description:
    "60mm 5.6g Floating",
  image: "/product/INNA/inna60-1.png?height=400&width=400&text=INNA60+1",
  images: [
    "/product/INNA/inna-2.jpg?height=400&width=400&text=INNA-2",
    "/product/INNA/inna-3.jpg?height=400&width=400&text=INNA-3",
    "/product/INNA/inna-4.jpg?height=400&width=400&text=INNA-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/INNA/inna-5.jpg",
    "/product/INNA/inna-6.jpg",
  ],
  specifications: {
    Size: "60mm",
    Weight: "5.6g",
    "Water Depth": "0-2ft(Floating)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},

inna70: {
  id: "inna70",
  name: "INNA70",
  description:
    "74mm 11g Slow Sinking/Magnet Long Cast",
  image: "/product/INNA/inna70-1.png?height=400&width=400&text=INNA70-1",
  images: [
    "/product/INNA/inna-2.jpg?height=400&width=400&text=INNA-2",
    "/product/INNA/inna-3.jpg?height=400&width=400&text=INNA-3",
    "/product/INNA/inna-4.jpg?height=400&width=400&text=INNA-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/INNA/inna-5.jpg",
    "/product/INNA/inna-6.jpg",
  ],
  specifications: {
    Size: "74mm",
    Weight: "11g",
    "Water Depth": "3ft(Slow Sinking/Magnet Long Cast)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    "have a magnet weight transfer system.",
    "Great for casting long distances.",
  ],
},

inna90: {
  id: "inna90",
  name: "INNA90",
  description:
    "95mm 16.5g Slow Sinking/Magnet Long Cast",
  image: "/product/INNA/inna90-1.png?height=400&width=400&text=INNA90-1",
  images: [
    "/product/INNA/inna-2.jpg?height=400&width=400&text=INNA-2",
    "/product/INNA/inna-3.jpg?height=400&width=400&text=INNA-3",
    "/product/INNA/inna-4.jpg?height=400&width=400&text=INNA-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/INNA/inna-5.jpg",
    "/product/INNA/inna-6.jpg",
  ],
  specifications: {
    Size: "95mm",
    Weight: "16.5g",
    "Water Depth": "3ft(Slow Sinking/Magnet Long Cast)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    "have a magnet weight transfer system.",
    "Great for casting long distances.",
  ],
},

inna110: {
  id: "inna110",
  name: "INNA110",
  description:
    "115mm 23.2g Slow Sinking/Magnet Long Cast",
  image: "/product/INNA/inna110-1.png?height=400&width=400&text=INNA110-1",
  images: [
    "/product/INNA/inna-2.jpg?height=400&width=400&text=INNA-2",
    "/product/INNA/inna-3.jpg?height=400&width=400&text=INNA-3",
    "/product/INNA/inna-4.jpg?height=400&width=400&text=INNA-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/INNA/inna-5.jpg",
    "/product/INNA/inna-6.jpg",
  ],
  specifications: {
    Size: "115mm",
    Weight: "23.2g",
    "Water Depth": "4ft(Slow Sinking/Magnet Long Cast)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    "have a magnet weight transfer system.",
    "Great for casting long distances.",
  ],
},
inna110DD: {
  id: "inna110DD",
  name: "INNA110 DD",
  description:
    "110mm 28.7g Floating",
  image: "/product/INNA/inna110dd-1.png?height=400&width=400&text=INNA110dd-1",
  images: [
    "/product/INNA/inna-2.jpg?height=400&width=400&text=INNA-2",
    "/product/INNA/inna-3.jpg?height=400&width=400&text=INNA-3",
    "/product/INNA/inna-4.jpg?height=400&width=400&text=INNA-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/INNA/inna-5.jpg",
    "/product/INNA/inna-6.jpg",
  ],
  specifications: {
    Size: "110mm",
    Weight: "28.7g",
    "Water Depth": "11-24ft(Floating)",
  },
  features: [
   "Well perform when retrieving and like a real fish when jerking.",
   "Suitable for both salt and fresh water.",
   "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},

inna110MD: {
  id: "inna110MD",
  name: "INNA110 MD",
  description:
    "110 26.7g Floating",
  image: "/product/INNA/inna110md-1.png?height=400&width=400&text=INNA110md-1",
  images: [
    "/product/INNA/inna-2.jpg?height=400&width=400&text=INNA-2",
    "/product/INNA/inna-3.jpg?height=400&width=400&text=INNA-3",
    "/product/INNA/inna-4.jpg?height=400&width=400&text=INNA-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/INNA/inna-5.jpg",
    "/product/INNA/inna-6.jpg",
  ],
  specifications: {
    Size: "110mm",
    Weight: "26.7g",
    "Water Depth": "11-16ft(Floating)",
  },
  features: [
   "Well perform when retrieving and like a real fish when jerking.",
   "Suitable for both salt and fresh water.",
   "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},

inna140: {
  id: "inna140",
  name: "INNA140",
  description:
    "140 36g Slow Sinking/Magnet Long Cast",
  image: "/product/INNA/inna140-1.png?height=400&width=400&text=INNA140-1",
  images: [
    "/product/INNA/inna-2.jpg?height=400&width=400&text=INNA-2",
    "/product/INNA/inna-3.jpg?height=400&width=400&text=INNA-3",
    "/product/INNA/inna-4.jpg?height=400&width=400&text=INNA-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/INNA/inna-5.jpg",
    "/product/INNA/inna-6.jpg",
  ],
  specifications: {
    Size: "140mm",
    Weight: "36g",
    "Water Depth": "5ft(Slow Sinking/Magnet Long Cast)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    "have a magnet weight transfer system.",
    "Great for casting long distances.",
  ],
},

inna165: {
  id: "inna165",
  name: "INNA165",
  description:
    "165mm 53.4g Floating",
  image: "/product/INNA/inna165-1.png?height=400&width=400&text=INNA165-1",
  images: [
    "/product/INNA/inna-2.jpg?height=400&width=400&text=INNA-2",
    "/product/INNA/inna-3.jpg?height=400&width=400&text=INNA-3",
    "/product/INNA/inna-4.jpg?height=400&width=400&text=INNA-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/INNA/inna-5.jpg",
    "/product/INNA/inna-6.jpg",
  ],
  specifications: {
    Size: "165mm",
    Weight: "53.4g",
    "Water Depth": "0-5ft(Floating)",
  },
  features: [
   "Well perform when retrieving and like a real fish when jerking.",
   "Suitable for both salt and fresh water.",
   "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},

inna165DD: {
  id: "inna165DD",
  name: "INNA165 DD",
  description:
    "165mm 66.3g Floating",
  image: "/product/INNA/inna165dd-1.png?height=400&width=400&text=INNA165dd-1",
  images: [
    "/product/INNA/inna-2.jpg?height=400&width=400&text=INNA-2",
    "/product/INNA/inna-3.jpg?height=400&width=400&text=INNA-3",
    "/product/INNA/inna-4.jpg?height=400&width=400&text=INNA-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/INNA/inna-5.jpg",
    "/product/INNA/inna-6.jpg",
  ],
  specifications: {
    Size: "165mm",
    Weight: "66.3g",
    "Water Depth": "12-30ft(Floating)",
  },
  features: [
   "Well perform when retrieving and like a real fish when jerking.",
   "Suitable for both salt and fresh water.",
   "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},

inna165MD: {
  id: "inna165MD",
  name: "INNA165 MD",
  description:
    "165mm 51.3g Floating",
  image: "/product/INNA/inna165md-1.png?height=400&width=400&text=INNA165md-1",
  images: [
    "/product/INNA/inna-2.jpg?height=400&width=400&text=INNA-2",
    "/product/INNA/inna-3.jpg?height=400&width=400&text=INNA-3",
    "/product/INNA/inna-4.jpg?height=400&width=400&text=INNA-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/INNA/inna-5.jpg",
    "/product/INNA/inna-6.jpg",
  ],
  specifications: {
    Size: "165mm",
    Weight: "51.3g",
    "Water Depth": "12-26ft(Floating)",
  },
  features: [
   "Well perform when retrieving and like a real fish when jerking.",
   "Suitable for both salt and fresh water.",
   "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},

minnow95: {
  id: "minnow95",
  name: "Minnow95",
  description:
    "97.5mm 14.3g Suspending",
  image: "/product/minnow/minnow-1.png?height=400&width=400&text=Minnow-1",
  images: [
    "/product/minnow/minnow-3.png?height=400&width=400&text=Minnow-3",
    "/product/minnow/minnow-4.png?height=400&width=400&text=Minnow-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/minnow/minnow-2.jpg",
    "/product/minnow/minnow-5.png",
    "/product/minnow/minnow-6.png",
  ],
  specifications: {
    Size: "97.5mm",
    Weight: "14.3g",
    "Water Depth": "3ft(Suspending)",
  },
  features: [
   "Well perform when retrieving and like a real fish when jerking.",
   "Suitable for both salt and fresh water.",
   "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},

minnow115: {
  id: "minnow115",
  name: "Minnow115",
  description:
    "117.5mm 21.3g Suspending",
  image: "/product/minnow/minnow-1.png?height=400&width=400&text=Minnow-1",
  images: [
    "/product/minnow/minnow-3.png?height=400&width=400&text=Minnow-3",
    "/product/minnow/minnow-4.png?height=400&width=400&text=Minnow-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/minnow/minnow-2.jpg",
    "/product/minnow/minnow-5.png",
    "/product/minnow/minnow-6.png",
  ],
  specifications: {
    Size: "117.5mm",
    Weight: "21.3g",
    "Water Depth": "4ft(Suspending)",
  },
  features: [
   "Well perform when retrieving and like a real fish when jerking.",
   "Suitable for both salt and fresh water.",
   "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},

jbs110: {
  id: "jbs110",
  name: "JBS110",
  description:
    "112mm 16g Suspending",
  image: "/product/jbs/jbs-1.png?height=400&width=400&text=JBS110-1",
  images: [
    "/product/jbs/jbs-4.png?height=400&width=400&text=JBS110-4",
    "/product/jbs/jbs-3.png?height=400&width=400&text=JBS110-3",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/jbs/jbs-2.jpg",
    "/product/jbs/jbs-5.png",
  ],
  specifications: {
    Size: "112mm",
    Weight: "16g",
    "Water Depth": "3ft(Suspending)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
   ],
},

dd120: {
  id: "dd120",
  name: "DD120",
  description:
    "120mm 21g Suspend/Magnet",
  image: "/product/dd120/dd120-7.jpg?height=400&width=400&text=DD120-7",
  images: [
    "/product/dd120/dd120-1.png?height=400&width=400&text=DD120-1",
    "/product/dd120/dd120-3.jpg?height=400&width=400&text=DD120-3",
    "/product/dd120/dd120-4.jpg?height=400&width=400&text=DD120-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/dd120/dd120-2.jpg",
    "/product/dd120/dd120-5.png",
    "/product/dd120/dd120-6.png",
  ],
  specifications: {
    Size: "120mm",
    Weight: "21g",
    "Water Depth": "3-9ft(Suspend/Magnet)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    "have a magnet weight transfer system.",
  ],
},

suspJs: {
  id: "suspJs",
  name: "SUSP JS",
  description:
    "100mm 18g Suspending",
  image: "/product/susp-fjs/susp-fjs-1.png?height=400&width=400&text=SUSP-JS-1",
  images: [
    "/product/susp-fjs/susp-fjs-3.jpg?height=400&width=400&text=SUSP-JS-3",
    "/product/susp-fjs/susp-fjs-4.jpg?height=400&width=400&text=SUSP-JS-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/susp-fjs/susp-fjs-2.jpg",
    "/product/susp-fjs/susp-fjs-5.png",
    "/product/susp-fjs/susp-fjs-6.png",
  ],
  specifications: {
    Size: "100mm",
    Weight: "18g",
    "Water Depth": "6-8ft(Suspending)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
   ],
},

fjs: {
  id: "fjs",
  name: "FJS",
  description:
    "100mm 17.5g Floating",
  image: "/product/susp-fjs/fjs-1.png?height=400&width=400&text=FFJS-1",
  images: [
    "/product/susp-fjs/susp-fjs-3.jpg?height=400&width=400&text=SUSP-JS-3",
    "/product/susp-fjs/susp-fjs-4.jpg?height=400&width=400&text=SUSP-JS-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/susp-fjs/susp-fjs-2.jpg",
    "/product/susp-fjs/susp-fjs-5.png",
    "/product/susp-fjs/susp-fjs-6.png",
  ],
  specifications: {
    Size: "100mm",
    Weight: "17.5g",
    "Water Depth": "3-5ft(Floating)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
   ],
},

fjs56: {
  id: "fjs56",
  name: "FJS56",
  description:
    "56mm 3.7g Suspending",
  image: "/product/susp-fjs/fjs56-1.png?height=400&width=400&text=FJS56-1",
  images: [
    "/product/susp-fjs/susp-fjs-3.jpg?height=400&width=400&text=SUSP-JS-3",
    "/product/susp-fjs/susp-fjs-4.jpg?height=400&width=400&text=SUSP-JS-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/susp-fjs/susp-fjs-2.jpg",
    "/product/susp-fjs/susp-fjs-5.png",
    "/product/susp-fjs/susp-fjs-6.png",
  ],
  specifications: {
    Size: "56mm",
    Weight: "3.7g",
    "Water Depth": "1-3ft(Suspending)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
   ],
},

swjk75: {
  id: "swjk75",
  name: "SWJK75",
  description:
    "75mm 12.5g Sinking",
  image: "/product/swjk/swjk-1.png?height=400&width=400&text=SWJK-1",
  images: [
    "/product/swjk/swjk-3.png?height=400&width=400&text=SWJK-3",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/swjk/swjk-2.jpg",
    "/product/swjk/swjk-4.png",
  ],
  specifications: {
    Size: "75mm",
    Weight: "12.5g",
    "Water Depth": "Sinking",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
   ],
  isNew: true,
},

swjk95: {
  id: "swjk95",
  name: "SWJK95",
  description:
    "95mm 21g Sinking",
  image: "/product/swjk/swjk-1.png?height=400&width=400&text=SWJK-1",
  images: [
    "/product/swjk/swjk-3.png?height=400&width=400&text=SWJK-3",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/swjk/swjk-2.jpg",
    "/product/swjk/swjk-4.png",
  ],
  specifications: {
    Size: "95mm",
    Weight: "21g",
    "Water Depth": "Sinking",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
   ],
  isNew: true,
},

j90: {
  id: "j90",
  name: "J90",
  description:
    "90mm 12g Floating",
  image: "/product/j/j-1.png?height=400&width=400&text=J-1",
  images: [
    "/product/j/j-4.png?height=400&width=400&text=J-4",
    "/product/j/j-3.jpg?height=400&width=400&text=J-3",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/j/j-2.jpg",
  ],
  specifications: {
    Size: "90mm",
    Weight: "12g",
    "Water Depth": "1-4ft(Floating)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
   ],
},

j110: {
  id: "j110",
  name: "J110",
  description:
    "110mm 22g Floating",
  image: "/product/j/j-1.png?height=400&width=400&text=J-1",
  images: [
    "/product/j/j-4.png?height=400&width=400&text=J-4",
    "/product/j/j-3.jpg?height=400&width=400&text=J-3",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/j/j-2.jpg",
  ],
  specifications: {
    Size: "110mm",
    Weight: "22g",
    "Water Depth": "1-4ft(Floating)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
   ],
},

newInna70: {
  id: "newInna70",
  name: "NEW INNA70",
  description:
    "70mm 7.5 Suspend/Magnet Long Cast",
  image: "/product/newinna/newinna-1.png?height=400&width=400&text=NEW+INNA7-1",
  images: [
    "/product/newinna/newinna-3.png?height=400&width=400&text=NEW+INNA-3",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/newinna/newinna-2.jpg",
    "/product/newinna/newinna-4.png",
  ],
  specifications: {
    Size: "70mm",
    Weight: "7.5g",
    "Water Depth": "3ft(Suspend/Magnet Long Cast)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    "have a magnet weight transfer system.",
    "Great for casting long distances.",
  ],
},

newInna90: {
  id: "newInna90",
  name: "NEW INNA90",
  description:
    "90mm 13.5g Suspend/Magnet Long Cast",
  image: "/product/newinna/newinna-1.png?height=400&width=400&text=NEW+INNA7-1",
  images: [
    "/product/newinna/newinna-3.png?height=400&width=400&text=NEW+INNA-3",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/newinna/newinna-2.jpg",
    "/product/newinna/newinna-4.png",
    ],
  specifications: {
    Size: "90mm",
    Weight: "13.5g",
    "Water Depth": "3ft(Suspend/Magnet Long Cast)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    "have a magnet weight transfer system.",
    "Great for casting long distances.",
  ],
},

newInna120: {
  id: "newInna120",
  name: "NEW INNA120",
  description:
    "120mm 27g Suspend/Magnet Long Cast",
  image: "/product/newinna/newinna-1.png?height=400&width=400&text=NEW+INNA7-1",
  images: [
    "/product/newinna/newinna-3.png?height=400&width=400&text=NEW+INNA-3",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/newinna/newinna-2.jpg",
    "/product/newinna/newinna-4.png",
  ],
  specifications: {
    Size: "120mm",
    Weight: "27g",
    "Water Depth": "4ft(Suspend/Magnet Long Cast)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    "have a magnet weight transfer system.",
    "Great for casting long distances.",
  ],
},

rdr95: {
  id: "rdr95",
  name: "RDR95",
  description:
    "95mm 11g Floating",
  image: "/product/rdr/rdr-1.png?height=400&width=400&text=RDR-1",
  images: [
    "/product/rdr/rdr-4.png?height=400&width=400&text=RDR-4",
    "/product/rdr/rdr-3.png?height=400&width=400&text=RDR-3",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/rdr/rdr-2.jpg",
    "/product/rdr/rdr-5.png",
  ],
  specifications: {
    Size: "95mm",
    Weight: "11g",
    "Water Depth": "0-1m(Floating)",
  },
  features: [
   "Well perform when retrieving and like a real fish when jerking.",
   "Suitable for both salt and fresh water.",
   "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},

rdr80: {
  id: "rdr80",
  name: "RDR80",
  description:
    "80mm 8.5g Floating",
  image: "/product/rdr/rdr-1.png?height=400&width=400&text=RDR-1",
  images: [
    "/product/rdr/rdr-4.png?height=400&width=400&text=RDR-4",
    "/product/rdr/rdr-3.png?height=400&width=400&text=RDR-3",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/rdr/rdr-2.jpg",
    "/product/rdr/rdr-5.png",
  ],
  specifications: {
    Size: "80mm",
    Weight: "8.5g",
    "Water Depth": "0-0.8m(Floating)",
  },
  features: [
   "Well perform when retrieving and like a real fish when jerking.",
   "Suitable for both salt and fresh water.",
   "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},

brava77: {
  id: "brava77",
  name: "BRAVA 77",
  description:
    "77mm 7g Floating",
  image: "/product/brava/brava-1.png?height=400&width=400&text=BRAVA+77-1",
  images: [
    "/product/brava/brava-4.png?height=400&width=400&text=BRAVA+77-4",
    "/product/brava/brava-3.png?height=400&width=400&text=BRAVA+77-3",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/brava/brava-2.png",
    "/product/brava/brava-5.png",
  ],
  specifications: {
    Size: "77mm",
    Weight: "7g",
    "Water Depth": "0-0.8m(Floating)",
  },
  features: [
   "Well perform when retrieving and like a real fish when jerking.",
   "Suitable for both salt and fresh water.",
   "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},

nst5s: {
  id: "nst5s",
  name: "NST5S",
  description:
    "140mm 36.2g Floating",
  image: "/product/nst/nst-1.png?height=400&width=400&text=NST5S-1",
  images: [
    "/product/nst/nst-4.png?height=400&width=400&text=NST5S-4",
    "/product/nst/nst-3.jpg?height=400&width=400&text=NST5S-3",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/nst/nst-2.png",
  ],
  specifications: {
    Size: "140mm",
    Weight: "36.2g",
    "Water Depth": "1-3ft(Floating)",
  },
  features: [
   "Well perform when retrieving and like a real fish when jerking.",
   "Suitable for both salt and fresh water.",
   "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},

zx118: {
  id: "zx118",
  name: "ZX118",
  description:
    "118mm 19g Floating",
  image: "/product/zx/zx-1.png?height=400&width=400&text=ZX118-1",
  images: [
    "/product/zx/zx-3.png?height=400&width=400&text=ZX118-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/zx/zx-2.png",
    "/product/zx/zx-4.png",
  ],
  specifications: {
    Size: "118mm",
    Weight: "19g",
    "Water Depth": "1-4ft(Floating)",
  },
  features: [
   "Well perform when retrieving and like a real fish when jerking.",
   "Suitable for both salt and fresh water.",
   "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},

cx70sp: {
  id: "cx70sp",
  name: "CX70SP",
  description:
    "70mm 6.9g Suspending",
  image: "/product/cxsp/cxsp-1.png?height=400&width=400&text=CXSP-1",
  images: [
    "/product/cxsp/cxsp-3.png?height=400&width=400&text=CXSP-3",
    "/product/cxsp/cxsp-4.jpg?height=400&width=400&text=CXSP-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/cxsp/cxsp-2.png",
  ],
  specifications: {
    Size: "70mm",
    Weight: "6.9g",
    "Water Depth": "0-1ft(Suspending)",
  },
  features: [
   "Well perform when retrieving and like a real fish when jerking.",
   "Suitable for both salt and fresh water.",
   "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},

cx90sp: {
  id: "cx90sp",
  name: "CX90SP",
  description:
    "90mm 7.7g Suspending",
  image: "/product/cxsp/cxsp-1.png?height=400&width=400&text=CXSP-1",
  images: [
    "/product/cxsp/cxsp-3.png?height=400&width=400&text=CXSP-3",
    "/product/cxsp/cxsp-4.jpg?height=400&width=400&text=CXSP-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/cxsp/cxsp-2.png",
  ],
  specifications: {
    Size: "90mm",
    Weight: "7.7g",
    "Water Depth": "0-1ft(Suspending)",
  },
  features: [
   "Well perform when retrieving and like a real fish when jerking.",
   "Suitable for both salt and fresh water.",
   "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},

kan160: {
  id: "kan160",
  name: "KAN160",
  description:
    "160mm 32.4g Suspending",
  image: "/product/kan/kan-1.png?height=400&width=400&text=KAN160-1",
  images: [
    "/product/kan/kan-4.png?height=400&width=400&text=KAN160-4",
    "/product/kan/kan-3.jpg?height=400&width=400&text=KAN160-3",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/kan/kan-2.png",
    "/product/kan/kan-5.png",
  ],
  specifications: {
    Size: "160mm",
    Weight: "32.4g",
    "Water Depth": "0-5ft(Suspending)",
  },
  features: [
   "Well perform when retrieving and like a real fish when jerking.",
   "Suitable for both salt and fresh water.",
   "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},
rj100: {
  id: "rj100",
  name: "RJ100",
  description:
    "100mm 15.3g Suspending",
  image: "/product/rj/rj-1.png?height=400&width=400&text=RJ100-1",
  images: [
    "/product/rj/rj-3.jpg?height=400&width=400&text=RJ100-3",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/rj/rj-2.png",
  ],
  specifications: {
    Size: "100mm",
    Weight: "15.3g",
    "Water Depth": "1-3ft(Suspending)",
  },
  features: [
   "Well perform when retrieving and like a real fish when jerking.",
   "Suitable for both salt and fresh water.",
   "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},

msq128: {
  id: "msq128",
  name: "MSQ128",
  description:
    "128mm 22.6g Suspending",
  image: "/product/msq/msq-1.png?height=400&width=400&text=MSQ128+1",
  images: [
    "/product/msq/msq-4.png?height=400&width=400&text=MSQ128-4",
    "/product/msq/msq-3.jpg?height=400&width=400&text=MSQ128-3",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/msq/msq-2.png",
  ],
  specifications: {
    Size: "128mm",
    Weight: "22.6g",
    "Water Depth": "2-4ft(Suspending)",
  },
  features: [
   "Well perform when retrieving and like a real fish when jerking.",
   "Suitable for both salt and fresh water.",
   "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},

shin115: {
  id: "shin115",
  name: "SHIN115",
  description:
    "115mm 16g Suspending",
  image: "/product/shin/shin-1.png?height=400&width=400&text=SHIN115-1",
  images: [
    "/product/shin/shin-3.jpg?height=400&width=400&text=SHIN115+2",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/shin/shin-2.png",
  ],
  specifications: {
    Size: "115mm",
    Weight: "16g",
    "Water Depth": "1-3ft(Suspending)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
   ],
},

trc55: {
  id: "trc55",
  name: "TRC55",
  description:
    "55mm 4g Sinking",
  image: "/product/trc/trc-1.png?height=400&width=400&text=TRC55-1",
  images: [
    "/product/trc/trc-3.jpg?height=400&width=400&text=TRC55-3",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/trc/trc-2.png",
  ],
  specifications: {
    Size: "55mm",
    Weight: "4g",
    "Water Depth": "Sinking",
  },
  features: [
   "Well perform when retrieving and like a real fish when jerking.",
   "Suitable for both salt and fresh water.",
   "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},

td120: {
  id: "td120",
  name: "TD120",
  description:
    "120mm 37.9g Floating",
  image: "/product/td/td-1.png?height=400&width=400&text=TD120-1",
  images: [
    "/product/td/td-3.png?height=400&width=400&text=TD120-3",
    "/product/td/td-4.png?height=400&width=400&text=TD120-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/td/td-2.png",
    "/product/td/td-5.png",
  ],
  specifications: {
    Size: "120mm",
    Weight: "37.9g",
    "Water Depth": "18-25ft(Floating)",
  },
  features: [
    "Well perform when retrieving and like a real fish when jerking.",
    "Suitable for both salt and fresh water.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
   ],
},

td150: {
  id: "td150",
  name: "TD150",
  description:
    "150mm 65.5g Floating",
  image: "/product/td/td-1.png?height=400&width=400&text=TD120-1",
  images: [
    "/product/td/td-3.png?height=400&width=400&text=TD120-3",
    "/product/td/td-4.png?height=400&width=400&text=TD120-4",
  ],
  detailImages: [
    "/product/jerkbait.png",
    "/product/td/td-2.png",
    "/product/td/td-5.png",
  ],
  specifications: {
    Size: "150mm",
    Weight: "65.5g",
    "Water Depth": "16-33ft(Floating)",
  },
  features: [
   "Well perform when retrieving and like a real fish when jerking.",
   "Suitable for both salt and fresh water.",
   "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
  ],
},
  // Hard Lure - Crank Bait
adcr60: {
  id: "adcr60",
  name: "ADCR60",
  description:
    "60mm 12.2g Floating",
  image: "/product/adcr60/adcr60-1.png?height=400&width=400&text=ADCR60-1",
  images: [
    "/product/adcr60/adcr60-4.png?height=400&width=400&text=ADCR60-4",
    "/product/adcr60/adcr60-3.jpg?height=400&width=400&text=ADCR60-3",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/adcr60/adcr60-2.png",
    "/product/adcr60/adcr60-5.png",
  ],
  specifications: {
    Size: "60mm",
    Weight: "12.2g",
    "Water Depth": "2-5ft(Floating)",
  },
  features: [
    "Replaceable weight.",
    "Changeable lure body.",
    "Integrated stainless steel sheet with high tensile strength.",
  ],
  isNew: true,
},

advib58: {
  id: "advib58",
  name: "ADVIB58",
  description:
    "58mm 15.6g Sinking",
  image: "/product/advib58/advib58-1.png?height=400&width=400&text=ADVIB58-1",
  images: [
    "/product/advib58/advib58-52.jpg?height=400&width=400&text=ADVIB58-52",
    "/product/advib58/advib58-53.jpg?height=400&width=400&text=ADVIB58-53",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/advib58/advib58-2.jpeg",
    "/product/advib58/advib58-51.jpg",
    "/product/advib58/advib58-52.jpg",
    "/product/advib58/advib58-53.jpg",
  ],
  specifications: {
    Size: "58mm",
    Weight: "15.6g",
    "Water Depth": "Sinking",
  },
  features: [
    "Replaceable weight.",
    "Changeable lure body.",
    "Integrated stainless steel sheet with high tensile strength.",
  ],
  isNew: true,
},

mcs: {
  id: "mcs",
  name: "MCS",
  description:
      "38mm 4g",
  image: "/product/mc/mc-1.png?height=400&width=400&text=MCS-1",
  images: [
    "/product/mc/mc-3.jpg?height=400&width=400&text=MCS-3",
    "/product/mc/mc-4.jpg?height=400&width=400&text=MCS-4",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/mc/mc-2.png",
    "/product/mc/mc-5.png",
  ],
  specifications: {
    Size: "38mm",
    Weight: "4g",
    "Water Depth": "1-3ft",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

mcm: {
  id: "mcm",
  name: "MCM",
  description:
    "38mm 4g",
  image: "/product/mc/mc-6.png?height=400&width=400&text=MCS-6",
  images: [
    "/product/mc/mc-3.jpg?height=400&width=400&text=MCS-3",
    "/product/mc/mc-4.jpg?height=400&width=400&text=MCS-4",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/mc/mc-2.png",
    "/product/mc/mc-5.png",
  ],
  specifications: {
    Size: "38mm",
    Weight: "4g",
    "Water Depth": "1-6ft",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

crulS: {
  id: "crulS",
  name: "CRUL S",
  description:
    "45.5mm 6.5g Floating",
  image: "/product/crul/crul-1.png?height=400&width=400&text=CRUL+S-1",
  images: [
    "/product/crul/crul-3.jpg?height=400&width=400&text=CRUL+S-3",
    "/product/crul/crul-4.png?height=400&width=400&text=CRUL+S-4",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/crul/crul-2.png",
    "/product/crul/crul-5.png",
    "/product/crul/crul-6.png",
  ],
  specifications: {
    Size: "45.5mm",
    Weight: "6.5g",
    "Water Depth": "2-4ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

crulD: {
  id: "crulD",
  name: "CRUL D",
  description:
    "45.5mm 7g Floating",
  image: "/product/crul/crul-1.png?height=400&width=400&text=CRUL+S-1",
  images: [
    "/product/crul/crul-3.jpg?height=400&width=400&text=CRUL+S-3",
    "/product/crul/crul-4.png?height=400&width=400&text=CRUL+S-4",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/crul/crul-2.png",
    "/product/crul/crul-5.png",
    "/product/crul/crul-6.png",
  ],
  specifications: {
    Size: "45.5mm",
    Weight: "7g",
    "Water Depth": "5-7ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

crulDS38: {
  id: "crulDS38",
  name: "CRUL DS38",
  description:
    "38mm 4g Floating",
  image: "/product/crul/crul-1.png?height=400&width=400&text=CRUL+S-1",
  images: [
    "/product/crul/crul-3.jpg?height=400&width=400&text=CRUL+S-3",
    "/product/crul/crul-4.png?height=400&width=400&text=CRUL+S-4",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/crul/crul-2.png",
    "/product/crul/crul-5.png",
    "/product/crul/crul-6.png",
  ],
  specifications: {
    Size: "38mm",
    Weight: "4g",
    "Water Depth": "4-6ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

crulSS38: {
  id: "crulSS38",
  name: "CRUL SS38",
  description:
    "38mm 3.8g Floating",
  image: "/product/crul/crul-1.png?height=400&width=400&text=CRUL+S-1",
  images: [
    "/product/crul/crul-3.jpg?height=400&width=400&text=CRUL+S-3",
    "/product/crul/crul-4.png?height=400&width=400&text=CRUL+S-4",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/crul/crul-2.png",
    "/product/crul/crul-5.png",
    "/product/crul/crul-6.png",
  ],
  specifications: {
    Size: "38mm",
    Weight: "3.8g",
    "Water Depth": "1-3ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

crankS: {
  id: "crankS",
  name: "Crank-S",
  description:
    "60mm 12g/14g Floating-Silent/Suspend-rattle",
  image: "/product/crank/crank-1.png?height=400&width=400&text=Crank-S+1",
  images: [
    "/product/crank/crank-3.png?height=400&width=400&text=Crank-S+2",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/crank/crank-2.jpeg",
    "/product/crank/crank-4.png",
    "/product/crank/crank-5.png",
    "/product/crank/crank-6.jpg",
  ],
  specifications: {
    Size: "60mm",
    Weight: "12g/14g",
    "Water Depth": "2-4ft(Floating-Silent/Suspend-rattle)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

crankM: {
  id: "crankM",
  name: "Crank-M",
  description:
    "60mm 13g/15g Floating-Silent/Suspend-rattle",
    image: "/product/crank/crank-1.png?height=400&width=400&text=Crank-S+1",
    images: [
      "/product/crank/crank-3.png?height=400&width=400&text=Crank-S+2",
    ],
    detailImages: [
      "/product/crankbait.png",
      "/product/crank/crank-2.jpeg",
      "/product/crank/crank-4.png",
      "/product/crank/crank-5.png",
      "/product/crank/crank-6.jpg",
    ],
  specifications: {
    Size: "60mm",
    Weight: "13g/15g",
    "Water Depth": "3-6ft(Floating-Silent/Suspend-rattle)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

ecs: {
  id: "ecs",
  name: "ECS",
  description:
    "60mm 12.5g Floating",
  image: "/product/ec/ec-1.png?height=400&width=400&text=ECS+1",
  images: [
    "/product/ec/ec-3.png?height=400&width=400&text=ECS+2",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/ec/ec-2.png",
    "/product/ec/ec-4.png",
  ],
  specifications: {
    Size: "60mm",
    Weight: "12.5g",
    "Water Depth": "2-4ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

ecm: {
  id: "ecm",
  name: "ECM",
  description:
    "60mm 13g Floating",
    image: "/product/ec/ec-1.png?height=400&width=400&text=ECS+1",
    images: [
      "/product/ec/ec-3.png?height=400&width=400&text=ECS+2",
    ],
    detailImages: [
      "/product/crankbait.png",
      "/product/ec/ec-2.png",
      "/product/ec/ec-4.png",
    ],
  specifications: {
    Size: "60mm",
    Weight: "13g",
    "Water Depth": "3-5ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

ecl: {
  id: "ecl",
  name: "ECL",
  description:
    "60mm 14g Floating",
    image: "/product/ec/ec-1.png?height=400&width=400&text=ECS+1",
    images: [
      "/product/ec/ec-3.png?height=400&width=400&text=ECS+2",
    ],
    detailImages: [
      "/product/crankbait.png",
      "/product/ec/ec-2.png",
      "/product/ec/ec-4.png",
    ],
  specifications: {
    Size: "60mm",
    Weight: "14g",
    "Water Depth": "6-8ft(Floating)",
  },
  features: [
      "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
      "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
      ],
},

scs: {
  id: "scs",
  name: "SCS",
  description:
    "60mm 13g Floating",
  image: "/product/scs/scs-1.png?height=400&width=400&text=ECS+1",
  images: [
    "/product/scs/scs-3.jpg?height=400&width=400&text=ECS+2",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/scs/scs-2.png",
    "/product/scs/scs-4.png",
  ],
  specifications: {
    Size: "60mm",
    Weight: "13g",
    "Water Depth": "0-6ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

crs: {
  id: "crs",
  name: "CRS",
  description:
    "60mm 13.5g Floating",
    image: "/product/cr/crm-1.png?height=400&width=400&text=ECS+1",
    images: [
      "/product/cr/crm-3.jpg?height=400&width=400&text=ECS+2",
    ],
    detailImages: [
      "/product/crankbait.png",
      "/product/cr/cr-2.png",
      "/product/cr/crm-4.png",
    ],
  specifications: {
    Size: "60mm",
    Weight: "13.5g",
    "Water Depth": "2-5ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

crm: {
  id: "crm",
  name: "CRM",
  description:
    "68.5mm 20g Floating",
    image: "/product/cr/crm-1.png?height=400&width=400&text=ECS+1",
    images: [
      "/product/cr/crm-3.jpg?height=400&width=400&text=ECS+2",
    ],
    detailImages: [
      "/product/crankbait.png",
      "/product/cr/cr-2.png",
      "/product/cr/crm-4.png",
    ],
  specifications: {
    Size: "68.5mm",
    Weight: "20g",
    "Water Depth": "5-8ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

crsPlus: {
  id: "crsPlus",
  name: "CRS+",
  description:
    "60mm 15g Floating",
    image: "/product/cr/crs+-1.png?height=400&width=400&text=ECS+1",
    images: [
      "/product/cr/crs+-3.jpg?height=400&width=400&text=ECS+2",
    ],
    detailImages: [
      "/product/crankbait.png",
      "/product/cr/cr-2.png",
      "/product/cr/crs+-4.png",
    ],
  specifications: {
    Size: "60mm",
    Weight: "15g",
    "Water Depth": "5-10ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

swcr63: {
  id: "swcr63",
  name: "SWCR63",
  description:
    "63mm 16g Sinking",
    image: "/product/swcr/swcr-1.png?height=400&width=400&text=ECS+1",
    images: [
      "/product/swcr/swcr-3.png?height=400&width=400&text=ECS+2",
    ],
    detailImages: [
      "/product/crankbait.png",
      "/product/swcr/swcr-2.png",
      "/product/swcr/swcr-4.png",
    ],
  specifications: {
    Size: "63mm",
    Weight: "16g",
    "Water Depth": "Sinking",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
  isNew: true,
},

swcr78: {
  id: "swcr78",
  name: "SWCR78",
  description:
    "78mm 25.5g Sinking",
    image: "/product/swcr/swcr-1.png?height=400&width=400&text=ECS+1",
    images: [
      "/product/swcr/swcr-3.png?height=400&width=400&text=ECS+2",
    ],
    detailImages: [
      "/product/crankbait.png",
      "/product/swcr/swcr-2.png",
      "/product/swcr/swcr-4.png",
    ],
  specifications: {
    Size: "78mm",
    Weight: "25.5g",
    "Water Depth": "Sinking",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
  isNew: true,
},

cms: {
  id: "cms",
  name: "CMS",
  description:
    "54mm 8g Floating",
    image: "/product/cm/cm-1.png?height=400&width=400&text=ECS+1",
    images: [
      "/product/cm/cm-3.jpg?height=400&width=400&text=ECS+2",
    ],
    detailImages: [
      "/product/crankbait.png",
      "/product/cm/cm-2.png",
      "/product/cm/cm-4.png",
    ],
  specifications: {
    Size: "54mm",
    Weight: "8g",
    "Water Depth": "2-4ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

cmm: {
  id: "cmm",
  name: "CMM",
  description:
    "54mm 8.5g Floating",
    image: "/product/cm/cm-1.png?height=400&width=400&text=ECS+1",
    images: [
      "/product/cm/cm-3.jpg?height=400&width=400&text=ECS+2",
    ],
    detailImages: [
      "/product/crankbait.png",
      "/product/cm/cm-2.png",
      "/product/cm/cm-4.png",
    ],
  specifications: {
    Size: "54mm",
    Weight: "8.5g",
    "Water Depth": "4-6ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

crd: {
  id: "crd",
  name: "CRD",
  description:
    "76mm 30g Floating",
    image: "/product/crd/crd-1.png?height=400&width=400&text=ECS+1",
    images: [
      "/product/crd/crd-3.jpg?height=400&width=400&text=ECS+2",
    ],
    detailImages: [
      "/product/crankbait.png",
      "/product/crd/crd-2.png",
      "/product/crd/crd-4.png",
    ],
  specifications: {
    Size: "76mm",
    Weight: "30g",
    "Water Depth": "5-15ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

crdPlus: {
  id: "crdPlus",
  name: "CRD+",
  description:
    "76mm 31g Floating",
    image: "/product/crd/crd+-1.png?height=400&width=400&text=ECS+1",
    images: [
      "/product/crd/crd+-3.png?height=400&width=400&text=ECS+2",
    ],
    detailImages: [
      "/product/crankbait.png",
      "/product/crd/crd-2.png",
      "/product/crd/crd-4.png",
    ],
  specifications: {
    Size: "76mm",
    Weight: "31g",
    "Water Depth": "5-18ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

c35s: {
  id: "c35s",
  name: "C35S",
  description:
    "95mm 39g Floating",
    image: "/product/c35s/c35s-1.png?height=400&width=400&text=ECS+1",
    images: [
      "/product/c35s/c35s-3.jpg?height=400&width=400&text=ECS+2",
      "/product/c35s/c35s-4.png?height=400&width=400&text=ECS+2",
    ],
    detailImages: [
      "/product/crankbait.png",
      "/product/c35s/c35s-2.png",
      "/product/c35s/c35s-5.png",
    ],
  specifications: {
    Size: "95mm",
    Weight: "39g",
    "Water Depth": "4-6ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

c4d: {
  id: "c4d",
  name: "C4D",
  description:
    "103mm 59.5g Floating",
  image: "/product/c4d/c4d-1.png?height=400&width=400&text=C4D+1",
  images: [
    "/product/c4d/c4d-4.png?height=400&width=400&text=C4D+2",
    "/product/c4d/c4d-3.jpg?height=400&width=400&text=C4D+3",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/c4d/c4d-2.png",
    "/product/c4d/c4d-5.png",
  ],
  specifications: {
    Size: "103mm",
    Weight: "59.5g",
    "Water Depth": "5-15ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

dds: {
  id: "dds",
  name: "DDS",
  description:
    "40mm 4.5g Floating",
  image: "/product/dds/dds-1.png?height=400&width=400&text=DDS+1",
  images: [
    "/product/dds/dds-3.png?height=400&width=400&text=DDS+2",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/dds/dds-2.png",
    "/product/dds/dds-4.png",
  ],
  specifications: {
    Size: "40mm",
    Weight: "4.5g",
    "Water Depth": "3-7ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

jcm: {
  id: "jcm",
  name: "JCM",
  description:
    "35mm 3.7g Floating",
  image: "/product/jcm/jcm-1.png?height=400&width=400&text=JCM+1",
  images: [
    "/product/jcm/jcm-4.png?height=400&width=400&text=JCM+2",
    "/product/jcm/jcm-3.jpg?height=400&width=400&text=JCM+3",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/jcm/jcm-2.png",
    "/product/jcm/jcm-5.png",
  ],
  specifications: {
    Size: "35mm",
    Weight: "3.7g",
    "Water Depth": "3-7ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

fsc55: {
  id: "fsc55",
  name: "FSC55",
  description:
    "55mm 8g Floating",
  image: "/product/fsc/fsc-1.png?height=400&width=400&text=FSC55+1",
  images: [
    "/product/fsc/fsc-3.png?height=400&width=400&text=FSC55+3",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/fsc/fsc-2.png",
  ],
  specifications: {
    Size: "55mm",
    Weight: "8g",
    "Water Depth": "3-5ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

fsc65: {
  id: "fsc65",
  name: "FSC65",
  description:
    "65mm 14g Floating",
    image: "/product/fsc/fsc-1.png?height=400&width=400&text=FSC55+1",
    images: [
      "/product/fsc/fsc-3.png?height=400&width=400&text=FSC55+3",
    ],
    detailImages: [
      "/product/crankbait.png",
      "/product/fsc/fsc-2.png",
    ],
  specifications: {
    Size: "65mm",
    Weight: "14g",
    "Water Depth": "4-6ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

sr4: {
  id: "sr4",
  name: "SR4",
  description:
    "65mm 14.4g Floating",
  image: "/product/sr4/sr4-1.png?height=400&width=400&text=SR4+1",
  images: [
    "/product/sr4/sr4-3.png?height=400&width=400&text=SR4+3",
    "/product/sr4/sr4-4.png?height=400&width=400&text=SR4+4",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/sr4/sr4-2.png",
    "/product/sr4/sr4-5.png",
  ],
  specifications: {
    Size: "65mm",
    Weight: "14.4g",
    "Water Depth": "6-13ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

rt: {
  id: "rt",
  name: "RT",
  description:
    "66mm 17g Sinking",
  image: "/product/rt/rt-1.png?height=400&width=400&text=RT+1",
  images: [
    "/product/rt/rt-3.png?height=400&width=400&text=RT+3",
    "/product/rt/rt-4.png?height=400&width=400&text=RT+4",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/rt/rt-2.png",
  ],
  specifications: {
    Size: "66mm",
    Weight: "17g",
    "Water Depth": "Sinking",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

lcrS: {
  id: "lcrS",
  name: "LCR-S",
  description:
    "60mm 10.5g Sinking",
  image: "/product/lcr/lcrs-1.png?height=400&width=400&text=LCR-S+1",
  images: [
    "/product/lcr/lcr-3.jpg?height=400&width=400&text=LCR-S+3",
    "/product/lcr/lcrs-4.png?height=400&width=400&text=LCR-S+4",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/lcr/lcr-2.png",
    "/product/lcr/lcr-5.png",
  ],
  specifications: {
    Size: "60mm",
    Weight: "10.5g",
    "Water Depth": "Sinking",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

lcr: {
  id: "lcr",
  name: "LCR",
  description:
    "75mm 18.5g Sinking",
    image: "/product/lcr/lcr-1.png?height=400&width=400&text=LCR-S+1",
    images: [
      "/product/lcr/lcr-3.jpg?height=400&width=400&text=LCR-S+3",
      "/product/lcr/lcr-4.png?height=400&width=400&text=LCR-S+4",
    ],
    detailImages: [
      "/product/crankbait.png",
      "/product/lcr/lcr-2.png",
      "/product/lcr/lcr-5.png",
    ],
  specifications: {
    Size: "75mm",
    Weight: "18.5g",
    "Water Depth": "Sinking",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

rt50: {
  id: "rt50",
  name: "RT50",
  description:
    "51mm 10g Sinking/Rattle",
  image: "/product/rt-vib/rt-vib-1.png?height=400&width=400&text=RT50+1",
  images: [
    "/product/rt-vib/rt-vib-3.png?height=400&width=400&text=RT50+3",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/rt-vib/rt-vib-2.png",
    "/product/rt-vib/rt-vib-4.png",
    "/product/rt-vib/rt-vib-5.png",
  ],
  specifications: {
    Size: "51mm",
    Weight: "10g",
    "Water Depth": "Sinking/Rattle",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

rt70: {
  id: "rt70",
  name: "RT70",
  description:
    "66mm 20g Sinking/Rattle",
    image: "/product/rt-vib/rt-vib-1.png?height=400&width=400&text=RT50+1",
    images: [
      "/product/rt-vib/rt-vib-3.png?height=400&width=400&text=RT50+3",
    ],
    detailImages: [
      "/product/crankbait.png",
      "/product/rt-vib/rt-vib-2.png",
      "/product/rt-vib/rt-vib-4.png",
      "/product/rt-vib/rt-vib-5.png",
    ],
  specifications: {
    Size: "66mm",
    Weight: "20g",
    "Water Depth": "Sinking/Rattle",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

vib40: {
  id: "vib40",
  name: "VIB40",
  description:
    "40mm 3.7g Sinking/Rattle",
    image: "/product/rt-vib/rt-vib-1.png?height=400&width=400&text=RT50+1",
    images: [
      "/product/rt-vib/rt-vib-3.png?height=400&width=400&text=RT50+3",
    ],
    detailImages: [
      "/product/crankbait.png",
      "/product/rt-vib/rt-vib-2.png",
      "/product/rt-vib/rt-vib-4.png",
      "/product/rt-vib/rt-vib-5.png",
    ],
  specifications: {
    Size: "40mm",
    Weight: "3.7g",
    "Water Depth": "Sinking/Rattle",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

rattle60: {
  id: "rattle60",
  name: "Rattle60",
  description:
    "60mm 13g Sinking/Rattle",
  image: "/product/rattle/rattle-1.png?height=400&width=400&text=Rattle60+1",
  images: [
    "/product/rattle/rattle-4.png?height=400&width=400&text=Rattle60+2",
    "/product/rattle/rattle-3.jpg?height=400&width=400&text=Rattle60+3",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/rattle/rattle-2.png",
    "/product/rattle/rattle-5.png",
    "/product/rattle/rattle-6.jpg",
  ],
  specifications: {
    Size: "60mm",
    Weight: "13g",
    "Water Depth": "Sinking/Rattle",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

csh: {
  id: "csh",
  name: "CSH",
  description:
    "72mm 12g Floating",
  image: "/product/csh/csh-1.png?height=400&width=400&text=CSH+1",
  images: [
    "/product/csh/csh-3.png?height=400&width=400&text=CSH+3",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/csh/csh-2.png",
  ],
  specifications: {
    Size: "72mm",
    Weight: "12g",
    "Water Depth": "3-5ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

ss82: {
  id: "ss82",
  name: "SS82",
  description:
    "82mm 15g/18g Slow Sinking/Fast Sinking",
  image: "/product/ss82/ss82-1.png?height=400&width=400&text=SS82+1",
  images: [
    "/product/ss82/ss82-3.png?height=400&width=400&text=SS82+3",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/ss82/ss82-2.png",
  ],
  specifications: {
    Size: "82mm",
    Weight: "15g/18g",
    "Water Depth": "Slow Sinking/Fast Sinking",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

rapShad70: {
  id: "rapShad70",
  name: "RAP SHAD70",
  description:
    "70mm 8.2g Floating",
  image: "/product/rapshad/rapshad-1.png?height=400&width=400&text=RAP+SHAD70+1",
  images: [
    "/product/rapshad/rapshad-3.png?height=400&width=400&text=RAP+SHAD70+3",
    "/product/rapshad/rapshad-4.png?height=400&width=400&text=RAP+SHAD70+4",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/rapshad/rapshad-2.png",
  ],
  specifications: {
    Size: "70mm",
    Weight: "8.2g",
    "Water Depth": "0-5ft(Floating)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

shadS: {
  id: "shadS",
  name: "Shad-S",
  description:
    "71mm 10g Suspending",
  image: "/product/shad/shads-1.png?height=400&width=400&text=Shad-S+1",
  images: [
    "/product/shad/shad-6.jpg?height=400&width=400&text=Shad-S+3",
  ],
  detailImages: [
    "/product/crankbait.png",
    "/product/shad/shad-2.jpeg",
    "/product/shad/shad-3.png",
    "/product/shad/shad-4.png",
    "/product/shad/shad-5.png",
  ],
  specifications: {
    Size: "71mm",
    Weight: "10g",
    "Water Depth": "2-4ft(Suspending)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

shadM: {
  id: "shadM",
  name: "Shad-M",
  description:
    "71mm 12g Suspending",
    image: "/product/shad/shadm-1.png?height=400&width=400&text=Shad-S+1",
    images: [
      "/product/shad/shad-6.jpg?height=400&width=400&text=Shad-S+3",
    ],
    detailImages: [
      "/product/crankbait.png",
      "/product/shad/shad-2.jpeg",
      "/product/shad/shad-3.png",
      "/product/shad/shad-4.png",
      "/product/shad/shad-5.png",
    ],
  specifications: {
    Size: "71mm",
    Weight: "12g",
    "Water Depth": "3-6ft(Suspending)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},

shad60M: {
  id: "shad60M",
  name: "Shad60-M",
  description:
    "60mm 7g Suspending",
  image: "/product/shad60m/shad60m-1.png?height=400&width=400&text=Shad60-M+1",
  images: [
    "/product/shad60m/shad60m-3.png?height=400&width=400&text=Shad60-M+3",
  ],
  detailImages: [
    "/product/crakbait.png",
    "/product/shad60m/shad60m-2.png",
    "/product/shad60m/shad60m-3.png",
  ],
  specifications: {
    Size: "60mm",
    Weight: "7g",
    "Water Depth": "3-6ft(Suspending)",
  },
  features: [
    "Expertly hand-tuned to guarantee a lifelike and irresistible swimming action.",
    "Crafted with professional-grade techniques to mimic real fish, making attraction effortless.",
    ],
},
  // Hard Lure - Top Water
  pep90: {
    id: "pep90",
    name: "PEP90",
    description: "90mm 13g TOP WATER",
    image: "/product/pep/pep-1.png?height=400&width=400&text=PEP90+1",
    images: [
      "/product/pep/pep-3.png?height=400&width=400&text=PEP90+3",
    ],
    detailImages: [
      "/product/topwater.jpeg", 
      "/product/pep/pep-2.png", 
    ],
    specifications: {
      Size: "90mm",
      Weight: "13g",
      "Water Depth": "TOP WATER",
    },
    features: [
    "Specifically designed to target fish feeding on the water's surface.",
    "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
    ],
    isNew: true,
  },

  pep105: {
    id: "pep105",
    name: "PEP105",
    description: "105mm 17.5g TOP WATER",
    image: "/product/pep/pep-1.png?height=400&width=400&text=PEP90+1",
    images: [
      "/product/pep/pep-3.png?height=400&width=400&text=PEP90+3",
    ],
    detailImages: [
      "/product/topwater.jpeg", 
      "/product/pep/pep-2.png", 
    ],
    specifications: {
      Size: "105mm",
      Weight: "17.5g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
    isNew: true,
  },

  spm80: {
    id: "spm80",
    name: "SPM80",
    description: "80mm 13g TOP WATER",
    image: "/product/spm/spm-1.png?height=400&width=400&text=SPM80+1",
    images: [
      "/product/spm/spm-3.png?height=400&width=400&text=SPM80+3",
    ],
    detailImages: [
      "/product/topwater.jpeg", 
      "/product/spm/spm-2.png", 
    ],
    specifications: {
      Size: "80mm",
      Weight: "13g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
    isNew: true,
  },

  twp: {
    id: "twp",
    name: "TWP",
    description: "64.5mm 8.5g TOP WATER",
    image: "/product/twp/twp-1.png?height=400&width=400&text=TWP+1",
    images: [
      "/product/twp/twp-3.jpg?height=400&width=400&text=TWP+3",
      "/product/twp/twp-4.png?height=400&width=400&text=TWP+4",
    ],
    detailImages: [
      "/product/topwater.jpeg", 
      "/product/twp/twp-2.png", 
      "/product/twp/twp-4.png",
       "/product/twp/twp-5.png"
    ],
    specifications: {
      Size: "64.5mm",
      Weight: "8.5g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  twpm: {
    id: "twpm",
    name: "TWPM",
    description: "74.5mm 14g TOP WATER",
    image: "/product/twp/twp-1.png?height=400&width=400&text=TWP+1",
    images: [
      "/product/twp/twp-3.jpg?height=400&width=400&text=TWP+3",
      "/product/twp/twp-4.png?height=400&width=400&text=TWP+4",
    ],
    detailImages: [
      "/product/topwater.jpeg", 
      "/product/twp/twp-2.png", 
      "/product/twp/twp-4.png",
       "/product/twp/twp-5.png"
    ],
      specifications: {
      Size: "74.5mm",
      Weight: "14g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  twp43: {
    id: "twp43",
    name: "TWP43",
    description: "43mm 3.1g TOP WATER",
    image: "/product/twp/twp-1.png?height=400&width=400&text=TWP+1",
    images: [
      "/product/twp/twp-3.jpg?height=400&width=400&text=TWP+3",
      "/product/twp/twp-4.png?height=400&width=400&text=TWP+4",
    ],
    detailImages: [
      "/product/topwater.jpeg", 
      "/product/twp/twp-2.png", 
      "/product/twp/twp-4.png",
       "/product/twp/twp-5.png"
    ],
    specifications: {
      Size: "43mm",
      Weight: "3.1g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  pm: {
    id: "pm",
    name: "PM",
    description: "95mm 13g TOP WATER",
    image: "/product/pm/pm-1.png?height=400&width=400&text=PM+1",
    images: [
      "/product/pm/pm-3.jpg?height=400&width=400&text=PM+3",
    ],
    detailImages: [
      "/product/topwater.jpeg", 
      "/product/pm/pm-2.png", 
      "/product/pm/pm-4.png",
      "/product/pm/pm-5.png"
    ],
    specifications: {
      Size: "95mm",
      Weight: "13g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  pm127: {
    id: "pm127",
    name: "PM127",
    description: "127mm 29g TOP WATER",
    image: "/product/pm/pm-1.png?height=400&width=400&text=PM+1",
    images: [
      "/product/pm/pm-3.jpg?height=400&width=400&text=PM+3",
    ],
    detailImages: [
      "/product/topwater.jpeg", 
      "/product/pm/pm-2.png", 
      "/product/pm/pm-4.png",
      "/product/pm/pm-5.png"
    ],
    specifications: {
      Size: "127mm",
      Weight: "29g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  pop50: {
    id: "pop50",
    name: "POP50",
    description: "51mm 4.5g TOP WATER",
    image: "/product/pop50/pop50-1.png?height=400&width=400&text=POP50+1",
    images: [
      "/product/pop50/pop50-3.png?height=400&width=400&text=POP50+3",
    ],
    detailImages: [
      "/product/topwater.jpeg", 
      "/product/pop50/pop50-2.png"],
    specifications: {
      Size: "51mm",
      Weight: "4.5g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  pop65: {
    id: "pop65",
    name: "POP65",
    description: "66mm 7g TOP WATER",
    image: "/product/pop65-80/pop65-1.png?height=400&width=400&text=POP65+1",
    images: [
      "/product/pop65-80/pop65-4.png?height=400&width=400&text=POP65+4",
    ],
    detailImages: [
      "/product/topwater.jpeg", 
      "/product/pop65-80/pop65-80-2.jpeg", 
      "/product/pop65-80/pop65-3.jpg"],
    specifications: {
      Size: "66mm",
      Weight: "7g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  pop80: {
    id: "pop80",
    name: "POP80",
    description: "80mm 12g TOP WATER",
    image: "/product/pop65-80/pop80-1.png?height=400&width=400&text=POP65+1",
    images: [
      "/product/pop65-80/pop80-3.png?height=400&width=400&text=POP65+4",
    ],
    detailImages: [
      "/product/topwater.jpeg", 
      "/product/pop65-80/pop65-80-2.jpeg", 
      "/product/pop65-80/pop65-3.jpg"],
    specifications: {
      Size: "80mm",
      Weight: "12g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  pop100: {
    id: "pop100",
    name: "POP100",
    description: "100mm 21g TOP WATER",
    image: "/product/pop100/pop100-1.png?height=400&width=400&text=POP100+1",
    images: [
      "/product/pop100/pop100-3.jpg?height=400&width=400&text=POP100+3",
    ],
    detailImages: [
      "/product/topwater.jpeg", 
      "/product/pop100/pop100-2.png", 
      "/product/pop100/pop100-4.jpg", 
      "/product/pop100/pop100-5.jpg", 
      "/product/pop100/pop100-6.jpg", 
      "/product/pop100/pop100-7.jpg"],
    specifications: {
      Size: "100mm",
      Weight: "21g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  pe85: {
    id: "pe85",
    name: "PE85",
    description: "85mm 11g TOP WATER",
    image: "/product/pe/pe-1.png?height=400&width=400&text=PE85+1",
    images: [
      "/product/pe/pe-3.png?height=400&width=400&text=PE85+3",
    ],
    detailImages: ["/product/topwater.jpeg", "/product/pe/pe-2.jpeg"],
    specifications: {
      Size: "85mm",
      Weight: "11g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  pe115: {
    id: "pe115",
    name: "PE115",
    description: "115mm 20g TOP WATER",
    image: "/product/pe/pe-1.png?height=400&width=400&text=PE85+1",
    images: [
      "/product/pe/pe-3.png?height=400&width=400&text=PE85+3",
    ],
    detailImages: ["/product/topwater.jpeg", "/product/pe/pe-2.jpeg"],
    specifications: {
      Size: "115mm",
      Weight: "20g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  pe100: {
    id: "pe100",
    name: "PE100",
    description: "100mm 16g TOP WATER",
    image: "/product/proppe100/proppe100-1.png?height=400&width=400&text=PE100+1",
    images: [
      "/product/proppe100/proppe100-3.jpg?height=400&width=400&text=PE100+3",
    ],
    detailImages: ["/product/topwater.jpeg", 
      "/product/proppe100/proppe100-2.jpeg", 
      "/product/proppe100/proppe100-4.png",
      "/product/proppe100/proppe100-5.jpg",
      "/product/proppe100/proppe100-6.jpg"
    ],
    specifications: {
      Size: "100mm",
      Weight: "16g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  propPe100: {
    id: "propPe100",
    name: "PROP PE100",
    description: "100mm 17.4g TOP WATER",
    image: "/product/proppe100/proppe100-1.png?height=400&width=400&text=PE100+1",
    images: [
      "/product/proppe100/proppe100-3.jpg?height=400&width=400&text=PE100+3",
    ],
    detailImages: ["/product/topwater.jpeg", 
      "/product/proppe100/proppe100-2.jpeg", 
      "/product/proppe100/proppe100-4.png",
      "/product/proppe100/proppe100-5.jpg",
      "/product/proppe100/proppe100-6.jpg"
    ],
    specifications: {
      Size: "100mm",
      Weight: "17.4g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  npe100: {
    id: "npe100",
    name: "NPE100",
    description: "100mm 19g TOP WATER",
    image: "/product/npe/npe-1.png?height=400&width=400&text=NPE100+1",
    images: [
      "/product/npe/npe-3.png?height=400&width=400&text=NPE100+3",
    ],
    detailImages: ["/product/topwater.jpeg", "/product/npe/npe-2.png"],
    specifications: {
      Size: "100mm",
      Weight: "19g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  tw85Sus: {
    id: "tw85Sus",
    name: "TW85 (Suspending)",
    description: "85mm 13.5g Suspending",
    image: "/product/tw/tw-1.png?height=400&width=400&text=TW85+Suspending+1",
    images: [
      "/product/tw/tw-3.png?height=400&width=400&text=TW85+Suspending+3",
    ],
    detailImages: ["/product/topwater.jpeg", "/product/tw/tw-2.png"],
    specifications: {
      Size: "85mm",
      Weight: "13.5g",
      "Water Depth": "Suspending",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  tw85Sink: {
    id: "tw85Sink",
    name: "TW85 (Sinking)",
    description: "85mm 28.5g Sinking",
    image: "/product/tw/tw-1.png?height=400&width=400&text=TW85+Suspending+1",
    images: [
      "/product/tw/tw-3.png?height=400&width=400&text=TW85+Suspending+3",
    ],
    detailImages: ["/product/topwater.jpeg", "/product/tw/tw-2.png"],
    specifications: {
      Size: "85mm",
      Weight: "28.5g",
      "Water Depth": "Sinking",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  tw110Sus: {
    id: "tw110Sus",
    name: "TW110 (Suspending)",
    description: "110mm 23.8g Suspending",
    image: "/product/tw/tw-1.png?height=400&width=400&text=TW85+Suspending+1",
    images: [
      "/product/tw/tw-3.png?height=400&width=400&text=TW85+Suspending+3",
    ],
    detailImages: ["/product/topwater.jpeg", "/product/tw/tw-2.png"],
    specifications: {
      Size: "110mm",
      Weight: "23.8g",
      "Water Depth": "Suspending",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  tw110Sink: {
    id: "tw110Sink",
    name: "TW110 (Sinking)",
    description: "110mm 45g Sinking",
    image: "/product/tw/tw-1.png?height=400&width=400&text=TW85+Suspending+1",
    images: [
      "/product/tw/tw-3.png?height=400&width=400&text=TW85+Suspending+3",
    ],
    detailImages: ["/product/topwater.jpeg", "/product/tw/tw-2.png"],
    specifications: {
      Size: "110mm",
      Weight: "45g",
      "Water Depth": "Sinking",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  snake90: {
    id: "snake90",
    name: "SNAKE90",
    description: "90mm 11.6g TOP WATER",
    image: "/product/snake/snake-1.png?height=400&width=400&text=SNAKE90+1",
    images: [
      "/product/snake/snake-3.png?height=400&width=400&text=SNAKE90+3",
      "/product/snake/snake-4.png?height=400&width=400&text=SNAKE90+4",
    ],
    detailImages: ["/product/topwater.jpeg", "/product/snake/snake-2.png"],
    specifications: {
      Size: "90mm",
      Weight: "11.6g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  snake115: {
    id: "snake115",
    name: "SNAKE115",
    description: "115mm 22.4g TOP WATER",
    image: "/product/snake/snake-1.png?height=400&width=400&text=SNAKE90+1",
    images: [
      "/product/snake/snake-3.png?height=400&width=400&text=SNAKE90+3",
      "/product/snake/snake-4.png?height=400&width=400&text=SNAKE90+4",
    ],
    detailImages: ["/product/topwater.jpeg", "/product/snake/snake-2.png"],
    specifications: {
      Size: "115mm",
      Weight: "22.4g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  kp80: {
    id: "kp80",
    name: "KP80",
    description: "80mm 14g TOP WATER",
    image: "/product/kp/kp-1.png?height=400&width=400&text=SNAKE90+1",
    images: [
      "/product/kp/kp-3.png?height=400&width=400&text=SNAKE90+3",
      "/product/kp/kp-4.png?height=400&width=400&text=SNAKE90+4",
    ],
    detailImages: ["/product/topwater.jpeg", "/product/kp/kp-2.png"],
    specifications: {
      Size: "80mm",
      Weight: "14g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  kp100: {
    id: "kp100",
    name: "KP100",
    description: "100mm 27.5g TOP WATER",
    image: "/product/kp/kp-1.png?height=400&width=400&text=SNAKE90+1",
    images: [
      "/product/kp/kp-3.png?height=400&width=400&text=SNAKE90+3",
      "/product/kp/kp-4.png?height=400&width=400&text=SNAKE90+4",
    ],
    detailImages: ["/product/topwater.jpeg", "/product/kp/kp-2.png"],
    specifications: {
      Size: "100mm",
      Weight: "27.5g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  tws: {
    id: "tws",
    name: "TWS",
    description: "101.5mm 14.5g TOP WATER",
    image: "/product/tws/tws-1.png?height=400&width=400&text=TWS+1",
    images: [
      "/product/tws/tws-3.png?height=400&width=400&text=TWS+3",
    ],
    detailImages: ["/product/topwater.jpeg", 
      "/product/tws/tws-2.png", 
      "/product/tws/tws-4.png",
       "/product/tws/tws-5.png"],
    specifications: {
      Size: "101.5mm",
      Weight: "14.5g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  tws55: {
    id: "tws55",
    name: "TWS55",
    description: "55mm 3.5g TOP WATER",
    image: "/product/tws/tws-1.png?height=400&width=400&text=TWS+1",
    images: [
      "/product/tws/tws-3.png?height=400&width=400&text=TWS+3",
    ],
    detailImages: ["/product/topwater.jpeg", 
      "/product/tws/tws-2.png", 
      "/product/tws/tws-4.png",
       "/product/tws/tws-5.png"],
    specifications: {
      Size: "55mm",
      Weight: "3.5g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  pe135: {
    id: "pe135",
    name: "PE135",
    description: "135mm 28g TOP WATER",
    image: "/product/pe135/pe135-1.png?height=400&width=400&text=PE135+1",
    images: [
      "/product/pe135/pe135-3.png?height=400&width=400&text=PE135+3",
    ],
    detailImages: ["/product/topwater.jpeg", 
      "/product/pe135/pe135-2.png",
      "/product/pe135/pe135-4.jpg",
      "/product/pe135/pe135-5.jpg", 
      "/product/pe135/pe135-6.jpg"],
    specifications: {
      Size: "135mm",
      Weight: "28g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  newPe105: {
    id: "newPe105",
    name: "NEW PE105",
    description: "105mm 15g TOP WATER",
    image: "/product/newpe/newpe-1.png?height=400&width=400&text=NEW+PE105+1",
    images: [
      "/product/newpe/newpe-3.png?height=400&width=400&text=NEW+PE105+3",
      "/product/newpe/newpe-4.png?height=400&width=400&text=NEW+PE105+4",
    ],
    detailImages: ["/product/topwater.jpeg", "/product/newpe/newpe-2.png"],
    specifications: {
      Size: "105mm",
      Weight: "15g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  newPe135: {
    id: "newPe135",
    name: "NEW PE135",
    description: "135mm 28g TOP WATER",
    image: "/product/newpe/newpe-1.png?height=400&width=400&text=NEW+PE105+1",
    images: [
      "/product/newpe/newpe-3.png?height=400&width=400&text=NEW+PE105+3",
      "/product/newpe/newpe-4.png?height=400&width=400&text=NEW+PE105+4",
    ],
    detailImages: ["/product/topwater.jpeg", "/product/newpe/newpe-2.png"],
    specifications: {
      Size: "135mm",
      Weight: "28g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  sd: {
    id: "sd",
    name: "SD",
    description: "60mm 13g TOP WATER",
    image: "/product/sd/sd-1.png?height=400&width=400&text=SD+1",
    images: [
      "/product/sd/sd-3.png?height=400&width=400&text=SD+3",
    ],
    detailImages: ["/product/topwater.jpeg", "/product/sd/sd-2.png"],
    specifications: {
      Size: "60mm",
      Weight: "13g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  sd38: {
    id: "sd38",
    name: "SD38",
    description: "38mm 3.3g TOP WATER",
    image: "/product/sd/sd-1.png?height=400&width=400&text=SD+1",
    images: [
      "/product/sd/sd-3.png?height=400&width=400&text=SD+3",
    ],
    detailImages: ["/product/topwater.jpeg", "/product/sd/sd-2.png"],
    specifications: {
      Size: "38mm",
      Weight: "3.3g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  sm: {
    id: "sm",
    name: "SM",
    description: "96mm 13g TOP WATER",
    image: "/product/sm/sm-1.png?height=400&width=400&text=SD+1",
    images: [
      "/product/sm/sm-3.png?height=400&width=400&text=SD+3",
    ],
    detailImages: ["/product/topwater.jpeg", "/product/sm/sm-2.png"],
    specifications: {
      Size: "96mm",
      Weight: "13g",
      "Water Depth": "TOP WATER",
    },
    features: [
      "Specifically designed to target fish feeding on the water's surface.",
      "Mimics vulnerable, easy-to-catch prey to trigger more aggressive strikes.",
      ],
  },

  // Hard Lure - Live
 hs75: {
  id: "hs75",
  name: "HS75",
  description: "75mm 13.5g Sinking",
  image: "/product/hs/hs-1.png?height=400&width=400&text=SD+1",
  images: [
    "/product/hs/hs-3.png?height=400&width=400&text=SD+3",
  ],
  detailImages: ["/product/live.jpeg", "/product/sm/sm-2.png"],
  specifications: {
    Size: "75mm",
    Weight: "13.5g",
    "Water Depth": "Sinking",
  },
  features: [
    "Features a realistic fish shape and natural coloration for authentic appearance.",
    "Mimics the movement of real fish to effectively attract predators.",
    "Combines visual and motion realism to convincingly imitate live bait.",
    ],
},

hs90: {
  id: "hs90",
  name: "HS90",
  description: "90mm 21.5g Sinking",
  image: "/product/hs/hs-1.png?height=400&width=400&text=SD+1",
  images: [
    "/product/hs/hs-3.png?height=400&width=400&text=SD+3",
  ],
  detailImages: ["/product/live.jpeg", "/product/sm/sm-2.png"],
  specifications: {
    Size: "90mm",
    Weight: "21.5g",
    "Water Depth": "Sinking",
  },
  features: [
   "Features a realistic fish shape and natural coloration for authentic appearance.",
    "Mimics the movement of real fish to effectively attract predators.",
    "Combines visual and motion realism to convincingly imitate live bait.",
    ],
},

hmm35: {
  id: "hmm35",
  name: "HMM35",
  description: "90mm 20g Sinking",
  image: "/product/hmm/hmm-1.png?height=400&width=400&text=SD+1",
  images: [
    "/product/hmm/hmm-3.png?height=400&width=400&text=SD+3",
  ],
  detailImages: ["/product/live.jpeg", "/product/hmm/hmm-2.png"],
  specifications: {
    Size: "90mm",
    Weight: "20g",
    "Water Depth": "Sinking",
  },
  features: [
   "Features a realistic fish shape and natural coloration for authentic appearance.",
    "Mimics the movement of real fish to effectively attract predators.",
    "Combines visual and motion realism to convincingly imitate live bait.",
    ],
},

jl35: {
  id: "jl35",
  name: "JL35",
  description: "90mm 15.7g Sinking",
  image: "/product/jl/jl-1.png?height=400&width=400&text=SD+1",
  images: [
    "/product/jl/jl-3.png?height=400&width=400&text=SD+3",
  ],
  detailImages: ["/product/live.jpeg", "/product/jl/jl-2.png"],
  specifications: {
    Size: "90mm",
    Weight: "15.7g",
    "Water Depth": "Sinking",
  },
  features: [
   "Features a realistic fish shape and natural coloration for authentic appearance.",
    "Mimics the movement of real fish to effectively attract predators.",
    "Combines visual and motion realism to convincingly imitate live bait.",
    ],
},


}

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [wishlistItems, setWishlistItems] = useState<string[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationElement, setAnimationElement] = useState<{ x: number; y: number; targetX: number; targetY: number } | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [showZoom, setShowZoom] = useState(false)
  const navHeartRef = useRef<HTMLDivElement>(null)
  const wishlistButtonRef = useRef<HTMLButtonElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const hasLoaded = useRef(false)
  const isFirstSave = useRef(true)
  
  const { language } = useLanguage()
  const t = translations[language]

  const { id } = useParams<{ id: string }>()

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist))
    }
    hasLoaded.current = true
  }, [])

  // Save wishlist to localStorage whenever it changes (skip first run)
  useEffect(() => {
    if (!hasLoaded.current) return
    if (isFirstSave.current) {
      isFirstSave.current = false
      return
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  // Ensure product is typed correctly
  const product: ProductDetail | undefined = productDetails[id]

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t.productNotFound}</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            {t.returnToHome}
          </Link>
        </div>
      </div>
    )
  }

  const productImages = [
    product.image,
    ...(product.images || [
      "/placeholder.svg?height=400&width=400&text=Image+2",
      "/placeholder.svg?height=400&width=400&text=Image+3",
      "/placeholder.svg?height=400&width=400&text=Image+4",
    ])
  ]

  const currentUrl = typeof window !== "undefined" ? window.location.href : ""
  const productTitle = encodeURIComponent(product.name)
  const productDescription = encodeURIComponent(product.description)

  // Navigation functions
  const translateProductName = (item: string) => {
    // Convert to camelCase to match translation keys
    const words = item.toLowerCase().split(' ')
    const camelCaseKey = words[0] + words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')
    return t[camelCaseKey as keyof typeof t] || item
  }

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

  const handleShare = (platform: string) => {
    try {
      let shareUrl = ""
      const encodedUrl = encodeURIComponent(currentUrl)
      const encodedTitle = encodeURIComponent(productTitle)
      const encodedDescription = encodeURIComponent(productDescription)
      
      switch (platform) {
        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
          break
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
          break
        case "x":
          shareUrl = `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
          break
        case "email":
          shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
          break
        case "whatsapp":
          shareUrl = `https://wa.me/?text=${encodeURIComponent(`${productTitle}: ${productDescription} ${currentUrl}`)}`
          break
        case "copy":
          // Use Web Share API if available, otherwise fallback to clipboard
          if (navigator.share) {
            navigator.share({
              title: productTitle,
              text: productDescription,
              url: currentUrl,
            }).catch(() => {
              // Fallback to clipboard if Web Share fails
              navigator.clipboard.writeText(`${productTitle}: ${productDescription} ${currentUrl}`)
              alert('Link copied to clipboard!')
            })
            return
          } else {
            // Fallback to clipboard for older browsers
            navigator.clipboard.writeText(`${productTitle}: ${productDescription} ${currentUrl}`)
            alert('Link copied to clipboard!')
            return
          }
        default:
          return
      }
      
      // Open share URL in new window
      const shareWindow = window.open(shareUrl, "_blank", "width=600,height=400")
      
      // Check if popup was blocked
      if (!shareWindow) {
        alert('Popup blocked! Please allow popups for this site to share.')
      }
    } catch (error) {
      console.error('Share error:', error)
      alert('Unable to share. Please try again.')
    }
  }

  const handleAddToWishlist = () => {
    if (!id) return
    
    // Always read latest from localStorage to avoid stale state when navigating between pages
    const storedRaw = localStorage.getItem('wishlist')
    const stored: string[] = storedRaw ? JSON.parse(storedRaw) : []
    let newWishlist: string[]
    if (!stored.includes(id)) {
      newWishlist = [...stored, id]
    } else {
      newWishlist = stored.filter(item => item !== id)
    }
    setWishlistItems(newWishlist)
    localStorage.setItem('wishlist', JSON.stringify(newWishlist))
      
      // Get button position for animation
      if (wishlistButtonRef.current && navHeartRef.current) {
        const buttonRect = wishlistButtonRef.current.getBoundingClientRect()
        const navRect = navHeartRef.current.getBoundingClientRect()
        
        // Calculate the target position (navigation heart)
        const targetX = navRect.left + navRect.width / 2
        const targetY = navRect.top + navRect.height / 2
        
        // Calculate the movement distance
        const deltaX = targetX - (buttonRect.left + buttonRect.width / 2)
        const deltaY = targetY - (buttonRect.top + buttonRect.height / 2)
        
        setAnimationElement({
          x: buttonRect.left + buttonRect.width / 2,
          y: buttonRect.top + buttonRect.height / 2,
          targetX: deltaX,
          targetY: deltaY
        })
        
        setIsAnimating(true)
        
        // Reset animation after completion
        setTimeout(() => {
          setIsAnimating(false)
          setAnimationElement(null)
        }, 1000)
      }
    }

  // Zoom functionality - TEMPORARILY DISABLED 从下一句开始把//删掉即可
  // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (!imageContainerRef.current) return
    
  //   const rect = imageContainerRef.current.getBoundingClientRect() 
  //   // Calculate relative position within the image (0-1 range)
  //   const relativeX = (e.clientX - rect.left) / rect.width
  //   const relativeY = (e.clientY - rect.top) / rect.height
    
  //   // Convert to percentage for positioning, ensuring the zoom centers on mouse position
  //   const x = relativeX * 100
  //   const y = relativeY * 100
    
  //   setZoomPosition({ x, y })
  // }

  // const handleMouseEnter = () => {
  //   setShowZoom(true)
  // }

  // const handleMouseLeave = () => {
  //   setShowZoom(false)
  // }

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

      {/* Flying Heart Animation */}
      {isAnimating && animationElement && (
        <div 
          className="fixed z-50 pointer-events-none"
          style={{
            left: animationElement.x,
            top: animationElement.y,
            transform: 'translate(-50%, -50%)',
            animation: `heartFly 1s ease-in-out forwards`,
            '--target-x': `${animationElement.targetX}px`,
            '--target-y': `${animationElement.targetY}px`,
          } as React.CSSProperties}
        >
          <Heart className="h-6 w-6 text-red-500 fill-red-500" />
        </div>
      )}
      {/* Product Details */}
      <section className="py-12">
        <FadeInOnScroll>
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Product Images with Zoom */}
              <div className="space-y-4">
                {/* Main Image with Zoom */}
                <div className="relative">
                  <div
                    ref={imageContainerRef}
                    className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative"
                    // onMouseMove={handleMouseMove} 这三句把//删掉即可
                    // onMouseEnter={handleMouseEnter}
                    // onMouseLeave={handleMouseLeave}
                  >
                    <img
                      src={productImages[selectedImage] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Zoom Overlay - TEMPORARILY DISABLED */} 
                    {/* {showZoom && ( 把两个/*删掉即可
                      <div className="absolute inset-0 bg-black bg-opacity-20 pointer-events-none">
                        <div 
                          className="absolute w-12 h-12 border-2 border-white rounded-full pointer-events-none"
                          style={{
                            left: `${zoomPosition.x}%`,
                            top: `${zoomPosition.y}%`,
                            transform: 'translate(-50%, -50%)',
                          }}
                        />
                      </div>
                    )} */}
                  </div>
                  
                  {/* Zoom Preview - TEMPORARILY DISABLED */}
                  {/* {showZoom && ( 同上
                    <div className="absolute top-0 left-full ml-4 w-72 h-72 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg z-10">
                      <img
                        src={productImages[selectedImage] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        style={{
                          transform: `scale(4)`,
                          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        }}
                      />
                    </div>
                  )} */}
                </div>
                
                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:border-blue-400 ${
                        selectedImage === index ? "border-blue-600" : "border-transparent"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Winner Badge for 4MLS-1 and 3MLS-1 */}
                {(product.name === "4MLS-1" || product.name === "3MLS-1") && (
                  <div className="text-center mb-6">
                    <div className="flex flex-col items-center space-y-3">
                      <img 
                        src="/images/china fish.png" 
                        alt="Brand Logo" 
                        className="h-16 w-auto"
                      />
                      <p className="text-blue-800 font-semibold text-lg">
                        WINNER 2014 BEST IN SHOW
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Winner Badge for 4CRAW products */}
                {(product.name === "4CRAW(Weedless)" || product.name === "4CRAW(Back Jump)" || product.name === "4CRAW(JIG Head)") && (
                  <div className="text-center mb-6">
                    <div className="flex flex-col items-center space-y-3">
                      <img 
                        src="/images/china fish.png" 
                        alt="Brand Logo" 
                        className="h-16 w-auto"
                      />
                      <p className="text-blue-800 font-semibold text-lg">
                        WINNER 2015 BEST IN SHOW
                      </p>
                    </div>
                  </div>
                )}
                
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    {product.isNew && (
                      <div className="absolute top-2 right-2 z-10">
                        <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">{t.newBadge}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button 
                    ref={wishlistButtonRef}
                    onClick={handleAddToWishlist} 
                    className={`gap-2 ${wishlistItems.includes(id) ? 'bg-red-500 hover:bg-red-600' : ''}`}
                  >
                    <Heart 
                      className={`h-4 w-4 ${wishlistItems.includes(id) ? 'text-white fill-white' : ''}`} 
                    />
                    {wishlistItems.includes(id) ? t.addedToWishlist : t.addToWishlist}
                  </Button>
                  <Button asChild variant="outline" className="gap-2 bg-transparent">
                    <Link href="/contact">
                      <Mail className="h-4 w-4" />
                      {t.contactSupplier}
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2 bg-transparent">
                        <Share2 className="h-4 w-4" />
                        {t.share}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleShare("linkedin")}>LinkedIn</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare("facebook")}>Facebook</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare("x")}>X</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare("whatsapp")}>WhatsApp</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare("email")}>Email</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare("copy")}>Copy Link</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Specifications */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">{t.specifications}</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <dl className="space-y-2">
                      {/* Cast key to keyof ProductSpecifications to satisfy TypeScript */}
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <dt className="font-medium text-gray-600">
                            {getTranslatedSpecKey(key as keyof ProductSpecifications, language)}:
                          </dt>
                          {/* Cast value to string as it's expected to be a string */}
                          <dd className="text-gray-900">{value as string}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">{t.keyFeatures}</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </section>

      {/* Product Image Gallery Section */}
      <section className="py-16 bg-white">
        <FadeInOnScroll>
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="w-[70%]">
                <h2 className="text-2xl font-bold text-center mb-12 text-gray-900">{t.productDetail}</h2>
                
                {/* Spliced Product Detail Images */}
                <div className="w-full">
                  {(product.detailImages || []).map((image, index) => (
                    <div key={index} className="w-full">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} - ${index + 1}`}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </section>
    </div>
  )
}
