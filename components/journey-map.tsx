"use client"

import { useGameStore } from "@/store/game-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Award, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function JourneyMap() {
  const history = useGameStore((state) => state.history)
  const scenarios = useGameStore((state) => state.scenarios)
  const totalScore = useGameStore((state) => state.totalScore)
  const traits = useGameStore((state) => state.traits)
  const directNavigate = useGameStore((state) => state.directNavigate)
  const [expanded, setExpanded] = useState(false)

  // Get the top 3 traits
  const topTraits = Object.entries(traits)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([trait, count]) => ({
      name: trait.charAt(0).toUpperCase() + trait.slice(1),
      count,
    }))

  // Get the journey path
  const journeyPath = history.map((item) => ({
    scenarioId: item.scenarioId,
    title: scenarios[item.scenarioId]?.title || "Unknown",
    score: item.score,
  }))

  return (
    <Card className="w-full border-2 border-emerald-200 dark:border-emerald-800 shadow-lg mt-6">
      <CardHeader className="bg-emerald-50 dark:bg-emerald-900 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl text-emerald-800 dark:text-emerald-200">Your Journey</CardTitle>
            <CardDescription className="text-emerald-700 dark:text-emerald-300">
              Track your path and decisions
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200"
            >
              Score: {totalScore}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="text-emerald-600 dark:text-emerald-400"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Collapse" : "Expand"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 bg-white dark:bg-gray-900">
        <div className="flex flex-col gap-4">
          {/* Top traits */}
          {topTraits.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {topTraits.map((trait) => (
                <Badge
                  key={trait.name}
                  variant="secondary"
                  className="bg-emerald-100 dark:bg-emerald-800/50 text-emerald-800 dark:text-emerald-200"
                >
                  <Award className="h-3 w-3 mr-1" />
                  {trait.name}: {trait.count}
                </Badge>
              ))}
            </div>
          )}

          {/* Journey path visualization */}
          <div className="relative">
            {journeyPath.length > 0 ? (
              <div className="relative">
                {/* Path line */}
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-emerald-200 dark:bg-emerald-800" />

                {/* Journey points */}
                <div className="space-y-4">
                  {(expanded ? journeyPath : journeyPath.slice(-3)).map((point, index) => (
                    <motion.div
                      key={`${point.scenarioId}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="relative">
                        <div className="h-6 w-6 rounded-full bg-emerald-500 dark:bg-emerald-600 flex items-center justify-center text-white">
                          <MapPin className="h-3 w-3" />
                        </div>
                        {point.score !== 0 && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className={`absolute -right-1 -top-1 h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                    point.score > 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                  }`}
                                >
                                  {point.score > 0 ? "+" : ""}
                                  {point.score}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  Score impact: {point.score > 0 ? "+" : ""}
                                  {point.score}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <div className="flex-1">
                        <Button
                          variant="link"
                          className="p-0 h-auto text-emerald-700 dark:text-emerald-300 font-medium text-left"
                          onClick={() => directNavigate(point.scenarioId)}
                        >
                          {point.title}
                        </Button>
                      </div>
                    </motion.div>
                  ))}

                  {!expanded && journeyPath.length > 3 && (
                    <div className="flex items-center gap-3 pl-3 text-sm text-emerald-600 dark:text-emerald-400">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-emerald-600 dark:text-emerald-400"
                        onClick={() => setExpanded(true)}
                      >
                        Show all {journeyPath.length} steps <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-emerald-600 dark:text-emerald-400">
                Your journey will appear here as you make decisions
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
