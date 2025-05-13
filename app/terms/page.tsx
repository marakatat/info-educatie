import { SparklesCore } from "@/components/sparkles"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative">
      {/* Ambient background with moving particles */}
      <div className="h-full w-full absolute inset-0 z-0 pointer-events-none">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10">
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Înapoi la pagina principală
            </Link>

            <Card className="border border-white/10 bg-black/60 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  Termeni și Condiții
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <p className="text-gray-300">
                  Bine ați venit la EduTune! Vă rugăm să citiți cu atenție acești termeni și condiții înainte de a
                  utiliza platforma noastră.
                </p>

                <h2 className="text-xl font-semibold text-white mt-6">1. Acceptarea Termenilor</h2>
                <p className="text-gray-300">
                  Prin accesarea sau utilizarea platformei EduTune, sunteți de acord să respectați acești termeni și
                  condiții. Dacă nu sunteți de acord cu oricare dintre acești termeni, vă rugăm să nu utilizați
                  serviciul nostru.
                </p>

                <h2 className="text-xl font-semibold text-white mt-6">2. Descrierea Serviciului</h2>
                <p className="text-gray-300">
                  EduTune este o platformă educațională în versiune beta care utilizează inteligența artificială pentru
                  a transforma materiale educaționale în melodii memorabile. Serviciul este oferit "așa cum este" și
                  "după cum este disponibil".
                </p>

                <h2 className="text-xl font-semibold text-white mt-6">3. Limitarea Responsabilității</h2>
                <p className="text-gray-300">
                  <strong>Nu suntem responsabili pentru nimic.</strong> EduTune este un proiect în versiune beta și
                  poate conține erori sau inexactități. Nu garantăm acuratețea, completitudinea sau utilitatea
                  informațiilor generate de platformă.
                </p>
                <p className="text-gray-300">
                  În niciun caz EduTune nu va fi responsabil pentru daune directe, indirecte, incidentale, speciale,
                  exemplare sau consecvente care rezultă din utilizarea sau incapacitatea de a utiliza serviciul.
                </p>

                <h2 className="text-xl font-semibold text-white mt-6">4. Conținut Generat</h2>
                <p className="text-gray-300">
                  Conținutul generat de EduTune este creat prin intermediul inteligenței artificiale și poate conține
                  inexactități sau erori. Nu ne asumăm responsabilitatea pentru deciziile luate pe baza acestui
                  conținut.
                </p>
                <p className="text-gray-300">
                  Utilizatorii sunt responsabili pentru verificarea informațiilor educaționale generate de platformă
                  înainte de a le folosi în scopuri academice sau educaționale.
                </p>

                <h2 className="text-xl font-semibold text-white mt-6">5. Modificări ale Termenilor</h2>
                <p className="text-gray-300">
                  Ne rezervăm dreptul de a modifica acești termeni în orice moment. Modificările vor intra în vigoare
                  imediat după publicarea termenilor actualizați pe platformă. Utilizarea continuă a serviciului după
                  astfel de modificări constituie acceptarea noilor termeni.
                </p>

                <h2 className="text-xl font-semibold text-white mt-6">6. Contact</h2>
                <p className="text-gray-300">
                  Pentru întrebări sau preocupări legate de acești termeni, vă rugăm să ne contactați la adresa de
                  email: contact@romdev.tech
                </p>

                <p className="text-gray-400 mt-8 text-sm">Ultima actualizare: 12 Mai 2025</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
