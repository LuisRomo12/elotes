// src/productos.ts
import type { Producto } from "./types";

export const PRODUCTOS: Producto[] = [
  { id: "cv",  nombre: "Chasca de vaso",    precio: 30, emoji: "🥤" },
  { id: "cm",  nombre: "Chasca mediana",    precio: 45, emoji: "🥤" },
  { id: "cg",  nombre: "Chasca grande",     precio: 65, emoji: "🍺" },
  { id: "el",  nombre: "Elote",             precio: 30, emoji: "🌽" },
  { id: "me",  nombre: "Medio elote",       precio: 15, emoji: "🌽" },
  { id: "gl",  nombre: "Gelatina de leche", precio: 15, emoji: "🍮" },
  { id: "ga",  nombre: "Gelatina de agua",  precio: 10, emoji: "🧃" },
];


