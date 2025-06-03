import Navbar from "./Navbar";
import Foo from "./Foo";
import './Profesores.css';
import './PublicView.css';
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from 'react';
import dayjs from "dayjs";
import 'dayjs/locale/es'; // Importa el locale en español
import axios from 'axios'; // Importa axios
import './Calendario.css';
import { useParams } from 'react-router-dom'; // Importa useParams para obtener el slug
import Swal from 'sweetalert2'; // Importa SweetAlert2

// Configuración del localizador
dayjs.locale('es'); // Establece el locale a español
const localizer = dayjsLocalizer(dayjs);

const SlugNoticia = () => {
  const { slug } = useParams(); // Obtén el slug de la URL
  const [noticia, setNoticia] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetails, setShowDetails] = useState(false); // Estado para controlar la visibilidad

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const response = await axios.post(`https://start-digital.onrender.com/gestion/noticias/slug`, { slug }); // Cambia la URL según tu API
        setNoticia(response.data.data); // Asigna la noticia recibida
        console.log(noticia);
      } catch (error) {
        console.error('Error al obtener la noticia:', error);
        Swal.fire('Error', 'No se pudo cargar la noticia', 'error');
      }
    };
  
    fetchNoticia();
  }, [slug]); // Se ejecuta cada vez que cambia el slug
  

  return (
    <>
      <div id="inicio" className="page">
        <Navbar />
        <section className="sec-general-banner">
          <div className="cont-h1-tele">
            <h1 className="h1-tele font-robot font-normal text-white">Noticias de Start Digital</h1>
          </div>
        </section>
        <div className="contenido">
          <section className="section-profesores">
            <h1 className="h1-pags">
            {noticia && (
                    <div>
                        {noticia.titulo}
                        
            <div className="cont-intro flex justify-center mb-4">
              <div className="cont-intro flex justify-center my-4" style={{maxHeight: "450px", width: "auto"}}>
               <img src={noticia.img} alt="" style={{maxHeight: "450px", width: "auto"}} className="rounded"/>
              </div>
            </div>
                    </div>
            )}
            </h1>
            <div className="cont-intro flex justify-center mb-8">
              <div className="overflow-x-auto  mb-4" style={{maxWidth: "800px"}}>
              {noticia && (
                    <div>
                        <div
                        dangerouslySetInnerHTML={{ __html: noticia.contenido }} // Inserta el HTML aquí
                        />
                    </div>
                    )}
              </div>
            </div>
          </section>
        </div>
        <Foo />
      </div>
    </>
  );
};

export default SlugNoticia;
