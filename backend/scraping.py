import requests 
import json

url = "https://www.whichbook.net/api/v1/search?audio=0&lp=0&film=0&pagesize=499"

response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    book_data = []

    for item in data['books']:
        book_id = item['id']
        title = item['title']
        author = item['author']
        description = item['review']
        year = item['publicationYear']

        book_data.append({
            'id': book_id,
            'title': title,
            'author': author,
            'description': description,
            'year': year
        })

    with open('data.json', 'w') as f:
        json.dump(book_data, f, indent=4)

    print("Data succesfully mined")
    
else:
    print(response.status_code)
