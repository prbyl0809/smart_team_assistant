from app.database import Base
from sqlalchemy import Column, Integer

class Dummy(Base):
    __tablename__ = 'dummy'

    id = Column(Integer, primary_key=True, index=True)