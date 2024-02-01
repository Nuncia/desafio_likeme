import { pool } from '../database/connection.js';

export const obtenerTodosPosts = async () => {
   try {
      const query = 'SELECT * FROM posts';
      const pools = await pool.query(query);
      // console.log('ROWS', pools.rowCount, pools.rows);
      return pools.rows;
   } catch (err) {
      console.log('Error al obtener los posts: ', err);
   }
};

export const crearPost = async (post) => {
   try {
      const query =
         'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3,$4) RETURNING *';
      const values = [post.titulo, post.url, post.descripcion, 0];
      const { rowCount, rows } = await pool.query(query, values);
      return rows;
   } catch (error) {
      throw new Error(error);
   }
};
obtenerTodosPosts();
