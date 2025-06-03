import Navbar from "./Navbar"
import Foo from "./Foo"
import './Profesores.css'
import { useState, useEffect } from "react"
import axios from 'axios'



const Profesores = () => {

  const [profesores, setProfesores] = useState([]);
    
  useEffect(() => {
    const fetchProfesores = async () => {
        try {
            const response = await axios.get('https://start-digital.onrender.com/profesores');
            setProfesores(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error al obtener los profesores:', error);
        }
    };

    fetchProfesores();
  }, []);
  console.log(profesores)


  return (
    <>
      <div id="inicio" className="page">
      <Navbar />
          <div  className="contenido">
          <section className="section-profesores">
              <h1 className="h1-profesores">Profesores del Decanato de Ciencias y Tecnología</h1>
        <div className="cont-profesores">
          <div className="cont-intro flex justify-center">
          <p className="p-profesores text-j">En esta sección podrás conocer a nuestro talentoso equipo de profesores, quienes destacan por su dedicación a la excelencia académica, la investigación y el compromiso con la formación integral de nuestros estudiantes. </p>
          </div>
        <div className="cont-profesores">
        {profesores.map((profesor) => (
              <div key={profesor.id} className="carta-profesor flex flex-col  overflow-hidden rounded-lg shadow-lg">
                    <div className="cont-img-prof flex-shrink-0">
                      <img className="h-full w-full" src={profesor.data.img} alt="" />
                    </div>
                    <div className="flex flex-col justify-between flex-1 p-6 bg-white">
                      <div className="flex-1">
                        <a href="#" className="block mt-2">
                          <p className="text-xl font-semibold text-neutral-600">{profesor.data.nombre}</p>
                          <p className=" text-base text-gray-500">{profesor.data.sobreMi}.</p>
                          <p className=" text-base text-gray-500">{"Correo de contacto: " + profesor.data.correo}</p>
                          <p className=" text-base text-gray-500">{"Materia que imparte: " + profesor.data.codigoMateria1}</p>
                        </a>
                      </div>
                    </div>
                  </div>
            ))}
        </div>
        </div>
          </section>
      </div>
        <Foo />
      </div>
    </>
  )
}

export default Profesores