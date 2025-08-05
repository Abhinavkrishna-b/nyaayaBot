import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from query_data import query_rag

app = FastAPI(
    title="NyaayaBot API",
    description="API for the NyaayaBot RAG system"
)

origins = [
    "http://localhost:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query_text: str

@app.post("/api/query")
async def process_query(request: QueryRequest):

    try:
        response_text, sources = query_rag(request.query_text)
        return {
            "response": response_text,
            "sources": sources
        }
    except Exception as e:
        print(f"Error processing query: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while processing the query.")

@app.get("/api/health")
def health_check():
    """A simple endpoint to confirm the API is running."""
    return {"status": "ok", "message": "NyaayaBot API is running."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)