interface ITheme {
    backgroundApp: string;
    background: string;
    color: string;
}

export type AllThemes = 
  | 'purple'
  | 'red'
  | 'pink'
  | 'green'
  | 'blue'
  | 'teal'
  | 'orange'
  | 'yellow'
  | 'gray'
  | 'brown';

const THEME: Record<AllThemes, ITheme> = {
    purple: {
        backgroundApp: '#f6f5ff',
        background: '#9370DB',
        color: '#fff',
    },
    red: {
        backgroundApp: '#fff5f5',
        background: '#FF4C4C',
        color: '#fff',
    },
    pink: {
        backgroundApp: '#fff6fa',
        background: '#FF66CC',
        color: '#fff',
    },
    green: {
        backgroundApp: '#f5fff5',
        background: '#28A745',
        color: '#fff',
    },
    blue: {
        backgroundApp: '#f0f8ff',
        background: '#007BFF',
        color: '#fff',
    },
    teal: {
        backgroundApp: '#f0fefe',
        background: '#20C997',
        color: '#fff',
    },
    orange: {
        backgroundApp: '#fffaf5',
        background: '#FF7F50',
        color: '#fff',
    },
    yellow: {
        backgroundApp: '#fffdf5',
        background: '#FFC107',
        color: '#333',
    },
    gray: {
        backgroundApp: '#f8f9fa',
        background: '#6C757D',
        color: '#fff',
    },
    brown: {
        backgroundApp: '#faf4f0',
        background: '#8B4513',
        color: '#fff',
    },
};

export default THEME;
