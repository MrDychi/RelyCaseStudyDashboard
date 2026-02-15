from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from data.data_loader import (
    getUniqueValues,
    getRows
)

app = FastAPI()

# Allow frontend container to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {"status": "Backend running"}

@app.get("/api/columnData")
def getColumnData(request: Request):
    print("Received request for column data")
    queryParams = dict(request.query_params)
    return getUniqueValues(column_title=queryParams.get("column"))

@app.get("/api/summary")
def getSummary():
    print("Received request for summary")
    return {
        "totalRows": getRows()
    }