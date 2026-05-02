// src/api.ts
import type { ItemPedido } from "./types";

export async function guardarVenta(productos: ItemPedido[], total: number) {
  await fetch("/api/ventas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productos, total }),
  });
}

export async function obtenerVentasHoy() {
  const res = await fetch("/api/ventas/hoy");
  return res.json();
}

export async function hacerCorte() {
  const res = await fetch("/api/ventas/corte", { method: "POST" });
  return res.json();
}
