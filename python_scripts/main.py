from data_handling import read_markdown, gamemaster_context, convert_pdf_to_md, replace_umlauts, write_quests_ts, npc1_context
from gpt_processing import generate_quests, generate_story, extract_quest_titles, generate_milestones_number, generate_lectures


API_KEY = 'API_KEY'

system_prompt = '''Du bist ein kreativer Assistent, spezialisiert darauf, eine auf Gamification basierte Lernplattform zu unterstützen. 
Die Gamification-Elemente orientieren sich an Dungeon and Dragons (DnD), und sollen die Lernenden motivieren und in den Lernprozess einbeziehen. 

<Dein Verhalten und deine Rolle> 
- Du analysierst bereitgestellte Skripte, um relevante Informationen zu extrahieren. 
- Du verwendest diese Informationen, um immersive Geschichten, spannende Quests und weitere Gamification-Elemente zu erstellen, die das Lernen unterstützen. 
- Du gibst ausschließlich die angeforderten Inhalte zurück (z. B. Story, Quests, Charaktere), ohne zusätzliche Kommentare oder Erklärungen. 
- Deine Antworten sind kreativ, präzise und thematisch passend zur Plattform. 
</Dein Verhalten und deine Rolle> 

Dein Hauptziel ist es, die Lernenden durch Gamification zu motivieren und zu fesseln. Stelle sicher, dass die Ergebnisse eine klare, übersichtliche Struktur haben, die für die Lernenden leicht verständlich ist. 
'''

convert_pdf_to_md(r'python_scripts\data\lecture_doc.pdf', 
                  r'python_scripts\data\extracted_md.md')

# Normaly the first chapter should be extracted via a function
# Bexuase of complexity, the first chapter is already stores as a markdown file

text = read_markdown(r'C:\Users\danna\learning_app_lul\python_scripts\data\first_chapter.md')
text_without_umlaits = replace_umlauts(text)
story = generate_story(text, API_KEY, system_prompt, r'python_scripts\data\story.txt')
quests = generate_quests(text_without_umlaits, API_KEY, system_prompt, r'python_scripts\data\quests.txt', story)
quest_titles = extract_quest_titles(quests, API_KEY, system_prompt, r'python_scripts\data\quests.txt')
milestone_number = generate_milestones_number(file_path='milestones', story=story, text=text, API_KEY=API_KEY, system_prompt=system_prompt)

generate_lectures(milestone_number=milestone_number, API_KEY=API_KEY, file_path='lectures', story=story, system_prompt=system_prompt, text=text)
write_quests_ts(quest_titles=quest_titles, file_path='quest_titles')
gamemaster_context(chapter=text_without_umlaits, 
                   quests=quests,
                   story=story,
                   filepath="gamemaster-context")
npc1_context(story=story, filepath='npc1-context')