'use client'

import { useState, useEffect, JSX } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'
import { PoperIcon, RockIcon, ScissorsIcon } from '@/components/icons'
import Link from 'next/link'
import { AiOutlineSwapLeft } from 'react-icons/ai'
import { cn } from '@/lib/utils'


export default function TwoPlayerGame() {
	const [playerOneScore, setPlayerOneScore] = useState<number>(0)
	const [playerTwoScore, setPlayerTwoScore] = useState<number>(0)
	const [playerOneChoice, setPlayerOneChoice] = useState<string | null>(null)
	const [playerTwoChoice, setPlayerTwoChoice] = useState<string | null>(null)
	const [result, setResult] = useState<string | null>(null)
	const [gameState, setGameState] = useState<
		'idle' | 'player1Turn' | 'player2Turn' | 'result'
	>('idle')
	const [dialogOpen, setDialogOpen] = useState<boolean>(true)
	const [playerOneName, setPlayerOneName] = useState<string>('Player 1')
	const [playerTwoName, setPlayerTwoName] = useState<string>('Player 2')
	const [currentPlayer, setCurrentPlayer] = useState<'playerOne' | 'playerTwo'>(
		'playerOne'
	)

	const handleDialogSubmit = (playerOneName: string, playerTwoName: string) => {
		setPlayerOneName(playerOneName || 'Player 1')
		setPlayerTwoName(playerTwoName || 'Player 2')
		setDialogOpen(false)
		setGameState('player1Turn')
	}

	const determineWinner = (playerOne: string, playerTwo: string) => {
		if (playerOne === playerTwo) return 'draw'
		if (
			(playerOne === 'rock' && playerTwo === 'scissors') ||
			(playerOne === 'scissors' && playerTwo === 'paper') ||
			(playerOne === 'paper' && playerTwo === 'rock')
		) {
			setPlayerOneScore(prev => prev + 1)
			return 'playerOne'
		} else {
			setPlayerTwoScore(prev => prev + 1)
			return 'playerTwo'
		}
	}

	const handleChoice = (player: 'playerOne' | 'playerTwo', choice: string) => {
		if (player === 'playerOne' && gameState === 'player1Turn') {
			setPlayerOneChoice(choice)
			setGameState('player2Turn')
			setCurrentPlayer('playerTwo')
		} else if (player === 'playerTwo' && gameState === 'player2Turn') {
			setPlayerTwoChoice(choice)
			setCurrentPlayer('playerOne')
		}
	}

	const playNextRound = () => {
		setPlayerOneChoice(null)
		setPlayerTwoChoice(null)
		setResult(null)
		setGameState('player1Turn')
	}

	useEffect(() => {
		if (playerOneChoice && playerTwoChoice) {
			setResult(determineWinner(playerOneChoice, playerTwoChoice))
			setGameState('result')
		}
	}, [playerOneChoice, playerTwoChoice])

	const resetGame = () => {
		setPlayerOneChoice(null)
		setPlayerTwoChoice(null)
		setResult(null)
		setGameState('player1Turn')
		setPlayerOneScore(0)
		setPlayerTwoScore(0)
		setCurrentPlayer('playerOne')
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
						Rock Paper Scissors - Two Player
					</h1>
					<ThemeToggle />
				</div>

				<div className='text-center mb-6'>
					<Button
						variant='link'
						onClick={resetGame}
						className='text-2xl font-bold text-gray-600 dark:text-gray-400 p-0 h-auto'
					>
						RESET GAME
					</Button>
				</div>

				<div className='text-center mb-6'>
					<h2 className='text-4xl font-bold mb-6 text-gray-700 dark:text-gray-300'>
						{gameState === 'player1Turn'
							? `${playerOneName}'s Turn`
							: gameState === 'player2Turn'
							? `${playerTwoName}'s Turn`
							: gameState === 'result'
							? result === 'playerOne'
								? `${playerOneName} Wins!`
								: result === 'playerTwo'
								? `${playerTwoName} Wins!`
								: "It's a Draw!"
							: 'Make your move!'}
					</h2>

					{gameState === 'result' && (
						<div className='flex flex-col items-center justify-center gap-4'>
							<div className='flex items-center justify-center gap-8'>
								<div className='flex flex-col items-center'>
									<span className='text-lg font-medium mb-2'>
										{playerOneName}
									</span>
									{getHandIcon(playerOneChoice, false, true)}
								</div>
								<span className='text-2xl font-bold text-gray-700 dark:text-gray-300'>
									VS
								</span>
								<div className='flex flex-col items-center'>
									<span className='text-lg font-medium mb-2'>
										{playerTwoName}
									</span>
									{getHandIcon(playerTwoChoice, true, false)}
								</div>
							</div>

							<Button
								onClick={playNextRound}
								className='mt-4 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white'
							>
								Next Round
							</Button>
						</div>
					)}
				</div>

				<div className='flex justify-between mb-6 text-sm font-semibold'>
					<span className='text-gray-600 dark:text-gray-400'>
						{playerOneName}: {playerOneScore}
					</span>
					<span className='text-gray-600 dark:text-gray-400'>
						{playerTwoName}: {playerTwoScore}
					</span>
				</div>

				{(gameState === 'player1Turn' || gameState === 'player2Turn') && (
					<div className='mt-6'>
						<p className='text-center font-medium text-sm text-gray-600 dark:text-gray-400 mb-4'>
							{gameState === 'player1Turn'
								? `${playerOneName}, choose your move`
								: `${playerTwoName}, choose your move`}
						</p>

						<div className='flex justify-center gap-3 md:gap-12'>
							<Button
								onClick={() => handleChoice(currentPlayer, 'rock')}
								className='bg-red-500 hover:bg-red-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white'
							>
								ROCK
							</Button>
							<Button
								onClick={() => handleChoice(currentPlayer, 'paper')}
								className='bg-red-500 hover:bg-red-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white'
							>
								PAPER
							</Button>
							<Button
								onClick={() => handleChoice(currentPlayer, 'scissors')}
								className='bg-red-500 hover:bg-red-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white'
							>
								SCISSORS
							</Button>
						</div>
					</div>
				)}
			</Card>

			{dialogOpen && (
				<div className='absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
					<div className='bg-white dark:bg-gray-800 p-8 rounded shadow-lg'>
						<h2 className='text-2xl font-bold mb-4 dark:text-white'>
							Enter Player Names
						</h2>
						<input
							type='text'
							value={playerOneName}
							onChange={e => setPlayerOneName(e.target.value)}
							placeholder='Player 1 Name'
							className='mb-4 p-2 border rounded w-full dark:bg-gray-700 dark:text-white dark:border-gray-600'
						/>
						<input
							type='text'
							value={playerTwoName}
							onChange={e => setPlayerTwoName(e.target.value)}
							placeholder='Player 2 Name'
							className='mb-4 p-2 border rounded w-full dark:bg-gray-700 dark:text-white dark:border-gray-600'
						/>
						<div className='flex justify-center gap-4'>
							<Button
								onClick={() => handleDialogSubmit(playerOneName, playerTwoName)}
								className='bg-blue-500 hover:bg-blue-600 text-white'
							>
								Start Game
							</Button>
							<Button
								onClick={() => {
									setDialogOpen(false)
									setGameState('player1Turn')
								}}
								className='bg-gray-500 hover:bg-gray-600 text-white'
							>
								Cancel
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
