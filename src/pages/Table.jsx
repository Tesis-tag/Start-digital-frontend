import "./Table.css"
import { Link } from "react-router-dom"
import { useState, useEffect, useCallback } from "react"
import {useDropzone} from 'react-dropzone'
import axios from 'axios'
import GesionProfesores from "./GestionProfesores"
import Swal from "sweetalert2"
import './Modal.css'

const Table = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenModificar, setIsModalOpenModificar] = useState(false)
  const [modificarProfesor, setModificarProfesor] = useState()
  const [profesores, setProfesores] = useState([]);
  const [errorMsg, setErrorMsg] = useState(''); 
  const [terminosBusqueda, setTerminosBusqueda] = useState('')

  const handleModalStop = (e) => e.stopPropagation();
  
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
  
  const handleEditar=async (profesor)=>{
    setModificarProfesor(profesor);
    setIsModalOpenModificar(true);
  }

  const confirmarModificar = (idProfesor,dataProfesor) => {
    if (!modificarProfesor.data.nombre || !modificarProfesor.data.correo || !modificarProfesor.data.materia){
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
        modificarProfesores(idProfesor,dataProfesor);
        handleModalModificar()
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
  
  const modificarProfesores = async (idProfesor) => {

        console.log(modificarProfesor)
        try {
          const formData = new FormData();
                
          // Agregar datos del profesor al FormData
          for (const key in modificarProfesor.data) {
              formData.append(key, modificarProfesor.data[key]);
          }
          formData.append('img', acceptedFiles[0]);
          
            const response = await axios.put(`https://start-digital.onrender.com/edit-profesores/${idProfesor}`, formData, {
              headers:{
                'Content-Type': 'multipart/form-data'
              }
            })
            console.log('Profesor actualizado correctamente:', response.data);
        } catch (error) {
            console.error('Error al actualizar el profesor:', error);
        }
      
  };

  const handleModalModificar =()=>{
    setIsModalOpenModificar(false)
    acceptedFiles.splice(0, acceptedFiles.length)
  }

  useEffect(() => {
    const fetchProfesores = async () => {
        try {
            const response = await axios.get('https://start-digital.onrender.com/profesores');
            setProfesores(response.data);
        } catch (error) {
            console.error('Error al obtener los profesores:', error);
        }
    };

    fetchProfesores();
  }, []);
  const confirmarEliminar = (idProfesor) => {
    Swal.fire({
      title: "Estas seguro de eliminarlo?",
      text: "Borraras permanentemente este profesor!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarProfesor(idProfesor);
        Swal.fire({
          title: "Eliminado!",
          text: "El profesor ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }
  const eliminarProfesor = async (idProfesor) => {
    
    try {
        await axios.delete(`https://start-digital.onrender.com/profesores/${idProfesor}`);
        console.log('Profesor eliminado correctamente');
        
    } catch (error) {
        console.error('Error al eliminar el profesor:', error);
    }
};
    
const filteredProfesores = profesores.filter((profesor) =>
  `${profesor.data.nombre} ${profesor.data.materia} ${profesor.data.correo}`
    .toLowerCase()
    .includes(terminosBusqueda.toLowerCase())
);
// Paginación
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

// Lógica para la paginación
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredProfesores.slice(indexOfFirstItem, indexOfLastItem);


// Función para cambiar de página
const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
};
//funcion de botones de paginación
const renderPageNumbers = () => {
  const pageNumbers = [];
  const totalPages = Math.ceil(profesores.length / itemsPerPage);
  const maxVisiblePages = 5; // Número máximo de botones de página visibles

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return pageNumbers.map(number => (
    <button key={number} onClick={() => paginate(number)} className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100 " style={{ backgroundColor: currentPage === number ? '#ECECEC' : 'white',color: currentPage === number ? '#06b6d4' : '#646464'  }}>
      {number}
    </button>
  ));
};

 //Funcion para evitar que el form se envie y se colapse cuando se manda sin datos en los inputs
 const handleSubmit = (event) => {
  event.preventDefault(); // Evita que se envíe el formulario
};

  return (
    <div className="cont-gp">
        <div className="container scrollx px-4 sm:px-8 flex justify-center">
      <div className="py-8 ">
        <div className=" flex flex-row tabla justify-between w-full mb-1 sm:mb-0">
        <Link to="/gestion"><button className="bg-cyan-500 hover:bg-white text-white font-semibold hover:text-gray-600 py-2 px-6 border border-white hover:border-transparent rounded mb-2">
            Atrás
        </button></Link>
          <h2 className="text-2xl leading-tight">Profesores</h2>
          <div className="text-end">
            <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
              <div className="relative">
                <input
                  type="text"
                  id="filter" className="rounded-lg  flex-1 border-2 border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-xl text-base focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent" placeholder="Buscar..."
                  value={terminosBusqueda} onChange={(e) => setTerminosBusqueda(e.target.value)}
               />
              </div>
              <button 
              onClick={()=> setIsModalOpen(true)}
                type="button"
                className="w-24 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
              >
                Nuevo
              </button>
            </form>
          </div>
        </div>
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Materia
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Correo
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Foto
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    {/* Edit action can be implemented here */}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ?(
                currentItems.map((profesor) => (
                  <tr key={profesor.id}>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <a href="#">
                            <img
                              alt="profile"
                              src={profesor.data.img} // Assuming image paths follow this pattern
                              className="mx-auto object-cover rounded-full h-10 w-10 "
                              />
                            </a>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {profesor.data.nombre}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {profesor.data.materia}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {profesor.data.correo}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">
                          {profesor.data.img}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        {/* Implement Edit action here. You can use a modal or navigate to a separate page for editing. */}
                        <div className="contenedor-btn flex gap-2">
                        <button
                        onClick={() => handleEditar(profesor)}
                            type="submit"
                            className="px-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-2 rounded-lg block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
                        >
                            Editar
                        </button>
                        <button
                        onClick={() => confirmarEliminar(profesor.id)}
                            type="submit"
                            className="px-2 bg-gradient-to-r from-red-400 to-red-600 text-white py-2 rounded-lg block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
                        >
                            Eliminar
                        </button>
                        </div>
                      </td>
                    </tr>
                    
                  ))
                ):(
                  <tr>
                  <td colSpan="5" className="text-center py-4">
                    <p className="text-gray-900 datosnt">No se encontraron resultados</p>
                  </td>
                </tr>
                )
                  }
                </tbody>
              </table>
            </div>
          </div>
        <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
          <div className="flex items-center">
              <button
              onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}
              type="button" className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100">
                  <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                      </path>
                  </svg>
              </button>
              {renderPageNumbers()}
              <button
              onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= profesores.length}
                type="button" className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100">
              <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                  </path>
              </svg>
          </button>
          </div>
      </div>
        </div>
      </div>
              {isModalOpen && (
                <div className="cont-modal " onClick={()=> setIsModalOpen(false)}>
                <div className="modal w-[450px] md:w-[600px] lg:w-[600px]" onClick={handleModalStop}>
          <button className=" bg-transparent hover:bg-white text-white font-semibold hover:text-gray-600 py-2 px-6 border border-white hover:border-transparent rounded mb-2" onClick={() => setIsModalOpen(false)}>Cerrar</button>
          <GesionProfesores isModalOpen={isModalOpen} />
        </div>
              </div>
      )}
    {/*
      isModalOpenModificar && (
        <div className="cont-modal w-[400px] md:w-[600px] lg:w-[800px]" onClick={handleModalModificar}>
           <div className="modal" onClick={handleModalStop}>
           <button className=" bg-transparent hover:bg-white text-white font-semibold hover:text-gray-600 py-2 px-6 border border-white hover:border-transparent rounded mb-2" onClick={handleModalModificar}>Cerrar</button>
           <div className="contenedor ">
          <div className="w-[400px] md:w-[500px] lg:w-[700px]  p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-500 mt-8 mb-6">Editar Profesor</h1>
          <form onSubmit={handleSubmit} className="pl-8 pr-8">
              <div className="mb-4">
              <label htmlFor="nombre" className="block mb-2 text-base text-gray-600">
                  Nombre y Apellido
              </label>
              <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="class-input w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                  value={modificarProfesor.data.nombre}
                  onChange={(event) => setModificarProfesor(prevState => ({ ...prevState, data: { ...prevState.data, nombre: event.target.value } }))}
                 
              />
              </div>
              <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-base text-gray-600">
                  Correo electrónico
              </label>
              <input
                  type="email"
                  id="correo"
                  name="correo"
                  className="class-input  w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                  value={modificarProfesor.data.correo}
                  onChange={(event) => setModificarProfesor(prevState => ({ ...prevState, data: { ...prevState.data, correo: event.target.value } }))}
              />
              </div>
              <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-base text-gray-600">
                  Materia que imparte
              </label>
              <input
                  type="text"
                  id="materia"
                  name="materia"
                  className="class-input  w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                  value={modificarProfesor.data.materia}
                  onChange={(event) => setModificarProfesor(prevState => ({ ...prevState, data: { ...prevState.data, materia: event.target.value } }))}
              />
              </div>
              <div className="mb-6">
              <label htmlFor="confirmPassword" className="block mb-2 text-base text-gray-600">
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
              onClick={()=>confirmarModificar(modificarProfesor.id,modificarProfesor.data)}
              type="submit"
              className=" w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
              >
              Modificar
              </button>
          </form>
          </div>
          </div>
           </div>
        </div>
      )*/
    }
    </div>
  )
}

export default Table