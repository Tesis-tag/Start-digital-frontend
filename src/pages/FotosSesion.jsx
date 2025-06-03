// FotosSesion.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './Calendario.css';
import Sidebar from "./Sidebar";
import burger from '../img/bars-solid.svg';

const FotosSesion = () => {
  const { id } = useParams(); // Obtener el ID de la sesión de la URL
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para controlar la visibilidad del Sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
};

  useEffect(() => {
    const fetchFotos = async () => {
      try {
        const response = await axios.get(`https://start-digital.onrender.com/gestion/sesiones-fotos/sesion/${id}`);
        setFotos(response.data.data.fotos || []); // Asegúrate de acceder a la ruta correcta
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las fotos:', error);
        setError('Error al cargar las fotos.'); // Manejo de errores
        setLoading(false);
      }
    };
    fetchFotos();
  }, [id]);

  if (loading) {
    return <div>Cargando fotos...</div>; // Mensaje de carga
  }

  if (error) {
    return <div>{error}</div>; // Mensaje de error
  }

  return (
    <>
        <div className="flex">
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    <div className={`content ${isSidebarOpen ? 'expanded' : ''}`}>
      <button onClick={toggleSidebar} className="p-2 text-white">
        <img src={burger} alt="" style={{ width: '30px', height: '30px' }} />
      </button>
     

        <div className="py-8">
          <div className="flex flex-col items-center w-full mb-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-0">
    Mis sesiones
  </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {fotos.map((foto, index) => (
    <div key={index} className="relative w-full" style={{ paddingBottom: '133.33%' }}> {/* 4/3 = 133.33% */}
      <img 
        src={foto} 
        alt={`Foto ${index + 1}`} 
        className="absolute top-0 left-0 w-full h-full object-cover rounded-md" // La imagen ocupa todo el contenedor
      />
    </div>
  ))}
</div>


        </div>
      </div>
      </div>
     
    </>
  );
};

export default FotosSesion;
