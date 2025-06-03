import "./Table.css"
import "./TableCarreras.css"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from 'axios'
import ModalCrearContacto from "./ModalCrearContacto"
import ModalEditarContacto from "./ModalEditarContacto"
import Swal from "sweetalert2"
import './Modal.css'

const TableContacto = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenModificar, setIsModalOpenModificar] = useState(false)
  const [modificarProfesor, setModificarProfesor] = useState()
  const [profesores, setProfesores] = useState([]);
  const [terminosBusqueda, setTerminosBusqueda] = useState('')

  const handleModalStop = (e) => e.stopPropagation();
  
  const handleEditar=async (profesor)=>{
    setModificarProfesor(profesor);
    setIsModalOpenModificar(true);
    console.log(profesor)
  }

  useEffect(() => {
    const fetchProfesores = async () => {
        try {
            const response = await axios.get('https://start-digital.onrender.com/gestion/contacto/');
            setProfesores(response.data);
        } catch (error) {
            console.error('Error al obtener los profesores:', error);
        }
    };
    fetchProfesores();
  }, []);
  const confirmarEliminar = (idProfesor) => {
    Swal.fire({
      title: "Estas seguro de eliminarlo?",
      text: "Borraras permanentemente este profesor!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarProfesor(idProfesor);
        Swal.fire({
          title: "Eliminado!",
          text: "El profesor ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }
  const eliminarProfesor = async (idProfesor) => {
    
    try {
        await axios.delete(`https://start-digital.onrender.com/gestion/contacto/${idProfesor}`);
        console.log('Profesor eliminado correctamente');
        
    } catch (error) {
        console.error('Error al eliminar el profesor:', error);
    }
};
    
const eliminarAcentos = (cadena) => {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  
  const terminosBusquedaSinAcentos = eliminarAcentos(terminosBusqueda.toLowerCase());
  
  const filteredProfesores = profesores.filter((profesor) =>
  eliminarAcentos(`${profesor.data.materia} ${profesor.data.nombre} ${profesor.id}`)
    .toLowerCase()
    .includes(terminosBusquedaSinAcentos)
);
// Paginación
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

// Lógica para la paginación
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredProfesores.slice(indexOfFirstItem, indexOfLastItem);


// Función para cambiar de página
const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
};
//funcion de botones de paginación
const renderPageNumbers = () => {
  const pageNumbers = [];
  const totalPages = Math.ceil(profesores.length / itemsPerPage);
  const maxVisiblePages = 5; // Número máximo de botones de página visibles

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return pageNumbers.map(number => (
    <button key={number} onClick={() => paginate(number)} className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100 " style={{ backgroundColor: currentPage === number ? '#ECECEC' : 'white',color: currentPage === number ? '#06b6d4' : '#646464'  }}>
      {number}
    </button>
  ));
};

 
  return (
    <>
    <div className="div-table">
          {
          isModalOpen && (
                <div className="cont-modal " onClick={()=> setIsModalOpen(false)}>
                <div className="modal w-[450px] md:w-[600px] lg:w-[600px]" onClick={handleModalStop}>
          <button className=" bg-transparent hover:bg-white text-white font-semibold hover:text-gray-600 py-2 px-6 border border-white hover:border-transparent rounded mb-2" onClick={() => setIsModalOpen(false)}>Cerrar</button>
          < ModalCrearContacto/>
        </div>
              </div>
      )
    }
          {
          isModalOpenModificar && (
                <div className="cont-modal " onClick={()=> setIsModalOpenModificar(false)}>
                <div className="modal w-[450px] md:w-[600px] lg:w-[600px]" onClick={handleModalStop}>
          <button className=" bg-transparent hover:bg-white text-white font-semibold hover:text-gray-600 py-2 px-6 border border-white hover:border-transparent rounded mb-2" onClick={() => setIsModalOpenModificar(false)}>Cerrar</button>
          <ModalEditarContacto datosProfesor={modificarProfesor} />
        </div>
              </div>
      )
    }
      
      <div className="py-8 ">
        <div className=" flex flex-row tabla justify-between w-full mb-1 sm:mb-0">
        <Link to="/gestion"><button className="w-24 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2">
            Atrás
        </button></Link>
          <h2 className="text-2xl leading-tight">Contactos</h2>
          <div className="text-end">
            <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
              <div className="relative">
                <input
                  type="text"
                  id="filter" className="rounded-lg  flex-1 border-2 border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-xl text-base focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent" placeholder="Buscar..."
                  value={terminosBusqueda} onChange={(e) => setTerminosBusqueda(e.target.value)}
               />
              </div>
              <button 
              onClick={()=> setIsModalOpen(true)}
                type="button"
                className="w-24 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
              >
                Nuevo
              </button>
            </form>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200">
        <div className="overflow-x-auto rounded-t-lg">
    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead className="ltr:text-left rtl:text-right">
        <tr>
          <th className="whitespace-nowrap pr-1 pl-4 py-2 font-medium text-gray-900">Departamento</th>
          <th className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">Correo</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {
        currentItems.map((profesor) => (
          <tr key={profesor.id}>
           
            <td className="whitespace-nowrap px-2 py-2 text-gray-700 text-center"> {profesor.data.dependencia}</td>
            <td className="whitespace-nowrap px-2 py-2 text-gray-700 text-center"> {profesor.data.correo}</td>
                        <td className="">
                        <div className="contenedor-btn flex justify-center h-full pt-2 gap-2">
                        <button
                        onClick={() => handleEditar(profesor)}
                            type="submit"
                            className="px-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-2 rounded-lg block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
                        >
                            Editar
                        </button>
                        <button
                        onClick={() => confirmarEliminar(profesor.id)}
                            type="submit"
                            className="px-2 bg-gradient-to-r from-red-400 to-red-600 text-white py-2 rounded-lg block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
                        >
                            Eliminar
                        </button>
                        </div>
                        </td>
          </tr>
        )) 
        }
      </tbody>
    </table>
  </div>
        </div>
        <div className="border rounded-b-md flex flex-col items-center  px-5 py-2 bg-white xs:flex-row xs:justify-between">
          <div className="flex items-center">
              <button
              onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}
              type="button" className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100">
                  <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                      </path>
                  </svg>
              </button>
              {renderPageNumbers()}
              <button
              onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= profesores.length}
                type="button" className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100">
              <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                  </path>
              </svg>
          </button>
          </div>
      </div>
        </div>
    </div>
    </>
  )
}


export default TableContacto