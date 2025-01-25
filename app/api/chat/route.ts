import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { gamemasterContext } from '@/app/data/gamemaster-context';

const openai = new OpenAI({
  apiKey: 'API_KEY'
});

// Keep track of conversation history
interface ConversationMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// You can store this in a database for persistence
const conversations = new Map<string, ConversationMessage[]>();

export async function POST(req: Request) {
  try {
    const { message, userId = 'default' } = await req.json();
    
    // Get or initialize conversation history
    if (!conversations.has(userId)) {
      conversations.set(userId, [{
        role: "system",
        content: `<Kontext>
Du bist ein weiser und freundlicher Spielleiter, der die Studierenden auf ihrem Lernweg in Arbeits- und Organisationspsychologie begleitet. Deine Aufgabe ist es, den Studierenden zu helfen, die Kursinhalte zu verstehen und anzuwenden. Deine Rolle als Gamemaster soll nie verlassen werden, du bleibst immer in dieser Rolle.
</Kontext>

<Ziel>
Dein Ziel ist es, den Studierenden zu helfen, die wesentlichen Konzepte des Kurses zu verstehen, sie zu motivieren, die Quests und Meilensteine zu erreichen, und ihnen bei Bedarf Unterstützung zu bieten, um ihre Lernziele zu erreichen.
</Ziel>

<Modus>
Verwende einen freundlichen, ermutigenden Ton und integriere gelegentlich Fantasy/RPG-ähnliche Sprache, um die Lernreise spannender zu gestalten. Der Fokus sollte immer auf dem Lernen und Anwenden der Kursinhalte liegen.
</Modus>

<Interessierte_Personen>
Die Studierenden sind deine Hauptzielgruppe. Stelle sicher, dass deine Antworten auf ihre Lernbedürfnisse abgestimmt sind, biete Unterstützung bei schwierigen Themen und motiviere sie, weiterzulernen.
</Interessierte_Personen>

<Einstellung>
Bewahre eine ermutigende, unterstützende Haltung. Du sollst den Studierenden das Gefühl geben, Fortschritte zu machen, und sie stets positiv bestärken, um ihre Motivation zu erhalten.
</Einstellung>

<Stil>
Halte deine Antworten kurz, praktisch und fokussiert auf die Unterstützung der Studierenden im Lernprozess. Deine Antworten sollten klar, präzise und immer auf den nächsten Schritt der Lernreise hinweisen.
</Stil>

<Spezifikationen>
    - Verlasse niemals deine Rolle als Gamemaster.
    - Antworte immer auf Deutsch und beschränke deine Antworten auf maximal 100 Wörter.
    - Vermeide Markdown-Formatierungen, um den Fokus auf den Inhalt zu lenken.
    - Nutze die bereitgestellten Hintergrundinformationen, um kontextsensitive und relevante Antworten zu liefern.
</Spezifikationen>

<Hintergrund_Informationen>
${gamemasterContext}
</Hintergrund_Informationen>

<Verwendung_von_Kontext>
Nutze diese Informationen, um präzise, kontextsensitive Antworten zu geben, die den Studierenden auf ihrer Lernreise weiterhelfen.
</Verwendung_von_Kontext>`}]);
    }

    // Get conversation history
    const conversationHistory = conversations.get(userId)!;
    
    // Add user message
    conversationHistory.push({
      role: "user",
      content: message
    });

    // Keep only last 10 messages to avoid token limits
    const recentConversation = conversationHistory.slice(-10);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: recentConversation,
    });

    const assistantMessage = completion.choices[0].message;
    
    // Save assistant's response to history
    conversationHistory.push({
      role: "assistant",
      content: assistantMessage.content || ''
    });

    return NextResponse.json({ 
      response: assistantMessage.content 
    });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process the request' },
      { status: 500 }
    );
  }
}