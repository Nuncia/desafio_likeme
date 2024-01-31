import axios from 'axios';
import { useEffect, useState } from 'react';
import Form from './components/Form';
import Post from './components/Post';
// import { axios } from 'axios';

const urlBaseServer = 'http://localhost:3001';

function App() {
   const [titulo, setTitulo] = useState('');
   const [imgSrc, setImgSRC] = useState('');
   const [descripcion, setDescripcion] = useState('');
   const [posts, setPosts] = useState([]);

   const getPosts = async () => {
      const posts = await axios.get(urlBaseServer + '/posts');
      console.log('getPosts: ', posts);

      setPosts([...posts.data]);
   };

   const agregarPost = async () => {
      const post = { titulo, imgSrc, descripcion };
      console.log(post);
      await axios.post(urlBaseServer + '/posts', post);
      // console.log(respuesta);
      getPosts();
   };

   // const agregarPost = async () => {
   //    try {
   //       const post = { titulo, imgSrc, descripcion };
   //       // console.log('POST: ', post);
   //       await axios.post(urlBaseServer + '/posts', post);
   //       getPosts();
   //    } catch (error) {
   //       console.log('Error en agregarPost: ', error);
   //       return alert('Error en agregarPost: ', error);
   //    }
   // };

   // este método se utilizará en el siguiente desafío
   const like = async (id) => {
      await axios.put(urlBaseServer + `/posts/like/${id}`);
      getPosts();
   };

   // este método se utilizará en el siguiente desafío
   const eliminarPost = async (id) => {
      await axios.delete(urlBaseServer + `/posts/${id}`);
      getPosts();
   };

   useEffect(() => {
      getPosts();
   }, []);

   return (
      <div className="App">
         <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
         <div className="row m-auto px-5">
            <div className="col-12 col-sm-4">
               <Form
                  setTitulo={setTitulo}
                  setImgSRC={setImgSRC}
                  setDescripcion={setDescripcion}
                  agregarPost={agregarPost}
               />
            </div>
            <div className="col-12 col-sm-8 px-5 row posts align-items-start gap-3">
               {posts.length > 0 ? (
                  posts.map((post, i) => (
                     <Post
                        key={i}
                        post={post}
                        like={like}
                        eliminarPost={eliminarPost}
                     />
                  ))
               ) : (
                  <p>No hay post disponibles</p>
               )}
            </div>
         </div>
      </div>
   );
}

export default App;
