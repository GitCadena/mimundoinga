import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { Navbar } from './components/Shared/Navbar';

// Pantallas
import Dashboard from './pages/Dashboard';
import ArtModule from './pages/ArtModule';
import MedicineModule from './pages/MedicineModule';
import Admin from './pages/Admin';
import SymbolsModule from './pages/SymbolsModule';
import MedalsModule from './pages/MedalsModule';
import Welcome from './pages/Welcome';
import TerritoryModule from './pages/TerritoryModule';
import { BackgroundAudio } from './components/Shared/BackgroundAudio';
import { PedagogicalGuide } from './components/Shared/PedagogicalGuide';
import { useState } from 'react';

function App() {
  return (
    <GameProvider>
      <Router>
        <main className="app-container max-w-none p-0 relative min-h-screen">
          {/* Global UI Elements */}
          <BackgroundAudio />
          
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/hub" element={<Dashboard />} />
            <Route path="/arte" element={<ArtModule />} />
            <Route path="/medicina" element={<MedicineModule />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/simbolos" element={<SymbolsModule />} />
            <Route path="/medallas" element={<MedalsModule />} />
            <Route path="/territorio" element={<TerritoryModule />} />
          </Routes>
        </main>
      </Router>
    </GameProvider>
  );
}

export default App;
