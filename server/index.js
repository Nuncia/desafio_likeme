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
      // console.log('posts:', posts);
      const respuesta = {
         status: 'Con registros',
         msg: 'Datos encontrados',
         data: posts,
         error: false,
      };
      res.json({
         posts: posts.length > 0 ? posts : [],
      });
   } catch (error) {
      console.log('Error al obtener los posts: ', error);
      const respuesta = {
         status: 'Error desconocido',
         msg: 'Error interno desconocido',
         data: [],
         error: false,
      };
      res.status(500).json(respuesta);
   }
});

app.post('/posts', async (req, res) => {
   try {
      const { titulo, imgSrc, descripcion } = req.body;
      console.log(titulo, imgSrc, descripcion);
      if (!titulo || !imgSrc || !descripcion) {
         return res.status(400).json({
            status: 'Bad request',
            msg: 'No se encuentran datos',
         });
      } else {
         const post = { titulo, imgSrc, descripcion };
         const nuevoPost = await crearPost(post);
         // res.json(nuevoPost);
         res.status(200).json({ data: nuevoPost });
      }
   } catch (error) {
      console.log('Error al crear el post: ', error);
      return res.status(500).json({ message: 'Error interno del servidor.' });
   }
});
