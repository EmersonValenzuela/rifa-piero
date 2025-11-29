// ==================== App.js ====================
import React, { useState } from 'react';
import './App.css';

const RifaApp = () => {
  const premios = [
    { num: 1, premio: "Yape de S/25.00" },
    { num: 2, premio: "Sorpresa" },
    { num: 3, premio: "Jarra Hervidora" },
    { num: 4, premio: "Desayuno" },
    { num: 5, premio: "Yape de S/25.00" },
    { num: 6, premio: "Broaster" },
    { num: 7, premio: "Perfume" },
    { num: 8, premio: "Desayuno" },
    { num: 9, premio: "Yape de S/25.00" },
    { num: 10, premio: "Broaster" },
    { num: 11, premio: "Kit de Maquillaje" },
    { num: 12, premio: "Yape de S/25.00" }
  ];

  // Números vendidos iniciales desde tu documento
  const [vendidos, setVendidos] = useState({
    1: { nombre: "KATY CHOQUE", telefono: "" },
    2: { nombre: "GIANINA MITMA", telefono: "" },
    8: { nombre: "DEYSI SOLORZANO", telefono: "" },
    13: { nombre: "GIANINA MITMA", telefono: "" },
    35: { nombre: "DEYSI VICENSIO", telefono: ""}
  });

  const totalNumeros = 40;
  const precioNumero = "S/5.00"; // Ajusta según tu precio

  const numeros = Array.from({ length: totalNumeros }, (_, i) => i + 1);

  const compartir = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Gran Rifa Pro Ayuda Social',
        text: '🎁 ¡Participa en nuestra rifa! Grandes premios te esperan.',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        {/* Header */}
        <div className="header-card">
          <div className="header-content">
            <div className="badge">🎉 RIFA ACTIVA</div>
            <h1 className="title">Gran Rifa Pro Ayuda Social</h1>
            <p className="subtitle">¡Participa y gana increíbles premios! 🎁</p>
            <div className="info-row">
              <div className="info-badge info-badge-purple">
                <span className="info-label">Precio:</span> {precioNumero}
              </div>
              <div className="info-badge info-badge-green">
                <span className="info-label">Disponibles:</span> {totalNumeros - Object.keys(vendidos).length}/{totalNumeros}
              </div>
            </div>
          </div>
        </div>

        {/* Premios */}
        <div className="section-card">
          <div className="section-header">
            <span className="section-icon">🏆</span>
            <h2 className="section-title">Premios</h2>
          </div>
          <div className="premios-grid">
            {premios.map((p) => (
              <div key={p.num} className="premio-card">
                <div className="premio-content">
                  <div className="premio-number">{p.num}</div>
                  <p className="premio-text">{p.premio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Números */}
        <div className="section-card">
          <div className="section-header">
            <span className="section-icon">🎫</span>
            <h2 className="section-title">Números Disponibles</h2>
          </div>
          
          <div className="legend">
            <div className="legend-item">
              <div className="legend-box legend-available"></div>
              <span>Disponible</span>
            </div>
            <div className="legend-item">
              <div className="legend-box legend-sold"></div>
              <span>Vendido</span>
            </div>
          </div>

          <div className="numeros-grid">
            {numeros.map((num) => {
              const isVendido = vendidos[num];
              return (
                <div
                  key={num}
                  className={`numero-box ${isVendido ? 'vendido' : 'disponible'}`}
                  title={isVendido ? `Vendido a: ${isVendido.nombre}` : 'Disponible'}
                >
                  {num}
                  {isVendido && (
                    <div className="sold-overlay">
                      <div className="cross-line line-1"></div>
                      <div className="cross-line line-2"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Lista de vendidos */}
          {Object.keys(vendidos).length > 0 && (
            <div className="vendidos-section">
              <h3 className="vendidos-title">📋 Números Vendidos</h3>
              <div className="vendidos-grid">
                {Object.entries(vendidos).map(([num, data]) => (
                  <div key={num} className="vendido-item">
                    <div className="vendido-number">{num}</div>
                    <div className="vendido-info">
                      <p className="vendido-nombre">{data.nombre}</p>
                      {data.telefono && (
                        <p className="vendido-telefono">{data.telefono}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RifaApp;
