from markitdown import MarkItDown
from pathlib import Path
import os

def convert_pdf_to_md(file_path, output_name):

    if not os.path.exists(output_name):
        md = MarkItDown()
        result = md.convert(file_path)

        with open(output_name, mode='w', encoding='utf-8') as f:
            f.write(result.text_content)
    
        print(f'> {file_path} read successfully!')
    
    else:
        print(f"> File already exists: {file_path}")


def gamemaster_context(quests, chapter, story, filepath):
    data_folder = Path(__file__).resolve().parent.parent / 'app' / 'data'
    file_path = data_folder / f'{filepath}.ts'
    
    if not os.path.exists(file_path):
        typescript_code = f"""export const gamemasterContext = `

<quests>
{quests}
</quests>

<story>
{story}
</story>

<erstes Kapitel>
{chapter}
</erstes Kapitel>
`;"""

        with open(file_path, "w", encoding="utf8") as ts_file:
            ts_file.write(typescript_code)
        
        print(f'> {filepath}.ts created successfully!')
    
    else:
        print(f"> File already exists: {file_path}")


def read_markdown(file_name):
    with open(file_name, mode='r', encoding='utf-8') as f:
        data = f.read()
        return data
    
    print(f'> {file_name} read successfully!')


def replace_umlauts(text):
    umlaut_map = {
        "ä": "ae",
        "ö": "oe",
        "ü": "ue",
        "Ä": "Ae",
        "Ö": "Oe",
        "Ü": "Ue",
        "ß": "ss"
    }

    for umlaut, replacement in umlaut_map.items():
        text = text.replace(umlaut, replacement)
    
    print('> umlaut replacement successfUlly applied!')
        
    return text


def write_quests_ts(quest_titles, file_path):
    data_folder = Path(__file__).resolve().parent.parent / 'app' / 'data'
    file_path = data_folder / f'{file_path}.ts'

    if not os.path.exists(file_path):
        typescript_code = f"{quest_titles}"
        
        with open(file_path, "w", encoding="utf8") as ts_file:
            ts_file.write(typescript_code)
    
        print(f'> {file_path}.ts created successfully!')
    
    else:
        print(f"> File already exists: {file_path}")


def npc1_context(story, filepath):
    data_folder = Path(__file__).resolve().parent.parent / 'app' / 'data'
    file_path = data_folder / f'{filepath}.ts'
    
    if not os.path.exists(file_path):
        typescript_code = f"""export const npcContext = `

<story>
{story}
</story>
`;"""

        with open(file_path, "w", encoding="utf8") as ts_file:
            ts_file.write(typescript_code)
        
        print(f'> {filepath}.ts created successfully!')
    
    else:
        print(f"> File already exists: {file_path}")