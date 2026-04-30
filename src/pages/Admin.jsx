import React, { useState, useEffect } from 'react';
import { getSymbols, saveSymbol, deleteSymbol } from '../data/symbols';
import { Plus, Edit2, Trash2, BookOpen, Save, Home } from 'lucide-react';
import './Admin.css';

const Admin = () => {
  const [symbols, setSymbols] = useState([]);
  const [activeTab, setActiveTab] = useState('symbols'); // 'symbols' | 'guide'
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', meaning: '', image: '' });

  useEffect(() => {
    setSymbols(getSymbols());
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      saveSymbol({ ...formData, id: editingId });
    } else {
      saveSymbol(formData);
    }
    setSymbols(getSymbols());
    resetForm();
  };

  const editSymbol = (symbol) => {
    setEditingId(symbol.id);
    setFormData({ name: symbol.name, meaning: symbol.meaning, image: symbol.image || '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este símbolo?')) {
      deleteSymbol(id);
      setSymbols(getSymbols());
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ name: '', meaning: '', image: '' });
  };

  return (
    <div className="admin-container fade-in">
      <header className="admin-header relative">
        <button 
          onClick={() => window.location.href = '/'}
          className="absolute left-6 top-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#ef6c00] hover:text-white transition-colors text-[#ef6c00] border-2 border-[#ef6c00]"
          title="Volver a Inicio"
        >
          <Home size={24} />
        </button>
        <h1>Panel Administrativo Inga</h1>
        <p style={{ color: '#555' }}>Módulo Maestro para Docentes e Investigadores</p>
      </header>

      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'symbols' ? 'active' : ''}`}
          onClick={() => setActiveTab('symbols')}
        >
          Gestor de Simbología
        </button>
        <button 
          className={`tab-btn ${activeTab === 'guide' ? 'active' : ''}`}
          onClick={() => setActiveTab('guide')}
        >
          Guía Pedagógica
        </button>
        <button 
          className={`tab-btn ${activeTab === 'guardianes' ? 'active' : ''}`}
          onClick={() => setActiveTab('guardianes')}
        >
          Guía: Guardianes del Territorio
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'symbols' && (
          <div className="symbols-manager">
            {/* Formulario */}
            <div className="card-organic form-card">
              <h2>{editingId ? 'Editar Símbolo' : 'Añadir Nuevo Símbolo'}</h2>
              <form onSubmit={handleSubmit} className="symbol-form">
                <div className="form-group">
                  <label>Nombre del Símbolo</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Ej. Sol (Indi)"
                  />
                </div>
                <div className="form-group">
                  <label>Significado Ancestral</label>
                  <textarea 
                    name="meaning" 
                    value={formData.meaning} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Escribe el significado..."
                    rows="4"
                  />
                </div>
                <div className="form-group">
                  <label>Imagen del Símbolo</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="file-input"
                  />
                  {formData.image && (
                    <div className="image-preview">
                      <img src={formData.image} alt="Preview" />
                    </div>
                  )}
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-organic primary">
                    <Save size={18} />
                    {editingId ? 'Actualizar' : 'Guardar Símbolo'}
                  </button>
                  {editingId && (
                    <button type="button" className="btn-organic" onClick={resetForm}>
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Diccionario de Significados (Lista) */}
            <div className="symbols-list-section">
              <h2>Diccionario de Significados ({symbols.length})</h2>
              <div className="symbols-grid">
                {symbols.map(symbol => (
                  <div key={symbol.id} className="card-organic symbol-item">
                    <div className="symbol-item-header">
                      <h3>{symbol.name}</h3>
                      <div className="symbol-actions">
                        <button onClick={() => editSymbol(symbol)} className="btn-icon" title="Editar"><Edit2 size={16}/></button>
                        <button onClick={() => handleDelete(symbol.id)} className="btn-icon delete" title="Eliminar"><Trash2 size={16}/></button>
                      </div>
                    </div>
                    {symbol.image && <img src={symbol.image} alt={symbol.name} className="symbol-thumbnail" />}
                    <p className="symbol-meaning">{symbol.meaning}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="pedagogical-guide">
            <div className="card-organic guide-card">
              <h2>Repositorio de Guía Pedagógica</h2>
              <p className="guide-intro">Esta guía estructura el aprendizaje en 4 momentos clave basados en la cosmovisión Inga, orientados a la <strong>Identificación, Interpretación y Actitud</strong> del estudiante hacia su cultura.</p>
              
              <div className="guide-moments">
                <div className="moment-block">
                  <h3><BookOpen size={20}/> 1. El Despertar del Saber</h3>
                  <p><strong>Objetivo (Identificación):</strong> Introducir al estudiante al mundo de la simbología Inga, reconociendo visualmente los elementos en su entorno.</p>
                  <p><em>Sugerencia docente:</em> Mostrar objetos reales (chumbes, canastos) y preguntar si conocen los nombres en Inga.</p>
                </div>
                <div className="moment-block">
                  <h3><BookOpen size={20}/> 2. La Siembra</h3>
                  <p><strong>Objetivo (Interpretación):</strong> Profundizar en los significados. Explicar que cada símbolo no es solo un dibujo, sino una historia viva de la comunidad.</p>
                  <p><em>Sugerencia docente:</em> Usar el "Diccionario de Significados" para contar historias de los abuelos sobre el Sol (Indi) o la Madre Tierra (Chagra).</p>
                </div>
                <div className="moment-block">
                  <h3><BookOpen size={20}/> 3. La Cosecha (Juego)</h3>
                  <p><strong>Objetivo (Actitud e Interpretación):</strong> Poner en práctica lo aprendido mediante la interactividad. El módulo "Caminando por los Símbolos" evalúa formativamente.</p>
                  <p><em>Sugerencia docente:</em> Acompañar al estudiante mientras juega, reforzando positivamente cuando logre "Insignias de Sabiduría".</p>
                </div>
                <div className="moment-block">
                  <h3><BookOpen size={20}/> 4. El Retorno</h3>
                  <p><strong>Objetivo (Actitud):</strong> Reflexión final sobre cómo la simbología vive en nosotros hoy.</p>
                  <p><em>Sugerencia docente:</em> Hacer que el estudiante dibuje su propio símbolo inspirado en lo que aprendió sobre su identidad.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guardianes' && (
          <div className="pedagogical-guide">
            <div className="card-organic guide-card">
              <h2>Guía: Guardianes del Territorio</h2>
              <p className="guide-intro">Esta guía está diseñada para acompañar el módulo "Cuida el Territorio", enseñando la importancia de la relación recíproca con la Casa Grande.</p>
              
              <div className="guide-moments">
                <div className="moment-block">
                  <h3><BookOpen size={20}/> 1. Apertura (Caminata)</h3>
                  <p><strong>Objetivo:</strong> Sensibilizar al estudiante sobre el estado de nuestro entorno.</p>
                  <p><em>Sugerencia docente:</em> Realizar un recorrido por la comunidad, observando qué elementos pertenecen a la naturaleza y cuáles son residuos.</p>
                </div>
                <div className="moment-block">
                  <h3><BookOpen size={20}/> 2. Desarrollo (Restauración Digital)</h3>
                  <p><strong>Objetivo:</strong> Interactuar con el módulo para entender cómo las pequeñas acciones sanan el territorio.</p>
                  <p><em>Sugerencia docente:</em> Acompañar al niño mientras limpia los escenarios virtuales, leyendo juntos los mensajes en Inga y Español.</p>
                </div>
                <div className="moment-block">
                  <h3><BookOpen size={20}/> 3. Cierre (Reflexión)</h3>
                  <p><strong>Objetivo:</strong> Evaluar y conectar el juego con la realidad.</p>
                  <p><em>Sugerencia docente:</em> Usar el reporte del juego (Tiempo y Errores) para dialogar: ¿Por qué a veces nos equivocamos al identificar la basura? ¿Cómo podemos ser más rápidos en ayudar?</p>
                </div>
                <div className="moment-block">
                  <h3><BookOpen size={20}/> 4. Campaña Ambiental</h3>
                  <p><strong>Objetivo:</strong> Llevar lo aprendido a la acción física.</p>
                  <p><em>Sugerencia docente:</em> Organizar una jornada de limpieza en la escuela (Chagra) o un río cercano, aplicando el conocimiento adquirido.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
