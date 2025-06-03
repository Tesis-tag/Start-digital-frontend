import '../index.css';
import logom from '../img/logomi.jpg';
import { Link } from 'react-router-dom'; 

const Sidebar = ({ isOpen, toggleSidebar }) => {

  const cerrarSesion = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    console.log(localStorage);
    window.location.reload();
  };
    
  return (
    <div className={`flex h-screen flex-col justify-between border-e bg-white transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
         style={{ width: "250px", position: "fixed", top: "0", left: "0" }}>
      <div className="px-4 py-6">
        <img src={logom} alt="" className='w-80'/>
         
        <ul className="mt-6 space-y-1">
          <li>
            <Link
              to="/panel-usuario"
              className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
            >
              Inicio
            </Link>
          </li>

          <li>
            <Link
              to="/servicios"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Servicios de redes
            </Link>
          </li>

          <li>
            <Link
              to="/mis-pagos"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Mis pagos
            </Link>
          </li>

          <li>
            <Link
              to="/mis-sesiones"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Galería
            </Link>
          </li>
        </ul>
      </div>

      <div className="px-4 py-6">
        <Link
          to="/login-usuario"
          onClick={cerrarSesion}
          className="block rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
        >
          Cerrar sesión
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
