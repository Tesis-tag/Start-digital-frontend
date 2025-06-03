import { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Modal.css';
import { useDropzone } from 'react-dropzone';

const ModalCrearSesionFotos = ({ userId }) => {
    const [sesion, setSesion] = useState({
        titulo: "",
        link: "",
        fotos: []
    });

    const tituloRef = useRef(null);
    const linkRef = useRef(null);
    const [errorMsg, setErrorMsg] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const isImage = acceptedFiles.every((file) => acceptedFileTypes.includes(file.type));

        if (!isImage) {
            setErrorMsg('Solo se aceptan archivos de imagen (JPEG, PNG, WEBP)');
            return;
        }
        if (acceptedFiles.length > 5) {
            setErrorMsg('Solo se pueden enviar hasta 5 imágenes a la vez.');
            return;
        }
        setSesion(prev => ({ ...prev, fotos: acceptedFiles }));
        setErrorMsg(''); // Clear error message here
    }, []);

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
        },
    });

    const registrarSesion = async () => {
        if (!sesion.titulo || !sesion.link || sesion.fotos.length === 0) {
            Swal.fire({
                title: "Campos incompletos",
                text: "Por favor llene todos los campos",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        } else if (!userId) {
            Swal.fire({
                title: "Error",
                text: "ID de usuario no disponible.",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
                customClass: {
                    container: 'custom-swal-container'
                }
            });
        } else {
            try {
                const formData = new FormData();
                for (const key in sesion) {
                    if (key === 'fotos') {
                        sesion.fotos.forEach(file => formData.append('fotos', file));
                    } else {
                        formData.append(key, sesion[key]);
                    }
                }
    
                formData.append('userId', userId); // Agregar el ID del usuario
    
                const response = await axios.post('https://start-digital.onrender.com/gestion/sesiones-fotos/registrar', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                Swal.fire({
                    title: "Registrado",
                    text: "Sesión de fotos registrada con éxito",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                    customClass: {
                        container: 'custom-swal-container'
                    }
                });
                console.log("Sesión registrada:", response.data);
                borrarTexto();
            } catch (error) {
                console.error('Error al registrar sesión de fotos:', error);
            }
        }
    };
    

    const handleInputChange = (event) => {
        setSesion({
            ...sesion,
            [event.target.name]: event.target.value,
        });
    };

    function borrarTexto() {
        setSesion({
            titulo: "",
            link: "",
            fotos: []
        });

        tituloRef.current.value = "";
        linkRef.current.value = "";
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <div className="w-full ">
                <div className="w-full p-6 bg-white rounded-lg shadow-lg">
                    <h3 className="text-3xl font-semibold text-center text-gray-500 mt-0 mb-2">Registrar Sesión de Fotos</h3>
                    <form onSubmit={handleSubmit} className="pl-8 pr-8">
                        <div className="mb-2">
                            <label htmlFor="titulo" className="block text-sm text-gray-600">Título</label>
                            <input
                                ref={tituloRef}
                                onChange={handleInputChange}
                                type="text" autoFocus
                                id="titulo"
                                name="titulo"
                                className="class-input text-sm w-full px-4 py-1 border rounded-lg focus:border-cyan-500"
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="link" className="block text-sm text-gray-600">Link</label>
                            <input
                                ref={linkRef}
                                onChange={handleInputChange}
                                type="text"
                                id="link"
                                name="link"
                                className="class-input text-sm w-full px-4 py-1 border rounded-lg focus:border-cyan-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="fotos" className="block mb-1 text-sm text-gray-600">Fotos de la sesión</label>
                            <div id='fotos' style={{ display: 'flex', background: '#E1E1E1', width: '100%', height: '150px', borderRadius: '5px', alignItems: 'center', justifyContent: 'center', cursor: "pointer" }} {...getRootProps()}>
                                <input {...getInputProps()} onChange={() => setErrorMsg('')} />
                                <div style={{ border: '5px dashed #B4B4B4', borderRadius: '5px', height: '90%', width: '97%' }}>
                                    {isDragActive ? (
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                            <p>Suelta las imágenes aquí...</p>
                                        </div>
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                                            {sesion.fotos.length > 0 && !errorMsg ? (
                                                <div style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center', background: "#E1E1E1" }}>
                                                    {sesion.fotos.map((file, index) => (
                                                        <img key={index} style={{ height: '95%', borderRadius: '5px', opacity: "0.8", margin: '5px' }} src={URL.createObjectURL(file)} alt="" />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'column' }}>
                                                    <p className='text-base text-gray-600'>Suelta las imágenes</p>
                                                    <p className='text-base text-gray-600'>o</p>
                                                    <button className='text-base text-black-600 bg-cyan-500' style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                                                        Selecciona los archivos
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {errorMsg &&
                                <div style={{ background: "#FEB1B1", borderRadius: "5px", marginTop: "2px", display: "flex", justifyContent: "center" }}>
                                    <p style={{ color: 'red', padding: "2px 10px" }}>{errorMsg}</p>
                                </div>
                            }
                        </div>
                        <button
                            onClick={registrarSesion}
                            className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                        >
                            Registro
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ModalCrearSesionFotos;
