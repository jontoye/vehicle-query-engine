import os

from dotenv import load_dotenv

load_dotenv()

import models
from database import engine, get_db
from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session

app = FastAPI()

if os.environ.get("ENV") == "development":
    models.Base.metadata.drop_all(bind=engine)
    models.Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "Hello VQE!"}


@app.get("/test-db")
async def test_db(db: Session = Depends(get_db)):
    stmt = text("SELECT 'Hello postgres!'")
    result = db.execute(stmt)
    return {"message": result.scalar()}
