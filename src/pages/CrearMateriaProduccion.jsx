import  { useState,  useRef, } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import './Modal.css'


const CrearMateriaProduccion = () => {
  const [materia, setMateria] = useState({
    semestre: '',
    asignatura: '',
    codigo: '',
    uc: '',
    descripcion: '',
    prelacion: '',
    profesores: {
      profesorSeccion1: '',
      profesorSeccion2: '',
      profesorSeccion3: '',
      profesorSeccion4: '',
    },
    idProfesores: {
      idProfesorSeccion1: '',
      idProfesorSeccion2: '',
      idProfesorSeccion3: '',
      idProfesorSeccion4: '',
    },
  });
  /*
      const [sec2Enabled, setSec2Enabled] = useState(false);
      const [sec3Enabled, setSec3Enabled] = useState(false);
      const [sec4Enabled, setSec4Enabled] = useState(false);
*/
      const semestreRef= useRef(null)
      const asignaturaRef= useRef(null)
      const codigoRef= useRef(null)
      const ucRef= useRef(null)
      const descripcionRef= useRef(null)
      const prelacionRef= useRef(null)
      const profesorSec1Ref= useRef(null)
      const profesorSec2Ref= useRef(null)
      const profesorSec3Ref= useRef(null)
      const profesorSec4Ref= useRef(null)
      const idProfesorSec1Ref= useRef(null)
      const idProfesorSec2Ref= useRef(null)
      const idProfesorSec3Ref= useRef(null)
      const idProfesorSec4Ref= useRef(null)

    

      const registrarMateria = async () => {
        if (!materia.semestre || !materia.asignatura || !materia.codigo){
            Swal.fire({
                title: "Campos incompletos",
                text: "Por favor llene todos los campos",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
                customClass: {
                  container: 'custom-swal-container' // Agrega una clase personalizada al contenedor de la alerta
                }
              });
        }else{
            try {
                // Enviar la solicitud al servidor
                const response = await axios.post('https://start-digital.onrender.com/materias/produccion/registrar', materia, {
                    
                }).then(
                    Swal.fire({
                        title: "Registrado",
                        text: "Profesor registrado con exito",
                        icon: "success",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Ok",
                        customClass: {
                          container: 'custom-swal-container' // Agrega una clase personalizada al contenedor de la alerta
                        }
                      }).then((result) => {
                        if (result.isConfirmed) {
                          borrarTexto();
                        }
                      })
                )
            
              console.log("Profesor registrado:", response.data);
              // Reinicia los campos del formulario
            } catch (error) {
              console.error('Error al registrar profesor:', error);
              // Maneja los errores, por ejemplo, muestra un mensaje de error al usuario
            }
        }
      }
/*
    const handleInputChange = (event) => {
        setMateria({
          ...materia,
          [event.target.name]: event.target.value,
        })
        console.log(materia)
    }*/
    const handleInputChange = (event) => {
      const { name, value } = event.target;
    
      if (name === 'profesorSeccion1' || name === 'profesorSeccion2' || name === 'profesorSeccion3' || name === 'profesorSeccion4') {
        setMateria(prevMateria => ({
          ...prevMateria,
          profesores: {
            ...prevMateria.profesores,
            [name]: value
          }
        }));
      } else if (name === 'idProfesorSeccion1' || name === 'idProfesorSeccion2' || name === 'idProfesorSeccion3' || name === 'idProfesorSeccion4') {
        setMateria(prevMateria => ({
          ...prevMateria,
          idProfesores: {
            ...prevMateria.idProfesores,
            [name]: value
          }
        }));
      } else {
        setMateria(prevMateria => ({
          ...prevMateria,
          [name]: value
        }));
      }
    };
    
    
    

    function borrarTexto() {
      /*
      setSec2Enabled(false); 
      setSec3Enabled(false); 
      setSec4Enabled(false); 
*/
      setMateria({
        semestre: '',
        asignatura: '',
        codigo: '',
        uc: '',
        descripcion: '',
        prelacion: '',
        profesores: {
          profesorSeccion1: '',
          profesorSeccion2: '',
          profesorSeccion3: '',
          profesorSeccion4: '',
        },
        idProfesores: {
          idProfesorSeccion1: '',
          idProfesorSeccion2: '',
          idProfesorSeccion3: '',
          idProfesorSeccion4: '',
        },
      });
      
      semestreRef.current.value="";
      asignaturaRef.current.value="";
      codigoRef.current.value="";
      ucRef.current.value="";
      descripcionRef.current.value="";
      prelacionRef.current.value="";
      profesorSec1Ref.current.value="";
      profesorSec2Ref.current.value="";
      profesorSec3Ref.current.value="";
      profesorSec4Ref.current.value="";
      idProfesorSec1Ref.current.value="";
      idProfesorSec2Ref.current.value="";
      idProfesorSec3Ref.current.value="";
      idProfesorSec4Ref.current.value="";
      
      }
/*
      const handleCheckChangeSec2 = () => {
        if (!sec2Enabled) {
          setSec2Enabled(true); 
        profesorSec2Ref.current.disabled = !sec2Enabled; 
        } else {
          setSec2Enabled(false); 
        profesorSec2Ref.current.disabled = !sec2Enabled; 
        }
      };
      const handleCheckChangeSec3 = () => {
        if (!sec3Enabled) {
          setSec3Enabled(true); 
        profesorSec3Ref.current.disabled = !sec3Enabled; 
        } else {
          setSec3Enabled(false); 
        profesorSec3Ref.current.disabled = !sec3Enabled; 
        }
      };
      const handleCheckChangeSec4 = () => {
        if (!sec4Enabled) {
          setSec4Enabled(true); 
        profesorSec4Ref.current.disabled = !sec4Enabled; 
        } else {
          setSec4Enabled(false); 
        profesorSec4Ref.current.disabled = !sec4Enabled; 
        }
      };
*/
      //Funcion para evitar que el form se envie y se colapse cuando se manda sin datos en los inputs
      const handleSubmit = (event) => {
        event.preventDefault(); // Evita que se envíe el formulario
        // Aquí puedes agregar tu código para procesar los datos del formulario
      };


  return (
    <>
          <div className="contenedor ">
        <div className="w-full p-4 bg-white rounded-lg shadow-lg">
        <h3 className="text-3xl font-semibold text-center text-gray-500 mt-1 mb-1">Registrar Materia</h3>
        <form onSubmit={handleSubmit} className="pl-8 pr-8">
            <div className="mb-2 flex gap-4">
            <div className="w-[50%]">
            <label htmlFor="semestre" className="block  text-sm text-gray-600">
               Semestre
            </label>
            <input
            ref={semestreRef}
                onChange={handleInputChange}
                type="text"
                id="semestre"
                name="semestre"
                className="class-input w-full px-2 py-1 text-sm border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            </div>
            <div className="w-[50%]">
            <div className="mb-1">
            <label htmlFor="codigo" className="block text-sm text-gray-600">
                Código
            </label>
            <input
                ref={codigoRef}
                onChange={handleInputChange}
                type="text"
                id="codigo"
                name="codigo"
                className="class-input text-sm w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            </div>
            </div>
            </div>
            <div className="mb-2">
            <label htmlFor="asignatura" className="block text-sm text-gray-600">
                Asignatura
            </label>
            <input
                ref={asignaturaRef}
                onChange={handleInputChange}
                type="text"
                id="asignatura"
                name="asignatura"
                className="class-input text-sm w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            </div>
            <div className="mb-1 gap-4 flex ">
           <div className="w-[50%]">
           <label htmlFor="uc" className="block text-sm text-gray-600">
                U/C
            </label>
            <input
                ref={ucRef}
                onChange={handleInputChange}
                type="text"
                id="uc"
                name="uc"
                className="class-input text-sm w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
           </div>
            <div className='w-[50%]'>
            <div className="mb-1">
            <label htmlFor="prelacion" className="block  text-sm text-gray-600">
                Prelación
            </label>
            <input
                ref={prelacionRef}
                onChange={handleInputChange}
                type="text"
                id="prelacion"
                name="prelacion"
                className="class-input text-sm w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            </div>
            </div>
            </div>
            <div className="mb-1">
            <label htmlFor="descripcion" className="block text-sm text-gray-600">
                Descripción
            </label>
            <textarea
                ref={descripcionRef}
                onChange={handleInputChange}
                type="text"
                id="descripcion"
                name="descripcion"
                className="class-input text-sm w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            </div>
            
            <div className='w-100'>
            <label htmlFor="profesorSeccion1" className="block  text-sm text-gray-600">
                Profesor
            <input
                ref={profesorSec1Ref}
                onChange={handleInputChange}
                type="text"
                id="profesorSeccion1"
                name="profesorSeccion1"
                className="class-input text-sm w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            </label>
            </div>

          {/**
           * 
           *  <div className='w-[50%]'>
           <label htmlFor="profesorSeccion2" className="block  text-sm text-gray-600">
                Profesor de la sección 2
            <input
                disabled={!sec2Enabled}
                ref={profesorSec2Ref}
                onChange={handleInputChange}
                type="text"
                id="profesorSeccion2"
                name="profesorSeccion2"
                className="class-input text-sm w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
             <label  className="text-xs hover:text-cyan-700 text-gray-600">
                  Habilitar sección 2
                <input
                className='ml-2 mt-2'
                  type="checkbox"
                  id="seccion2"
                  name="seccion2"
                  checked={sec2Enabled}
                  onChange={handleCheckChangeSec2}
                />
                </label>
            </label>
           </div>
           */}


           {/**
            *  <div className="mb-1 flex gap-4">
            <div className='w-[50%]'>
            <label htmlFor="profesorSeccion3" className="block  text-sm text-gray-600">
                Profesor de la sección 3
            <input
                disabled={!sec3Enabled}
                ref={profesorSec3Ref}
                onChange={handleInputChange}
                type="text"
                id="profesorSeccion3"
                name="profesorSeccion3"
                className="class-input text-sm w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
             <label  className="text-xs hover:text-cyan-700 text-gray-600">
                  Habilitar sección 3
                <input
                className='ml-2 mt-2 '
                  type="checkbox"
                  id="seccion3"
                  name="seccion3"
                  checked={sec3Enabled}
                  onChange={handleCheckChangeSec3}
                />
                </label>
            </label>
            </div>
           <div className='w-[50%]'>
           <label htmlFor="profesorSeccion4" className="block  text-sm text-gray-600">
                Profesor de la sección 4
            <input
                disabled={!sec4Enabled}
                ref={profesorSec4Ref}
                onChange={handleInputChange}
                type="text"
                id="profesorSeccion4"
                name="profesorSeccion4"
                className="class-input text-sm w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
             <label  className="text-xs hover:text-cyan-700 text-gray-600">
                  Habilitar sección 4
                <input
                className='ml-2 mt-2'
                  type="checkbox"
                  id="seccion4"
                  name="seccion4"
                  checked={sec4Enabled}
                  onChange={handleCheckChangeSec4}
                />
                </label>
            </label>
           </div>
            </div>
            */}

           {/**
            *  <div className="mb-1 flex gap-4">
            <div className='w-[50%]'>
            <label htmlFor="idProfesorSeccion1" className="block  text-sm text-gray-600">
                ID del profesor de la sección 1
            <input
                ref={idProfesorSec1Ref}
                onChange={handleInputChange}
                type="text"
                id="idProfesorSeccion1"
                name="idProfesorSeccion1"
                className="class-input text-sm w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            </label>
            </div>
           <div className='w-[50%]'>
           <label htmlFor="idProfesorSeccion2" className="block  text-sm text-gray-600">
                ID del profesor de la sección 2
            <input
                disabled={!sec2Enabled}
                ref={idProfesorSec2Ref}
                onChange={handleInputChange}
                type="text"
                id="idProfesorSeccion2"
                name="idProfesorSeccion2"
                className="class-input text-sm w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            </label>
           </div>
            </div>
            <div className="mb-1 flex gap-4">
            <div className='w-[50%]'>
            <label htmlFor="idProfesorSeccion3" className="block  text-sm text-gray-600">
                ID del profesor de la sección 3
            <input
                disabled={!sec3Enabled}
                ref={idProfesorSec3Ref}
                onChange={handleInputChange}
                type="text"
                id="idProfesorSeccion3"
                name="idProfesorSeccion3"
                className="class-input text-sm w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            </label>
            </div>
           <div className='w-[50%]'>
           <label htmlFor="idProfesorSeccion4" className="block  text-sm text-gray-600">
                ID del profesor de la sección 4
            <input
                disabled={!sec4Enabled}
                ref={idProfesorSec4Ref}
                onChange={handleInputChange}
                type="text"
                id="idProfesorSeccion4"
                name="idProfesorSeccion4"
                className="class-input text-sm w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            </label>
           </div>
            </div>
            * */}
            <button
            onClick={registrarMateria}
            className=" w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4"
            >
            Registrar
            </button>
        </form>
        </div>
        </div>
    </>
  )
}

export default CrearMateriaProduccion