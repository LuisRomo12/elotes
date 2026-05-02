// src/App.tsx
import { useState } from "react";
import type { Pedido } from "./types";
import NuevoPedido from "./pages/NuevoPedido";
import Cobrar from "./pages/Cobrar";
import Corte from "./pages/Corte";

type Tab = "nuevo" | "cobrar" | "corte";

export default function App() {
  const [tab, setTab] = useState<Tab>("nuevo");
  const [pedidosPendientes, setPedidosPendientes] = useState<Pedido[]>([]);

  const agregarPedido = (pedido: Pedido) => {
    setPedidosPendientes((prev) => [...prev, pedido]);
    setTab("cobrar");
  };

  const cobrarPedido = (id: number) => {
    setPedidosPendientes((prev) => prev.filter((p) => p.id !== id));
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "nuevo",  label: "🌽 Pedido" },
    { id: "cobrar", label: `💵 Cobrar${pedidosPendientes.length > 0 ? ` (${pedidosPendientes.length})` : ""}` },
    { id: "corte",  label: "📋 Corte" },
  ];

  return (
    <div style={{ minHeight: "100dvh", background: "#fffdf9", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header className="app-header">
        <h1>🌽 Elotes y Chascas</h1>
      </header>

      {/* Tabs */}
      <nav className="app-tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`app-tab${tab === t.id ? " activo" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* Contenido */}
      <main className="app-content">
        {tab === "nuevo"  && <NuevoPedido onPedidoGuardado={agregarPedido} />}
        {tab === "cobrar" && <Cobrar pedidos={pedidosPendientes} onCobrado={cobrarPedido} />}
        {tab === "corte"  && <Corte />}
      </main>
    </div>
  );
}
