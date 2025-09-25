"use client"
import { useLanguage } from "@/contexts/LanguageContext"
import { pt, ru, tr } from "date-fns/locale"
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, MessageCircle } from "lucide-react"

// Custom X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const translations = {
  en: {
    aboutUs: "About Us",
    aboutText:
      "ANDA is a leading manufacturer of high-quality fishing lures, dedicated to providing anglers worldwide with innovative and effective fishing solutions.",
    products: "Products",
    hardLure: "Hard Lure",
    softLure: "Soft Lure",
    metalLure: "Metal Lure",
    squidLure: "Squid Lure",
    accessory: "Accessory",
    contactUs: "Contact Us",
    address: "NO.3-1, Minjiang Street, Weihai, #264203, Shandong, China",
    phone: "+86-18663108236",
    tel: "+86-0631-5758228/5757585",
    Fax: "86+631+5758552",
    skype: "andalure2010",
    wechat: "an18663108236",
    email: "sales@andalure.com/truman@andalure.com",
    followUs: "Follow Us",
    copyright: "© 2023 ANDA. All rights reserved.",
  },
  zh: {
    aboutUs: "关于我们",
    aboutText: "ANDA是一家领先的高品质渔具制造商，致力于为全球钓鱼爱好者提供创新有效的钓鱼解决方案。",
    products: "产品",
    hardLure: "硬饵",
    softLure: "软饵",
    metalLure: "金属饵",
    squidLure: "鱿鱼饵",
    accessory: "配件",
    contactUs: "联系我们",
    address: "威海市环翠区张村镇后双岛村闽江街3-1号",
    phone: "+86-18663108236",
    tel: "+86-0631-5758228/5757585",
    Fax: "86+631+5758552",
    skype: "andalure2010",
    wechat: "an18663108236",
    email: "sales@andalure.com/truman@andalure.com",
    followUs: "关注我们",
    copyright: "© 2023 ANDA. 保留所有权利。",
  },
  ja: {
    aboutUs: "会社概要",
    aboutText:
      "ANDAは高品質な釣具の製造において業界をリードする企業で、世界中の釣り人に革新的で効果的な釣りソリューションを提供することに専念しています。",
    products: "製品",
    hardLure: "ハードルアー",
    softLure: "ソフトルアー",
    metalLure: "メタルルアー",
    squidLure: "イカルアー",
    accessory: "アクセサリー",
    contactUs: "お問い合わせ",
    address: "威海市環翠区張村鎮後双島村閩江街3-1号",
    phone: "+86-18663108236",
    tel: "+86-0631-5758228/5757585",
    Fax: "86+631+5758552",
    skype: "andalure2010",
    wechat: "an18663108236",
    email: "sales@andalure.com/truman@andalure.com",
    followUs: "フォローする",
    copyright: "© 2023 ANDA. 全著作権所有。",
  },
  ko: {
    aboutUs: "회사소개",
    aboutText:
      "ANDA는 고품질 낚시용품 제조 분야의 선도 기업으로, 전 세계 낚시꾼들에게 혁신적이고 효과적인 낚시 솔루션을 제공하는 데 전념하고 있습니다.",
    products: "제품",
    hardLure: "하드루어",
    softLure: "소프트루어",
    metalLure: "메탈루어",
    squidLure: "오징어루어",
    accessory: "액세서리",
    contactUs: "문의하기",
    address: "웨이하이시 환추이구 장춘전 허우솽다오촌 민장거리 3-1호",
    phone: "+86-18663108236",
    tel: "+86-0631-5758228/5757585",
    Fax: "86+631+5758552",
    skype: "andalure2010",
    wechat: "an18663108236",
    email: "sales@andalure.com/truman@andalure.com",
    followUs: "팔로우하기",
    copyright: "© 2023 ANDA. 모든 권리 보유.",
  },
  es: {
    aboutUs: "Acerca de Nosotros",
    aboutText:
      "ANDA es un fabricante líder de señuelos de pesca de alta calidad, dedicado a proporcionar a los pescadores de todo el mundo soluciones de pesca innovadoras y efectivas.",
    products: "Productos",
    hardLure: "Señuelo Duro",
    softLure: "Señuelo Blando",
    metalLure: "Señuelo Metal",
    squidLure: "Señuelo Calamar",
    accessory: "Accesorio",
    contactUs: "Contáctenos",
    address: "No.3-1, Calle Minjiang, Aldea Houshuangdao, Pueblo Zhangcun, Distrito Huancui, Ciudad Weihai",
    phone: "+86-18663108236",
    tel: "+86-0631-5758228/5757585",
    Fax: "86+631+5758552",
    skype: "andalure2010",
    wechat: "an18663108236",
    email: "sales@andalure.com/truman@andalure.com",
    followUs: "Síganos",
    copyright: "© 2023 ANDA. Todos los derechos reservados.",
  },
  tr: {
  aboutUs: "Hakkımızda",
  aboutText: "ANDA, dünya çapında balıkçılara yenilikçi ve etkili çözümler sunan, yüksek kaliteli balık yemleri üreten öncü bir markadır.",
  products: "Ürünler",
  hardLure: "Sert Yem",
  softLure: "Yumuşak Yem",
  metalLure: "Metal Yem",
  squidLure: "Kalamar Yemi",
  accessory: "Aksesuar",
  contactUs: "İletişim",
  address: "Weihai Şehri, Huancui Bölgesi, Zhangcun Kasabası, Houshuangdao Köyü, Minjiang Caddesi No:3-1",
  phone: "+86-18663108236",
  tel: "+86-0631-5758228/5757585",
  Fax: "86+631+5758552",
  skype: "andalure2010",
  wechat: "an18663108236",
  email: "sales@andalure.com/truman@andalure.com",
  followUs: "Bizi Takip Edin",
  copyright: "© 2023 ANDA. Tüm hakları saklıdır."
},
  ru: {
  aboutUs: "О нас",
  aboutText: "ANDA — ведущий производитель высококачественных рыболовных приманок, предлагающий рыбакам по всему миру инновационные и эффективные решения.",
  products: "Продукция",
  hardLure: "Твёрдая приманка",
  softLure: "Мягкая приманка",
  metalLure: "Металлическая приманка",
  squidLure: "Приманка для кальмара",
  accessory: "Аксессуары",
  contactUs: "Связаться с нами",
  address: "г. Вэйхай, район Хуаньцуй, посёлок Чжанцунь, деревня Хоушуандао, ул. Миньцзян, д.3-1",
  phone: "+86-18663108236",
  tel: "+86-0631-5758228/5757585",
  Fax: "86+631+5758552",
  skype: "andalure2010",
  wechat: "an18663108236",
  email: "sales@andalure.com/truman@andalure.com",
  followUs: "Подпишитесь",
  copyright: "© 2023 ANDA. Все права защищены."
},
  pt: {
  aboutUs: "Sobre Nós",
  aboutText: "A ANDA é uma líder na fabricação de iscas de pesca de alta qualidade, dedicada a oferecer soluções inovadoras e eficientes para pescadores em todo o mundo.",
  products: "Produtos",
  hardLure: "Isca Rígida",
  softLure: "Isca Macia",
  metalLure: "Isca Metálica",
  squidLure: "Isca para Lula",
  accessory: "Acessórios",
  contactUs: "Contate-nos",
  address: "No.3-1, Rua Minjiang, Aldeia Houshuangdao, Vila Zhangcun, Distrito Huancui, Cidade de Weihai",
  phone: "+86-18663108236",
  tel: "+86-0631-5758228/5757585",
  Fax: "86+631+5758552",
  skype: "andalure2010",
  wechat: "an18663108236",
  email: "sales@andalure.com/truman@andalure.com",
  followUs: "Siga-nos",
  copyright: "© 2023 ANDA. Todos os direitos reservados."
},
}

export default function Footer() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t.aboutUs}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t.aboutText}</p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t.products}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-400">{t.hardLure}</span>
              </li>
              <li>
                <span className="text-gray-400">{t.softLure}</span>
              </li>
              <li>
                <span className="text-gray-400">{t.metalLure}</span>
              </li>
              <li>
                <span className="text-gray-400">{t.squidLure}</span>
              </li>
              <li>
                <span className="text-gray-400">{t.accessory}</span>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t.contactUs}</h3>
            <address className="not-italic space-y-2 text-sm text-gray-400">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>{t.address}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{t.phone}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>TEL: {t.tel}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>Fax: {t.Fax}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MessageCircle className="h-4 w-4 flex-shrink-0" />
                <span>Skype: {t.skype}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MessageCircle className="h-4 w-4 flex-shrink-0" />
                <span>WeChat: {t.wechat}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>{t.email}</span>
              </div>
            </address>
          </div>

          {/* Follow Us */}
          {false && (
          <div>
            <h3 className="text-xl font-bold mb-4">{t.followUs}</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://www.facebook.com/andafishing"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://x.com/andafishing"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <XIcon className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/andafishing"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/andafishing"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://www.youtube.com/andafishing"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Youtube className="h-6 w-6" />
              </a>
              <a
                href="https://www.tiktok.com/@andafishing"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>
          )}
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">{t.copyright}</div>
      </div>
    </footer>
  )
}
