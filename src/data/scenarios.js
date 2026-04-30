export const scenarios = [
  {
    id: 'c1',
    symptom: 'dolor_estomago',
    patient: 'El niño Inti comió muchos frutos silvestres sin lavar y ahora tiene un fuerte ardor en el vientre.',
    correctPlantId: 'p2', // Llantén
    successMessage: '¡Bien hecho! El Llantén apaga el fuego del estómago. Has aplicado la sabiduría de refrescar el cuerpo.',
    hintMessage: 'Piensa en una planta que los abuelos usan para "refrescar" y apagar los fuegos internos. Sus hojas son anchas y crecen al ras del suelo.'
  },
  {
    id: 'c2',
    symptom: 'resfriado',
    patient: 'La abuela Sisa caminó bajo la lluvia del páramo y ahora tiene escalofríos y tos fuerte.',
    correctPlantId: 'p3', // Sauco
    successMessage: '¡Correcto! Las flores del arbolito de Sauco abrigan el pecho y sacan el frío del cuerpo.',
    hintMessage: 'Busca un arbolito cuyas flores se usan para sudar y sacar el frío del cuerpo provocado por los vientos helados.'
  },
  {
    id: 'c3',
    symptom: 'herida',
    patient: 'Mientras trabajaba en la chagra, el joven Amaru se hizo un corte profundo en el brazo con el machete.',
    correctPlantId: 'p1', // Matico
    successMessage: '¡Excelente! El Matico es la planta que "suelda" la piel. Has evitado una infección.',
    hintMessage: 'Recuerda la planta que los animales heridos buscan para frotarse. Se usa para "soldar" heridas.'
  }
];
