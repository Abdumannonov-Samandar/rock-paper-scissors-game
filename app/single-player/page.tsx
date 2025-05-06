'use client'

import { PoperIcon, RockIcon, ScissorsIcon } from '@/components/icons'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { JSX, useState, useEffect } from 'react'
import { AiOutlineSwapLeft } from 'react-icons/ai'

export default function SinglePlayerGame() {
	const [playerScore, setPlayerScore] = useState<number>(0)
	const [computerScore, setComputerScore] = useState<number>(0)
	const [playerChoice, setPlayerChoice] = useState<string | null>(null)
	const [computerChoice, setComputerChoice] = useState<string | null>(null)
	const [result, setResult] = useState<string | null>(null)
	const [gameState, setGameState] = useState<'idle' | 'result'>('idle')

	const choices = ['rock', 'paper', 'scissors']

	// Load scores from localStorage
	useEffect(() => {
		const savedPlayerScore = localStorage.getItem('player_Score')
		const savedComputerScore = localStorage.getItem('computer_Score')

		if (savedPlayerScore) {
			setPlayerScore(Number(savedPlayerScore))
		}

		if (savedComputerScore) {
			setComputerScore(Number(savedComputerScore))
		}
	}, [])

	// Save scores to localStorage when they change
	useEffect(() => {
		localStorage.setItem('player_Score', playerScore.toString())
		localStorage.setItem('computer_Score', computerScore.toString())
	}, [playerScore, computerScore])

	const getComputerChoice = () => {
		const randomIndex = Math.floor(Math.random() * 3)
		return choices[randomIndex]
	}

	const determineWinner = (player: string, computer: string) => {
		if (player === computer) return 'draw'
		if (
			(player === 'rock' && computer === 'scissors') ||
			(player === 'scissors' && computer === 'paper') ||
			(player === 'paper' && computer === 'rock')
		) {
			setPlayerScore(prev => prev + 1)
			return 'player'
		} else {
			setComputerScore(prev => prev + 1)
			return 'computer'
		}
	}

	const handleChoice = (choice: string) => {
		const compChoice = getComputerChoice()
		setPlayerChoice(choice)
		setComputerChoice(compChoice)
		setResult(determineWinner(choice, compChoice))
		setGameState('result')
	}

	const resetGame = () => {
		setPlayerChoice(null)
		setComputerChoice(null)
		setResult(null)
		setGameState('idle')
		setPlayerScore(0)
		setComputerScore(0)
		localStorage.removeItem('player_Score')
		localStorage.removeItem('computer_Score')
	}

	const getHandIcon = (
		choice: string | null,
		isComputer = false,
		isPlayer = false
	) => {
		if (!choice) return null

		const computerClassMap: Record<string, string> = {
			rock: '',
			paper: 'transform scale-x-[-1]',
			scissors: 'transform', 
		}

		const playerClassMap: Record<string, string> = {
			rock: 'transform scale-y-[-1] rotate-180',
			paper: 'transform',
			scissors: 'transform scale-x-[-1]',
		}

		let className = ''
		if (isComputer) {
			className = computerClassMap[choice] || ''
		}

		if (isPlayer) {
			className = playerClassMap[choice] || ''
		}

		const icons: Record<string, JSX.Element> = {
			rock: <RockIcon className={className} />,
			paper: <PoperIcon className={className} />,
			scissors: <ScissorsIcon className={className} />,
		}

		return icons[choice] || null
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900 p-4'>
			<Card className='w-full max-w-3xl p-6 shadow-lg relative bg-gray-100 dark:bg-gray-800'>
				<Link
					href='/'
					className={cn(
						'flex items-center absolute -top-12 left-4 text-navy-800 dark:text-gray-200'
					)}
				>
					<AiOutlineSwapLeft className='h-5 w-5 mr-2' /> Back
				</Link>
				<div className='flex justify-between'>
					<h1 className='text-2xl md:text-4xl font-bold text-navy-800 dark:text-gray-200 mb-5'>
						Rock Paper Scissors with Compose
					</h1>
					<ThemeToggle />
				</div>

				<div className='text-center mb-9'>
					<Button
						variant='link'
						onClick={resetGame}
						className='text-2xl font-bold text-gray-600 dark:text-gray-400 p-0 h-auto'
					>
						RESET THE TOUR
					</Button>
				</div>

				<div className='flex justify-between mb-6 text-sm font-semibold'>
					<span className='text-gray-600 dark:text-gray-400'>
						PLAYER SCORE: {playerScore}
					</span>
					<span className='text-gray-600 dark:text-gray-400'>
						COMPUTER SCORE: {computerScore}
					</span>
				</div>

				<div className='text-center mb-11'>
					<h2
						className={`text-4xl font-bold mb-6 ${
							gameState === 'idle'
								? 'text-gray-700 dark:text-gray-300'
								: result === 'player' || result === 'computer'
								? 'text-red-500 dark:text-blue-400'
								: 'text-gray-700 dark:text-gray-300'
						}`}
					>
						{gameState === 'idle'
							? 'Make your move!'
							: result === 'player'
							? 'YOU WON! 🎉'
							: result === 'computer'
							? 'COMPUTER WON! 🎉'
							: "IT'S A DRAW!"}
					</h2>

					{gameState === 'idle' ? (
						<p className='text-gray-600 dark:text-gray-400'>
							Choose rock, paper, or scissors to start the game.
						</p>
					) : (
						<div className='flex items-center justify-center gap-4'>
							<div className='flex flex-col items-center'>
								{getHandIcon(playerChoice, false, true)}
							</div>

							<span className='text-2xl font-bold text-gray-700 dark:text-gray-300'>
								VS
							</span>

							<div className='flex flex-col items-center'>
								{getHandIcon(computerChoice, true, false)}
							</div>
						</div>
					)}
				</div>

				<div className='mt-6'>
					<p className='text-center font-medium text-sm text-gray-600 dark:text-gray-400 mb-[18px]'>
						Choose your move, rock paper or scissors?
					</p>

					<div className='flex justify-center gap-3 md:gap-12'>
						<Button
							onClick={() => handleChoice('rock')}
							className='bg-red-500 hover:bg-red-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white'
						>
							ROCK
						</Button>

						<Button
							onClick={() => handleChoice('paper')}
							className='bg-red-500 hover:bg-red-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white'
						>
							PAPER
						</Button>

						<Button
							onClick={() => handleChoice('scissors')}
							className='bg-red-500 hover:bg-red-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white'
						>
							SCISSORS
						</Button>
					</div>
				</div>
			</Card>
		</div>
	)
}
