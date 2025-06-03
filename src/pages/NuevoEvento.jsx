import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";
import "./Noticia.css";
import './Modal.css'

const NuevoEvento = () => {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [titulo, setTitulo] = useState("");
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const writingAreaRef = useRef(null);
  const fontNameRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(''); 
  const fontSizeRef = useRef(null);

  const [noticia, setNoticia] = useState({});

  const updateContent = () => {
    // Actualiza el estado con el contenido HTML actual 
    setContent(writingAreaRef.current.innerHTML);
  };
  
  const dev = () => {
    console.log(content);
  };

  const handleInputChange = (event) => {
    setNoticia({
      ...noticia,
      [event.target.name]: event.target.value,
    })
}


  // Lista de fuentes
  const fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "cursive",
  ];

  const onDrop = useCallback((acceptedFiles) => {
      const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/webp'];
      const isImage = acceptedFiles.every((file) => acceptedFileTypes.includes(file.type));
  
      if (!isImage) {
        Swal.fire({
          title: "Error",
          text: "Solo se aceptan archivos de imagen (JPEG, PNG, WEBP)",
          icon: "error",
        });
        return;
      }
      
      if (acceptedFiles.length > 1) {
        Swal.fire({
          title: "Error",
          text: "Solo se puede enviar una imagen a la vez.",
          icon: "error",
        });
        return;
      }
  
      setAcceptedFiles(acceptedFiles);
    }, []);
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      },
    });

    const registrarNoticia = async () => {
      
      if (!noticia.titulo || !content || !acceptedFiles[0]) {
        Swal.fire({
          title: "Campos incompletos",
          text: "Por favor llene todos los campos",
          icon: "warning",
        });
        return;
      }
        
    
      // Función para crear un slug a partir del título
      const createSlug = (text) => {
        return text
          .toLowerCase() // Convertir a minúsculas
          .replace(/[^\w\s-]/g, '') // Eliminar caracteres no permitidos
          .trim() // Eliminar espacios en blanco al principio y al final
          .replace(/[\s_-]+/g, '-') // Reemplazar espacios y guiones bajos con guiones
          .replace(/^-+|-+$/g, ''); // Eliminar guiones al principio y al final
      };
    
      try {
        const formData = new FormData();
        const slug = createSlug(noticia.titulo); // Generar el slug a partir del título
        formData.append('titulo', noticia.titulo);
        formData.append('fecha', noticia.fecha);
        formData.append('descripcion', noticia.descripcion);
        formData.append('slug', slug); // Agregar el slug al FormData
        formData.append('contenido', content);
        formData.append('img', acceptedFiles[0]);

       // Mostrar todos los elementos en la consola
       /*
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      */
    
        const response = await axios.post('https://start-digital.onrender.com/gestion/eventos/registrar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        Swal.fire({
          title: "Registrado",
          text: "Noticia registrada con éxito",
          icon: "success",
          confirmButtonText: 'OK',
      }).then((result) => {
          if (result.isConfirmed) {
              navigate('/gestion/eventos');
          }
      });
    
        console.log("Noticia registrada:", response.data);
        

      } catch (error) {

        console.error('Error al registrar la noticia:', error);
/*
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al registrar la noticia.",
          icon: "error",
        });
*/
      }
    };
    

  const initializer = () => {
    // Crear opciones para font names
    fontList.forEach((font) => {
      const option = document.createElement("option");
      option.value = font;
      option.innerHTML = font;
      fontNameRef.current.appendChild(option);
    });

    // Crear opciones para font size
    for (let i = 1; i <= 7; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.innerHTML = i;
      fontSizeRef.current.appendChild(option);
    }
    fontSizeRef.current.value = 3; // tamaño por defecto
  };

  const modifyText = (command, value) => {
    document.execCommand(command, false, value);
  };

  const handleButtonClick = (command) => {
    modifyText(command, null);
  };

  const handleAdvancedOptionChange = (event) => {
    modifyText(event.target.id, event.target.value);
  };

  const handleLinkButtonClick = () => {
    const userLink = prompt("Ingrese una URL");
    if (userLink) {
      modifyText("createLink", userLink.startsWith("http") ? userLink : `http://${userLink}`);
    }
  };

  useEffect(() => {
    initializer();
  }, []);

  return (
    <div className="div-table">
      <div className="py-8 ">
      <div className=" flex flex-row tabla justify-between w-full mb-1 sm:mb-0">
        <Link to="/gestion/eventos"><button className="w-24 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2">
            Atrás
        </button></Link>
          <h2 className="text-2xl leading-tight">Crea el nuevo evento</h2>
          <div className="text-end">
            <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
              
            </form>
          </div>
        </div>
      
      <div className="flex justify-center">
      <div className="" style={{maxWidth: "900px"}}>

      <div className="mb-5">
        <label htmlFor="titulo">
          <input
            type="text"
            id="titulo"
            name="titulo"
            onChange={handleInputChange}
            placeholder="Título"
            className="class-input w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </label>
      </div>

      <label htmlFor="img">Imagen de la noticia</label>
      <div  id='img' style={{ display: 'flex', background: '#E1E1E1', width: '100%', height: '150px', borderRadius: '5px', alignItems: 'center', justifyContent: 'center',cursor:"pointer"  }} {...getRootProps()}>
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

            <div className="mb-5 mt-3">
        <label htmlFor="descripcion">
          Descripción corta
          <input
            type="text"
            id="descripcion"
            name="descripcion"
            onChange={handleInputChange}
            className="class-input w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </label>
      </div>
            <div className="mb-5 mt-3">
        <label htmlFor="fecha">
          Fecha
          <input
            type="date"
            id="fecha"
            name="fecha"
            onChange={handleInputChange}
            className="class-input w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </label>
      </div>


      <div className="options ">
        {/* Formato de texto */}
        <button id="bold" className="option-button" onClick={() => handleButtonClick("bold")}>
          <i className="fa-solid fa-bold"></i>
        </button>
        <button id="italic" className="option-button" onClick={() => handleButtonClick("italic")}>
          <i className="fa-solid fa-italic"></i>
        </button>
        <button id="underline" className="option-button" onClick={() => handleButtonClick("underline")}>
          <i className="fa-solid fa-underline"></i>
        </button>
        <button id="strikethrough" className="option-button" onClick={() => handleButtonClick("strikethrough")}>
          <i className="fa-solid fa-strikethrough"></i>
        </button>
        <button id="superscript" className="option-button" onClick={() => handleButtonClick("superscript")}>
          <i className="fa-solid fa-superscript"></i>
        </button>
        <button id="subscript" className="option-button" onClick={() => handleButtonClick("subscript")}>
          <i className="fa-solid fa-subscript"></i>
        </button>

        {/* Listas */}
        <button id="insertOrderedList" className="option-button" onClick={() => handleButtonClick("insertOrderedList")}>
          <div className="fa-solid fa-list-ol"></div>
        </button>
        <button id="insertUnorderedList" className="option-button" onClick={() => handleButtonClick("insertUnorderedList")}>
          <i className="fa-solid fa-list"></i>
        </button>

        {/* Deshacer/Rehacer */}
        <button id="undo" className="option-button" onClick={() => handleButtonClick("undo")}>
          <i className="fa-solid fa-rotate-left"></i>
        </button>
        <button id="redo" className="option-button" onClick={() => handleButtonClick("redo")}>
          <i className="fa-solid fa-rotate-right"></i>
        </button>

        {/* Enlace */}
        <button id="createLink" className="adv-option-button" onClick={handleLinkButtonClick}>
          <i className="fa fa-link"></i>
        </button>
        <button id="unlink" className="option-button" onClick={() => handleButtonClick("unlink")}>
          <i className="fa fa-unlink"></i>
        </button>

        {/* Alineación */}
        <button id="justifyLeft" className="option-button" onClick={() => handleButtonClick("justifyLeft")}>
          <i className="fa-solid fa-align-left"></i>
        </button>
        <button id="justifyCenter" className="option-button" onClick={() => handleButtonClick("justifyCenter")}>
          <i className="fa-solid fa-align-center"></i>
        </button>
        <button id="justifyRight" className="option-button" onClick={() => handleButtonClick("justifyRight")}>
          <i className="fa-solid fa-align-right"></i>
        </button>
        <button id="justifyFull" className="option-button" onClick={() => handleButtonClick("justifyFull")}>
          <i className="fa-solid fa-align-justify"></i>
        </button>

        {/* Tamaño y fuente */}
        <select id="fontName" ref={fontNameRef} className="adv-option-button" onChange={handleAdvancedOptionChange}></select>
        <select id="fontSize" ref={fontSizeRef} className="adv-option-button" onChange={handleAdvancedOptionChange}></select>
      </div>
      <div
        id="text-input"
        ref={writingAreaRef}
        contentEditable
        className="writing-area"
        onInput={updateContent} // Actualiza el estado en cada entrada
      ></div>
        <button onClick={registrarNoticia} className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg">
              Registrar Evento
        </button>
      </div>
      </div>
      {/** Fin del editor 
       * <div>
        <h2>Contenido Actual:</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <button onClick={dev}>Dev</button>
       * 
      */}
    </div>
    </div>
  );
};

export default NuevoEvento;
