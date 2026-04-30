// data/symbols.js
// Initial default data for the Inga symbols
const defaultSymbols = [
  {
    id: 's1',
    name: 'Sol (Indi)',
    meaning: 'Dios y autoridad.',
    color: '#FFD700', // Amarillo
    image: null
  },
  {
    id: 's2',
    name: 'Chagra',
    meaning: 'Madre Tierra y sustento.',
    color: '#2E8B57', // Verde
    image: null
  },
  {
    id: 's3',
    name: 'Estómago (Uigsa)',
    meaning: 'Inicio de la vida.',
    color: '#8B4513', // Tierra Media
    image: null
  },
  {
    id: 's4',
    name: 'Maíz (Uirru)',
    meaning: 'Base de alimentación.',
    color: '#DAA520', // Dorado
    image: null
  },
  {
    id: 's5',
    name: 'Alas de gallina',
    meaning: 'Protección y comunidad.',
    color: '#A0522D', // Siena
    image: null
  },
  {
    id: 's6',
    name: 'Colibrí (Kindi)',
    meaning: 'Mensajero espiritual.',
    color: '#4682B4', // Azul Agua
    image: null
  },
  {
    id: 's7',
    name: 'Canasta (Saparro)',
    meaning: 'Trabajo y tejido.',
    color: '#D2B48C', // Tierra Clara
    image: null
  },
  {
    id: 's8',
    name: 'Río (Atun Yaco)',
    meaning: 'Conexión con la naturaleza.',
    color: '#1E90FF', // Azul
    image: null
  },
  {
    id: 's9',
    name: 'Vientre de mujer',
    meaning: 'Lugar sagrado de vida.',
    color: '#8B0000', // Rojo
    image: null
  }
];

export const getSymbols = () => {
  const stored = localStorage.getItem('inga_symbols');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('inga_symbols', JSON.stringify(defaultSymbols));
  return defaultSymbols;
};

export const saveSymbol = (newSymbol) => {
  const symbols = getSymbols();
  const symbolToSave = {
    ...newSymbol,
    id: newSymbol.id || 's' + Date.now()
  };
  
  const existingIndex = symbols.findIndex(s => s.id === symbolToSave.id);
  if (existingIndex >= 0) {
    symbols[existingIndex] = symbolToSave;
  } else {
    symbols.push(symbolToSave);
  }
  
  localStorage.setItem('inga_symbols', JSON.stringify(symbols));
  return symbols;
};

export const deleteSymbol = (id) => {
  const symbols = getSymbols();
  const updated = symbols.filter(s => s.id !== id);
  localStorage.setItem('inga_symbols', JSON.stringify(updated));
  return updated;
};
