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
        padding: "1rem 0.75rem",
        background: cantidad > 0 ? "#FFF3DC" : "#FFFFFF",
        border: cantidad > 0 ? "2.5px solid #BA7517" : "2px solid #E8E0D5",
        borderRadius: 18,
        cursor: "pointer",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.4rem",
        boxShadow: cantidad > 0
          ? "0 4px 12px rgba(186,117,23,0.25)"
          : "0 2px 6px rgba(0,0,0,0.06)",
        transition: "all 0.15s ease",
        WebkitTapHighlightColor: "transparent",
        userSelect: "none",
        minHeight: 110,
      }}
    >
      {/* Badge de cantidad */}
      {cantidad > 0 && (
        <span style={{
          position: "absolute",
          top: -10,
          right: -10,
          background: "#BA7517",
          color: "#fff",
          borderRadius: "50%",
          width: 26,
          height: 26,
          fontSize: "0.85rem",
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
        }}>
          {cantidad}
        </span>
      )}

      {/* Emoji */}
      <span style={{ fontSize: "2.4rem", lineHeight: 1 }}>
        {producto.emoji ?? "🫙"}
      </span>

      {/* Nombre */}
      <span style={{
        fontSize: "0.88rem",
        fontWeight: 600,
        color: "#3D2B00",
        textAlign: "center",
        lineHeight: 1.2,
      }}>
        {producto.nombre}
      </span>

      {/* Precio */}
      <span style={{
        background: "#BA7517",
        color: "#fff",
        borderRadius: 20,
        padding: "0.2rem 0.7rem",
        fontSize: "0.95rem",
        fontWeight: 700,
      }}>
        ${producto.precio}
      </span>
    </button>
  );
}

