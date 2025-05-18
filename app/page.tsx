"use client"

import { ScenarioCard } from "../components/scenario-card"
import { JourneyMap } from "../components/journey-map"
import { useGameStore } from "../store/game-store"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

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
      </main>
    </div>
  )
}
