'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'

export default function HomePage() {
	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900 p-4'>
			<Card className='w-full max-w-md p-8 shadow-lg relative rounded-lg overflow-hidden bg-white dark:bg-gray-800'>
				<div className='absolute top-4 right-4'>
					<ThemeToggle />
				</div>

				<div className='flex flex-col gap-6'>
					<h1 className='text-3xl font-extrabold text-center text-navy-800 dark:text-gray-200'>
						Rock Paper Scissors
					</h1>
					<p className='text-center text-lg text-gray-600 dark:text-gray-400'>
						Choose your game mode and start playing!
					</p>

					<div className='flex flex-col gap-4'>
						{/* Single Player Button */}
						<Link href='/single-player' passHref>
							<Button
								size='lg'
								className='w-full h-14 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-105'
							>
								<motion.span
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Single Player
								</motion.span>
							</Button>
						</Link>

						{/* Two Player Button */}
						<Link href='/two-player' passHref>
							<Button
								size='lg'
								className='w-full h-14 bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-300 transform hover:scale-105'
							>
								<motion.span
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Two Player
								</motion.span>
							</Button>
						</Link>
					</div>
				</div>
			</Card>
		</div>
	)
}
