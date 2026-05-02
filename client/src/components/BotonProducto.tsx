// src/components/BotonProducto.tsx
import type { Producto } from "../types";

interface Props {
  producto: Producto;
  cantidad?: number;
  onClick: (p: Producto) => void;
}

export default function BotonProducto({ producto, cantidad = 0, onClick }: Props) {
  return (
    <button
      onClick={() => onClick(producto)}
      style={{
        position: "relative",
        padding: "1.2rem",
        background: cantidad > 0 ? "#FFF3DC" : "#FFFFFF",
        border: cantidad > 0 ? "3px solid #BA7517" : "2px solid #E8E0D5",
        borderRadius: 20,
        cursor: "pointer",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        boxShadow: cantidad > 0
          ? "0 4px 12px rgba(186,117,23,0.25)"
          : "0 2px 6px rgba(0,0,0,0.06)",
        transition: "all 0.15s ease",
        WebkitTapHighlightColor: "transparent",
        userSelect: "none",
        minHeight: 120,
      }}
    >
      {/* Badge de cantidad */}
      {cantidad > 0 && (
        <span style={{
          position: "absolute",
          top: -12,
          right: -12,
          background: "#BA7517",
          color: "#fff",
          borderRadius: "50%",
          width: 36,
          height: 36,
          fontSize: "1.2rem",
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}>
          {cantidad}
        </span>
      )}

      {/* Izquierda: Emoji */}
      <span style={{ fontSize: "3.5rem", lineHeight: 1 }}>
        {producto.emoji ?? "🫙"}
      </span>

      {/* Derecha: Nombre y Precio */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
        <span style={{
          fontSize: "1.4rem",
          fontWeight: 700,
          color: "#3D2B00",
          textAlign: "right",
          lineHeight: 1.2,
        }}>
          {producto.nombre}
        </span>

        <span style={{
          background: "#BA7517",
          color: "#fff",
          borderRadius: 20,
          padding: "0.3rem 1rem",
          fontSize: "1.3rem",
          fontWeight: 800,
        }}>
          ${producto.precio}
        </span>
      </div>
    </button>
  );
}
