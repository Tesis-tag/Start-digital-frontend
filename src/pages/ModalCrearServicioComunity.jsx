import { useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Modal.css';

const ModalCrearServicioComunity = () => {
    const [servicio, setServicio] = useState({
        titulo: "",
        descripcion: "",
        precio: "",
        inclusiones: [] // Lista de inclusiones
    });

    const tituloRef = useRef(null);
    const descripcionRef = useRef(null);
    const precioRef = useRef(null);
    const inclusionesRef = useRef(null);

    const [errorMsg, setErrorMsg] = useState('');

    const registrarServicio = async () => {
        console.log(servicio);
        if (!servicio.titulo || !servicio.descripcion || !servicio.precio || servicio.inclusiones.length === 0) {
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
        } else {
            try {
                const response = await axios.post('https://start-digital.onrender.com/gestion/servicios/registrar', servicio);
                Swal.fire({
                    title: "Registrado",
                    text: "Servicio registrado con éxito",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                    customClass: {
                        container: 'custom-swal-container'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        borrarTexto();
                    }
                });
                console.log("Servicio registrado:", response.data);
            } catch (error) {
                console.error('Error al registrar servicio:', error);
            }
        }
    };

    const handleInputChange = (event) => {
        setServicio({
            ...servicio,
            [event.target.name]: event.target.value,
        });
    };

    const handleInclusionesChange = () => {
        const newInclusiones = inclusionesRef.current.value.split(',').map(item => item.trim()).filter(item => item);
        setServicio(prev => ({
            ...prev,
            inclusiones: newInclusiones
        }));
    };

    function borrarTexto() {
        setServicio({
            titulo: "",
            descripcion: "",
            precio: "",
            inclusiones: []
        });

        tituloRef.current.value = "";
        descripcionRef.current.value = "";
        precioRef.current.value = "";
        inclusionesRef.current.value = "";
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <div className="w-full ">
                <div className="w-full p-6 bg-white rounded-lg shadow-lg">
                    <h3 className="text-3xl font-semibold text-center text-gray-500 mt-0 mb-2">Registrar Paquete</h3>
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
                            <label htmlFor="descripcion" className="block text-sm text-gray-600">Descripción</label>
                            <textarea
                                ref={descripcionRef}
                                onChange={handleInputChange}
                                id="descripcion"
                                name="descripcion"
                                className="class-input text-sm w-full px-4 py-1 border rounded-lg focus:border-cyan-500"
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="precio" className="block text-sm text-gray-600">Precio</label>
                            <input
                                ref={precioRef}
                                onChange={handleInputChange}
                                type="text"
                                id="precio"
                                name="precio"
                                className="class-input text-sm w-full px-4 py-1 border rounded-lg focus:border-cyan-500"
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="inclusiones" className="block text-sm text-gray-600">Inclusiones (separadas por comas)</label>
                            <input
                                ref={inclusionesRef}
                                onChange={handleInclusionesChange}
                                type="text"
                                id="inclusiones"
                                name="inclusiones"
                                className="class-input text-sm w-full px-4 py-1 border rounded-lg focus:border-cyan-500"
                            />
                        </div>

                        <button
                            onClick={registrarServicio}
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

export default ModalCrearServicioComunity;
