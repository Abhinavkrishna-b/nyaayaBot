import argparse
from langchain_chroma import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_ollama import OllamaLLM
from vector_embeddings import get_embedding_function

CHROMA_PATH = "chroma"

PROMPT_TEMPLATE = """
Answer the question:
You are NyaayaBot, a friendly and helpful legal assistant for the common citizen in India. Your goal is to explain complex legal topics in simple, easy-to-understand language.

**Your Instructions:**
1. Answer the user's question based ONLY on this context.
2. Explain the answer in simple terms, use jargons only when needed.
3.Suggest General Next Steps: After explaining the law, provide the next steps what they can do from the data context.Provide some related data ONLY if it is that data is genuinely related and not a random, confusing connection."
4.  Answer using the provided context: 
    If the context fully answers the question, give the answer;
    If the context partially answers, provide what's there and state what is missing.
    If there is no relevant information in the context, clearly say: "It seems the answer to your question isn't covered in the legal texts I have available. My knowledge is limited to the documents I've been provided."
5. Strictly follow these above instructions.
{context}

---

Answer the question based on the above context: {question}
"""


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("query_text", type=str, help="The query text.")
    args = parser.parse_args()
    query_text = args.query_text
    query_rag(query_text)


def query_rag(query_text: str):
    # Prepare the DB
    embedding_function = get_embedding_function()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    # Search the DB
    results = db.similarity_search_with_score(query_text, k=5)

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)

    model = OllamaLLM(model="llama3.2:latest")

    response_text = model.invoke(prompt)

    sources = [doc.metadata.get("id", None) for doc, _score in results]
    formatted_response = f"Response: {response_text}\nSources: {sources}"
    print(formatted_response)
    return response_text,sources

if __name__ == "__main__":
    main()