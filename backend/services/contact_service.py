# ============================================
# VP SOLUTIONS - Servicio: Contacto
# ============================================

import logging
from typing import Dict, Any, Tuple
from datetime import datetime
from models.contact import Contact
from utils.validators import Validators

logger = logging.getLogger(__name__)

class ContactService:
    """Servicio para gestionar mensajes de contacto"""
    
    @staticmethod
    def process_contact_form(data: Dict[str, Any]) -> Tuple[bool, Dict[str, Any]]:
        """
        Procesa el formulario de contacto
        - Valida los datos
        - Crea el modelo
        - Guarda (en memoria por ahora)
        - Retorna: (éxito, respuesta)
        """
        try:
            # Validar datos
            is_valid, result = Validators.validate_contact_form(data)
            
            if not is_valid:
                return False, {
                    'success': False,
                    'errors': result,
                    'message': 'Por favor, corrige los errores en el formulario'
                }
            
            # Crear modelo
            contact = Contact(
                name=result['name'],
                email=result['email'],
                subject=result['subject'],
                message=result['message'],
                phone=result.get('phone')
            )
            
            # Log del mensaje
            logger.info(f"Nuevo mensaje de contacto: {contact.name} - {contact.email}")
            
            # TODO: Enviar email
            # TODO: Guardar en base de datos
            
            return True, {
                'success': True,
                'message': 'Mensaje enviado con éxito',
                'data': contact.to_dict()
            }
            
        except Exception as e:
            logger.error(f"Error al procesar formulario de contacto: {str(e)}")
            return False, {
                'success': False,
                'message': 'Error interno del servidor',
                'error': str(e)
            }
    
    @staticmethod
    def get_health_status() -> Dict[str, Any]:
        """Retorna el estado del servicio"""
        return {
            'status': 'healthy',
            'timestamp': datetime.utcnow().isoformat(),
            'service': 'contact-service'
        }