import './Login.css';
import logodeca from '../img/logom.jpg';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2'

const Login = () => {
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    const handleLogin = (event) => {
        setUsuario({
            ...usuario,
            [event.target.name]: event.target.value,
        });
    };

    const iniciarSesion = async () => {
        console.log(usuario);

        // Validar que los campos no estén vacíos
        if (!usuario.email || !usuario.password) {
            Swal.fire({
                background: 'white',
                color: 'black',
                icon: 'warning',
                title: 'Por favor, llena todos los campos.',
                confirmButtonColor: '#EB193C',
                confirmButtonText: 'Aceptar'
            });
            return; // Salir de la función si hay campos vacíos
        }

        try {
            const response = await axios.post('https://start-digital.onrender.com/login', usuario);
            const token = response.data.token;
            const role = response.data.role;

            // Almacenar el token en localStorage
            if (token) {
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);
                window.location.reload();
            } else {
                Swal.fire({
                    background: 'rgba(0, 0, 0, 0.92)',
                    color: 'aliceblue',
                    icon: 'error',
                    title: 'Usuario o contraseña incorrectos',
                    confirmButtonColor: '#EB193C',
                    confirmButtonText: 'Aceptar'
                });
            }
            console.log("Sesión iniciada:", localStorage.token);
        } catch (error) {
            // Verifica si el error es un 401
            if (error.response && error.response.status === 401) {
                Swal.fire({
                    background: 'white',
                    color: 'black',
                    icon: 'error',
                    title: 'Credenciales inválidas. Por favor, inténtalo de nuevo.',
                    confirmButtonColor: '#EB193C',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                console.log(error);
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Evita que se envíe el formulario
        iniciarSesion(); // Llama a iniciarSesion al enviar el formulario
    };

    return (
        <div className='flex justify-center items-center cont-login'>
            <div className="container mx-auto p-4 bg-white">
                <div className="w-full md:w-1/2 lg:w-1/3 mx-auto mb-12 mt-6">
                    <div className="div-login">
                        <img src={logodeca} alt="" className='img-login' />
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col mt-4">
                        <input
                            type="email"
                            name="email"
                            className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                            placeholder="Correo"
                            onChange={handleLogin}
                        />
                        <input
                            type="password"
                            name="password"
                            className="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-2 focus:outline-none focus:ring-cyan-500 text-sm"
                            placeholder="Contraseña"
                            onChange={handleLogin}
                        />
                        <button
                            type="submit"
                            className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
