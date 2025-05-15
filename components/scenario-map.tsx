"use client"

import { useEffect, useRef } from "react"
import { scenarios } from "@/data/scenarios"
import { Card } from "@/components/ui/card"

interface ScenarioMapProps {
  history: {
    scenarioId: string
    choiceId: string
    choiceText: string
    outcome: string
    score: number
  }[]
  visitedScenarios: string[]
}

export function ScenarioMap({ history, visitedScenarios }: ScenarioMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 750
    canvas.height = 600

    // Clear canvas
    ctx.fillStyle = "#f8fafc" // Light background
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Create a map of scenario positions with better horizontal spacing
    const scenarioPositions: Record<string, { x: number; y: number }> = {
      start: { x: 300, y: 50 },
      "family-request": { x: 300, y: 100 },
      "loan-terms": { x: 150, y: 200 },
      "after-refusal": { x: 300, y: 200 },
      "after-charity": { x: 450, y: 200 },
      "after-direct-payment": { x: 600, y: 200 },
      "loan-repayment": { x: 75, y: 300 },
      "family-relations": { x: 225, y: 300 },
      "financial-education": { x: 375, y: 300 },
      "anonymous-giving": { x: 525, y: 300 },
      "education-outcomes": { x: 675, y: 300 },
      "community-resources": { x: 300, y: 400 },
      "repayment-challenges": { x: 75, y: 400 },
      "medical-assistance": { x: 150, y: 500 },
      "islamic-finance-workshop": { x: 225, y: 400 },
      reconciliation: { x: 375, y: 400 },
      "community-impact": { x: 450, y: 400 },
      "financial-progress": { x: 525, y: 400 },
      "charity-impact": { x: 600, y: 400 },
      mentorship: { x: 675, y: 400 },
      "final-reflection": { x: 300, y: 500 },
      end: { x: 300, y: 550 },
    }

    // Draw connections between scenarios
    ctx.strokeStyle = "#cbd5e1" // Light gray for connections
    ctx.lineWidth = 1

    // Draw all possible connections
    scenarios.forEach((scenario) => {
      const fromPos = scenarioPositions[scenario.id]
      if (!fromPos) return

      scenario.choices.forEach((choice) => {
        if (!choice.nextId) return
        const toPos = scenarioPositions[choice.nextId]
        if (!toPos) return

        ctx.beginPath()
        ctx.moveTo(fromPos.x, fromPos.y)
        ctx.lineTo(toPos.x, toPos.y)
        ctx.stroke()
      })
    })

    // Draw the path taken by the player
    if (history.length > 0) {
      ctx.strokeStyle = "#10b981" // Emerald for the player's path
      ctx.lineWidth = 3

      for (let i = 0; i < history.length - 1; i++) {
        const fromScenarioId = history[i].scenarioId
        const toScenarioId = history[i + 1].scenarioId
        const fromPos = scenarioPositions[fromScenarioId]
        const toPos = scenarioPositions[toScenarioId]

        if (fromPos && toPos) {
          ctx.beginPath()
          ctx.moveTo(fromPos.x, fromPos.y)
          ctx.lineTo(toPos.x, toPos.y)
          ctx.stroke()
        }
      }
    }

    // Function to format node labels by breaking hyphenated words
    const formatNodeLabel = (id: string): string[] => {
      // Replace hyphens with line breaks
      if (id.includes("-")) {
        // Split the string at hyphens and join with newlines
        return id.split("-").map((part, index, array) => {
          // Capitalize the first letter of each part
          return part.charAt(0).toUpperCase() + part.slice(1)
        })
      }

      // If no hyphens, just capitalize the first letter
      return [id.charAt(0).toUpperCase() + id.slice(1)]
    }

    // Draw scenario nodes
    Object.entries(scenarioPositions).forEach(([id, pos]) => {
      const isVisited = visitedScenarios.includes(id)
      const isCurrentScenario = history.length > 0 && history[history.length - 1].scenarioId === id

      // Draw node
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2)

      if (isCurrentScenario) {
        ctx.fillStyle = "#f59e0b" // Amber for current scenario
      } else if (isVisited) {
        ctx.fillStyle = "#10b981" // Emerald for visited scenarios
      } else {
        ctx.fillStyle = "#e2e8f0" // Light gray for unvisited scenarios
      }

      ctx.fill()

      ctx.strokeStyle = "#0f172a"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw label with line breaks for hyphenated words
      ctx.fillStyle = "#1e293b"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"

      const labelLines = formatNodeLabel(id)
      const lineHeight = 12 // Height between lines

      labelLines.forEach((line, index) => {
        ctx.fillText(line, pos.x, pos.y + 25 + index * lineHeight)
      })
    })
  }, [history, visitedScenarios])

  return (
    <Card className="p-4 overflow-auto">
      <div className="text-sm text-center mb-2 text-gray-500">Scenario Map (Your path is highlighted in green)</div>
      <div className="overflow-x-scroll overflow-y-hidden">
        <canvas
          ref={canvasRef}
          className="min-w-full h-auto border border-gray-200 dark:border-gray-800 rounded"
          style={{ minWidth: "800px" }}
        />
      </div>
      <div className="text-xs text-center mt-2 text-gray-500">
        Green nodes: visited scenarios | Amber node: current scenario | Gray nodes: unvisited scenarios
      </div>
    </Card>
  )
}
