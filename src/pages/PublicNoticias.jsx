import Navbar from "./Navbar";
import Foo from "./Foo";
import './Profesores.css';
import './PublicView.css';
import { useState, useEffect } from "react";
import axios from 'axios';

const PublicNoticias = () => {
    const [profesores, setProfesores] = useState([]);
    
    useEffect(() => {
      const fetchProfesores = async () => {
          try {
              const response = await axios.get('https://start-digital.onrender.com/gestion/noticias/');
              setProfesores(response.data);
              console.log(response.data);
              console.log(profesores);
          } catch (error) {
              console.error('Error al obtener los profesores:', error);
          }
      };
  
      fetchProfesores();
    }, []);
      

  return (
    <>
      <div id="inicio" className="page">
        <Navbar />
        <section className="sec-general-banner">
          <div className="cont-h1-tele">
            <h1 className="h1-tele font-robot font-normal text-white ">Noticias</h1>
          </div>
        </section>
        <div className="contenido">
          <section className="section-profesores">
          <h1 className="h1-pags">Noticias de Start Digital</h1>
<div className="cont-intro flex justify-center mb-4">
  <p className="text-center text-gray-600 mb-8 px-4">En Start Digital, nos comprometemos a mantener a nuestra comunidad informada sobre las últimas novedades y eventos en el mundo de la fotografía y la gestión de redes sociales. Te invitamos a explorar nuestra sección de noticias, donde encontrarás información relevante sobre nuestros proyectos, logros, consejos útiles y actualizaciones sobre actividades que pueden beneficiar a tu negocio.</p>
</div>


            <div className="cont-intro flex justify-center mb-8">
              
            <div className="cont-profesores">
            {profesores.map((profesor) => (
              <div key={profesor.id} className="carta-profesor flex flex-col overflow-hidden rounded-lg shadow-lg">
                <a href={`/noticias/${profesor.data.slug}`}>
                  <div className="cont-img-prof flex-shrink-0">
                    <img className="h-full w-full" src={profesor.data.img} alt="" />
                  </div>
                  <div className="flex flex-col justify-between flex-1 p-6 bg-white">
                    <div className="flex-1">
                      <a href={`/noticias/${profesor.data.slug}`} className="block mt-2">
                        <p className="text-xl font-semibold text-neutral-600">{profesor.data.titulo}</p>
                        <p
                          style={{
                            height: "72px",
                            overflow: "hidden",        // Oculta el contenido que desborda
                            textOverflow: "ellipsis",  // Agrega "..." al final si el texto es demasiado largo
                            display: "-webkit-box",    // Usar un contenedor flexible
                            WebkitBoxOrient: "vertical", // Orientación vertical
                            lineClamp: 3,              // Número de líneas que se mostrarán
                          }}
                          className="text-base text-gray-500"
                        >
                          {profesor.data.descripcion}
                        </p>

                        <div className="flex">
                          <p className="text-base py-1 px-2 rounded-pill text-white mt-2" style={{ background: "#011240", borderRadius: "20px" }}>{profesor.data.fecha}</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </a>
              </div>
            ))}

        </div>

            </div>
          </section>
        </div>
        <Foo />
      </div>
    </>
  );
};

export default PublicNoticias;
