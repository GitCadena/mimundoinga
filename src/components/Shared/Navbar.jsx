import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGameContext } from '../../context/GameContext';
import { Leaf, Palette, LayoutDashboard, Settings } from 'lucide-react';
import './Navbar.css';

export const Navbar = () => {
  const { gameState, setRole } = useGameContext();

  const handleRoleToggle = () => {
    setRole(gameState.role === 'student' ? 'teacher' : 'student');
  };

  return (
    <nav className="navbar-organic">
      <div className="navbar-brand">
        <span className="logo-text">Yachay Wasi Inga</span>
      </div>
      
      <div className="navbar-links">
        <NavLink to="/" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        {gameState.role === 'student' && (
          <>
            <NavLink to="/simbolos" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <Palette size={20} />
              <span>Símbolos Inga</span>
            </NavLink>
            <NavLink to="/arte" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <Palette size={20} />
              <span>Arte Inga</span>
            </NavLink>
            <NavLink to="/medicina" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <Leaf size={20} />
              <span>Botica Ancestral</span>
            </NavLink>
          </>
        )}

        {gameState.role === 'teacher' && (
          <>
            <NavLink to="/admin" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <Settings size={20} />
              <span>Panel Admin</span>
            </NavLink>
          </>
        )}
      </div>

      <div className="navbar-actions">
        <div className="role-indicator">
          Modo: {gameState.role === 'student' ? 'Estudiante' : 'Docente'}
        </div>
        <button className="btn-icon" onClick={handleRoleToggle} title="Cambiar Rol">
          <Settings size={20} />
        </button>
      </div>
    </nav>
  );
};
