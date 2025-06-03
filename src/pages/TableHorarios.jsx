import "./Table.css";
import "./TableCarreras.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import './Modal.css';
import Swal from "sweetalert2";

const TableHorarios = () => {
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

  const handleChange = (e) => {
    const [dia, tipo, hora] = e.target.name.split('-');
    setHorario({
      ...horario,
      [dia]: {
        ...horario[dia],
        [hora]: {
          ...horario[dia][hora],
          [tipo]: e.target.value,
        },
      },
    });
  };

  

  const guardarHorario = async () => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres guardar el horario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar'
    });
  
    if (isConfirmed) {
      setCargando(true);
      try {
        console.log('Datos a enviar:', {
          semestre: semestreSeleccionado,
          seccion: seccionSeleccionada,
          data: horario,
        });
  
        const response = await axios.post('https://start-digital.onrender.com/horarios/save', {
          semestre: semestreSeleccionado,
          seccion: seccionSeleccionada,
          data: horario,
        });
        console.log('Horario guardado exitosamente:', response.data);
        
        Swal.fire(
          'Guardado!',
          'El horario ha sido guardado exitosamente.',
          'success'
        );
      } catch (error) {
        console.error('Error al guardar el horario:', error);
        Swal.fire(
          'Error!',
          'Hubo un problema al guardar el horario.',
          'error'
        );
      } finally {
        setCargando(false);
      }
    }
  };
  

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
        console.error('Error al cargar el horario:', error);
      } finally {
        setCargando(false);
      }
    };
  
    cargarHorario();
  }, [semestreSeleccionado, seccionSeleccionada]);
  

  return (
    <div>
      <div className="cont-table">
        <div className="div-table">
          <div className="div-superior">
            <Link to="/gestion">
              <button 
            className="w-24 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2">
                Atrás
              </button>
            </Link>
            <h2 className="text-2xl leading-tight">Materias de la carrera de Telemática</h2>
          </div>
          <div className="rounded-lg border border-gray-200 overflow-auto">
            <h1 className="my-10 font-bold text-center">Editar Horario</h1>
            <div className="flex justify-center">
              <p>Selecciona el semestre</p>
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

            <div className="w-full flex justify-center">
              <div className="rounded-md border border-gray-200 overflow-auto mb-8 w-[850px]">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="text-left">
                    <tr className="text-base">
                      <th className="pr-1 pl-4 py-2 font-medium text-gray-900" style={{ width: '180px' }}>Hora</th>
                      <th className="px-2 py-2 font-medium text-gray-900">Lunes</th>
                      <th className="px-2 py-2 font-medium text-gray-900">Martes</th>
                      <th className="px-2 py-2 font-medium text-gray-900">Miércoles</th>
                      <th className="px-2 py-2 font-medium text-gray-900">Jueves</th>
                      <th className="px-2 py-2 font-medium text-gray-900">Viernes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {horas.map((hora, index) => (
                      <tr key={index}>
                        <td className="pr-1 pl-4 py-1 text-gray-900">{`${hora.inicio} - ${hora.fin}`}</td>
                        {['lunes', 'martes', 'miercoles', 'jueves', 'viernes'].map(dia => (
                          <td key={dia}>
                            <input
                              type="text"
                              name={`${dia}-materia-${hora.inicio.replace(':', '')}`}
                              value={horario[dia]?.[hora.inicio.replace(':', '')]?.materia || ''}
                              onChange={handleChange}
                              placeholder="Materia"
                              className="border p-1 w-full mb-1"
                            />
                            <input
                              type="text"
                              name={`${dia}-salon-${hora.inicio.replace(':', '')}`}
                              value={horario[dia]?.[hora.inicio.replace(':', '')]?.salon || ''}
                              onChange={handleChange}
                              placeholder="Salón"
                              className="border p-1 w-full"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={guardarHorario}
                className="w-24 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-8" 
              >
                {cargando ? 'Guardando...' : 'Guardar Horario'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableHorarios;
