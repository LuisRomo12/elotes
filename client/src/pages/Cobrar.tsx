// src/pages/Cobrar.tsx
import { useState } from "react";
import type { Pedido } from "../types";
import { guardarVenta } from "../api";

interface Props {
  pedidos: Pedido[];
  onCobrado: (id: number) => void;
}

function CalculadorCambio({ total, onCobrar }: { total: number; onCobrar: () => void }) {
  const [recibido, setRecibido] = useState<string>("");

  const cambio = recibido !== "" ? Number(recibido) - total : null;
  const suficiente = cambio !== null && cambio >= 0;
  const billetes = [20, 50, 100, 200, 500];

  return (
    <div style={{ marginTop: 14 }}>
      <p style={{ fontSize: "0.82rem", color: "#888", marginBottom: 6 }}>¿Con cuánto paga?</p>

      {/* Billetes rápidos — flex wrap */}
      <div className="billetes-grid">
        {billetes.map((b) => (
          <button
            key={b}
            onClick={() => setRecibido(String(b))}
            style={{
              padding: "0.45rem 0.65rem",
              border: recibido === String(b) ? "2px solid #BA7517" : "2px solid #ddd",
              borderRadius: 10,
              background: recibido === String(b) ? "#FFF3DC" : "#f5f5f5",
              color: recibido === String(b) ? "#BA7517" : "#555",
              fontWeight: 700,
              fontSize: "clamp(0.85rem, 3vw, 1rem)",
              cursor: "pointer",
              minWidth: 48,
            }}
          >
            ${b}
          </button>
        ))}
        <input
          type="number"
          inputMode="numeric"
          placeholder="Otro…"
          value={billetes.includes(Number(recibido)) ? "" : recibido}
          onChange={(e) => setRecibido(e.target.value)}
          style={{
            width: 72,
            padding: "0.4rem 0.5rem",
            border: "2px solid #ddd",
            borderRadius: 10,
            fontSize: "0.95rem",
            outline: "none",
          }}
        />
      </div>

      {/* Cambio */}
      {cambio !== null && (
        <div style={{
          background: suficiente ? "#E8F5E9" : "#FFEBEE",
          border: `2px solid ${suficiente ? "#4CAF50" : "#f44336"}`,
          borderRadius: 12,
          padding: "0.65rem 1rem",
          marginBottom: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)", color: suficiente ? "#2e7d32" : "#c62828", fontWeight: 600 }}>
            {suficiente ? "💰 Cambio" : "⚠️ Falta"}
          </span>
          <span style={{ fontSize: "clamp(1.4rem, 5vw, 1.8rem)", fontWeight: 800, color: suficiente ? "#2e7d32" : "#c62828" }}>
            ${Math.abs(cambio)}
          </span>
        </div>
      )}

      <button
        onClick={onCobrar}
        disabled={cambio !== null && !suficiente}
        style={{
          width: "100%",
          padding: "0.9rem",
          fontSize: "clamp(1rem, 3.5vw, 1.2rem)",
          fontWeight: 700,
          background: cambio !== null && !suficiente ? "#ccc" : "#2e7d32",
          color: "#fff",
          border: "none",
          borderRadius: 12,
          cursor: cambio !== null && !suficiente ? "not-allowed" : "pointer",
          transition: "background 0.2s",
        }}
      >
        ✓ Cobrado
      </button>
    </div>
  );
}

export default function Cobrar({ pedidos, onCobrado }: Props) {
  const cobrar = async (pedido: Pedido) => {
    await guardarVenta(pedido.items, pedido.total);
    onCobrado(pedido.id);
  };

  if (pedidos.length === 0) {
    return (
      <div style={{ padding: "3rem 1rem", textAlign: "center", color: "#888" }}>
        <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>🧾</div>
        <p style={{ fontSize: "clamp(1rem, 4vw, 1.3rem)" }}>Sin pedidos pendientes</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="titulo-seccion">Cobrar</h2>

      {pedidos.map((pedido, idx) => (
        <div key={pedido.id} style={{
          background: "#fff",
          border: "2px solid #BA7517",
          borderRadius: 18,
          padding: "1rem",
          marginBottom: 14,
          boxShadow: "0 4px 16px rgba(186,117,23,0.12)",
        }}>
          {/* Cabecera */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: "clamp(0.85rem, 3vw, 1rem)", color: "#888" }}>
              Pedido #{idx + 1}
              <span style={{ fontSize: "0.8rem", color: "#bbb", marginLeft: 6 }}>{pedido.hora}</span>
            </span>
            <span style={{ fontSize: "clamp(1.3rem, 5vw, 1.7rem)", fontWeight: 800, color: "#BA7517" }}>
              ${pedido.total}
            </span>
          </div>

          {/* Ítems */}
          {pedido.items.map((item) => (
            <div key={item.id} style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "clamp(0.82rem, 3vw, 0.95rem)",
              color: "#555",
              marginBottom: 4,
            }}>
              <span>{item.emoji} {item.cantidad}x {item.nombre}</span>
              <span style={{ color: "#888", flexShrink: 0 }}>${item.precio * item.cantidad}</span>
            </div>
          ))}

          <CalculadorCambio total={pedido.total} onCobrar={() => cobrar(pedido)} />
        </div>
      ))}
    </div>
  );
}
