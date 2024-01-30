import express from 'express';
import cors from 'cors';
const app = express();
import { obtenerTodosPosts, crearPost } from './models/model.js';

//Middleware
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log('Servidor corriendo en puerto, 3001.'));

app.get('/posts', async (req, res) => {
   try {
      const posts = await obtenerTodosPosts();
      res.json(posts);
   } catch (error) {
      console.log('Error al obtener los posts: ', error);
      return res.status(500).json({ message: 'Error interno del servidor.' });
   }
});

app.post('/posts', async (req, res) => {
   try {
      const { titulo, imgSrc, descripcion } = req.body;
      console.log(titulo, imgSrc, descripcion);
      if (!titulo || !imgSrc || !descripcion) {
         return res
            .status(400)
            .json({ message: 'Todos los campos son obligatorios.' });
      }
      const post = { titulo, imgSrc, descripcion };
      console.log('body: ', req.body);
      const nuevoPost = await crearPost(post);
      res.json(nuevoPost);
   } catch (error) {
      console.log('Error al crear el post: ', error);
   }
});
