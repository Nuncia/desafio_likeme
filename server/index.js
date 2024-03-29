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
      // console.log('Error al obtener los posts: ', error);
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
      const { titulo, url, descripcion } = req.body;
      if (!titulo || !url || !descripcion) {
         const respuesta = {
            status: 'Faltan datos',
            msg: 'Todos los campos son requeridos.',
            error: true,
         };
         res.json({
            respuesta,
         });
      } else {
         const post = { titulo, url, descripcion };
         const nuevoPost = await crearPost(post);
         const respuesta = {
            status: 'Registro creado',
            msg: 'Registro creado con éxito.',
            error: false,
         };
         res.json({
            respuesta,
         });
      }
   } catch (error) {
      console.log('Error al crear el post: ', error);
      return res.status(500).json({ message: 'Error interno del servidor.' });
   }
});
