"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"
import { FadeInOnScroll } from "@/components/FadeInOnScroll"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, ArrowLeft, MessageCircle, Heart } from "lucide-react"
import { useState, useEffect } from "react"

const translations = {
  en: {
    backToHome: "Back to Home",
    contactUs: "Contact Us",
    getInTouch: "Get in Touch",
    contactDescription: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    contactForm: "Contact Form",
    name: "Full Name",
    email: "Email Address",
    subject: "Subject",
    message: "Message",
    sendMessage: "Send Message",
    businessHours: "Business Hours",
    mondayFriday: "Monday - Friday: CST, UTC+8 8:00 AM - 5:00 PM",
    saturday: "Saturday: Closed",
    sunday: "Sunday: Closed",
    namePlaceholder: "Enter your full name",
    emailPlaceholder: "Enter your email address",
    subjectPlaceholder: "Enter the subject",
    messagePlaceholder: "Enter your message here...",
    successMessage: "Thank you! Your message has been sent successfully. We'll get back to you soon.",
    errorMessage: "Sorry, there was an error sending your message. Please try again later.",
    sending: "Sending...",
    wishlistItems: "Wishlist Items",
    wishlistDescription: "These items will be included in your inquiry when you submit the form.",
    clearWishlist: "Clear Wishlist",
    clearWishlistConfirm: "Are you sure you want to clear your wishlist?",
    showMore: "Show More",
  },
  zh: {
    backToHome: "返回首页",
    contactUs: "联系我们",
    getInTouch: "联系我们",
    contactDescription: "我们很乐意收到您的来信。请给我们发送消息，我们会尽快回复。",
    contactForm: "联系表格",
    name: "姓名",
    email: "邮箱地址",
    subject: "主题",
    message: "消息",
    sendMessage: "发送消息",
    businessHours: "营业时间",
    mondayFriday: "周一至周五：上午8:00 - 下午5:00",
    saturday: "周六：休息",
    sunday: "周日：休息",
    namePlaceholder: "请输入您的姓名",
    emailPlaceholder: "请输入您的邮箱地址",
    subjectPlaceholder: "请输入主题",
    messagePlaceholder: "请在此输入您的消息...",
    successMessage: "谢谢！您的消息已成功发送。我们会尽快回复您。",
    errorMessage: "抱歉，发送消息时出现错误。请稍后再试。",
    sending: "发送中...",
    wishlistItems: "愿望清单项目",
    wishlistDescription: "提交表单时，这些项目将包含在您的询问中。",
    clearWishlist: "清空愿望清单",
    clearWishlistConfirm: "您确定要清空愿望清单吗？",
    showMore: "显示更多",
  },
  ja: {
    backToHome: "ホームに戻る",
    contactUs: "お問い合わせ",
    getInTouch: "お問い合わせ",
    contactDescription: "お気軽にお問い合わせください。メッセージをお送りいただければ、できるだけ早くご返信いたします。",
    contactForm: "お問い合わせフォーム",
    name: "お名前",
    email: "メールアドレス",
    subject: "件名",
    message: "メッセージ",
    sendMessage: "メッセージを送信",
    businessHours: "営業時間",
    mondayFriday: "月曜日〜金曜日：CST, UTC+8 午前8:00〜午後5:00",
    saturday: "土曜日：休業",
    sunday: "日曜日：休業",
    namePlaceholder: "お名前を入力してください",
    emailPlaceholder: "メールアドレスを入力してください",
    subjectPlaceholder: "件名を入力してください",
    messagePlaceholder: "こちらにメッセージを入力してください...",
    successMessage: "ありがとうございます！メッセージが正常に送信されました。すぐに返信いたします。",
    errorMessage: "申し訳ございませんが、メッセージの送信中にエラーが発生しました。後でもう一度お試しください。",
    sending: "送信中...",
    wishlistItems: "ウィッシュリスト項目",
    wishlistDescription: "フォームを送信する際、これらの項目がお問い合わせに含まれます。",
    clearWishlist: "ウィッシュリストをクリア",
    clearWishlistConfirm: "ウィッシュリストをクリアしてもよろしいですか？",
    showMore: "もっと見る",
  },
  ko: {
    backToHome: "홈으로 돌아가기",
    contactUs: "문의하기",
    getInTouch: "문의하기",
    contactDescription: "연락을 기다리고 있습니다. 메시지를 보내주시면 가능한 한 빨리 응답드리겠습니다.",
    contactForm: "문의 양식",
    name: "성명",
    email: "이메일 주소",
    subject: "제목",
    message: "메시지",
    sendMessage: "메시지 보내기",
    businessHours: "영업 시간",
    mondayFriday: "월요일 - 금요일: CST UTC+8 오전 8:00 - 오후 5:00",
    saturday: "토요일: 휴무",
    sunday: "일요일: 휴무",
    namePlaceholder: "성명을 입력하세요",
    emailPlaceholder: "이메일 주소를 입력하세요",
    subjectPlaceholder: "제목을 입력하세요",
    messagePlaceholder: "여기에 메시지를 입력하세요...",
    successMessage: "감사합니다! 메시지가 성공적으로 전송되었습니다. 곧 답변드리겠습니다.",
    errorMessage: "죄송합니다. 메시지 전송 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.",
    sending: "전송 중...",
    wishlistItems: "위시리스트 항목",
    wishlistDescription: "양식을 제출할 때 이 항목들이 문의에 포함됩니다.",
    clearWishlist: "위시리스트 비우기",
    clearWishlistConfirm: "위시리스트를 비우시겠습니까?",
    showMore: "더 보기",
  },
  es: {
    backToHome: "Volver al Inicio",
    contactUs: "Contáctenos",
    getInTouch: "Ponerse en Contacto",
    contactDescription: "Nos encantaría saber de usted. Envíenos un mensaje y responderemos lo antes posible.",
    contactForm: "Formulario de Contacto",
    name: "Nombre Completo",
    email: "Dirección de Correo",
    subject: "Asunto",
    message: "Mensaje",
    sendMessage: "Enviar Mensaje",
    businessHours: "Horario Comercial",
    mondayFriday: "Lunes - Viernes: CST UTC+8 8:00 AM - 5:00 PM",
    saturday: "Sábado: Cerrado",
    sunday: "Domingo: Cerrado",
    namePlaceholder: "Ingrese su nombre completo",
    emailPlaceholder: "Ingrese su dirección de correo",
    subjectPlaceholder: "Ingrese el asunto",
    messagePlaceholder: "Ingrese su mensaje aquí...",
    successMessage: "¡Gracias! Su mensaje ha sido enviado exitosamente. Le responderemos pronto.",
    errorMessage: "Lo sentimos, hubo un error al enviar su mensaje. Por favor intente más tarde.",
    sending: "Enviando...",
    wishlistItems: "Artículos de Lista de Deseos",
    wishlistDescription: "Estos artículos se incluirán en su consulta cuando envíe el formulario.",
    clearWishlist: "Limpiar Lista de Deseos",
    clearWishlistConfirm: "¿Está seguro de que desea limpiar su lista de deseos?",
    showMore: "Mostrar Más",
  },
  tr: {
    backToHome: "Ana Sayfaya Dön",
    contactUs: "İletişim",
    getInTouch: "İletişime Geçin",
    contactDescription: "Sizden haber almayı çok isteriz. Bize bir mesaj gönderin, en kısa sürede yanıt vereceğiz.",
    contactForm: "İletişim Formu",
    name: "Ad Soyad",
    email: "E-posta Adresi",
    subject: "Konu",
    message: "Mesaj",
    sendMessage: "Mesaj Gönder",
    businessHours: "Çalışma Saatleri",
    mondayFriday: "Pazartesi - Cuma: CST UTC+8 08:00 - 17:00",
    saturday: "Cumartesi: Kapalı",
    sunday: "Pazar: Kapalı",
    namePlaceholder: "Adınızı ve soyadınızı girin",
    emailPlaceholder: "E-posta adresinizi girin",
    subjectPlaceholder: "Konuyu girin",
    messagePlaceholder: "Mesajınızı buraya girin...",
    successMessage: "Teşekkürler! Mesajınız başarıyla gönderildi. Size yakında geri döneceğiz.",
    errorMessage: "Üzgünüz, mesajınızı gönderirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
    sending: "Gönderiliyor...",
    wishlistItems: "İstek Listesi Öğeleri",
    wishlistDescription: "Formu gönderdiğinizde bu öğeler sorgunuzda yer alacaktır.",
    clearWishlist: "İstek Listesini Temizle",
    clearWishlistConfirm: "İstek listenizi temizlemek istediğinizden emin misiniz?",
    showMore: "Daha Fazla Göster",
  },
  ru: {
    backToHome: "На главную",
    contactUs: "Связаться с нами",
    getInTouch: "Свяжитесь с нами",
    contactDescription: "Мы будем рады услышать от вас. Отправьте нам сообщение, и мы ответим как можно скорее.",
    contactForm: "Форма обратной связи",
    name: "Полное имя",
    email: "Адрес электронной почты",
    subject: "Тема",
    message: "Сообщение",
    sendMessage: "Отправить сообщение",
    businessHours: "Часы работы",
    mondayFriday: "Понедельник - Пятница: CST UTC+8 8:00 - 17:00",
    saturday: "Суббота: Выходной",
    sunday: "Воскресенье: Выходной",
    namePlaceholder: "Введите ваше полное имя",
    emailPlaceholder: "Введите ваш адрес электронной почты",
    subjectPlaceholder: "Введите тему",
    messagePlaceholder: "Введите ваше сообщение здесь...",
    successMessage: "Спасибо! Ваше сообщение было успешно отправлено. Мы скоро свяжемся с вами.",
    errorMessage: "Извините, произошла ошибка при отправке сообщения. Попробуйте позже.",
    sending: "Отправка...",
    wishlistItems: "Элементы списка желаний",
    wishlistDescription: "Эти элементы будут включены в ваш запрос при отправке формы.",
    clearWishlist: "Очистить список желаний",
    clearWishlistConfirm: "Вы уверены, что хотите очистить список желаний?",
    showMore: "Показать больше",
  },
  pt: {
    backToHome: "Voltar para o Início",
    contactUs: "Contate-nos",
    getInTouch: "Entre em Contato",
    contactDescription: "Adoraríamos ouvir de você. Envie-nos uma mensagem e responderemos o mais rápido possível.",
    contactForm: "Formulário de Contato",
    name: "Nome Completo",
    email: "Endereço de E-mail",
    subject: "Assunto",
    message: "Mensagem",
    sendMessage: "Enviar Mensagem",
    businessHours: "Horário Comercial",
    mondayFriday: "Segunda - Sexta: CST UTC+8 8:00 - 17:00",
    saturday: "Sábado: Fechado",
    sunday: "Domingo: Fechado",
    namePlaceholder: "Digite seu nome completo",
    emailPlaceholder: "Digite seu endereço de e-mail",
    subjectPlaceholder: "Digite o assunto",
    messagePlaceholder: "Digite sua mensagem aqui...",
    successMessage: "Obrigado! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.",
    errorMessage: "Desculpe, houve um erro ao enviar sua mensagem. Tente novamente mais tarde.",
    sending: "Enviando...",
    wishlistItems: "Itens da Lista de Desejos",
    wishlistDescription: "Esses itens serão incluídos em sua consulta quando você enviar o formulário.",
    clearWishlist: "Limpar Lista de Desejos",
    clearWishlistConfirm: "Tem certeza de que deseja limpar sua lista de desejos?",
    showMore: "Mostrar Mais"
  },
}

export default function ContactPage() {
  const { language } = useLanguage()
  const t = translations[language]
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [wishlistData, setWishlistData] = useState<any[]>([])

  // Load wishlist data from localStorage on component mount
  useEffect(() => {
    // Prefer the richer contactWishlist; fallback to mapping wishlist ids
    const savedContact = localStorage.getItem('contactWishlist')
    if (savedContact) {
      try {
        const parsed = JSON.parse(savedContact)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWishlistData(parsed)
          return
        }
      } catch (e) {
        // ignore JSON errors and continue to fallback
      }
    }
    
    // Load from regular wishlist and map to product details
    const savedIds = localStorage.getItem('wishlist')
    if (savedIds) {
      try {
        const ids: string[] = JSON.parse(savedIds)
        if (Array.isArray(ids) && ids.length > 0) {
          // Define essential product details for common items
          const productDetails: Record<string, { id: string; name: string; description: string; image: string }> = {
              jb50: {
                id: "jb50",
                name: "JB50",
                description: "50mm 2.8g Suspend/Long Cast",
                image: "/product/jb50.png?height=200&width=200&text=JB50+1",
              },
              jb65: {
                id: "jb65",
                name: "JB65",
                description: "65mm 7g Suspend/Magnet",
                image: "/product/示例1.png?height=200&width=200&text=JB65+1",
              },
              jb85: {
                id: "jb85",
                name: "JB85",
                description: "83mm 10g Suspend/Magnet",
                image: "/product/示例1.png?height=200&width=200&text=JB85+1",
              },
              jb95: {
                id: "jb95",
                name: "JB95",
                description: "95mm 15g Suspend/Magnet",
                image: "/product/示例1.png?height=200&width=200&text=JB95+1",
              },
              jb120: {
                id: "jb120",
                name: "JB120",
                description: "120mm 22g Suspend/Magnet",
                image: "/product/示例1.png?height=200&width=200&text=JB120+1",
              },
              jb150: {
                id: "jb150",
                name: "JB150",
                description: "150mm 40.2g Suspend/Magnet",
                image: "/product/示例1.png?height=200&width=200&text=JB150+1",
              },
              ujs: {
                id: "ujs",
                name: "UJS",
                description: "110mm 15g Floating",
                image: "/product/ujs.png?height=100&width=100&text=UJS+1",
              },
              ujsM: {
                id: "ujsM",
                name: "UJS-M",
                description: "110mm 15.5g Suspending",
                image: "/product/示例1.png?height=200&width=200&text=UJS-M+1",
              },
              ujs85M: {
                id: "ujs85M",
                name: "UJS85-M",
                description: "85mm 10.5g Suspending",
                image: "/product/示例1.png?height=200&width=200&text=UJS85-M+1",
              },
              inna60: {
                id: "inna60",
                name: "INNA60",
                description: "60mm 5.6g Floating",
                image: "/product/示例1.png?height=200&width=200&text=INNA60+1",
              },
              inna70: {
                id: "inna70",
                name: "INNA70",
                description: "74mm 11g Slow Sinking/Magnet Long Cast",
                image: "/product/示例1.png?height=200&width=200&text=INNA70+1",
              },
              inna90: {
                id: "inna90",
                name: "INNA90",
                description: "95mm 16.5g Slow Sinking/Magnet Long Cast",
                image: "/product/示例1.png?height=200&width=200&text=INNA90+1",
              },
              inna110: {
                id: "inna110",
                name: "INNA110",
                description: "115mm 23.2g Slow Sinking/Magnet Long Cast",
                image: "/product/示例1.png?height=200&width=200&text=INNA110+1",
              },
              inna110DD: {
                id: "inna110DD",
                name: "INNA110 DD",
                description: "110mm 28.7g Floating",
                image: "/product/示例1.png?height=200&width=200&text=INNA110DD+1",
              },
              inna110MD: {
                id: "inna110MD",
                name: "INNA110 MD",
                description: "110 26.7g Floating",
                image: "/product/示例1.png?height=200&width=200&text=INNA110MD+1",
              },
              inna140: {
                id: "inna140",
                name: "INNA140",
                description: "140 36g Slow Sinking/Magnet Long Cast",
                image: "/product/示例1.png?height=200&width=200&text=INNA140+1",
              },
              inna165: {
                id: "inna165",
                name: "INNA165",
                description: "165mm 53.4g Floating",
                image: "/product/示例1.png?height=200&width=200&text=INNA165+1",
              },
              inna165DD: {
                id: "inna165DD",
                name: "INNA165 DD",
                description: "165mm 66.3g Floating",
                image: "/product/示例1.png?height=200&width=200&text=INNA165DD+1",
              },
              inna165MD: {
                id: "inna165MD",
                name: "INNA165 MD",
                description: "165mm 51.3g Floating",
                image: "/product/示例1.png?height=200&width=200&text=INNA165MD+1",
              },
              minnow95: {
                id: "minnow95",
                name: "Minnow95",
                description: "97.5mm 14.3g Suspending",
                image: "/product/示例1.png?height=200&width=200&text=Minnow95+1",
              },
              minnow115: {
                id: "minnow115",
                name: "Minnow115",
                description: "117.5mm 21.3g Suspending",
                image: "/product/示例1.png?height=200&width=200&text=Minnow115+1",
              },
              jbs110: {
                id: "jbs110",
                name: "JBS110",
                description: "112mm 16g Suspending",
                image: "/product/示例1.png?height=200&width=200&text=JBS110+1",
              },
              dd120: {
                id: "dd120",
                name: "DD120",
                description: "120mm 21g Suspend/Magnet",
                image: "/product/dd120.png?height=200&width=200&text=DD120+1",
              },
              suspJs: {
                id: "suspJs",
                name: "SUSP JS",
                description: "100mm 18g Suspending",
                image: "/product/示例1.png?height=200&width=200&text=SUSP-JS+1",
              },
              fjs: {
                id: "fjs",
                name: "FJS",
                description: "100mm 17.5g Floating",
                image: "/product/示例1.png?height=200&width=200&text=FJS+1",
              },
              fjs56: {
                id: "fjs56",
                name: "FJS56",
                description: "56mm 3.7g Suspending",
                image: "/product/示例1.png?height=200&width=200&text=FJS56+1",
              },
              swjk75: {
                id: "swjk75",
                name: "SWJK75",
                description: "75mm 12.5g Sinking",
                image: "/product/示例1.png?height=200&width=200&text=SWJK75+1",
              },
              swjk95: {
                id: "swjk95",
                name: "SWJK95",
                description: "95mm 21g Sinking",
                image: "/product/示例1.png?height=200&width=200&text=SWJK95+1",
              },
              j90: {
                id: "j90",
                name: "J90",
                description: "90mm 12g Floating",
                image: "/product/示例1.png?height=200&width=200&text=J90+1",
              },
              j110: {
                id: "j110",
                name: "J110",
                description: "110mm 22g Floating",
                image: "/product/j110.png?height=200&width=200&text=J110+",
              },
              newInna70: {
                  id: "newInna70",
                  name: "NEW INNA70",
                  description: "70mm 7.5 Suspend/Magnet Long Cast",
                  image: "/product/示例1.png?height=200&width=200&text=NEW+INNA70+1",
                },
                newInna90: {
                  id: "newInna90",
                  name: "NEW INNA90",
                  description: "90mm 13.5g Suspend/Magnet Long Cast",
                  image: "/product/示例1.png?height=200&width=200&text=NEW+INNA90+1",
                },
                newInna120: {
                  id: "newInna120",
                  name: "NEW INNA120",
                  description: "120mm 27g Suspend/Magnet Long Cast",
                  image: "/product/示例1.png?height=200&width=200&text=NEW+INNA120+1",
                },
                rdr95: {
                  id: "rdr95",
                  name: "RDR95",
                  description: "95mm 11g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=RDR95+1",
                },
                rdr80: {
                  id: "rdr80",
                  name: "RDR80",
                  description: "80mm 8.5g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=RDR80+1",
                },
                brava77: {
                  id: "brava77",
                  name: "BRAVA 77",
                  description: "77mm 7g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=BRAVA+77+1",
                },
                nst5s: {
                  id: "nst5s",
                  name: "NST5S",
                  description: "140mm 36.2g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=NST5S+1",
                },
                zx118: {
                  id: "zx118",
                  name: "ZX118",
                  description: "118mm 19g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=ZX118+1",
                },
                cx70sp: {
                  id: "cx70sp",
                  name: "CX70SP",
                  description: "70mm 6.9g Suspending",
                  image: "/product/示例1.png?height=200&width=200&text=CX70SP+1",
                },
                cx90sp: {
                  id: "cx90sp",
                  name: "CX90SP",
                  description: "90mm 7.7g Suspending",
                  image: "/product/示例1.png?height=200&width=200&text=CX90SP+1",
                },
                kan160: {
                  id: "kan160",
                  name: "KAN160",
                  description: "160mm 32.4g Suspending",
                  image: "/product/示例1.png?height=200&width=200&text=KAN160+1",
                },
                rj100: {
                  id: "rj100",
                  name: "RJ100",
                  description: "100mm 15.3g Suspending",
                  image: "/product/示例1.png?height=200&width=200&text=RJ100+1",
                },
                msq128: {
                  id: "msq128",
                  name: "MSQ128",
                  description: "128mm 22.6g Suspending",
                  image: "/product/示例1.png?height=200&width=200&text=MSQ128+1",
                },
                shin115: {
                  id: "shin115",
                  name: "SHIN115",
                  description: "115mm 16g Suspending",
                  image: "/product/示例1.png?height=200&width=200&text=SHIN115+1",
                },
                trc55: {
                  id: "trc55",
                  name: "TRC55",
                  description: "55mm 4g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=TRC55+1",
                },
                td120: {
                  id: "td120",
                  name: "TD120",
                  description: "120mm 37.9g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=TD120+1",
                },
                td150: {
                  id: "td150",
                  name: "TD150",
                  description: "150mm 65.5g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=TD150+1",
                },
                adcr60: {
                  id: "adcr60",
                  name: "ADCR60",
                  description: "60mm 12.2g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=ADCR60+1",
                },
                advib58: {
                  id: "advib58",
                  name: "ADVIB58",
                  description: "58mm 15.6g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=ADVIB58+1",
                },
                mcs: {
                  id: "mcs",
                  name: "MCS",
                  description: "38mm 4g",
                  image: "/product/示例1.png?height=200&width=200&text=MCS+1",
                },
                mcm: {
                  id: "mcm",
                  name: "MCM",
                  description: "38mm 4g",
                  image: "/product/示例1.png?height=200&width=200&text=MCM+1",
                },
                crulS: {
                  id: "crulS",
                  name: "CRUL S",
                  description: "45.5mm 6.5g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=CRUL+S+1",
                },
                crulD: {
                  id: "crulD",
                  name: "CRUL D",
                  description: "45.5mm 7g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=CRUL+D+1",
                },
                crulDS38: {
                  id: "crulDS38",
                  name: "CRUL DS38",
                  description: "38mm 4g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=CRUL+DS38+1",
                },
                crulSS38: {
                  id: "crulSS38",
                  name: "CRUL SS38",
                  description: "38mm 3.8g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=CRUL+SS38+1",
                },
                crankS: {
                  id: "crankS",
                  name: "Crank-S",
                  description: "60mm 12g/14g Floating-Silent/Suspend-rattle",
                  image: "/product/示例1.png?height=200&width=200&text=Crank-S+1",
                },
                crankM: {
                  id: "crankM",
                  name: "Crank-M",
                  description: "60mm 13g/15g Floating-Silent/Suspend-rattle",
                  image: "/product/示例1.png?height=200&width=200&text=Crank-M+1",
                },
                ecs: {
                  id: "ecs",
                  name: "ECS",
                  description: "60mm 12.5g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=ECS+1",
                },
                ecm: {
                  id: "ecm",
                  name: "ECM",
                  description: "60mm 13g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=ECM+1",
                },
                ecl: {
                  id: "ecl",
                  name: "ECL",
                  description: "60mm 14g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=ECL+1",
                },
                scs: {
                  id: "scs",
                  name: "SCS",
                  description: "60mm 13g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=SCS+1",
                },
                crs: {
                  id: "crs",
                  name: "CRS",
                  description: "60mm 13.5g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=CRS+1",
                },
                crm: {
                  id: "crm",
                  name: "CRM",
                  description: "68.5mm 20g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=CRM+1",
                },
                crsPlus: {
                  id: "crsPlus",
                  name: "CRS+",
                  description: "60mm 15g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=CRS%2B+1",
                },
                swcr63: {
                  id: "swcr63",
                  name: "SWCR63",
                  description: "63mm 16g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=SWCR63+1",
                },
                swcr78: {
                  id: "swcr78",
                  name: "SWCR78",
                  description: "78mm 25.5g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=SWCR78+1",
                },
                cms: {
                  id: "cms",
                  name: "CMS",
                  description: "54mm 8g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=CMS+1",
                },
                cmm: {
                  id: "cmm",
                  name: "CMM",
                  description: "54mm 8.5g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=CMM+1",
                },
                crd: {
                  id: "crd",
                  name: "CRD",
                  description: "76mm 30g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=CRD+1",
                },
                crdPlus: {
                  id: "crdPlus",
                  name: "CRD+",
                  description: "76mm 31g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=CRD%2B+1",
                },
                c35s: {
                  id: "c35s",
                  name: "C35S",
                  description: "95mm 39g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=C35S+1",
                },
                c4d: {
                  id: "c4d",
                  name: "C4D",
                  description: "103mm 59.5g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=C4D+1",
                },
                dds: {
                  id: "dds",
                  name: "DDS",
                  description: "40mm 4.5g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=DDS+1",
                },
                jcm: {
                  id: "jcm",
                  name: "JCM",
                  description: "35mm 3.7g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=JCM+1",
                },
                fsc55: {
                  id: "fsc55",
                  name: "FSC55",
                  description: "55mm 8g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=FSC55+1",
                },
                fsc65: {
                  id: "fsc65",
                  name: "FSC65",
                  description: "65mm 14g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=FSC65+1",
                },
                sr4: {
                  id: "sr4",
                  name: "SR4",
                  description: "65mm 14.4g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=SR4+1",
                },
                rt: {
                  id: "rt",
                  name: "RT",
                  description: "66mm 17g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=RT+1",
                },
                lcrS: {
                  id: "lcrS",
                  name: "LCR-S",
                  description: "60mm 10.5g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=LCR-S+1",
                },
                lcr: {
                  id: "lcr",
                  name: "LCR",
                  description: "75mm 18.5g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=LCR+1",
                },
                rt50: {
                  id: "rt50",
                  name: "RT50",
                  description: "51mm 10g Sinking/Rattle",
                  image: "/product/示例1.png?height=200&width=200&text=RT50+1",
                },
                rt70: {
                  id: "rt70",
                  name: "RT70",
                  description: "66mm 20g Sinking/Rattle",
                  image: "/product/示例1.png?height=200&width=200&text=RT70+1",
                },
                vib40: {
                  id: "vib40",
                  name: "VIB40",
                  description: "40mm 3.7g Sinking/Rattle",
                  image: "/product/示例1.png?height=200&width=200&text=VIB40+1",
                },
                rattle60: {
                  id: "rattle60",
                  name: "Rattle60",
                  description: "60mm 13g Sinking/Rattle",
                  image: "/product/示例1.png?height=200&width=200&text=Rattle60+1",
                },
                csh: {
                  id: "csh",
                  name: "CSH",
                  description: "72mm 12g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=CSH+1",
                },
                ss82: {
                  id: "ss82",
                  name: "SS82",
                  description: "82mm 15g/18g Slow Sinking/Fast Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=SS82+1",
                },
                rapShad70: {
                  id: "rapShad70",
                  name: "RAP SHAD70",
                  description: "70mm 8.2g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=RAP+SHAD70+1",
                },
                shadS: {
                  id: "shadS",
                  name: "Shad-S",
                  description: "71mm 10g Suspending",
                  image: "/product/示例1.png?height=200&width=200&text=Shad-S+1",
                },
                shadM: {
                  id: "shadM",
                  name: "Shad-M",
                  description: "71mm 12g Suspending",
                  image: "/product/示例1.png?height=200&width=200&text=Shad-M+1",
                },
                shad60M: {
                  id: "shad60M",
                  name: "Shad60-M",
                  description: "60mm 7g Suspending",
                  image: "/product/示例1.png?height=200&width=200&text=Shad60-M+1",
                },
                pep90: {
                  id: "pep90",
                  name: "PEP90",
                  description: "90mm 13g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=PEP90+1",
                },
                pep105: {
                  id: "pep105",
                  name: "PEP105",
                  description: "105mm 17.5g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=PEP105+1",
                },
                spm80: {
                  id: "spm80",
                  name: "SPM80",
                  description: "80mm 13g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=SPM80+1",
                },
                twp: {
                  id: "twp",
                  name: "TWP",
                  description: "64.5mm 8.5g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=TWP+1",
                },
                twpm: {
                  id: "twpm",
                  name: "TWPM",
                  description: "74.5mm 14g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=TWPM+1",
                },
                twp43: {
                  id: "twp43",
                  name: "TWP43",
                  description: "43mm 3.1g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=TWP43+1",
                },
                pm: {
                  id: "pm",
                  name: "PM",
                  description: "95mm 13g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=PM+1",
                },
                pm127: {
                  id: "pm127",
                  name: "PM127",
                  description: "127mm 29g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=PM127+1",
                },
                pop50: {
                  id: "pop50",
                  name: "POP50",
                  description: "51mm 4.5g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=POP50+1",
                },
                pop65: {
                  id: "pop65",
                  name: "POP65",
                  description: "66mm 7g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=POP65+1",
                },
                pop80: {
                  id: "pop80",
                  name: "POP80",
                  description: "80mm 12g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=POP80+1",
                },
                pop100: {
                  id: "pop100",
                  name: "POP100",
                  description: "100mm 21g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=POP100+1",
                },
                pe85: {
                  id: "pe85",
                  name: "PE85",
                  description: "85mm 11g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=PE85+1",
                },
                pe115: {
                  id: "pe115",
                  name: "PE115",
                  description: "115mm 20g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=PE115+1",
                },
                pe100: {
                  id: "pe100",
                  name: "PE100",
                  description: "100mm 16g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=PE100+1",
                },
                propPe100: {
                  id: "propPe100",
                  name: "PROP PE100",
                  description: "100mm 17.4g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=PROP+PE100+1",
                },
                npe100: {
                  id: "npe100",
                  name: "NPE100",
                  description: "100mm 19g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=NPE100+1",
                },
                tw85Sus: {
                  id: "tw85Sus",
                  name: "TW85 (Suspending)",
                  description: "85mm 13.5g Suspending",
                  image: "/product/示例1.png?height=200&width=200&text=TW85+Suspending+1",
                },
                tw85Sink: {
                  id: "tw85Sink",
                  name: "TW85 (Sinking)",
                  description: "85mm 28.5g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=TW85+Sinking+1",
                },
                tw110Sus: {
                  id: "tw110Sus",
                  name: "TW110 (Suspending)",
                  description: "110mm 23.8g Suspending",
                  image: "/product/示例1.png?height=200&width=200&text=TW110+Suspending+1",
                },
                tw110Sink: {
                  id: "tw110Sink",
                  name: "TW110 (Sinking)",
                  description: "110mm 45g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=TW110+Sinking+1",
                },
                snake90: {
                  id: "snake90",
                  name: "SNAKE90",
                  description: "90mm 11.6g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=SNAKE90+1",
                },
                snake115: {
                  id: "snake115",
                  name: "SNAKE115",
                  description: "115mm 22.4g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=SNAKE115+1",
                },
                kp80: {
                  id: "kp80",
                  name: "KP80",
                  description: "80mm 14g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=KP80+1",
                },
                kp100: {
                  id: "kp100",
                  name: "KP100",
                  description: "100mm 27.5g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=KP100+1",
                },
                tws: {
                  id: "tws",
                  name: "TWS",
                  description: "101.5mm 14.5g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=TWS+1",
                },
                tws55: {
                  id: "tws55",
                  name: "TWS55",
                  description: "55mm 3.5g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=TWS55+1",
                },
                pe135: {
                  id: "pe135",
                  name: "PE135",
                  description: "135mm 28g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=PE135+1",
                },
                newPe105: {
                  id: "newPe105",
                  name: "NEW PE105",
                  description: "105mm 15g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=NEW+PE105+1",
                },
                newPe135: {
                  id: "newPe135",
                  name: "NEW PE135",
                  description: "135mm 28g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=NEW+PE135+1",
                },
                sd: {
                  id: "sd",
                  name: "SD",
                  description: "60mm 13g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=SD+1",
                },
                sd38: {
                  id: "sd38",
                  name: "SD38",
                  description: "38mm 3.3g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=SD38+1",
                },
                sm: {
                  id: "sm",
                  name: "SM",
                  description: "96mm 13g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=SM+1",
                },
                hs75: {
                  id: "hs75",
                  name: "HS75",
                  description: "75mm 13.5g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=HS75+1",
                },
                hs90: {
                  id: "hs90",
                  name: "HS90",
                  description: "90mm 21.5g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=HS90+1",
                },
                hmm35: {
                  id: "hmm35",
                  name: "HMM35",
                  description: "90mm 20g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=HMM35+1",
                },
                jl35: {
                  id: "jl35",
                  name: "JL35",
                  description: "90mm 15.7g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=JL35+1",
                },
                glide3: {
                  id: "glide3",
                  name: "GLIDE3",
                  description: "80mm 7.9g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=GLIDE3+1",
                },
                glide5: {
                  id: "glide5",
                  name: "GLIDE5",
                  description: "130mm 25g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=GLIDE5+1",
                },
                cn90s: {
                  id: "cn90s",
                  name: "CN90S",
                  description: "90mm 9g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=CN90S+1",
                },
                cn90f: {
                  id: "cn90f",
                  name: "CN90F",
                  description: "90mm 8.2g Floating",
                  image: "/product/示例1.png?height=200&width=200&text=CN90F+1",
                },
                hdFrog40: {
                  id: "hdFrog40",
                  name: "HD Frog40",
                  description: "40mm 6g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=HD+Frog40+1",
                },
                hdFrog50: {
                  id: "hdFrog50",
                  name: "HD Frog50",
                  description: "50mm 9g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=HD+Frog50+1",
                },
                hdFrog60: {
                  id: "hdFrog60",
                  name: "HD Frog60",
                  description: "60mm 12g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=HD+Frog60+1",
                },
                frog48: {
                  id: "frog48",
                  name: "Frog48",
                  description: "48mm 8g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=Frog48+1",
                },
                frog58: {
                  id: "frog58",
                  name: "Frog58",
                  description: "58mm 11.5g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=Frog58+1",
                },
                msl50: {
                  id: "msl50",
                  name: "MSL 50(TPE)",
                  description: "50mm",
                  image: "/product/示例1.png?height=200&width=200&text=MSL50+1",
                },
                msl70: {
                  id: "msl70",
                  name: "MSL 70(TPE)",
                  description: "70mm",
                  image: "/product/示例1.png?height=200&width=200&text=MSL70+1",
                },
                adst75: {
                  id: "adst75",
                  name: "ADST75",
                  description: "75mm",
                  image: "/product/示例1.png?height=200&width=200&text=ADST75+1",
                },
                adst85: {
                  id: "adst85",
                  name: "ADST85",
                  description: "85mm",
                  image: "/product/示例1.png?height=200&width=200&text=ADST85+1",
                },
                adst100: {
                  id: "adst100",
                  name: "ADST100",
                  description: "100mm",
                  image: "/product/示例1.png?height=200&width=200&text=ADST100+1",
                },
                ms35: {
                  id: "ms35",
                  name: "3.5MS",
                  description: "89mm 7g Sinking/Rattle",
                  image: "/product/示例1.png?height=200&width=200&text=3.5MS+1",
                },
                ms5: {
                  id: "ms5",
                  name: "5MS",
                  description: "127mm 16g Sinking/Rattle",
                  image: "/product/示例1.png?height=200&width=200&text=5MS+1",
                },
                mls2: {
                  id: "mls2",
                  name: "2MLS",
                  description: "50mm 3.7g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=2MLS+1",
                },
                mls3: {
                  id: "mls3",
                  name: "3MLS",
                  description: "70mm 7.4g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=3MLS+1",
                },
                mls4: {
                  id: "mls4",
                  name: "4MLS",
                  description: "100mm 11g Sinking/Rattle",
                  image: "/product/示例1.png?height=200&width=200&text=4MLS+1",
                },
                mls31: {
                  id: "mls31",
                  name: "3MLS-1",
                  description: "3\" 6.5g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=3MLS-1+1",
                },
                mls41: {
                  id: "mls41",
                  name: "4MLS-1",
                  description: "4\" 14g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=4MLS-1+1",
                },
                js75: {
                  id: "js75",
                  name: "JS75",
                  description: "75mm 7.2g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=JS75+1",
                },
                js90: {
                  id: "js90",
                  name: "JS90",
                  description: "90mm 9.5g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=JS90+1",
                },
                js110: {
                  id: "js110",
                  name: "JS110",
                  description: "110mm 18.5g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=JS110+1",
                },
                craw: {
                  id: "craw",
                  name: "CRAW",
                  description: "3\" Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=CRAW+1",
                },
                craw4Weedless: {
                  id: "craw4Weedless",
                  name: "4CRAW(Weedless)",
                  description: "105.5mm 17g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=4CRAW+Weedless+1",
                },
                craw4BackJump: {
                  id: "craw4BackJump",
                  name: "4CRAW(Back Jump)",
                  description: "105.5mm 15.4g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=4CRAW+BackJump+1",
                },
                craw4JigHead: {
                  id: "craw4JigHead",
                  name: "4CRAW(JIG Head)",
                  description: "105.5mm 19g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=4CRAW+JIGHead+1",
                },
                ms45Shiner: {
                  id: "ms45Shiner",
                  name: "4.5MS-Shiner",
                  description: "114mm 11g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=4.5MS-Shiner+1",
                },
                ms35Shad: {
                  id: "ms35Shad",
                  name: "3.5MS-Shad",
                  description: "90mm 10g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=3.5MS-Shad+1",
                },
                ms3Shad: {
                  id: "ms3Shad",
                  name: "3MS-Shad",
                  description: "77mm 8g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=3MS-Shad+1",
                },
                goby60: {
                  id: "goby60",
                  name: "GOBY60",
                  description: "60mm 3.5g Sinking/Rattle",
                  image: "/product/示例1.png?height=200&width=200&text=GOBY60+1",
                },
                goby90: {
                  id: "goby90",
                  name: "GOBY90",
                  description: "90mm 8g Sinking/Rattle",
                  image: "/product/示例1.png?height=200&width=200&text=GOBY90+1",
                },
                goby120: {
                  id: "goby120",
                  name: "GOBY120",
                  description: "120mm 18g Sinking/Rattle",
                  image: "/product/示例1.png?height=200&width=200&text=GOBY120+1",
                },
                goby150: {
                  id: "goby150",
                  name: "GOBY150",
                  description: "150mm 38g Sinking/Rattle",
                  image: "/product/示例1.png?height=200&width=200&text=GOBY150+1",
                },
                fm60: {
                  id: "fm60",
                  name: "FM60",
                  description: "57mm 2.5g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=FM60+1",
                },
                fm80: {
                  id: "fm80",
                  name: "FM80",
                  description: "74.5mm 4.5g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=FM80+1",
                },
                splitTail: {
                  id: "splitTail",
                  name: "SPLIT TAIL",
                  description: "3\" Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=SPLIT+TAIL+1",
                },
                nf70: {
                  id: "nf70",
                  name: "NF70",
                  description: "70mm 3g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=NF70+1",
                },
                nf90: {
                  id: "nf90",
                  name: "NF90",
                  description: "90mm 5g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=NF90+1",
                },
                nf110: {
                  id: "nf110",
                  name: "NF110",
                  description: "110mm 9g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=NF110+1",
                },
                nf130: {
                  id: "nf130",
                  name: "NF130",
                  description: "130mm 13g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=NF130+1",
                },
                worm: {
                  id: "worm",
                  name: "WORM",
                  description: "5\" Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=WORM+1",
                },
                softShad: {
                  id: "softShad",
                  name: "SOFT SHAD",
                  description: "2.5\" Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=SOFT+SHAD+1",
                },
                grub: {
                  id: "grub",
                  name: "GRUB",
                  description: "2.5\" Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=GRUB+1",
                },
                ft110: {
                  id: "ft110",
                  name: "FT110",
                  description: "110mm",
                  image: "/product/示例1.png?height=200&width=200&text=FT110+1",
                },
                ft130: {
                  id: "ft130",
                  name: "FT130",
                  description: "130mm",
                  image: "/product/示例1.png?height=200&width=200&text=FT130+1",
                },
                pt2: {
                  id: "pt2",
                  name: "PT2",
                  description: "50mm",
                  image: "/product/示例1.png?height=200&width=200&text=PT2+1",
                },
                pt3: {
                  id: "pt3",
                  name: "PT3",
                  description: "70mm",
                  image: "/product/示例1.png?height=200&width=200&text=PT3+1",
                },
                hollowFrog: {
                  id: "hollowFrog",
                  name: "Hollow Frog",
                  description: "50mm 11g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=Hollow+Frog+1",
                },
                popHFrog: {
                  id: "popHFrog",
                  name: "POP HFrog",
                  description: "56mm 12.5g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=POP+HFrog+1",
                },
                popHFrog60: {
                  id: "popHFrog60",
                  name: "POP HFrog 60",
                  description: "60mm 16.5g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=POP+HFrog60+1",
                },
                solidFrog: {
                  id: "solidFrog",
                  name: "Solid Frog",
                  description: "70mm 9g TOP WATER",
                  image: "/product/示例1.png?height=200&width=200&text=Solid+Frog+1",
                },
                spinner14oz: {
                  id: "spinner14oz",
                  name: "1/4oz Spinner",
                  description: "1/4oz Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=1%2F4oz+Spinner+1",
                },
                spinner12oz: {
                  id: "spinner12oz",
                  name: "1/2oz Spinner",
                  description: "1/2oz Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=1%2F2oz+Spinner+1",
                },
                garfish15: {
                  id: "garfish15",
                  name: "Garfish 15g",
                  description: "63mm 15g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=Garfish15+1",
                },
                garfish22: {
                  id: "garfish22",
                  name: "Garfish 22g",
                  description: "73mm 22g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=Garfish22+1",
                },
                metalShad15: {
                  id: "metalShad15",
                  name: "Metal Shad 15g",
                  description: "40mm 15g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=MetalShad15+1",
                },
                metalShad22: {
                  id: "metalShad22",
                  name: "Metal Shad 22g",
                  description: "46mm 22g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=MetalShad22+1",
                },
                metalShad30: {
                  id: "metalShad30",
                  name: "Metal Shad 30g",
                  description: "52mm 30g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=MetalShad30+1",
                },
                metalShad40: {
                  id: "metalShad40",
                  name: "Metal Shad 40g",
                  description: "58mm 40g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=MetalShad40+1",
                },
                metalShad150: {
                  id: "metalShad150",
                  name: "Metal Shad 150g",
                  description: "113mm 150g Fast Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=MetalShad150+1",
                },
                adegi60: {
                  id: "adegi60",
                  name: "ADEGI60",
                  description: "60mm 5.4g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=ADEGI60+1",
                },
                adegi80: {
                  id: "adegi80",
                  name: "ADEGI80",
                  description: "80mm 9.5g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=ADEGI80+1",
                },
                adegi96: {
                  id: "adegi96",
                  name: "ADEGI96",
                  description: "96mm 16g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=ADEGI96+1",
                },
                adegi110: {
                  id: "adegi110",
                  name: "ADEGI110",
                  description: "110mm 22.5g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=ADEGI110+1",
                },
                ls75: {
                  id: "ls75",
                  name: "LS75",
                  description: "75mm 12g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=LS75+1",
                },
                ls90: {
                  id: "ls90",
                  name: "LS90",
                  description: "92mm 20g Sinking",
                  image: "/product/示例1.png?height=200&width=200&text=LS90+1",
                },    
          }
          
          const detailedWishlist = ids.map(id => {
            const product = productDetails[id]
            if (product) {
              return {
                id: product.id,
                name: product.name,
                description: product.description,
                image: product.image
              }
            }
            // Fallback for items not found in productDetails
            return {
              id,
              name: id,
              description: "Product details not available",
              image: `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(id)}`
            }
          })
          setWishlistData(detailedWishlist)
        }
      } catch (e) {
        console.error('Error parsing wishlist:', e)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      wishlist: wishlistData,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: t.successMessage })
        // Reset form
        if (e.currentTarget) {
          e.currentTarget.reset()
        }
      } else {
        const errorData = await response.json()
        setMessage({ type: 'error', text: errorData.error || t.errorMessage })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setMessage({ type: 'error', text: t.errorMessage })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          > <svg className="h-4 w-4 text-blue-600 hover:text-blue-800" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 12L6 4v16z"/>
        </svg>
            {t.backToHome}
          </Link>
          
          {/* Language Selector */}
          <div className="flex flex-col items-end">
            <LanguageSelector />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <FadeInOnScroll>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.contactUs}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.contactDescription}
            </p>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <FadeInOnScroll delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{t.contactForm}</CardTitle>
                </CardHeader>
                <CardContent>
                  {message && (
                    <div className={`mb-6 p-4 rounded-md ${
                      message.type === 'success' 
                        ? 'bg-green-50 border border-green-200 text-green-800' 
                        : 'bg-red-50 border border-red-200 text-red-800'
                    }`}>
                      {message.text}
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-9">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          {t.name}
                        </label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder={t.namePlaceholder}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          {t.email}
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder={t.emailPlaceholder}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        {t.subject}
                      </label>
                      <Input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        placeholder={t.subjectPlaceholder}
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        {t.message}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={10}
                        required
                        placeholder={t.messagePlaceholder}
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
                      {isSubmitting ? t.sending : t.sendMessage}
                    </Button>
                  </form>
                  
                  {/* Additional spacing to match wishlist height */}
                  <div className="h-8"></div>
                </CardContent>
              </Card>
            </FadeInOnScroll>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <FadeInOnScroll delay={0.6}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">{t.businessHours}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.mondayFriday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.saturday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.sunday}</span>
                  </div>
                </CardContent>
              </Card>
            </FadeInOnScroll>

            {/* Wishlist Display */}
            {wishlistData.length > 0 && (
              <FadeInOnScroll delay={0.7}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">{t.wishlistItems}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {wishlistData.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                            {item.image && item.image !== '' ? (
                              <Image 
                                src={item.image} 
                                alt={item.name}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                                quality={90}
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs text-gray-500">
                                {item.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Buttons section */}
                    <div className="mt-4 space-y-2">
                      {wishlistData.length > 3 && (
                        <Link href="/wishlist" className="block">
                          <Button variant="outline" size="sm" className="w-full">
                            {t.showMore}
                          </Button>
                        </Link>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (confirm(t.clearWishlistConfirm)) {
                            localStorage.removeItem('contactWishlist')
                            localStorage.removeItem('wishlist')
                            setWishlistData([])
                          }
                        }}
                        className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        {t.clearWishlist}
                      </Button>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-3">
                      {t.wishlistDescription}
                    </p>
                  </CardContent>
                </Card>
              </FadeInOnScroll>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}