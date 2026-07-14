// ============================================
// VP SOLUTIONS - Modelo: Application
// ============================================

export interface Application {
  id: string;
  name: string;
  description: string;
  category: string;
  technologies: string[];
  status: 'demo' | 'production' | 'development';
  demoPath: string;
  videoPreview?: string;
  imagePreview?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export const APPLICATIONS_DATA: Application[] = [
  {
    id: 'dashboard-agentes',
    name: 'Dashboard Agentes',
    description: 'Panel de control para la gestión y monitoreo de agentes en tiempo real.',
    category: 'Monitoreo',
    technologies: ['Angular', 'TypeScript', 'Bootstrap'],
    status: 'demo',
    demoPath: 'assets/demos/dashboard-agentes/index.html',
    imagePreview: 'assets/images/dashboard-agentes-preview.jpg',
    featured: true,
    createdAt: new Date('2024-01-10')
  },
  {
    id: 'dashboard-monitoreo',
    name: 'Dashboard Monitoreo',
    description: 'Sistema de monitoreo integral con métricas y alertas en tiempo real.',
    category: 'Monitoreo',
    technologies: ['Angular', 'TypeScript', 'Chart.js'],
    status: 'demo',
    demoPath: 'assets/demos/dashboard-monitoreo/index.html',
    imagePreview: 'assets/images/dashboard-monitoreo-preview.jpg',
    featured: true,
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'monitoreo-cesop',
    name: 'Monitoreo CESOP',
    description: 'Plataforma especializada para el monitoreo y control de operaciones CESOP.',
    category: 'Monitoreo',
    technologies: ['Angular', 'TypeScript', 'Bootstrap', 'WebSockets'],
    status: 'demo',
    demoPath: 'assets/demos/monitoreo-cesop/index.html',
    imagePreview: 'assets/images/monitoreo-cesop-preview.jpg',
    featured: true,
    createdAt: new Date('2024-01-20')
  },
  {
    id: 'sistema-productividad',
    name: 'Sistema Productividad',
    description: 'Herramienta para medir y optimizar la productividad de equipos de trabajo.',
    category: 'Productividad',
    technologies: ['Angular', 'TypeScript', 'Bootstrap'],
    status: 'demo',
    demoPath: 'assets/demos/sistema-productividad/index.html',
    imagePreview: 'assets/images/sistema-productividad-preview.jpg',
    createdAt: new Date('2024-02-01')
  },
  {
    id: 'calidad-llamadas',
    name: 'Calidad de Llamadas',
    description: 'Sistema de evaluación y control de calidad en llamadas telefónicas.',
    category: 'Calidad',
    technologies: ['Angular', 'TypeScript', 'Bootstrap'],
    status: 'demo',
    demoPath: 'assets/demos/calidad-llamadas/index.html',
    imagePreview: 'assets/images/calidad-llamadas-preview.jpg',
    createdAt: new Date('2024-02-10')
  },
  {
    id: 'calendarizacion',
    name: 'Calendarización',
    description: 'Sistema de gestión de calendarios y programación de actividades.',
    category: 'Gestión',
    technologies: ['Angular', 'TypeScript', 'Bootstrap', 'FullCalendar'],
    status: 'demo',
    demoPath: 'assets/demos/calendarizacion/index.html',
    imagePreview: 'assets/images/calendarizacion-preview.jpg',
    createdAt: new Date('2024-02-15')
  },
  {
    id: 'control-tecnicos',
    name: 'Control Técnicos',
    description: 'Plataforma para la gestión y seguimiento de técnicos en terreno.',
    category: 'Gestión',
    technologies: ['Angular', 'TypeScript', 'Bootstrap', 'Google Maps'],
    status: 'demo',
    demoPath: 'assets/demos/control-tecnicos/index.html',
    imagePreview: 'assets/images/control-tecnicos-preview.jpg',
    createdAt: new Date('2024-03-01')
  },
  {
    id: 'sigu',
    name: 'SIGU',
    description: 'Sistema de Información y Gestión Unificada para la administración de procesos.',
    category: 'Gestión',
    technologies: ['Angular', 'TypeScript', 'Bootstrap'],
    status: 'demo',
    demoPath: 'assets/demos/sigu/index.html',
    imagePreview: 'assets/images/sigu-preview.jpg',
    createdAt: new Date('2024-03-10')
  },
  {
    id: 'ai-soporte',
    name: 'AI Soporte',
    description: 'Asistente con inteligencia artificial para soporte y atención al cliente.',
    category: 'Inteligencia Artificial',
    technologies: ['Angular', 'TypeScript', 'Bootstrap', 'IA'],
    status: 'demo',
    demoPath: 'assets/demos/ai-soporte/index.html',
    imagePreview: 'assets/images/ai-soporte-preview.jpg',
    createdAt: new Date('2024-03-15')
  }
];