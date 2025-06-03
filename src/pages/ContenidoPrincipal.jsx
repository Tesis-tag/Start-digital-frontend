import './ContenidoPrincipal.css'
import '@fontsource-variable/onest';
import foto1 from '../img/seccpri.jpg'
import cuentanos from '../img/cuentanos1.jpg'
import portada from '../img/port-m1.jpg'
import logo from '../img/logom.jpg'
import team1 from '../img/miguel.jpg'
import team2 from '../img/rebeca.jpg'
import imgcomu from '../img/comu.jpg'
import img2 from '../img/secccomu.jpg'
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import Swal from "sweetalert2"



const ContenidoPrincipal = () => {

  const [egresados, setEgresados] = useState([]);
  const [mensaje, setMensaje] = useState({
    correo: '',
    mensaje: ''
  });
  const [noticia, setNoticia] = useState([]);
  const [eventos, setEventos] = useState([]);



  const [servicios, setServicios] = useState([]);
  const [terminosBusqueda, setTerminosBusqueda] = useState('');

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get('https://start-digital.onrender.com/gestion/servicios/');
        setServicios(response.data);
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
      }
    };

    fetchServicios();
  }, []);

  const eliminarAcentos = (cadena) => {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const terminosBusquedaSinAcentos = eliminarAcentos(terminosBusqueda.toLowerCase());

  const filteredServicios = servicios.filter((servicio) =>
    eliminarAcentos(` ${servicio.data.descripcion}`)
      .toLowerCase()
      .includes(terminosBusquedaSinAcentos)
  );

  const manejarSolicitud = (servicio) => {
    // Redirige a la ruta /servicios
    window.location.href = '/servicios'; // Cambia esto según tu lógica de redirección
  };



  

  useEffect(() => {
    const fetchEgresados = async () => {
      try {
        const response = await axios.get('https://start-digital.onrender.com/gestion/egresados/');
        
        // Ordenar por anoEgreso de forma descendente
        const sortedEgresados = response.data.sort((a, b) => b.data.anoEgreso - a.data.anoEgreso);
        
        // Establecer solo los 3 primeros egresados
        setEgresados(sortedEgresados.slice(0, 3));
        
        console.log(sortedEgresados);
      } catch (error) {
        console.error('Error al obtener los egresados:', error);
      }
    };

    const fetchNoticias = async () => {
      try {
        const response = await axios.get('https://start-digital.onrender.com/gestion/noticias/');
        
        // Ordenar por anoEgreso de forma descendente
        const sorted = response.data.sort((a, b) => b.data.fecha - a.data.fecha);
        
        // Establecer solo los 3 primeros egresados
        setNoticia(sorted.slice(0, 3));
        
        console.log(sorted);
      } catch (error) {
        console.error('Error al obtener los egresados:', error);
      }
    };
    
    const fetchEventos = async () => {
      try {
        const response = await axios.get('https://start-digital.onrender.com/gestion/eventos/');
        
        // Ordenar por anoEgreso de forma descendente
        const sorted = response.data.sort((a, b) => b.data.fecha - a.data.fecha);
        
        // Establecer solo los 3 primeros egresados
        setEventos(sorted.slice(0, 3));
        
        console.log(sorted);
      } catch (error) {
        console.error('Error al obtener los egresados:', error);
      }
    };

    fetchEgresados();
    fetchNoticias();
    fetchEventos();
  }, []);

  const handleInputChange = (event) => {
    setMensaje({
      ...mensaje,
      [event.target.name]: event.target.value,
    })
}
 
const registrarMensaje = async () => {
  console.log(mensaje); // Verifica el contenido del mensaje

  if (!mensaje.mensaje) {
      Swal.fire({
          title: "Campos incompletos",
          text: "Por favor ingresa un mensaje",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
          customClass: {
              container: 'custom-swal-container'
          }
      });
  } else {
      try {
          // Enviar la solicitud al servidor
          const response = await axios.post('https://start-digital.onrender.com/gestion/mensajes/registrar', mensaje, {
              headers: {
                  'Content-Type': 'application/json' // Cambiar a application/json
              }
          });

          Swal.fire({
              title: "Registrado",
              text: "Mensaje registrado con éxito",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok",
              customClass: {
                  container: 'custom-swal-container'
              }
          }).then((result) => {
              if (result.isConfirmed) {
                  borrarTexto();
              }
          });

          console.log("Mensaje registrado:", response.data);
      } catch (error) {
          console.error('Error al registrar mensaje:', error);
          Swal.fire({
              title: "Error",
              text: error.response?.data || 'Error al registrar mensaje',
              icon: "error",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok",
              customClass: {
                  container: 'custom-swal-container'
              }
          });
      }
  }
}


function borrarTexto() {
  setMensaje({
    mensaje:"",
    correo:""
    });
  }



  const team = [
    {
        avatar: team1,
        name: "Miguel Ríos",
        title: "Product designer",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesettin industry.",
        linkedin: "javascript:void(0)",
        twitter: "javascript:void(0)",
    },
    {
        avatar: team2,
        name: "Auris Ríos",
        title: "Software engineer",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesettin industry.",
        linkedin: "javascript:void(0)",
        twitter: "javascript:void(0)",
    },
]

  return (
    <>
        <main className="main">

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8" style={{ height: '100vh' }}>
  <div className="flex flex-col justify-center h-full">
    <div className='max-w-lg md:max-w-none mx-auto text-center'>
      <div className='ml-10'>
        <div className='flex justify-center'>
          <img src={logo} alt="" />
        </div>
        <h3 className="text-indigo-600 font-semibold">
          Servicios Profesionales
        </h3>
        <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
          Captura momentos inolvidables y potencia tu presencia en línea
        </p>
        <p className="mt-3 text-gray-600">
          En Start Digital, ofrecemos sesiones de fotos personalizadas y servicios de community management para ayudarte a destacar en el mundo digital. Nuestro equipo profesional está dedicado a proporcionarte resultados excepcionales y una experiencia inolvidable.
        </p>
        <a href="javascript:void(0)" className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium">
          Descubre nuestros servicios
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </div>

  <div className="relative h-full cont-img-portada hidden md:block">
    <img
      src={portada}
      className="w-full h-full object-cover rounded"
      alt=""
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
    />
  </div>
</div>




          <div className="contenedor-main" >
            <div className="div-cont-1 "  style={{ height: '80vh', alignItems: 'center' }}>


<section className="relative pt-12">
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">

    <div className="relative">
        <img
          src={imgcomu}
          className="rounded relative z-10"
          alt=""
        />
    
      </div>

      <div className=''>
        <div className="max-w-lg md:max-w-none">
        <h3 className="text-indigo-600 font-semibold">
    Servicios de Community Management
</h3>
<p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
    Potencia tu marca y conecta con tu audiencia
</p>
<p className="mt-3 text-gray-600">
    Entendemos que una presencia efectiva en redes sociales es crucial para el éxito de tu negocio. Nuestro equipo de community managers se dedica a crear contenido atractivo, gestionar interacciones y construir una comunidad leal en torno a tu marca.
</p>
<ul className="mt-5 list-disc list-inside text-gray-600">
    <li><strong>Creación de Contenido:</strong> Desarrollamos publicaciones visuales y escritas que resuenan con tu audiencia.</li>
    <li><strong>Gestión de Interacciones:</strong> Respondemos a comentarios y mensajes para fomentar la participación y la lealtad.</li>
    <li><strong>Monitoreo de Resultados:</strong> Analizamos métricas para ajustar estrategias y maximizar el impacto.</li>
    <li><strong>Estrategias Personalizadas:</strong> Creamos planes de contenido adaptados a tus objetivos y audiencia.</li>
</ul>

        </div>
      </div>


    </div>
  </div>
</section>


            </div>


            <div className="max-w-screen-xl px-12 py-8 mb-12 border border-gray-400 shadow-sm rounded-lg w-full" style={{background: '#f7f7f7'}}>
      <p className="text-gray-800 text-3xl font-semibold sm:text-4xl text-center" >
      Servicios Ofrecidos de Comunity Manager
</p>
      <div className="relative px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="relative mx-auto max-w-7xl">
        

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 md:gap-8">
            {filteredServicios.map((servicio) => (
              <div key={servicio.id} className="divide-y divide-gray-400 rounded-2xl border border-gray-400 shadow-xs">
                <div className="p-6 sm:px-8">
                  <h2 className="text-lg font-medium text-gray-900">{servicio.data.titulo}</h2>
                  <p className="mt-2 text-gray-700">{servicio.data.descripcion}</p>
                  <p className="mt-2 sm:mt-4">
                    <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">{servicio.data.precio}$</strong>
                    <span className="text-sm font-medium text-gray-700">/mes</span>
                  </p>
                  <button
                    onClick={() => manejarSolicitud(servicio)}
                    className="w-full mt-4 border border-indigo-600 block rounded-sm bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden sm:mt-6"
                  >
                    Suscribirse
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
        </div>
      </div>
    </div>

    <section className="w-full text-white py-6" style={{ background: "#011240" }}>
           <div>
            <h2 className="h2-intro mt-8">Start Digital al Día</h2>
            <div className='flex justify-center'>
            <p className='p-intro text-justify'>
              <span className='text-white'>Te invitamos a explorar nuestra sección de noticias, donde encontrarás información relevante.</span> <span>
                <Link to="/noticias" className="mt-4 inline-block text-blue-600 hover:underline">Ver todas las noticias</Link>
              </span>
            </p>
            </div>
          </div>
          <div className='div-cont-4 mb-4'>
            <section className='section sec-4'>
              {noticia.map((egresado) => (
                <div key={egresado.id} className="carta-profesor flex flex-col overflow-hidden rounded-lg shadow-lg">
                    <a href={`/noticias/${egresado.data.slug}`}>
                  <div className="cont-img-prof flex-shrink-0">
                    <img className="h-full w-full" src={egresado.data.img} alt="" />
                  </div>
                  <div className="flex flex-col justify-between flex-1 p-6 bg-white">
                    <div className="flex-1">
                      <a href={`/noticias/${egresado.data.slug}`} className="block mt-2">
                        <p className="text-xl font-semibold text-neutral-600">{egresado.data.titulo}</p>
                        <p
                            style={{
                                height: "72px",
                                overflow: "hidden",        // Oculta el contenido que desborda
                                textOverflow: "ellipsis",  // Agrega "..." al final si el texto es demasiado largo
                                display: "-webkit-box",    // Usar un contenedor flexible
                                WebkitBoxOrient: "vertical", // Orientación vertical
                                lineClamp: 3,              // Número de líneas que se mostrarán
                            }}
                            className="text-base text-gray-500"
                        >
                            {egresado.data.descripcion}
                        </p>

                        <div className="flex">
                          <p className="text-base py-1 px-2 rounded-pill text-white mt-2" style={{ background: "#011240", borderRadius: "20px" }}>{egresado.data.fecha}</p>
                        </div>
                      </a>
                    </div>
                  </div>
                  </a>
                </div>
              ))}
             
            </section>
          </div>
           </section>

   
            <div className="w-full" style={{ background: "#f7f7f7" }}>
     

            <section className="py-o">
              


            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8 text-center  border rounded-lg pl-lg-8 bg-white">

      <div className='py-8  px-4 px-lg-0'>
        <div className="max-w-lg md:max-w-none">
        <h3 className="text-indigo-600 font-semibold text-center">
    Sesiones de Fotos y Cobertura de Eventos
</h3>
<p className="text-gray-800 text-3xl font-semibold sm:text-4xl text-center">
    Captura los momentos más importantes de tu vida
</p>
<p className="mt-3 text-gray-600 text-center">
    Nos especializamos en ofrecer sesiones de fotos personalizadas y cobertura profesional de eventos. Nuestro objetivo es inmortalizar cada instante, asegurando que tus recuerdos sean tan vívidos como el día en que ocurrieron.
</p>
<ul className="mt-5 list-disc list-inside text-center text-gray-600">
    <li><strong>Sesiones de Fotos Personalizadas:</strong> Creamos experiencias únicas adaptadas a tus necesidades y estilo.</li>
    <li><strong>Cobertura de Eventos:</strong> Desde bodas hasta cumpleaños, capturamos cada detalle y emoción.</li>
    <li><strong>Edición Profesional:</strong> Ofrecemos un acabado de alta calidad en todas nuestras fotografías.</li>
    <li><strong>Entrega Rápida:</strong> Recibe tus fotos en un tiempo récord para que puedas revivir esos momentos de inmediato.</li>
</ul>
<a href="javascript:void(0)" className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium">
Reserva tu sesión hoy
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
    </svg>
</a>

        </div>
      </div>

      <div className="relative">
        <img
          src={foto1}
          className="rounded relative z-10"
          alt=""
        />
    
      </div>
     

    </div>
  </div>

        </section>


            </div>
          


            <div className="div-cont-3">
            <section className='section sec-3'>
              
          

            </section>
            </div>
           
      


          <section className="overflow-hidden  sm:grid sm:grid-cols-2 sm:items-center text-white" style={{ background: "#011240" }}>

    <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
      
      
    <section className="text-gray-600 body-font relative">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-6">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">¡Comunicate con nosotros!</h1>
      <p className="lg:w-full mx-auto leading-relaxed text-base text-j text-white">
      En Start Digital, estamos aquí para ayudarte. Si tienes preguntas, consultas o necesitas asistencia, no dudes en ponerte en contacto con nosotros. Proporciona tu correo electrónico para que podamos responderte lo más pronto posible.
      <br></br>
      <br></br>
      Además, si deseas compartir experiencias o inquietudes sobre nuestros servicios, puedes hacerlo de forma anónima. Tu opinión es valiosa y queremos asegurarnos de que te sientas escuchado y respaldado.
      </p>
    </div>
    <div className="lg:w-full md:w-2/3 mx-auto">
      <div className="flex flex-wrap ">
        <div className="p-2 w-">
          
        </div>
        <div className="p-2 w-full">
          
          <div className="relative">
            <label htmlFor="email" className="leading-7 text-sm text-white">Correo (opcional)</label>
            <input
            onChange={handleInputChange}
            type="email" id="correo" name="correo" className="w-full bg-blue-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="p-2 w-full">
          <div className="relative">
            <label htmlFor="message" className="leading-7 text-sm text-white">Mensaje</label>
            <textarea
            onChange={handleInputChange}
            id="mensaje" name="mensaje" className="w-full bg-blue-100 bg-opacity-50 rounded  focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        <div className="p-2 w-full">
          <button
          onClick={registrarMensaje}
          className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg" >Enviar</button>
        </div>  
      </div>
    </div>
  </div>
</section>



      
      

  </div>

  <img
    alt=""
    src={img2}
    className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
  />
</section>

<section className="w-full  py-6" style={{minHeight:'500px'}} >
           <div>
           <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl text-center mt-12">
   Nuestros Eventos
</h3>
            <div className='flex justify-center'>
            <p className='p-intro text-justify'>
              <span className=''>Te invitamos a explorar nuestra sección de eventos, donde encontrarás información relevante.</span> <span>
                <Link to="/noticias" className="mt-4 inline-block text-blue-600 hover:underline">Ver todos los eventos</Link>
              </span>
            </p>
            </div>
          </div>
          <div className='div-cont-4 mb-4'>
            <section className='section sec-4'>
              {eventos.map((egresado) => (
                <div key={egresado.id} className="carta-profesor flex flex-col overflow-hidden rounded-lg shadow-lg">
                    <a href={`/noticias/${egresado.data.slug}`}>
                  <div className="cont-img-prof flex-shrink-0">
                    <img className="h-full w-full" src={egresado.data.img} alt="" />
                  </div>
                  <div className="flex flex-col justify-between flex-1 p-6 bg-white">
                    <div className="flex-1">
                      <a href={`/noticias/${egresado.data.slug}`} className="block mt-2">
                        <p className="text-xl font-semibold text-neutral-600">{egresado.data.titulo}</p>
                        <p
                            style={{
                                height: "72px",
                                overflow: "hidden",        // Oculta el contenido que desborda
                                textOverflow: "ellipsis",  // Agrega "..." al final si el texto es demasiado largo
                                display: "-webkit-box",    // Usar un contenedor flexible
                                WebkitBoxOrient: "vertical", // Orientación vertical
                                lineClamp: 3,              // Número de líneas que se mostrarán
                            }}
                            className="text-base text-gray-500"
                        >
                            {egresado.data.descripcion}
                        </p>

                        <div className="flex">
                          <p className="text-base py-1 px-2 rounded-pill text-white mt-2" style={{ background: "#011240", borderRadius: "20px" }}>{egresado.data.fecha}</p>
                        </div>
                      </a>
                    </div>
                  </div>
                  </a>
                </div>
              ))}
             
            </section>
          </div>
           </section>


       


           <div className="div-cont-1">
     

     <section className="py-14">
       




     <div className="max-w-screen-xl mx-auto px-4 text-center md:px-8 py-12">
         <div className="max-w-xl mx-auto">
         <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
    Conoce a Nuestro Equipo
</h3>
<p className="text-gray-600 mt-3">
    Contamos con un equipo apasionado y profesional dedicado a ofrecerte el mejor servicio. Nuestro compromiso es entender tus necesidades y brindarte soluciones efectivas. Cada miembro de nuestro equipo aporta experiencia y entusiasmo, asegurando que cada interacción sea valiosa.
</p>

         </div>
         <div className="mt-12">
             <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-2">
                 {
                     team.map((item, idx) => (
                         <li key={idx}>
                             <div className="w-24 h-24 mx-auto">
                                 <img
                                     src={item.avatar}
                                     className="w-full h-full rounded-full"
                                     alt=""
                                 />
                             </div>
                             <div className="mt-2">
                                 <h4 className="text-gray-700 font-semibold sm:text-lg">{item.name}</h4>
                                 <p className="text-indigo-600">{item.title}</p>
                                 <p className="text-gray-600 mt-2">{item.desc}</p>
                                 <div className="mt-4 flex justify-center gap-4 text-gray-400">
                                     <a href={item.twitter}>
                                         <svg className="w-5 h-5 duration-150 hover:text-gray-500" fill="currentColor" viewBox="0 0 48 48"><g clip-path="url(#clip0_17_80)"><path fill="currentColor" d="M15.1 43.5c18.11 0 28.017-15.006 28.017-28.016 0-.422-.01-.853-.029-1.275A19.998 19.998 0 0048 9.11c-1.795.798-3.7 1.32-5.652 1.546a9.9 9.9 0 004.33-5.445 19.794 19.794 0 01-6.251 2.39 9.86 9.86 0 00-16.788 8.979A27.97 27.97 0 013.346 6.299 9.859 9.859 0 006.393 19.44a9.86 9.86 0 01-4.462-1.228v.122a9.844 9.844 0 007.901 9.656 9.788 9.788 0 01-4.442.169 9.867 9.867 0 009.195 6.843A19.75 19.75 0 010 39.078 27.937 27.937 0 0015.1 43.5z" /></g><defs><clipPath id="clip0_17_80"><path fill="currentColor" d="M0 0h48v48H0z" /></clipPath></defs></svg>
                                     </a>
                                     <a href={item.linkedin}>
                                         <svg className="w-5 h-5 duration-150 hover:text-gray-500" fill="none" viewBox="0 0 48 48"><g clip-path="url(#clip0_17_68)"><path fill="currentColor" d="M44.447 0H3.544C1.584 0 0 1.547 0 3.46V44.53C0 46.444 1.584 48 3.544 48h40.903C46.407 48 48 46.444 48 44.54V3.46C48 1.546 46.406 0 44.447 0zM14.24 40.903H7.116V17.991h7.125v22.912zM10.678 14.87a4.127 4.127 0 01-4.134-4.125 4.127 4.127 0 014.134-4.125 4.125 4.125 0 010 8.25zm30.225 26.034h-7.115V29.766c0-2.653-.047-6.075-3.704-6.075-3.703 0-4.265 2.896-4.265 5.887v11.325h-7.107V17.991h6.826v3.13h.093c.947-1.8 3.272-3.702 6.731-3.702 7.21 0 8.541 4.744 8.541 10.912v12.572z" /></g><defs><clipPath id="clip0_17_68"><path fill="currentColor" d="M0 0h48v48H0z" /></clipPath></defs></svg>
                                     </a>
                                 </div>
                             </div>
                         </li>
                     ))
                 }
             </ul>
         </div>
     </div>
 </section>






     </div>

          </div>
        </main>
    </>
  )
}

export default ContenidoPrincipal