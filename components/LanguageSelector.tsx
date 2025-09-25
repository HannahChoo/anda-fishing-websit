"use client"

import { Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/LanguageContext"

const languageLabels = {
  en: "EN",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  es: "ES",
  tr: "TR",
  ru: "RU",
  pt: "PT",
}

const languageNames = {
  en: "English",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  es: "Español",
  tr: "Türkçe",
  ru: "Русский",
  pt: "Português Brasileiro"
}

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent h-8 px-2 text-sm [&_svg]:size-3">
          <Globe className="h-4 w-4" />
          {languageLabels[language]}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setLanguage("en")}>{languageNames.en}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("zh")}>{languageNames.zh}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("ja")}>{languageNames.ja}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("ko")}>{languageNames.ko}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("es")}>{languageNames.es}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("tr")}>{languageNames.tr}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("ru")}>{languageNames.ru}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("pt")}>{languageNames.pt}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
