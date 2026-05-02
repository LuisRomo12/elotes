// src/types.ts
export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  emoji?: string;
}

export interface ItemPedido extends Producto {
  cantidad: number;
}

export interface Pedido {
  id: number;
  items: ItemPedido[];
  total: number;
  hora: string;
}
