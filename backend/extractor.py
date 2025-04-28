import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
from yake import KeywordExtractor
from sentence_transformers import SentenceTransformer, util
import language_tool_python

model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
tool = language_tool_python.LanguageTool('en-US')

stop_words = set(stopwords.words('english'))

genres = [
    "science fiction", "science", "fiction", "novel", "narrative", "memoir", "fantasy", "romance", "thriller", "mystery",
    "adventure", "history", "non-fiction", "self-help", "young adult", "poetry", "biography", "fairy tale", "self-help",
    "horror", "essay", "comedy", "gothic", "western", "detective", "comics", "autobiography", "drama", "children"
]

def remove_stop_words(keywords):
    return [word for word in keywords if word.lower() not in stop_words]

def correct_grammar(text):
    matches = tool.check(text)
    corrected_text = language_tool_python.utils.correct(text, matches)
    return corrected_text

def get_relevant_keywords(user_input, threshold=0.6):
    corrected_input = correct_grammar(user_input)
    print(f"Corrected: {corrected_input}")

    # Extract keywords from the user input  
    kw_extractor = KeywordExtractor(lan="en", n=1)
    raw_keywords = [kw for kw, _ in kw_extractor.extract_keywords(corrected_input)]
    print("Extracted Keywords:", raw_keywords)

    # Remove stop words

    keywords_without_stopwords = remove_stop_words(raw_keywords)
    print(f"Filtered Keywords: {keywords_without_stopwords}")

    # Encode genres and keywords using the model
    genre_embeddings = model.encode(genres, convert_to_tensor=True)
    keyword_embeddings = model.encode(keywords_without_stopwords, convert_to_tensor=True)


    closest_genres = []

    # For each keyword, find the closest genre based on cosine similarity
    for keyword, keyword_embedding in zip(keywords_without_stopwords, keyword_embeddings):
        best_score = -1  # Start with a low score to compare
        best_match = None
        
        # Compare the keyword with all genres and find the highest score
        for genre, genre_embedding in zip(genres, genre_embeddings):
            score = util.cos_sim(keyword_embedding, genre_embedding).item()
            if score > best_score and score > threshold:
                best_score = score
                best_match = genre
        
        # Only append the genre if there's a good match, otherwise skip it
        if best_match:
            closest_genres.append(best_match)

    return closest_genres


user_input = input("What are you interested in reading today? ")
print(get_relevant_keywords(user_input))
