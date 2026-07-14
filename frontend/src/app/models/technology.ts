// ============================================
// VP SOLUTIONS - Modelo: Technology
// ============================================

export interface Technology {
  id: string;
  name: string;
  icon: string;          // Clase de Font Awesome o ruta de icono
  color: string;         // Color asociado a la tecnología
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'other';
}

export const TECHNOLOGIES: Technology[] = [
  {
    id: 'angular',
    name: 'Angular',
    icon: 'fab fa-angular',
    color: '#DD0031',
    category: 'frontend'
  },
  {
    id: 'react',
    name: 'React',
    icon: 'fab fa-react',
    color: '#61DAFB',
    category: 'frontend'
  },
  {
    id: 'vue',
    name: 'Vue.js',
    icon: 'fab fa-vuejs',
    color: '#4FC08D',
    category: 'frontend'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: 'fas fa-code',
    color: '#3178C6',
    category: 'frontend'
  },
  {
    id: 'python',
    name: 'Python',
    icon: 'fab fa-python',
    color: '#3776AB',
    category: 'backend'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: 'fab fa-node-js',
    color: '#339933',
    category: 'backend'
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    icon: 'fab fa-bootstrap',
    color: '#7952B3',
    category: 'frontend'
  },
  {
    id: 'firebase',
    name: 'Firebase',
    icon: 'fas fa-fire',
    color: '#FFCA28',
    category: 'database'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: 'fas fa-database',
    color: '#47A248',
    category: 'database'
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: 'fab fa-docker',
    color: '#2496ED',
    category: 'devops'
  },
  {
    id: 'aws',
    name: 'AWS',
    icon: 'fab fa-aws',
    color: '#FF9900',
    category: 'devops'
  }
];