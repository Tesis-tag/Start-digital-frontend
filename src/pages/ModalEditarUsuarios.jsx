import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const ModalEditarUsuarios = ({ datosUsuario, onClose }) => {
    const [modificarUsuario, setModificarUsuario] = useState({
        data: {
            displayName: "",
            email: "",
            telefono: ""
        }
    });

    useEffect(() => {
        const cargarUsuario = () => {
            setModificarUsuario(datosUsuario);
        };
        cargarUsuario();
    }, [datosUsuario]);

    const handleSubmit = (e) => e.preventDefault();

    const confirmarModificar = () => {
        if (!modificarUsuario.data.displayName || !modificarUsuario.data.email || !modificarUsuario.data.telefono) {
            Swal.fire({
                title: "Campos incompletos",
                text: "Por favor llene todos los campos",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
            });
            return;
        } else {
            Swal.fire({
                title: "¿Estás seguro de modificarlo?",
                text: "Modificarás permanentemente este usuario!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, modificar!",
            }).then((result) => {
                if (result.isConfirmed) {
                    modificarEstadoUsuario();
                    Swal.fire({
                        title: "Modificado!",
                        text: "El usuario ha sido modificado.",
                        icon: "success",
                    });
                    onClose(); // Cerrar el modal después de la modificación
                }
            });
        }
    };

    const modificarEstadoUsuario = async () => {
        try {
            const response = await axios.put(`https://start-digital.onrender.com/gestion/usuarios/editar/${modificarUsuario.id}`, modificarUsuario.data);
            console.log('Usuario actualizado correctamente:', response.data);
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    };

    return (
        <div className="w-full">
            <div className="p-2 bg-white rounded-lg shadow-lg">
                <h3 className="text-3xl font-semibold text-center text-gray-500 mt-4 mb-2">Editar Usuario</h3>
                <form onSubmit={handleSubmit} className="pl-8 pr-8">
                    <div className="mb-2">
                        <label htmlFor="displayName" className="block mb-1 text-sm text-gray-600">Nombre</label>
                        <input
                            type="text"
                            id="displayName"
                            name="displayName"
                            className="class-input text-sm w-full px-4 py-1 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                            value={modificarUsuario.data.displayName}
                            onChange={(event) => setModificarUsuario(prevState => ({
                                ...prevState,
                                data: {
                                    ...prevState.data,
                                    displayName: event.target.value,
                                },
                            }))}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="block mb-1 text-sm text-gray-600">Correo</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="class-input text-sm w-full px-4 py-1 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                            value={modificarUsuario.data.email}
                            onChange={(event) => setModificarUsuario(prevState => ({
                                ...prevState,
                                data: {
                                    ...prevState.data,
                                    email: event.target.value,
                                },
                            }))}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="telefono" className="block mb-1 text-sm text-gray-600">Teléfono</label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            className="class-input text-sm w-full px-4 py-1 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                            value={modificarUsuario.data.telefono}
                            onChange={(event) => setModificarUsuario(prevState => ({
                                ...prevState,
                                data: {
                                    ...prevState.data,
                                    telefono: event.target.value,
                                },
                            }))}
                        />
                    </div>
                    <button
                        onClick={confirmarModificar}
                        type="button"
                        className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
                    >
                        Modificar
                    </button>
                    <button
                        onClick={onClose}
                        type="button"
                        className="w-32 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg mx-auto block focus:outline-none mb-2"
                    >
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ModalEditarUsuarios;
