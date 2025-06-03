import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const ModalEditarPagoAdmin = ({ datosProfesor }) => {
    const [modificarProfesor, setModificarProfesor] = useState({
        referencia: "",
        fechaPago: "",
        totalPrice: "",
        title: "",
        estatus: 3 // Por defecto, estatus como "Verificado"
    });

    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (datosProfesor) {
            setModificarProfesor({
                referencia: datosProfesor.referencia || "",
                fechaPago: datosProfesor.fechaPago || "",
                totalPrice: datosProfesor.totalPrice || "",
                title: datosProfesor.title || "",
                estatus: 3 // Asignar estatus como "Verificado"
            });
        }
    }, [datosProfesor]);

    const handleSubmit = (e) => e.stopPropagation();

    const confirmarModificar = () => {
        if (!modificarProfesor.referencia || !modificarProfesor.fechaPago || !modificarProfesor.totalPrice || !modificarProfesor.title) {
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
                title: "¿Estás seguro de verificar esto?",
                text: "Modificarás permanentemente este registro!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, verificar!",
                customClass: {
                    container: 'custom-swal-container'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    modificarEstadoProfesor();
                    Swal.fire({
                        title: "¡Verificado!",
                        text: "El registro ha sido verificado.",
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
        formData.append('totalPrice', modificarProfesor.totalPrice);
        formData.append('title', modificarProfesor.title);
        formData.append('estatus', modificarProfesor.estatus); // Agregar el campo estatus

        try {
            const response = await axios.put(`https://start-digital.onrender.com/gestion/calendario/admin/editar-pago/${datosProfesor.id}`, formData, {
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
                <h3 className="text-3xl font-semibold text-center text-gray-500 mt-4 mb-2">Verificar Pago</h3>
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
                    <div className="mb-2">
                        <label htmlFor="totalPrice" className="block mb-1 text-sm text-gray-600">Total Price</label>
                        <input
                            type="number"
                            id="totalPrice"
                            name="totalPrice"
                            className="class-input text-sm w-full px-4 py-1 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                            value={modificarProfesor.totalPrice}
                            onChange={(event) => setModificarProfesor(prevState => ({
                                ...prevState,
                                totalPrice: event.target.value,
                            }))}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="title" className="block mb-1 text-sm text-gray-600">Título</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="class-input text-sm w-full px-4 py-1 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                            value={modificarProfesor.title}
                            onChange={(event) => setModificarProfesor(prevState => ({
                                ...prevState,
                                title: event.target.value,
                            }))}
                        />
                    </div>
                    <button
                        onClick={confirmarModificar}
                        type="button"
                        className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
                    >
                        Verificar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ModalEditarPagoAdmin;
