import "./Table.css"
import "./TableCarreras.css"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from 'axios'
import CrearMateria from "./CrearMateria"
import ModificarMateria from "./ModificarMateria"
import './Modal.css'
import Swal from "sweetalert2"

const TableCarreras = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenModificar, setIsModalOpenModificar] = useState(false)
  const [materias, setMaterias] = useState([]);
  const [terminosBusqueda, setTerminosBusqueda] = useState('')
  const [materiaAModificar, setMateriaAModificar] = useState([])

  const handleModalStop = (e) => e.stopPropagation();

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await axios.get('https://start-digital.onrender.com/materias-telematica');
        // Ordenar las materias por el número de semestre
        setMaterias([...response.data].sort((a, b) => a.data.semestre - b.data.semestre))
        console.log(response.data);
      } catch (error) {
        console.error('Error al obtener los materias:', error);
      }
    };
    fetchMaterias();
  }, []);
  
  const handleEditar=async (materia)=>{
    setMateriaAModificar(materia);
    console.log(materiaAModificar);
    
    setIsModalOpenModificar(true); 
    console.log(materia.id)
  }

  const confirmarEliminar = (idMateria) => {
    Swal.fire({
        title: "¿Estás seguro de eliminarlo?",
        text: "Borrarás permanentemente esta materia!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, borrar!",
    }).then((result) => {
        if (result.isConfirmed) {
            eliminar(idMateria);
        }
    });
};

  const eliminar = async (idMateria) => {
    
    try {
        await axios.delete(`https://start-digital.onrender.com/materias-telematica/${idMateria}`);
        console.log('Materia eliminado correctamente');
        
    } catch (error) {
        console.error('Error al eliminar la materia:', error);
    }
};
  
    
  const eliminarAcentos = (cadena) => {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  
  const terminosBusquedaSinAcentos = eliminarAcentos(terminosBusqueda.toLowerCase());
  
  const filteredMaterias = materias.filter((materia) =>
  eliminarAcentos(`${materia.data.asignatura} ${materia.data.codigo} ${materia.data.profesor}${materia.data.prelacion}`)
    .toLowerCase()
    .includes(terminosBusquedaSinAcentos)
);

// Paginación
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

// Lógica para la paginación
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredMaterias.slice(indexOfFirstItem, indexOfLastItem);


// Función para cambiar de página
const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
};
//funcion de botones de paginación
const renderPageNumbers = () => {
  const pageNumbers = [];
  const totalPages = Math.ceil(materias.length / itemsPerPage);
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
    <div>
    <div className="cont-table">
       {isModalOpen && (
         <div className="cont-modal " onClick={()=> setIsModalOpen(false)}>
         <div className="modal w-[450px] md:w-[600px] lg:w-[680px]" onClick={handleModalStop}>
   <button className=" bg-transparent hover:bg-white text-white font-semibold hover:text-gray-600 py-2 px-6 border border-white hover:border-transparent rounded mb-2" onClick={() => setIsModalOpen(false)}>Cerrar</button>
 <CrearMateria  />
 </div>
       </div>
       )}
       {isModalOpenModificar && (
         <div className="cont-modal " onClick={()=> setIsModalOpenModificar(false)}>
         <div className="modal w-[450px] md:w-[600px] lg:w-[680px]" onClick={handleModalStop}>
   <button className=" bg-transparent hover:bg-white text-white font-semibold hover:text-gray-600 py-2 px-6 border border-white hover:border-transparent rounded mb-2" onClick={() => setIsModalOpenModificar(false)}>Cerrar</button>
 <ModificarMateria  datosMaterias={materiaAModificar}/>
 </div>
       </div>
       )}
        <div className="div-table">
            <div className="div-superior">
            <Link to="/gestion"><button 
           className="w-24 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2">
            Atrás
        </button></Link>
          <h2 className="text-2xl leading-tight">Materias de la carrera de Telemática</h2>
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
        <div className=" rounded-lg border border-gray-200 overflow-auto">
  <div className="overflow-x-auto rounded-t-lg">
    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead className="ltr:text-left rtl:text-right">
        <tr>
          <th className="whitespace-nowrap pr-1 pl-4 py-2 font-medium text-xs text-gray-900">Semestre</th>
          <th className="whitespace-nowrap px-2 py-2 font-medium text-xs text-gray-900">Asignatura</th>
          <th className="whitespace-nowrap px-2 py-2 font-medium text-xs text-gray-900">Código</th>
          <th className="whitespace-nowrap px-2 py-2 font-medium text-xs text-gray-900">U/C</th>
          <th className="whitespace-nowrap px-2 th-des py-2 font-medium text-xs text-gray-900">Descripción</th>
          <th className="whitespace-nowrap px-2 py-2 font-medium text-xs text-gray-900">Profesor</th>
          <th className="whitespace-nowrap px-2 py-2 font-medium text-xs text-gray-900">ID del Profesor</th>
          <th className="whitespace-nowrap px-2 py-2 font-medium text-xs text-gray-900">Prelación</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {currentItems.length > 0 ?
        currentItems.map((materia) => (
          <tr key={materia.id}>
            <td className="whitespace-nowrap pr-1 pl-4 py-2 text-xs font-medium text-gray-900 text-center">{materia.data.semestre}</td>
            <td className="td-asig whitespace-nowrap px-2 py-2 text-xs text-gray-700 text-center">{materia.data.asignatura}</td>
            <td className="whitespace-nowrap px-2 py-2 text-xs text-gray-700 text-center">{materia.data.codigo}</td>
            <td className=" whitespace-nowrap px-2 py-2 text-xs text-gray-700 text-center">{materia.data.uc}</td>
            <td className=" td-des px-2 py-2 text-xs text-gray-700 text-center">{materia.data.descripcion}</td>
            <td className="td-des px-2 py-2 text-xs text-gray-700 text-center">{materia.data.profesores.profesorSeccion1}{materia.data.profesores.profesorSeccion2 ? ', ' + materia.data.profesores.profesorSeccion2 : ''}{materia.data.profesores.profesorSeccion3 ? ', ' + materia.data.profesores.profesorSeccion3 : ''}{materia.data.profesores.profesorSeccion4 ? ', ' + materia.data.profesores.profesorSeccion4 : ''}</td>
            <td className="td-des  text-ellipsis px-2 py-2 text-xs text-gray-700 text-center">{materia.data.idProfesores.idProfesorSeccion1}{materia.data.idProfesores.idProfesorSeccion2 ? ', ' + materia.data.idProfesores.idProfesorSeccion2 : ''}{materia.data.idProfesores.idProfesorSeccion3 ? ', ' + materia.data.idProfesores.idProfesorSeccion3 : ''}{materia.data.idProfesores.idProfesorSeccion4 ? ', ' + materia.data.idProfesores.idProfesorSeccion4 : ''}</td>
            <td className="whitespace-nowrap px-2 py-2 text-xs text-gray-700 text-center">{materia.data.prelacion}</td>
            <td>
              <div className="contenedor-btn flex justify-center h-full pt-2 gap-2">
              <button
              onClick={() => handleEditar(materia)}
                  type="submit"
                  className="px-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-2 rounded-lg block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
              >
                  Editar
              </button>
              <button
                onClick={() => confirmarEliminar(materia.id)}
                    type="submit"
                    className="px-2 bg-gradient-to-r from-red-400 to-red-600 text-white py-2 rounded-lg block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
                >
                    Eliminar
                </button>
              </div>
            </td>
          </tr>
        )) 
        :(
          <tr>
          <td colSpan="5" className="text-center py-4 ">
            <p className="text-gray-900 ">No se encontraron resultados</p>
          </td>
        </tr>
        )
        }
      </tbody>
    </table>
  </div>
  <div className=" border  flex flex-col items-center px-5 py-2 bg-white xs:flex-row xs:justify-between">
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
              onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= materias.length}
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
   </div>
   </div>
  )
}

export default TableCarreras