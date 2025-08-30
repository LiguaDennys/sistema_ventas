import pool from '../config/db';
import bcrypt from 'bcryptjs';

async function migrateAuth() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    const hashedPassword = await bcrypt.hash('123456', 10);
    await pool.query(`
      INSERT INTO users (username, password)
      VALUES ('admin', '${hashedPassword}')
      ON CONFLICT DO NOTHING;
    `);

    console.log('✅ Migración de auth completada');
  } catch (error) {
    console.error('❌ Error en migrate-auth:', error);
  } 
}

export default migrateAuth;
