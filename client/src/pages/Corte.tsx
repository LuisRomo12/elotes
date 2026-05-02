// src/pages/Corte.tsx
import { useState, useEffect } from "react";
import { obtenerVentasHoy, hacerCorte } from "../api";

interface VentaHoy {
  id: number;
  productos: { nombre: string; cantidad: number; precio: number }[];
  total: number;
  hora: string;
}

export default function Corte() {
  const [ventas, setVentas] = useState<VentaHoy[]>([]);
  const [totalDia, setTotalDia] = useState(0);
  const [corteDone, setCorteDone] = useState(false);
  const [resumen, setResumen] = useState<{ total: number; num_pedidos: number } | null>(null);

  useEffect(() => {
    obtenerVentasHoy().then((data) => {
      setVentas(data.ventas);
      setTotalDia(data.total);
    });
  }, []);

  const cerrarCorte = async () => {
    if (!confirm("¿Seguro que quieres hacer el corte de caja?")) return;
    const data = await hacerCorte();
    setResumen(data);
    setCorteDone(true);
  };

  if (corteDone && resumen) {
    return (
      <div style={{ padding: "2rem 1rem", textAlign: "center", maxWidth: 420, margin: "0 auto" }}>
        <div style={{ fontSize: "clamp(2.5rem, 10vw, 4rem)", marginBottom: "0.75rem" }}>✓</div>
        <h2 style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)", color: "#2e7d32", marginBottom: "0.5rem" }}>
          Corte realizado
        </h2>
        <p style={{ fontSize: "clamp(0.95rem, 3vw, 1.2rem)", color: "#555", marginBottom: "1.5rem" }}>
          Resumen del día
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={cardResumen}>
            <p style={{ fontSize: "0.85rem", color: "#888" }}>Total vendido</p>
            <p className="precio-total">${resumen.total}</p>
          </div>
          <div style={cardResumen}>
            <p style={{ fontSize: "0.85rem", color: "#888" }}>Pedidos</p>
            <p style={{ fontSize: "clamp(1.6rem, 6vw, 2.2rem)", fontWeight: 800, color: "#412402" }}>
              {resumen.num_pedidos}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="titulo-seccion">Corte de caja</h2>

      {/* Tarjetas de resumen */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: "1.25rem" }}>
        <div style={cardResumen}>
          <p style={{ fontSize: "0.82rem", color: "#888" }}>Total del día</p>
          <p className="precio-total">${totalDia}</p>
        </div>
        <div style={cardResumen}>
          <p style={{ fontSize: "0.82rem", color: "#888" }}>Pedidos</p>
          <p style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)", fontWeight: 800, color: "#412402" }}>
            {ventas.length}
          </p>
        </div>
      </div>

      {/* Lista de ventas */}
      {ventas.length === 0 ? (
        <p style={{ textAlign: "center", color: "#aaa", padding: "2rem 0", fontSize: "0.95rem" }}>
          Sin ventas en esta sesión
        </p>
      ) : (
        <div style={{
          background: "#fff",
          border: "1px solid #eee",
          borderRadius: 14,
          overflow: "hidden",
          marginBottom: "1.25rem",
        }}>
          {ventas.map((v, i) => (
            <div key={v.id} style={{
              padding: "0.75rem 1rem",
              borderBottom: i < ventas.length - 1 ? "1px solid #f0f0f0" : "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 8,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "clamp(0.82rem, 3vw, 0.95rem)", color: "#333", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {v.productos.map((p) => `${p.cantidad}x ${p.nombre}`).join(", ")}
                </p>
                <p style={{ fontSize: "0.78rem", color: "#aaa" }}>{v.hora}</p>
              </div>
              <span style={{ fontSize: "clamp(0.9rem, 3vw, 1.1rem)", fontWeight: 700, color: "#412402", flexShrink: 0 }}>
                ${v.total}
              </span>
            </div>
          ))}
        </div>
      )}

      <button onClick={cerrarCorte} style={{
        width: "100%",
        padding: "1rem",
        fontSize: "clamp(1rem, 4vw, 1.3rem)",
        fontWeight: 700,
        background: "#c62828",
        color: "#fff",
        border: "none",
        borderRadius: 14,
        cursor: "pointer",
      }}>
        🔒 Hacer corte de caja
      </button>
    </div>
  );
}

const cardResumen: React.CSSProperties = {
  background: "#f9f5f0",
  borderRadius: 14,
  padding: "0.875rem",
  textAlign: "center",
};
