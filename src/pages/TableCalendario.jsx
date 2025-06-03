import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import  { useState, useEffect } from 'react';
import dayjs from "dayjs";
import 'dayjs/locale/es'; // Importa el locale en español
import axios from 'axios'; // Importa axios
import './Calendario.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importa SweetAlert2

// Configuración del localizador
dayjs.locale('es'); // Establece el locale a español
const localizer = dayjsLocalizer(dayjs);

const TableCalendario = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetails, setShowDetails] = useState(false); // Estado para controlar la visibilidad
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [isModalOpenModificar, setIsModalOpenModificar] = useState(false)

  const handleModalStop = (e) => e.stopPropagation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://start-digital.onrender.com/gestion/calendario/get-events');
        const formattedEvents = response.data.map(event => ({
          id: event.id,
          title: event.title,
          description: event.description,
          start: new Date(event.start.seconds * 1000), // Convertir a milisegundos
          end: new Date(event.end.seconds * 1000)      // Convertir a milisegundos
        }));
        console.log('Eventos formateados:', formattedEvents); // Verifica el formato
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error al obtener eventos:', error);
      }
    };
  
    fetchEvents();
  }, []);
  
  const messages = {
    allDay: 'Todo el día',
    previous: 'Anterior',
    next: 'Siguiente',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Dia',
    list: 'Lista',
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpenModificar(true); // Cambia esto para abrir el modal
  };
  const handleSelectSlot = () => {
    // No hacer nada al seleccionar un día
  };

  const handleClose = () => {
    setIsModalOpenModificar(false); // Cierra el modal
    setSelectedEvent(null); // Resetea el evento seleccionado
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const end = endDate ? dayjs(endDate).endOf('day').toDate() : dayjs(startDate).add(1, 'day').toDate();

    const newEvent = {
      start: dayjs(startDate).toDate(),
      end: end,
      title,
      description,
    };

    try {
      await axios.post('https://start-digital.onrender.com/gestion/calendario/save', newEvent);
      setEvents([...events, newEvent]);
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
    } catch (error) {
      console.error('Error al guardar el evento:', error);
    }
  };

  const handleDelete = async () => {
    try {
        await axios.delete(`https://start-digital.onrender.com/gestion/calendario/delete/${selectedEvent.id}`); // Cambia la URL según tu API
        setEvents(events.filter(event => event.id !== selectedEvent.id)); // Elimina el evento del estado
        handleClose(); // Cierra la tarjeta
        Swal.fire('Eliminado!', 'Tu evento ha sido eliminado.', 'success');
      } catch (error) {
        console.error('Error al eliminar el evento:', error);
        Swal.fire('Error!', 'No se pudo eliminar el evento.', 'error');
      }
  };

  return (
    <div>
      <div className="cont-table">
        <div className="div-table">
          <div className="div-superior">
        
            <h2 className="text-2xl leading-tight">Materias de la carrera de Telemática</h2>
          </div>
          <div className="rounded-lg border border-gray-200 overflow-auto flex justify-center">
          

          <div>
          <div className="container py-5 d-flex justify-content-center">
        <Calendar 
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, width: 500 }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable={true}
          defaultView="month"
          messages={messages}
        />
      </div>

      {
        isModalOpenModificar && selectedEvent && (
          <div className="cont-modal" onClick={() => setIsModalOpenModificar(false)}>
            <div className="modal w-[450px] md:w-[600px] lg:w-[600px]" onClick={handleModalStop}>
              <button 
                className="bg-transparent hover:bg-white text-white font-semibold hover:text-gray-600 py-2 px-6 border border-white hover:border-transparent rounded mb-2" 
                onClick={handleClose}> {/* Cambia aquí para usar handleClose */}
                Cerrar
              </button>
              <div className="w-full">
                <div className="w-full p-6 bg-white rounded-lg shadow-lg">
                  <h3 className="text-3xl font-semibold text-center text-gray-500 mt-0 mb-2">Mensaje</h3>
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
                    <button onClick={handleDelete} className="mt-4 w-full rounded-lg bg-red-500 text-white py-2">
                      Eliminar Evento
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
      }

     
          <form action="#" className="space-y-4">
            <h3 className="text-center">Añadir Evento</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="">Título del evento</label>
                <input
                   className="class-input text-sm w-full px-4 py-1 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                  type="text"
                  placeholder="Título" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required
                />
              </div>
              <div>
                <label htmlFor="">Descripción del evento</label>
                <textarea
                   className="class-input text-sm w-full px-4 py-1 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                  type="text"
                  placeholder="Descripción"
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  required
                />
              </div>
              <div>
                <label htmlFor="">Fecha de Inicio</label>
                <input
                   className="class-input text-sm w-full px-4 py-1 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                  type="date"
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)} 
                  required
                />
              </div>
              <div>
                <label htmlFor="">Fecha de Fin</label>
                <input
                   className="class-input text-sm w-full px-4 py-1 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                  type="date" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)} 
                />
              </div>
            </div>
            <div className="mt-4 flex justify-center pb-4">
            
              <button
                className="w-full rounded-lg bg-black px-5 py-3 ml-2 font-medium text-white sm:w-auto"
                onClick={handleSubmit}
              >
                Añadir
              </button>
            </div>
          </form>

          </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default TableCalendario;
