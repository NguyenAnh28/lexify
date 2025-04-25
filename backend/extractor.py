from yake import KeywordExtractor

def extract_keywords(text, max_keywords=5):
    kw_extractor = KeywordExtractor(lan="en", n=1, top=max_keywords)
    keywords = kw_extractor.extract_keywords(text)
    return [kw for kw, _ in keywords]

user_input = input("What are you interested in reading today? ")
keywords = extract_keywords(user_input)
print(keywords)
