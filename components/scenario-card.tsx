"use client"

import type React from "react"

import { type Scenario, type Choice, useGameStore } from "@/store/game-store"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle,
  HelpCircle,
  HandCoins,
  School,
  Users,
  Heart,
  Building,
  BookOpen,
  PiggyBank,
  Handshake,
  UserCheck,
  GraduationCap,
  Home,
  Gift,
  Landmark,
  Scale,
  Briefcase,
  Share2,
  UsersRound,
  Award,
  HeartHandshake,
  Lightbulb,
  Coins,
  FileText,
  Banknote,
  Building2,
  Brain,
  Sparkles,
} from "lucide-react"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ScenarioCardProps {
  scenario: Scenario
  showOutcome: boolean
  selectedChoice: Choice | null
  onContinue: () => void
}

export function ScenarioCard({ scenario, showOutcome, selectedChoice, onContinue }: ScenarioCardProps) {
  const { selectChoice, directNavigate } = useGameStore()
  const [openTermDialog, setOpenTermDialog] = useState<string | null>(null)

  // Special handling for the start scenario
  const isStartScenario = scenario.id === "start"

  // Map scenario IDs to icons and background colors
  const getScenarioVisuals = () => {
    const visuals: Record<string, { icon: React.ReactNode; bgClass: string; title: string }> = {
      start: {
        icon: <Sparkles size={48} />,
        bgClass: "bg-gradient-to-br from-emerald-400 to-teal-600",
        title: "Islamic Financial Ethics Journey",
      },
      "family-request": {
        icon: <HandCoins size={48} />,
        bgClass: "bg-gradient-to-br from-emerald-500 to-green-700",
        title: "Family Financial Request",
      },
      "loan-terms": {
        icon: <FileText size={48} />,
        bgClass: "bg-gradient-to-br from-teal-500 to-emerald-700",
        title: "Setting Loan Terms",
      },
      "after-refusal": {
        icon: <Users size={48} />,
        bgClass: "bg-gradient-to-br from-amber-500 to-orange-700",
        title: "After Refusing Help",
      },
      "after-charity": {
        icon: <Heart size={48} />,
        bgClass: "bg-gradient-to-br from-rose-400 to-pink-600",
        title: "Impact of Your Charity",
      },
      "after-direct-payment": {
        icon: <School size={48} />,
        bgClass: "bg-gradient-to-br from-blue-400 to-indigo-600",
        title: "School Recognition",
      },
      "inner-struggle": {
        icon: <Brain size={48} />,
        bgClass: "bg-gradient-to-br from-purple-400 to-violet-600",
        title: "Inner Ethical Struggle",
      },
      "worldly-distraction": {
        icon: <Coins size={48} />,
        bgClass: "bg-gradient-to-br from-amber-400 to-yellow-600",
        title: "Worldly Success vs. Spiritual Growth",
      },
      "wealth-test": {
        icon: <Scale size={48} />,
        bgClass: "bg-gradient-to-br from-orange-400 to-red-600",
        title: "The Test of Wealth",
      },
      "spiritual-awakening": {
        icon: <Lightbulb size={48} />,
        bgClass: "bg-gradient-to-br from-cyan-400 to-blue-600",
        title: "Spiritual Renewal",
      },
      "delayed-charity": {
        icon: <PiggyBank size={48} />,
        bgClass: "bg-gradient-to-br from-lime-400 to-green-600",
        title: "The Delayed Charity",
      },
      reconciliation: {
        icon: <HeartHandshake size={48} />,
        bgClass: "bg-gradient-to-br from-pink-400 to-rose-600",
        title: "Family Reconciliation",
      },
      "loan-repayment": {
        icon: <Banknote size={48} />,
        bgClass: "bg-gradient-to-br from-green-400 to-emerald-600",
        title: "Loan Repayment Situation",
      },
      "community-resources": {
        icon: <Building size={48} />,
        bgClass: "bg-gradient-to-br from-indigo-400 to-purple-600",
        title: "Developing Community Resources",
      },
      "waqf-establishment": {
        icon: <Landmark size={48} />,
        bgClass: "bg-gradient-to-br from-blue-400 to-sky-600",
        title: "Establishing an Educational Waqf",
      },
      "takaful-system": {
        icon: <UsersRound size={48} />,
        bgClass: "bg-gradient-to-br from-teal-400 to-cyan-600",
        title: "Family Takaful System",
      },
      "islamic-business-partnership": {
        icon: <Handshake size={48} />,
        bgClass: "bg-gradient-to-br from-amber-400 to-orange-600",
        title: "Islamic Business Partnership",
      },
      "business-outcomes": {
        icon: <Briefcase size={48} />,
        bgClass: "bg-gradient-to-br from-emerald-400 to-green-600",
        title: "Business Growth and Decisions",
      },
      "islamic-finance-education": {
        icon: <BookOpen size={48} />,
        bgClass: "bg-gradient-to-br from-sky-400 to-blue-600",
        title: "Deepening Financial Knowledge",
      },
      "knowledge-application": {
        icon: <Share2 size={48} />,
        bgClass: "bg-gradient-to-br from-violet-400 to-purple-600",
        title: "Applying Financial Knowledge",
      },
      "family-relations": {
        icon: <Home size={48} />,
        bgClass: "bg-gradient-to-br from-rose-400 to-pink-600",
        title: "Family Financial Dynamics",
      },
      "anonymous-giving": {
        icon: <Gift size={48} />,
        bgClass: "bg-gradient-to-br from-emerald-400 to-teal-600",
        title: "The Power of Anonymous Charity",
      },
      "charity-impact": {
        icon: <Sparkles size={48} />,
        bgClass: "bg-gradient-to-br from-amber-400 to-orange-600",
        title: "The Ripple Effect of Charity",
      },
      "education-outcomes": {
        icon: <GraduationCap size={48} />,
        bgClass: "bg-gradient-to-br from-blue-400 to-indigo-600",
        title: "Educational Impact",
      },
      mentorship: {
        icon: <UserCheck size={48} />,
        bgClass: "bg-gradient-to-br from-purple-400 to-violet-600",
        title: "The Mentorship Journey",
      },
      "community-impact": {
        icon: <Building2 size={48} />,
        bgClass: "bg-gradient-to-br from-teal-400 to-emerald-600",
        title: "Transforming Community Financial Practices",
      },
      "final-reflection": {
        icon: <Brain size={48} />,
        bgClass: "bg-gradient-to-br from-cyan-400 to-blue-600",
        title: "Journey Reflection",
      },
      end: {
        icon: <Award size={48} />,
        bgClass: "bg-gradient-to-br from-emerald-400 to-green-600",
        title: "Journey Completion",
      },
    }

    // Default visuals if scenario ID is not found
    const defaultVisuals = {
      icon: <BookOpen size={48} />,
      bgClass: "bg-gradient-to-br from-gray-400 to-gray-600",
      title: scenario.title,
    }

    return visuals[scenario.id] || defaultVisuals
  }

  // Islamic financial terms glossary
  const islamicTerms: Record<string, { definition: string; source?: string }> = {
    Riba: {
      definition:
        "Interest or usury, which is strictly prohibited in Islam. It refers to any excess compensation without due consideration, and includes both interest on loans and exchanges of unequal quantities of the same commodity.",
      source: "Quran 2:275-280, 3:130, 4:161, 30:39",
    },
    "Riba al-Fadl": {
      definition:
        "A type of Riba that occurs in trade transactions when there is an unequal exchange of the same commodity, or when a condition for excess is included in a loan contract.",
      source:
        "Hadith: 'Gold for gold, silver for silver, wheat for wheat, barley for barley, dates for dates, and salt for salt - like for like, equal for equal, and hand-to-hand; if the commodities differ, then you may sell as you wish, provided that the exchange is hand-to-hand.' (Muslim)",
    },
    "Qard Hasan": {
      definition:
        "A benevolent or interest-free loan given primarily for welfare purposes. The borrower is only required to repay the principal amount, and any additional payment must be voluntary and not stipulated in the contract.",
      source: "Quran 2:245, 5:12, 57:11, 57:18, 64:17, 73:20",
    },
    Sadaqah: {
      definition:
        "Voluntary charity given to the poor and needy. Unlike Zakat, there is no fixed percentage, and it can be given at any time.",
      source: "Quran 2:261-262, 2:271, 2:274",
    },
    "Sadaqah Jariyah": {
      definition:
        "Continuous charity; a form of charity that continues to benefit people and generate rewards for the giver even after their death, such as building a well, establishing a school, or sharing beneficial knowledge.",
      source:
        "Hadith: 'When a person dies, their deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for them.' (Muslim)",
    },
    Zakat: {
      definition:
        "Obligatory charity that is one of the five pillars of Islam. It is a fixed percentage (typically 2.5%) of one's wealth that must be given to specific categories of recipients after one year of ownership.",
      source: "Quran 2:43, 2:110, 9:60",
    },
    Waqf: {
      definition:
        "An Islamic endowment of property to be held in trust and used for a charitable or religious purpose. The property is placed under an irrevocable trust, and the income generated is spent on the designated purpose in perpetuity.",
      source:
        "Based on the hadith where Umar ibn al-Khattab acquired land and the Prophet advised him to 'hold the property and devote its fruits to pious purposes.' (Bukhari and Muslim)",
    },
    Takaful: {
      definition:
        "Islamic insurance based on the principle of mutual cooperation (Ta'awun) where participants contribute to a pool of funds that is used to support members who suffer losses. It avoids the prohibited elements of conventional insurance such as Gharar (uncertainty), Maysir (gambling), and Riba (interest).",
      source:
        "Based on the Quranic principle: 'Help one another in righteousness and piety, but do not help one another in sin and transgression.' (5:2)",
    },
    Mudarabah: {
      definition:
        "A partnership where one party provides the capital (Rab al-Mal) and the other provides management expertise (Mudarib). Profits are shared according to a pre-agreed ratio, while financial losses are borne by the capital provider only.",
      source: "Based on the practice of the Prophet's companions and the consensus of scholars",
    },
    Musharakah: {
      definition:
        "A partnership where all partners contribute capital and have the right to participate in management. Profits are distributed according to a pre-agreed ratio, while losses are borne in proportion to capital contribution.",
      source: "Based on the practice of the Prophet's companions and the consensus of scholars",
    },
    Murabaha: {
      definition:
        "A cost-plus financing arrangement where the financier purchases an asset and sells it to the client at a marked-up price, with payment typically made in installments. The mark-up is disclosed and agreed upon by both parties.",
      source:
        "Based on the general permissibility of trade in the Quran: 'Allah has permitted trade and forbidden interest.' (2:275)",
    },
    Ijarah: {
      definition:
        "An Islamic leasing arrangement where the lessor (owner) transfers the usufruct (right to use) of an asset to the lessee for a specified period in exchange for a specified rental payment.",
      source: "Based on the general permissibility of leasing in Islamic jurisprudence",
    },
    Gharar: {
      definition:
        "Excessive uncertainty or ambiguity in contracts, which is prohibited in Islamic finance. Contracts must have clear terms regarding the subject matter, price, and delivery to be valid.",
      source: "Hadith: 'The Prophet forbade sales involving Gharar (uncertainty).' (Muslim)",
    },
    Maysir: {
      definition:
        "Gambling or any game of chance where one party gains at the expense of others based on uncertain events. This is prohibited in Islamic finance.",
      source: "Quran 2:219, 5:90-91",
    },
    Kitabah: {
      definition:
        "The documentation of contracts, particularly debt contracts, which is strongly encouraged in Islamic finance to prevent disputes and ensure clarity of terms.",
      source: "Quran 2:282, which is the longest verse in the Quran and deals with the documentation of debts",
    },
    "Baitul Mal": {
      definition:
        "The treasury of the Islamic state or community, responsible for collecting and distributing funds for public welfare, including Zakat and other revenues.",
      source: "Based on the practice established during the time of the Prophet Muhammad and the early caliphs",
    },
    "Ibra'": {
      definition:
        "The act of voluntarily waiving a right or releasing someone from an obligation or debt, which is encouraged in Islam as an act of generosity.",
      source:
        "Quran 2:280: 'And if the debtor is in difficulty, then grant him time until it is easy for him to repay. But if you remit it by way of charity, that is better for you, if you only knew.'",
    },
    Samaha: {
      definition:
        "Leniency, tolerance, and ease in financial dealings, which is highly encouraged in Islam, particularly in debt collection and business transactions.",
      source:
        "Hadith: 'May Allah have mercy on the one who is lenient when he buys, when he sells, and when he asks for repayment.' (Bukhari)",
    },
    "Ta'awun": {
      definition:
        "Mutual cooperation and assistance, which is a fundamental principle in Islamic social and economic relations, including financial arrangements like Takaful.",
      source:
        "Quran 5:2: 'Help one another in righteousness and piety, but do not help one another in sin and transgression.'",
    },
    Tabarru: {
      definition:
        "A donation or contribution made voluntarily without expecting any return, which is the basis for the Takaful system where participants donate to help others who suffer losses.",
      source: "Based on the general encouragement of charity and mutual assistance in Islam",
    },
    Fuqara: {
      definition:
        "The needy; one of the eight categories of people eligible to receive Zakat. They have some means of livelihood but not enough to meet their basic needs.",
      source: "Quran 9:60, which lists the categories of Zakat recipients",
    },
    Masakeen: {
      definition:
        "The poor; one of the eight categories of people eligible to receive Zakat. They have little or no means of livelihood and are in greater need than the Fuqara.",
      source: "Quran 9:60, which lists the categories of Zakat recipients",
    },
  }

  // Function to handle direct navigation for the start scenario
  const handleStartScenarioChoice = () => {
    if (isStartScenario && scenario.choices.length > 0) {
      // Skip the interim page and navigate directly to the first scenario
      directNavigate("family-request")
    }
  }

  // Function to render text with Islamic terms highlighted and explained
  const renderText = (text: string) => {
    // First, clean any malformed HTML tags or pre-formatted HTML
    let processedText = text
      // Fix specific malformed tags patterns
      .replace(/<-term="([^"]+)">([^<]+)span>/g, "($1)")
      .replace(/<term="([^"]+)">([^<]+)span>/g, "$2")
      // Remove any HTML-like content
      .replace(/<[^>]*>/g, "")

    // Check for Islamic terms in the cleaned text
    Object.keys(islamicTerms).forEach((term) => {
      // Create a regex that matches the term as a whole word, case-insensitive
      const regex = new RegExp(`\\b${term}\\b`, "gi")

      if (regex.test(processedText)) {
        processedText = processedText.replace(regex, (match) => {
          return `<span class="text-emerald-600 dark:text-emerald-400 font-medium underline cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors break-words" data-term="${term}">${match}</span>`
        })
      }
    })

    return (
      <span
        dangerouslySetInnerHTML={{ __html: processedText }}
        onClick={(e) => {
          // Check if the clicked element has a data-term attribute
          const target = e.target as HTMLElement
          const term = target.getAttribute("data-term")
          if (term) {
            setOpenTermDialog(term)
          }
        }}
      />
    )
  }

  if (!scenario) {
    return (
      <Card className="w-full overflow-hidden border-2 border-red-200 dark:border-red-800 shadow-lg">
        <CardHeader className="bg-red-50 dark:bg-red-900">
          <CardTitle className="text-2xl text-red-800 dark:text-red-200">Error Loading Scenario</CardTitle>
          <CardDescription className="text-red-700 dark:text-red-300 text-base">
            The scenario data could not be loaded. Please try restarting the game.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white dark:bg-gray-900">
          <Button onClick={() => window.location.reload()} className="w-full bg-red-600 hover:bg-red-700 text-white">
            Reload Game
          </Button>
        </CardContent>
      </Card>
    )
  }

  const scenarioVisuals = getScenarioVisuals()

  return (
    <>
      <Card className="w-full overflow-hidden border-2 border-emerald-200 dark:border-emerald-800 shadow-lg">
        {/* Image section replaced with colored background and icon */}
        <div
          className={`relative w-full h-64 overflow-hidden ${scenarioVisuals.bgClass} flex items-center justify-center`}
        >
          <div className="text-white">
            {scenarioVisuals.icon}
            <h2 className="mt-4 text-xl font-bold">{scenarioVisuals.title}</h2>
          </div>
        </div>

        <CardHeader className="bg-emerald-50 dark:bg-emerald-900">
          <CardTitle className="text-2xl text-emerald-800 dark:text-emerald-200">{scenario.title}</CardTitle>
          <CardDescription className="text-emerald-700 dark:text-emerald-300 text-base">
            {renderText(scenario.description)}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white dark:bg-gray-900">
          <AnimatePresence mode="wait">
            {showOutcome && selectedChoice ? (
              <motion.div
                key="outcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900 border border-emerald-200 dark:border-emerald-800"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle size={20} />
                  </div>
                  <div className="break-words">
                    <h3 className="font-medium text-emerald-800 dark:text-emerald-200 mb-1 break-words">
                      {selectedChoice.text}
                    </h3>
                    <p className="text-emerald-700 dark:text-emerald-300 break-words">
                      {renderText(selectedChoice.outcome)}
                    </p>
                    <div className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">
                      {selectedChoice.score > 0 ? (
                        <span>+{selectedChoice.score} points</span>
                      ) : selectedChoice.score < 0 ? (
                        <span>{selectedChoice.score} points</span>
                      ) : (
                        <span>No points</span>
                      )}
                      {selectedChoice.tags.length > 0 && (
                        <span className="ml-2 block sm:inline mt-1 sm:mt-0">
                          (Traits:{" "}
                          {selectedChoice.tags.map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1)).join(", ")})
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="choices"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-3"
              >
                {isStartScenario ? (
                  // Special handling for start scenario - direct navigation
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      variant="outline"
                      className="w-full justify-start p-4 h-auto text-left border-2 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:border-emerald-700 dark:hover:bg-emerald-900"
                      onClick={handleStartScenarioChoice}
                    >
                      <span>{renderText(scenario.choices[0].text)}</span>
                    </Button>
                  </motion.div>
                ) : (
                  // Normal handling for other scenarios
                  scenario.choices.map((choice) => (
                    <motion.div key={choice.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Button
                        variant="outline"
                        className="w-full justify-start p-4 h-auto text-left border-2 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:border-emerald-700 dark:hover:bg-emerald-900 break-words whitespace-normal"
                        onClick={() => selectChoice(choice)}
                      >
                        <span className="break-words whitespace-normal">{renderText(choice.text)}</span>
                      </Button>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        {showOutcome && (
          <CardFooter className="bg-white dark:bg-gray-900 p-6 pt-0">
            <Button onClick={onContinue} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              Continue
            </Button>
          </CardFooter>
        )}
      </Card>

      <Dialog open={!!openTermDialog} onOpenChange={(open) => !open && setOpenTermDialog(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <span>{openTermDialog}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full p-0">
                      <HelpCircle className="h-4 w-4" />
                      <span className="sr-only">Islamic Term Information</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="max-w-xs">Islamic financial and ethical term</div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DialogTitle>
            <DialogDescription>
              {openTermDialog && (
                <div className="mt-2 space-y-2">
                  <div>{islamicTerms[openTermDialog]?.definition}</div>
                  {islamicTerms[openTermDialog]?.source && (
                    <div className="text-sm text-emerald-600 dark:text-emerald-400 italic">
                      Source: {islamicTerms[openTermDialog]?.source}
                    </div>
                  )}
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
