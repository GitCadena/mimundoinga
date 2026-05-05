import imgIndi from '../simbolos/indi.png';
import imgChagra from '../simbolos/chagra.png';
import imgUigsa from '../simbolos/Uigsa.png';
import imgUirru from '../simbolos/uirru.png';
import imgKindi from '../simbolos/kindi.png';
import imgSaparro from '../simbolos/Saparro.png';
import imgAtunYaco from '../simbolos/AtunYaco.png';
import imgRombo from '../simbolos/rombo.png';
import imgAtahualpa from '../simbolos/atahualpa.png';

const defaultSymbols = [
  {
    id: 's1',
    name: 'Sol (Indi)',
    meaning: 'Dios y autoridad.',
    color: '#FFD700',
    image: imgIndi
  },
  {
    id: 's2',
    name: 'Chagra',
    meaning: 'Madre Tierra y sustento.',
    color: '#2E8B57',
    image: imgChagra
  },
  {
    id: 's3',
    name: 'Estómago (Uigsa)',
    meaning: 'Inicio de la vida.',
    color: '#8B4513',
    image: imgUigsa
  },
  {
    id: 's4',
    name: 'Maíz (Uirru)',
    meaning: 'Base de alimentación.',
    color: '#DAA520',
    image: imgUirru
  },
  {
    id: 's5',
    name: 'Alas de gallina',
    meaning: 'Protección y comunidad.',
    color: '#A0522D',
    image: imgAtahualpa
  },
  {
    id: 's6',
    name: 'Colibrí (Kindi)',
    meaning: 'Mensajero espiritual.',
    color: '#4682B4',
    image: imgKindi
  },
  {
    id: 's7',
    name: 'Canasta (Saparro)',
    meaning: 'Trabajo y tejido.',
    color: '#D2B48C',
    image: imgSaparro
  },
  {
    id: 's8',
    name: 'Río (Atun Yaco)',
    meaning: 'Conexión con la naturaleza.',
    color: '#1E90FF',
    image: imgAtunYaco
  },
  {
    id: 's9',
    name: 'Vientre de mujer',
    meaning: 'Lugar sagrado de vida.',
    color: '#8B0000',
    image: imgRombo
  }
];

export const getSymbols = () => {
  const stored = localStorage.getItem('inga_symbols');
  let symbols = stored ? JSON.parse(stored) : [...defaultSymbols];
  
  // Ensure default symbols always have their correct images
  const updatedSymbols = symbols.map(s => {
    const defaultSym = defaultSymbols.find(ds => ds.id === s.id);
    if (defaultSym) {
      return { ...s, image: defaultSym.image };
    }
    return s;
  });

  if (!stored) {
    localStorage.setItem('inga_symbols', JSON.stringify(updatedSymbols));
  }
  
  return updatedSymbols;
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
