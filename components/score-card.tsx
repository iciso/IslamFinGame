"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGameStore } from "@/store/game-store"
import { motion } from "framer-motion"
import { scenarios } from "@/data/scenarios"

export function ScoreCard() {
  const { history, ethicalTraits, score } = useGameStore()

  // Get the dominant traits (top 3)
  const dominantTraits = Object.entries(ethicalTraits)
    .filter(([_, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  // Calculate trait percentages for the character analysis
  const totalTraitPoints = Object.values(ethicalTraits).reduce((sum, value) => sum + value, 0)
  const traitPercentages = Object.fromEntries(
    Object.entries(ethicalTraits).map(([trait, value]) => [
      trait,
      totalTraitPoints > 0 ? Math.round((value / totalTraitPoints) * 100) : 0,
    ]),
  )

  // Generate character analysis based on dominant traits
  const generateCharacterAnalysis = () => {
    if (dominantTraits.length === 0) return "You haven't developed any significant traits during your journey."

    const traitDescriptions: Record<string, string> = {
      generosity:
        "Your generosity (Sakha') reflects the Islamic value of giving freely without expectation of return. The Prophet Muhammad (peace be upon him) was known for his exceptional generosity.",
      justice:
        "Your commitment to justice (Adl) embodies the Quranic principle that justice is closest to piety. Islam emphasizes being just even against one's own interests.",
      honesty:
        "Your honesty (Sidq) is a cornerstone of Islamic character. The Prophet Muhammad was known as 'Al-Sadiq' (the truthful) even before prophethood.",
      wisdom:
        "Your wisdom (Hikmah) reflects the Islamic value of applying knowledge appropriately. The Quran states that whoever is given wisdom has been given much good.",
      compassion:
        "Your compassion (Rahmah) mirrors Allah's attributes of being Most Compassionate and Most Merciful (Ar-Rahman, Ar-Raheem).",
      conviction:
        "Your conviction (Yaqeen) demonstrates strong faith and certainty in Islamic principles, a quality highly praised in Islamic teachings.",
      balance:
        "Your balanced approach (Wasatiyyah) embodies the Quranic description of Muslims as a community of moderation and balance.",
      community:
        "Your community focus (Ummah) reflects the Islamic emphasis on collective welfare and brotherhood/sisterhood.",
      leadership:
        "Your leadership (Qiyadah) qualities align with the Islamic concept of responsible stewardship and guidance.",
      boundaries:
        "Your respect for boundaries (Hudud) shows understanding of Islamic limits that protect individual and community rights.",
      communication:
        "Your effective communication (Tabligh) reflects the prophetic tradition of clear, honest, and purposeful exchange.",
      compromise:
        "Your willingness to compromise (Sulh) in appropriate situations reflects the Islamic value of reconciliation and peace-making.",
    }

    let analysis = "Your journey has shaped your character in alignment with Islamic values. "

    // Add descriptions for the top 3 traits
    dominantTraits.forEach(([trait, value], index) => {
      if (traitDescriptions[trait]) {
        analysis += traitDescriptions[trait] + " "
      }
    })

    // Add a general conclusion
    analysis +=
      "Continue developing these qualities in your daily life, as character development (Tazkiyah) is a lifelong journey in Islam."

    return analysis
  }

  // Format scenario ID for better readability
  const formatScenarioName = (id: string): string => {
    return id
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  // Helper function to find a scenario by ID
  const findScenarioById = (id: string) => {
    return scenarios.find((scenario) => scenario.id === id)
  }

  // Helper function to find a choice by ID within a scenario
  const findChoiceById = (scenarioId: string, choiceId: string) => {
    const scenario = findScenarioById(scenarioId)
    return scenario?.choices.find((choice) => choice.id === choiceId)
  }

  // Get unique traits from a choice
  const getUniqueTraits = (tags: string[]): string[] => {
    return [...new Set(tags)]
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="text-center bg-emerald-50 dark:bg-emerald-900 rounded-t-lg">
        <CardTitle className="text-2xl text-emerald-800 dark:text-emerald-200">Your Journey Summary</CardTitle>
        <CardDescription className="text-emerald-600 dark:text-emerald-300">
          Final Score: {score} points
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-emerald-100 dark:bg-emerald-800">
                <th className="p-2 text-left text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700">
                  Scenario
                </th>
                <th className="p-2 text-left text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700">
                  Traits
                </th>
                <th className="p-2 text-center text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700">
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => {
                // Skip the start scenario which has no meaningful choice
                if (item.scenarioId === "start") return null

                // Get the choice from scenarios data to access tags
                const choice = findChoiceById(item.scenarioId, item.choiceId)
                const traits = choice?.tags || []

                return (
                  <motion.tr
                    key={`${item.scenarioId}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-emerald-50 dark:bg-emerald-900/30"}
                  >
                    <td className="p-2 border border-emerald-200 dark:border-emerald-700 text-sm">
                      {formatScenarioName(item.scenarioId)}
                    </td>
                    <td className="p-2 border border-emerald-200 dark:border-emerald-700">
                      <div className="flex flex-wrap gap-1">
                        {getUniqueTraits(traits).map((trait) => (
                          <Badge key={trait} variant="outline" className="text-xs capitalize">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-2 border border-emerald-200 dark:border-emerald-700 text-center">
                      {item.score > 0 ? `+${item.score}` : item.score}
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-medium text-emerald-800 dark:text-emerald-200">Character Analysis</h3>
          <p className="text-gray-700 dark:text-gray-300">{generateCharacterAnalysis()}</p>

          <div className="mt-4">
            <h4 className="text-md font-medium text-emerald-700 dark:text-emerald-300 mb-2">Your Dominant Traits</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {dominantTraits.map(([trait, value], index) => (
                <Card key={trait} className="overflow-hidden">
                  <div
                    className="h-2 bg-emerald-500"
                    style={{ width: `${traitPercentages[trait]}%`, transition: "width 1s ease-in-out" }}
                  ></div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium capitalize">{trait}</span>
                      <span className="text-sm text-emerald-600 dark:text-emerald-400">{value} points</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
            <p className="text-sm text-emerald-700 dark:text-emerald-300 italic">
              "The best among you are those who have the best character." - Prophet Muhammad (peace be upon him)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
