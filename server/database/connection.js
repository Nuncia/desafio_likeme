import pk from 'pg';
// require('dotenv').config();
import dotenv from 'dotenv/config';

const { Pool } = pk;

export const pool = new Pool({
   user: process.env.DB_USER,
   host: process.env.DB_HOST,
   database: process.env.DB_DATABASE,
   password: process.env.DB_PASSWORD,
   port: 5433,
   allowExitOnIdle: true,
});

const getDatabase = async () => {
   try {
      const { rows } = await pool.query('SELECT * FROM posts');
      console.log('Base de datos conectada', rows);
   } catch (error) {
      console.log('Error al conectarse a la base de datos', error);
   }
};

// getDatabase();

// module.exports = pool;
