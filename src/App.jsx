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

function App() {
  return (
    <GameProvider>
      <Router>
        {/* We keep the navbar but Dashboard has its own nav now, up to the user to remove the global Navbar if they want full immersion, but I'll keep it as is. Let's actually remove the global navbar since the user's hub provides its own navigation logic */}
        <main className="app-container max-w-none p-0">
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
