'use client'

import { useTranslation } from 'react-i18next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('lang', lng)
    window.location.reload()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">🌐 {i18n.language.toUpperCase()}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLang('en')}>🇺🇸 English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLang('uz')}>🇺🇿 O‘zbekcha</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
