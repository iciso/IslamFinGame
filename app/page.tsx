import { GameScreen } from "@/components/game-screen"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <GameScreen />
      </div>
    </main>
  )
}
