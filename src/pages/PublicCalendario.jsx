import Navbar from "./Navbar";
import Foo from "./Foo";
import './Profesores.css';
import './PublicView.css';
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

const PublicCalendario = () => {

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
  
  

  return (
    <>
      <div id="inicio" className="page">
        <Navbar />
        <section className="sec-general-banner">
          <div className="cont-h1-tele">
            <h1 className="h1-tele font-robot font-normal text-white ">Calendario de Actividades</h1>
          </div>
        </section>
        <div className="contenido">
          <section className="section-profesores">
          <h1 className="h1-pags">Calendario del Decanato de Ciencias y Tecnología</h1>
<div className="cont-intro flex justify-center mb-4">
    <div className="cont-intro flex justify-center">
        <p className="p-profesores text-j w-full">
            ¡Bienvenido a nuestro calendario de citas! Aquí podrás visualizar todas las citas agendadas y organizarte de manera efectiva para programar las tuyas.
        </p>
    </div>
</div>
<div className="cont-intro flex justify-center mb-4">
<div className="text-justify">
<h3 className="h3-pags">¿Cómo funciona?</h3>
<ol className="list-decimal pl-5">
    <li><strong>Consulta las Disponibilidades</strong>: Revisa las fechas y horas disponibles en el calendario. Las citas ya agendadas estarán claramente marcadas.</li>
    <li><strong>Organiza tu Tiempo</strong>: Toma nota de tus horarios libres y elige el momento que mejor se adapte a tu agenda.</li>
    <li><strong>Agendar tu Cita</strong>: Una vez que hayas encontrado un espacio disponible, simplemente haz clic en la fecha y sigue las instrucciones para completar tu reserva.</li>
</ol>

<h3 className="h3-pags">Beneficios de Usar Nuestro Calendario</h3>
<ul className="list-disc pl-5">
    <li><strong>Visibilidad</strong>: Mantente al tanto de las citas programadas y evita conflictos de horarios.</li>
    <li><strong>Facilidad de Uso</strong>: Un sistema intuitivo que te permite agendar citas de manera rápida y sencilla.</li>
    <li><strong>Recordatorios</strong>: Recibe notificaciones sobre tus citas próximas para que no se te pase ninguna.</li>
</ul>

<p className="p-profesores text-j w-full">
    ¡No esperes más! Organiza tus citas y optimiza tu tiempo con nuestro calendario interactivo.
</p>
</div>
</div>


              <div className="cont-intro flex justify-center">
          <div className="container py-8 flex justify-center">
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
                  <h3 className="text-3xl font-semibold text-center text-gray-500 mt-0 mb-2">Evento</h3>
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
        )
      }

                </div>

            <div className=" flex justify-center mt-8 mb-8">
              <div className="mb-8">
                

            
              <Link to="/panel-usuario">
              <button 
            type="button" 
            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold d focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        >
           Agendar una cita
        </button>
              </Link>
            </div>
            </div>
          </section>
        </div>
        <Foo />
      </div>
    </>
  );
};

export default PublicCalendario;
