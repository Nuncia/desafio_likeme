import { pool } from '../database/connection.js';

export const obtenerTodosPosts = async () => {
   try {
      const query = 'SELECT * FROM posts';
      const { rows } = await pool.query(query);
      return rows;
   } catch (err) {
      console.log('Error al obtener los posts: ', err);
   }
};

export const crearPost = async (post) => {
   try {
      console.log('crearPost: ', post);
      const query =
         'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3,$4) RETURNING *';
      const values = [post.titulo, post.imgSrc, post.descripcion, post.likes];
      const { rows } = await pool.query(query, values);
      console.log(rows);
      return rows;
   } catch (error) {
      console.log('Error al crear el post: ', error);
   }
};
