import './Navbar.css';
import ucla3 from '../img/logom.jpg';
import menuico from '../img/menu.png';
import flechab from '../img/down.svg';
import flechaa from '../img/up.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const useMenu = () => {
    const [isOpen, setIsOpen] = useState("menu close");
    const [desplegar, setDesplegar] = useState(null);
    const [desplegarSubmenu, setDesplegarSubmenu] = useState(null);

    const toggleMenu = () => {
        setIsOpen(isOpen === "menu close submenu-decanato" ? "menu open submenu-decanato" : "menu close submenu-decanato");
        setDesplegar(null);
        setDesplegarSubmenu(null);
    };

    const handleDesplegar = (index) => {
        setDesplegar(desplegar === index ? null : index);
        setDesplegarSubmenu(null);
    };

    const handleDesplegarDos = (index) => {
        setDesplegarSubmenu(desplegarSubmenu === index ? null : index);
    };

    return { isOpen, toggleMenu, desplegar, handleDesplegar, desplegarSubmenu, handleDesplegarDos };
};

function Navbar() {
    const { isOpen, toggleMenu, desplegar, handleDesplegar, desplegarSubmenu, handleDesplegarDos } = useMenu();

    return (
        <>
            <header className="header ">
                <div className='div-img'>
                    <img src={ucla3} className='logo-deca' alt="" />
                    <img src={menuico} onClick={toggleMenu} className='menu-ico' id='menu-ico' alt="" />
                </div>
                <nav className="nav" style={{marginRight: 'px'}}>
                    <ul className={isOpen} id='menu'>
                        <li className="menu-item"><Link to='/' className="menu-link">Inicio</Link></li>
                        <li className="menu-item container-submenu">
                            <a onClick={() => handleDesplegar(1)} href="#" className="menu-link">Novedades
                                <img className='flecha-ico' src={desplegar === 1 ? flechaa : flechab} alt="" />
                            </a>
                            <ul className={desplegar === 1 ? "submenu-deca sub-open" : "submenu-deca"}>
                                <li className="menu-item"><Link to="/preguntas-frecuentes" className="menu-link">Preguntas Frecuentes</Link></li>
                                
                                <li className="menu-item"><Link to="/noticias" className="menu-link">Noticias</Link></li>
                                <li className="menu-item"><Link to="/eventos" className="menu-link">Eventos</Link></li>
                            </ul>
                        </li>
                        
                        <li className="menu-item"><Link to='/galeria' className="menu-link">Galería</Link></li>
                        <li className="menu-item"><Link to="/calendario" className="menu-link">Calendario</Link></li>
                        <li className="menu-item"><Link to='/ubicacion' className="menu-link">Ubicación</Link></li>
                        {/* <li className="menu-item"><Link to='/contacto' className="menu-link">Contacto</Link></li> */}
                    <div className='flex justify-center items-center'>
                    <Link to={'/login-usuario'}>  <button 
            type="button" 
            className="my-4 mx-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold d focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            style={{width:'140px'}}
        >
           Iniciar sesión
        </button></Link>
                    </div>
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Navbar;
