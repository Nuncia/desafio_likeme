import pk from 'pg';
// require('dotenv').config();
import dotenv from 'dotenv/config';

const { Pool } = pk;

export const pool = new Pool({
   user: DB_USER,
   host: DB_HOST,
   database: DB_DATABASE,
   password: DB_PASSWORD,
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
