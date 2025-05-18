"use client"

import { ScenarioCard } from "../components/scenario-card"
import { JourneyMap } from "../components/journey-map"
import { useGameStore } from "../store/game-store"
import { Button } from "@/components/ui/button"
import { RotateCcw, MessageSquare } from "lucide-react"

export default function Page() {
  const currentScenario = useGameStore((state) => state.currentScenario)
  const scenarios = useGameStore((state) => state.scenarios)
  const showOutcome = useGameStore((state) => state.showOutcome)
  const selectedChoice = useGameStore((state) => state.selectedChoice)
  const continueToNextScenario = useGameStore((state) => state.continueToNextScenario)
  const resetGame = useGameStore((state) => state.resetGame)
  const history = useGameStore((state) => state.history)
  const scenario = scenarios[currentScenario]
  const isGameEnd = currentScenario === "end"

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 dark:bg-gray-900">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">
          Islamic Finance Game
        </h1>

        <div className="w-full max-w-4xl">
          <ScenarioCard
            scenario={scenario}
            showOutcome={showOutcome}
            selectedChoice={selectedChoice}
            onContinue={continueToNextScenario}
          />

          {history.length > 0 && (
            <>
              <JourneyMap />

              {isGameEnd && (
                <div className="mt-6">
                  <Button
                    onClick={resetGame}
                    variant="outline"
                    className="border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:border-emerald-700 dark:hover:bg-emerald-900"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Start New Game
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Contact footer */}
        <div className="border-t border-gray-200 p-4 text-center text-sm text-gray-600 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 w-full mt-8 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <MessageSquare className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
            <span>
              For suggestions WhatsApp{" "}
              <a
                href="https://cvemrafi.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                Rafique
              </a>{" "}
              at +91 7558845528
            </span>
          </div>
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 496.08 512" className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400">
              <path
                fill="currentColor"
                d="M245.83 214.87l-33.22 17.28c-9.43-19.58-25.24-19.93-27.46-19.93-22.13 0-33.22 14.61-33.22 43.84 0 23.57 9.21 43.84 33.22 43.84 14.47 0 24.65-7.09 30.57-21.26l30.55 15.5c-6.17 11.51-25.69 38.98-65.1 38.98-22.6 0-73.96-10.32-73.96-77.05 0-58.69 43-77.06 72.63-77.06 30.72-.01 52.7 11.95 65.99 35.86zm143.05 0l-32.78 17.28c-9.5-19.77-25.72-19.93-27.9-19.93-22.14 0-33.22 14.61-33.22 43.84 0 23.55 9.23 43.84 33.22 43.84 14.45 0 24.65-7.09 30.54-21.26l31 15.5c-2.1 3.75-21.39 38.98-65.09 38.98-22.69 0-73.96-9.87-73.96-77.05 0-58.67 42.97-77.06 72.63-77.06 30.71-.01 52.58 11.95 65.56 35.86zM247.56 8.05C104.74 8.05 0 123.11 0 256.05c0 138.49 113.6 248 247.56 248 129.93 0 248.44-100.87 248.44-248 0-137.87-106.62-248-248.44-248zm.87 450.81c-112.54 0-203.7-93.04-203.7-202.81 0-105.42 85.43-203.27 203.72-203.27 112.53 0 202.82 89.46 202.82 203.26-.01 121.69-99.68 202.82-202.84 202.82z"
              />
            </svg>
            <span>
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                License 4.0
              </a>{" "}
              • EthikFin 💡 Idea Team
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}
