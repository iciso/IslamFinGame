import { create } from "zustand"
import { persist } from "zustand/middleware"
import { scenarios } from "@/data/scenarios"

export type Choice = {
  id: string
  text: string
  outcome: string
  score: number
  tags: string[]
  nextId: string | null
}

export type Scenario = {
  id: string
  title: string
  description: string
  image?: string
  choices: Choice[]
}

type GameState = {
  currentScenarioId: string
  score: number
  history: {
    scenarioId: string
    choiceId: string
    choiceText: string
    outcome: string
    score: number
  }[]
  ethicalTraits: {
    [key: string]: number
  }
  showOutcome: boolean
  selectedChoice: Choice | null
  // Actions
  selectChoice: (choice: Choice) => void
  continueToNext: () => void
  resetGame: () => void
  getCurrentScenario: () => Scenario | undefined
  getChoicePath: () => string[]
  directNavigate: (scenarioId: string) => void
}

// Helper function to check if a scenario exists
const scenarioExists = (id: string): boolean => {
  return scenarios.some((scenario) => scenario.id === id)
}

// Fallback scenario for when a scenario is not found
const fallbackScenario: Scenario = {
  id: "fallback",
  title: "Scenario Not Found",
  description: "We couldn't find the next part of your journey. Please choose an option to continue.",
  choices: [
    {
      id: "fallback-1",
      text: "Return to the beginning",
      outcome: "You decide to start your journey anew.",
      score: 0,
      tags: [],
      nextId: "family-request",
    },
    {
      id: "fallback-2",
      text: "Skip to the end",
      outcome: "You decide to conclude your journey.",
      score: 0,
      tags: [],
      nextId: "final-reflection",
    },
  ],
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      currentScenarioId: "start",
      score: 0,
      history: [],
      ethicalTraits: {
        generosity: 0,
        justice: 0,
        honesty: 0,
        wisdom: 0,
        compassion: 0,
        conviction: 0,
        balance: 0,
        community: 0,
        leadership: 0,
        boundaries: 0,
        communication: 0,
        compromise: 0,
      },
      showOutcome: false,
      selectedChoice: null,

      selectChoice: (choice) => {
        set((state) => {
          // Update ethical traits based on choice tags
          const updatedTraits = { ...state.ethicalTraits }
          choice.tags.forEach((tag) => {
            if (updatedTraits[tag] !== undefined) {
              updatedTraits[tag] += 1
            }
          })

          return {
            selectedChoice: choice,
            showOutcome: true,
            score: state.score + choice.score,
            ethicalTraits: updatedTraits,
            history: [
              ...state.history,
              {
                scenarioId: state.currentScenarioId,
                choiceId: choice.id,
                choiceText: choice.text,
                outcome: choice.outcome,
                score: choice.score,
              },
            ],
          }
        })
      },

      continueToNext: () => {
        const { selectedChoice, currentScenarioId } = get()
        if (selectedChoice && selectedChoice.nextId) {
          // Check if the next scenario exists
          const nextScenarioId = selectedChoice.nextId
          const nextScenarioExists = scenarioExists(nextScenarioId)

          // Add console log for debugging
          console.log(`Navigating from ${currentScenarioId} to ${nextScenarioId} (exists: ${nextScenarioExists})`)

          // If the next scenario doesn't exist, navigate to a fallback
          const targetScenarioId = nextScenarioExists ? nextScenarioId : "final-reflection"

          set({
            currentScenarioId: targetScenarioId,
            showOutcome: false,
            selectedChoice: null,
          })
        } else {
          console.error("Cannot navigate: No selected choice or nextId")
        }
      },

      directNavigate: (scenarioId) => {
        // Check if the target scenario exists
        const targetExists = scenarioExists(scenarioId)
        const targetScenarioId = targetExists ? scenarioId : "family-request" // Default to family-request if not found

        console.log(`Direct navigation to ${scenarioId} (exists: ${targetExists})`)

        set({
          currentScenarioId: targetScenarioId,
          showOutcome: false,
          selectedChoice: null,
        })
      },

      resetGame: () => {
        set({
          currentScenarioId: "start",
          score: 0,
          history: [],
          ethicalTraits: {
            generosity: 0,
            justice: 0,
            honesty: 0,
            wisdom: 0,
            compassion: 0,
            conviction: 0,
            balance: 0,
            community: 0,
            leadership: 0,
            boundaries: 0,
            communication: 0,
            compromise: 0,
          },
          showOutcome: false,
          selectedChoice: null,
        })
      },

      getCurrentScenario: () => {
        const currentId = get().currentScenarioId
        const scenario = scenarios.find((s) => s.id === currentId)

        if (!scenario) {
          console.error(`Scenario with ID "${currentId}" not found`)

          // Check if we're trying to access "charity-impact" specifically
          if (currentId === "charity-impact") {
            // Redirect to a known scenario
            setTimeout(() => {
              get().directNavigate("anonymous-giving")
            }, 0)
          }

          // Return the fallback scenario
          return fallbackScenario
        }

        return scenario
      },

      getChoicePath: () => {
        return get().history.map((item) => item.choiceText)
      },
    }),
    {
      name: "islamic-quandary-game",
    },
  ),
)
