// src/migrate/migrate.ts
import migrateAuth from './migrate-auth';
import pool from '../config/db'; 

async function runMigrations() {
  try {
    console.log('🚀 Iniciando migraciones...');

    await migrateAuth(); // migración auth

    console.log('✅ Todas las migraciones completadas');
  } catch (error) {
    console.error('❌ Error ejecutando migraciones:', error);
  } finally {
    await pool.end(); // cerrar la conexión solo aquí
  }
}

runMigrations();