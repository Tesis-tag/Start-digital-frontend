import Navbar from "./Navbar";
import Foo from "./Foo";
import "./Profesores.css";
import "./PublicView.css";
import { useState, useEffect } from "react"
import axios from 'axios'

const PublicPregunetasFrecuentes = () => {
 

  const [openIndex, setOpenIndex] = useState(null);
  const [profesores, setProfesores] = useState([]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  useEffect(() => {
    const fetchProfesores = async () => {
        try {
            const response = await axios.get('https://start-digital.onrender.com/gestion/preguntas-frecuentes/');
            setProfesores(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error al obtener los profesores:', error);
        }
    };

    fetchProfesores();
  }, []);
  console.log(profesores)


  return (
    <>
      <div id="inicio" className="page">
        <Navbar />
        <section id="inicio" className="sec-general-banner">
          <div className="cont-h1-tele">
            <h1 className="h1-tele font-robot font-normal text-white ">Preguntas Frecuentes</h1>
          </div>
        </section>
        <div className="contenido">
          <section className="section-profesores">
            <h1 className="h1-pags text-center text-3xl font-bold mb-4">
            ¿Tienes preguntas?
            </h1>
            <p className="text-center text-gray-600 mb-8 px-4">
    A continuación, se presentan algunas de las preguntas más comunes que tienen nuestros clientes y potenciales clientes sobre nuestros servicios de fotografía y gestión de redes sociales, junto con sus respuestas. Estas preguntas abarcan diversos temas, desde el proceso de contratación y las tarifas, hasta los tipos de servicios que ofrecemos y cómo podemos ayudar a potenciar tu marca. Nuestro objetivo es proporcionar información clara y útil para ayudarte a tomar decisiones informadas. Si tienes más preguntas o necesitas información adicional, no dudes en contactar a nuestro equipo.
</p>


            <div className="max-w-3xl mx-auto">
              {profesores.map((contacto, index) => (
                <div key={contacto.id} className="mb-2">
                  {/* Header del Acordeón */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full text-left px-4 py-2  text-white font-semibold rounded-t-lg flex justify-between items-center text-lg"
                    style={{ backgroundColor: "#011240" }}
                  >
                    <span>{contacto.data.pregunta}</span>
                    <span>{openIndex === index ? "−" : "+"}</span>
                  </button>

                  {/* Contenido del Acordeón */}
                  {openIndex === index && (
                    <div className="px-4 py-2  text-gray-700 rounded-b-lg"
                    style={{ backgroundColor: "#f2f3f4" }}
                    >
                      <p>{contacto.data.respuesta}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
        <Foo />
      </div>
    </>
  );
};

export default PublicPregunetasFrecuentes;
