# ============================================
# VP SOLUTIONS - Aplicación Principal
# ============================================

import os
import logging
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

# Importar configuraciones y servicios
from config.settings import config
from services.contact_service import ContactService

# Cargar variables de entorno
load_dotenv()

# Configurar logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Crear aplicación Flask
app = Flask(__name__)

# Obtener configuración según entorno
env = os.getenv('FLASK_ENV', 'development')
app.config.from_object(config.get(env, config['default']))

# Configurar CORS
CORS(app, origins=app.config['CORS_ORIGINS'])

# ============================================
# RUTAS
# ============================================

@app.route('/', methods=['GET'])
def index():
    """Ruta raíz - Estado del backend"""
    return jsonify({
        'service': 'VP Solutions Backend',
        'version': '1.0.0',
        'status': 'operational',
        'environment': env
    })

@app.route('/api/health', methods=['GET'])
def health():
    """Health check para Vercel"""
    status = ContactService.get_health_status()
    return jsonify(status), 200

@app.route('/api/contact', methods=['POST'])
def contact():
    """
    Endpoint para enviar mensajes de contacto
    Espera un JSON con: name, email, subject, message, phone (opcional)
    """
    try:
        # Obtener datos
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'message': 'No se recibieron datos'
            }), 400
        
        # Procesar mensaje
        success, result = ContactService.process_contact_form(data)
        
        if success:
            return jsonify(result), 200
        else:
            return jsonify(result), 400
            
    except Exception as e:
        logger.error(f"Error en endpoint /api/contact: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Error interno del servidor'
        }), 500

@app.route('/api/contact', methods=['GET'])
def contact_options():
    """Endpoint OPTIONS para CORS"""
    return jsonify({'message': 'OK'}), 200

# ============================================
# MANEJO DE ERRORES
# ============================================

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'success': False,
        'message': 'Recurso no encontrado'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    logger.error(f"Error interno: {str(error)}")
    return jsonify({
        'success': False,
        'message': 'Error interno del servidor'
    }), 500

# ============================================
# INICIO DE LA APLICACIÓN
# ============================================

if __name__ == '__main__':
    port = app.config['PORT']
    debug = app.config['DEBUG']
    
    logger.info(f"Iniciando VP Solutions Backend en puerto {port} (debug={debug})")
    app.run(host='0.0.0.0', port=port, debug=debug)