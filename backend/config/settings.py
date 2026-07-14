# ============================================
# VP SOLUTIONS - Configuración
# ============================================

import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

class Config:
    """Configuración base"""
    
    # Flask
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    PORT = int(os.getenv('PORT', 5000))
    
    # CORS
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:4200').split(',')
    
    # Email (para futuro)
    SMTP_HOST = os.getenv('SMTP_HOST', 'smtp.gmail.com')
    SMTP_PORT = int(os.getenv('SMTP_PORT', 587))
    SMTP_USER = os.getenv('SMTP_USER', '')
    SMTP_PASSWORD = os.getenv('SMTP_PASSWORD', '')
    
    # Recaptcha (para futuro)
    RECAPTCHA_SECRET_KEY = os.getenv('RECAPTCHA_SECRET_KEY', '')

class DevelopmentConfig(Config):
    """Configuración de desarrollo"""
    DEBUG = True
    TESTING = False

class ProductionConfig(Config):
    """Configuración de producción"""
    DEBUG = False
    TESTING = False
    
class TestingConfig(Config):
    """Configuración de pruebas"""
    DEBUG = False
    TESTING = True

# Mapeo de entornos
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}