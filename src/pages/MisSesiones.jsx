import "./Table.css";
import "./TableCarreras.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

import Swal from "sweetalert2";
import './Modal.css';

import './Calendario.css';
import Sidebar from "./Sidebar";
import burger from '../img/bars-solid.svg';

const MisSesiones = () => {
  
  const userId = localStorage.getItem('userId'); // Obtener el

  const [profesores, setProfesores] = useState([]);
  const [terminosBusqueda, setTerminosBusqueda] = useState('');

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para controlar la visibilidad del Sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
};

  const handleModalStop = (e) => e.stopPropagation();

 


  useEffect(() => {
    const fetchSesiones = async () => {
      const userId = localStorage.getItem('userId'); // Obtener el userId desde localStorage
      try {
        const response = await axios.get(`https://start-digital.onrender.com/gestion/sesiones-fotos/user/${userId}`); // Agregar userId a la ruta
        setProfesores(response.data);
      } catch (error) {
        console.error('Error al obtener los profesores:', error);
      }
    };
    fetchSesiones();
  }, []);
  




  const eliminarAcentos = (cadena) => {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const terminosBusquedaSinAcentos = eliminarAcentos(terminosBusqueda.toLowerCase());

  const filteredProfesores = profesores.filter((profesor) =>
    eliminarAcentos(`${profesor.data.materia} ${profesor.data.nombre} ${profesor.id}`)
      .toLowerCase()
      .includes(terminosBusquedaSinAcentos)
  );

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

          {/* Mapeo de sesiones como tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4" style={{maxWidth: '1000px'}}>
            {filteredProfesores.map((profesor) => (
              <div key={profesor.id} className="bg-white border rounded-lg shadow-md p-2">
                <img src={profesor.data.fotos[0]} alt={profesor.data.titulo} className="w-full h-32 object-cover rounded-md mb-2" />
                <h3 className="text-lg font-semibold">{profesor.data.titulo}</h3>
                {/*
                <p className="text-gray-600">{profesor.data.link}</p>
                */}
                <div className="flex justify-center mt-2 gap-4">
                <Link to={`/fotos-sesion/${profesor.id}`} className="px-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
        Ver fotos
      </Link>
      <button
        type="button"
        className="px-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
      >
        Ir a drive
      </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
     
    </>
  );
}

export default MisSesiones;
