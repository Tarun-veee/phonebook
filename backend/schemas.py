from pydantic import BaseModel, EmailStr, Field

class ContactBase(BaseModel):
    name: str
    phone: str = Field(..., pattern=r"^\d{10}$", description="Must be exactly 10 digits")
    email: str = Field(..., pattern=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", description="Must be a valid email format")

class ContactCreate(ContactBase):
    pass

class Contact(ContactBase):
    id: int

    class Config:
        from_attributes = True
