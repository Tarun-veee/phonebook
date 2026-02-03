from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .database import engine
from .routers import contacts

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Phonebook API")

origins = [
    "http://localhost:5173",  # React app default port
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contacts.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Phonebook API"}
