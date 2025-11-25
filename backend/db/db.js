// db.js — versión final con variables de entorno

import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // cargar .env en local

const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === "true"
    ? { rejectUnauthorized: false } // producción (Render)
    : false                         // local
});

client.connect()
  .then(() => console.log("✅ Conexión a PostgreSQL exitosa"))
  .catch(err => console.error("❌ Error conectando a PostgreSQL:", err));

export default client;
