import Navbar from "./Navbar";
import Foo from "./Foo";
import './Profesores.css';
import './PublicView.css';
import { useState, useEffect } from "react";
import axios from 'axios';

const PublicEgresados = () => {
  const [telematica, setTelematica] = useState([]);
  const [produccion, setProduccion] = useState([]);
  const [informatica, setInformatica] = useState([]);
  const [matematicas, setMatematicas] = useState([]);
  const [fisica, setFisica] = useState([]);
  const [analisisSistemas, setAnalisisSistemas] = useState([]);

  useEffect(() => {
    const fetchEgresados = async () => {
      try {
        const response = await axios.get('https://start-digital.onrender.com/gestion/egresados/');

        // Filtrar y ordenar los egresados que son de la carrera "Telemática"
        const tele = response.data
          .filter(egresado => egresado.data.carrera.toLowerCase() === 'ingeniería telemática')
          .sort((a, b) => b.data.anoEgreso - a.data.anoEgreso);
        setTelematica(tele);

        // Filtrar y ordenar los egresados que son de la carrera "Producción"
        const prod = response.data
          .filter(egresado => egresado.data.carrera.toLowerCase() === 'ingeniería de producción')
          .sort((a, b) => b.data.anoEgreso - a.data.anoEgreso);
        setProduccion(prod);

        // Filtrar y ordenar los egresados que son de la carrera "Informática"
        const info = response.data
          .filter(egresado => egresado.data.carrera.toLowerCase() === 'ingeniería informática')
          .sort((a, b) => b.data.anoEgreso - a.data.anoEgreso);
        setInformatica(info);

        // Filtrar y ordenar los egresados que son de la carrera "Matemática"
        const mat = response.data
          .filter(egresado => egresado.data.carrera.toLowerCase() === 'licenciatura en matemática')
          .sort((a, b) => b.data.anoEgreso - a.data.anoEgreso);
        setMatematicas(mat);

        // Filtrar y ordenar los egresados que son de la carrera "Física"
        const fis = response.data
          .filter(egresado => egresado.data.carrera.toLowerCase() === 'licenciatura en física')
          .sort((a, b) => b.data.anoEgreso - a.data.anoEgreso);
        setFisica(fis);  

        // Filtrar y ordenar los egresados que son de la carrera "Análisis de Sistemas"
        const ana = response.data
          .filter(egresado => egresado.data.carrera.toLowerCase() === 'análisis de sistema')
          .sort((a, b) => b.data.anoEgreso - a.data.anoEgreso);
        setAnalisisSistemas(ana);

        console.log(response.data);
      } catch (error) {
        console.error('Error al obtener los egresados:', error);
      }
    };

    fetchEgresados();
  }, []);

  return (
    <>
      <div id="inicio" className="page">
        <Navbar />
        <section className="sec-general-banner">
          <div className="cont-h1-tele">
            <h1 className="h1-tele font-robot font-normal text-white ">Decanato de Ciencias y Tecnología</h1>
          </div>
        </section>
        <div className="contenido">
          <section className="section-profesores">
            <h1 className="h1-pags">Estudiantes Egresados del Decanato de Ciencias y Tecnología</h1>
            <div className="cont-intro flex justify-center">
              <p className="p-profesores text-j">
                En el Decanato de Ciencias y Tecnología, nos enorgullece presentar a nuestros egresados, quienes representan el verdadero espíritu de nuestra casa de estudios. Cada uno de ellos ha sido formado con dedicación, compromiso y una sólida base académica, lo que les ha permitido destacarse en sus respectivas áreas profesionales.
                <br /><br />
                Nuestros egresados son el reflejo de la excelencia educativa que promovemos, y su éxito es un testimonio del esfuerzo y la pasión que han invertido durante su formación. Con sus logros, no solo honran su trayectoria personal, sino que también contribuyen al prestigio y reconocimiento de nuestra universidad en el ámbito nacional e internacional.
              </p>
            </div>

            {/* Repetir este bloque para cada carrera */}
            {[
  { title: "Ingeniería Telemática", data: telematica },
  { title: "Ingeniería en Producción", data: produccion },
  { title: "Ingeniería Informática", data: informatica },
  { title: "Licenciatura en Matemáticas", data: matematicas },
  { title: "Licenciatura en Física", data: fisica },
  { title: "Análisis de Sistemas", data: analisisSistemas },
].map((carrera, index) => (
  carrera.data.length > 0 && ( // Solo renderizar si hay egresados
    <div key={index}>
      <h2 className="h2-pags">{carrera.title}</h2>
      <div className="cont-profesores">
        {carrera.data.map((egresado) => (
          <div key={egresado.id} className="carta-profesor flex flex-col overflow-hidden rounded-lg shadow-lg">
            <div className="cont-img-prof flex-shrink-0">
              <img className="h-full w-full" src={egresado.data.img} alt="" />
            </div>
            <div className="flex flex-col justify-between flex-1 p-6 bg-white">
              <div className="flex-1">
                <a href="#" className="block mt-2">
                  <p className="text-xl font-semibold text-neutral-600">{egresado.data.nombre}</p>
                  <p className="text-base text-gray-500">{"Egresado de la carrera: " + egresado.data.carrera}</p>
                  <div className="flex">
                    <p className="text-base py-1 px-2 rounded-pill text-white mt-2" style={{ background: "#011240", borderRadius: "20px" }}>{"Año de promoción " + egresado.data.anoEgreso}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
))}

          </section>
        </div>
        <Foo />
      </div>
    </>
  );
};

export default PublicEgresados;
