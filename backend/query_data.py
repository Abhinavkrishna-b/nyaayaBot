import argparse
from langchain_chroma import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_ollama import OllamaLLM
from vector_embeddings import get_embedding_function

CHROMA_PATH = "chroma"

PROMPT_TEMPLATE = """
You are NyaayaBot, a friendly and helpful legal assistant for the common citizen in India. Your goal is to explain complex legal topics in simple, easy-to-understand language.

**Your Instructions:**

1. Read the following legal context carefully.

2. Answer the user's question based ONLY on this context.

3. Explain, Don't Just Repeat:Explain the relevant laws in your own words, as if you were talking to a friend who doesn't know legal terms.When you mention a specific law or section (e.g., "IPC Section 302"), you must immediately explain what it means in simple terms (e.g., "...which is the law that deals with murder."). Use jargon when it is needed and explain it.

4. Suggest General Next Steps: After explaining the law, provide the next steps what they can do from the data context.Provide some related data ONLY if it is that data is genuinely related and not a random, confusing connection."

5.Answer using the provided context:
If the context fully answers the question, give the answer;
If the context partially answers, provide what's there and some related info ONLY if it is that data is genuinely related;
If no relevant context info,clearly say "It seems the answer to your question isn't covered in the legal texts I have available,My knowledge is limited to the documents I've been provided."

---

Context from Legal Documents:{context}

---

User's Question: {question}

Your Answer:
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

    sources = [doc.metadata.get("id", "Unknown Source") for doc, _score in results]
    unique_sources = list(set(sources))

    formatted_response = f"Response: {response_text}\nSources: {sources}"
    print(formatted_response)
    return response_text, unique_sources

if __name__ == "__main__":
    main()
