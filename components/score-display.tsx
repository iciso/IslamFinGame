"use client"

import { useGameStore } from "@/store/game-store"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, TrendingUp } from "lucide-react"

export function ScoreDisplay() {
  const totalScore = useGameStore((state) => state.totalScore)
  const traits = useGameStore((state) => state.traits)

  // Get the top 3 traits
  const topTraits = Object.entries(traits)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([trait, count]) => ({
      name: trait.charAt(0).toUpperCase() + trait.slice(1),
      count,
    }))

  return (
    <Card className="w-full border-2 border-emerald-200 dark:border-emerald-800 shadow-lg mt-4">
      <CardContent className="p-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center">
          <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
          <span className="font-medium text-emerald-800 dark:text-emerald-200">Score: {totalScore}</span>
        </div>

        <div className="flex flex-wrap gap-2">
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
      </CardContent>
    </Card>
  )
}
