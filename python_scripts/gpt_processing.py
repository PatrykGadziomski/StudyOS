from openai import OpenAI
import os
from pathlib import Path


def generate_quests(text, API_KEY, system_prompt, file_path, story):
    if not os.path.exists(file_path):
        client = OpenAI(api_key=API_KEY)

        chat_completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": f"{system_prompt}"},
                {"role": "user", "content": f"""Du bekommst das erste Kapitel von einem Universitätsskript. 
Bitte erstelle 3 Quests, welche ich in die Lernplattform einfügen könnte. 

<Universitätsskript>
{text}
</Universitätsskript>

Die Quests sollten sich nahtlos in die Geschichte einfügen und die erzählerische Dynamik unterstützen. Achte darauf, dass die Story und die Quests eine kohärente Einheit bilden.

<Geschichte>
{story}
</Geschichte>

<Anweisungen zur Quest-Erstellung> 
- Nutze die Inhalte aus dem Skript präzise und kreativ, um sicherzustellen, dass die Quests inhaltlich relevant sind. 
- Die Quests sollten spielerisch und motivierend formuliert sein, um die Lernenden zu begeistern. 
- Die Quests können unterschiedliche Formate haben (z. B. Wissensfragen, Herausforderungen oder praktische Aufgaben)
- Jede Quest sollte folgende Struktur haben: 
    - Titel der Quest
    - Beschreibung: Eine kurze, spannende Erklärung, worum es geht. 
    - Ziel: Was sollen die Lernenden erreichen? 
    - Art der Quest (Tägliche Quest, Wöchentliche Quest oder Spontane Quest). Beispiele: 
        - Tägliche Quest: Kurze, regelmäßig durchzuführende Aufgaben (z. B. eine Wissensfrage zum Skript)        
        - Wöchentliche Quest: Größere Herausforderungen mit praktischem Bezug (z. B. ein Konzept aus dem, Skript anwenden).
        - Spontane Quest: Eine überraschende Aufgabe, die Kreativität oder schnelle Entscheidungen erfordert. 
</Anweisungen zur Quest-Erstellung>

Benutze keine Markdown Formatierung"""}
            ]
        )

        print('> quests generated successfully!')

        with open(file_path, mode='w', encoding='utf-8') as f:
            f.write(chat_completion.choices[0].message.content)
            print('>> quests saved successfully!')

        return chat_completion.choices[0].message.content

    else:
        print(f"> File already exists: {file_path}")


def extract_quest_titles(quests, API_KEY, system_prompt, file_path):
    if os.path.exists(file_path):
        with open(file_path, mode='r') as f:
            quests = f.read()

        client = OpenAI(api_key=API_KEY)

        chat_completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": f"{system_prompt}"},
                {"role": "user", "content": f"""Du bekommst Quests, welche du selbst erstellt hast. 
Jede Quest hat einen Titel, ein Ziel und ein Typ.
Der Titel ist der Name der Quest, und das Ziel beschreibt, was die Lernenden in dieser Quest erreichen sollen und der Typ gibt Informationen über die Art der Quest.
Bitte extrahiere für jede Quest den Titel, das Ziel und den Typ, unabhängig von der Anzahl der Quests.
                 
<Quests>
{quests}
<Quests>

Gib mir die Titel, Ziele und Typs bitte als .ts Konstanten zurück mit einem Export befehlt davor.
Platziere alle Exports untereinander. Füge nach jeder Zeile ein Semikolon hinzu (";").

<Formatbeispiel>
export const quest1 = 'Titel1';
export const ziel1 = 'Ziel1';
export const typ1 = 'Typ1';
export const quest2 = 'Titel2';
export const ziel2 = 'Ziel2';
export const typ2 = 'Typ2';
</Formatbeispiel>

Die Ausgabe darf keine zusätzlichen Kommentare oder Text enthalten, nur die exportierten Konstanten, wie im Beispiel angegeben.
Benutze keine Markdown Formatierung um es als Codefeld kenntlich zu machen."""}
            ]
        )

        print('> quest title extracted successfully!')

        return chat_completion.choices[0].message.content

    else:
        print(f'> {file_path} not found!')


def generate_story(text, API_KEY, system_prompt, file_path):
    if not os.path.exists(file_path):
        client = OpenAI(api_key=API_KEY)

        chat_completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": f"{system_prompt}"},
                {"role": "user", "content": f"""Du bekommst das erste Kapitel von einem Universitätsskript. 
Bitte erstelle dazu eine passende Geschichte. Die Geschichte soll auf Dungeons and Dragons basieren.

In der Mitte der Geschichte soll Elian stehen, welcher die Möglichkeit bekommt als Berater des Königs zu arbeiten.
Elian sollte in der Geschichte eine aktive Entwicklung durchmachen, wobei seine Entscheidungen und Herausforderungen in engem Zusammenhang mit den Inhalten des Skripts stehen.

Die Geschichte sollte die Lernenden aktiv in den Lernprozess einbeziehen und dabei helfen, die im Skript behandelten Themen und Konzepte zu vertiefen.
Die Geschichte soll Inhalte aus dem Universitätsskript beinhalten.
Die Inhalte aus dem Universitätsskript können direkt (z. B. Begriffe oder Fakten) oder indirekt (z. B. als Metaphern oder Inspiration) in die Geschichte eingebunden werden.

<Struktur der Geschichte>
Die Geschichte sollte folgende Struktur haben: 
- Einleitung: Einführung in die Welt und die Ausgangssituation. 
- Hauptteil: Fokus auf Elian und die Ereignisse, die zu seiner Möglichkeit führen, Berater des Königs zu werden. 
- Schluss: Ein spannender oder motivierender Abschluss, der die Lernenden neugierig macht.
</Struktur der Geschichte>
                
<Universitätsskript>
{text}
<Universitätsskript>

Benutze keine Markdown Formatierung"""}
            ]
        )

        print('> story generated successfully!')

        with open(file_path, mode='w', encoding='utf-8') as f:
            f.write(chat_completion.choices[0].message.content)
            print('>> story saved successfully!')

        return chat_completion.choices[0].message.content

    else:
        with open(file_path, mode='r') as f:
            data = f.read()

        print(f"> File already exists: {file_path}")
        
        return data


def generate_milestones_number(text, story, API_KEY, system_prompt, file_path):
    data_folder = Path(__file__).resolve().parent.parent / 'app' / 'data'
    file_path = data_folder / f'{file_path}.ts'

    if not os.path.exists(file_path):
        client = OpenAI(api_key=API_KEY)

        chat_completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": f"{system_prompt}"},
                {"role": "user", "content": f"""Du bekommst das erste Kapitel von einem Universitätsskript und die von dir geschrieben Story dazu.
Bitte nenne die Anzahl der Lektionen, in die man das gegebene Skript sinnvoll aufteilen könnte. 
Die Aufteilung soll sich logisch aus dem Skript und der Story ableiten, wobei die Story als Motivator und Kontext dienen kann. Achte darauf, dass die Lektionen inhaltlich sinnvoll und gut strukturiert sind.
                
<Universitätsskript>
{text}
</Universitätsskript>

<Story>
{story}
</Story>

Nenne mir nur die Zahl und keine weiteren Kommentare.
Gebe mir nur die Zeilen zurück, ohne eine Markdown Angabe, dass es ein Codefeld ist.
Gebe mir Zahl als .ts Konstante zurück.

<Formatbeispiel>
export const lectures_number = 18
</Formatbeispiel>"""}
            ]
        )

        print('> Lectues Milestones generated successfully!')

        typescript_code = f"{chat_completion.choices[0].message.content}"
        
        with open(file_path, "w", encoding="utf8") as ts_file:
            ts_file.write(typescript_code)

    else:
        with open(file_path, mode='r') as f:
            data = f.read()

        print(f"> File already exists: {file_path}")
        
        return data
    

def generate_lectures(file_path, system_prompt, API_KEY, text, story, milestone_number):
    data_folder = Path(__file__).resolve().parent.parent / 'app' / 'data'
    file_path = data_folder / f'{file_path}.ts'

    if not os.path.exists(file_path):
        client = OpenAI(api_key=API_KEY)

        chat_completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": f"{system_prompt}"},
                {"role": "user", "content": f"""Du bekommst das erste Kapitel von einem Universitätsskript und die von dir geschrieben Story dazu.
Du bekommst auch die Anzahl, welche aussagt in wie viele Teile du das Skript aufteilen sollst.
Erstelle basierend auf dem Universitätsskript, der Geschichte und der Anzahl der Meilensteine die Lektionen.
Die Lektionen sollen jeweils in ca. 3 Abschnitte unterteilt werden und eine kleine, aber fachlich fundierte Geschichte sein.
Jede Lektion soll mit einem klaren Lernziel enden und lehrreich sein, sodass die Studierenden mit den Inhalten lernen können.
Die Story soll dabei als motivierendes Element und als Kontext zur Unterstützung des Lernprozesses dienen.
                 
<Meilenstein Anzahl> 
{milestone_number} 
</ Meilenstein Anzahl>
         
<Universitätsskript>
{text}
</Universitätsskript>

<Story>
{story}
</Story>

Gebe mir nur die Texte zurück, ohne eine Markdown Angabe, dass es ein Codefeld ist.
Gebe mir die Lektionen als .ts Konstanten zurück. 
Jede Konstante ist eine Liste, welche die Abschnitte der jeweiligen Lektion als String beinhaltet.

<Formatbeispiel>
export const lektion_1 = ["", "", ""];
export const lektion_2 = ["", "", ""];
</Formatbeispiel>

Benutze keine Markdown Formatierung"""}
            ]
        )

        print('> Lectues generated successfully!')

        typescript_code = f"{chat_completion.choices[0].message.content}"
        
        with open(file_path, "w", encoding="utf8") as ts_file:
            ts_file.write(typescript_code)

    else:
        with open(file_path, mode='r') as f:
            data = f.read()

        print(f"> File already exists: {file_path}")
        
        return data