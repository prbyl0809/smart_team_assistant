from app.routers import auth
from app.routers import user
from app.routers import project
from app.routers import task
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend up & running!"}

app.include_router(user.router)
app.include_router(auth.router)
app.include_router(project.router)
app.include_router(task.router)
