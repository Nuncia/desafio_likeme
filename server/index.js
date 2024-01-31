import express from 'express';
import cors from 'cors';
const app = express();
import morgan from 'morgan';
import { obtenerTodosPosts, crearPost } from './models/model.js';

//Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log('Servidor corriendo en puerto, 3001.'));

app.get('/posts', async (req, res) => {
   try {
      const posts = await obtenerTodosPosts();
      console.log('posts:', posts);
      if (posts.length > 0) {
         res.status(200).json(posts);
      } else {
         res.status(404).json({
            status: 'Not Found',
            msg: 'No se encuentran datos',
         });
      }
   } catch (error) {
      console.log('Error al obtener los posts: ', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
   }
});

app.post('/posts', async (req, res) => {
   try {
      const { titulo, imgSrc, descripcion } = req.body;
      // console.log(titulo, imgSrc, descripcion);
      if (!titulo || !imgSrc || !descripcion) {
         return res.status(400).json({
            status: 'Bad request',
            msg: 'No se encuntran datos',
         });
      } else {
         const post = { titulo, imgSrc, descripcion };
         const nuevoPost = await crearPost(post);
         // res.json(nuevoPost);
         res.status(201).json({ data: rows });
      }
   } catch (error) {
      console.log('Error al crear el post: ', error);
      return res.status(500).json({ message: 'Error interno del servidor.' });
   }
});
