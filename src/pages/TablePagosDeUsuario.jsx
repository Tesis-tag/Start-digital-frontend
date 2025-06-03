import "./Table.css";
import "./TableCarreras.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import ModalEditarPagoUsuario from "./ModalEditarPagoUsuario";
import Swal from "sweetalert2";
import './Modal.css';

import './Calendario.css';
import Sidebar from "./Sidebar";
import burger from '../img/bars-solid.svg';

const TablePagosDeUsuario = () => {
  const id = localStorage.getItem('userId');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenModificar, setIsModalOpenModificar] = useState(false);
  const [modificarProfesor, setModificarProfesor] = useState();
  const [pagos, setPagos] = useState([]); // Cambiado de profesores a pagos
  const [terminosBusqueda, setTerminosBusqueda] = useState('');

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para controlar la visibilidad del Sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
};

  const handleModalStop = (e) => e.stopPropagation();
  
  const handleEditar = async (pago) => { 
    setModificarProfesor(pago);
    setIsModalOpenModificar(true);
    console.log(pago);
  };

  useEffect(() => {
    const fetchPagos = async () => { // Cambiado de fetchProfesores a fetchPagos
      try {
        const response = await axios.get(`https://start-digital.onrender.com/gestion/calendario/pagos/usuario/${id}`);
        setPagos(response.data); // Cambiado de setProfesores a setPagos
        console.log(response.data);
      } catch (error) {
        console.error('Error al obtener los pagos:', error); // Cambiado de profesores a pagos
      }
    };
    fetchPagos();
  }, []);



  const eliminarAcentos = (cadena) => {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const terminosBusquedaSinAcentos = eliminarAcentos(terminosBusqueda.toLowerCase());

  const filteredPagos = pagos.filter((pago) =>
    eliminarAcentos(` ${pago.descripcion} ${pago.estatus} ${pago.title} ${pago.totalPrice}`)
      .toLowerCase()
      .includes(terminosBusquedaSinAcentos)
  );

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Lógica para la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPagos.slice(indexOfFirstItem, indexOfLastItem); // Cambiado de filteredProfesores a filteredPagos

  // Función para cambiar de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Función de botones de paginación
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPages = Math.ceil(pagos.length / itemsPerPage); // Cambiado de profesores a pagos
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
      <button key={number} onClick={() => paginate(number)} className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100 " style={{ backgroundColor: currentPage === number ? '#ECECEC' : 'white', color: currentPage === number ? '#06b6d4' : '#646464' }}>
        {number}
      </button>
    ));
  };

  return (
    <>
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${isSidebarOpen ? 'expanded' : ''}`}>
          <button onClick={toggleSidebar} className="p-2 text-white">
                  <img src={burger} alt="" style={{ width: '30px', height: '30px' }} />
                </button>

          <div className="py-8 ">
          <div className="flex flex-col items-center w-full mb-4">
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-0">
    Mis Pagos
  </h2>
  <div className="w-full flex justify-end">
    <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
      <div className="relative">
        <input
          type="text"
          id="filter"
          className="rounded-lg flex-1 border-2 border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-xl text-base focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
          placeholder="Buscar..."
          value={terminosBusqueda}
          onChange={(e) => setTerminosBusqueda(e.target.value)}
        />
      </div>
    </form>
  </div>
</div>

            <div className="rounded-lg border border-gray-200">
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr>
                      <th className="whitespace-nowrap pr-1 pl-4 py-2 font-medium text-gray-900">Título</th>
                      <th className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">Descripción</th>
                      <th className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">Fecha</th>
                      <th className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">Precio</th>
                      <th className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">Estatus</th>
                      <th className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {
                      currentItems.map((pago) => (
                        <tr key={pago.id}>
                          <td className="whitespace-nowrap px-2 py-2 text-gray-700 text-center">{pago.title}</td>
                          <td className="whitespace-nowrap px-2 py-2 text-gray-700 text-center">{pago.description}</td>
                          <td className="whitespace-nowrap px-2 py-2 text-gray-700 text-center">
                            {new Date(pago.start).toLocaleString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false // Cambia a true si quieres formato 12 horas
                            })}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-gray-700 text-center">{pago.totalPrice}$</td>
                          <td className="whitespace-nowrap px-2 py-2 text-gray-700 text-center">
                           {pago.estatus == 1 ? 'Por pagar' : 
                          pago.estatus == 2 ? 'Por verificar' : 
                          pago.estatus == 3 ? 'Verificado' : 
                          'Estado desconocido'} 
                          </td>
                          <td className="">
                            <div className="contenedor-btn flex justify-center h-full pt-2 gap-2">
                              <button
                                onClick={() => handleEditar(pago)}
                                type="submit"
                                className="px-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-2 rounded-lg block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
                              >
                                Subir pago
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
            <div className="border rounded-b-md flex flex-col items-center px-5 py-2 bg-white xs:flex-row xs:justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}
                  type="button" className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100">
                  <svg width="9" fill="currentColor" height="8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
                {renderPageNumbers()}
                <button
                  onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= pagos.length} // Cambiado de profesores a pagos
                  type="button" className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100">
                  <svg width="9" fill="currentColor" height="8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
            isModalOpenModificar && (
              <div className="cont-modal" onClick={() => setIsModalOpenModificar(false)}>
                <div className="modal w-[450px] md:w-[600px] lg:w-[600px]" onClick={handleModalStop}>
                  <button className="bg-transparent hover:bg-white text-white font-semibold hover:text-gray-600 py-2 px-6 border border-white hover:border-transparent rounded mb-2" onClick={() => setIsModalOpenModificar(false)}>Cerrar</button>
                  <ModalEditarPagoUsuario datosProfesor={modificarProfesor} />
                </div>
              </div>
            )
          } 
    </>
  );
}

export default TablePagosDeUsuario;
