'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils' // clsx alias agar ishlatilsa

export function ThemeToggle() {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	const isDark = theme === 'dark'

	return (
		<button
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
			aria-label='Toggle theme'
			className={cn(
				'transition-all duration-200 ease-in-out',
				'rounded-full p-2 w-12 h-12 flex items-center justify-center',
				'hover:bg-muted/30 dark:hover:bg-muted/40'
			)}
		>
			{isDark ? (
				<Sun className='w-12 h-12 text-yellow-400' />
			) : (
				<Moon className='w-12 h-12 text-blue-600' />
			)}
		</button>
	)
}
