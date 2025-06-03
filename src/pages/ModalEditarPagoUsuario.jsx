import { useCallback, useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const ModalEditarPagoUsuario = ({ datosProfesor }) => {
    const [modificarProfesor, setModificarProfesor] = useState({
        referencia: "",
        img: "",
        fechaPago: ""
    });

    const [errorMsg, setErrorMsg] = useState('');
    const rollRef = useRef(null);
    const [acceptedFiles, setAcceptedFiles] = useState([]);

    useEffect(() => {
        if (datosProfesor) {
            setModificarProfesor({
                referencia: datosProfesor.referencia || "",
                img: datosProfesor.img || "",
                fechaPago: datosProfesor.fechaPago || ""
            });
        }
    }, [datosProfesor]);

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
        setAcceptedFiles(acceptedFiles);
        setErrorMsg('');
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
        },
    });

    const handleSubmit = (e) => e.stopPropagation();

    const confirmarModificar = () => {
        if (!modificarProfesor.referencia || !modificarProfesor.fechaPago) {
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
            return;
        } else {
            Swal.fire({
                title: "Estas seguro de modificarlo?",
                text: "Modificaras permanentemente este registro!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, modificar!",
                customClass: {
                    container: 'custom-swal-container'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    modificarEstadoProfesor();
                    Swal.fire({
                        title: "Modificado!",
                        text: "El registro ha sido modificado.",
                        icon: "success",
                        customClass: {
                            container: 'custom-swal-container'
                        }
                    });
                }
            });
        }
    };

    const modificarEstadoProfesor = async () => {
        const formData = new FormData();
        formData.append('referencia', modificarProfesor.referencia);
        formData.append('fechaPago', modificarProfesor.fechaPago);
        formData.append('estatus', 2); // Agregar el campo estatus con valor 2
        if (acceptedFiles[0]) {
            formData.append('img', acceptedFiles[0]); // Agregar imagen
        }

        try {
            const response = await axios.put(`https://start-digital.onrender.com/gestion/calendario/editar-pago/${datosProfesor.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Registro actualizado correctamente:', response.data);
        } catch (error) {
            console.error('Error al actualizar el registro:', error);
        }
    };

    return (
        <div className="w-full">
            <div className="p-2 bg-white rounded-lg shadow-lg">
                <h3 className="text-3xl font-semibold text-center text-gray-500 mt-4 mb-2">Sube tu Pago</h3>
                <form onSubmit={handleSubmit} className="pl-8 pr-8">
                    <div className="mb-2">
                        <label htmlFor="referencia" className="block mb-1 text-sm text-gray-600">Referencia</label>
                        <input
                            type="text"
                            id="referencia"
                            name="referencia"
                            className="class-input text-sm w-full px-4 py-1 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                            value={modificarProfesor.referencia}
                            onChange={(event) => setModificarProfesor(prevState => ({
                                ...prevState,
                                referencia: event.target.value,
                            }))}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="fechaPago" className="block mb-1 text-sm text-gray-600">Fecha de Pago</label>
                        <input
                            type="date"
                            id="fechaPago"
                            name="fechaPago"
                            className="class-input text-sm w-full px-4 py-1 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                            value={modificarProfesor.fechaPago}
                            onChange={(event) => setModificarProfesor(prevState => ({
                                ...prevState,
                                fechaPago: event.target.value,
                            }))}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="img" className="block mb-1 text-sm text-gray-600">Sube el comprobante de Pago</label>
                        <div id='img' style={{ display: 'flex', background: '#E1E1E1', width: '100%', height: '150px', borderRadius: '5px', alignItems: 'center', justifyContent: 'center', cursor: "pointer" }} {...getRootProps()}>
                            <input {...getInputProps()} onChange={() => setErrorMsg('')} />
                            <div style={{ border: '5px dashed #B4B4B4', borderRadius: '5px', height: '90%', width: '97%' }}>
                                {isDragActive ? (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                        <p>Suelta la imagen aquí...</p>
                                    </div>
                                ) : (
                                    <div style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                                        {acceptedFiles[0] && !errorMsg ? (
                                            <div style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center', background: "#E1E1E1" }}>
                                                <img style={{ height: '95%', borderRadius: '5px', opacity: "0.8" }} src={URL.createObjectURL(acceptedFiles[0])} alt="" />
                                            </div>
                                        ) : (
                                            <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'column' }}>
                                                <p className='text-base text-gray-600'>Suelta la imagen</p>
                                                <p className='text-base text-gray-600'>o</p>
                                                <button className='text-base text-black-600 bg-cyan-500' style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                                                    Selecciona el archivo
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
                        onClick={confirmarModificar}
                        type="button"
                        className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
                    >
                        Subir pago
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ModalEditarPagoUsuario;
