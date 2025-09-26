 "use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Heart, Mail, ChevronDown, Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"
import { FadeInOnScroll } from "@/components/FadeInOnScroll"
import Image from "next/image"


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
  wishlist: string
  myWishlist: string
  emptyWishlist: string
  emptyWishlistMessage: string
  continueShopping: string
  contactUs: string
  removeFromWishlist: string
  viewProduct: string
  contactWithWishlist: string
  item: string
  items: string
  inYourWishlist: string
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
  Length?: string
  Weight?: string
  Type?: string
  "Target Fish"?: string
  "Water Depth"?: string
  Material?: string
  Size?: string
  Action?: string
  Color?: string
  "Hook Size"?: string
}

interface ProductDetail {
  id: string
  name: string
  description: string
  image: string
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
    wishlist: "WISHLIST",
    myWishlist: "My Wishlist",
    emptyWishlist: "Your wishlist is empty",
    emptyWishlistMessage: "You haven't added any products to your wishlist yet. Start exploring our products!",
    continueShopping: "Continue Shopping",
    contactUs: "Contact Us",
    removeFromWishlist: "Remove from Wishlist",
    viewProduct: "View Product",
    contactWithWishlist: "Contact Us with Wishlist",
    item: "item",
    items: "items",
    inYourWishlist: "in your wishlist",
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
    home: "首页",
    aboutUs: "关于我们",
    hardLure: "硬饵",
    softLure: "软饵",
    metalLure: "金属饵",
    squidLure: "鱿鱼饵",
    accessory: "配件",
    wishlist: "愿望清单",
    myWishlist: "我的愿望清单",
    emptyWishlist: "您的愿望清单是空的",
    emptyWishlistMessage: "您还没有向愿望清单添加任何产品。开始探索我们的产品吧！",
    continueShopping: "继续购物",
    contactUs: "联系我们",
    removeFromWishlist: "从愿望清单移除",
    viewProduct: "查看产品",
    contactWithWishlist: "联系我们并发送愿望清单",
    item: "件",
    items: "件",
    inYourWishlist: "在您的愿望清单中",
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
    home: "ホーム",
    aboutUs: "会社概要",
    hardLure: "ハードルアー",
    softLure: "ソフトルアー",
    metalLure: "メタルルアー",
    squidLure: "イカルアー",
    accessory: "アクセサリー",
    wishlist: "ウィッシュリスト",
    myWishlist: "マイウィッシュリスト",
    emptyWishlist: "ウィッシュリストが空です",
    emptyWishlistMessage: "まだウィッシュリストに商品を追加していません。商品を探してみましょう！",
    continueShopping: "ショッピングを続ける",
    contactUs: "お問い合わせ",
    removeFromWishlist: "ウィッシュリストから削除",
    viewProduct: "商品を見る",
    contactWithWishlist: "ウィッシュリストと一緒にお問い合わせ",
    item: "アイテム",
    items: "アイテム",
    inYourWishlist: "ウィッシュリストに",
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
    home: "홈",
    aboutUs: "회사소개",
    hardLure: "하드루어",
    softLure: "소프트루어",
    metalLure: "메탈루어",
    squidLure: "오징어루어",
    accessory: "액세서리",
    wishlist: "위시리스트",
    myWishlist: "내 위시리스트",
    emptyWishlist: "위시리스트가 비어있습니다",
    emptyWishlistMessage: "아직 위시리스트에 상품을 추가하지 않았습니다. 상품을 둘러보세요!",
    continueShopping: "쇼핑 계속하기",
    contactUs: "문의하기",
    removeFromWishlist: "위시리스트에서 제거",
    viewProduct: "상품 보기",
    contactWithWishlist: "위시리스트와 함께 문의하기",
    item: "아이템",
    items: "아이템",
    inYourWishlist: "위시리스트에",
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
    home: "INICIO",
    aboutUs: "ACERCA DE",
    hardLure: "SEÑUELO DURO",
    softLure: "SEÑUELO BLANDO",
    metalLure: "SEÑUELO METÁLICO",
    squidLure: "SEÑUELO CALAMAR",
    accessory: "ACCESORIO",
    wishlist: "LISTA DE DESEOS",
    myWishlist: "Mi Lista de Deseos",
    emptyWishlist: "Tu lista de deseos está vacía",
    emptyWishlistMessage: "Aún no has agregado productos a tu lista de deseos. ¡Explora nuestros productos!",
    continueShopping: "Continuar Comprando",
    contactUs: "Contáctenos",
    removeFromWishlist: "Eliminar de la Lista",
    viewProduct: "Ver Producto",
    contactWithWishlist: "Contáctenos con Lista de Deseos",
    item: "artículo",
    items: "artículos",
    inYourWishlist: "en tu lista de deseos",
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
    home: "ANA SAYFA",
    aboutUs: "HAKKIMIZDA",
    hardLure: "SERT YEM",
    softLure: "YUMUŞAK YEM",
    metalLure: "METAL YEM",
    squidLure: "KALAMAR YEMİ",
    accessory: "AKSESUAR",
    wishlist: "İSTEK LİSTESİ",
    myWishlist: "İstek Listem",
    emptyWishlist: "İstek listeniz boş",
    emptyWishlistMessage: "Henüz istek listenize ürün eklemediniz. Ürünlerimizi keşfedin!",
    continueShopping: "Alışverişe Devam Et",
    contactUs: "İletişim",
    removeFromWishlist: "İstek Listesinden Kaldır",
    viewProduct: "Ürünü Görüntüle",
    contactWithWishlist: "İstek Listesi ile İletişim",
    item: "ürün",
    items: "ürün",
    inYourWishlist: "istek listenizde",
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
    home: "ГЛАВНАЯ",
    aboutUs: "О НАС",
    hardLure: "ТВЁРДАЯ ПРИМАНКА",
    softLure: "МЯГКАЯ ПРИМАНКА",
    metalLure: "МЕТАЛЛИЧЕСКАЯ ПРИМАНКА",
    squidLure: "ПРИМАНКА ДЛЯ КАЛЬМАРА",
    accessory: "АКСЕССУАРЫ",
    wishlist: "СПИСОК ЖЕЛАНИЙ",
    myWishlist: "Мой список желаний",
    emptyWishlist: "Ваш список желаний пуст",
    emptyWishlistMessage: "Вы еще не добавили товары в список желаний. Изучите наши товары!",
    continueShopping: "Продолжить покупки",
    contactUs: "Связаться с нами",
    removeFromWishlist: "Удалить из списка",
    viewProduct: "Посмотреть товар",
    contactWithWishlist: "Связаться с нами со списком желаний",
    item: "товар",
    items: "товара",
    inYourWishlist: "в вашем списке желаний",
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
    home: "INÍCIO",
    aboutUs: "SOBRE NÓS",
    hardLure: "ISCA RÍGIDA",
    softLure: "ISCA MACIA",
    metalLure: "ISCA METÁLICA",
    squidLure: "ISCA PARA LULA",
    accessory: "ACESSÓRIOS",
    wishlist: "LISTA DE DESEJOS",
    myWishlist: "Minha Lista de Desejos",
    emptyWishlist: "Sua lista de desejos está vazia",
    emptyWishlistMessage: "Você ainda não adicionou produtos à sua lista de desejos. Explore nossos produtos!",
    continueShopping: "Continuar Comprando",
    contactUs: "Contate-nos",
    removeFromWishlist: "Remover da Lista",
    viewProduct: "Ver Produto",
    contactWithWishlist: "Contate-nos com Lista de Desejos",
    item: "item",
    items: "itens",
    inYourWishlist: "na sua lista de desejos",
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

// Sample product details - EXPANDED TO INCLUDE ALL PRODUCTS
const productDetails: ProductDetailsMap = {
  jb50: {
    id: "jb50",
    name: "JB50",
    description: "50mm 2.8g Suspend/Long Cast",
    image: "/product/jb50/jb50.png?height=200&width=200&text=JB50",
  },
  jb65: {
    id: "jb65",
    name: "JB65",
    description: "65mm 7g Suspend/Magnet",
    image: "/product/jb65-85-95-120-150/jb65.png?height=200&width=200&text=JB65",
  },
  jb85: {
    id: "jb85",
    name: "JB85",
    description: "83mm 10g Suspend/Magnet",
    image: "/product/jb65-85-95-120-150/jb85.png?height=200&width=200&text=JB85",
  },
  jb95: {
    id: "jb95",
    name: "JB95",
    description: "95mm 15g Suspend/Magnet",
    image: "/product/jb65-85-95-120-150/jb95.png?height=200&width=200&text=JB95",
  },
  jb120: {
    id: "jb120",
    name: "JB120",
    description: "120mm 22g Suspend/Magnet",
    image: "/product/jb65-85-95-120-150/jb120.png?height=200&width=200&text=JB120",
  },
  jb150: {
    id: "jb150",
    name: "JB150",
    description: "150mm 40.2g Suspend/Magnet",
    image: "/product/jb65-85-95-120-150/jb150.png?height=200&width=200&text=JB150",
  },
  ujs: {
    id: "ujs",
    name: "UJS",
    description: "110mm 15g Floating",
    image: "/product/ujs/ujs.png?height=200&width=200&text=UJS",
  },
  ujsM: {
    id: "ujsM",
    name: "UJS-M",
    description: "110mm 15.5g Suspending",
    image: "/product/ujs-m/ujsm.jpg?height=200&width=200&text=UJSM",
    isNew: true,
  },
  ujs85M: {
    id: "ujs85M",
    name: "UJS85-M",
    description: "85mm 10.5g Suspending",
    image: "/product/ujs-m/ujsm.jpg?height=200&width=200&text=UJSM",
    isNew: true,
  },
  inna60: {
    id: "inna60",
    name: "INNA60",
    description: "60mm 5.6g Floating",
    image: "/product//INNA/inna.png?height=200&width=200&text=INNA",
  },
  inna70: {
    id: "inna70",
    name: "INNA70",
    description: "74mm 11g Slow Sinking/Magnet Long Cast",
    image: "/product//INNA/inna.png?height=200&width=200&text=INNA",
  },
  inna90: {
    id: "inna90",
    name: "INNA90",
    description: "95mm 16.5g Slow Sinking/Magnet Long Cast",
    image: "/product//INNA/inna.png?height=200&width=200&text=INNA",
  },
  inna110: {
    id: "inna110",
    name: "INNA110",
    description: "115mm 23.2g Slow Sinking/Magnet Long Cast",
    image: "/product//INNA/inna.png?height=200&width=200&text=INNA",
  },
  inna110DD: {
    id: "inna110DD",
    name: "INNA110 DD",
    description: "110mm 28.7g Floating",
    image: "/product//INNA/inna.png?height=200&width=200&text=INNA",
  },
  inna110MD: {
    id: "inna110MD",
    name: "INNA110 MD",
    description: "110 26.7g Floating",
    image: "/product//INNA/inna.png?height=200&width=200&text=INNA",
  },
  inna140: {
    id: "inna140",
    name: "INNA140",
    description: "140 36g Slow Sinking/Magnet Long Cast",
    image: "/product//INNA/inna.png?height=200&width=200&text=INNA",
  },
  inna165: {
    id: "inna165",
    name: "INNA165",
    description: "165mm 53.4g Floating",
    image: "/product//INNA/inna.png?height=200&width=200&text=INNA",
  },
  inna165DD: {
    id: "inna165DD",
    name: "INNA165 DD",
    description: "165mm 66.3g Floating",
    image: "/product//INNA/inna.png?height=200&width=200&text=INNA",
  },
  inna165MD: {
    id: "inna165MD",
    name: "INNA165 MD",
    description: "165mm 51.3g Floating",
    image: "/product/INNA/inna.png?height=200&width=200&text=INNA",
  },
  minnow95: {
    id: "minnow95",
    name: "Minnow95",
    description: "97.5mm 14.3g Suspending",
    image: "/product/minnow/minnow.png?height=200&width=200&text=Minnow",
  },
  minnow115: {
    id: "minnow115",
    name: "Minnow115",
    description: "117.5mm 21.3g Suspending",
    image: "/product/minnow/minnow.png?height=200&width=200&text=Minnow",
  },
  jbs110: {
    id: "jbs110",
    name: "JBS110",
    description: "112mm 16g Suspending",
    image: "/product/jbs/jbs110.png?height=200&width=200&text=JBS110",
  },
  dd120: {
    id: "dd120",
    name: "DD120",
    description: "120mm 21g Suspend/Magnet",
    image: "/product/dd120/dd120.png?height=200&width=200&text=DD120",
  },
  suspJs: {
    id: "suspJs",
    name: "SUSP JS",
    description: "100mm 18g Suspending",
    image: "/product/susp-fjs/susp-fjs.png?height=200&width=200&text=SUSP-JS",
  },
  fjs: {
    id: "fjs",
    name: "FJS",
    description: "100mm 17.5g Floating",
    image: "/product/susp-fjs/susp-fjs.png?height=200&width=200&text=FJS",
  },
  fjs56: {
    id: "fjs56",
    name: "FJS56",
    description: "56mm 3.7g Suspending",
    image: "/product/susp-fjs/susp-fjs.png?height=200&width=200&text=FJS56",
  },
  swjk75: {
    id: "swjk75",
    name: "SWJK75",
    description: "75mm 12.5g Sinking",
    image: "/product/swjk/swjk.jpg?height=200&width=200&text=SWJK",
    isNew: true,
  },
  swjk95: {
    id: "swjk95",
    name: "SWJK95",
    description: "95mm 21g Sinking",
    image: "/product/swjk/swjk.jpg?height=200&width=200&text=SWJK",
    isNew: true,
  },
  j90: {
    id: "j90",
    name: "J90",
    description: "90mm 12g Floating",
    image: "/product/j/j90.jpg?height=200&width=200&text=J90",
  },
  j110: {
    id: "j110",
    name: "J110",
    description: "110mm 22g Floating",
    image: "/product/j/j110.png?height=200&width=200&text=J110",
  },
  newInna70: {
      id: "newInna70",
      name: "NEW INNA70",
      description: "70mm 7.5 Suspend/Magnet Long Cast",
      image: "/product/newinna/newinna.png?height=200&width=200&text=NEW+INNA",
    },
    newInna90: {
      id: "newInna90",
      name: "NEW INNA90",
      description: "90mm 13.5g Suspend/Magnet Long Cast",
      image: "/product/newinna/newinna.png?height=200&width=200&text=NEW+INNA",
    },
    newInna120: {
      id: "newInna120",
      name: "NEW INNA120",
      description: "120mm 27g Suspend/Magnet Long Cast",
      image: "/product/newinna/newinna.png?height=200&width=200&text=NEW+INNA",
    },
    rdr95: {
      id: "rdr95",
      name: "RDR95",
      description: "95mm 11g Floating",
      image: "/product/rdr/rdr.png?height=200&width=200&text=RDR",
    },
    rdr80: {
      id: "rdr80",
      name: "RDR80",
      description: "80mm 8.5g Floating",
      image: "/product/rdr/rdr.png?height=200&width=200&text=RDR",
    },
    brava77: {
      id: "brava77",
      name: "BRAVA 77",
      description: "77mm 7g Floating",
      image: "/product/brava/brava77.png?height=200&width=200&text=BRAVA+77",
    },
    nst5s: {
      id: "nst5s",
      name: "NST5S",
      description: "140mm 36.2g Floating",
      image: "/product/nst/nst.png?height=200&width=200&text=NST5S",
    },
    zx118: {
      id: "zx118",
      name: "ZX118",
      description: "118mm 19g Floating",
      image: "/product/zx/zx.png?height=200&width=200&text=ZX118",
    },
    cx70sp: {
      id: "cx70sp",
      name: "CX70SP",
      description: "70mm 6.9g Suspending",
      image: "/product/cxsp/cxsp.png?height=200&width=200&text=CXSP",
    },
    cx90sp: {
      id: "cx90sp",
      name: "CX90SP",
      description: "90mm 7.7g Suspending",
      image: "/product/cxsp/cxsp.png?height=200&width=200&text=CXSP",
    },
    kan160: {
      id: "kan160",
      name: "KAN160",
      description: "160mm 32.4g Suspending",
      image: "/product/kan/kan.png?height=200&width=200&text=KAN160",
    },
    rj100: {
      id: "rj100",
      name: "RJ100",
      description: "100mm 15.3g Suspending",
      image: "/product/rj/rj.png?height=200&width=200&text=RJ100s",
    },
    msq128: {
      id: "msq128",
      name: "MSQ128",
      description: "128mm 22.6g Suspending",
      image: "/product/msq/msq.png?height=200&width=200&text=MSQ128",
    },
    shin115: {
      id: "shin115",
      name: "SHIN115",
      description: "115mm 16g Suspending",
      image: "/product/shin/shin.png?height=200&width=200&text=SHIN115",
    },
    trc55: {
      id: "trc55",
      name: "TRC55",
      description: "55mm 4g Sinking",
      image: "/product/trc/trc.png?height=200&width=200&text=TRC55",
    },
    td120: {
      id: "td120",
      name: "TD120",
      description: "120mm 37.9g Floating",
      image: "/product/td/td.png?height=200&width=200&text=TD",
    },
    td150: {
      id: "td150",
      name: "TD150",
      description: "150mm 65.5g Floating",
      image: "/product/td/td.png?height=200&width=200&text=TD",
    },
    adcr60: {
      id: "adcr60",
      name: "ADCR60",
      description: "60mm 12.2g Floating",
      image: "/product/adcr60/adcr60.png?height=200&width=200&text=ADCR60",
      isNew: true,
    },
    advib58: {
      id: "advib58",
      name: "ADVIB58",
      description: "58mm 15.6g Sinking",
      image: "/product/advib58/advib58.png?height=200&width=200&text=ADVIB58",
      isNew: true,
    },
    mcs: {
      id: "mcs",
      name: "MCS",
      description: "38mm 4g",
      image: "/product/mc/mc.png?height=200&width=200&text=MC",
    },
    mcm: {
      id: "mcm",
      name: "MCM",
      description: "38mm 4g",
      image: "/product/mc/mc.png?height=200&width=200&text=MC",
    },
    crulS: {
      id: "crulS",
      name: "CRUL S",
      description: "45.5mm 6.5g Floating",
      image: "/product/crul/crul+.png?height=200&width=200&text=CRUL",
    },
    crulD: {
      id: "crulD",
      name: "CRUL D",
      description: "45.5mm 7g Floating",
      image: "/product/crul/crul+.png?height=200&width=200&text=CRUL",
    },
    crulDS38: {
      id: "crulDS38",
      name: "CRUL DS38",
      description: "38mm 4g Floating",
      image: "/product/crul/crul+.png?height=200&width=200&text=CRUL",
    },
    crulSS38: {
      id: "crulSS38",
      name: "CRUL SS38",
      description: "38mm 3.8g Floating",
      image: "/product/crul/crul+.png?height=200&width=200&text=CRUL",
    },
    crankS: {
      id: "crankS",
      name: "Crank-S",
      description: "60mm 12g/14g Floating-Silent/Suspend-rattle",
      image: "/product/crank/crank.png?height=200&width=200&text=Crank",
    },
    crankM: {
      id: "crankM",
      name: "Crank-M",
      description: "60mm 13g/15g Floating-Silent/Suspend-rattle",
      image: "/product/crank/crank.png?height=200&width=200&text=Crank",
    },
    ecs: {
      id: "ecs",
      name: "ECS",
      description: "60mm 12.5g Floating",
      image: "/product/ec/ec.png?height=200&width=200&text=EC",
    },
    ecm: {
      id: "ecm",
      name: "ECM",
      description: "60mm 13g Floating",
      image: "/product/ec/ec.png?height=200&width=200&text=EC",
    },
    ecl: {
      id: "ecl",
      name: "ECL",
      description: "60mm 14g Floating",
      image: "/product/ec/ec.png?height=200&width=200&text=EC",
    },
    scs: {
      id: "scs",
      name: "SCS",
      description: "60mm 13g Floating",
      image: "/product/scs/scs.png?height=200&width=200&text=SCS",
    },
    crs: {
      id: "crs",
      name: "CRS",
      description: "60mm 13.5g Floating",
      image: "/product/cr/cr.png?height=200&width=200&text=CRS",
    },
    crm: {
      id: "crm",
      name: "CRM",
      description: "68.5mm 20g Floating",
      image: "/product/cr/cr.png?height=200&width=200&text=CRS",
    },
    crsPlus: {
      id: "crsPlus",
      name: "CRS+",
      description: "60mm 15g Floating",
      image: "/product/cr/cr.png?height=200&width=200&text=CRS",
    },
    swcr63: {
      id: "swcr63",
      name: "SWCR63",
      description: "63mm 16g Sinking",
      image: "/product/swcr/swcr.png?height=200&width=200&text=SWCR",
      isNew: true,
    },
    swcr78: {
      id: "swcr78",
      name: "SWCR78",
      description: "78mm 25.5g Sinking",
      image: "/product/swcr/swcr.png?height=200&width=200&text=SWCR",
      isNew: true,
    },
    cms: {
      id: "cms",
      name: "CMS",
      description: "54mm 8g Floating",
      image: "/product/cm/cm.png?height=200&width=200&text=CMS",
    },
    cmm: {
      id: "cmm",
      name: "CMM",
      description: "54mm 8.5g Floating",
      image: "/product/cm/cm.png?height=200&width=200&text=CMM",
    },
    crd: {
      id: "crd",
      name: "CRD",
      description: "76mm 30g Floating",
      image: "/product/crd/crd.png?height=200&width=200&text=CRD",
    },
    crdPlus: {
      id: "crdPlus",
      name: "CRD+",
      description: "76mm 31g Floating",
      image: "/product/crd/crd.png?height=200&width=200&text=CRD+",
    },
    c35s: {
      id: "c35s",
      name: "C35S",
      description: "95mm 39g Floating",
      image: "/product/c35s/c35s.png?height=200&width=200&text=C35S",
    },
    c4d: {
      id: "c4d",
      name: "C4D",
      description: "103mm 59.5g Floating",
      image: "/product/c4d/c4d.png?height=200&width=200&text=C4D",
    },
    dds: {
      id: "dds",
      name: "DDS",
      description: "40mm 4.5g Floating",
      image: "/product/dds/dds.png?height=200&width=200&text=DDS",
    },
    jcm: {
      id: "jcm",
      name: "JCM",
      description: "35mm 3.7g Floating",
      image: "/product/jcm/jcm.png?height=200&width=200&text=JCM",
    },
    fsc55: {
      id: "fsc55",
      name: "FSC55",
      description: "55mm 8g Floating",
      image: "/product/fsc/fsc.png?height=200&width=200&text=FSC55",
    },
    fsc65: {
      id: "fsc65",
      name: "FSC65",
      description: "65mm 14g Floating",
      image: "/product/fsc/fsc.png?height=200&width=200&text=FSC65",
    },
    sr4: {
      id: "sr4",
      name: "SR4",
      description: "65mm 14.4g Floating",
      image: "/product/sr4/sr4.png?height=200&width=200&text=SR4",
    },
    rt: {
      id: "rt",
      name: "RT",
      description: "66mm 17g Sinking",
      image: "/product/rt/rt.png?height=200&width=200&text=RT",
    },
    lcrS: {
      id: "lcrS",
      name: "LCR-S",
      description: "60mm 10.5g Sinking",
      image: "/product/lcr/lcr.png?height=200&width=200&text=LCRs",
    },
    lcr: {
      id: "lcr",
      name: "LCR",
      description: "75mm 18.5g Sinking",
      image: "/product/lcr/lcr.png?height=200&width=200&text=LCR",
    },
    rt50: {
      id: "rt50",
      name: "RT50",
      description: "51mm 10g Sinking/Rattle",
      image: "/product/rt-vib/rt-vib.png?height=200&width=200&text=RT50",
    },
    rt70: {
      id: "rt70",
      name: "RT70",
      description: "66mm 20g Sinking/Rattle",
      image: "/product/rt-vib/rt-vib.png?height=200&width=200&text=RT70",
    },
    vib40: {
      id: "vib40",
      name: "VIB40",
      description: "40mm 3.7g Sinking/Rattle",
      image: "/product/rt-vib/rt-vib.png?height=200&width=200&text=VIB40",
    },
    rattle60: {
      id: "rattle60",
      name: "Rattle60",
      description: "60mm 13g Sinking/Rattle",
      image: "/product/rattle/rattle.png?height=200&width=200&text=Rattle60",
    },
    csh: {
      id: "csh",
      name: "CSH",
      description: "72mm 12g Floating",
      image: "/product/csh/csh.png?height=200&width=200&text=CSH",
    },
    ss82: {
      id: "ss82",
      name: "SS82",
      description: "82mm 15g/18g Slow Sinking/Fast Sinking",
      image: "/product/ss82/ss82.png?height=200&width=200&text=SS82",
    },
    rapShad70: {
      id: "rapShad70",
      name: "RAP SHAD70",
      description: "70mm 8.2g Floating",
      image: "/product/rapshad/rapshad.png?height=200&width=200&text=RAP+SHAD70",
    },
    shadS: {
      id: "shadS",
      name: "Shad-S",
      description: "71mm 10g Suspending",
      image: "/product/shad/shad.png?height=200&width=200&text=Shad-S",
    },
    shadM: {
      id: "shadM",
      name: "Shad-M",
      description: "71mm 12g Suspending",
      image: "/product/shad/shad.png?height=200&width=200&text=Shad-M",
    },
    shad60M: {
      id: "shad60M",
      name: "Shad60-M",
      description: "60mm 7g Suspending",
      image: "/product/shad60m/shad60m.png?height=200&width=200&text=Shad60-M",
    },
    pep90: {
      id: "pep90",
      name: "PEP90",
      description: "90mm 13g TOP WATER",
      image: "/product/pep/pep.png?height=200&width=200&text=PEP90",
      isNew: true,
    },
    pep105: {
      id: "pep105",
      name: "PEP105",
      description: "105mm 17.5g TOP WATER",
      image: "/product/pep/pep.png?height=200&width=200&text=PEP105",
      isNew: true,
    },
    spm80: {
      id: "spm80",
      name: "SPM80",
      description: "80mm 13g TOP WATER",
      image: "/product/spm/spm.png?height=200&width=200&text=SPM80",
      isNew: true,
    },
    twp: {
      id: "twp",
      name: "TWP",
      description: "64.5mm 8.5g TOP WATER",
      image: "/product/twp/twp.png?height=200&width=200&text=TWP",
    },
    twpm: {
      id: "twpm",
      name: "TWPM",
      description: "74.5mm 14g TOP WATER",
      image: "/product/twp/twp.png?height=200&width=200&text=TWPM",
    },
    twp43: {
      id: "twp43",
      name: "TWP43",
      description: "43mm 3.1g TOP WATER",
      image: "/product/twp/twp.png?height=200&width=200&text=TWP43",
    },
    pm: {
      id: "pm",
      name: "PM",
      description: "95mm 13g TOP WATER",
      image: "/product/pm/pm.png?height=200&width=200&text=PM",
    },
    pm127: {
      id: "pm127",
      name: "PM127",
      description: "127mm 29g TOP WATER",
      image: "/product/pm/pm.png?height=200&width=200&text=PM127",
    },
    pop50: {
      id: "pop50",
      name: "POP50",
      description: "51mm 4.5g TOP WATER",
      image: "/product/pop50/pop50.png?height=200&width=200&text=POP50",
    },
    pop65: {
      id: "pop65",
      name: "POP65",
      description: "66mm 7g TOP WATER",
      image: "/product/pop65-80/pop65.png?height=200&width=200&text=POP65",
    },
    pop80: {
      id: "pop80",
      name: "POP80",
      description: "80mm 12g TOP WATER",
      image: "/product/pop65-80/pop80.png?height=200&width=200&text=POP80",
    },
    pop100: {
      id: "pop100",
      name: "POP100",
      description: "100mm 21g TOP WATER",
      image: "/product/pop100/pop100.png?height=200&width=200&text=POP100",
    },
    pe85: {
      id: "pe85",
      name: "PE85",
      description: "85mm 11g TOP WATER",
      image: "/product/pe/pe.png?height=200&width=200&text=PE85",
    },
    pe115: {
      id: "pe115",
      name: "PE115",
      description: "115mm 20g TOP WATER",
      image: "/product/pe/pe.png?height=200&width=200&text=PE115",
    },
    pe100: {
      id: "pe100",
      name: "PE100",
      description: "100mm 16g TOP WATER",
      image: "/product/proppe100/proppe100.png?height=200&width=200&text=PE100",
    },
    propPe100: {
      id: "propPe100",
      name: "PROP PE100",
      description: "100mm 17.4g TOP WATER",
      image: "/product/proppe100/proppe100.png?height=200&width=200&text=PROP+PE100",
    },
    npe100: {
      id: "npe100",
      name: "NPE100",
      description: "100mm 19g TOP WATER",
      image: "/product/npe/npe.png?height=200&width=200&text=NPE100",
    },
    tw85Sus: {
      id: "tw85Sus",
      name: "TW85 (Suspending)",
      description: "85mm 13.5g Suspending",
      image: "/product/tw/tw.png?height=200&width=200&text=TW85+Suspending",
    },
    tw85Sink: {
      id: "tw85Sink",
      name: "TW85 (Sinking)",
      description: "85mm 28.5g Sinking",
      image: "/product/tw/tw.png?height=200&width=200&text=TW85+Sinking",
    },
    tw110Sus: {
      id: "tw110Sus",
      name: "TW110 (Suspending)",
      description: "110mm 23.8g Suspending",
      image: "/product/tw/tw.png?height=200&width=200&text=TW110+Suspending",
    },
    tw110Sink: {
      id: "tw110Sink",
      name: "TW110 (Sinking)",
      description: "110mm 45g Sinking",
      image: "/product/tw/tw.png?height=200&width=200&text=TW110+Sinking",
    },
    snake90: {
      id: "snake90",
      name: "SNAKE90",
      description: "90mm 11.6g TOP WATER",
      image: "/product/snake/snake.png?height=200&width=200&text=SNAKE90",
    },
    snake115: {
      id: "snake115",
      name: "SNAKE115",
      description: "115mm 22.4g TOP WATER",
      image: "/product/snake/snake.png?height=200&width=200&text=SNAKE115",
    },
    kp80: {
      id: "kp80",
      name: "KP80",
      description: "80mm 14g TOP WATER",
      image: "/product/kp/kp.png?height=200&width=200&text=KP80",
    },
    kp100: {
      id: "kp100",
      name: "KP100",
      description: "100mm 27.5g TOP WATER",
      image: "/product/kp/kp.png?height=200&width=200&text=KP100",
    },
    tws: {
      id: "tws",
      name: "TWS",
      description: "101.5mm 14.5g TOP WATER",
      image: "/product/tws/tws.png?height=200&width=200&text=TWS",
    },
    tws55: {
      id: "tws55",
      name: "TWS55",
      description: "55mm 3.5g TOP WATER",
      image: "/product/tws/tws.png?height=200&width=200&text=TWS55",
    },
    pe135: {
      id: "pe135",
      name: "PE135",
      description: "135mm 28g TOP WATER",
      image: "/product/pe135/pe135.png?height=200&width=200&text=PE135",
    },
    newPe105: {
      id: "newPe105",
      name: "NEW PE105",
      description: "105mm 15g TOP WATER",
      image: "/product/newpe/newpe.png?height=200&width=200&text=NEW+PE105",
    },
    newPe135: {
      id: "newPe135",
      name: "NEW PE135",
      description: "135mm 28g TOP WATER",
      image: "/product/newpe/newpe.png?height=200&width=200&text=NEW+PE135",
    },
    sd: {
      id: "sd",
      name: "SD",
      description: "60mm 13g TOP WATER",
      image: "/product/sd/sd.png?height=200&width=200&text=SD",
    },
    sd38: {
      id: "sd38",
      name: "SD38",
      description: "38mm 3.3g TOP WATER",
      image: "/product/sd/sd.png?height=200&width=200&text=SD38",
    },
    sm: {
      id: "sm",
      name: "SM",
      description: "96mm 13g TOP WATER",
      image: "/product/sm/sm.png?height=200&width=200&text=SM",
    },
    hs75: {
      id: "hs75",
      name: "HS75",
      description: "75mm 13.5g Sinking",
      image: "/product/hs/hs.png?height=200&width=200&text=HS75",
    },
    hs90: {
      id: "hs90",
      name: "HS90",
      description: "90mm 21.5g Sinking",
      image: "/product/hs/hs.png?height=200&width=200&text=HS90",
    },
    hmm35: {
      id: "hmm35",
      name: "HMM35",
      description: "90mm 20g Sinking",
      image: "/product/hmm/hmm.png?height=200&width=200&text=HMM35",
    },
    jl35: {
      id: "jl35",
      name: "JL35",
      description: "90mm 15.7g Sinking",
      image: "/product/jl/jl.png?height=200&width=200&text=JL35",
    },
    glide3: {
      id: "glide3",
      name: "GLIDE3",
      description: "80mm 7.9g Sinking",
      image: "/product/glide/glide.png?height=200&width=200&text=GLIDE3",
    },
    glide5: {
      id: "glide5",
      name: "GLIDE5",
      description: "130mm 25g Sinking",
      image: "/product/glide/glide.png?height=200&width=200&text=GLIDE5",
    },
    cn90s: {
      id: "cn90s",
      name: "CN90S",
      description: "90mm 9g Sinking",
      image: "/product/cn90/cn90.png?height=200&width=200&text=CN90S",
    },
    cn90f: {
      id: "cn90f",
      name: "CN90F",
      description: "90mm 8.2g Floating",
      image: "/product/cn90/cn90.png?height=200&width=200&text=CN90F",
    },
    hdFrog40: {
      id: "hdFrog40",
      name: "HD Frog40",
      description: "40mm 6g TOP WATER",
      image: "/product/hdFrog/hdFrog.png?height=200&width=200&text=HD+Frog40",
    },
    hdFrog50: {
      id: "hdFrog50",
      name: "HD Frog50",
      description: "50mm 9g TOP WATER",
      image: "/product/hdFrog/hdFrog.png?height=200&width=200&text=HD+Frog50",
    },
    hdFrog60: {
      id: "hdFrog60",
      name: "HD Frog60",
      description: "60mm 12g TOP WATER",
      image: "/product/hdFrog/hdFrog.png?height=200&width=200&text=HD+Frog60",
    },
    frog48: {
      id: "frog48",
      name: "Frog48",
      description: "48mm 8g TOP WATER",
      image: "/product/frog/frog.png?height=200&width=200&text=Frog48",
    },
    frog58: {
      id: "frog58",
      name: "Frog58",
      description: "58mm 11.5g TOP WATER",
      image: "/product/frog/frog.png?height=200&width=200&text=Frog58",
    },
    msl50: {
      id: "msl50",
      name: "MSL 50(TPE)",
      description: "50mm",
      image: "/product/msltpe/msl.png?height=200&width=200&text=MSL50",
    },
    msl70: {
      id: "msl70",
      name: "MSL 70(TPE)",
      description: "70mm",
      image: "/product/msltpe/msl.png?height=200&width=200&text=MSL70",
    },
    adst75: {
      id: "adst75",
      name: "ADST75",
      description: "75mm",
      image: "/product/adst/adst.png?height=200&width=200&text=ADST75+1",
    },
    adst85: {
      id: "adst85",
      name: "ADST85",
      description: "85mm",
      image: "/product/adst/adst.png?height=200&width=200&text=ADST85+1",
    },
    adst100: {
      id: "adst100",
      name: "ADST100",
      description: "100mm",
      image: "/product/adst/adst.png?height=200&width=200&text=ADST100+1",
    },
    ms35: {
      id: "ms35",
      name: "3.5MS",
      description: "89mm 7g Sinking/Rattle",
      image: "/product/ms/ms.png?height=200&width=200&text=3.5MS+1",
    },
    ms5: {
      id: "ms5",
      name: "5MS",
      description: "127mm 16g Sinking/Rattle",
      image: "/product/ms/ms.png?height=200&width=200&text=5MS+1",
    },
    mls2: {
      id: "mls2",
      name: "2MLS",
      description: "50mm 3.7g Sinking",
      image: "/product/mls/mls.png?height=200&width=200&text=2MLS+1",
    },
    mls3: {
      id: "mls3",
      name: "3MLS",
      description: "70mm 7.4g Sinking",
      image: "/product/mls/mls.png?height=200&width=200&text=3MLS+1",
    },
    mls4: {
      id: "mls4",
      name: "4MLS",
      description: "100mm 11g Sinking/Rattle",
      image: "/product/mls/mls.png?height=200&width=200&text=4MLS+1",
    },
    mls31: {
      id: "mls31",
      name: "3MLS-1",
      description: "3\" 6.5g Sinking",
      image: "/product/mls1/mls1.png?height=200&width=200&text=3MLS-1+1",
    },
    mls41: {
      id: "mls41",
      name: "4MLS-1",
      description: "4\" 14g Sinking",
      image: "/product/mls1/mls1.png?height=200&width=200&text=4MLS-1+1",
    },
    js75: {
      id: "js75",
      name: "JS75",
      description: "75mm 7.2g Sinking",
      image: "/product/js/js.png?height=200&width=200&text=JS75+1",
    },
    js90: {
      id: "js90",
      name: "JS90",
      description: "90mm 9.5g Sinking",
      image: "/product/js/js.png?height=200&width=200&text=JS90+1",
    },
    js110: {
      id: "js110",
      name: "JS110",
      description: "110mm 18.5g Sinking",
      image: "/product/js/js.png?height=200&width=200&text=JS110+1",
    },
    craw: {
      id: "craw",
      name: "CRAW",
      description: "3\" Sinking",
      image: "/product/craw/craw.png?height=200&width=200&text=CRAW+1",
    },
    craw4Weedless: {
      id: "craw4Weedless",
      name: "4CRAW(Weedless)",
      description: "105.5mm 17g Sinking",
      image: "/product/4craw/4craw.png?height=200&width=200&text=4CRAW+Weedless+1",
    },
    craw4BackJump: {
      id: "craw4BackJump",
      name: "4CRAW(Back Jump)",
      description: "105.5mm 15.4g Sinking",
      image: "/product/4craw/4craw.png?height=200&width=200&text=4CRAW+BackJump+1",
    },
    craw4JigHead: {
      id: "craw4JigHead",
      name: "4CRAW(JIG Head)",
      description: "105.5mm 19g Sinking",
      image: "/product/4craw/4craw.png?height=200&width=200&text=4CRAW+JIGHead+1",
    },
    ms45Shiner: {
      id: "ms45Shiner",
      name: "4.5MS-Shiner",
      description: "114mm 11g Sinking",
      image: "/product/45msshiner/45msshiner.png?height=200&width=200&text=4.5MS-Shiner+1",
    },
    ms35Shad: {
      id: "ms35Shad",
      name: "3.5MS-Shad",
      description: "90mm 10g Sinking",
      image: "/product/msshad/msshad.png?height=200&width=200&text=3.5MS-Shad+1",
    },
    ms3Shad: {
      id: "ms3Shad",
      name: "3MS-Shad",
      description: "77mm 8g Sinking",
      image: "/product/msshad/msshad.png?height=200&width=200&text=3MS-Shad+1",
    },
    goby60: {
      id: "goby60",
      name: "GOBY60",
      description: "60mm 3.5g Sinking/Rattle",
      image: "/product/goby/goby.png?height=200&width=200&text=GOBY60+1",
    },
    goby90: {
      id: "goby90",
      name: "GOBY90",
      description: "90mm 8g Sinking/Rattle",
      image: "/product/goby/goby.png?height=200&width=200&text=GOBY90+1",
    },
    goby120: {
      id: "goby120",
      name: "GOBY120",
      description: "120mm 18g Sinking/Rattle",
      image: "/product/goby/goby.png?height=200&width=200&text=GOBY120+1",
    },
    goby150: {
      id: "goby150",
      name: "GOBY150",
      description: "150mm 38g Sinking/Rattle",
      image: "/product/goby/goby.png?height=200&width=200&text=GOBY150+1",
    },
    fm60: {
      id: "fm60",
      name: "FM60",
      description: "57mm 2.5g Sinking",
      image: "/product/fm/fm.png?height=200&width=200&text=FM60+1",
    },
    fm80: {
      id: "fm80",
      name: "FM80",
      description: "74.5mm 4.5g Sinking",
      image: "/product/fm/fm.png?height=200&width=200&text=FM80+1",
    },
    splitTail: {
      id: "splitTail",
      name: "SPLIT TAIL",
      description: "3\" Sinking",
      image: "/product/splittail/splittail.png?height=200&width=200&text=SPLIT+TAIL+1",
    },
    nf70: {
      id: "nf70",
      name: "NF70",
      description: "70mm 3g Sinking",
      image: "/product/nf/nf.png?height=200&width=200&text=NF70+1",
    },
    nf90: {
      id: "nf90",
      name: "NF90",
      description: "90mm 5g Sinking",
      image: "/product/nf/nf.png?height=200&width=200&text=NF90+1",
    },
    nf110: {
      id: "nf110",
      name: "NF110",
      description: "110mm 9g Sinking",
      image: "/product/nf/nf.png?height=200&width=200&text=NF110+1",
    },
    nf130: {
      id: "nf130",
      name: "NF130",
      description: "130mm 13g Sinking",
      image: "/product/nf/nf.png?height=200&width=200&text=NF130+1",
    },
    worm: {
      id: "worm",
      name: "WORM",
      description: "5\" Sinking",
      image: "/product/worm/worm.png?height=200&width=200&text=WORM+1",
    },
    softShad: {
      id: "softShad",
      name: "SOFT SHAD",
      description: "2.5\" Sinking",
      image: "/product/softshad/softshad.png?height=200&width=200&text=SOFT+SHAD+1",
    },
    grub: {
      id: "grub",
      name: "GRUB",
      description: "2.5\" Sinking",
      image: "/product/grub/grub.png?height=200&width=200&text=GRUB+1",
    },
    ft110: {
      id: "ft110",
      name: "FT110",
      description: "110mm",
      image: "/product/ft/ft.jpg?height=200&width=200&text=FT110+1",
    },
    ft130: {
      id: "ft130",
      name: "FT130",
      description: "130mm",
      image: "/product/ft/ft.jpg?height=200&width=200&text=FT130+1",
    },
    pt2: {
      id: "pt2",
      name: "PT2",
      description: "50mm",
      image: "/product/pt/pt.png?height=200&width=200&text=PT2+1",
    },
    pt3: {
      id: "pt3",
      name: "PT3",
      description: "70mm",
      image: "/product/pt/pt.png?height=200&width=200&text=PT3+1",
    },
    hollowFrog: {
      id: "hollowFrog",
      name: "Hollow Frog",
      description: "50mm 11g TOP WATER",
      image: "/product/hollowfrog/hollowfrog.png?height=200&width=200&text=Hollow+Frog+1",
    },
    popHFrog: {
      id: "popHFrog",
      name: "POP HFrog",
      description: "56mm 12.5g TOP WATER",
      image: "/product/pophfrog/pophfrog.png?height=200&width=200&text=POP+HFrog+1",
    },
    popHFrog60: {
      id: "popHFrog60",
      name: "POP HFrog 60",
      description: "60mm 16.5g TOP WATER",
      image: "/product/pophfrog/pophfrog.png?height=200&width=200&text=POP+HFrog60+1",
    },
    solidFrog: {
      id: "solidFrog",
      name: "Solid Frog",
      description: "70mm 9g TOP WATER",
      image: "/product/solidfrog/solidfrog.png?height=200&width=200&text=Solid+Frog+1",
    },
    spinner14oz: {
      id: "spinner14oz",
      name: "1/4oz Spinner",
      description: "1/4oz Sinking",
      image: "/product/spinner/spinner.png?height=200&width=200&text=1%2F4oz+Spinner+1",
    },
    spinner12oz: {
      id: "spinner12oz",
      name: "1/2oz Spinner",
      description: "1/2oz Sinking",
      image: "/product/spinner/spinner.png?height=200&width=200&text=1%2F2oz+Spinner+1",
    },
    garfish15: {
      id: "garfish15",
      name: "Garfish 15g",
      description: "63mm 15g Sinking",
      image: "/product/garfish-metalshad/garfish.png?height=200&width=200&text=Garfish15+1",
    },
    garfish22: {
      id: "garfish22",
      name: "Garfish 22g",
      description: "73mm 22g Sinking",
      image: "/product/garfish-metalshad/garfish.png?height=200&width=200&text=Garfish22+1",
    },
    metalShad15: {
      id: "metalShad15",
      name: "Metal Shad 15g",
      description: "40mm 15g Sinking",
      image: "/product/garfish-metalshad/metalshad.png?height=200&width=200&text=MetalShad15+1",
    },
    metalShad22: {
      id: "metalShad22",
      name: "Metal Shad 22g",
      description: "46mm 22g Sinking",
      image: "/product/garfish-metalshad/metalshad.png?height=200&width=200&text=MetalShad22+1",
    },
    metalShad30: {
      id: "metalShad30",
      name: "Metal Shad 30g",
      description: "52mm 30g Sinking",
      image: "/product/garfish-metalshad/metalshad.png?height=200&width=200&text=MetalShad30+1",
    },
    metalShad40: {
      id: "metalShad40",
      name: "Metal Shad 40g",
      description: "58mm 40g Sinking",
      image: "/product/garfish-metalshad/metalshad.png?height=200&width=200&text=MetalShad40+1",
    },
    metalShad150: {
      id: "metalShad150",
      name: "Metal Shad 150g",
      description: "113mm 150g Fast Sinking",
      image: "/product/garfish-metalshad/metalshad.png?height=200&width=200&text=MetalShad150+1",
    },
    adegi60: {
      id: "adegi60",
      name: "ADEGI60",
      description: "60mm 5.4g Sinking",
      image: "/product/egi/egi.png?height=200&width=200&text=ADEGI60+1",
    },
    adegi80: {
      id: "adegi80",
      name: "ADEGI80",
      description: "80mm 9.5g Sinking",
      image: "/product/egi/egi.png?height=200&width=200&text=ADEGI80+1",
    },
    adegi96: {
      id: "adegi96",
      name: "ADEGI96",
      description: "96mm 16g Sinking",
      image: "/product/egi/egi.png?height=200&width=200&text=ADEGI96+1",
    },
    adegi110: {
      id: "adegi110",
      name: "ADEGI110",
      description: "110mm 22.5g Sinking",
      image: "/product/egi/egi.png?height=200&width=200&text=ADEGI110+1",
    },
    ls75: {
      id: "ls75",
      name: "LS75",
      description: "75mm 12g Sinking",
      image: "/product/ls/ls.png?height=200&width=200&text=LS75+1",
    },
    ls90: {
      id: "ls90",
      name: "LS90",
      description: "92mm 20g Sinking",
      image: "/product/ls/ls.png?height=200&width=200&text=LS90+1",
    },
  }

export default function WishlistPage() {
  const { language } = useLanguage()
  const t = translations[language]
  const [wishlistItems, setWishlistItems] = useState<string[]>([])
  const isFirstSave = useRef(true)
  const navHeartRef = useRef<HTMLDivElement>(null)

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    console.log('Loading from localStorage:', savedWishlist)
    if (savedWishlist) {
      const parsed = JSON.parse(savedWishlist)
      console.log('Parsed wishlist:', parsed)
      setWishlistItems(parsed)
    }
  }, [])

  // Save wishlist to localStorage whenever it changes (skip first run)
  useEffect(() => {
    if (isFirstSave.current) {
      isFirstSave.current = false
      return
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(id => id !== productId))
  }

  const getWishlistProducts = () => {
    console.log('Wishlist items from state:', wishlistItems)
    console.log('Available product keys:', Object.keys(productDetails))
    const uniqueIds = Array.from(new Set(wishlistItems))
    const products = uniqueIds.map((id) => {
      const product = productDetails[id]
      if (product) return product
      // Fallback for items that exist in localStorage but are missing in productDetails
      return {
        id,
        name: id,
        description: "Details coming soon.",
        image: `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(id)}`,
      }
    })
    console.log('Found products (with fallback):', products)
    return products
  }

  const handleContactWithWishlist = () => {
    const wishlistData = getWishlistProducts()
    const wishlistText = wishlistData.map(product => 
      `${product.name} - ${product.description}`
    ).join('\n')
    
    // Store wishlist data in localStorage for the contact page
    localStorage.setItem('contactWishlist', JSON.stringify(wishlistData))
    
    // Navigate to contact page
    window.location.href = '/contact'
  }

  const wishlistProducts = getWishlistProducts()

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
            <nav className="hidden lg:flex items-center space-x-16 ml-16">
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
      {/* Wishlist Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <div className="max-w-6xl mx-auto">
              {/* Page Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.myWishlist}</h1>
                <p className="text-gray-600 text-lg">
                  {wishlistItems.length} {wishlistItems.length === 1 ? t.item : t.items} {t.inYourWishlist}
                </p>
              </div>

              {/* Empty State */}
              {wishlistItems.length === 0 ? (
                <div className="text-center py-16">
                  <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t.emptyWishlist}</h2>
                  <p className="text-gray-600">{t.emptyWishlistMessage}</p>
                </div>
              ) : (
                <>
                  {/* Wishlist Items - compact list layout */}
                  <div className="mb-12 divide-y rounded-md border border-gray-200 bg-white">
                    {wishlistProducts.map((product, index) => (
                      <FadeInOnScroll key={product.id} delay={index * 0.05}>
                        <div className="flex items-center gap-4 p-4">
                          <div className="relative h-16 w-16 flex-shrink-0 rounded bg-gray-100 overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/product/${product.id}`}>{t.viewProduct}</Link>
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => removeFromWishlist(product.id)} className="gap-1">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </FadeInOnScroll>
                    ))}
                  </div>

                  {/* Contact Button */}
                  <div className="text-center">
                    <Button 
                      onClick={handleContactWithWishlist}
                      size="lg" 
                      className="gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                      <Mail className="h-5 w-5" />
                      {t.contactWithWishlist}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </div>
  )
}