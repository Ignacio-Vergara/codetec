# ============================================
# VP SOLUTIONS - Modelo: Contacto
# ============================================

from datetime import datetime
from typing import Optional

class Contact:
    """Modelo para mensajes de contacto"""
    
    def __init__(
        self,
        name: str,
        email: str,
        subject: str,
        message: str,
        phone: Optional[str] = None,
        created_at: Optional[datetime] = None
    ):
        self.name = name
        self.email = email
        self.subject = subject
        self.message = message
        self.phone = phone
        self.created_at = created_at or datetime.utcnow()
    
    def to_dict(self) -> dict:
        """Convierte el modelo a diccionario"""
        return {
            'name': self.name,
            'email': self.email,
            'subject': self.subject,
            'message': self.message,
            'phone': self.phone,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    @classmethod
    def from_dict(cls, data: dict) -> 'Contact':
        """Crea una instancia desde un diccionario"""
        return cls(
            name=data.get('name', ''),
            email=data.get('email', ''),
            subject=data.get('subject', ''),
            message=data.get('message', ''),
            phone=data.get('phone'),
            created_at=datetime.fromisoformat(data['created_at']) if data.get('created_at') else None
        )