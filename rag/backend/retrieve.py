import logging
import os
from azure.core.credentials import AzureKeyCredential
from azure.search.documents import SearchClient
from openai import AzureOpenAI
from dotenv import load_dotenv
from trip import Trip

load_dotenv()

def retrieve_information(interests, countries):
    endpoint = os.environ.get('SEARCH_ENDPOINT')
    index_name = os.environ.get('INDEX_NAME')
    api_key = os.environ.get('API_KEY')

    client = SearchClient(endpoint=endpoint, 
                          index_name=index_name, 
                          credential=AzureKeyCredential(api_key))

    search_text = f"interests:{interests} AND countries:{countries}"
    results = client.search(search_text=search_text)
    
    retrieved_data = []
    for result in results:
        retrieved_data.append(result['chunk'])
    return " ".join(retrieved_data)