# ============================================
# VP SOLUTIONS - Validadores
# ============================================

import re
from email_validator import validate_email, EmailNotValidError
from typing import Tuple, Optional

class Validators:
    """Clase con métodos de validación"""
    
    @staticmethod
    def validate_name(name: str) -> Tuple[bool, Optional[str]]:
        """
        Valida el nombre
        - Mínimo 2 caracteres
        - Máximo 100 caracteres
        - Solo letras, espacios, guiones y apóstrofes
        """
        if not name or len(name.strip()) < 2:
            return False, "El nombre debe tener al menos 2 caracteres"
        
        if len(name) > 100:
            return False, "El nombre no puede tener más de 100 caracteres"
        
        if not re.match(r"^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-']+$", name):
            return False, "El nombre contiene caracteres no válidos"
        
        return True, None
    
    @staticmethod
    def validate_email(email: str) -> Tuple[bool, Optional[str]]:
        """
        Valida el email usando email-validator
        """
        if not email:
            return False, "El email es obligatorio"
        
        try:
            validate_email(email)
            return True, None
        except EmailNotValidError as e:
            return False, str(e)
    
    @staticmethod
    def validate_phone(phone: str) -> Tuple[bool, Optional[str]]:
        """
        Valida el teléfono (opcional)
        - Formato internacional o nacional
        - Solo números, espacios, guiones y +
        """
        if not phone:
            return True, None  # El teléfono es opcional
        
        if not re.match(r"^[\+\d\s\-]{9,20}$", phone):
            return False, "El teléfono debe tener entre 9 y 20 caracteres y solo números, espacios o +"
        
        return True, None
    
    @staticmethod
    def validate_subject(subject: str) -> Tuple[bool, Optional[str]]:
        """
        Valida el asunto
        - Mínimo 5 caracteres
        - Máximo 200 caracteres
        """
        if not subject or len(subject.strip()) < 5:
            return False, "El asunto debe tener al menos 5 caracteres"
        
        if len(subject) > 200:
            return False, "El asunto no puede tener más de 200 caracteres"
        
        return True, None
    
    @staticmethod
    def validate_message(message: str) -> Tuple[bool, Optional[str]]:
        """
        Valida el mensaje
        - Mínimo 10 caracteres
        - Máximo 1000 caracteres
        """
        if not message or len(message.strip()) < 10:
            return False, "El mensaje debe tener al menos 10 caracteres"
        
        if len(message) > 1000:
            return False, "El mensaje no puede tener más de 1000 caracteres"
        
        return True, None
    
    @classmethod
    def validate_contact_form(cls, data: dict) -> Tuple[bool, dict]:
        """
        Valida el formulario de contacto completo
        Retorna: (es_valido, diccionario_con_errores_o_datos_limpios)
        """
        errors = {}
        clean_data = {}
        
        # Validar nombre
        name_valid, name_error = cls.validate_name(data.get('name', ''))
        if not name_valid:
            errors['name'] = name_error
        else:
            clean_data['name'] = data.get('name', '').strip()
        
        # Validar email
        email_valid, email_error = cls.validate_email(data.get('email', ''))
        if not email_valid:
            errors['email'] = email_error
        else:
            clean_data['email'] = data.get('email', '').strip()
        
        # Validar teléfono (opcional)
        phone_valid, phone_error = cls.validate_phone(data.get('phone', ''))
        if not phone_valid:
            errors['phone'] = phone_error
        else:
            clean_data['phone'] = data.get('phone', '').strip() if data.get('phone') else None
        
        # Validar asunto
        subject_valid, subject_error = cls.validate_subject(data.get('subject', ''))
        if not subject_valid:
            errors['subject'] = subject_error
        else:
            clean_data['subject'] = data.get('subject', '').strip()
        
        # Validar mensaje
        message_valid, message_error = cls.validate_message(data.get('message', ''))
        if not message_valid:
            errors['message'] = message_error
        else:
            clean_data['message'] = data.get('message', '').strip()
        
        return len(errors) == 0, errors if errors else clean_data