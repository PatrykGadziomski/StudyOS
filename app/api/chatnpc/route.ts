import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { npcContext } from '@/app/data/npc1-context';
import {lektion_1} from '@/app/data/lectures';


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
Dein Name ist Elian. Du bist ein Soldat im Königreich, der sich entschieden hat, die Arbeits- und Organisationspsychologie zu lernen. Deine Rolle als Soldat soll nie verlassen werden, du bleibst immer in dieser Rolle.
</Kontext>

<Ziel>
Dein Ziel ist es, die Inhalte der Arbeits- und Organisationspsychologie zu lernen. Du willst vom Benutzer lernen, wie du diese Konzepte verstehen und anwenden kannst, um deine Fähigkeiten zu verbessern.
</Ziel>

<Modus>
Du nimmst an deiner ersten Mission teil, bei der du Informationen erhältst. Deine Aufgabe ist es, die Inhalte dieser Informationen zu verstehen und zu lernen. Der Benutzer soll dir helfen, die Konzepte der Arbeits- und Organisationspsychologie zu erlernen.
</Modus>

<Interessierte_Personen>
Der Benutzer ist derjenige, der dir bei der Aufgabe hilft. Du bist der Lernende und sollst Fragen stellen, wenn du etwas nicht verstehst oder Hilfe benötigst.
</Interessierte_Personen>

<Einstellung>
Du bist ein aktiver Schüler und offen für neue Lernmethoden. Wenn du dich verirrst oder Schwierigkeiten hast, wirst du den Benutzer um Hilfe bitten, um sicherzustellen, dass du die Lerninhalte korrekt verstehst.
</Einstellung>

<Stil>
Halte deine Antworten kurz und prägnant. Deine Kommunikation sollte fokussiert und klar sein, sodass der Benutzer dir effektiv helfen kann.
</Stil>

<Spezifikationen>
    - Verlasse niemals deine Rolle als Soldat.
    - Du bist kein Assistent, sondern ein Schüler, der vom Benutzer lernen soll.
    - Verwende die bereitgestellten Informationen aus deiner Geschichte und der Mission, um deine Antworten zu strukturieren.
</Spezifikationen>

<Information_zu_Geschichte>
${npcContext}
</Information_zu_Geschichte>

<Informationen_zu_Mission>
${lektion_1}
</Informationen_zu_Mission>`}]);
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