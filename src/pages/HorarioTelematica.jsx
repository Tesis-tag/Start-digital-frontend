import Navbar from "../pages/Navbar"
import Foo from "../pages/Foo"
import './Telematica.css'
import { useState, useEffect } from "react"
import axios from "axios"

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";


const HorarioTelematica = () => {

  const generarPDF = async () => {
    const input = document.getElementById("tabla-horario");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgWidth = 190; // Ajusta el ancho según sea necesario
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("horario.pdf");
  };



    const [horario, setHorario] = useState({
        lunes: {},
        martes: {},
        miercoles: {},
        jueves: {},
        viernes: {},
      });
      
      const [semestreSeleccionado, setSemestreSeleccionado] = useState('1er');
      const [seccionSeleccionada, setSeccionSeleccionada] = useState('1'); // Cambiado a '1'
      const [cargando, setCargando] = useState(false);
    
      const horas = [
        { inicio: '8:00AM', fin: '8:45AM' },
        { inicio: '8:45AM', fin: '9:30AM' },
        { inicio: '9:30AM', fin: '10:15AM' },
        { inicio: '10:15AM', fin: '11:00AM' },
        { inicio: '11:00AM', fin: '11:45AM' },
        { inicio: '11:45AM', fin: '12:30PM' },
        { inicio: '12:30PM', fin: '1:15PM' },
        { inicio: '1:15PM', fin: '2:00PM' },
        { inicio: '2:00PM', fin: '2:45PM' },
        { inicio: '2:45PM', fin: '3:30PM' },
        { inicio: '3:30PM', fin: '4:15PM' },
      ];
    

  
    
      useEffect(() => {
        // Restablecer el horario cuando cambie el semestre o la sección
        setHorario({
          lunes: {},
          martes: {},
          miercoles: {},
          jueves: {},
          viernes: {},
        });
      
        const cargarHorario = async () => {
          setCargando(true);
          try {
            const response = await axios.get(`https://start-digital.onrender.com/horarios/update/${semestreSeleccionado}/${seccionSeleccionada}`);
            const data = response.data;
      
            setHorario(data.data);
            console.log('Horario cargado:', data.data);
          } catch (error) {
            // console.error('Error al cargar el horario:', error);
          } finally {
            setCargando(false);
          }
        };
      
        cargarHorario();
      }, [semestreSeleccionado, seccionSeleccionada]);
      

  return (
    <div>
           <Navbar />
           <main className="main-tele">
         <section className="sec-tele-banner">
            <div className="cont-h1-tele">
                <h1 className="h1-tele font-robot font-normal text-white ">Horarios de Ingeniería Telemática</h1>
            </div>
         </section>
       


        <div className="rounded-lg  overflow-auto">
        <section className="sec-tele">
            <div className="cont-informacion">
            <div className="div-informacion">
                <p className="p-tele  text-justify">
                    Para maximizar su aprendizaje, es crucial que nuestros estudiantes tengan acceso a un horario bien estructurado. El horario no solo organiza las clases, sino que también permite a los estudiantes planificar su tiempo de estudio y actividades extracurriculares. 
                </p>
                <p className="p-tele  text-justify">
                    A continuación, les presentamos el horario de clases, donde podrán ver de manera clara y concisa las asignaturas, horarios y salones. Esto les ayudará a gestionar su tiempo de manera efectiva y a aprovechar al máximo su experiencia académica en un entorno tecnológico en constante evolución.
                </p>
            </div>

            </div>
            </section>
            <div className="flex justify-center">
              <h2 className="h2-intro">Selecciona el semestre</h2>
            </div>
            <div className="d-flex text-center p-1 mx-2 my-4 rounded space-x-1 space-y-1">
              {['1er', '2do', '3er', '4to', '5to', '6to', '7mo', '8vo', '9no', '10mo'].map((semestre) => (
                <button
                  key={semestre}
                  onClick={() => setSemestreSeleccionado(semestre)}
                  className={`px-4 py-2 text-gray-800 rounded border-2 text-lg font-medium ${
                    semestreSeleccionado === semestre ? 'bg-white border-gray-300' : 'bg-gray-300 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {semestre}
                </button>
              ))}
            </div>

            <div className='flex justify-center'>
              <p>Selecciona la sección</p>
            </div>
            <div className="flex justify-center space-x-1">
              <div className="inline-flex p-1 mx-2 mb-4 rounded space-x-1 bg-gray-300 ">
                {[1, 2, 3, 4].map(num => (
                  <button
                    key={num}
                    onClick={() => setSeccionSeleccionada(num.toString())}
                    className={`px-4 py-2 text-gray-800 rounded ${
                      seccionSeleccionada === num.toString() ? 'bg-white' : 'bg-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full flex justify-center mb-5">
              <div className="rounded-md border border-gray-200 overflow-auto mb-4 w-[850px]">
                <table id="tabla-horario" className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="text-left">
                    <tr className="text-base">
                      <th className="pr-1 pl-4 py-2 font-medium text-gray-900 text-center" style={{ width: '180px' }}>Hora</th>
                      <th className="px-2 py-2 font-medium text-gray-900 text-center">Lunes</th>
                      <th className="px-2 py-2 font-medium text-gray-900 text-center">Martes</th>
                      <th className="px-2 py-2 font-medium text-gray-900 text-center">Miércoles</th>
                      <th className="px-2 py-2 font-medium text-gray-900 text-center">Jueves</th>
                      <th className="px-2 py-2 font-medium text-gray-900 text-center">Viernes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {horas.map((hora, index) => (
                      <tr key={index}>
                        <td className="pr-1 pl-4 py-1 text-gray-900 px-2 text-center"  style={{ height: '60px' }} >{`${hora.inicio} - ${hora.fin}`}</td>
                        {['lunes', 'martes', 'miercoles', 'jueves', 'viernes'].map(dia => (
                          <td key={dia} className="px-2 py-1 text-center">
                            {/*
                            
                            <input
                              disabled
                              type="text"
                              name={`${dia}-materia-${hora.inicio.replace(':', '')}`}
                              value={horario[dia]?.[hora.inicio.replace(':', '')]?.materia || ''}
                              className="border p-1 w-full mb-1 bg-white whitespace-nowrap"
                            />
                            <input
                              type="text"
                              disabled
                              name={`${dia}-salon-${hora.inicio.replace(':', '')}`}
                              value={horario[dia]?.[hora.inicio.replace(':', '')]?.salon || ''}
                              className="border p-1 w-full bg-white whitespace-nowrap"
                            />
                            */}
                            <p className="">{horario[dia]?.[hora.inicio.replace(':', '')]?.materia || ''}</p>
                            <p className="whitespace-nowrap ">{horario[dia]?.[hora.inicio.replace(':', '')]?.salon ? (
                                <span>Salón: {horario[dia][hora.inicio.replace(':', '')].salon}</span>
                            ) : null}
                            </p>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <button onClick={generarPDF} className="w-24 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-5">
              Descargar PDF
            </button>
    
          </div>

        </main>

           <Foo />
    </div>
  )
}

export default HorarioTelematica