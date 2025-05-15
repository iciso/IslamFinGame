"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Heart, Scale, MessageSquare, Clock, HandHeart } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ScoreDisplayProps {
  score: number
  ethicalTraits: {
    [key: string]: number
  }
}

export function ScoreDisplay({ score, ethicalTraits }: ScoreDisplayProps) {
  const [showDetails, setShowDetails] = useState(false)

  const traitIcons = {
    generosity: <HandHeart size={16} />,
    justice: <Scale size={16} />,
    honesty: <MessageSquare size={16} />,
    patience: <Clock size={16} />,
    compassion: <Heart size={16} />,
  }

  return (
    <Card className="w-full sm:w-auto">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="font-medium text-emerald-800 dark:text-emerald-200">Score: {score}</div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-200"
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
        </div>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-3 space-y-2"
            >
              {Object.entries(ethicalTraits).map(([trait, value]) => (
                <div key={trait} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 capitalize text-emerald-700 dark:text-emerald-300">
                      {traitIcons[trait as keyof typeof traitIcons]}
                      <span>{trait}</span>
                    </div>
                    <span className="text-emerald-600 dark:text-emerald-400">{value}</span>
                  </div>
                  <Progress value={value * 10} className="h-1.5 bg-emerald-100 dark:bg-emerald-900" />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
