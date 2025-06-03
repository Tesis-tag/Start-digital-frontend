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

const ServicioComunty = () => {
  const id = localStorage.getItem('userId');

  const [servicios, setServicios] = useState([]);
  const [planActivo, setPlanActivo] = useState(null);
  const [terminosBusqueda, setTerminosBusqueda] = useState('');

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para controlar la visibilidad del Sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
};

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get(`https://start-digital.onrender.com/gestion/servicios/`);
        setServicios(response.data);
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
      }
    };

    const fetchPlanActivo = async () => {
      try {
        const response = await axios.get(`https://start-digital.onrender.com/gestion/calendario/pagos/activo/${id}`);
        setPlanActivo(response.data);
      } catch (error) {
        console.error('Error al obtener el plan activo:', error);
      }
    };

    fetchServicios();
    fetchPlanActivo();
  }, [id]);

  const eliminarAcentos = (cadena) => {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const terminosBusquedaSinAcentos = eliminarAcentos(terminosBusqueda.toLowerCase());

  const filteredServicios = servicios.filter((servicio) =>
    eliminarAcentos(` ${servicio.data.descripcion}`)
      .toLowerCase()
      .includes(terminosBusquedaSinAcentos)
  );

  const manejarSolicitud = async (servicio) => {
    if (planActivo) {
      const fechaCaducidad = new Date(planActivo.fechaCaducidad);
      if (fechaCaducidad > new Date()) {
        Swal.fire({
          title: "Plan Activo",
          text: "Ya tienes un plan activo. Debes cancelar el actual antes de solicitar uno nuevo.",
          icon: "info",
          confirmButtonText: "Ok",
        });
        return;
      }
    }

    const confirmacion = await Swal.fire({
      title: 'Confirmar Solicitud',
      text: `¿Estás seguro de que deseas solicitar el servicio: ${servicio.data.titulo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, solicitar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
      const nuevoPago = {
        userId: id,
        servicioId: servicio.id,
        fechaSolicitud: new Date().toISOString(),
        fechaCaducidad: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
        title: servicio.data.titulo,
        description: servicio.data.descripcion,
        start: new Date().toISOString(),
        end: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
        totalPrice: servicio.data.precio,
        estatus: 1,
        tipo: "redes"
      };

      try {
        await axios.post('https://start-digital.onrender.com/gestion/calendario/pagos/registrar', nuevoPago);
        Swal.fire({
          title: "Pago Generado",
          text: "Se ha generado tu pago. Comunícate con nosotros a través de WhatsApp para más información.",
          icon: "success",
          confirmButtonText: "Ok",
        });
      } catch (error) {
        console.error('Error al generar el pago:', error);
      }
    }
  };

  const renderPlanActivoInfo = () => {
    if (!planActivo) return null;

    const { estatus, fechaCaducidad } = planActivo;
    let mensaje = '';

    if (estatus === 1) {
      mensaje = "Tienes un pago pendiente.";
    } else if (estatus === 2) {
      mensaje = "Pago por verificar.";
    } else if (estatus === 3) {
      mensaje = "Plan Activo";
    }

    return (
      <div className="plan-activo-info">
        <h3>{mensaje}</h3>
        {estatus === 3 && (
          <p>
            Tu plan está activo hasta el {new Date(fechaCaducidad).toLocaleDateString()}.
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="flex">
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    <div className={`content ${isSidebarOpen ? 'expanded' : ''}`}>
      <button onClick={toggleSidebar} className="p-2 text-white">
        <img src={burger} alt="" style={{ width: '30px', height: '30px' }} />
      </button>
      <div className="div-table">
        <div className="py-8 ">
          <div className="flex flex-col items-center w-full mb-4">
            
     
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-0">
    Servicios de Redes Sociales
  </h2>
          </div>

          {renderPlanActivoInfo()}

          <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
              {filteredServicios.map((servicio) => (
                <div key={servicio.id} className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-xs" style={{minWidth: '250px'}}>
                  <div className="p-5 sm:px-6" >
                    <h2 className="text-lg font-medium text-gray-900">{servicio.data.titulo}</h2>
                    <p className="mt-2 text-gray-700">{servicio.data.descripcion}</p>
                    <p className="mt-2 sm:mt-4">
                      <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">{servicio.data.precio}$</strong>
                      <span className="text-sm font-medium text-gray-700">/mes</span>
                    </p>
                    <button
                      onClick={() => manejarSolicitud(servicio)}
                      className={`w-full mt-4 block rounded-sm border border-indigo-600 ${planActivo && new Date(planActivo.fechaCaducidad) > new Date() && planActivo.title === servicio.data.titulo ? 'bg-gray-400' : 'bg-indigo-600'} py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden sm:mt-6`}
                    >
                      {planActivo && new Date(planActivo.fechaCaducidad) > new Date() && planActivo.title === servicio.data.titulo 
                        ? "Plan Activo" 
                        : "Suscribirse"}
                    </button>
                  </div>
                  <div className="p-6 sm:px-8">
                    <p className="text-lg font-medium text-gray-900 sm:text-xl">Incluye:</p>
                    <ul className="mt-2 space-y-2 sm:mt-4">
                      {servicio.data.inclusiones.map((inclusion, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-5 text-indigo-700"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          <span className="text-gray-700">{inclusion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            {planActivo && new Date(planActivo.fechaCaducidad) > new Date() && (
              <p className="mt-4 text-center text-sm text-gray-600">
                Tu plan activo vence el {new Date(planActivo.fechaCaducidad).toLocaleDateString()}.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default ServicioComunty;
