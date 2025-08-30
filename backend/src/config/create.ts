// import pool from './db'


// const DB_NAME = 'test';

// async function createDatabase() {
//     try{
//         await pool.query(`CREATE DATABASE ${DB_NAME}`);
//         console.log(`✅ Base de datos '${DB_NAME}' creada correctamente`);
//     } catch (error:any) {
//         if (error.code === '42P04') {
//             console.error(`⚠️ La base de datos '${DB_NAME}' ya existe`);
//         } else {
//             console.error('❌ Error creando la base de datos:', error);
//         }   
//     }finally{
//         await pool.end();
//     }
// }

// createDatabase();
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Conexión temporal a una DB que sí existe
const tempPool = new Pool({
  connectionString: process.env.DATABASE_URL_POSTGRES, // apunta a 'postgres'
});

const DB_NAME = 'test';

async function createDatabase() {
  try {
    await tempPool.query(`CREATE DATABASE ${DB_NAME}`);
    console.log(`✅ Base de datos '${DB_NAME}' creada correctamente`);
  } catch (error: any) {
    if (error.code === '42P04') { // DB ya existe
      console.log(`⚠️ La base de datos '${DB_NAME}' ya existe`);
    } else {
      console.error('❌ Error creando la base de datos:', error);
    }
  } finally {
    await tempPool.end();
  }
}

createDatabase();
