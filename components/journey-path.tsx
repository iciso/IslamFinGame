"use client"

import { motion } from "framer-motion"
import { ChevronRight, CornerDownRight, CornerUpRight } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface JourneyPathProps {
  history: {
    scenarioId: string
    choiceId: string
    choiceText: string
    outcome: string
    score: number
  }[]
  detailed?: boolean
}

export function JourneyPath({ history, detailed = false }: JourneyPathProps) {
  const [expanded, setExpanded] = useState(false)

  if (history.length === 0) return null

  // Find any repeated scenarios (circular paths)
  const scenarioOccurrences = history.reduce<Record<string, number>>((acc, item) => {
    acc[item.scenarioId] = (acc[item.scenarioId] || 0) + 1
    return acc
  }, {})

  // For detailed view, we'll show all history items
  // For compact view, we'll show only the last 5 items unless expanded
  const displayHistory = expanded || detailed ? history : history.slice(-5)

  return (
    <div className="space-y-4">
      <div
        className={`bg-emerald-50 dark:bg-emerald-900/50 rounded-lg p-3 overflow-x-auto ${detailed ? "max-h-96" : ""}`}
      >
        <div className={`flex ${detailed ? "flex-col space-y-3" : "items-center space-x-2"} min-w-max`}>
          {displayHistory.map((item, index) => {
            // Check if this is a repeated scenario
            const isRepeatedScenario =
              scenarioOccurrences[item.scenarioId] > 1 &&
              history.findIndex((h) => h.scenarioId === item.scenarioId) < index

            // Check if this is a circular path (returning to an earlier scenario)
            const isCircularPath = index > 0 && history.slice(0, index).some((h) => h.scenarioId === item.scenarioId)

            return (
              <motion.div
                key={`${item.choiceId}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${detailed ? "flex-col space-y-2" : "items-center"}`}
              >
                <div className="flex items-center">
                  {isCircularPath ? (
                    <CornerUpRight className="mx-1 text-amber-500 dark:text-amber-400" size={16} />
                  ) : isRepeatedScenario ? (
                    <CornerDownRight className="mx-1 text-amber-500 dark:text-amber-400" size={16} />
                  ) : index > 0 ? (
                    <ChevronRight className="mx-1 text-emerald-500 dark:text-emerald-400" size={16} />
                  ) : null}

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`px-3 py-1 rounded-md text-sm whitespace-nowrap ${
                            isRepeatedScenario || isCircularPath
                              ? "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/50 dark:text-amber-200 dark:border-amber-800"
                              : "bg-white text-emerald-700 border border-emerald-200 dark:bg-emerald-800 dark:text-emerald-200 dark:border-emerald-700"
                          }`}
                        >
                          {item.choiceText}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-medium">{item.scenarioId}</p>
                        <p className="text-xs mt-1">{item.outcome}</p>
                        <p className="text-xs mt-1">Score: {item.score > 0 ? `+${item.score}` : item.score}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {detailed && (
                  <div className="pl-6 text-sm text-emerald-700 dark:text-emerald-300">
                    <p className="italic">{item.outcome}</p>
                    <div className="flex items-center mt-1 space-x-2">
                      <Badge variant={item.score > 0 ? "default" : "destructive"}>
                        {item.score > 0 ? `+${item.score}` : item.score} points
                      </Badge>
                      <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-900">
                        {item.scenarioId}
                      </Badge>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {!detailed && history.length > 5 && !expanded && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(true)}
          className="text-xs text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-200"
        >
          Show full journey ({history.length} choices)
        </Button>
      )}

      {!detailed && expanded && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(false)}
          className="text-xs text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-200"
        >
          Show recent choices only
        </Button>
      )}
    </div>
  )
}
