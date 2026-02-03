from sqlalchemy.orm import Session
from . import models, schemas

def get_contact(db: Session, contact_id: int):
    return db.query(models.Contact).filter(models.Contact.id == contact_id).first()

def get_contact_by_email(db: Session, email: str):
    return db.query(models.Contact).filter(models.Contact.email == email).first()

def get_contact_by_phone(db: Session, phone: str):
    return db.query(models.Contact).filter(models.Contact.phone == phone).first()

def get_contacts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Contact).offset(skip).limit(limit).all()

def search_contacts(db: Session, name: str):
    # Using ilike for case-insensitive partial match if supported by DB dialect, else like
    # SQLite 'like' is case-insensitive for ASCII characters.
    return db.query(models.Contact).filter(models.Contact.name.like(f"%{name}%")).all()

def create_contact(db: Session, contact: schemas.ContactCreate):
    db_contact = models.Contact(name=contact.name, phone=contact.phone, email=contact.email)
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

def update_contact(db: Session, contact_id: int, contact: schemas.ContactCreate):
    db_contact = get_contact(db, contact_id)
    if db_contact:
        db_contact.name = contact.name
        db_contact.phone = contact.phone
        db_contact.email = contact.email
        db.commit()
        db.refresh(db_contact)
    return db_contact

def delete_contact(db: Session, contact_id: int):
    db_contact = get_contact(db, contact_id)
    if db_contact:
        db.delete(db_contact)
        db.commit()
    return db_contact
