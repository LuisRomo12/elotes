// src/pages/NuevoPedido.tsx
import { useState } from "react";
import { PRODUCTOS } from "../productos";
import type { Producto, ItemPedido, Pedido } from "../types";
import BotonProducto from "../components/BotonProducto";

interface Props {
  onPedidoGuardado: (pedido: Pedido) => void;
}

let nextId = 1;

export default function NuevoPedido({ onPedidoGuardado }: Props) {
  const [items, setItems] = useState<ItemPedido[]>([]);

  const agregar = (producto: Producto) => {
    setItems((prev) => {
      const ex = prev.find((i) => i.id === producto.id);
      if (ex) return prev.map((i) => i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i);
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id: string, delta: number) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id)!;
      if (item.cantidad + delta <= 0) return prev.filter((i) => i.id !== id);
      return prev.map((i) => i.id === id ? { ...i, cantidad: i.cantidad + delta } : i);
    });
  };

  const total = items.reduce((s, i) => s + i.precio * i.cantidad, 0);

  const guardar = () => {
    if (items.length === 0) return;
    onPedidoGuardado({
      id: nextId++,
      items: [...items],
      total,
      hora: new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
    });
    setItems([]);
  };

  return (
    <div>
      <h2 className="titulo-seccion">Nuevo pedido</h2>

      {/* Grid responsivo de productos */}
      <div className="grid-productos">
        {PRODUCTOS.map((p) => {
          const enPedido = items.find((i) => i.id === p.id);
          return (
            <BotonProducto
              key={p.id}
              producto={p}
              cantidad={enPedido?.cantidad ?? 0}
              onClick={agregar}
            />
          );
        })}
      </div>

      {/* Resumen del pedido */}
      {items.length > 0 && (
        <div style={{
          background: "#FFF8EE",
          border: "2px solid #EF9F27",
          borderRadius: 18,
          padding: "1rem",
        }}>
          <h3 style={{ fontSize: "clamp(1rem, 3.5vw, 1.2rem)", marginBottom: "0.875rem", color: "#412402", fontWeight: 700 }}>
            🧾 Pedido actual
          </h3>

          {items.map((item) => (
            <div key={item.id} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
              gap: 6,
            }}>
              <span style={{ fontSize: "clamp(0.85rem, 3vw, 1rem)", flex: 1, color: "#3D2B00", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.emoji} {item.nombre}
              </span>

              <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                <button onClick={() => cambiarCantidad(item.id, -1)} style={btnMenos}>−</button>
                <span style={{ fontSize: "1rem", fontWeight: 700, minWidth: 20, textAlign: "center", color: "#412402" }}>
                  {item.cantidad}
                </span>
                <button onClick={() => cambiarCantidad(item.id, 1)} style={btnMas}>+</button>
              </div>

              <span style={{ fontSize: "clamp(0.85rem, 3vw, 1rem)", minWidth: 44, textAlign: "right", color: "#BA7517", fontWeight: 700, flexShrink: 0 }}>
                ${item.precio * item.cantidad}
              </span>
            </div>
          ))}

          <div style={{
            borderTop: "1.5px solid #EF9F27",
            marginTop: 10,
            paddingTop: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span style={{ fontSize: "clamp(1.1rem, 4vw, 1.3rem)", fontWeight: 700, color: "#412402" }}>Total</span>
            <span className="precio-total">${total}</span>
          </div>

          <button onClick={guardar} style={btnGuardar}>✓ Guardar pedido</button>
          <button onClick={() => setItems([])} style={btnCancelar}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

const btnMenos: React.CSSProperties = {
  width: 34, height: 34, borderRadius: 8,
  border: "none", background: "#FFDDDD", color: "#C00",
  fontSize: "1.2rem", fontWeight: 800, cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
};

const btnMas: React.CSSProperties = {
  width: 34, height: 34, borderRadius: 8,
  border: "none", background: "#D4EDDA", color: "#1a5c2a",
  fontSize: "1.2rem", fontWeight: 800, cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
};

const btnGuardar: React.CSSProperties = {
  marginTop: 14, width: "100%", padding: "0.9rem",
  fontSize: "clamp(1rem, 3.5vw, 1.2rem)", fontWeight: 700,
  background: "#BA7517", color: "#fff",
  border: "none", borderRadius: 12, cursor: "pointer",
};

const btnCancelar: React.CSSProperties = {
  marginTop: 8, width: "100%", padding: "0.6rem",
  fontSize: "0.95rem", background: "transparent",
  border: "none", color: "#999", cursor: "pointer",
};
