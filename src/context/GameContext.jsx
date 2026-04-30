import React, { createContext, useState, useEffect, useContext } from 'react';

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  // Estado inicial
  const initialState = {
    role: 'student', // 'student' o 'teacher'
    student: {
      name: 'Inti',
      points: 0,
      level: 'Curioso', // Curioso -> Aprendiz de Sabedor -> Guardián del Territorio
      badges: [], // ej. 'art_master', 'medicine_healer'
      completedTasks: {
        art: false,
        medicine: false
      }
    },
    teacherStats: [
      // Datos simulados para el dashboard del docente
      { id: 1, name: 'Sisa', points: 150, level: 'Aprendiz de Sabedor', completed: ['art'] },
      { id: 2, name: 'Amaru', points: 300, level: 'Guardián del Territorio', completed: ['art', 'medicine'] },
      { id: 3, name: 'Inti', points: 0, level: 'Curioso', completed: [] }
    ]
  };

  const [gameState, setGameState] = useState(() => {
    const savedState = localStorage.getItem('ingaGameState');
    return savedState ? JSON.parse(savedState) : initialState;
  });

  // Persistencia
  useEffect(() => {
    localStorage.setItem('ingaGameState', JSON.stringify(gameState));
  }, [gameState]);

  // Acciones
  const setRole = (role) => {
    setGameState(prev => ({ ...prev, role }));
  };

  const addPoints = (points) => {
    setGameState(prev => {
      const newPoints = prev.student.points + points;
      let newLevel = prev.student.level;
      
      if (newPoints >= 100 && newPoints < 250) newLevel = 'Aprendiz de Sabedor';
      if (newPoints >= 250) newLevel = 'Guardián del Territorio';

      // Sincronizar stats del docente para 'Inti'
      const updatedTeacherStats = prev.teacherStats.map(stat => 
        stat.name === prev.student.name ? { ...stat, points: newPoints, level: newLevel } : stat
      );

      return {
        ...prev,
        student: { ...prev.student, points: newPoints, level: newLevel },
        teacherStats: updatedTeacherStats
      };
    });
  };

  const unlockBadge = (badgeId) => {
    setGameState(prev => {
      if (prev.student.badges.includes(badgeId)) return prev;
      return {
        ...prev,
        student: { ...prev.student, badges: [...prev.student.badges, badgeId] }
      };
    });
  };

  const completeTask = (taskName) => {
    setGameState(prev => {
      const updatedTasks = { ...prev.student.completedTasks, [taskName]: true };
      
      // Sincronizar stats del docente
      const updatedTeacherStats = prev.teacherStats.map(stat => {
        if (stat.name === prev.student.name) {
          const newCompleted = [...stat.completed];
          if (!newCompleted.includes(taskName)) newCompleted.push(taskName);
          return { ...stat, completed: newCompleted };
        }
        return stat;
      });

      return {
        ...prev,
        student: { ...prev.student, completedTasks: updatedTasks },
        teacherStats: updatedTeacherStats
      };
    });
  };

  const resetProgress = () => {
    setGameState(initialState);
  };

  return (
    <GameContext.Provider value={{
      gameState,
      setRole,
      addPoints,
      unlockBadge,
      completeTask,
      resetProgress
    }}>
      {children}
    </GameContext.Provider>
  );
};
