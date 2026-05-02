// server/routes/ventas.js
const express = require("express");
const router = express.Router();
const supabase = require("../db");
const { randomUUID } = require("crypto");

let sesionActual = randomUUID();

// Guardar una venta
router.post("/", async (req, res) => {
  const { productos, total } = req.body;
  const ahora = new Date();
  const hora = ahora.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
  const fecha = ahora.toISOString().split("T")[0];

  const { error } = await supabase
    .from("ventas")
    .insert({ productos, total, hora, fecha, sesion_id: sesionActual });

  if (error) return res.status(500).json({ error: error.message });
  res.json({ ok: true });
});

// Ventas de la sesión actual
router.get("/hoy", async (req, res) => {
  const { data, error } = await supabase
    .from("ventas")
    .select("*")
    .eq("sesion_id", sesionActual)
    .order("id", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  const total = data.reduce((s, v) => s + v.total, 0);
  res.json({ ventas: data, total });
});

// Corte de caja
router.post("/corte", async (req, res) => {
  const { data, error } = await supabase
    .from("ventas")
    .select("*")
    .eq("sesion_id", sesionActual);

  if (error) return res.status(500).json({ error: error.message });

  const total = data.reduce((s, v) => s + v.total, 0);
  const ahora = new Date();

  await supabase.from("cortes").insert({
    sesion_id: sesionActual,
    fecha: ahora.toISOString().split("T")[0],
    hora: ahora.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
    total_ventas: total,
    num_pedidos: data.length,
  });

  sesionActual = randomUUID();
  res.json({ ok: true, total, num_pedidos: data.length });
});

module.exports = router;
