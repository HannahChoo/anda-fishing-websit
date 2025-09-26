"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Heart } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"
import { useParams } from "next/navigation"
import { FadeInOnScroll } from "@/components/FadeInOnScroll"


const translations = {
  en: {
    home: "HOME",
    aboutUs: "ABOUT US",
    categorySubtitle: "Professional fishing lures for every angler",
    comingSoon: "Coming Soon",
    productsAvailableSoon: "Products for this category will be available soon.",
    newBadge: "NEW",
    hardLure: "HARD LURE",
    softLure: "SOFT LURE",
    metalLure: "METAL LURE",
    squidLure: "SQUID LURE",
    accessory: "ACCESSORY",
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
    jerkbaitDesc: "Well perform when retrieving and like a real fish when jerking. Most have a magnet weight transfer system. Suitable for both salt and fresh water.",
    crankBaitDesc: "Hand-tested for perfect action. Diverse styles/depths cover all conditions.",
    topWaterDesc: "Perfect for feeding fish. Most feature big noise systems to attract more.  ",
    liveDesc: "Real fish shape with live swimming action and natural colors for lifelike effect.",
    adstSeriesDesc: "Advanced soft tail designs.",
    shrimpDesc: "Lifelike shrimp imitations.",
    crawDesc: "Realistic crawfish lures.",
    shinerSeriesDesc: "Mimics natural shiner baitfish.",
    shadSeriesDesc: "Versatile shad profiles.",
    gobySeriesDesc: "Bottom-dwelling goby imitations.",
    fmSeriesDesc: "Finesse minnow designs.",
    splitTailDesc: "Unique fluttering action.",
    nfSeriesDesc: "Slender needle fish profiles.",
    wormDesc: "Classic soft plastic worms.",
    softShadDesc: "Paddle tail soft shads.",
    grubDesc: "Simple yet effective grub tails.",
    ftSeriesDesc: "Finesse tail designs.",
    ptSeriesDesc: "Paddle tail series for strong vibration.",
    frogDesc: "Topwater frog imitations.",
    spinnerDesc: "Flashy and vibrating spinnerbaits.",
    garfishDesc: "Slender metal jigs for fast retrieves.",
    metalShadDesc: "Heavy metal shads for deep jigging.",
    egiSeriesDesc: "Advanced egi jigs for squid.",
        lsSeriesDesc: "Light squid jigs for subtle presentations.",
    mslSeriesDesc: "High-performance squid lures.",
    accessoryDesc: "Essential fishing accessories and gear.",

  },
  zh: {
    home: "首页",
    aboutUs: "关于我们",
    categorySubtitle: "为每位钓手打造的专业拟饵",
    comingSoon: "即将上市",
    productsAvailableSoon: "此类别产品即将推出",
    newBadge: "新品",
    hardLure: "硬饵",
    softLure: "软饵",
    metalLure: "金属饵",
    squidLure: "鱿鱼饵",
    accessory: "配件",
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
    jerkbaitDesc: "收线时表现优异，抽动时如真鱼游动。多数配备磁力重心转移系统。适用于淡水和海水。",
    crankBaitDesc: "手工测试确保完美泳姿。多样款式/潜深覆盖全水域条件。",
    topWaterDesc: "完美针对捕食鱼类。多数配备大噪音系统增强诱鱼效果。",
    liveDesc: "真实鱼体造型，活鱼般泳姿，自然色泽实现逼真效果。",
    adstSeriesDesc: "先进软尾设计。",
    shrimpDesc: "栩栩如生的虾型仿生饵。",
    crawDesc: "逼真小龙虾拟饵。",
    shinerSeriesDesc: "模拟天然闪亮饵鱼。",
    shadSeriesDesc: "多用途鲱鱼轮廓。",
    gobySeriesDesc: "底栖虾虎鱼仿生饵。",
    fmSeriesDesc: "精细米诺设计。",
    splitTailDesc: "独特颤动动作。",
    nfSeriesDesc: "纤细针鱼轮廓。",
    wormDesc: "经典软胶蠕虫。",
    softShadDesc: "桨尾软鲱鱼。",
    grubDesc: "简洁高效的蛆型尾饵。",
    ftSeriesDesc: "精细尾部设计。",
    ptSeriesDesc: "强力振动桨尾系列。",
    frogDesc: "水面系青蛙仿生饵。",
    spinnerDesc: "闪光震动旋转亮片。",
    garfishDesc: "细长金属铁板，适合快速收线。",
    metalShadDesc: "重型金属鲱鱼，专攻深场抽铁板。",
    egiSeriesDesc: "先进鱿鱼专用EGI铁板。",
    lsSeriesDesc: "轻量鱿鱼铁板，实现精妙呈现。",
    mslSeriesDesc: "高性能鱿鱼专用饵。",
    accessoryDesc: "专业钓鱼配件和装备。",

  },
  ja: {
    home: "ホーム",
    aboutUs: "会社概要",
    categorySubtitle: "全てのアングラー向けプロ仕様ルアー",
    comingSoon: "近日発売",
    productsAvailableSoon: "このカテゴリーの商品は近日発売予定です",
    newBadge: "新製品",
    hardLure: "ハードルアー",
    softLure: "ソフトルアー",
    metalLure: "メタルルアー",
    squidLure: "イカルアー",
    accessory: "アクセサリー",
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
    jerkbaitDesc: "巻き取り時は安定、ジャーク時は本物の魚のような動き。磁石式重心移動システム搭載モデル多数。海水・淡水両用。",
    crankBaitDesc: "手作業で動作テスト済み。多様なスタイル/潜行深度で全条件に対応。",
    topWaterDesc: "フィーディング魚に最適。大音量ノイズシステム搭載モデル多数で集魚力アップ。",
    liveDesc: "リアルな魚体形状に生きているような泳ぎ。自然な発色で超リアル。",
    adstSeriesDesc: "先進ソフトテール設計。",
    shrimpDesc: "生きたエビのようなイミテーション。",
    crawDesc: "リアルなザリガニルアー。",
    shinerSeriesDesc: "天然の小魚を模倣。",
    shadSeriesDesc: "万能シャッドプロファイル。",
    gobySeriesDesc: "底生ハゼのイミテーション。",
    fmSeriesDesc: "フィネスミノー設計。",
    splitTailDesc: "ユニークなフラッターアクション。",
    nfSeriesDesc: "スレンダーなニードルフィッシュプロファイル。",
    wormDesc: "クラシックソフトプラスチックワーム。",
    softShadDesc: "パドルテールソフトシャッド。",
    grubDesc: "シンプルかつ効果的なグラブテール。",
    ftSeriesDesc: "フィネステール設計。",
    ptSeriesDesc: "強力振動パドルテールシリーズ。",
    frogDesc: "トップウォーターフロッグイミテーション。",
    spinnerDesc: "閃光＆振動スピナーベイト。",
    garfishDesc: "高速巻きに最適な細身メタルジグ。",
    metalShadDesc: "ディープジギング用ヘビーメタルシャッド。",
    egiSeriesDesc: "イカ用先進EGIジグ。",
    lsSeriesDesc: "繊細な動作向け軽量イカジグ。",
    mslSeriesDesc: "高性能イカ専用ルアー。",
    accessoryDesc: "必要不可欠な釣り用アクセサリーとギア。",

  },
  ko: {
    home: "홈",
    aboutUs: "회사소개",
    categorySubtitle: "모든 낚시꾼을 위한 전문 루어",
    comingSoon: "출시 예정",
    productsAvailableSoon: "이 카테고리의 상품은 곧 출시됩니다",
    newBadge: "신상품",
    hardLure: "하드루어",
    softLure: "소프트루어",
    metalLure: "메탈루어",
    squidLure: "오징어루어",
    accessory: "액세서리",
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
    jerkbaitDesc: "릴링 시 안정성, 저킹 시 실제 물고기 같은 움직임. 대부분 자기식 중량 이동 시스템 탑재. 담수·해수 모두 사용 가능.",
    crankBaitDesc: "수동 테스트로 완벽한 액션 보장. 다양한 스타일/잠항 깊이로 모든 조건 커버.",
    topWaterDesc: "먹이 활동 어종에 완벽. 대부분 대형 소음 시스템으로 어획력 향상.",
    liveDesc: "실제 어체 형태에 생생한 헤엄. 자연스러운 발색으로 현실감 극대화.",
    adstSeriesDesc: "고급 소프트 테일 디자인.",
    shrimpDesc: "살아있는 새우 같은 모방.",
    crawDesc: "실감나는 가재 루어.",
    shinerSeriesDesc: "천연 미끼고기 모방.",
    shadSeriesDesc: "다용도 쉐이드 프로파일.",
    gobySeriesDesc: "저서성 망둑어 모방.",
    fmSeriesDesc: "정교한 미노우 디자인.",
    splitTailDesc: "독특한 플러터링 액션.",
    nfSeriesDesc: "가느다란 바늘고기 프로파일.",
    wormDesc: "클래식 소프트 플라스틱 웜.",
    softShadDesc: "패들 테일 소프트 쉐이드.",
    grubDesc: "단순하지만 효과적인 그럽 테일.",
    ftSeriesDesc: "정교한 테일 디자인.",
    ptSeriesDesc: "강력한 진동 패들 테일 시리즈.",
    frogDesc: "탑워터 개구리 모방 루어.",
    spinnerDesc: "섬광 및 진동 스피너베이트.",
    garfishDesc: "고속 릴링용 슬림 메탈 징.",
    metalShadDesc: "심층 징깅용 헤비 메탈 쉐이드.",
    egiSeriesDesc: "오징어용 고급 EGI 징.",
    lsSeriesDesc: "섬세한 프레젠테이션용 경량 오징어 징.",
    mslSeriesDesc: "고성능 오징어 전용 루어.",
    accessoryDesc: "필수 낚시 액세서리 및 장비.",

  },
  es: {
    home: "INICIO",
    aboutUs: "ACERCA DE",
    categorySubtitle: "Señuelos profesionales para cada pescador",
    comingSoon: "Próximamente",
    productsAvailableSoon: "Productos para esta categoría estarán disponibles pronto",
    newBadge: "NUEVO",
    hardLure: "SEÑUELO DURO",
    softLure: "SEÑUELO BLANDO",
    metalLure: "SEÑUELO METÁLICO",
    squidLure: "SEÑUELO CALAMAR",
    accessory: "ACCESORIO",
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
    jerkbaitDesc: "Excelente rendimiento al recuperar y movimiento realista al tirar. La mayoría tiene sistema magnético de transferencia de peso. Adecuado para agua salada y dulce.",
    crankBaitDesc: "Probado a mano para acción perfecta. Diversos estilos/profundidades cubren todas las condiciones.",
    topWaterDesc: "Perfecto para peces alimentadores. La mayoría incluye sistemas de gran ruido para atraer más.",
    liveDesc: "Forma de pez real con acción de natación viva y colores naturales para efecto realista.",
    adstSeriesDesc: "Diseños avanzados de cola suave.",
    shrimpDesc: "Imitaciones realistas de camarón.",
    crawDesc: "Señuelos de cangrejo realistas.",
    shinerSeriesDesc: "Imita peces cebo brillantes naturales.",
    shadSeriesDesc: "Perfiles de sábalo versátiles.",
    gobySeriesDesc: "Imitaciones de gobio de fondo.",
    fmSeriesDesc: "Diseños de minnow de precisión.",
    splitTailDesc: "Acción de aleteo única.",
    nfSeriesDesc: "Perfiles esbeltos de pez aguja.",
    wormDesc: "Gusanos de plástico blando clásicos.",
    softShadDesc: "Sábalos blandos con cola de paleta.",
    grubDesc: "Colas de grub simples pero efectivas.",
    ftSeriesDesc: "Diseños de cola de precisión.",
    ptSeriesDesc: "Serie de cola de paleta para vibración fuerte.",
    frogDesc: "Imitaciones de rana para superficie.",
    spinnerDesc: "Spinnerbaits llamativos y vibrantes.",
    garfishDesc: "Jigs metálicos delgados para recuperación rápida.",
    metalShadDesc: "Sábalos metálicos pesados para jigging profundo.",
    egiSeriesDesc: "Jigs Egi avanzados para calamar.",
    lsSeriesDesc: "Jigs ligeros para calamar con presentaciones sutiles.",
    mslSeriesDesc: "Señuelos de alto rendimiento para calamar.",
    accessoryDesc: "Accesorios y equipos esenciales de pesca."
  },
  tr: {
    home: "ANA SAYFA",
    aboutUs: "HAKKIMIZDA",
    categorySubtitle: "Her balıkçı için profesyonel yemler",
    comingSoon: "Yakında",
    productsAvailableSoon: "Bu kategori için ürünler yakında çıkacak",
    newBadge: "YENİ",
    hardLure: "SERT YEM",
    softLure: "YUMUŞAK YEM",
    metalLure: "METAL YEM",
    squidLure: "KALAMAR YEMİ",
    accessory: "AKSESUAR",
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
    jerkbaitDesc: "Çekme sırasında mükemmel performans, sarsma sırasında gerçek balık gibi. Çoğunda manyetik ağırlık transfer sistemi var. Tatlı ve tuzlu su için uygun.",
    crankBaitDesc: "Mükemmel hareket için el testli. Çeşitli stiller/derinlikler tüm koşulları kapsar.",
    topWaterDesc: "Beslenen balıklar için mükemmel. Çoğu daha fazla çekmek için büyük ses sistemleri içerir.",
    liveDesc: "Gerçekçi efekt için canlı yüzme hareketi ve doğal renklerle gerçek balık şekli.",
    adstSeriesDesc: "Gelişmiş yumuşak kuyruk tasarımları.",
    shrimpDesc: "Gerçekçi karides taklitleri.",
    crawDesc: "Gerçekçi kerevit yemleri.",
    shinerSeriesDesc: "Doğal parlak yem balıklarını taklit eder.",
    shadSeriesDesc: "Çok yönlü shad profilleri.",
    gobySeriesDesc: "Dip tabanlı goby taklitleri.",
    fmSeriesDesc: "İnce işçilikli minnow tasarımları.",
    splitTailDesc: "Benzersiz çırpınma hareketi.",
    nfSeriesDesc: "İnce iğne balığı profilleri.",
    wormDesc: "Klasik yumuşak plastik solucanlar.",
    softShadDesc: "Kürek kuyruklu yumuşak shadlar.",
    grubDesc: "Basit ama etkili grub kuyrukları.",
    ftSeriesDesc: "İnce kuyruk tasarımları.",
    ptSeriesDesc: "Güçlü titreşim için kürek kuyruk serisi.",
    frogDesc: "Yüzey kurbağa taklitleri.",
    spinnerDesc: "Gösterişli ve titreşimli spinnerbaits.",
    garfishDesc: "Hızlı çekim için ince metal jigler.",
    metalShadDesc: "Derin jigging için ağır metal shadlar.",
    egiSeriesDesc: "Kalamar için gelişmiş egi jigler.",
    lsSeriesDesc: "Zarif sunumlar için hafif kalamar jigleri.",
    mslSeriesDesc: "Yüksek performanslı kalamar yemleri.",
    accessoryDesc: "Temel balıkçılık aksesuarları ve ekipmanları."
  },
  ru: {
    home: "ГЛАВНАЯ",
    aboutUs: "О НАС",
    categorySubtitle: "Профессиональные приманки для каждого рыболова",
    comingSoon: "Скоро в продаже",
    productsAvailableSoon: "Товары этой категории скоро появятся",
    newBadge: "НОВИНКА",
    hardLure: "ТВЁРДАЯ ПРИМАНКА",
    softLure: "МЯГКАЯ ПРИМАНКА",
    metalLure: "МЕТАЛЛИЧЕСКАЯ ПРИМАНКА",
    squidLure: "ПРИМАНКА ДЛЯ КАЛЬМАРА",
    accessory: "АКСЕССУАРЫ",
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
    jerkbaitDesc: "Отличная работа при подмотке и реалистичные движения при рывках. Большинство оснащены магнитной системой переноса веса. Подходит для пресной и соленой воды.",
    crankBaitDesc: "Ручное тестирование для идеальной игры. Разнообразие стилей/глубин для любых условий.",
    topWaterDesc: "Идеально для кормящейся рыбы. Большинство моделей с мощными шумовыми системами для привлечения.",
    liveDesc: "Реалистичная форма рыбы с живой игрой и натуральными расцветками.",
    adstSeriesDesc: "Продвинутые мягкие хвостовые дизайны.",
    shrimpDesc: "Реалистичные имитации креветок.",
    crawDesc: "Правдоподобные ракообразные приманки.",
    shinerSeriesDesc: "Копирует природную блестящую рыбку-приманку.",
    shadSeriesDesc: "Универсальные профили шеда.",
    gobySeriesDesc: "Имитации донных бычков.",
    fmSeriesDesc: "Точные дизайны гольяна.",
    splitTailDesc: "Уникальная трепещущая игра.",
    nfSeriesDesc: "Стройные профили рыбы-иглы.",
    wormDesc: "Классические мягкие пластиковые черви.",
    softShadDesc: "Шэды с лопастевидным хвостом.",
    grubDesc: "Простое, но эффективное груб-оперение.",
    ftSeriesDesc: "Дизайны финесс-хвостов.",
    ptSeriesDesc: "Серия лопастехвостов для сильной вибрации.",
    frogDesc: "Поверхностные имитации лягушки.",
    spinnerDesc: "Яркие и вибрирующие спиннербейты.",
    garfishDesc: "Узкие металлические джиги для быстрой подмотки.",
    metalShadDesc: "Тяжелые металлические шэды для глубокого джиггинга.",
    egiSeriesDesc: "Продвинутые джиги Egi для кальмара.",
    lsSeriesDesc: "Легкие кальмарные джиги для деликатной подачи.",
    mslSeriesDesc: "Высокопроизводительные приманки для кальмара.",
    accessoryDesc: "Необходимые рыболовные аксессуары и снаряжение."
  },
  pt: {
    home: "INÍCIO",
    aboutUs: "SOBRE NÓS",
    categorySubtitle: "Iscas profissionais para cada pescador",
    comingSoon: "Em Breve",
    productsAvailableSoon: "Produtos para esta categoria estarão disponíveis em breve",
    newBadge: "NOVO",
    hardLure: "ISCA RÍGIDA",
    softLure: "ISCA MACIA",
    metalLure: "ISCA METÁLICA",
    squidLure: "ISCA PARA LULA",
    accessory: "ACESSÓRIOS",
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
    jerkbaitDesc: "Excelente desempenho na recolha e movimentos realistas no jerk. Maioria com sistema magnético de transferência de peso. Adequado para água doce e salgada.",
    crankBaitDesc: "Testado manualmente para ação perfeita. Estilos/profundidades diversos cobrem todas as condições.",
    topWaterDesc: "Perfeito para peixes em alimentação. Maioria com sistemas de grande ruído para maior atração.",
    liveDesc: "Formato real de peixe com ação de natação viva e cores naturais para efeito realista.",
    adstSeriesDesc: "Designs avançados de cauda suave.",
    shrimpDesc: "Imitações realistas de camarão.",
    crawDesc: "Iscas de lagostim realistas.",
    shinerSeriesDesc: "Imita peixes-isca brilhantes naturais.",
    shadSeriesDesc: "Perfil de sável versátil.",
    gobySeriesDesc: "Imitações de gobídeo de fundo.",
    fmSeriesDesc: "Designs de minnow de precisão.",
    splitTailDesc: "Ação de tremulação única.",
    nfSeriesDesc: "Perfis esbeltos de peixe-agulha.",
    wormDesc: "Vermes clássicos de plástico macio.",
    softShadDesc: "Sável macio com cauda de remo.",
    grubDesc: "Caudas de grub simples mas eficazes.",
    ftSeriesDesc: "Designs de cauda de precisão.",
    ptSeriesDesc: "Série de cauda de remo para vibração forte.",
    frogDesc: "Imitações de rã para superfície.",
    spinnerDesc: "Spinnerbaits brilhantes e vibrantes.",
    garfishDesc: "Jigs metálicos esbeltos para recolha rápida.",
    metalShadDesc: "Sável metálico pesado para jigging profundo.",
    egiSeriesDesc: "Jigs Egi avançados para lula.",
    lsSeriesDesc: "Jigs leves para lula com apresentações sutis.",
    mslSeriesDesc: "Iscas de alto desempenho para lula.",
    accessoryDesc: "Acessórios e equipamentos essenciais de pesca."
  }
}

interface SubCategoryDetail {
  slug: string
  name: string
  descriptionKey: keyof typeof translations.en // Key to access translation
  image: string
}

type MainCategorySubCategoriesMap = Record<string, SubCategoryDetail[]>
// 这个是从首页进硬饵等等总类别会显示的！！！ 添加图片+描述
const mainCategorySubCategories: MainCategorySubCategoriesMap = {
  "hard-lure": [
    {
      slug: "jerkbait",
      name: "jerkbait",
      descriptionKey: "jerkbaitDesc",
      image: "/category/jerk.png?height=200&width=200&text=Jerkbait",
    },
    {
      slug: "crank-bait",
      name: "crankBait",
      descriptionKey: "crankBaitDesc",
      image: "/category/crank.png?height=200&width=200&text=Crank+Bait",
    },
    {
      slug: "top-water",
      name: "topWater",
      descriptionKey: "topWaterDesc",
      image: "/category/TOP.png?height=200&width=200&text=Top+Water",
    },
    {
      slug: "live",
      name: "live",
      descriptionKey: "liveDesc",
      image: "/category/live.png?height=200&width=200&text=Live+Lure",
    },
  ],
  "soft-lure": [
    {
      slug: "adst-series",
      name: "adstSeries",
      descriptionKey: "adstSeriesDesc",
      image: "/category/ADST.png?height=200&width=200&text=ADST+Series",
    },
    {
      slug: "shrimp",
      name: "shrimp",
      descriptionKey: "shrimpDesc",
      image: "/category/shrimp.png?height=200&width=200&text=Shrimp+Lure",
    },
    {
      slug: "craw",
      name: "craw",
      descriptionKey: "crawDesc",
      image: "/category/craw.png?height=200&width=200&text=Craw+Lure",
    },
    {
      slug: "shiner-series",
      name: "shinerSeries",
      descriptionKey: "shinerSeriesDesc",
      image: "/category/shiner.png?height=200&width=200&text=Shiner+Series",
    },
    {
      slug: "shad-series",
      name: "shadSeries",
      descriptionKey: "shadSeriesDesc",
      image: "/category/shad.png?height=200&width=200&text=Shad+Series",
    },
    {
      slug: "goby-series",
      name: "gobySeries",
      descriptionKey: "gobySeriesDesc",
      image: "/category/goby.png?height=200&width=200&text=Goby+Series",
    },
    {
      slug: "fm-series",
      name: "fmSeries",
      descriptionKey: "fmSeriesDesc",
      image: "/category/Fm.png?height=200&width=200&text=FM+Series",
    },
    {
      slug: "split-tail",
      name: "splitTail",
      descriptionKey: "splitTailDesc",
      image: "/category/split.png?height=200&width=200&text=Split+Tail",
    },
    {
      slug: "nf-series",
      name: "nfSeries",
      descriptionKey: "nfSeriesDesc",
      image: "/category/NF.png?height=200&width=200&text=NF+Series",
    },
    {
      slug: "worm",
      name: "worm",
      descriptionKey: "wormDesc",
      image: "/category/worm.png?height=200&width=200&text=Worm+Lure",
    },
    {
      slug: "soft-shad",
      name: "softShad",
      descriptionKey: "softShadDesc",
      image: "/category/softshad.png?height=200&width=200&text=Soft+Shad",
    },
    {
      slug: "grub",
      name: "grub",
      descriptionKey: "grubDesc",
      image: "/category/grub.png?height=200&width=200&text=Grub+Lure",
    },
    {
      slug: "ft-series",
      name: "ftSeries",
      descriptionKey: "ftSeriesDesc",
      image: "/category/FT.png?height=200&width=200&text=FT+Series",
    },
    {
      slug: "pt-series",
      name: "ptSeries",
      descriptionKey: "ptSeriesDesc",
      image: "/category/PT.png?height=200&width=200&text=PT+Series",
    },
    {
      slug: "frog",
      name: "frog",
      descriptionKey: "frogDesc",
      image: "/category/frog.png?height=200&width=200&text=Frog+Lure",
    },
  ],
  "metal-lure": [
    {
      slug: "spinner",
      name: "spinner",
      descriptionKey: "spinnerDesc",
      image: "/category/spinner.png?height=200&width=200&text=Spinner",
    },
    {
      slug: "garfish",
      name: "garfish",
      descriptionKey: "garfishDesc",
      image: "/category/garfish.png?height=200&width=200&text=Garfish",
    },
    {
      slug: "metal-shad",
      name: "metalShad",
      descriptionKey: "metalShadDesc",
      image: "/category/metalshad.png?height=200&width=200&text=Metal+Shad",
    },
  ],
  "squid-lure": [
    {
      slug: "egi-series",
      name: "egiSeries",
      descriptionKey: "egiSeriesDesc",
      image: "/category/EGI.png?height=200&width=200&text=EGI+Series",
    },
    {
      slug: "ls-series",
      name: "lsSeries",
      descriptionKey: "lsSeriesDesc",
      image: "/category/LS.png?height=200&width=200&text=LS+Series",
    },
  ],
  "accessory": [
    {
      slug: "msl-series",
      name: "mslSeries",
      descriptionKey: "mslSeriesDesc",
      image: "/category/MSL.png?height=200&width=200&text=MSL+Series",
    },
  ],
}

// List of main categories to check against
const mainCategorySlugs = Object.keys(mainCategorySubCategories)

// 总类别进入后的各分支内各型号产品!!!! 添加图片+描述
const productData: Record<string, any[]> = {
jerkbait:[
  {
    id: "jb50",
    name: "JB50",
    description: "50mm 2.8g Suspend/Long Cast",
    image: "/product/jb50/jb50.png?height=200&width=200&text=JB50",
  },
  {
    id: "jb65",
    name: "JB65",
    description: "65mm 7g Suspend/Magnet",
    image: "/product/jb65-85-95-120-150/jb65.png?height=200&width=200&text=JB65",
  },
  {
    id: "jb85",
    name: "JB85",
    description: "83mm 10g Suspend/Magnet",
    image: "/product/jb65-85-95-120-150/jb85.png?height=200&width=200&text=JB85",
  },
  {
    id: "jb95",
    name: "JB95",
    description: "95mm 15g Suspend/Magnet",
    image: "/product/jb65-85-95-120-150/jb95.png?height=200&width=200&text=JB95",
  },
  {
    id: "jb120",
    name: "JB120",
    description: "120mm 22g Suspend/Magnet",
    image: "/product/jb65-85-95-120-150/jb120.png?height=200&width=200&text=JB120",
  },
  {
    id: "jb150",
    name: "JB150",
    description: "150mm 40.2g Suspend/Magnet",
    image: "/product/jb65-85-95-120-150/jb150.png?height=200&width=200&text=JB150",
  },
  {
    id: "ujs",
    name: "UJS",
    description: "110mm 15g Floating",
    image: "/product/ujs/ujs.png?height=200&width=200&text=UJS",
  },
  {
    id: "ujsM",
    name: "UJS-M",
    description: "110mm 15.5g Suspending",
    image: "/product/ujs-m/ujsm.jpg?height=200&width=200&text=UJSM",
    isNew: true,
  },
  {
    id: "ujs85M",
    name: "UJS85-M",
    description: "85mm 10.5g Suspending",
    image: "/product/ujs-m/ujsm.jpg?height=200&width=200&text=UJSM",
    isNew: true,
  },
  {
    id: "inna60",
    name: "INNA60",
    description: "60mm 5.6g Floating",
    image: "/product//INNA/inna.png?height=200&width=200&text=INNA",
  },
  {
    id: "inna70",
    name: "INNA70",
    description: "74mm 11g Slow Sinking/Magnet Long Cast",
    image: "/product//INNA/inna.png?height=200&width=200&text=INNA",
  },
  {
    id: "inna90",
    name: "INNA90",
    description: "95mm 16.5g Slow Sinking/Magnet Long Cast",
    image: "/product//INNA/inna.png?height=200&width=200&text=INNA",
  },
  {
    id: "inna110",
    name: "INNA110",
    description: "115mm 23.2g Slow Sinking/Magnet Long Cast",
    image: "/product//INNA/inna.png?height=200&width=200&text=INNA",
  },
  {
    id: "inna110DD",
    name: "INNA110 DD",
    description: "110mm 28.7g Floating",
    image: "/product//INNA/inna.png?height=200&width=200&text=INNA",
  },
  {
    id: "inna110MD",
    name: "INNA110 MD",
    description: "110 26.7g Floating",
    image: "/product//INNA/inna.png?height=200&width=200&text=INNA",
  },
  {
    id: "inna140",
    name: "INNA140",
    description: "140 36g Slow Sinking/Magnet Long Cast",
    image: "/product//INNA/inna.png?height=200&width=200&text=INNA",
  },
  {
    id: "inna165",
    name: "INNA165",
    description: "165mm 53.4g Floating",
    image: "/product//INNA/inna.png?height=200&width=200&text=INNA",
  },
  {
    id: "inna165DD",
    name: "INNA165 DD",
    description: "165mm 66.3g Floating",
    image: "/product//INNA/inna.png?height=200&width=200&text=INNA",
  },
  {
    id: "inna165MD",
    name: "INNA165 MD",
    description: "165mm 51.3g Floating",
    image: "/product/INNA/inna.png?height=200&width=200&text=INNA",
  },
  {
    id: "minnow95",
    name: "Minnow95",
    description: "97.5mm 14.3g Suspending",
    image: "/product/minnow/minnow.png?height=200&width=200&text=Minnow",
  },
  {
    id: "minnow115",
    name: "Minnow115",
    description: "117.5mm 21.3g Suspending",
    image: "/product/minnow/minnow.png?height=200&width=200&text=Minnow",
  },
  {
    id: "jbs110",
    name: "JBS110",
    description: "112mm 16g Suspending",
    image: "/product/jbs/jbs110.png?height=200&width=200&text=JBS110",
  },
  {
    id: "dd120",
    name: "DD120",
    description: "120mm 21g Suspend/Magnet",
    image: "/product/dd120/dd120.png?height=200&width=200&text=DD120",
  },
  {
    id: "suspJs",
    name: "SUSP JS",
    description: "100mm 18g Suspending",
    image: "/product/susp-fjs/susp-fjs.png?height=200&width=200&text=SUSP-JS",
  },
  {
    id: "fjs",
    name: "FJS",
    description: "100mm 17.5g Floating",
    image: "/product/susp-fjs/susp-fjs.png?height=200&width=200&text=FJS",
  },
  {
    id: "fjs56",
    name: "FJS56",
    description: "56mm 3.7g Suspending",
    image: "/product/susp-fjs/susp-fjs.png?height=200&width=200&text=FJS56",
  },
  {
    id: "swjk75",
    name: "SWJK75",
    description: "75mm 12.5g Sinking",
    image: "/product/swjk/swjk.jpg?height=200&width=200&text=SWJK",
    isNew: true,
  },
  {
    id: "swjk95",
    name: "SWJK95",
    description: "95mm 21g Sinking",
    image: "/product/swjk/swjk.jpg?height=200&width=200&text=SWJK",
    isNew: true,
  },
  {
    id: "j90",
    name: "J90",
    description: "90mm 12g Floating",
    image: "/product/j/j90.jpg?height=200&width=200&text=J90",
  },
  {
    id: "j110",
    name: "J110",
    description: "110mm 22g Floating",
    image: "/product/j/j110.png?height=200&width=200&text=J110",
  },
  {
      id: "newInna70",
      name: "NEW INNA70",
      description: "70mm 7.5 Suspend/Magnet Long Cast",
      image: "/product/newinna/newinna.png?height=200&width=200&text=NEW+INNA",
  },
  {
      id: "newInna90",
      name: "NEW INNA90",
      description: "90mm 13.5g Suspend/Magnet Long Cast",
      image: "/product/newinna/newinna.png?height=200&width=200&text=NEW+INNA",
  },
  {
      id: "newInna120",
      name: "NEW INNA120",
      description: "120mm 27g Suspend/Magnet Long Cast",
      image: "/product/newinna/newinna.png?height=200&width=200&text=NEW+INNA",
  },
  {
      id: "rdr95",
      name: "RDR95",
      description: "95mm 11g Floating",
      image: "/product/rdr/rdr.png?height=200&width=200&text=RDR",
  },
  {
      id: "rdr80",
      name: "RDR80",
      description: "80mm 8.5g Floating",
      image: "/product/rdr/rdr.png?height=200&width=200&text=RDR",
  },
  {
      id: "brava77",
      name: "BRAVA 77",
      description: "77mm 7g Floating",
      image: "/product/brava/brava77.png?height=200&width=200&text=BRAVA+77",
  },
  {
      id: "nst5s",
      name: "NST5S",
      description: "140mm 36.2g Floating",
      image: "/product/nst/nst.png?height=200&width=200&text=NST5S",
  },
  {
      id: "zx118",
      name: "ZX118",
      description: "118mm 19g Floating",
      image: "/product/zx/zx.png?height=200&width=200&text=ZX118",
  },
  {
      id: "cx70sp",
      name: "CX70SP",
      description: "70mm 6.9g Suspending",
      image: "/product/cxsp/cxsp.png?height=200&width=200&text=CXSP",
  },
  {
      id: "cx90sp",
      name: "CX90SP",
      description: "90mm 7.7g Suspending",
      image: "/product/cxsp/cxsp.png?height=200&width=200&text=CXSP",
  },
  {
      id: "kan160",
      name: "KAN160",
      description: "160mm 32.4g Suspending",
      image: "/product/kan/kan.png?height=200&width=200&text=KAN160",
  },
  {
      id: "rj100",
      name: "RJ100",
      description: "100mm 15.3g Suspending",
      image: "/product/rj/rj.png?height=200&width=200&text=RJ100s",
  },
  {
      id: "msq128",
      name: "MSQ128",
      description: "128mm 22.6g Suspending",
      image: "/product/msq/msq.png?height=200&width=200&text=MSQ128",
  },
  {
      id: "shin115",
      name: "SHIN115",
      description: "115mm 16g Suspending",
      image: "/product/shin/shin.png?height=200&width=200&text=SHIN115",
  },
  {
      id: "trc55",
      name: "TRC55",
      description: "55mm 4g Sinking",
      image: "/product/trc/trc.png?height=200&width=200&text=TRC55",
  },
  {
      id: "td120",
      name: "TD120",
      description: "120mm 37.9g Floating",
      image: "/product/td/td.png?height=200&width=200&text=TD",
  },
  {
      id: "td150",
      name: "TD150",
      description: "150mm 65.5g Floating",
      image: "/product/td/td.png?height=200&width=200&text=TD",
  },
],
crankBait:[
  {
      id: "adcr60",
      name: "ADCR60",
      description: "60mm 12.2g Floating",
      image: "/product/adcr60/adcr60.png?height=200&width=200&text=ADCR60",
      isNew: true,
  },
  {
      id: "advib58",
      name: "ADVIB58",
      description: "58mm 15.6g Sinking",
      image: "/product/advib58/advib58.png?height=200&width=200&text=ADVIB58",
      isNew: true,
  },
  {
      id: "mcs",
      name: "MCS",
      description: "38mm 4g",
      image: "/product/mc/mc.png?height=200&width=200&text=MC",
  },
  {
      id: "mcm",
      name: "MCM",
      description: "38mm 4g",
      image: "/product/mc/mc.png?height=200&width=200&text=MC",
  },
  {
      id: "crulS",
      name: "CRULS",
      description: "45.5mm 6.5g Floating",
      image: "/product/crul/crul+.png?height=200&width=200&text=CRUL",
  },
  {
      id: "crulD",
      name: "CRULD",
      description: "45.5mm 7g Floating",
      image: "/product/crul/crul+.png?height=200&width=200&text=CRUL",
  },
  {
      id: "crulDS38",
      name: "CRUL DS38",
      description: "38mm 4g Floating",
      image: "/product/crul/crul+.png?height=200&width=200&text=CRUL",
  },
  {
      id: "crulSS38",
      name: "CRUL SS38",
      description: "38mm 3.8g Floating",
      image: "/product/crul/crul+.png?height=200&width=200&text=CRUL",
  },
  {
      id: "crankS",
      name: "Crank-S",
      description: "60mm 12g/14g Floating-Silent/Suspend-rattle",
      image: "/product/crank/crank.png?height=200&width=200&text=Crank",
  },
  {
      id: "crankM",
      name: "Crank-M",
      description: "60mm 13g/15g Floating-Silent/Suspend-rattle",
      image: "/product/crank/crank.png?height=200&width=200&text=Crank",
  },
  {
      id: "ecs",
      name: "ECS",
      description: "60mm 12.5g Floating",
      image: "/product/ec/ec.png?height=200&width=200&text=EC",
  },
  {
      id: "ecm",
      name: "ECM",
      description: "60mm 13g Floating",
      image: "/product/ec/ec.png?height=200&width=200&text=EC",
  },
  {
      id: "ecl",
      name: "ECL",
      description: "60mm 14g Floating",
      image: "/product/ec/ec.png?height=200&width=200&text=EC",
  },
  {
      id: "scs",
      name: "SCS",
      description: "60mm 13g Floating",
      image: "/product/scs/scs.png?height=200&width=200&text=SCS",
  },
  {
      id: "crs",
      name: "CRS",
      description: "60mm 13.5g Floating",
      image: "/product/cr/cr.png?height=200&width=200&text=CRS",
  },
  {
      id: "crm",
      name: "CRM",
      description: "68.5mm 20g Floating",
      image: "/product/cr/cr.png?height=200&width=200&text=CRS",
  },
  {
      id: "crsPlus",
      name: "CRS+",
      description: "60mm 15g Floating",
      image: "/product/cr/cr.png?height=200&width=200&text=CRS",
  },
  {
      id: "swcr63",
      name: "SWCR63",
      description: "63mm 16g Sinking",
      image: "/product/swcr/swcr.png?height=200&width=200&text=SWCR",
      isNew: true,
  },
  {
      id: "swcr78",
      name: "SWCR78",
      description: "78mm 25.5g Sinking",
      image: "/product/swcr/swcr.png?height=200&width=200&text=SWCR",
      isNew: true,
  },
  {
      id: "cms",
      name: "CMS",
      description: "54mm 8g Floating",
      image: "/product/cm/cm.png?height=200&width=200&text=CMS",
  },
  {
      id: "cmm",
      name: "CMM",
      description: "54mm 8.5g Floating",
      image: "/product/cm/cm.png?height=200&width=200&text=CMM",
  },
  {
      id: "crd",
      name: "CRD",
      description: "76mm 30g Floating",
      image: "/product/crd/crd.png?height=200&width=200&text=CRD",
  },
  {
      id: "crdPlus",
      name: "CRD+",
      description: "76mm 31g Floating",
      image: "/product/crd/crd.png?height=200&width=200&text=CRD+",
  },
  {
      id: "c35s",
      name: "C35S",
      description: "95mm 39g Floating",
      image: "/product/c35s/c35s.png?height=200&width=200&text=C35S",
  },
  {
      id: "c4d",
      name: "C4D",
      description: "103mm 59.5g Floating",
      image: "/product/c4d/c4d.png?height=200&width=200&text=C4D",
  },
  {
      id: "dds",
      name: "DDS",
      description: "40mm 4.5g Floating",
      image: "/product/dds/dds.png?height=200&width=200&text=DDS",
  },
  {
      id: "jcm",
      name: "JCM",
      description: "35mm 3.7g Floating",
      image: "/product/jcm/jcm.png?height=200&width=200&text=JCM",
  },
  {
      id: "fsc55",
      name: "FSC55",
      description: "55mm 8g Floating",
      image: "/product/fsc/fsc.png?height=200&width=200&text=FSC55",
  },
  {
      id: "fsc65",
      name: "FSC65",
      description: "65mm 14g Floating",
      image: "/product/fsc/fsc.png?height=200&width=200&text=FSC65",
  },
  {
      id: "sr4",
      name: "SR4",
      description: "65mm 14.4g Floating",
      image: "/product/sr4/sr4.png?height=200&width=200&text=SR4",
  },
  {
      id: "rt",
      name: "RT",
      description: "66mm 17g Sinking",
      image: "/product/rt/rt.png?height=200&width=200&text=RT",
  },
  {
      id: "lcrS",
      name: "LCR-S",
      description: "60mm 10.5g Sinking",
      image: "/product/lcr/lcr.png?height=200&width=200&text=LCRs",
  },
  {
      id: "lcr",
      name: "LCR",
      description: "75mm 18.5g Sinking",
      image: "/product/lcr/lcr.png?height=200&width=200&text=LCR",
  },
  {
      id: "rt50",
      name: "RT50",
      description: "51mm 10g Sinking/Rattle",
      image: "/product/rt-vib/rt-vib.png?height=200&width=200&text=RT50",
  },
  {
      id: "rt70",
      name: "RT70",
      description: "66mm 20g Sinking/Rattle",
      image: "/product/rt-vib/rt-vib.png?height=200&width=200&text=RT70",
  },
  {
      id: "vib40",
      name: "VIB40",
      description: "40mm 3.7g Sinking/Rattle",
      image: "/product/rt-vib/rt-vib.png?height=200&width=200&text=VIB40",
  },
  {
      id: "rattle60",
      name: "Rattle60",
      description: "60mm 13g Sinking/Rattle",
      image: "/product/rattle/rattle.png?height=200&width=200&text=Rattle60",
  },
  {
      id: "csh",
      name: "CSH",
      description: "72mm 12g Floating",
      image: "/product/csh/csh.png?height=200&width=200&text=CSH",
  },
  {
      id: "ss82",
      name: "SS82",
      description: "82mm 15g/18g Slow Sinking/Fast Sinking",
      image: "/product/ss82/ss82.png?height=200&width=200&text=SS82",
  },
  {
      id: "rapShad70",
      name: "RAP SHAD70",
      description: "70mm 8.2g Floating",
      image: "/product/rapshad/rapshad.png?height=200&width=200&text=RAP+SHAD70",
  },
  {
      id: "shadS",
      name: "Shad-S",
      description: "71mm 10g Suspending",
      image: "/product/shad/shad.png?height=200&width=200&text=Shad-S",
  },
  {
      id: "shadM",
      name: "Shad-M",
      description: "71mm 12g Suspending",
      image: "/product/shad/shad.png?height=200&width=200&text=Shad-M",
  },
  {
      id: "shad60M",
      name: "Shad60-M",
      description: "60mm 7g Suspending",
      image: "/product/shad60m/shad60m.png?height=200&width=200&text=Shad60-M",
  },
],
topWater:[

  {
      id: "pep90",
      name: "PEP90",
      description: "90mm 13g TOP WATER",
      image: "/product/pep/pep.png?height=200&width=200&text=PEP90",
      isNew: true,
  },
  {
      id: "pep105",
      name: "PEP105",
      description: "105mm 17.5g TOP WATER",
      image: "/product/pep/pep.png?height=200&width=200&text=PEP105",
      isNew: true,
  },
  {
      id: "spm80",
      name: "SPM80",
      description: "80mm 13g TOP WATER",
      image: "/product/spm/spm.png?height=200&width=200&text=SPM80",
      isNew: true,
  },
  {
      id: "twp",
      name: "TWP",
      description: "64.5mm 8.5g TOP WATER",
      image: "/product/twp/twp.png?height=200&width=200&text=TWP",
  },
  {
      id: "twpm",
      name: "TWPM",
      description: "74.5mm 14g TOP WATER",
      image: "/product/twp/twp.png?height=200&width=200&text=TWPM",
  },
  {
      id: "twp43",
      name: "TWP43",
      description: "43mm 3.1g TOP WATER",
      image: "/product/twp/twp.png?height=200&width=200&text=TWP43",
  },
  {
      id: "pm",
      name: "PM",
      description: "95mm 13g TOP WATER",
      image: "/product/pm/pm.png?height=200&width=200&text=PM",
  },
  {
      id: "pm127",
      name: "PM127",
      description: "127mm 29g TOP WATER",
      image: "/product/pm/pm.png?height=200&width=200&text=PM127",
  },
  {
      id: "pop50",
      name: "POP50",
      description: "51mm 4.5g TOP WATER",
      image: "/product/pop50/pop50.png?height=200&width=200&text=POP50",
  },
  {
      id: "pop65",
      name: "POP65",
      description: "66mm 7g TOP WATER",
      image: "/product/pop65-80/pop65.png?height=200&width=200&text=POP65",
  },
  {
      id: "pop80",
      name: "POP80",
      description: "80mm 12g TOP WATER",
      image: "/product/pop65-80/pop80.png?height=200&width=200&text=POP80",
  },
  {
      id: "pop100",
      name: "POP100",
      description: "100mm 21g TOP WATER",
      image: "/product/pop100/pop100.png?height=200&width=200&text=POP100",
  },
  {
      id: "pe85",
      name: "PE85",
      description: "85mm 11g TOP WATER",
      image: "/product/pe/pe.png?height=200&width=200&text=PE85",
  },
  {
      id: "pe115",
      name: "PE115",
      description: "115mm 20g TOP WATER",
      image: "/product/pe/pe.png?height=200&width=200&text=PE115",
  },
  {
      id: "pe100",
      name: "PE100",
      description: "100mm 16g TOP WATER",
      image: "/product/proppe100/proppe100.png?height=200&width=200&text=PE100",
  },
  {
      id: "propPe100",
      name: "PROP PE100",
      description: "100mm 17.4g TOP WATER",
      image: "/product/proppe100/proppe100.png?height=200&width=200&text=PROP+PE100",
  },
  {
      id: "npe100",
      name: "NPE100",
      description: "100mm 19g TOP WATER",
      image: "/product/npe/npe.png?height=200&width=200&text=NPE100",
  },
  {
      id: "tw85Sus",
      name: "TW85 (Suspending)",
      description: "85mm 13.5g Suspending",
      image: "/product/tw/tw.png?height=200&width=200&text=TW85+Suspending",
  },
  {
      id: "tw85Sink",
      name: "TW85 (Sinking)",
      description: "85mm 28.5g Sinking",
      image: "/product/tw/tw.png?height=200&width=200&text=TW85+Sinking",
  },
  {
      id: "tw110Sus",
      name: "TW110 (Suspending)",
      description: "110mm 23.8g Suspending",
      image: "/product/tw/tw.png?height=200&width=200&text=TW110+Suspending",
  },
  {
      id: "tw110Sink",
      name: "TW110 (Sinking)",
      description: "110mm 45g Sinking",
      image: "/product/tw/tw.png?height=200&width=200&text=TW110+Sinking",
  },
  {
      id: "snake90",
      name: "SNAKE90",
      description: "90mm 11.6g TOP WATER",
      image: "/product/snake/snake.png?height=200&width=200&text=SNAKE90",
  },
  {
      id: "snake115",
      name: "SNAKE115",
      description: "115mm 22.4g TOP WATER",
      image: "/product/snake/snake.png?height=200&width=200&text=SNAKE115",
  },
  {
      id: "kp80",
      name: "KP80",
      description: "80mm 14g TOP WATER",
      image: "/product/kp/kp.png?height=200&width=200&text=KP80",
  },
  {
      id: "kp100",
      name: "KP100",
      description: "100mm 27.5g TOP WATER",
      image: "/product/kp/kp.png?height=200&width=200&text=KP100",
  },
  {
      id: "tws",
      name: "TWS",
      description: "101.5mm 14.5g TOP WATER",
      image: "/product/tws/tws.png?height=200&width=200&text=TWS",
  },
  {
      id: "tws55",
      name: "TWS55",
      description: "55mm 3.5g TOP WATER",
      image: "/product/tws/tws.png?height=200&width=200&text=TWS55",
  },
  {
      id: "pe135",
      name: "PE135",
      description: "135mm 28g TOP WATER",
      image: "/product/pe135/pe135.png?height=200&width=200&text=PE135",
  },
  {
      id: "newPe105",
      name: "NEW PE105",
      description: "105mm 15g TOP WATER",
      image: "/product/newpe/newpe.png?height=200&width=200&text=NEW+PE105",
  },
  {
      id: "newPe135",
      name: "NEW PE135",
      description: "135mm 28g TOP WATER",
      image: "/product/newpe/newpe.png?height=200&width=200&text=NEW+PE135",
  },
  {
      id: "sd",
      name: "SD",
      description: "60mm 13g TOP WATER",
      image: "/product/sd/sd.png?height=200&width=200&text=SD",
  },
  {
      id: "sd38",
      name: "SD38",
      description: "38mm 3.3g TOP WATER",
      image: "/product/sd/sd.png?height=200&width=200&text=SD38",
  },
  {
      id: "sm",
      name: "SM",
      description: "96mm 13g TOP WATER",
      image: "/product/sm/sm.png?height=200&width=200&text=SM",
  },
],
live:[
  {
      id: "hs75",
      name: "HS75",
      description: "75mm 13.5g Sinking",
      image: "/product/hs/hs.png?height=200&width=200&text=HS75",
  },
  {
      id: "hs90",
      name: "HS90",
      description: "90mm 21.5g Sinking",
      image: "/product/hs/hs.png?height=200&width=200&text=HS90",
  },
  {
      id: "hmm35",
      name: "HMM35",
      description: "90mm 20g Sinking",
      image: "/product/hmm/hmm.png?height=200&width=200&text=HMM35",
  },
  {
      id: "jl35",
      name: "JL35",
      description: "90mm 15.7g Sinking",
      image: "/product/jl/jl.png?height=200&width=200&text=JL35",
  },
  {
      id: "glide3",
      name: "GLIDE3",
      description: "80mm 7.9g Sinking",
      image: "/product/glide/glide.png?height=200&width=200&text=GLIDE3",
  },
  {
      id: "glide5",
      name: "GLIDE5",
      description: "130mm 25g Sinking",
      image: "/product/glide/glide.png?height=200&width=200&text=GLIDE5",
  },
  {
      id: "cn90s",
      name: "CN90S",
      description: "90mm 9g Sinking",
      image: "/product/cn90/cn90.png?height=200&width=200&text=CN90S",
  },
  {
      id: "cn90f",
      name: "CN90F",
      description: "90mm 8.2g Floating",
      image: "/product/cn90/cn90.png?height=200&width=200&text=CN90F",
  },
  {
      id: "hdFrog40",
      name: "HD Frog40",
      description: "40mm 6g TOP WATER",
      image: "/product/hdFrog/hdFrog.png?height=200&width=200&text=HD+Frog40",
  },
  {
      id: "hdFrog50",
      name: "HD Frog50",
      description: "50mm 9g TOP WATER",
      image: "/product/hdFrog/hdFrog.png?height=200&width=200&text=HD+Frog50",
  },
  {
      id: "hdFrog60",
      name: "HD Frog60",
      description: "60mm 12g TOP WATER",
      image: "/product/hdFrog/hdFrog.png?height=200&width=200&text=HD+Frog60",
  },
  {
      id: "frog48",
      name: "Frog48",
      description: "48mm 8g TOP WATER",
      image: "/product/frog/frog.png?height=200&width=200&text=Frog48",
  },
  {
      id: "frog58",
      name: "Frog58",
      description: "58mm 11.5g TOP WATER",
      image: "/product/frog/frog.png?height=200&width=200&text=Frog58",
  },
],
mslSeries:[
  {
      id: "msl50",
      name: "MSL 50(TPE)",
      description: "50mm",
      image: "/product/msltpe/msl.png?height=200&width=200&text=MSL50",
  },
  {
      id: "msl70",
      name: "MSL 70(TPE)",
      description: "70mm",
      image: "/product/msltpe/msl.png?height=200&width=200&text=MSL70",
  },
],
adstSeries:[
  {
      id: "adst75",
      name: "ADST75",
      description: "75mm",
      image: "/product/adst/adst.png?height=200&width=200&text=ADST75+1",
  },
  {
      id: "adst85",
      name: "ADST85",
      description: "85mm",
      image: "/product/adst/adst.png?height=200&width=200&text=ADST85+1",
  },
  {
      id: "adst100",
      name: "ADST100",
      description: "100mm",
      image: "/product/adst/adst.png?height=200&width=200&text=ADST100+1",
  },
],
shrimp:[
  {
      id: "ms35",
      name: "3.5MS",
      description: "89mm 7g Sinking/Rattle",
      image: "/product/ms/ms.png?height=200&width=200&text=3.5MS+1",
  },
  {
      id: "ms5",
      name: "5MS",
      description: "127mm 16g Sinking/Rattle",
      image: "/product/ms/ms.png?height=200&width=200&text=5MS+1",
  },
  {
      id: "mls2",
      name: "2MLS",
      description: "50mm 3.7g Sinking",
      image: "/product/mls/mls.png?height=200&width=200&text=2MLS+1",
  },
  {
      id: "mls3",
      name: "3MLS",
      description: "70mm 7.4g Sinking",
      image: "/product/mls/mls.png?height=200&width=200&text=3MLS+1",
  },
  {
      id: "mls4",
      name: "4MLS",
      description: "100mm 11g Sinking/Rattle",
      image: "/product/mls/mls.png?height=200&width=200&text=4MLS+1",
  },
  {
      id: "mls31",
      name: "3MLS-1",
      description: "3\" 6.5g Sinking",
      image: "/product/mls1/mls1.png?height=200&width=200&text=3MLS-1+1",
  },
  {
      id: "mls41",
      name: "4MLS-1",
      description: "4\" 14g Sinking",
      image: "/product/mls1/mls1.png?height=200&width=200&text=4MLS-1+1",
  },
  {
      id: "js75",
      name: "JS75",
      description: "75mm 7.2g Sinking",
      image: "/product/js/js.png?height=200&width=200&text=JS75+1",
  },
  {
      id: "js90",
      name: "JS90",
      description: "90mm 9.5g Sinking",
      image: "/product/js/js.png?height=200&width=200&text=JS90+1",
  },
  {
      id: "js110",
      name: "JS110",
      description: "110mm 18.5g Sinking",
      image: "/product/js/js.png?height=200&width=200&text=JS110+1",
  },
],
craw:[
  {
      id: "craw",
      name: "CRAW",
      description: "3\" Sinking",
      image: "/product/craw/craw.png?height=200&width=200&text=CRAW+1",
  },
  {
      id: "craw4Weedless",
      name: "4CRAW(Weedless)",
      description: "105.5mm 17g Sinking",
      image: "/product/4craw/4craw.png?height=200&width=200&text=4CRAW+Weedless+1",
  },
  {
      id: "craw4BackJump",
      name: "4CRAW(Back Jump)",
      description: "105.5mm 15.4g Sinking",
      image: "/product/4craw/4craw.png?height=200&width=200&text=4CRAW+BackJump+1",
  },
  {
      id: "craw4JigHead",
      name: "4CRAW(JIG Head)",
      description: "105.5mm 19g Sinking",
      image: "/product/4craw/4craw.png?height=200&width=200&text=4CRAW+JIGHead+1",
  },
],
shinerSeries:[
  {
      id: "ms45Shiner",
      name: "4.5MS-Shiner",
      description: "114mm 11g Sinking",
      image: "/product/45msshiner/45msshiner.png?height=200&width=200&text=4.5MS-Shiner+1",
  },
],
shadSeries:[
  {
      id: "ms35Shad",
      name: "3.5MS-Shad",
      description: "90mm 10g Sinking",
      image: "/product/msshad/msshad.png?height=200&width=200&text=3.5MS-Shad+1",
  },
  {
      id: "ms3Shad",
      name: "3MS-Shad",
      description: "77mm 8g Sinking",
      image: "/product/msshad/msshad.png?height=200&width=200&text=3MS-Shad+1",
  },
],
gobySeries:[
  {
      id: "goby60",
      name: "GOBY60",
      description: "60mm 3.5g Sinking/Rattle",
      image: "/product/goby/goby.png?height=200&width=200&text=GOBY60+1",
  },
  {
      id: "goby90",
      name: "GOBY90",
      description: "90mm 8g Sinking/Rattle",
      image: "/product/goby/goby.png?height=200&width=200&text=GOBY90+1",
  },
  {
      id: "goby120",
      name: "GOBY120",
      description: "120mm 18g Sinking/Rattle",
      image: "/product/goby/goby.png?height=200&width=200&text=GOBY120+1",
  },
  {
      id: "goby150",
      name: "GOBY150",
      description: "150mm 38g Sinking/Rattle",
      image: "/product/goby/goby.png?height=200&width=200&text=GOBY150+1",
  },
],
fmSeries:[
  {
      id: "fm60",
      name: "FM60",
      description: "57mm 2.5g Sinking",
      image: "/product/fm/fm.png?height=200&width=200&text=FM60+1",
  },
  {
      id: "fm80",
      name: "FM80",
      description: "74.5mm 4.5g Sinking",
      image: "/product/fm/fm.png?height=200&width=200&text=FM80+1",
  },
],
splitTail:[
  {
      id: "splitTail",
      name: "SPLIT TAIL",
      description: "3\" Sinking",
      image: "/product/splittail/splittail.png?height=200&width=200&text=SPLIT+TAIL+1",
  },
],
nfSeries:[
  {
      id: "nf70",
      name: "NF70",
      description: "70mm 3g Sinking",
      image: "/product/nf/nf.png?height=200&width=200&text=NF70+1",
  },
  {
      id: "nf90",
      name: "NF90",
      description: "90mm 5g Sinking",
      image: "/product/nf/nf.png?height=200&width=200&text=NF90+1",
  },
  {
      id: "nf110",
      name: "NF110",
      description: "110mm 9g Sinking",
      image: "/product/nf/nf.png?height=200&width=200&text=NF110+1",
  },
  {
      id: "nf130",
      name: "NF130",
      description: "130mm 13g Sinking",
      image: "/product/nf/nf.png?height=200&width=200&text=NF130+1",
  },
],
worm: [
  {
      id: "worm",
      name: "WORM",
      description: "5\" Sinking",
      image: "/product/worm/worm.png?height=200&width=200&text=WORM+1",
  },
],
softShad:[ 
  {
      id: "softShad",
      name: "SOFT SHAD",
      description: "2.5\" Sinking",
      image: "/product/softshad/softshad.png?height=200&width=200&text=SOFT+SHAD+1",
  },
],
grub: [
  {
      id: "grub",
      name: "GRUB",
      description: "2.5\" Sinking",
      image: "/product/grub/grub.png?height=200&width=200&text=GRUB+1",
  },
],
ftSeries:[
  {
      id: "ft110",
      name: "FT110",
      description: "110mm",
      image: "/product/ft/ft.jpg?height=200&width=200&text=FT110+1",
  },
  {
      id: "ft130",
      name: "FT130",
      description: "130mm",
      image: "/product/ft/ft.jpg?height=200&width=200&text=FT130+1",
  },
],
ptSeries:[
  {
      id: "pt2",
      name: "PT2",
      description: "50mm",
      image: "/product/pt/pt.png?height=200&width=200&text=PT2+1",
  },
  {
      id: "pt3",
      name: "PT3",
      description: "70mm",
      image: "/product/pt/pt.png?height=200&width=200&text=PT3+1",
  },
],
frog:[
  {
      id: "hollowFrog",
      name: "Hollow Frog",
      description: "50mm 11g TOP WATER",
      image: "/product/hollowfrog/hollowfrog.png?height=200&width=200&text=Hollow+Frog+1",
  },
  {
      id: "popHFrog",
      name: "POP HFrog",
      description: "56mm 12.5g TOP WATER",
      image: "/product/pophfrog/pophfrog.png?height=200&width=200&text=POP+HFrog+1",
  },
  {
      id: "popHFrog60",
      name: "POP HFrog 60",
      description: "60mm 16.5g TOP WATER",
      image: "/product/pophfrog/pophfrog.png?height=200&width=200&text=POP+HFrog60+1",
  },
  {
      id: "solidFrog",
      name: "Solid Frog",
      description: "70mm 9g TOP WATER",
      image: "/product/solidfrog/solidfrog.png?height=200&width=200&text=Solid+Frog+1",
  },
],
spinner:[
  {
      id: "spinner14oz",
      name: "1/4oz Spinner",
      description: "1/4oz Sinking",
      image: "/product/spinner/spinner.png?height=200&width=200&text=1%2F4oz+Spinner+1",
  },
  {
      id: "spinner12oz",
      name: "1/2oz Spinner",
      description: "1/2oz Sinking",
      image: "/product/spinner/spinner.png?height=200&width=200&text=1%2F2oz+Spinner+1",
  },
],
garfish:[
  {
      id: "garfish15",
      name: "Garfish 15g",
      description: "63mm 15g Sinking",
      image: "/product/garfish-metalshad/garfish.png?height=200&width=200&text=Garfish15+1",
  },
  {
      id: "garfish22",
      name: "Garfish 22g",
      description: "73mm 22g Sinking",
      image: "/product/garfish-metalshad/garfish.png?height=200&width=200&text=Garfish22+1",
  },
],
metalShad:[
  {
      id: "metalShad15",
      name: "Metal Shad 15g",
      description: "40mm 15g Sinking",
      image: "/product/garfish-metalshad/metalshad.png?height=200&width=200&text=MetalShad15+1",
  },
  {
      id: "metalShad22",
      name: "Metal Shad 22g",
      description: "46mm 22g Sinking",
      image: "/product/garfish-metalshad/metalshad.png?height=200&width=200&text=MetalShad22+1",
  },
  {
      id: "metalShad30",
      name: "Metal Shad 30g",
      description: "52mm 30g Sinking",
      image: "/product/garfish-metalshad/metalshad.png?height=200&width=200&text=MetalShad30+1",
  },
  {
      id: "metalShad40",
      name: "Metal Shad 40g",
      description: "58mm 40g Sinking",
      image: "/product/garfish-metalshad/metalshad.png?height=200&width=200&text=MetalShad40+1",
  },
  {
      id: "metalShad150",
      name: "Metal Shad 150g",
      description: "113mm 150g Fast Sinking",
      image: "/product/garfish-metalshad/metalshad.png?height=200&width=200&text=MetalShad150+1",
  },
],
egiSeries:[
  {
      id: "adegi60",
      name: "ADEGI60",
      description: "60mm 5.4g Sinking",
      image: "/product/egi/egi.png?height=200&width=200&text=ADEGI60+1",
  },
  {
      id: "adegi80",
      name: "ADEGI80",
      description: "80mm 9.5g Sinking",
      image: "/product/egi/egi.png?height=200&width=200&text=ADEGI80+1",
  },
  {
      id: "adegi96",
      name: "ADEGI96",
      description: "96mm 16g Sinking",
      image: "/product/egi/egi.png?height=200&width=200&text=ADEGI96+1",
  },
  {
      id: "adegi110",
      name: "ADEGI110",
      description: "110mm 22.5g Sinking",
      image: "/product/egi/egi.png?height=200&width=200&text=ADEGI110+1",
  },
],
lsSeries:[
  {
      id: "ls75",
      name: "LS75",
      description: "75mm 12g Sinking",
      image: "/product/ls/ls.png?height=200&width=200&text=LS75+1",
  },
  {
      id: "ls90",
      name: "LS90",
      description: "92mm 20g Sinking",
      image: "/product/ls/ls.png?height=200&width=200&text=LS90+1",
  },
],
  }

export default function CategoryPage() {
  const { language } = useLanguage()
  const t = translations[language]

  const { slug } = useParams<{ slug: string }>()


  // Function to translate product names while keeping brand codes untranslated
  const translateProductName = (item: string) => {
    // Since we're now using translation keys directly, we can use them as-is
    return t[item as keyof typeof t] || item
  }

  // Function to translate only the action part of product descriptions
  const translateDescriptionAction = (description: string) => {
    // Split description into parts (e.g., "56mm 3.7g Suspending" -> ["56mm 3.7g", "Suspending"])
    const parts = description.split(' ')
    
    if (parts.length < 2) return description
    
    // Get the last part (action term)
    const actionTerm = parts[parts.length - 1]
    
    // Try to find a direct translation for the action term
    const translation = t[actionTerm.toLowerCase() as keyof typeof t]
    if (translation) {
      // Replace only the last part with translation
      parts[parts.length - 1] = translation
      return parts.join(' ')
    }
    // If no translation found, return original description
    return description
  }

  const isMainCategory = mainCategorySlugs.includes(slug)
  const subCategories = mainCategorySubCategories[slug]

  // Function to map URL slugs to productData keys
  const getProductDataKey = (urlSlug: string) => {
    const slugToKeyMap: Record<string, string> = {
      'jerkbait': 'jerkbait',
      'crank-bait': 'crankBait',
      'top-water': 'topWater',
      'live': 'live',
      'adst-series': 'adstSeries',
      'shrimp': 'shrimp',
      'craw': 'craw',
      'shiner-series': 'shinerSeries',
      'shad-series': 'shadSeries',
      'goby-series': 'gobySeries',
      'fm-series': 'fmSeries',
      'split-tail': 'splitTail',
      'nf-series': 'nfSeries',
      'worm': 'worm',
      'soft-shad': 'softShad',
      'grub': 'grub',
      'ft-series': 'ftSeries',
      'pt-series': 'ptSeries',
      'frog': 'frog',
      'spinner': 'spinner',
      'garfish': 'garfish',
      'metal-shad': 'metalShad',
      'egi-series': 'egiSeries',
      'ls-series': 'lsSeries',
      'msl-series': 'mslSeries',
    }
    return slugToKeyMap[urlSlug] || urlSlug
  }

  const productDataKey = getProductDataKey(slug)
  const products = productData[productDataKey] || []
  
  // Function to get the proper translation key for category names
  const getCategoryTranslationKey = (categorySlug: string) => {
    const slugToKeyMap: Record<string, string> = {
      // Main categories
      'hard-lure': 'hardLure',
      'soft-lure': 'softLure',
      'metal-lure': 'metalLure',
      'squid-lure': 'squidLure',
      'accessory': 'accessory',
      // Individual product categories
      'jerkbait': 'jerkbait',
      'crank-bait': 'crankBait',
      'top-water': 'topWater',
      'live': 'live',
      'adst-series': 'adstSeries',
      'shrimp': 'shrimp',
      'craw': 'craw',
      'shiner-series': 'shinerSeries',
      'shad-series': 'shadSeries',
      'goby-series': 'gobySeries',
      'fm-series': 'fmSeries',
      'split-tail': 'splitTail',
      'nf-series': 'nfSeries',
      'worm': 'worm',
      'soft-shad': 'softShad',
      'grub': 'grub',
      'ft-series': 'ftSeries',
      'pt-series': 'ptSeries',
      'frog': 'frog',
      'spinner': 'spinner',
      'garfish': 'garfish',
      'metal-shad': 'metalShad',
      'egi-series': 'egiSeries',
      'ls-series': 'lsSeries',
      'msl-series': 'mslSeries',
    }
    return slugToKeyMap[categorySlug] || categorySlug
  }
  
  const categoryTranslationKey = getCategoryTranslationKey(slug)
  const categoryName = t[categoryTranslationKey as keyof typeof t] || slug.toUpperCase().replace(/-/g, " ")

  // Navigation functions
  const getProductSlug = (item: string) => {
    // Convert camelCase to kebab-case for URLs
    return item.replace(/([A-Z])/g, '-$1').toLowerCase()
  }

  const hardLureItems = ["jerkbait", "crankBait", "topWater", "live"]
  const softLureItems = [
    "adstSeries",
    "shrimp",
    "craw",
    "shinerSeries",
    "shadSeries",
    "gobySeries",
    "fmSeries",
    "splitTail",
    "nfSeries",
    "worm",
    "softShad",
    "grub",
    "ftSeries",
    "ptSeries",
    "frog",
  ]
  const metalLureItems = ["spinner", "garfish", "metalShad"]
  const squidLureItems = ["egiSeries", "lsSeries"]
  const accessoryItems = ["mslSeries"]
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
              <Link href="/wishlist" className="mt-2 inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 [&_svg]:size-3">
                <Heart className="h-4 w-4 text-red-500" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* Category Header */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{categoryName}</h1>
          <p className="text-xl opacity-90">{t.categorySubtitle}</p>
        </div>
      </section>

      {/* Content based on whether it's a main category or sub-category */}
      <section className="py-16">
        <FadeInOnScroll>
          <div className="container mx-auto px-4">
            {isMainCategory && subCategories ? (
              // Display sub-categories for main categories
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {subCategories.map((subCategory) => (
                  <Link key={subCategory.slug} href={`/category/${subCategory.slug}`} className="group">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <Image
                        src={subCategory.image || "/placeholder.svg"}
                        alt={subCategory.name}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover"
                        quality={90}
                      />
                      <div className="p-4 border-t shadow-lg border-gray-200">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600">{translateProductName(subCategory.name)}</h3>
                        <p className="text-gray-600 text-sm">{t[subCategory.descriptionKey]}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : products.length > 0 ? (
              // Display products for sub-categories (original logic)
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`} className="group">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative">
                      {product.isNew && (
                        <div className="absolute top-2 right-2 z-10">
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            {t.newBadge}
                          </span>
                        </div>
                      )}
                      <div className="relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={192}
                          className="w-full h-48 object-cover"
                          quality={90}
                        />
                        {/* Award Logo for award-winning products - positioned on the image */}
                        {(product.name === "4CRAW(Weedless)" || product.name === "4CRAW(Back Jump)" || product.name === "4CRAW(JIG Head)" || product.name === "4MLS-1" || product.name === "3MLS-1") && (
                          <div className="absolute bottom-2 left-2 z-10">
                            <Image 
                              src="/images/china fish.png" 
                              alt="Award Logo" 
                              width={40}
                              height={32}
                              className="h-8 w-auto drop-shadow-lg"
                              quality={90}
                            />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600">{product.name}</h3>
                        <p className="text-gray-600 text-sm">{translateDescriptionAction(product.description)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              // No products or sub-categories found
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">{t.comingSoon}</h2>
                <p className="text-gray-600">{t.productsAvailableSoon}</p>
              </div>
            )}
          </div>
        </FadeInOnScroll>
      </section>
    </div>
  )
}
