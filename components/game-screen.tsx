"use client"

import { CardContent } from "@/components/ui/card"

import { useGameStore } from "@/store/game-store"
import { ScenarioCard } from "@/components/scenario-card"
import { ScoreDisplay } from "@/components/score-display"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { JourneyPath } from "@/components/journey-path"
import { useEffect, useState } from "react"
import { ScenarioMap } from "@/components/scenario-map"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScoreCard } from "@/components/score-card"

export function GameScreen() {
  const {
    getCurrentScenario,
    score,
    ethicalTraits,
    showOutcome,
    selectedChoice,
    continueToNext,
    resetGame,
    history,
    directNavigate,
  } = useGameStore()
  const [visitedScenarios, setVisitedScenarios] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState<string>("game")

  const currentScenario = getCurrentScenario()

  // Add this near the top of the component, after getting the currentScenario
  console.log("Current scenario ID:", currentScenario?.id)

  // Track visited scenarios
  useEffect(() => {
    if (currentScenario) {
      setVisitedScenarios((prev) => new Set([...prev, currentScenario.id]))
    }
  }, [currentScenario])

  // Handle case where scenario is not found
  if (!currentScenario) {
    console.error("Scenario not found. Current ID:", useGameStore.getState().currentScenarioId)
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Scenario Not Found</CardTitle>
          <CardDescription>
            There was an error loading the scenario. The current scenario ID is:{" "}
            {useGameStore.getState().currentScenarioId}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col gap-4">
          <div>Try starting a new game or returning to the first scenario.</div>
          <div className="flex gap-4">
            <Button onClick={resetGame}>Restart Game</Button>
            <Button onClick={() => directNavigate("family-request")} variant="outline">
              Go to First Scenario
            </Button>
          </div>
        </CardFooter>
      </Card>
    )
  }

  // Special handling for start scenario
  const isStartScenario = currentScenario.id === "start"

  // Special handling for end scenario
  const isEndScenario = currentScenario.id === "end"

  // Check if the current scenario is one we've visited before (circular path)
  const isRevisitedScenario =
    history.length > 0 && history.some((item) => item.scenarioId === currentScenario.id) && currentScenario.id !== "end"

  // Count how many times we've visited this scenario
  const visitCount = history.filter((item) => item.scenarioId === currentScenario.id).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-300">Islamic Ethical Quandary</h1>
        <ScoreDisplay score={score} ethicalTraits={ethicalTraits} />
      </div>

      {isStartScenario && (
        <div className="bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800 rounded-lg p-4 mb-4">
          <div className="text-emerald-800 dark:text-emerald-200">
            Welcome to the Islamic Ethical Quandary Game! Click "Begin the journey" to start.
          </div>
        </div>
      )}

      {isEndScenario ? (
        // End scenario layout with ScoreCard at the top
        <>
          <div className="mb-8">
            <ScoreCard />
          </div>

          <ScenarioCard
            scenario={currentScenario}
            showOutcome={showOutcome}
            selectedChoice={selectedChoice}
            onContinue={continueToNext}
          />

          <div className="mt-8 text-center space-y-4">
            <Button
              variant="outline"
              size="lg"
              onClick={resetGame}
              className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border-emerald-300 dark:bg-emerald-900 dark:hover:bg-emerald-800 dark:text-emerald-100 dark:border-emerald-700"
            >
              Start New Game
            </Button>
          </div>
        </>
      ) : (
        // Normal game flow for non-end scenarios
        <>
          {history.length > 0 && currentScenario.id !== "start" && (
            <Tabs defaultValue="game" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="game">Game</TabsTrigger>
                <TabsTrigger value="journey">Your Journey</TabsTrigger>
              </TabsList>
              <TabsContent value="game" className="space-y-4">
                {isRevisitedScenario && (
                  <div className="bg-amber-50 border border-amber-200 dark:bg-amber-900/30 dark:border-amber-800 rounded-lg p-4 text-amber-800 dark:text-amber-200">
                    <div>
                      <span className="font-medium">Note:</span> You've returned to a scenario you've encountered before
                      {visitCount > 1 ? ` (${visitCount} times)` : ""}. Your previous choices have led you back to this
                      point, but you can now make different decisions.
                    </div>
                  </div>
                )}

                <ScenarioCard
                  scenario={currentScenario}
                  showOutcome={showOutcome}
                  selectedChoice={selectedChoice}
                  onContinue={continueToNext}
                />
              </TabsContent>
              <TabsContent value="journey">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Your Journey Path</CardTitle>
                    <CardDescription>
                      This shows the path you've taken through the scenarios and the choices you've made.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 overflow-hidden">
                    <JourneyPath history={history} detailed />
                    <div className="mt-6 overflow-hidden">
                      <ScenarioMap history={history} visitedScenarios={Array.from(visitedScenarios)} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => setActiveTab("game")} className="w-full">
                      Return to Game
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {(!history.length || currentScenario.id === "start") && (
            <ScenarioCard
              scenario={currentScenario}
              showOutcome={showOutcome}
              selectedChoice={selectedChoice}
              onContinue={continueToNext}
            />
          )}
        </>
      )}
    </div>
  )
}
