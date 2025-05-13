"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SparklesCore } from "@/components/sparkles"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/auth-context"
import { Loader2, ArrowLeft, Play, Pause, Download, Check, Edit, Save } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useTranslation } from "@/contexts/translation-context"

export default function GeneratorPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { t } = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""

  const [currentStep, setCurrentStep] = useState<"lyrics" | "genre" | "music">("lyrics")
  const [isGenerating, setIsGenerating] = useState(true)
  const [selectedLyrics, setSelectedLyrics] = useState<number | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState<number | null>(null)
  const [editingLyrics, setEditingLyrics] = useState<number | null>(null)
  const [editedContent, setEditedContent] = useState<string>("")
  const [generationError, setGenerationError] = useState<string | null>(null)

  // Mock data for genres and music options
  const genres = [
    { id: "pop", name: "Pop", icon: "🎵" },
    { id: "rock", name: "Rock", icon: "🎸" },
    { id: "folk", name: "Folk", icon: "🪕" },
    { id: "electronic", name: "Electronic", icon: "🎧" },
    { id: "rap", name: "Rap", icon: "🎤" },
    { id: "classical", name: "Clasic", icon: "🎻" },
  ]

  const musicOptions = [
    { id: 1, title: "Varianta 1", duration: "2:45" },
    { id: 2, title: "Varianta 2", duration: "3:12" },
  ]

  // State for lyrics options
  const [lyricsOptions, setLyricsOptions] = useState<Array<{ id: number; title: string; content: string }>>([])

  // Check if user is logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/sign-in")
    }
  }, [user, authLoading, router])

  // Generate lyrics when the component mounts
  useEffect(() => {
    if (query) {
      generateLyrics()
    } else {
      setIsGenerating(false)
    }
  }, [query])

  const generateLyrics = async () => {
    setIsGenerating(true)
    setGenerationError(null)

    try {
      const response = await fetch("/api/generate-lyrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          notes: "",
        }),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()

      // Create two variations of lyrics
      setLyricsOptions([
        {
          id: 1,
          title: "Varianta 1",
          content: data.lyrics,
        },
        {
          id: 2,
          title: "Varianta 2",
          content: data.lyrics.split("\n").reverse().join("\n"), // Just a simple variation for demo
        },
      ])
    } catch (error) {
      console.error("Error generating lyrics:", error)
      setGenerationError("A apărut o eroare la generarea versurilor. Te rugăm să încerci din nou.")

      // Fallback to mock data if API fails
      setLyricsOptions([
        {
          id: 1,
          title: "Varianta 1",
          content: `[Strofa 1]
Istoria României, o poveste de demult,
Daci și romani s-au unit, un popor nou s-a născut.
Ștefan, Mihai și Vlad, eroi ce-au luptat viteaz,
Pentru țara lor iubită, pentru-al libertății glas.

[Refren]
Unirea cea Mare din 1918,
A adus împreună frații despărțiți cândva.
Comunismul a venit, apoi a și căzut,
Democrația-n final, în țară a renăscut.`,
        },
        {
          id: 2,
          title: "Varianta 2",
          content: `[Strofa 1]
De la daci până la UE, o călătorie lungă,
Istoria României, în versuri să o atingă.
Decebal și Traian, două popoare-au unit,
Din sângele lor amestecat, românii s-au ivit.

[Refren]
Evul Mediu cu domnitori, ce țara au apărat,
Ștefan, Mircea și Mihai, granițele au păstrat.
Cuza Vodă a unit, Moldova cu Țara Românească,
Ferdinand a împlinit, România să se-ntregească.`,
        },
      ])
    } finally {
      setIsGenerating(false)
    }
  }

  const handleLyricsSelect = (id: number) => {
    setSelectedLyrics(id)
  }

  const handleGenreSelect = (id: string) => {
    setSelectedGenre(id)
  }

  const handleNextStep = () => {
    if (currentStep === "lyrics" && selectedLyrics !== null) {
      setCurrentStep("genre")
      setIsGenerating(true)

      // Simulate generation delay
      setTimeout(() => {
        setIsGenerating(false)
      }, 1500)
    } else if (currentStep === "genre" && selectedGenre !== null) {
      setCurrentStep("music")
      setIsGenerating(true)

      // Simulate generation delay
      setTimeout(() => {
        setIsGenerating(false)
      }, 2500)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep === "genre") {
      setCurrentStep("lyrics")
    } else if (currentStep === "music") {
      setCurrentStep("genre")
    }
  }

  const handlePlayPause = (id: number) => {
    if (isPlaying === id) {
      setIsPlaying(null)
    } else {
      setIsPlaying(id)
    }
  }

  const handleEditLyrics = (id: number) => {
    const lyrics = lyricsOptions.find((option) => option.id === id)
    if (lyrics) {
      setEditingLyrics(id)
      setEditedContent(lyrics.content)
    }
  }

  const handleSaveLyrics = () => {
    if (editingLyrics === null) return

    setLyricsOptions((prev) =>
      prev.map((option) => (option.id === editingLyrics ? { ...option, content: editedContent } : option)),
    )

    setEditingLyrics(null)
    toast({
      title: "Versuri actualizate",
      description: "Modificările tale au fost salvate cu succes.",
    })
  }

  const handleCancelEdit = () => {
    setEditingLyrics(null)
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
      </div>
    )
  }

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
            <Button variant="ghost" className="mb-6 text-white hover:bg-white/10" onClick={() => router.push("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> {t("back")}
            </Button>

            <Card className="border border-white/10 bg-black/60 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 flex items-center justify-between">
                  <span>Generator EduTune</span>
                  <div className="flex items-center space-x-2 text-sm font-normal bg-white/10 px-3 py-1 rounded-full">
                    <span className={currentStep === "lyrics" ? "text-purple-400" : "text-gray-400"}>
                      {t("lyrics")}
                    </span>
                    <span className="text-gray-500">→</span>
                    <span className={currentStep === "genre" ? "text-purple-400" : "text-gray-400"}>
                      {t("musicGenre")}
                    </span>
                    <span className="text-gray-500">→</span>
                    <span className={currentStep === "music" ? "text-purple-400" : "text-gray-400"}>{t("song")}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentStep === "lyrics" && (
                  <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <p className="text-gray-300">
                        <span className="font-semibold">{t("subject")}:</span> {query}
                      </p>
                    </div>

                    {isGenerating ? (
                      <div className="flex flex-col items-center justify-center py-12">
                        <Loader2 className="h-12 w-12 text-purple-500 animate-spin mb-4" />
                        <p className="text-gray-400">{t("generatingLyrics")}</p>
                      </div>
                    ) : generationError ? (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
                        <p className="text-red-400">{generationError}</p>
                        <Button
                          variant="outline"
                          className="mt-4 border-red-500/30 text-red-400 hover:bg-red-500/10"
                          onClick={generateLyrics}
                        >
                          {t("tryAgain")}
                        </Button>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-xl font-medium text-white">{t("chooseLyrics")}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {lyricsOptions.map((option) => (
                            <div
                              key={option.id}
                              className={`border ${
                                selectedLyrics === option.id
                                  ? "border-purple-500 bg-purple-500/10"
                                  : "border-white/10 hover:border-white/30"
                              } rounded-lg p-4 cursor-pointer transition-colors`}
                              onClick={() => editingLyrics !== option.id && handleLyricsSelect(option.id)}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium text-white">{option.title}</h4>
                                <div className="flex space-x-2">
                                  {selectedLyrics === option.id && editingLyrics !== option.id && (
                                    <Check className="h-5 w-5 text-purple-500" />
                                  )}
                                  {editingLyrics === option.id ? (
                                    <div className="flex space-x-2">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-7 px-2 text-green-500 hover:text-green-400 hover:bg-green-500/10"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleSaveLyrics()
                                        }}
                                      >
                                        <Save className="h-4 w-4 mr-1" />
                                        {t("save")}
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-7 px-2 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleCancelEdit()
                                        }}
                                      >
                                        {t("cancel")}
                                      </Button>
                                    </div>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-white/10"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleEditLyrics(option.id)
                                      }}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>

                              {editingLyrics === option.id ? (
                                <Textarea
                                  value={editedContent}
                                  onChange={(e) => setEditedContent(e.target.value)}
                                  className="min-h-[200px] bg-black/30 border-white/20 text-white font-mono text-sm"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              ) : (
                                <pre className="text-gray-300 whitespace-pre-wrap font-sans text-sm">
                                  {option.content}
                                </pre>
                              )}
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    <div className="flex justify-end">
                      <Button
                        onClick={handleNextStep}
                        disabled={isGenerating || selectedLyrics === null || editingLyrics !== null}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        {t("continue")}
                      </Button>
                    </div>
                  </div>
                )}

                {currentStep === "genre" && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        className="text-white hover:bg-white/10 p-0 h-8 w-8"
                        onClick={handlePreviousStep}
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <h3 className="text-xl font-medium text-white">{t("chooseMusicGenre")}</h3>
                    </div>

                    {isGenerating ? (
                      <div className="flex flex-col items-center justify-center py-12">
                        <Loader2 className="h-12 w-12 text-purple-500 animate-spin mb-4" />
                        <p className="text-gray-400">{t("preparingOptions")}</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {genres.map((genre) => (
                          <div
                            key={genre.id}
                            className={`border ${
                              selectedGenre === genre.id
                                ? "border-purple-500 bg-purple-500/10"
                                : "border-white/10 hover:border-white/30"
                            } rounded-lg p-4 cursor-pointer transition-colors flex flex-col items-center justify-center text-center`}
                            onClick={() => handleGenreSelect(genre.id)}
                          >
                            <div className="text-3xl mb-2">{genre.icon}</div>
                            <h4 className="font-medium text-white">{genre.name}</h4>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button
                        onClick={handleNextStep}
                        disabled={isGenerating || selectedGenre === null}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        {t("generateSong")}
                      </Button>
                    </div>
                  </div>
                )}

                {currentStep === "music" && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        className="text-white hover:bg-white/10 p-0 h-8 w-8"
                        onClick={handlePreviousStep}
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <h3 className="text-xl font-medium text-white">{t("generatedSongs")}</h3>
                    </div>

                    {isGenerating ? (
                      <div className="flex flex-col items-center justify-center py-12">
                        <Loader2 className="h-12 w-12 text-purple-500 animate-spin mb-4" />
                        <p className="text-gray-400">{t("composingSong")}</p>
                        <p className="text-gray-500 text-sm mt-2">{t("composingTime")}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {musicOptions.map((option) => (
                          <div
                            key={option.id}
                            className="border border-white/10 hover:border-white/30 rounded-lg p-4 transition-colors"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium text-white">{option.title}</h4>
                                <p className="text-gray-400 text-sm">
                                  {selectedGenre && genres.find((g) => g.id === selectedGenre)?.name} •{" "}
                                  {option.duration}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="text-white border-white/20 hover:bg-white/10 h-10 w-10"
                                  onClick={() => handlePlayPause(option.id)}
                                >
                                  {isPlaying === option.id ? (
                                    <Pause className="h-5 w-5" />
                                  ) : (
                                    <Play className="h-5 w-5" />
                                  )}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="text-white border-white/20 hover:bg-white/10 h-10 w-10"
                                >
                                  <Download className="h-5 w-5" />
                                </Button>
                              </div>
                            </div>
                            {isPlaying === option.id && (
                              <div className="mt-4">
                                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                  <div className="bg-purple-500 h-full w-1/3 rounded-full"></div>
                                </div>
                                <div className="flex justify-between mt-1">
                                  <span className="text-xs text-gray-400">0:55</span>
                                  <span className="text-xs text-gray-400">{option.duration}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}

                        <div className="bg-white/5 border border-white/10 rounded-lg p-4 mt-6">
                          <h4 className="font-medium text-white mb-2">{t("selectedLyrics")}</h4>
                          <pre className="text-gray-300 whitespace-pre-wrap font-sans text-sm">
                            {selectedLyrics && lyricsOptions.find((l) => l.id === selectedLyrics)?.content}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
