import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Conexión temporal a una DB que sí existe
const tempPool = new Pool({
  connectionString: process.env.DATABASE_URL_POSTGRES, // apunta a 'postgres'
});

const DB_NAME = 'test';

async function dropDatabase() {
  try {
    // Terminar conexiones activas a la DB que queremos eliminar
    await tempPool.query(`
      SELECT pg_terminate_backend(pid)
      FROM pg_stat_activity
      WHERE datname = '${DB_NAME}';
    `);

    // Eliminar la base de datos
    await tempPool.query(`DROP DATABASE IF EXISTS ${DB_NAME}`);
    console.log(`🗑 Base de datos '${DB_NAME}' eliminada correctamente`);
  } catch (error) {
    console.error('❌ Error eliminando la base de datos:', error);
  } finally {
    await tempPool.end(); // cerrar la conexión temporal
  }
}

dropDatabase();
