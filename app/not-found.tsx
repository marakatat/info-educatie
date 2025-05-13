import Link from "next/link"
import { Bot } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <Bot className="w-16 h-16 text-purple-500" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          404 - Pagină negăsită
        </h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Ne pare rău, dar pagina pe care o cauți nu există sau a fost mutată.
        </p>
        <Link
          href="/"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Înapoi la pagina principală
        </Link>
      </div>
    </div>
  )
}
