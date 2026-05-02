-- =============================================
-- ROW LEVEL SECURITY — Elotes y Chascas
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- =============================================

-- 1. Crear tablas si no existen
-- =============================================

CREATE TABLE IF NOT EXISTS ventas (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  productos   JSONB    NOT NULL,
  total       NUMERIC  NOT NULL,
  hora        TEXT     NOT NULL,
  fecha       TEXT     NOT NULL,
  sesion_id   TEXT     NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cortes (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sesion_id    TEXT     NOT NULL,
  fecha        TEXT     NOT NULL,
  hora         TEXT     NOT NULL,
  total_ventas NUMERIC  NOT NULL,
  num_pedidos  INTEGER  NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Activar RLS en ambas tablas
-- =============================================

ALTER TABLE ventas ENABLE ROW LEVEL SECURITY;
ALTER TABLE cortes ENABLE ROW LEVEL SECURITY;

-- 3. Política: solo el service_role puede leer y escribir
--    (el backend usa service_role → bypasses RLS automáticamente,
--     pero la política es necesaria para dejar claro quién tiene acceso)
-- =============================================

-- Ventas: bloquear acceso anónimo total
CREATE POLICY "Solo backend - ventas" ON ventas
  FOR ALL
  TO authenticated, anon
  USING (false)
  WITH CHECK (false);

-- Cortes: bloquear acceso anónimo total
CREATE POLICY "Solo backend - cortes" ON cortes
  FOR ALL
  TO authenticated, anon
  USING (false)
  WITH CHECK (false);

-- =============================================
-- RESULTADO ESPERADO:
--   · El service_role key (usado en tu .env) PASA SIEMPRE
--     porque bypasses RLS por diseño de Supabase.
--   · Cualquier intento directo desde el navegador
--     usando la anon key será RECHAZADO (403).
-- =============================================
