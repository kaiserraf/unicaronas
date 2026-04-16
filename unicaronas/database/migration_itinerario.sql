-- Migração para adicionar itinerário (pontos intermediários) às caronas
ALTER TABLE caronas ADD COLUMN IF NOT EXISTS itinerario TEXT;
COMMENT ON COLUMN caronas.itinerario IS 'Lista de bairros ou pontos de referência por onde o motorista passa, separados por vírgula.';
