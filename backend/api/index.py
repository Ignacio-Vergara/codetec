# ============================================
# VP SOLUTIONS - Vercel Serverless Function
# ============================================

import sys
import os

# Agregar el directorio padre al path para importar app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app

# Exportar la aplicación para Vercel
# Vercel espera una variable 'app' en el módulo