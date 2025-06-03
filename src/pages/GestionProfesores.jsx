import  { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import './Modal.css'
import {useDropzone} from 'react-dropzone'

const GesionProfesores = () => {
    
    const [profesor, setProfesor] = useState({
        nombre: '',
        correo: '',
        codigoMateria1: '',
        codigoMateria2: '',
        codigoMateria3: '',
        codigoMateria4: '',
        materia1: '',
        materia2: '',
        materia3: '',
        materia4: '',
        sobreMi: '',
        roll: 'Ninguno',
      });

      const nombreRef= useRef(null)
      const correoRef= useRef(null)
      const codigoMateria1Ref= useRef(null)
      const codigoMateria2Ref= useRef(null)
      const sobreMiRef= useRef(null)
      const rollRef= useRef(null)
      
      const [errorMsg, setErrorMsg] = useState(''); 
      const [rollHabilitado, setRollHabilitado] = useState(false); 

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
  
      const registrarProfesor = async () => {
        console.log(profesor)
        if (!profesor.nombre || !profesor.correo ||  !acceptedFiles[0]){
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
                // Crear un FormData
                const formData = new FormData();
                
                // Agregar datos del profesor al FormData
                for (const key in profesor) {
                    formData.append(key, profesor[key]);
                }
                // Agregar la imagen al FormData
                formData.append('img', acceptedFiles[0]);
                // Enviar la solicitud al servidor
                const response = await axios.post('https://start-digital.onrender.com/registar-profesor', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data' // Especificar el tipo de contenido
                    }
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
            } catch (error) {
              console.error('Error al registrar profesor:', error);
            }
        }
      }

    const handleInputChange = (event) => {
        setProfesor({
          ...profesor,
          [event.target.name]: event.target.value,
        })
    }

    const handleCheckboxChange = () => {
      if (!rollHabilitado) {
        setRollHabilitado(true); 
      rollRef.current.disabled = !rollHabilitado; 
      } else {
        setRollHabilitado(false); 
      rollRef.current.disabled = !rollHabilitado; 
      }
    };

    function borrarTexto() {
      setProfesor({
        nombre: '',
        correo: '',
        codigoMateria1: '',
        codigoMateria2: '',
        codigoMateria3: '',
        codigoMateria4: '',
        materia1: '',
        materia2: '',
        materia3: '',
        materia4: '',
        sobreMi: '',
        roll: 'Ninguno',
        });

        nombreRef.current.value="";
        correoRef.current.value="";
        codigoMateria1Ref.current.value="";
        codigoMateria2Ref.current.value="";
        sobreMiRef.current.value="";
        rollRef.current.value="Ninguno";
        
        acceptedFiles[0]="";
        
        setRollHabilitado(false);
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
        <h3 className="text-3xl font-semibold text-center text-gray-500 mt-0 mb-2">Registrar Profesor</h3>
        <form onSubmit={handleSubmit} className="pl-8 pr-8">
            <div className="mb-2">
            <label htmlFor="nombre" className="block  text-sm text-gray-600">
                Nombre y Apellido
            </label>
            <input
            ref={nombreRef}
                onChange={handleInputChange}
                type="text" autoFocus
                id="nombre"
                name="nombre"
                className="class-input text-sm w-full px-4 py-1 border  rounded-lg focus:border-cyan-500"
            />
            </div>
            <div className="mb-2">
            <label htmlFor="correo" className="block  text-sm text-gray-600">
                Correo electrónico
            </label>
            <input
                ref={correoRef}
                onChange={handleInputChange}
                type="text"
                id="correo"
                name="correo"
                className="class-input text-sm w-full px-4 py-1 border rounded-lg focus:border-cyan-500"
            />
            </div>
            <div className="mb-2">
            <label htmlFor="codigoMateria1" className="block  text-sm text-gray-600">
                Materia que imparte
            <input
                ref={codigoMateria1Ref}
                onChange={handleInputChange}
                type="text"
                id="codigoMateria1"
                name="codigoMateria1"
                className="class-input text-sm w-full px-4 py-1 border rounded-lg focus:border-cyan-500"
            />
            </label>
            </div>
            <div>
            <label htmlFor="sobreMi" className="block text-sm text-gray-600">
                Sobre mí
            </label>
            <textarea
                ref={sobreMiRef}
                onChange={handleInputChange}
                type="text"
                id="sobreMi"
                name="sobreMi"
                className="class-input text-sm w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            </div>
            <div className="mb-2">
            <label htmlFor="roll" className="block  text-sm  text-gray-600">
                Este profesor tiene un rol en el decanato?
            </label>
            <select
            ref={rollRef} disabled={!rollHabilitado}
            onChange={handleInputChange}
             id="roll" name="roll" className="select-profesor text-sm h-full w-full px-4 py-2 pl-2 text-gray-500 bg-transparent border border-gray-400 focus:border-cyan-500 pr-7 sm:text-sm rounded-lg">
                    <option className='text-gray-500 '>
                    Ninguno
                    </option >
                    <option className='text-gray-500'>
                        Director
                    </option>

                   {/**
                    *  <option className='text-gray-500'>
                        Subdirector
                    </option>
                    * 
                    */}

                </select>
                <div className=''>
                <label htmlFor="habilitarSelect" className="text-xs hover:text-cyan-700 text-gray-600">
                  Habilitar rol
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
            <label htmlFor="img" className="block mb-1 text-sm text-gray-600">
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

export default GesionProfesores