import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { query, notes } = await request.json()

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    const prompt = `Crează versuri pentru o melodie inspirate de retorica reclamelor, care să fie catchy, ușor de reținut care sa ajute pe cei care asculta sa invete ${query}. Versurile trebuie să fie concise, folosind un limbaj simplu și repetitiv, asemănător unui slogan publicitar. Nu scrie note sau alte sugesti inafara de versuri. Poti in schimb sa mentionezi [Refren] pentru strofa care este refrenul. Un model pentru versuri: " \n\n[Strofa 1] \nvers 1 \nvers 2 \n..." \n[Refren] \nvers 1 \nvers 2 \n...". Utilizatorul a mentionat: ${notes || "Nu a fost specificat nimic suplimentar."}.`

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("OpenRouter API error:", errorData)
      return NextResponse.json(
        { error: `API request failed with status ${response.status}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    const lyrics = data.choices[0].message.content

    return NextResponse.json({ lyrics })
  } catch (error) {
    console.error("Error generating lyrics:", error)
    return NextResponse.json({ error: "Failed to generate lyrics" }, { status: 500 })
  }
}
