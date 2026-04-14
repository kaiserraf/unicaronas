const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Carregar .env manualmente para garantir que as aspas não atrapalhem
const envPath = path.join(__dirname, '.env');
const envConfig = fs.readFileSync(envPath, 'utf8');
const config = {};
envConfig.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    let value = parts.slice(1).join('=').trim();
    // Remover aspas se existirem
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    config[key] = value;
  }
});

const pool = new Pool({
  host:     config.DB_HOST     || 'localhost',
  port:     parseInt(config.DB_PORT) || 5432,
  database: config.DB_NAME     || 'unicaronas',
  user:     config.DB_USER     || 'postgres',
  password: String(config.DB_PASSWORD || ''),
});

async function run() {
  try {
    console.log('Conectando ao banco:', config.DB_NAME);
    await pool.query("ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS perfil_tipo VARCHAR(20) NOT NULL DEFAULT 'misto' CHECK (perfil_tipo IN ('estudante','motorista','misto'))");
    console.log('✅ Coluna perfil_tipo ok!');
    await pool.query("ALTER TABLE caronas ADD COLUMN IF NOT EXISTS justificativa_cancelamento TEXT");
    console.log('✅ Coluna justificativa_cancelamento ok!');
  } catch (e) {
    console.error('❌ Erro:', e.message);
  } finally {
    await pool.end();
    process.exit();
  }
}

run();