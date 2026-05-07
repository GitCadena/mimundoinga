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
          className={`tab-btn ${activeTab === 'arte-guide' ? 'active' : ''}`}
          onClick={() => setActiveTab('arte-guide')}
        >
          Guía: Taller de Arte
        </button>
        <button 
          className={`tab-btn ${activeTab === 'medicine-guide' ? 'active' : ''}`}
          onClick={() => setActiveTab('medicine-guide')}
        >
          Guía: Botica Mágica
        </button>
        <button 
          className={`tab-btn ${activeTab === 'territory-guide' ? 'active' : ''}`}
          onClick={() => setActiveTab('territory-guide')}
        >
          Guía: Territorio
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

        {activeTab === 'arte-guide' && (
          <div className="pedagogical-guide">
            <div className="card-organic guide-card">
              <h2 className="text-3xl font-black text-[#5d4037] mb-6 uppercase">Guía: Taller de Arte Digital</h2>
              
              <section className="guide-section mb-8">
                <h3 className="text-xl font-bold text-[#ef6c00] mb-3 flex items-center gap-2">
                  <BookOpen size={24}/> Propósito Pedagógico y Sentido de la Estrategia
                </h3>
                <p className="text-gray-700 leading-relaxed italic border-l-4 border-[#ff9800] pl-4 bg-[#fff8e1] p-4 rounded-r-xl">
                  "Esta propuesta busca que el docente no solo enseñe tecnología, sino que utilice la plataforma web como un puente de mediación cultural donde el niño de primaria se convierta en un investigador de su propia identidad."
                </p>
                <p className="mt-4 text-gray-700">
                  El objetivo es que los estudiantes reconozcan que el arte de su pueblo es una forma de escritura sagrada que se puede fortalecer mediante el uso de herramientas digitales contemporáneas.
                </p>
              </section>

              <section className="guide-section mb-8">
                <h3 className="text-xl font-bold text-[#2e7d32] mb-4">Contexto de las Plantas y Símbolos</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
                    <strong className="text-[#ef6c00]">Uirru (Maíz):</strong> "El Maíz es el corazón de la Chagra, representa la abundancia y la fuerza de la familia Inga que trabaja unida".
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
                    <strong className="text-[#2196f3]">Atún Yaco (El Gran Río):</strong> "El río es el camino de la vida que limpia el espíritu y conecta nuestras veredas con la selva".
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
                    <strong className="text-[#fbc02d]">Indi y Llajtu (Sol y Plumaje):</strong> "El Sol es nuestro Padre Grande, su luz es el conocimiento que los mayores nos transmiten a través de sus coronas de plumas".
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
                    <strong className="text-[#9c27b0]">Kindi (Colibrí):</strong> "El colibrí es el mensajero que trae noticias de los sueños y nos enseña la delicadeza de la naturaleza".
                  </div>
                </div>
              </section>

              <div className="guide-moments space-y-6">
                <div className="moment-block p-6 bg-[#fafafa] rounded-2xl border-t-8 border-[#ff9800]">
                  <h4 className="font-black text-[#5d4037] mb-2 uppercase">Momento de Apertura: El Despertar del Saber</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Sentados en un <strong>círculo de la palabra</strong>, los niños observarán chumbes y mochilas reales. El maestro explicará que cada figura geométrica es un pensamiento de los abuelos. Se realizará un ejercicio de visualización imaginando ser colibríes sobrevolando una chagra de maíz, preparando el espíritu para lo digital.
                  </p>
                </div>

                <div className="moment-block p-6 bg-[#fafafa] rounded-2xl border-t-8 border-[#4caf50]">
                  <h4 className="font-black text-[#5d4037] mb-2 uppercase">Momento de Desarrollo: La Siembra en el Territorio Digital</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Exploración del Módulo de Arte Inga. Los niños se familiarizan con la pronunciación y plantean preguntas desafiantes sobre la chagra y los símbolos. Al interactuar con el lienzo digital, los niños <strong>tejen su propia historia</strong> acompañados por sonidos de flautas y tambores que refuerzan el orgullo cultural.
                  </p>
                </div>

                <div className="moment-block p-6 bg-[#fafafa] rounded-2xl border-t-8 border-[#2196f3]">
                  <h4 className="font-black text-[#5d4037] mb-2 uppercase">Momento de Cierre: La Cosecha y Socialización</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Regreso al espacio común para compartir las creaciones digitales. Cada estudiante explica sus elecciones de símbolos y plantas medicinales, vinculándolas con las historias familiares. Se resalta que el mensaje ancestral permanece vivo a pesar del uso de tecnología moderna.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'medicine-guide' && (
          <div className="pedagogical-guide">
            <div className="card-organic guide-card">
              <h2 className="text-3xl font-black text-[#5d4037] mb-6 uppercase">Guía: Botica Mágica Ancestral</h2>
              
              <section className="guide-section mb-8 p-6 bg-[#f1f8e9] rounded-3xl border-2 border-[#4caf50]">
                <h3 className="text-xl font-bold text-[#2e7d32] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined">health_and_safety</span> Estructura: El Saber del Yacha Runa
                </h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-[#1b5e20] mb-2 border-b">1. Mensajes del Inventario (Saber de Plantas)</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li><strong>Diente de León:</strong> "Limpia nuestra sangre y nos da fuerza."</li>
                      <li><strong>Manzanilla:</strong> "Calma los dolores y nos ayuda a descansar."</li>
                      <li><strong>Hierbabuena:</strong> "Amiga del estómago (Uigsa). Quita el dolor."</li>
                      <li><strong>Sábila:</strong> "Refresca nuestra piel y sana quemaduras."</li>
                      <li><strong>Caléndula:</strong> "Limpia y cierra las heridas rápido."</li>
                      <li><strong>Toronjil:</strong> "Tranquiliza el corazón y nos da armonía."</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-[#1b5e20] mb-2 border-b">2. Casos de Salud (Retos)</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li><strong>Purificación:</strong> Avatar agotado → Diente de León</li>
                      <li><strong>Digestión:</strong> Dolor de Uigsa → Hierbabuena</li>
                      <li><strong>Descanso:</strong> Insomnio/Dolor → Manzanilla</li>
                      <li><strong>Heridas:</strong> Raspadura/Ardor → Caléndula</li>
                      <li><strong>Emocional:</strong> Corazón acelerado → Toronjil</li>
                      <li><strong>Piel:</strong> Calor por sol → Sábila</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="guide-section mb-8">
                <h3 className="text-xl font-bold text-[#ef6c00] mb-3 flex items-center gap-2">
                  <BookOpen size={24}/> Propósito Pedagógico
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Esta estrategia busca que el estudiante reconozca y valore la medicina ancestral como un pilar fundamental de su identidad. Se pretende que el niño pase de ser un observador pasivo a un <strong>"guardián del saber"</strong>, capaz de identificar soluciones naturales para el bienestar de su comunidad.
                </p>
              </section>

              <div className="guide-moments space-y-6">
                <div className="moment-block p-6 bg-[#fff8e1] rounded-2xl border-l-8 border-[#ff9800]">
                  <h4 className="font-black text-[#5d4037] mb-2 uppercase">1. El Despertar en el Territorio (Caminata)</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Caminata pedagógica por la Chagra para una <strong>"cartografía de los sentidos"</strong>. Los niños tocan, huelen e identifican las plantas en su estado natural antes de ir al aula digital. La Madre Tierra es la primera maestra.
                  </p>
                </div>

                <div className="moment-block p-6 bg-[#e8f5e9] rounded-2xl border-l-8 border-[#4caf50]">
                  <h4 className="font-black text-[#5d4037] mb-2 uppercase">2. Desarrollo: Aprendices en la Chagra Digital</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    El niño asume el rol de <strong>"Aprendiz de Yacha"</strong>. Usa la tecnología para relacionar malestares físicos con las propiedades de las plantas observadas. La voz en lengua Inga valida el conocimiento familiar en la escuela.
                  </p>
                </div>

                <div className="moment-block p-6 bg-[#e3f2fd] rounded-2xl border-l-8 border-[#2196f3]">
                  <h4 className="font-black text-[#5d4037] mb-2 uppercase">3. Cierre: Siembra y Socialización</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Círculo de la palabra para comparar hallazgos. Creación de un <strong>"Dibujo de Poder"</strong> (herbario creativo) con nombres en Inga. El saber regresa al hogar para conversarse con los mayores.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'territory-guide' && (
          <div className="pedagogical-guide">
            <div className="card-organic guide-card">
              <h2 className="text-3xl font-black text-[#5d4037] mb-6 uppercase">Guía: Guardianes del Territorio</h2>
              
              <section className="guide-section mb-8 p-6 bg-[#e0f2f1] rounded-3xl border-2 border-[#00897b]">
                <h3 className="text-xl font-bold text-[#00695c] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined">nature_people</span> Estructura del Juego
                </h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#00897b]">
                    <h4 className="font-bold text-[#00695c] mb-2">Escenarios y Mensajes Bilingües</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-black text-gray-700">A. El Río (Iaku):</p>
                        <p className="text-gray-600">"El agua es vida... / Iakuka nukanchipa llaktapa kaugsaimi ka."</p>
                      </div>
                      <div>
                        <p className="font-black text-gray-700">B. La Chagra (Chagra):</p>
                        <p className="text-gray-600">"La tierra nos da el alimento... / Alpaka mikuitami kuan."</p>
                      </div>
                      <div>
                        <p className="font-black text-gray-700">C. El Camino (Nambita):</p>
                        <p className="text-gray-600">"Caminar por un sendero limpio... / Limpio nambita purispa..."</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#ff9800]">
                    <h4 className="font-bold text-[#e65100] mb-2 text-xs uppercase tracking-widest">Efectos Especiales</h4>
                    <p className="text-xs text-gray-500 italic">El paisaje "brilla" y el audio de interferencia cambia a sonidos de aves cuando el territorio se sana.</p>
                  </div>
                </div>
              </section>

              <section className="guide-section mb-8">
                <h3 className="text-xl font-bold text-[#ef6c00] mb-3 flex items-center gap-2">
                  <BookOpen size={24}/> Propósito Pedagógico
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Fomentar la conciencia ambiental basada en el concepto Inga de <strong>"Territorio como organismo vivo y sagrado"</strong>. Se pretende que el niño identifique las acciones que rompen la armonía y asuma un compromiso ético de cuidado.
                </p>
              </section>

              <div className="guide-moments space-y-6">
                <div className="moment-block p-6 bg-[#fff8e1] rounded-2xl border-l-8 border-[#ff9800]">
                  <h4 className="font-black text-[#5d4037] mb-2 uppercase">1. Caminata de Sabiduría con la Sabedora</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Visita guiada a un lugar sagrado con una <strong>Sabedora</strong> de la comunidad. Los niños escuchan historias sobre cómo los antiguos cuidaban la "Casa Grande" y observan el impacto real de la basura en el espíritu del territorio.
                  </p>
                </div>

                <div className="moment-block p-6 bg-[#e8f5e9] rounded-2xl border-l-8 border-[#4caf50]">
                  <h4 className="font-black text-[#5d4037] mb-2 uppercase">2. Desarrollo: Restaurando la Armonía Digital</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    El juego actúa como una <strong>acción simbólica</strong>. Al limpiar el río o el sendero digital, el niño ve cómo la vida vuelve a brotar (mejor color y sonido). El docente conecta la experiencia con los consejos de la Taita.
                  </p>
                </div>

                <div className="moment-block p-6 bg-[#e3f2fd] rounded-2xl border-l-8 border-[#2196f3]">
                  <h4 className="font-black text-[#5d4037] mb-2 uppercase">3. Cierre: Reflexión y Campaña Ambiental</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Socialización sobre el sentimiento de "sanar" el territorio. Se inicia una <strong>Campaña Ambiental Escolar</strong> con mensajes inspirados en la Taita, cerrando con un compromiso de ser guardianes activos.
                  </p>
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
