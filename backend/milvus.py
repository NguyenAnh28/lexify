import os
import json
from pymilvus import Collection, FieldSchema, CollectionSchema, DataType, MilvusClient
from tqdm import tqdm
import textwrap
from sentence_transformers import SentenceTransformer

# Model set up
model = SentenceTransformer('all-MiniLM-L6-v2')  # Fast and lightweight
DIMENSION = 384  # Match with model output

# Milvus collection
COLLECTION_NAME = "book_search"
BATCH_SIZE = 550

# Connect to Milvus 
client = MilvusClient("./milvus_demo.db")

# Setup schema
schema = MilvusClient.create_schema(auto_id=True, enable_dynamic_field=False)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="title", datatype=DataType.VARCHAR, max_length=64000)
schema.add_field(field_name="author", datatype=DataType.VARCHAR, max_length=64000)
schema.add_field(field_name="year", datatype=DataType.INT64)
schema.add_field(field_name="description", datatype=DataType.VARCHAR, max_length=64000)
schema.add_field(field_name="embedding", datatype=DataType.FLOAT_VECTOR, dim=DIMENSION)

client.create_collection(collection_name=COLLECTION_NAME, schema=schema)


# Prepare index parameters
index_params = client.prepare_index_params()
# Add index
index_params.add_index(field_name="embedding", metric_type="IP", index_type="AUTOINDEX", params={})
# Create index
client.create_index(collection_name=COLLECTION_NAME, index_params=index_params)
# Load collection
client.load_collection(collection_name=COLLECTION_NAME)


# Load book data
with open('data.json', 'r') as f:
    book_data = json.load(f)

def emb_texts(texts):
    return model.encode(texts, convert_to_numpy=True).tolist()

batch = []

for i in tqdm(range(0, len(book_data))):
    batch.append({
        "title": book_data[i]["title"] or "",
        "author": book_data[i]["author"] or "",
        "year": book_data[i]["year"] or -1,
        "description": book_data[i]["description"] or "",
    })

    if len(batch) % BATCH_SIZE == 0 or i == len(book_data) - 1:
        descriptions = [item["description"] for item in batch]
        embeddings = emb_texts(descriptions)

        for item, emb in zip(batch, embeddings):
            item["embedding"] = emb

        client.insert(collection_name=COLLECTION_NAME, data=batch)
        batch = []

# Search function
def query(query, top_k=5):
    text = query

    res = client.search(
        collection_name=COLLECTION_NAME,
        data=emb_texts([text]),
        limit=top_k,
        output_fields=["title", "author", "year", "description"],
        search_params={
            "metric_type": "IP",
            "params": {},
        },
    )

    print("Description:", text)

    for hit_group in res:
        print("Results:")
        for rank, hit in enumerate(hit_group, start=1):
            entity = hit["entity"]
            print(f"\tRank: {rank} Score: {hit['distance']:} Title: {entity.get('title', '')}")
            print(f"\t\tAuthor: {entity.get('author', '')} Year: {entity.get('year', '')}")
            description = entity.get("description", "")
            print(textwrap.fill(description, width=88))
            print()

my_query = ("gay sex")
query(my_query)
