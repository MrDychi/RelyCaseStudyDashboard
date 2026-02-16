from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from data.data_loader import (
    getYearRangeData,
    getAllCompanyNames,
    getAllTableData
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

@app.get("/api/getYearRange")
def getYearRange():
    values = getYearRangeData()
    return {"min": values[0], "max": values[1]}

@app.get("/api/getAllCompanies")
def getAllCompanies():
    return getAllCompanyNames()

@app.get("/api/getAllData")
def getAllData():
    values = getAllTableData()
    return {"headers": values[0], "values": values[1:]}
