import {  useState, useEffect } from 'react'
import axios from 'axios'

const ModalProfesorTelematica = (idProfesor) => {

  const [thisIdProfesor, setThisIdProfesor] = useState(false);
  const [profesor, setProfesor] = useState();

  useEffect(() => {
    const cargarId = async () => {
      setThisIdProfesor(idProfesor)
    };
    cargarId();
  }, []);

  useEffect(() => {
    const fetchProfesor = async () => {
      const id = thisIdProfesor.idProfesor;
      try {
        const response = await axios.get(`https://start-digital.onrender.com/profesor-telematica?id=${id}`);
       setProfesor(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error al obtener los profesores:', error);
      }
    }

    fetchProfesor();
  }, [thisIdProfesor]);

  return (
    <div className="card-auto">
    <div
href="#"
className="bg-white relative block overflow-hidden rounded-lg border border-gray-100 p-6 sm:p-4 lg:p-6"
>
<span
className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-500 via-blue-300  to-red-600"
></span>

{
  profesor ? (
    <div>
      <div className="sm:flex sm:justify-between sm:gap-4">
    <div>
      <p className="mt-1 text-md font-medium text-gray-600">Profesor</p>
      <p className="text-lg font-bold text-gray-900 sm:text-xl">
      {profesor.data.nombre}
      </p>
    </div>

    <div className="flex justify-center sm:block sm:shrink-0 h-[120px]">
      <img
        alt=""
        src={profesor.data.img}
        className=" rounded-lg object-cover w-full h-full shadow-sm auto-img"
      />
    </div>
  </div>
    <div className="my-2">
      <p>{profesor.data.sobreMi}</p>
    </div>

    <div className="flex flex-col">
      <p className="text-sm text-gray-500">Correo de contacto:</p>
      <p className="text-base font-medium text-gray-600">{profesor.data.correo}</p>
    </div>
    </div>
  ) : (
    <div>
      <p>Cargando...</p>
    </div>
  )
} 
</div>
   </div>
  )
}

export default ModalProfesorTelematica