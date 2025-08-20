# backend/api.py
import uvicorn
import asyncio
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
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query_text: str

@app.post("/api/query")
async def process_query(request: QueryRequest):
    try:
        response_text, sources = await asyncio.to_thread(query_rag, request.query_text)

        advice = "\n\n---\nNext Steps: For specific advice on your situation or to take action, consider contacting a qualified lawyer or the relevant government authority."
        full_response = response_text + advice if response_text else advice

        return {"response": full_response, "sources": sources}
    except Exception as e:
        print(f"Error processing query: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while processing the query.")

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "NyaayaBot API is running."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
