import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from 'react';
import dayjs from "dayjs";
import 'dayjs/locale/es'; // Importa el locale en español
import axios from 'axios'; // Importa axios
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import './Calendario.css';
import Sidebar from "./Sidebar";
import burger from '../img/bars-solid.svg';

// Configuración del localizador
dayjs.locale('es'); // Establece el locale a español
const localizer = dayjsLocalizer(dayjs);

const DashboardUser = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [sessionType, setSessionType] = useState('Boda');
  const [makeupService, setMakeupService] = useState(false);
  const [isModalOpenModificar, setIsModalOpenModificar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [promociones, setPromociones] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null); // Nueva variable para la promoción seleccionada
  const [totalPrice, setTotalPrice] = useState(0); // Precio total
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para controlar la visibilidad del Sidebar

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://start-digital.onrender.com/gestion/calendario/get-events');
        const formattedEvents = response.data.map(event => ({
          id: event.id,
          title: event.title,
          description: event.description,
          start: new Date(event.start), // Cambiar aquí
          end: new Date(event.end), // Cambiar aquí
          maquillaje: event.maquillaje
        }));
        setEvents(formattedEvents);
        console.log(formattedEvents); // Verifica los eventos formateados
      } catch (error) {
        console.error('Error al obtener eventos:', error);
      }
    };
    

    const fetchPromociones = async () => {
      try {
        const response = await axios.get('https://start-digital.onrender.com/gestion/promociones-fotos/');
        setPromociones(response.data);
      } catch (error) {
        console.error('Error al obtener las promociones:', error);
      }
    };

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };

    fetchEvents();
    fetchPromociones();
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpenModificar(true);
  };

  const handleClose = () => {
    setIsModalOpenModificar(false);
    setSelectedEvent(null);
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    Swal.fire('¡Fecha seleccionada!', 'Has seleccionado una nueva fecha.', 'info');
    // Limpiar los campos de hora
    setSelectedTime(null);
  };

  const handlePromotionSelect = (promocion) => {
    setSelectedPromotion(promocion);
    
    // Convertir el precio a entero antes de sumar
    const precio = parseInt(promocion.data.precio, 10); // Especificar la base 10
    const makeupCharge = makeupService ? 20 : 0;
    const total = isNaN(precio) ? 0 : precio + makeupCharge;

    setTotalPrice(total); // Calcular el precio total
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const start = dayjs(selectedDate).set('hour', selectedTime?.hour()).set('minute', selectedTime?.minute()).toDate();
    const end = dayjs(start).add(selectedPromotion.data.tiempo, 'hour').toDate(); // Calcular la hora de fin

    const userId = localStorage.getItem('userId'); // Obtener el ID del usuario del localStorage
    const newEvent = {
      start: start,
      end: end,
      title: selectedPromotion.data.titulo, // Guardar el título del paquete seleccionado
      description: `${sessionType} ${makeupService ? 'con maquillaje' : 'sin maquillaje'}`,
      userId: userId,
      packageTitle: selectedPromotion.data.titulo,
      totalPrice: totalPrice,
      maquillaje: makeupService,
      tipo: 'sesion'
    };

    try {
      await axios.post('https://start-digital.onrender.com/gestion/calendario/pagos/registrar', newEvent);
      setEvents([...events, newEvent]);
      setSessionType('Boda');
      setMakeupService(false);
      setSelectedDate(null);
      setSelectedTime(null);
      setSelectedPromotion(null);
      setTotalPrice(0); // Resetear precio total
    
      // Mensaje de éxito
      Swal.fire({
        title: '¡Éxito!',
        text: 'La sesión se ha agendado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } catch (error) {
      console.error('Error al guardar el evento:', error);
      console.log('Error al guardar el evento:', error.response.data.code);
      
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
        const status = error.response.data.code;
        const message = error.response.data?.message || 'Ocurrió un error inesperado.';
    
        if (status == 460) {
          Swal.fire({
            title: 'Error de horario',
            text: 'Las sesiones solo pueden agendarse entre las 8:00 AM y las 10:00 PM.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
          });
        } else if (status == 400) {
          Swal.fire({
            title: 'Datos incorrectos',
            text: message,
            icon: 'error',
            confirmButtonText: 'Revisar'
          });
        } else {
          Swal.fire({
            title: 'Error inesperado',
            text: `Hubo un problema al guardar el evento. Código: ${status}`,
            icon: 'error',
            confirmButtonText: 'Cerrar'
          });
        }
      } else {
        Swal.fire({
          title: 'Error de conexión',
          text: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
          icon: 'error',
          confirmButtonText: 'Reintentar'
        });
      }
    }
    
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
};

  return (
    <div className="flex"> 
       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    <div className={`content ${isSidebarOpen ? 'expanded' : ''}`}> {/* Clase para el contenido */}
      <button onClick={toggleSidebar} className="p-2 text-white">
        <img src={burger} alt="" style={{ width: '30px', height: '30px' }} />
      </button>
      <div className="cont-table">
        <div className="div-table">
          <div className="div-superior">
            <Link to="/gestion">
              <button 
                className="w-24 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2">
                Atrás
              </button>
            </Link>
            <h2 className="text-2xl leading-tight">Reserva tu sesión</h2>
          </div>
          <div className="rounded-lg border border-gray-200 overflow-auto">
            <h2 className="text-lg text-center leading-tight mt-4">Selecciona un paquete</h2>
            <div className="cont-profesores w-full ">
              {promociones.map((promocion) => (
                <div 
                  key={promocion.id} 
                  className={`flex flex-col overflow-hidden rounded-lg shadow-lg ${selectedPromotion?.id === promocion.id ? 'border-4 border-blue-500' : ''}`} 
                  style={{ width: '250px', height: '300px' }}
                  onClick={() => handlePromotionSelect(promocion)} // Manejar selección de promoción
                >
                  <div className="flex-shrink-0" style={{ maxHeight: '170px', overflow: 'hidden' }}>
                    <img className="h-full w-full" src={promocion.data.img} alt="" />
                  </div>
                  <div className="flex flex-col justify-between flex-1 px-3 bg-white">
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-neutral-600">{promocion.data.titulo}</p>
                      <p className="text-base text-gray-500">{promocion.data.descripcion}.</p>
                      <p className="text-base text-gray-500">{"Precio: " + promocion.data.precio + "$"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cont-profesores w-full ">
             
              <Calendar 
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, width: 500 }}
                onSelectEvent={handleSelectEvent}
                selectable={true}
                defaultView="month"
              />
            </div>
         


            {isModalOpenModificar && selectedEvent && (
              // Modal para mostrar detalles del evento
              <div className="cont-modal" onClick={() => setIsModalOpenModificar(false)}>
                <div className="modal w-[450px] md:w-[600px] lg:w-[600px]" onClick={(e) => e.stopPropagation()}>
                  <button 
                    className="bg-transparent hover:bg-white text-white font-semibold hover:text-gray-600 py-2 px-6 border border-white hover:border-transparent rounded mb-2" 
                    onClick={handleClose}> 
                    Cerrar
                  </button>
                  <div className="w-full">
                    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
                      <h3 className="text-3xl font-semibold text-center text-gray-500 mt-0 mb-2">Detalles de la Reserva</h3>
                      <form className="px-0 pb-2">
                        <div className="sm:flex sm:justify-between sm:gap-4">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                              {selectedEvent.title}
                            </h3>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-pretty text-sm text-gray-500">
                            {selectedEvent.description}
                          </p>
                        </div>
                        <dl className="mt-6 flex gap-4 sm:gap-6">
                          <div className="flex flex-col-reverse">
                            <dt className="text-sm font-medium text-gray-600">Fecha de inicio</dt>
                            <dd className="text-xs text-gray-500"> {dayjs(selectedEvent.start).format('DD/MM/YYYY HH:mm')}</dd>
                          </div>
                          <div className="flex flex-col-reverse">
                            <dt className="text-sm font-medium text-gray-600">Fecha de fin</dt>
                            <dd className="text-xs text-gray-500">{dayjs(selectedEvent.end).format('DD/MM/YYYY HH:mm')}</dd>
                          </div>
                        </dl>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="cont-profesores w-full ">
             
            <form action="#" className="space-y-4" onSubmit={handleSubmit}>
              <h3 className="text-center">Reservar Sesión de Fotos</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="">Tipo de Sesión</label>
                  <select
                    className="class-input text-sm w-full px-4 py-1 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                    value={sessionType}
                    onChange={(e) => setSessionType(e.target.value)}
                    required
                  >
                    <option value="Boda">Boda</option>
                    <option value="Cumpleaños">Cumpleaños</option>
                    <option value="Evento Corporativo">Evento Corporativo</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="">Fecha</label>
                 <DatePicker
                    className="w-full"
                    label="Selecciona una fecha"
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="">Hora</label>
                  <TimePicker
                  className="w-full"
                    label="Selecciona una hora"
                    value={selectedTime}
                    onChange={(newValue) => setSelectedTime(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div>
                  <label>
                    <input
                      className="mr-2"
                      type="checkbox"
                      checked={makeupService}
                      onChange={(e) => {
                        setMakeupService(e.target.checked);
                        setTotalPrice(selectedPromotion ? parseInt(selectedPromotion.data.precio) + (e.target.checked ? 20 : 0) : 0);
                      }}
                    />
                    Incluir servicio de maquillaje ($20)
                  </label>
                </div>
              </div>
              <div className="mt-4 flex justify-center pb-4">
                <h4 className="text-lg">Precio Total: ${totalPrice}</h4> {/* Mostrar el precio total */}
              </div>
              <div className="mt-4 flex justify-center pb-4">
                <button
                  className="w-full rounded-lg bg-black px-5 py-3 ml-2 font-medium text-white sm:w-auto"
                  type="submit"
                >
                  Reservar
                </button>
              </div>
            </form>
            
             </div>

          </div>
        </div>
      </div>
    </div>
    </div>

  );
}

export default DashboardUser;
