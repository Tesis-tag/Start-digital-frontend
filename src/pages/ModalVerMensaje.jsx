import  { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import './Modal.css'
import {useDropzone} from 'react-dropzone'

const ModalVerMensaje = () => {
    
    const [profesor, setProfesor] = useState({
        nombre:"",
                correo:"",
                cargo:"",
                img:""
      });

      const nombreRef= useRef(null)
      const correoRef= useRef(null)
      const codigoMateria1Ref= useRef(null)
      const codigoMateria2Ref= useRef(null)
      const sobreMiRef= useRef(null)
      const rollRef= useRef(null)
      
      const [errorMsg, setErrorMsg] = useState(''); 

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
                const response = await axios.post('https://start-digital.onrender.com/gestion/personal/registrar-personal', formData, {
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
              console.log("Personal registrado:", response.data);
            } catch (error) {
              console.error('Error al registrar personal:', error);
            }
        }
      }

    const handleInputChange = (event) => {
        setProfesor({
          ...profesor,
          [event.target.name]: event.target.value,
        })
    }



    function borrarTexto() {
      setProfesor({
        nombre:"",
                correo:"",
                cargo:"",
                sobreMi: "",
                img:""
        });

        nombreRef.current.value="";
        correoRef.current.value="";
        codigoMateria1Ref.current.value="";
        codigoMateria2Ref.current.value="";
        sobreMiRef.current.value="";
        rollRef.current.value="Ninguno";
        
        acceptedFiles[0]="";
        
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
        <h3 className="text-3xl font-semibold text-center text-gray-500 mt-0 mb-2">Mensaje</h3>
        <form onSubmit={handleSubmit} className="pl-8 pr-8">
           
            
          
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

export default ModalVerMensaje