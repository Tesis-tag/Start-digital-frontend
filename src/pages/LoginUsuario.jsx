import './Login.css';
import logodeca from '../img/ucla3.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { auth } from "../api/firebase.config";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const ADMIN_EMAILS = ["admin@example.com", "otroadmin@example.com"]; // Lista de correos de administradores

const LoginUsuario = () => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null); // Estado para almacenar si es admin o usuario
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const isAdmin = ADMIN_EMAILS.includes(currentUser.email);
                setRole(isAdmin ? "admin" : "usuario");
                
                localStorage.setItem("user", JSON.stringify({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    role: isAdmin ? "admin" : "usuario"
                }));

                navigate(isAdmin ? "/admin-dashboard" : "/dashboard");
            } else {
                setUser(null);
                setRole(null);
                localStorage.removeItem("user");
            }
        });
        return () => unsubscribe(); // Limpiar el listener cuando el componente se desmonta
    }, [navigate]);

    const iniciarSesionGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const isAdmin = ADMIN_EMAILS.includes(user.email);

            Swal.fire({
                background: 'white',
                color: 'black',
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                confirmButtonColor: '#4CAF50',
                confirmButtonText: 'Aceptar'
            });
            
            localStorage.setItem("user", JSON.stringify({
                uid: user.uid,
                email: user.email,
                role: isAdmin ? "admin" : "usuario"
            }));

            navigate(isAdmin ? "/admin-dashboard" : "/dashboard");
        } catch (error) {
            Swal.fire({
                background: 'white',
                color: 'black',
                icon: 'error',
                title: 'Error al iniciar sesión',
                text: error.message,
                confirmButtonColor: '#EB193C',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const cerrarSesion = async () => {
        await signOut(auth);
        setUser(null);
        setRole(null);
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className='flex justify-center items-center cont-login'>
            <div className="container mx-auto p-4 bg-white">
                <div className="w-full md:w-1/2 lg:w-1/3 mx-auto mb-12 mt-6">
                    <div className="div-login">
                        <img src={logodeca} alt="" className='img-login' />
                    </div>
                    {user ? (
                        <div>
                            <p className="text-center mb-4">Bienvenido, {user.displayName} ({role})</p>
                            <button
                                onClick={cerrarSesion}
                                className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mb-2"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={iniciarSesionGoogle}
                            className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
                        >
                            Iniciar Sesión con Google
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LoginUsuario;
