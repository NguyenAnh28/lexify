from yake import KeywordExtractor
from sentence_transformers import SentenceTransformer, util
import language_tool_python

model = SentenceTransformer('all-MiniLM-L6-v2')
tool = language_tool_python.LanguageTool('en-US')

GENRES = [
    "science fiction", "fantasy", "romance", "thriller", "mystery",
    "adventure", "history", "non-fiction", "self-help", "young adult"
]
def correct_grammar(text):
    matches = tool.check(text)
    corrected_text = language_tool_python.utils.correct(text, matches)
    return corrected_text

def get_relevant_keywords(user_input, threshold=0.6, max_keywords=5):
    corrected_input = correct_grammar(user_input)
    print(f"Corrected: {corrected_input}")

    kw_extractor = KeywordExtractor(lan="en", n=1, top=max_keywords)
    raw_keywords = [kw for kw, _ in kw_extractor.extract_keywords(corrected_input)]

    genre_embeddings = model.encode(GENRES, convert_to_tensor=True)
    keyword_embeddings = model.encode(raw_keywords, convert_to_tensor=True)

    relevant = []
    for i, keyword in enumerate(raw_keywords):
        score = util.cos_sim(keyword_embeddings[i], genre_embeddings).max().item()
        if score > threshold:
            relevant.append(keyword)
    
    return relevant

user_input = input("What are you interested in reading today? ")
print(get_relevant_keywords(user_input))
