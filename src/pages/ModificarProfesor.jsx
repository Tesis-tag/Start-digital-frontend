import { useCallback, useState, useEffect, useRef } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';
import {useDropzone} from 'react-dropzone'

const ModificarProfesor = (datosProfesor) => {

    const [modificarProfesor, setModificarProfesor] = useState({
        datosProfesor:{
            data:{
                nombre:"",
                correo:"",
                materia:"",
                materia2:"",
                roll:"Ninguno",
                img:""
            }
        }
    })
    
    const [rollHabilitado, setRollHabilitado] = useState(false); 
    const [errorMsg, setErrorMsg] = useState(''); 

    const rollRef= useRef(null)

    const handleCheckboxChange = () => {
      if (!rollHabilitado) {
        setRollHabilitado(true); 
      rollRef.current.disabled = !rollHabilitado; 
      } else {
        setRollHabilitado(false); 
      rollRef.current.disabled = !rollHabilitado; 
      }
    };

    useEffect(() => {
        const cargarMateria = async () => {
          setModificarProfesor(datosProfesor)
        };
        cargarMateria();
      }, []);

      const onDrop = useCallback(acceptedFiles => {
        const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/webp'];
      const isImage = acceptedFiles.every((file) => acceptedFileTypes.includes(file.type));

      if (!isImage) {
        setErrorMsg('Solo se aceptan archivos de imagen (JPEG, PNG, WEBP)');
        return;
      }
      if (acceptedFiles.length > 1) {
        setErrorMsg('Solo se puede enviar una imagen a la vez.');
        return;
      }
      if (acceptedFiles.length === 1 && isImage) {
        // ... process valid image
        setErrorMsg(''); // Clear error message here
      }
        console.log(acceptedFiles[0])
        // Do something with the files
      }, [])
      const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        accept: {
          'image/*': ['.jpeg', '.jpg', '.png', '.webp'], // Accepted image extensions
        },
      });
    const handleSubmit = (e) => e.stopPropagation();

    const confirmarModificar = () => {
        console.log(modificarProfesor)
        console.log(modificarProfesor.datosProfesor.data.nombre)
        
        if (!modificarProfesor.datosProfesor.data.nombre || !modificarProfesor.datosProfesor.data.correo ){
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
          text: "Modificaras permanentemente este profesor!",
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
              text: "El profesor ha sido modificado.",
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
              const response = await axios.put(`https://start-digital.onrender.com/edit-profesor/${modificarProfesor.datosProfesor.id}`, modificarProfesor.datosProfesor.data)
              console.log('Materia actualizado correctamente:', response.data);
          } catch (error) {
              console.error('Error al actualizar la materia:', error);
          }
    }

  return (
         <div className=" w-full" >
          <div className="  p-2 bg-white rounded-lg shadow-lg">
          <h3 className="text-3xl font-semibold text-center text-gray-500 mt-4 mb-2">Editar Profesor</h3>
          <form onSubmit={handleSubmit} className="pl-8 pr-8">
              <div className="mb-2">
              <label htmlFor="nombre" className="block mb-1 text-sm text-gray-600">
                  Nombre y Apellido
              </label>
              <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="class-input text-sm w-full px-4 py-1 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                value={modificarProfesor.datosProfesor.data.nombre}
                onChange={(event) => setModificarProfesor(prevState => ({
                    ...prevState,
                    datosProfesor: {
                      ...prevState.datosProfesor,
                      data: {
                        ...prevState.datosProfesor.data,
                        nombre: event.target.value,
                      },
                    },
                  }))}
                 
              />
              </div>
              <div className="mb-2">
              <label htmlFor="email" className="block mb-1 text-sm text-gray-600">
                  Correo electrónico
              </label>
              <input
                  type="email"
                  id="correo"
                  name="correo"
                  className="class-input text-sm w-full px-4 py-1 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                 value={modificarProfesor.datosProfesor.data.correo}
                 onChange={(event) => setModificarProfesor(prevState => ({
                    ...prevState,
                    datosProfesor: {
                      ...prevState.datosProfesor,
                      data: {
                        ...prevState.datosProfesor.data,
                        correo: event.target.value,
                      },
                    },
                  }))}
              />
              </div>
              <div className="mb-2 ">
     
            <label htmlFor="password" className="block mb-1 text-sm text-gray-600">
                  Materia que imparte
              <input
                  type="text"
                  id="materia"
                  name="materia"
                  className="class-input text-sm w-full px-4 py-1 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                  value={modificarProfesor.datosProfesor.data.codigoMateria1}
                  onChange={(event) => setModificarProfesor(prevState => ({
                    ...prevState,
                    datosProfesor: {
                      ...prevState.datosProfesor,
                      data: {
                        ...prevState.datosProfesor.data,
                        codigoMateria1: event.target.value,
                      },
                    },
                  }))}
              />
              </label>
 
             
              </div>
              <div className="mb-2">
              <label htmlFor="password" className="block mb-1 text-sm text-gray-600">
                  Sobre mí
              <textarea
                  type="text"
                  id="materia"
                  name="materia"
                  className="class-input text-sm w-full px-4 py-1 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                  value={modificarProfesor.datosProfesor.data.sobreMi}
                  onChange={(event) => setModificarProfesor(prevState => ({
                    ...prevState,
                    datosProfesor: {
                      ...prevState.datosProfesor,
                      data: {
                        ...prevState.datosProfesor.data,
                        sobreMi: event.target.value,
                      },
                    },
                  }))}
              />
              </label>
              </div>
              <div className="mb-2">
            <label  className="block mb-1 text-sm text-gray-600">
                Tiene rol en el decanato?
            <select
            ref={rollRef} disabled={!rollHabilitado}
             id="roll" name="roll" className="select-profesor text-sm h-full w-full px-4 py-2 pl-2 text-gray-500 bg-transparent border border-gray-400 focus:border-cyan-500 pr-7 rounded-lg"
             value={modificarProfesor.datosProfesor.data.roll}
             onChange={(event) => setModificarProfesor(prevState => ({
               ...prevState,
               datosProfesor: {
                 ...prevState.datosProfesor,
                 data: {
                   ...prevState.datosProfesor.data,
                   roll: event.target.value,
                 },
               },
             }))}
             >
                    <option className='text-sm text-gray-500 '>
                        Ninguno
                    </option >
                    <option className='text-sm text-gray-500'>
                        Director
                    </option>
                    <option className='text-sm text-gray-500'>
                        Subdirector
                    </option>
                </select>
            </label>
                <div className=''>
                <label htmlFor="habilitarSelect" className="text-xs text-gray-600">
                  Habilitar/Desabilitar rol
                </label>
                <input
                className='ml-2 mt-2'
                  type="checkbox"
                  id="habilitarSelect"
                  name="habilitarSelect"
                  checked={rollHabilitado}
                  onChange={handleCheckboxChange}
                />
                </div>
            </div>
              <div className="mb-6">
              <label htmlFor="confirmPassword" className="block mb-1 text-sm text-gray-600">
                Foto del profesor
              </label>
              <div id='img' style={{ display: 'flex', background: '#E1E1E1', width: '100%', height: '150px', borderRadius: '5px', alignItems: 'center', justifyContent: 'center',cursor:"pointer"  }} {...getRootProps()}>
            <input {...getInputProps()} onChange={() => setErrorMsg('')} />
            <div style={{ border: '5px dashed #B4B4B4', borderRadius: '5px', height: '90%', width: '97%' }}>
                {isDragActive ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <p>Suelta la imagen aquí...</p>
                </div>
                ) : (
                <div style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                
                    {acceptedFiles[0] && !errorMsg ? (
                    <div style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center', background:"#E1E1E1" }}>
                        <img style={{ height: '95%', borderRadius: '5px', opacity:"0.8" }} src={URL.createObjectURL(acceptedFiles[0])} alt="" />
                    </div>
                    ) : (
                    <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'column' }}>
                        <p className='text-base text-gray-600'>Suelta la imagen</p>
                        <p className='text-base text-gray-600'>o</p>
                        <button className='text-base text-black-600 bg-cyan-500' style={{ padding: '10px 20px', borderRadius: '5px',  border: 'none', cursor: 'pointer' }}>
                        Selecciona el archivo
                        </button>
                    </div>
                    )}
                </div>
                )}
            </div>
            </div>
                {errorMsg && 
                <div style={{background:"#FEB1B1", borderRadius:"5px", marginTop:"2px", display:"flex",justifyContent:"center"}}>
                    <p style={{ color: 'red', padding:"2px 10px" }}>{errorMsg}</p>
                </div>
                    }
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

export default ModificarProfesor