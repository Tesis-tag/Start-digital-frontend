import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import "./Noticia.css";

const NuevaNoticia2 = () => {
  const [content, setContent] = useState("");
  const [titulo, setTitulo] = useState("");
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const writingAreaRef = useRef(null);
  const fontNameRef = useRef(null);
  const fontSizeRef = useRef(null);

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

  const initializer = () => {
    // Crear opciones para font names
    if (fontNameRef.current) {
      fontList.forEach((font) => {
        const option = document.createElement("option");
        option.value = font;
        option.innerHTML = font;
        fontNameRef.current.appendChild(option);
      });
    }

    // Crear opciones para font size
    if (fontSizeRef.current) {
      for (let i = 1; i <= 7; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.current.appendChild(option);
      }
      fontSizeRef.current.value = 3; // tamaño por defecto
    }
  };

  const updateContent = () => {
    setContent(writingAreaRef.current.innerHTML);
  };

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
    if (!titulo || !content || !acceptedFiles[0]) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor llene todos los campos",
        icon: "warning",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('contenido', content);
      formData.append('img', acceptedFiles[0]);

      const response = await axios.post('https://start-digital.onrender.com/gestion/noticias/registrar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        title: "Registrado",
        text: "Noticia registrada con éxito",
        icon: "success",
      });

      console.log("Noticia registrada:", response.data);
      // Limpiar campos después de registrar
      setTitulo("");
      setContent("");
      setAcceptedFiles([]);
      writingAreaRef.current.innerHTML = "";
    } catch (error) {
      console.error('Error al registrar la noticia:', error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al registrar la noticia.",
        icon: "error",
      });
    }
  };

  const handleButtonClick = (command) => {
    document.execCommand(command, false, null);
  };

  useEffect(() => {
    initializer(); // Llama a initializer después de que el componente se haya montado
  }, []);

  return (
    <div className="div-table">
      <div className="py-8 ">
        <div className="flex flex-row tabla justify-between w-full mb-1 sm:mb-0">
          <Link to="/gestion/noticias">
            <button className="w-24 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2">
              Atrás
            </button>
          </Link>
          <h2 className="text-2xl leading-tight">Crea la nueva noticia</h2>
        </div>

        <div className="flex justify-center">
          <div className="" style={{ maxWidth: "900px" }}>
            <div className="mb-5">
              <label htmlFor="titulo">
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  placeholder="Título"
                  className="class-input w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </label>
            </div>

            <div className="mb-5">
              <label htmlFor="img" className="block mb-1 text-sm text-gray-600">
                Imagen de la noticia
              </label>
              <div {...getRootProps()} style={{ border: '2px dashed #B4B4B4', padding: '20px', borderRadius: '5px', cursor: 'pointer' }}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Suelta la imagen aquí...</p>
                ) : (
                  <p>{acceptedFiles[0] ? acceptedFiles[0].name : "Arrastra y suelta una imagen aquí, o haz clic para seleccionar una"}</p>
                )}
              </div>
            </div>

            <div className="options">
              {/* Botones de formato de texto */}
              <button className="option-button" onClick={() => handleButtonClick("bold")}>
                <i className="fa-solid fa-bold"></i>
              </button>
              <button className="option-button" onClick={() => handleButtonClick("italic")}>
                <i className="fa-solid fa-italic"></i>
              </button>
              <button className="option-button" onClick={() => handleButtonClick("underline")}>
                <i className="fa-solid fa-underline"></i>
              </button>
              {/* Otros botones de formato */}
            </div>

            <div
              id="text-input"
              ref={writingAreaRef}
              contentEditable
              className="writing-area"
              onInput={updateContent} // Actualiza el estado en cada entrada
            ></div>

            <button onClick={registrarNoticia} className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg">
              Registrar Noticia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevaNoticia2;
