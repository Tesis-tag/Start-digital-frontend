import './Login.css';
import logodeca from '../img/logom.jpg';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';

const LoginUsuarioV2 = () => {
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });
    const [crearCuenta, setCrearCuenta] = useState(false);
    const [recuperarContrasena, setRecuperarContrasena] = useState(false);
    const [nuevoUsuario, setNuevoUsuario] = useState({
        name: '', // Añadir el campo para el nombre
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleLogin = (event) => {
        setUsuario({
            ...usuario,
            [event.target.name]: event.target.value,
        });
    };

    const handleNuevoUsuario = (event) => {
        setNuevoUsuario({
            ...nuevoUsuario,
            [event.target.name]: event.target.value,
        });
    };

    const iniciarSesion = async () => {
        if (!usuario.email || !usuario.password) {
            Swal.fire({
                background: 'white',
                color: 'black',
                icon: 'warning',
                title: 'Por favor, llena todos los campos.',
                confirmButtonColor: '#EB193C',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
    
        try {
            const response = await axios.post('https://start-digital.onrender.com/user-session/login', usuario);
            const token = response.data.token;
            const id = response.data.userId;
    
            if (token) {
                localStorage.setItem("userToken", token);
                localStorage.setItem("userId", id);
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
        } catch (error) {
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
    

    const crearCuentaUsuario = async () => {
        if (!nuevoUsuario.name || !nuevoUsuario.email || !nuevoUsuario.password || !nuevoUsuario.confirmPassword) {
            Swal.fire({
                background: 'white',
                color: 'black',
                icon: 'warning',
                title: 'Por favor, llena todos los campos.',
                confirmButtonColor: '#EB193C',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
    
        if (nuevoUsuario.password !== nuevoUsuario.confirmPassword) {
            Swal.fire({
                background: 'white',
                color: 'black',
                icon: 'warning',
                title: 'Las contraseñas no coinciden.',
                confirmButtonColor: '#EB193C',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
    
        // Validar que la contraseña tenga al menos 6 caracteres
        if (nuevoUsuario.password.length < 6) {
            Swal.fire({
                background: 'white',
                color: 'black',
                icon: 'warning',
                title: 'La contraseña debe tener al menos 6 caracteres.',
                confirmButtonColor: '#EB193C',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
    
        try {
            const response = await axios.post('https://start-digital.onrender.com/user-session/new', nuevoUsuario);
            Swal.fire({
                background: 'white',
                color: 'black',
                icon: 'success',
                title: 'Cuenta creada exitosamente.',
                confirmButtonColor: '#EB193C',
                confirmButtonText: 'Aceptar'
            });
            setCrearCuenta(false); // Ocultar el formulario de crear cuenta
        } catch (error) {
            console.log(error);
            Swal.fire({
                background: 'white',
                color: 'black',
                icon: 'error',
                title: 'Error al crear la cuenta. Inténtalo de nuevo.',
                confirmButtonColor: '#EB193C',
                confirmButtonText: 'Aceptar'
            });
        }
    };
    
    
    const recuperarContrasenaUsuario = async () => {
        // Aquí puedes implementar la lógica para recuperar la contraseña
        Swal.fire({
            background: 'white',
            color: 'black',
            icon: 'info',
            title: 'Funcionalidad de recuperación de contraseña no implementada.',
            confirmButtonColor: '#EB193C',
            confirmButtonText: 'Aceptar'
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Evita que se envíe el formulario
        iniciarSesion(); // Llama a iniciarSesion al enviar el formulario
    };

    return (
        <div className='flex justify-center items-center cont-login'>
            <main className="w-full h-screen flex flex-col items-center justify-center px-4 ">
                <div className="max-w-sm w-full text-gray-600 space-y-5">
                    <div className="text-center pb-8">
                        <img src={logodeca} width={150} className="mx-auto" />
                        <div className="mt-5">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Inicia sesión en tu cuenta</h3>
                        </div>
                    </div>
                    {!crearCuenta && !recuperarContrasena && (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="font-medium">Correo Electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    onChange={handleLogin}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-lg rounded-lg"
                                    style={{ border: '1px solid #e5e7eb' }}
                                />
                            </div>
                            <div>
                                <label className="font-medium">Contraseña</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    onChange={handleLogin}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-lg rounded-lg"
                                    style={{ border: '1px solid #e5e7eb' }}
                                />
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-x-3">
                                    <input type="checkbox" id="remember-me-checkbox" className="checkbox-item peer hidden" />
                                    <label
                                        htmlFor="remember-me-checkbox"
                                        className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                                    ></label>
                                    <span>Recuérdame</span>
                                </div>
                                <a href="javascript:void(0)" onClick={() => setRecuperarContrasena(true)} className="text-center text-indigo-600 hover:text-indigo-500">¿Olvidaste tu contraseña?</a>
                            </div>
                            <button
                                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                                type="submit"
                            >
                                Iniciar sesión
                            </button>

                            <p className="text-center">¿No tienes una cuenta? <a href="javascript:void(0)" onClick={() => setCrearCuenta(true)} className="font-medium text-indigo-600 hover:text-indigo-500">Crear cuenta</a></p>
                        </form>
                    )}

                    {crearCuenta && (
                        <form onSubmit={(e) => { e.preventDefault(); crearCuentaUsuario(); }} className="space-y-5">
                            <div>
                                <label className="font-medium">Nombre</label>
                                <input
                                    type="text"
                                    name="name" // Campo para el nombre
                                    required
                                    onChange={handleNuevoUsuario}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-lg rounded-lg"
                                    style={{ border: '1px solid #e5e7eb' }}
                                />
                            </div>
                            <div>
                                <label className="font-medium">Telefono</label>
                                <input
                                    type="text"
                                    name="telefono" // Campo para el nombre
                                    required
                                    onChange={handleNuevoUsuario}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-lg rounded-lg"
                                    style={{ border: '1px solid #e5e7eb' }}
                                />
                            </div>
                            <div>
                                <label className="font-medium">Correo Electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    onChange={handleNuevoUsuario}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-lg rounded-lg"
                                    style={{ border: '1px solid #e5e7eb' }}
                                />
                            </div>
                            <div>
                                <label className="font-medium">Contraseña</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    onChange={handleNuevoUsuario}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-lg rounded-lg"
                                    style={{ border: '1px solid #e5e7eb' }}
                                />
                            </div>
                            <div>
                                <label className="font-medium">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    onChange={handleNuevoUsuario}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-lg rounded-lg"
                                    style={{ border: '1px solid #e5e7eb' }}
                                />
                            </div>
                            <button
                                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                                type="submit"
                            >
                                Crear cuenta
                            </button>
                            <p className="text-center">¿Ya tienes una cuenta? <a href="javascript:void(0)" onClick={() => setCrearCuenta(false)} className="font-medium text-indigo-600 hover:text-indigo-500">Iniciar sesión</a></p>
                        </form>
                    )}

                    {recuperarContrasena && (
                        <div className="space-y-5">
                            <p className="text-center">Ingresa tu correo electrónico para recuperar tu contraseña.</p>
                            <input
                                type="email"
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-lg rounded-lg"
                                style={{ border: '1px solid #e5e7eb' }}
                            />
                            <button
                                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                                onClick={recuperarContrasenaUsuario}
                            >
                                Recuperar Contraseña
                            </button>
                            <p className="text-center"><a href="javascript:void(0)" onClick={() => setRecuperarContrasena(false)} className="font-medium text-indigo-600 hover:text-indigo-500">Volver</a></p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default LoginUsuarioV2;
