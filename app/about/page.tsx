"use client"

import Link from "next/link"
import { ChevronDown, Heart } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"
import { FadeInOnScroll } from "@/components/FadeInOnScroll"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// 定义合作伙伴接口
interface Partner {
  name: string;
  logo: string;
}

interface Translation {
  // Navigation translations
  home: string;
  hardLure: string;
  softLure: string;
  metalLure: string;
  squidLure: string;
  accessory: string;
  // About page translations
  backToHome: string;
  aboutUs: string;
  ourStory: string;
  ourJourney: string;
  ourValues: string;
  whyUs: string;
  storyText: string;
  valuesText: string;
  journeyText: string;
  aboutUsText: string;
  whyUsText: string;
  valuesList: {
    title: string;
    description: string;
    icon: string;
  }[];
  milestones: {
    year: string;
    title: string;
    description: string;
  }[];
  whyUsList: string[];
  certificationsTabs: {
    certifications: string;
    partners: string;
  };
  certificationsList: {
    name: string;
    description: string;
  }[];
  partnersDescription: string;
  partnersList: Partner[];
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
    hardLure: "HARD LURE",
    softLure: "SOFT LURE",
    metalLure: "METAL LURE",
    squidLure: "SQUID LURE",
    accessory: "ACCESSORY",
    // About page translations
    backToHome: "Back to Home",
    ourStory: "Our Story",
    ourJourney: "Our Journey",
    ourValues: "Our Values",
    whyUs:"Why choose us",
    storyText:
      "ANDA is located in a beautiful city-Weihai, in Shandong China. Anda has about 200 employees,we have a very strong R&D team,the production process and quality control management system.We have full energy and confidence in providing the best service and excellent products for all customers all the time. Our products have been exported to Japan, Southeast Asia, Australia, Europe, USA and other regions. You will satisfy with our excellent quality and favorable credit standing.",
    valuesText: "Quality, Innovation, Sustainability, Customer Satisfaction",
    journeyText:"Key milestones in our company's history",
    aboutUsText:"Leading the industry with innovative solutions since 2010",
    whyUsText:"We're committed to providing exceptional products and services that help our clients succeed. Here's what sets us apart:",
    valuesList: [
      { title: "Innovation", description: "We continuously push the boundaries of what's possible, developing new technologies and solutions that address evolving industry challenges.", icon: "🔍" },
      { title: "Quality", description: "We maintain the highest standards in everything we do, from product design and manufacturing to customer service and support.", icon: "✓" },
      { title: "Integrity", description: "We conduct our business with honesty, transparency, and ethical practices, building trust with our customers, partners, and employees.", icon: "🤝" },
      { title: "Customer Focus", description: "We put our customers at the center of our business, listening to their needs and working tirelessly to exceed their expectations.", icon: "👥" },
      { title: "Sustainability", description: "We're committed to environmentally responsible practices and developing solutions that help our customers reduce their environmental impact.", icon: "🌱" },
      { title: "Collaboration", description: "We believe in the power of teamwork and partnership, fostering a collaborative environment both internally and with our clients.", icon: "🔄" },
    ],
    milestones: [
      { year: "2010", title: "Foundation", description: "ANDA was established in Weihai, Shangdong Province in 2010." },
      { year: "1234", title: "TEST2", description: "Test sentence, meaningless, needs to be replaced." },
      { year: "1234", title: "TEST3", description: "Test sentence, meaningless, needs to be replaced." },
      { year: "1234", title: "TEST4", description: "Test sentence, meaningless, needs to be replaced." },
      { year: "1234", title: "TEST5", description: "Test sentence, meaningless, needs to be replaced." },
      { year: "2025+", title: "Future Plans", description: "Future plans center on elevating employee happiness with safer, water-based paints and automation that slash overtime, driving cost savings and efficiency via meticulous material recycling and automation, gradually automating high-skill tasks within three to five years to offset rising labor expenses, while fully embracing lean management to deliver optimal quality, price and service to customers." },
    ],
    whyUsList: [
      "We have never slacken requirements in quality, delivery time or customer service.",
      "We received recognition and support from all customers, some cooperate more than 10 years.",
      "Our Partial Customers are all over the world, including Shimano, Decathlon, Academy, Gamakatsu...",
      "We have nearly 20 patents, and win the Best Product Award at China fishing Gear Exhibition multiple times",
      "We assisted clients to win the awards in ICAST show、EFTTEX、Australia multiple times.",
      "We have two production bases, 300 employee and advanced equipment to ensure a production capacity of 30000 packs/day.",
    ],
    certificationsTabs: { certifications: "Certifications", partners: "Partners" },
    certificationsList: [
      { name: "Best Product Award of China Fish", description: "We win the best product award at China fishing Gear Exhibition multiple times" },
      { name: "Best Product Award of ICAST SHOW", description: "We develop new products in collaboration with clients to win the best product Awards 3 times" },
      { name: "Best Product Award of EFTTEX", description: "We develop new products in collaboration with clients to win the best product Awards 2 times" },
      { name: "Best Product Award of Australia", description: "We develop new products in collaboration with clients to win the best product Awards multiple times" },
      { name: "Nearly 20 Patens", description: "Our team have nearly 20 patents" },
      { name: "Environmental protection standards", description: "We meet environmental protection standars in recycling process for all odors and dust" },
    ],
    partnersDescription: "We partner with leading technology providers and industry organizations to deliver comprehensive solutions to our clients.",
    partnersList: [
      { name: "ECOODA", logo: "/partners/ECOODA.png" },
      { name: "LangBao", logo: "/partners/langbao.png" },
      { name: "RTI", logo: "/partners/RTI.png" },
      { name: "Wider", logo: "/partners/wider.png" },
    ],
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
    // 导航翻译
    home: "首页",
    aboutUs: "关于我们",
    hardLure: "硬饵",
    softLure: "软饵",
    metalLure: "金属饵",
    squidLure: "鱿鱼饵",
    accessory: "配件",
        
    // 关于页面翻译
    backToHome: "返回首页",
    ourStory: "品牌故事",
    ourJourney: "发展历程",
    ourValues: "核心价值",
    whyUs: "选择我们的理由",
    storyText: "ANDA坐落于中国山东美丽的城市——威海。公司拥有约200名员工，具备强大的研发团队、完善的生产流程和质量管理体系。我们始终充满活力与信心，致力于为全球客户提供卓越服务和优质产品。产品远销日本、东南亚、澳大利亚、欧洲、美国等地区。您将对我们卓越的品质和良好的信誉感到满意。",
    valuesText: "品质、创新、可持续性、客户满意",
    journeyText: "公司发展史上的重要里程碑",
    aboutUsText: "自2010年起以创新解决方案引领行业",
    whyUsText: "我们致力于提供卓越的产品和服务，助力客户成功。以下是我们的独特优势：",
    valuesList: [
    { title: "创新", description: "不断突破可能边界，开发应对行业挑战的新技术和解决方案。", icon: "🔍" },
    { title: "品质", description: "在产品设计、生产制造及客户服务各环节坚持最高标准。", icon: "✓" },
    { title: "诚信", description: "以诚实、透明和道德准则开展业务，与客户、合作伙伴及员工建立信任。", icon: "🤝" },
    { title: "客户至上", description: "以客户为中心，倾听需求并全力以赴超越期望。", icon: "👥" },
    { title: "可持续", description: "践行环保责任，开发助力客户减少环境影响的解决方案。", icon: "🌱" },
    { title: "协作", description: "相信团队合作力量，在内部及与客户间营造协作环境。", icon: "🔄" }
    ],
    milestones: [
    { year: "1234", title: "测试1", description: "测试文本，无实际意义，需替换。" },
    { year: "1234", title: "测试2", description: "测试文本，无实际意义，需替换。" },
    { year: "1234", title: "测试3", description: "测试文本，无实际意义，需替换。" },
    { year: "1234", title: "测试4", description: "测试文本，无实际意义，需替换。" },
    { year: "1234", title: "测试5", description: "测试文本，无实际意义，需替换。" },
    { year: "1234", title: "测试6", description: "测试文本，无实际意义，需替换。" }
    ],
    whyUsList: [
      "我们从未在质量、交货期或客户服务上降低要求",
      "我们获得所有客户的认可与支持，部分合作超过10年",
      "我们的客户遍布全球，包括Shimano、Decathlon、Academy、Gamakatsu...",
      "我们拥有近20项专利，并多次荣获中国渔具展最佳产品奖",
      "我们协助客户多次在ICAST展会、EFTTEX、澳大利亚展会获奖",
      "我们拥有两大生产基地，300名员工和先进设备，确保每日30,000包产能"
    ],
    certificationsTabs: { certifications: "认证证书", partners: "合作伙伴" },
    certificationsList: [
      { name: "中国渔具展最佳产品奖", description: "我们多次在中国渔具展览会上荣获最佳产品奖" },
      { name: "ICAST展会最佳产品奖", description: "我们与客户合作开发新产品，3次赢得最佳产品奖" },
      { name: "EFTTEX最佳产品奖", description: "我们与客户合作开发新产品，2次赢得最佳产品奖" },
      { name: "澳大利亚最佳产品奖", description: "我们与客户合作开发新产品，多次赢得最佳产品奖" },
      { name: "近20项专利", description: "我们团队拥有近20项专利" },
      { name: "环保标准认证", description: "我们在所有气味和粉尘回收过程中符合环保标准" }
    ],
    partnersDescription: "我们与领先的技术供应商及行业组织合作，为客户提供全面解决方案。",
    partnersList: [
    { name: "ECOODA", logo: "/partners/ECOODA.png" },
    { name: "LangBao", logo: "/partners/langbao.png" },
    { name: "RTI", logo: "/partners/RTI.png" },
    { name: "Wider", logo: "/partners/wider.png" }
    ],
        
    // 产品类别翻译
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
    // 导航翻译
        home: "ホーム",
        aboutUs: "会社概要",
        hardLure: "ハードルアー",
        softLure: "ソフトルアー",
        metalLure: "メタルルアー",
        squidLure: "イカルアー",
        accessory: "アクセサリー",
        
        // 关于页面翻译
        backToHome: "ホームに戻る",
        ourStory: "ブランドストーリー",
        ourJourney: "歩み",
        ourValues: "コアバリュー",
        whyUs: "選ばれる理由",
        storyText: "ANDAは中国山東省の美しい都市・威海に拠点を置いています。約200名の従業員を擁し、強力なR&Dチーム、生産プロセス、品質管理システムを備えています。常に最高のサービスと優れた製品を提供するための活力と自信にあふれています。製品は日本、東南アジア、オーストラリア、ヨーロッパ、米国などに輸出されており、卓越した品質と信頼性でお客様の満足を得ています。",
        valuesText: "品質、革新、持続可能性、顧客満足",
        journeyText: "当社の歴史における主要なマイルストーン",
        aboutUsText: "2010年以降、革新的なソリューションで業界をリード",
        whyUsText: "お客様の成功を支援する優れた製品とサービスを提供することに尽力しています。当社の特徴は次の通りです：",
        valuesList: [
          { title: "革新", description: "業界の課題に対応する新技術・ソリューションを開発し、可能性の限界に挑み続けます。", icon: "🔍" },
          { title: "品質", description: "製品設計から製造、カスタマーサービスまで、すべての面で最高基準を維持します。", icon: "✓" },
          { title: "誠実", description: "正直さ、透明性、倫理的な実践で事業を展開し、顧客・パートナー・従業員との信頼を築きます。", icon: "🤝" },
          { title: "顧客中心", description: "お客様をビジネスの中心に置き、ニーズに耳を傾け、期待を超える努力を惜しみません。", icon: "👥" },
          { title: "持続可能性", description: "環境に配慮した責任ある実践に取り組み、お客様の環境負荷低減を支援するソリューションを開発します。", icon: "🌱" },
          { title: "協働", description: "チームワークとパートナーシップの力を信じ、社内およびお客様との協力的な環境を育みます。", icon: "🔄" }
        ],
        milestones: [
          { year: "1234", title: "テスト1", description: "テスト用テキスト、意味なし、要変更。" },
          { year: "1234", title: "テスト2", description: "テスト用テキスト、意味なし、要変更。" },
          { year: "1234", title: "テスト3", description: "テスト用テキスト、意味なし、要変更。" },
          { year: "1234", title: "テスト4", description: "テスト用テキスト、意味なし、要変更。" },
          { year: "1234", title: "テスト5", description: "テスト用テキスト、意味なし、要変更。" },
          { year: "1234", title: "テスト6", description: "テスト用テキスト、意味なし、要変更。" }
        ],
        whyUsList: [
          "品質、納期、顧客サービスにおいて要求を緩めたことはありません",
          "全てのお客様から評価と支援を得ており、10年以上の取引もある企業様もいます",
          "当社の主要顧客は世界中に広がり、Shimano、Decathlon、Academy、Gamakatsuなどが含まれます",
          "20件近い特許を保有し、中国釣具展で複数回最優秀製品賞を受賞",
          "ICASTショー、EFTTEX、オーストラリア展示会などでクライアントの受賞を支援",
          "2つの生産拠点、300名の従業員、先進設備により日産30,000パックの生産能力を確保"
        ],
        certificationsTabs: { certifications: "認証", partners: "パートナー" },
        certificationsList: [
          { name: "中国フィッシングギア展最優秀製品賞", description: "中国釣具展覧会で複数回最優秀製品賞を受賞" },
          { name: "ICASTショー最優秀製品賞", description: "クライアントと共同開発した新製品で3度の最優秀製品賞受賞" },
          { name: "EFTTEX最優秀製品賞", description: "クライアントと共同開発した新製品で2度の最優秀製品賞受賞" },
          { name: "オーストラリア最優秀製品賞", description: "クライアントと共同開発した新製品で複数回最優秀製品賞受賞" },
          { name: "特許20件近く", description: "当社チームは20件近い特許を保有" },
          { name: "環境保護基準認証", description: "全ての臭気・粉塵リサイクル工程で環境保護基準を満たしています" }
        ],
        partnersDescription: "主要テクノロジープロバイダーや業界団体と提携し、お客様に包括的なソリューションを提供します。",
        partnersList: [
          { name: "ECOODA", logo: "/partners/ECOODA.png" },
          { name: "LangBao", logo: "/partners/langbao.png" },
          { name: "RTI", logo: "/partners/RTI.png" },
          { name: "Wider", logo: "/partners/wider.png" }
        ],
        
        // 产品类别翻译 (补全)
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
        // 导航翻译 (补全)
        home: "홈",
        aboutUs: "회사소개",
        hardLure: "하드루어",
        softLure: "소프트루어",
        metalLure: "메탈루어",
        squidLure: "오징어루어",
        accessory: "액세서리",
        
        // 关于页面翻译
        backToHome: "홈으로 돌아가기",
        ourStory: "브랜드 스토리",
        ourJourney: "발전 과정",
        ourValues: "핵심 가치",
        whyUs: "선택 이유",
        storyText: "ANDA는 중국 산동성의 아름다운 도시 웨이하이에 위치하고 있습니다. 약 200명의 직원을 보유한 당사는 강력한 R&D 팀, 생산 공정 및 품질 관리 시스템을 갖추고 있습니다. 항상 최고의 서비스와 우수한 제품을 제공하기 위한 풀 에너지와 자신감을 가지고 있습니다. 당사 제품은 일본, 동남아시아, 호주, 유럽, 미국 등 지역으로 수출되며, 우수한 품질과 유리한 신용 상태로 고객 만족을 제공합니다.",
        valuesText: "품질, 혁신, 지속 가능성, 고객 만족",
        journeyText: "회사 역사의 주요 이정표",
        aboutUsText: "2010년부터 혁신적인 솔루션으로 업계 선도",
        whyUsText: "고객의 성공을 돕기 위한 탁월한 제품과 서비스를 제공하기 위해 노력합니다. 당사의 차별화된 특징은 다음과 같습니다:",
        valuesList: [
          { title: "혁신", description: "진화하는 업계 도전 과제를 해결하기 위한 신기술 및 솔루션을 개발하여 가능성의 경계를 지속적으로 넓혀 나갑니다.", icon: "🔍" },
          { title: "품질", description: "제품 설계 및 제조에서 고객 서비스 및 지원에 이르기까지 모든 분야에서 최고 기준을 유지합니다.", icon: "✓" },
          { title: "진실성", description: "정직, 투명성 및 윤리적 관행으로 비즈니스를 수행하여 고객, 파트너 및 직원과의 신뢰를 구축합니다.", icon: "🤝" },
          { title: "고객 중심", description: "고객을 비즈니스의 중심에 두고 그들의 요구를 경청하며 기대를 뛰어넘기 위해 끊임없이 노력합니다.", icon: "👥" },
          { title: "지속 가능성", description: "환경적 책임을 다하는 관행에 전념하고 고객의 환경 영향 감소를 돕는 솔루션을 개발합니다.", icon: "🌱" },
          { title: "협력", description: "팀워크와 파트너십의 힘을 믿으며 내부적으로 그리고 고객과의 협력 환경을 조성합니다.", icon: "🔄" }
        ],
        milestones: [
          { year: "1234", title: "테스트1", description: "테스트 문장, 의미 없음, 교체 필요." },
          { year: "1234", title: "테스트2", description: "테스트 문장, 의미 없음, 교체 필요." },
          { year: "1234", title: "테스트3", description: "테스트 문장, 의미 없음, 교체 필요." },
          { year: "1234", title: "테스트4", description: "테스트 문장, 의미 없음, 교체 필요." },
          { year: "1234", title: "테스트5", description: "테스트 문장, 의미 없음, 교체 필요." },
          { year: "1234", title: "테스트6", description: "테스트 문장, 의미 없음, 교체 필요." }
        ],
        whyUsList: [
          "품질, 납기, 고객 서비스에 대한 요구 사항을 결코 완화한 적 없습니다",
          "모든 고객으로부터 인정과 지원을 받았으며, 일부는 10년 이상 협력 중입니다",
          "주요 고객사는 Shimano, Decathlon, Academy, Gamakatsu 등 전 세계에 분포",
          "20건에 가까운 특허 보유, 중국 낚시기구 전시회에서 여러 차례 최우수 제품상 수상",
          "ICAST 쇼, EFTTEX, 호주 전시회 등에서 고객사의 수상 실적 지원",
          "2개 생산 기지, 300명 직원, 첨단 설비로 일일 30,000팩 생산 능력 보장"
        ],
        certificationsTabs: { certifications: "인증서", partners: "파트너" },
        certificationsList: [
          { name: "중국 낚시기구 전시회 최우수 제품상", description: "중국 낚시기구 전시회에서 여러 차례 최우수 제품상 수상" },
          { name: "ICAST 쇼 최우수 제품상", description: "고객사와 공동 개발한 신제품으로 3회 최우수 제품상 수상" },
          { name: "EFTTEX 최우수 제품상", description: "고객사와 공동 개발한 신제품으로 2회 최우수 제품상 수상" },
          { name: "호주 최우수 제품상", description: "고객사와 공동 개발한 신제품으로 여러 차례 최우수 제품상 수상" },
          { name: "특허 20건", description: "당사 팀은 20건에 가까운 특허를 보유" },
          { name: "환경 보호 기준 인증", description: "모든 악취 및 분진 재활용 공정에서 환경 보호 기준 충족" }
        ],
        partnersDescription: "선도적인 기술 제공업체 및 업계 단체와 협력하여 고객에게 포괄적인 솔루션을 제공합니다.",
        partnersList: [
          { name: "ECOODA", logo: "/partners/ECOODA.png" },
          { name: "LangBao", logo: "/partners/langbao.png" },
          { name: "RTI", logo: "/partners/RTI.png" },
          { name: "Wider", logo: "/partners/wider.png" }
        ],
        
        // 产品类别翻译 (补全)
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
        // 导航翻译 (补全)
        home: "INICIO",
        aboutUs: "ACERCA DE",
        hardLure: "SEÑUELO DURO",
        softLure: "SEÑUELO BLANDO",
        metalLure: "SEÑUELO METÁLICO",
        squidLure: "SEÑUELO CALAMAR",
        accessory: "ACCESORIO",
        
        // 关于页面翻译
        backToHome: "Volver al Inicio",
        ourStory: "Nuestra Historia",
        ourJourney: "Nuestro Recorrido",
        ourValues: "Valores",
        whyUs: "Por Qué Elegirnos",
        storyText: "ANDA está ubicada en la hermosa ciudad de Weihai, Shandong, China. Contamos con alrededor de 200 empleados, un sólido equipo de I+D, procesos de producción y sistema de gestión de control de calidad. Tenemos plena energía y confianza para brindar el mejor servicio y productos excelentes a todos nuestros clientes en todo momento. Nuestros productos se exportan a Japón, Sudeste Asiático, Australia, Europa, EE. UU. y otras regiones. Quedarás satisfecho con nuestra excelente calidad y favorable reputación crediticia.",
        valuesText: "Calidad, Innovación, Sostenibilidad, Satisfacción del Cliente",
        journeyText: "Hitos clave en la historia de nuestra empresa",
        aboutUsText: "Liderando la industria con soluciones innovadoras desde 2010",
        whyUsText: "Nos comprometemos a proporcionar productos y servicios excepcionales que ayuden a nuestros clientes a tener éxito. Esto es lo que nos diferencia:",
        valuesList: [
          { title: "Innovación", description: "Continuamente ampliamos los límites de lo posible, desarrollando nuevas tecnologías y soluciones que abordan los desafíos cambiantes de la industria.", icon: "🔍" },
          { title: "Calidad", description: "Mantenemos los más altos estándares en todo lo que hacemos, desde el diseño y fabricación de productos hasta el servicio y soporte al cliente.", icon: "✓" },
          { title: "Integridad", description: "Conducimos nuestros negocios con honestidad, transparencia y prácticas éticas, construyendo confianza con nuestros clientes, socios y empleados.", icon: "🤝" },
          { title: "Enfoque al Cliente", description: "Ponemos a nuestros clientes en el centro de nuestro negocio, escuchando sus necesidades y trabajando incansablemente para superar sus expectativas.", icon: "👥" },
          { title: "Sostenibilidad", description: "Estamos comprometidos con prácticas ambientalmente responsables y desarrollando soluciones que ayuden a nuestros clientes a reducir su impacto ambiental.", icon: "🌱" },
          { title: "Colaboración", description: "Creemos en el poder del trabajo en equipo y la asociación, fomentando un entorno colaborativo tanto internamente como con nuestros clientes.", icon: "🔄" }
        ],
        milestones: [
          { year: "1234", title: "PRUEBA1", description: "Frase de prueba, sin significado, necesita ser reemplazada." },
          { year: "1234", title: "PRUEBA2", description: "Frase de prueba, sin significado, necesita ser reemplazada." },
          { year: "1234", title: "PRUEBA3", description: "Frase de prueba, sin significado, necesita ser reemplazada." },
          { year: "1234", title: "PRUEBA4", description: "Frase de prueba, sin significado, necesita ser reemplazada." },
          { year: "1234", title: "PRUEBA5", description: "Frase de prueba, sin significado, necesita ser reemplazada." },
          { year: "1234", title: "PRUEBA6", description: "Frase de prueba, sin significado, necesita ser reemplazada." }
        ],
        whyUsList: [
          "Nunca hemos relajado los requisitos de calidad, plazos de entrega o servicio al cliente",
          "Hemos recibido reconocimiento y apoyo de todos los clientes, algunos cooperan más de 10 años",
          "Nuestros clientes parciales están en todo el mundo, incluidos Shimano, Decathlon, Academy, Gamakatsu...",
          "Tenemos casi 20 patentes y ganamos múltiples veces el Premio al Mejor Producto en China Fishing Gear Exhibition",
          "Ayudamos a clientes a ganar premios en ICAST, EFTTEX, Australia múltiples veces",
          "Contamos con dos bases de producción, 300 empleados y equipos avanzados para garantizar capacidad de 30,000 paquetes/día"
        ],
        certificationsTabs: { certifications: "Certificaciones", partners: "Socios" },
        certificationsList: [
          { name: "Mejor Producto de China Fish", description: "Ganamos múltiples veces el premio al mejor producto en la Exhibición de Equipos de Pesca de China" },
          { name: "Mejor Producto de ICAST SHOW", description: "Desarrollamos nuevos productos en colaboración con clientes para ganar el premio 3 veces" },
          { name: "Mejor Producto de EFTTEX", description: "Desarrollamos nuevos productos en colaboración con clientes para ganar el premio 2 veces" },
          { name: "Mejor Producto de Australia", description: "Desarrollamos nuevos productos en colaboración con clientes para ganar el premio múltiples veces" },
          { name: "Casi 20 patentes", description: "Nuestro equipo tiene casi 20 patentes" },
          { name: "Estándares de protección ambiental", description: "Cumplimos estándares ambientales en procesos de reciclaje de olores y polvo" }
        ],
        partnersDescription: "Colaboramos con proveedores de tecnología líderes y organizaciones de la industria para ofrecer soluciones integrales a nuestros clientes.",
        partnersList: [
          { name: "ECOODA", logo: "/partners/ECOODA.png" },
          { name: "LangBao", logo: "/partners/langbao.png" },
          { name: "RTI", logo: "/partners/RTI.png" },
          { name: "Wider", logo: "/partners/wider.png" }
        ],
        
        // 产品类别翻译 (补全)
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
        // 导航翻译 (补全)
        home: "ANA SAYFA",
        aboutUs: "HAKKIMIZDA",
        hardLure: "SERT YEM",
        softLure: "YUMUŞAK YEM",
        metalLure: "METAL YEM",
        squidLure: "KALAMAR YEMİ",
        accessory: "AKSESUAR",
        
        // 关于页面翻译
        backToHome: "Ana Sayfaya Dön",
        ourStory: "Hikayemiz",
        ourJourney: "Yolculuğumuz",
        ourValues: "Değerlerimiz",
        whyUs: "Neden Biz?",
        storyText: "ANDA, Çin'in Shandong eyaletindeki güzel Weihai şehrinde yer almaktadır. Yaklaşık 200 çalışanımız, güçlü bir Ar-Ge ekibimiz, üretim süreçlerimiz ve kalite kontrol yönetim sistemimiz bulunmaktadır. Tüm müşterilerimize her zaman en iyi hizmeti ve mükemmel ürünleri sunmak için dolu enerji ve güvene sahibiz. Ürünlerimiz Japonya, Güneydoğu Asya, Avustralya, Avrupa, ABD ve diğer bölgelere ihraç edilmektedir. Mükemmel kalitemiz ve olumlu kredi itibarımızdan memnun kalacaksınız.",
        valuesText: "Kalite, Yenilik, Sürdürülebilirlik, Müşteri Memnuniyeti",
        journeyText: "Şirket tarihimizdeki önemli dönüm noktaları",
        aboutUsText: "2010'ten beri yenilikçi çözümlerle endüstriye liderlik",
        whyUsText: "Müşterilerimizin başarılı olmasına yardımcı olan olağanüstü ürün ve hizmetler sunmaya kararlıyız. Bizi farklı kılan özellikler:",
        valuesList: [
          { title: "Yenilik", description: "Sürekli olarak mümkün olanın sınırlarını zorluyor, sektörün gelişen zorluklarına çözümler sunan yeni teknolojiler geliştiriyoruz.", icon: "🔍" },
          { title: "Kalite", description: "Ürün tasarımı ve üretiminden müşteri hizmetlerine kadar her şeyde en yüksek standartları koruyoruz.", icon: "✓" },
          { title: "Dürüstlük", description: "İşlerimizi dürüstlük, şeffaflık ve etik uygulamalarla yürütüyor, müşterilerimiz, ortaklarımız ve çalışanlarımızla güven inşa ediyoruz.", icon: "🤝" },
          { title: "Müşteri Odaklılık", description: "Müşterilerimizi işimizin merkezine koyuyor, ihtiyaçlarını dinliyor ve beklentilerini aşmak için durmaksızın çalışıyoruz.", icon: "👥" },
          { title: "Sürdürülebilirlik", description: "Çevresel açıdan sorumlu uygulamalara bağlıyız ve müşterilerimizin çevresel etkilerini azaltmalarına yardımcı olan çözümler geliştiriyoruz.", icon: "🌱" },
          { title: "İşbirliği", description: "Takım çalışması ve ortaklığın gücüne inanıyor, hem içeride hem de müşterilerimizle işbirlikçi bir ortam oluşturuyoruz.", icon: "🔄" }
        ],
        milestones: [
          { year: "1234", title: "TEST1", description: "Test cümlesi, anlamsız, değiştirilmesi gerekir." },
          { year: "1234", title: "TEST2", description: "Test cümlesi, anlamsız, değiştirilmesi gerekir." },
          { year: "1234", title: "TEST3", description: "Test cümlesi, anlamsız, değiştirilmesi gerekir." },
          { year: "1234", title: "TEST4", description: "Test cümlesi, anlamsız, değiştirilmesi gerekir." },
          { year: "1234", title: "TEST5", description: "Test cümlesi, anlamsız, değiştirilmesi gerekir." },
          { year: "1234", title: "TEST6", description: "Test cümlesi, anlamsız, değiştirilmesi gerekir." }
        ],
        whyUsList: [
          "Kalite, teslimat süresi veya müşteri hizmetlerinde asla taviz vermedik",
          "Tüm müşterilerimizden takdir ve destek aldık, bazıları 10 yıldan fazla süredir işbirliği yapıyor",
          "Müşterilerimiz Shimano, Decathlon, Academy, Gamakatsu dahil dünya çapında",
          "Yaklaşık 20 patentimiz var ve Çin Balıkçılık Ekipmanları Fuarı'nda çok kez En İyi Ürün Ödülü kazandık",
          "ICAST fuarı, EFTTEX, Avustralya'da müşterilerimizin ödül kazanmasına çok kez yardımcı olduk",
          "Günde 30.000 paket üretim kapasitesi için iki üretim tesisi, 300 çalışan ve ileri teknoloji ekipman"
        ],
        certificationsTabs: { certifications: "Sertifikalar", partners: "Ortaklar" },
        certificationsList: [
          { name: "China Fish En İyi Ürün Ödülü", description: "Çin Balıkçılık Ekipmanları Fuarı'nda çok kez en iyi ürün ödülü kazandık" },
          { name: "ICAST SHOW En İyi Ürün Ödülü", description: "Müşterilerle işbirliği içinde geliştirdiğimiz yeni ürünlerle 3 kez ödül kazandık" },
          { name: "EFTTEX En İyi Ürün Ödülü", description: "Müşterilerle işbirliği içinde geliştirdiğimiz yeni ürünlerle 2 kez ödül kazandık" },
          { name: "Avustralya En İyi Ürün Ödülü", description: "Müşterilerle işbirliği içinde geliştirdiğimiz yeni ürünlerle çok kez ödül kazandık" },
          { name: "Yaklaşık 20 Patent", description: "Ekibimiz yaklaşık 20 patente sahip" },
          { name: "Çevre Koruma Standartları", description: "Tüm koku ve toz geri dönüşüm süreçlerinde çevre koruma standartlarını karşılıyoruz" }
        ],
        partnersDescription: "Müşterilerimize kapsamlı çözümler sunmak için lider teknoloji sağlayıcıları ve endüstri kuruluşlarıyla işbirliği yapıyoruz.",
        partnersList: [
          { name: "ECOODA", logo: "/partners/ECOODA.png" },
          { name: "LangBao", logo: "/partners/langbao.png" },
          { name: "RTI", logo: "/partners/RTI.png" },
          { name: "Wider", logo: "/partners/wider.png" }
        ],
        
        // 产品类别翻译 (补全)
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
        // 导航翻译 (补全)
        home: "ГЛАВНАЯ",
        aboutUs: "О НАС",
        hardLure: "ТВЁРДАЯ ПРИМАНКА",
        softLure: "МЯГКАЯ ПРИМАНКА",
        metalLure: "МЕТАЛЛИЧЕСКАЯ ПРИМАНКА",
        squidLure: "ПРИМАНКА ДЛЯ КАЛЬМАРА",
        accessory: "АКСЕССУАРЫ",
        
        // 关于页面翻译
        backToHome: "Вернуться на главную",
        ourStory: "Наша история",
        ourJourney: "Наш путь",
        ourValues: "Ценности",
        whyUs: "Почему мы",
        storyText: "ANDA расположена в красивом городе Вэйхай, провинция Шаньдун, Китай. В компании работает около 200 сотрудников, у нас есть сильная команда разработчиков, производственные процессы и система управления качеством. Мы полны энергии и уверены в том, что всегда можем предоставить лучший сервис и превосходную продукцию для всех клиентов. Наша продукция экспортируется в Японию, Юго-Восточную Азию, Австралию, Европу, США и другие регионы. Вы останетесь довольны нашим превосходным качеством и благоприятной кредитоспособностью.",
        valuesText: "Качество, Инновации, Устойчивость, Удовлетворенность клиентов",
        journeyText: "Ключевые вехи в истории нашей компании",
        aboutUsText: "Лидерство в отрасли с инновационными решениями с 2010 года",
        whyUsText: "Мы стремимся предоставлять исключительные продукты и услуги, которые помогают нашим клиентам добиться успеха. Вот что нас отличает:",
        valuesList: [
          { title: "Инновации", description: "Мы постоянно расширяем границы возможного, разрабатывая новые технологии и решения для решения развивающихся отраслевых задач.", icon: "🔍" },
          { title: "Качество", description: "Мы поддерживаем самые высокие стандарты во всем, что делаем, от проектирования и производства продукции до обслуживания и поддержки клиентов.", icon: "✓" },
          { title: "Честность", description: "Мы ведем бизнес честно, прозрачно и этично, строя доверительные отношения с нашими клиентами, партнерами и сотрудниками.", icon: "🤝" },
          { title: "Ориентация на клиента", description: "Мы ставим клиентов в центр нашего бизнеса, прислушиваемся к их потребностям и неустанно работаем, чтобы превзойти их ожидания.", icon: "👥" },
          { title: "Устойчивость", description: "Мы привержены экологически ответственной практике и разработке решений, которые помогают нашим клиентам снизить воздействие на окружающую среду.", icon: "🌱" },
          { title: "Сотрудничество", description: "Мы верим в силу командной работы и партнерства, создавая совместную среду как внутри компании, так и с нашими клиентами.", icon: "🔄" }
        ],
        milestones: [
          { year: "1234", title: "ТЕСТ1", description: "Тестовая фраза, бессмысленная, требует замены." },
          { year: "1234", title: "ТЕСТ2", description: "Тестовая фраза, бессмысленная, требует замены." },
          { year: "1234", title: "ТЕСТ3", description: "Тестовая фраза, бессмысленная, требует замены." },
          { year: "1234", title: "ТЕСТ4", description: "Тестовая фраза, бессмысленная, требует замены." },
          { year: "1234", title: "ТЕСТ5", description: "Тестовая фраза, бессмысленная, требует замены." },
          { year: "1234", title: "ТЕСТ6", description: "Тестовая фраза, бессмысленная, требует замены." }
        ],
        whyUsList: [
          "Мы никогда не снижали требований к качеству, срокам поставки или обслуживанию клиентов",
          "Мы получили признание и поддержку всех клиентов, некоторые сотрудничают более 10 лет",
          "Наши клиенты по всему миру, включая Shimano, Decathlon, Academy, Gamakatsu...",
          "У нас есть почти 20 патентов, и мы неоднократно выигрывали премию «Лучший продукт» на китайской выставке рыболовного снаряжения",
          "Мы помогали клиентам выигрывать награды на ICAST, EFTTEX, в Австралии неоднократно",
          "У нас две производственные базы, 300 сотрудников и передовое оборудование, обеспечивающее производственную мощность 30 000 упаковок/день"
        ],
        certificationsTabs: { certifications: "Сертификаты", partners: "Партнеры" },
        certificationsList: [
          { name: "Лучший продукт China Fish", description: "Мы неоднократно выигрывали премию лучшего продукта на выставке рыболовного снаряжения в Китае" },
          { name: "Лучший продукт ICAST SHOW", description: "Мы разрабатываем новые продукты совместно с клиентами, выиграв премию 3 раза" },
          { name: "Лучший продукт EFTTEX", description: "Мы разрабатываем новые продукты совместно с клиентами, выиграв премию 2 раза" },
          { name: "Лучший продукт Австралии", description: "Мы разрабатываем новые продукты совместно с клиентами, неоднократно выиграв премию" },
          { name: "Почти 20 патентов", description: "У нашей команды почти 20 патентов" },
          { name: "Стандарты охраны окружающей среды", description: "Мы соблюдаем экологические стандарты в процессах переработки всех запахов и пыли" }
        ],
        partnersDescription: "Мы сотрудничаем с ведущими технологическими поставщиками и отраслевыми организациями, чтобы предоставлять клиентам комплексные решения.",
        partnersList: [
          { name: "ECOODA", logo: "/partners/ECOODA.png" },
          { name: "LangBao", logo: "/partners/langbao.png" },
          { name: "RTI", logo: "/partners/RTI.png" },
          { name: "Wider", logo: "/partners/wider.png" }
        ],
        
        // 产品类别翻译 (补全)
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
        // 导航翻译 (补全)
        home: "INÍCIO",
        aboutUs: "SOBRE NÓS",
        hardLure: "ISCA RÍGIDA",
        softLure: "ISCA MACIA",
        metalLure: "ISCA METÁLICA",
        squidLure: "ISCA PARA LULA",
        accessory: "ACESSÓRIOS",
        
        // 关于页面翻译
        backToHome: "Voltar ao Início",
        ourStory: "Nossa História",
        ourJourney: "Nossa Jornada",
        ourValues: "Valores",
        whyUs: "Por Que Nós",
        storyText: "ANDA está localizada na bela cidade de Weihai, Shandong, China. Temos cerca de 200 funcionários, uma equipe de P&D muito forte, processos de produção e sistema de gestão de controle de qualidade. Temos plena energia e confiança para fornecer o melhor serviço e produtos excelentes para todos os clientes o tempo todo. Nossos produtos são exportados para Japão, Sudeste Asiático, Austrália, Europa, EUA e outras regiões. Você ficará satisfeito com nossa excelente qualidade e posição de crédito favorável.",
        valuesText: "Qualidade, Inovação, Sustentabilidade, Satisfação do Cliente",
        journeyText: "Marcos importantes na história da nossa empresa",
        aboutUsText: "Liderando o setor com soluções inovadoras desde 2010",
        whyUsText: "Estamos comprometidos em fornecer produtos e serviços excepcionais que ajudam nossos clientes a ter sucesso. Aqui está o que nos diferencia:",
        valuesList: [
          { title: "Inovação", description: "Continuamente expandimos os limites do possível, desenvolvendo novas tecnologias e soluções que abordam os desafios em evolução da indústria.", icon: "🔍" },
          { title: "Qualidade", description: "Mantemos os mais altos padrões em tudo o que fazemos, desde o design e fabricação do produto até o atendimento e suporte ao cliente.", icon: "✓" },
          { title: "Integridade", description: "Conduzimos nossos negócios com honestidade, transparência e práticas éticas, construindo confiança com nossos clientes, parceiros e funcionários.", icon: "🤝" },
          { title: "Foco no Cliente", description: "Colocamos nossos clientes no centro dos nossos negócios, ouvindo suas necessidades e trabalhando incansavelmente para superar suas expectativas.", icon: "👥" },
          { title: "Sustentabilidade", description: "Estamos comprometidos com práticas ambientalmente responsáveis e desenvolvendo soluções que ajudam nossos clientes a reduzir seu impacto ambiental.", icon: "🌱" },
          { title: "Colaboração", description: "Acreditamos no poder do trabalho em equipe e da parceria, promovendo um ambiente colaborativo tanto internamente quanto com nossos clientes.", icon: "🔄" }
        ],
        milestones: [
          { year: "1234", title: "TESTE1", description: "Frase de teste, sem sentido, precisa ser substituída." },
          { year: "1234", title: "TESTE2", description: "Frase de teste, sem sentido, precisa ser substituída." },
          { year: "1234", title: "TESTE3", description: "Frase de teste, sem sentido, precisa ser substituída." },
          { year: "1234", title: "TESTE4", description: "Frase de teste, sem sentido, precisa ser substituída." },
          { year: "1234", title: "TESTE5", description: "Frase de teste, sem sentido, precisa ser substituída." },
          { year: "1234", title: "TESTE6", description: "Frase de teste, sem sentido, precisa ser substituída." }
        ],
        whyUsList: [
          "Nunca relaxamos requisitos de qualidade, prazos ou serviço ao cliente",
          "Recebemos reconhecimento e apoio de todos os clientes, alguns cooperam há mais de 10 anos",
          "Nossos principais clientes estão em todo o mundo, incluindo Shimano, Decathlon, Academy, Gamakatsu...",
          "Temos quase 20 patentes e vencemos o Prêmio Melhor Produto na China Fishing Gear Exhibition várias vezes",
          "Ajudamos clientes a vencer prêmios na ICAST, EFTTEX, Austrália várias vezes",
          "Temos duas bases de produção, 300 funcionários e equipamentos avançados para garantir capacidade de 30.000 pacotes/dia"
        ],
        certificationsTabs: { certifications: "Certificações", partners: "Parceiros" },
        certificationsList: [
          { name: "Melhor Produto do China Fish", description: "Vencemos o prêmio de melhor produto na China Fishing Gear Exhibition várias vezes" },
          { name: "Melhor Produto do ICAST SHOW", description: "Desenvolvemos novos produtos em colaboração com clientes para vencer o prêmio 3 vezes" },
          { name: "Melhor Produto do EFTTEX", description: "Desenvolvemos novos produtos em colaboração com clientes para vencer o prêmio 2 vezes" },
          { name: "Melhor Produto da Austrália", description: "Desenvolvemos novos produtos em colaboração com clientes para vencer o prêmio várias vezes" },
          { name: "Quase 20 patentes", description: "Nossa equipe tem quase 20 patentes" },
          { name: "Padrões de proteção ambiental", description: "Atendemos padrões ambientais em processos de reciclagem de odores e poeira" }
        ],
        partnersDescription: "Parceiros líderes de tecnologia e organizações do setor para entregar soluções abrangentes aos nossos clientes.",
        partnersList: [
          { name: "ECOODA", logo: "/partners/ECOODA.png" },
          { name: "LangBao", logo: "/partners/langbao.png" },
          { name: "RTI", logo: "/partners/RTI.png" },
          { name: "Wider", logo: "/partners/wider.png" }
        ],
        
        // 产品类别翻译 (补全)
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



export default function AboutPage() {
  const { language } = useLanguage()
  const t = translations[language]

  // Function to translate product names while keeping brand codes untranslated
  const translateProductName = (item: string) => {
    // Convert to camelCase to match translation keys
    const words = item.toLowerCase().split(' ')
    const camelCaseKey = words[0] + words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')
    return (t as any)[camelCaseKey] || item
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
  const squidLureItems = ["EGI SERIES", "LS SERIES" ]
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
            src="/about us.jpg?height=600&width=1920"
            alt="About us hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative z-10 mx-auto flex min-h-[400px] flex-col items-center justify-center px-4 py-20 text-center text-white sm:px-6 lg:px-8">
          <FadeInOnScroll delay={0.1}>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{t.aboutUs}</h1>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.3}>
            <p className="mb-10 max-w-2xl text-lg text-gray-200 sm:text-xl">
              {t.aboutUsText}
            </p>
          </FadeInOnScroll>
        </div>
      </section>
      
      {/* Our Story */}
      <FadeInOnScroll>
        <section className="bg-white py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t.ourStory}</h2>
                <div className="mt-6 space-y-4 text-lg text-gray-600">
                  {t.storyText}
                </div>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-lg shadow-xl">
                <Image
                  src="/our story.jpg?height=400&width=600"
                  alt="Our company story"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>
      
      {/* Our Values */}
      <FadeInOnScroll delay={0.2}>
        <section className="bg-gray-50 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t.ourValues}</h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                {t.valuesText}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {t.valuesList.map((value, index) => (
                <FadeInOnScroll key={index} delay={0.1 * index}>
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                    <CardContent className="p-6">
                      <div className="mb-4 text-4xl">{value.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                      <p className="mt-2 text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>
      </FadeInOnScroll>
      
      {/* Company Timeline */}
      {false && (
      <FadeInOnScroll delay={0.2}>
        <section className="bg-white py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t.ourJourney}</h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">{t.journeyText}</p>
            </div>
            <div className="relative">
            {/* Timeline line */}
              <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-gray-200" />

              <div className="space-y-12">
                {t.milestones.map((milestone, index) => (
                  <FadeInOnScroll key={index} delay={0.1 * index}>
                    <div
                      className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"} md:justify-between`}
                    >
                      <div
                        className={`hidden md:block ${index % 2 === 0 ? "order-1 pr-8 text-right" : "order-2 pl-8 text-left"} w-1/2`}
                      >
                        <h3 className="text-xl font-semibold text-gray-900">{milestone.title}</h3>
                        <p className="mt-1 text-gray-600">{milestone.description}</p>
                      </div>
                      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                          {milestone.year.slice(-2)}
                        </div>
                      </div>
                      <div
                        className={`md:w-1/2 ${index % 2 === 0 ? "md:order-2 md:pl-8" : "md:order-1 md:pr-8 md:text-right"} pl-12 md:pl-0`}
                      >
                        <div className="md:hidden mb-1 font-semibold text-blue-600">{milestone.year}</div>
                        <div className="hidden md:block mb-1 font-semibold text-blue-600">{milestone.year}</div>
                        <h3 className="text-xl font-semibold text-gray-900 md:hidden">{milestone.title}</h3>
                        <p className="text-gray-600 md:hidden">{milestone.description}</p>
                      </div>
                    </div>
                  </FadeInOnScroll>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>
      )}
      
      {/* Why Choose Us */}
      <FadeInOnScroll delay={0.2}>
        <section className="bg-white py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t.whyUs}</h2>
                <p className="mt-4 text-lg text-gray-600">
                  {t.whyUsText}
                </p>
                <div className="mt-8 space-y-4">
                  {t.whyUsList.map((item, index) => (
                    <FadeInOnScroll key={index} delay={0.1 * index}>
                      <div className="flex items-start">
                        <div className="mr-3 h-2 w-2 mt-2 rounded-full bg-blue-600 flex-shrink-0"></div>
                        <p className="text-gray-600">{item}</p>
                      </div>
                    </FadeInOnScroll>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2 relative h-[400px] overflow-hidden rounded-lg shadow-xl">
                <Image 
                  src="/why us.jpg?height=400&width=600" 
                  alt="Why choose us" 
                  fill 
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>
      
{/* Certifications & Partners */}
      <FadeInOnScroll delay={0.2}>
        <section className="bg-gray-50 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="certifications" className="w-full">
              <div className="mb-8 text-center">
                <TabsList className="inline-flex">
                  <TabsTrigger value="certifications">{t.certificationsTabs.certifications}</TabsTrigger>
                  <TabsTrigger value="partners">{t.certificationsTabs.partners}</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="certifications">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {t.certificationsList.map((cert, index) => (
                    <FadeInOnScroll key={index} delay={0.1 * index}>
                      <Card className="transition-all duration-300 hover:shadow-xl">
                        <CardContent className="p-4">
                          <h3 className="text-xl font-semibold text-gray-900">{cert.name}</h3>
                          <p className="mt-2 text-gray-600">{cert.description}</p>
                        </CardContent>
                      </Card>
                    </FadeInOnScroll>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="partners">
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
                  {t.partnersList.map((partner, index) => (
                    <FadeInOnScroll key={index} delay={0.1 * index}>
                      <div className="flex items-center justify-center p-4">
                        <div className="h-20 w-40 relative">
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </FadeInOnScroll>
                  ))}
                </div>
                <FadeInOnScroll delay={0.6}>
                  <p className="mt-8 text-center text-gray-600">{t.partnersDescription}</p>
                </FadeInOnScroll>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </FadeInOnScroll>
    </div>
  )
}