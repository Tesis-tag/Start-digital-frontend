import  { useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import './Modal.css'

const ModalCrearPreguntaFrecuente = () => {
    
    const [profesorCrear, setProfesor] = useState({
        pregunta: "",
        respuesta: ""
      });

      const nombreRef= useRef(null)
      const correoRef= useRef(null)
      const codigoMateria1Ref= useRef(null)
      const codigoMateria2Ref= useRef(null)
      const sobreMiRef= useRef(null)
      const rollRef= useRef(null)
      

    
  
      const registrarProfesor = async () => {
        console.log(profesorCrear)
        if (!profesorCrear.pregunta || !profesorCrear.respuesta ){
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
                
                const response = await axios.post('https://start-digital.onrender.com/gestion/preguntas-frecuentes/registrar', profesorCrear).then(
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
              console.log("Personal registrado:", response.data);
            } catch (error) {
              console.error('Error al registrar personal:', error);
            }
        }
      }

    const handleInputChange = (event) => {
        setProfesor({
          ...profesorCrear,
          [event.target.name]: event.target.value,
        })
    }

  

    function borrarTexto() {
      setProfesor({
       pregunta: "",
        respuesta: ""
        });

        nombreRef.current.value="";
        correoRef.current.value="";
        codigoMateria1Ref.current.value="";
        codigoMateria2Ref.current.value="";
        sobreMiRef.current.value="";
        rollRef.current.value="Ninguno";
        

        
      }

      //Funcion para evitar que el form se envie y se colapse cuando se manda sin datos en los inputs
      const handleSubmit = (event) => {
        event.preventDefault(); // Evita que se envíe el formulario
        // Aquí puedes agregar tu código para procesar los datos del formulario
      };


  return (
    <>
          <div className="w-full ">
        <div className="w-full  p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-3xl font-semibold text-center text-gray-500 mt-0 mb-2">Registrar Pregunta Frecuente</h3>
        <form onSubmit={handleSubmit} className="pl-8 pr-8">
            <div className="mb-2">
            <label htmlFor="pregunta" className="block  text-sm text-gray-600">
                Pregunta
            </label>
            <input
            ref={nombreRef}
                onChange={handleInputChange}
                type="text" autoFocus
                id="pregunta"
                name="pregunta"
                className="class-input text-sm w-full px-4 py-1 border  rounded-lg focus:border-cyan-500"
            />
            </div>
    
   
            <div>
            <label htmlFor="respuesta" className="block text-sm text-gray-600">
                Respuesta
            </label>
            <textarea
                ref={sobreMiRef}
                onChange={handleInputChange}
                style={{ height: "300px" }}
                type="text"
                id="respuesta"
                name="respuesta"
                className="class-input text-sm w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            </div>
         
            <button
            onClick={registrarProfesor}
            className=" w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 "
            >
            Registro
            </button>
        </form>
        </div>
        </div>
    </>
  )
}

export default ModalCrearPreguntaFrecuente