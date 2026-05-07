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
              <h2 className="text-3xl font-black text-[#5d4037] mb-6">GUÍA PEDAGÓGICA: “EL TEJIDO DE LA MEMORIA”</h2>
              
              <section className="guide-section mb-8">
                <h3 className="text-xl font-bold text-[#ef6c00] mb-3 flex items-center gap-2">
                  <BookOpen size={24}/> Propósito Pedagógico y Sentido de la Estrategia
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Esta propuesta busca que el docente no solo enseñe contenidos culturales, sino que convierta la plataforma web en un espacio de mediación entre la tecnología y la tradición ancestral, donde el estudiante de primaria descubra que el arte Inga no es únicamente una expresión estética, sino también una forma de escritura y comunicación de saberes. El objetivo principal es fortalecer la identidad cultural de los niños mediante el reconocimiento de los símbolos propios de su pueblo, promoviendo el respeto por el conocimiento de los mayores y la preservación de la narrativa visual indígena.
                </p>
              </section>

              <div className="guide-moments grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="moment-block p-6 bg-[#fff8e1] rounded-2xl border-l-4 border-[#ff9800]">
                  <h4 className="font-black text-lg text-[#5d4037] mb-2">Momento de Apertura: El Despertar del Saber</h4>
                  <p className="text-sm text-gray-600">
                    La jornada inicia con un <strong>Círculo de la Palabra</strong>, recreando un espacio de confianza y armonía. El docente invitará a los niños a observar imágenes reales de tejidos Inga (chumbes) en la plataforma y preguntará: <em>“¿Qué historias creen que están guardadas en estas figuras que usan nuestros abuelos?”</em>. El fin es despertar la curiosidad y comprender que cada símbolo guarda un mensaje profundo.
                  </p>
                </div>

                <div className="moment-block p-6 bg-[#e8f5e9] rounded-2xl border-l-4 border-[#4caf50]">
                  <h4 className="font-black text-lg text-[#5d4037] mb-2">Momento de Desarrollo: La Siembra del Conocimiento</h4>
                  <p className="text-sm text-gray-600">
                    El docente guiará a los estudiantes hacia la sección de <strong>“Explicación de Símbolos”</strong>. Mientras la plataforma muestra contenidos, el maestro profundizará en el significado de símbolos como el Churo, la Rana, las Montañas y el Sol, explicando su conexión con la vida y el pensamiento indígena. Los niños pueden dibujar los símbolos en el aire o cuadernos para fortalecer la memoria visual.
                  </p>
                </div>

                <div className="moment-block p-6 bg-[#e3f2fd] rounded-2xl border-l-4 border-[#2196f3]">
                  <h4 className="font-black text-lg text-[#5d4037] mb-2">Momento de Práctica: La Cosecha y el Juego</h4>
                  <p className="text-sm text-gray-600">
                    Interacción directa con el juego digital de asociación. El docente actúa como mediador mientras los estudiantes exploran de manera autónoma el reto de relacionar cada símbolo con su significado. Se busca reforzar la memoria cognitiva y visual, comprendiendo que se está interpretando el pensamiento de los mayores.
                  </p>
                </div>

                <div className="moment-block p-6 bg-[#f3e5f5] rounded-2xl border-l-4 border-[#9c27b0]">
                  <h4 className="font-black text-lg text-[#5d4037] mb-2">Momento de Cierre: El Retorno a la Comunidad</h4>
                  <p className="text-sm text-gray-600">
                    Socialización colectiva donde cada estudiante comparte qué símbolo le llamó más la atención. Se reflexiona sobre la importancia de mantener vivos estos saberes. Se cierra con la pregunta: <em>“¿Cómo podemos nosotros ayudar a que estos símbolos no se olviden?”</em> y se sugiere conversar con un familiar mayor en casa.
                  </p>
                </div>
              </div>

              <section className="guide-section mb-8 p-6 bg-white border-2 border-dashed border-[#ff9800] rounded-3xl">
                <h3 className="text-xl font-bold text-[#5d4037] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined">auto_awesome</span> Explicación de los Símbolos Ancestrales
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <strong className="text-[#ef6c00]">El Churo (Espirale):</strong> Representa el origen y el retorno, mostrando que el tiempo avanza en ciclos donde siempre regresamos a nuestras raíces.
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <strong className="text-[#ef6c00]">La Rana (Ambe):</strong> Simboliza la fertilidad, el agua y la conexión con la Madre Tierra, protectora de la vida en la selva.
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <strong className="text-[#ef6c00]">Las Montañas (Urqucunapa):</strong> Representan el territorio sagrado, la protección y la fortaleza del pueblo Inga.
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <strong className="text-[#ef6c00]">El Sol (Inti):</strong> Simboliza la energía vital, la claridad del pensamiento y la luz que guía el camino.
                  </div>
                </div>
              </section>

              <section className="guide-section bg-[#fafafa] p-6 rounded-3xl border border-gray-200">
                <h3 className="text-xl font-bold text-[#2e7d32] mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined">assignment_turned_in</span> Evaluación del Impacto Pedagógico
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li><strong>Reconocimiento:</strong> Observar si el estudiante logra nombrar al menos tres símbolos en el entorno digital y cotidiano.</li>
                  <li><strong>Interpretación:</strong> Valorar la capacidad del niño para explicar con sus propias palabras el significado de un símbolo.</li>
                  <li><strong>Actitud:</strong> Tener en cuenta la valoración y respeto hacia los saberes ancestrales y el interés por su identidad cultural.</li>
                </ul>
              </section>
            </div>
          </div>
        )}

        )}
      </div>
    </div>
  );
};

export default Admin;
