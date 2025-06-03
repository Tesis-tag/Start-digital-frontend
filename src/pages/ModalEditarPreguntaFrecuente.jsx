import {  useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';

const ModalEditarPreguntaFrecuente = (datosProfesor) => {

    const [modificarProfesor, setModificarProfesor] = useState({
        datosProfesor:{
            data:{
                respuesta: "",
                pregunta: ""
            }
        }
    })
    
   

   

    useEffect(() => {
        const cargarMateria = async () => {
          setModificarProfesor(datosProfesor)
        };
        cargarMateria();
      }, []);

    
  
    const handleSubmit = (e) => e.stopPropagation();

    const confirmarModificar = () => {
        console.log(modificarProfesor)
        
        if (!modificarProfesor.datosProfesor.data.pregunta || !modificarProfesor.datosProfesor.data.respuesta ){
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
            return
      }else{
        Swal.fire({
          title: "Estas seguro de modificarlo?",
          text: "Modificaras permanentemente este personal!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, modificar!",
          customClass: {
            container: 'custom-swal-container' // Agrega una clase personalizada al contenedor de la alerta
          }
        }).then((result) => {
          if (result.isConfirmed) {
            modificarEstadoProfesor();
        //    handleModalModificar()
            Swal.fire({
              title: "Modificado!",
              text: "El personal ha sido modificado.",
              icon: "success",
              customClass: {
                container: 'custom-swal-container' // Agrega una clase personalizada al contenedor de la alerta
              }
            });
          }
        });
      }
      }

    const modificarEstadoProfesor = async () => {
        console.log(modificarProfesor.datosProfesor.data)
        console.log(modificarProfesor.datosProfesor.id)

        try {
              const response = await axios.put(`https://start-digital.onrender.com/gestion/preguntas-frecuentes/editar/${modificarProfesor.datosProfesor.id}`, modificarProfesor.datosProfesor.data)
              console.log('Materia actualizado correctamente:', response.data);
          } catch (error) {
              console.error('Error al actualizar la materia:', error);
          }
    }

  return (
         <div className=" w-full" >
          <div className="  p-2 bg-white rounded-lg shadow-lg">
          <h3 className="text-3xl font-semibold text-center text-gray-500 mt-4 mb-2">Editar Pregunta Frecuente</h3>
          <form onSubmit={handleSubmit} className="pl-8 pr-8">
              <div className="mb-2 ">
            <label htmlFor="pregunta" className="block mb-1 text-sm text-gray-600">
                  Pregunta
              <input
                  type="text"
                  id="pregunta"
                  name="pregunta"
                  className="class-input text-sm w-full px-4 py-1 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                  value={modificarProfesor.datosProfesor.data.pregunta}
                  onChange={(event) => setModificarProfesor(prevState => ({
                    ...prevState,
                    datosProfesor: {
                      ...prevState.datosProfesor,
                      data: {
                        ...prevState.datosProfesor.data,
                        pregunta: event.target.value,
                      },
                    },
                  }))}
              />
              </label>
              </div>
              <div className="mb-2">
              <label htmlFor="respuesta" className="block mb-1 text-sm text-gray-600">
                  Respuesta
              <textarea
                  type="text"
                  id="respuesta"
                  name="respuesta"
                  style={{ height: "300px" }}
                  className="class-input text-sm w-full px-4 py-1 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                  value={modificarProfesor.datosProfesor.data.respuesta}
                  onChange={(event) => setModificarProfesor(prevState => ({
                    ...prevState,
                    datosProfesor: {
                      ...prevState.datosProfesor,
                      data: {
                        ...prevState.datosProfesor.data,
                        respuesta: event.target.value,
                      },
                    },
                  }))}
              />
              </label>
              </div>
             
              <button
              onClick={()=>confirmarModificar()}
              type="button"
              className=" w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
              >
              Modificar
              </button>
          </form>
          </div>
        </div>
  )
}

export default ModalEditarPreguntaFrecuente