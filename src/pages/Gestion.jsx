import logodeca from '../img/ucla3.png'
import { Link } from 'react-router-dom'

const Gestion = () => {

  const roll = localStorage.getItem('role');

  const cerrarSesion=()=>{
    localStorage.removeItem('token')
    console.log(localStorage)
    window.location.reload();
  }

  return (
    <div className='flex justify-center items-center cont-gestion' style={{minHeight:'100vh'}}>
    <div className="container mx-auto p-4 bg-white">
<div className="w-full w-md-3/4 mx-auto mb-12 mt-6">
<div className="div-login">
    <img src={logodeca} alt="" className='img-login'/>
</div>
<div className="div-btn mb-20 flex flex-wrap justify-center">
<Link className=" px-4"  to="/gestion/personal-administrativo" >
<button
    type="button"
    className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
    style={{width:'220px', height:'90px'}}
>
  Personal Administrativo
</button>
</Link>
<Link className=" px-4"  to="/gestion/profesores/telematica">
<button
    type="button"
    className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
style={{width:'220px', height:'90px'}}
>
  Profesores
</button>
</Link>
{
(roll == '5' || roll == '0') && (
  <Link className=" px-4"  to="/gestion/carreras/telematica">
  <button
    
      type="button"
      className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
  style={{width:'220px', height:'90px'}}
  >
    Materias de Telemática
  </button>
  </Link>
)}
{
  (roll == '6' || roll == '0') && (
    <Link className=" px-4"  to="/gestion/carreras/informatica">
    <button
      
        type="button"
        className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
    style={{width:'220px', height:'90px'}}
    >
      Materias de Informática
    </button>
    </Link>
  )
}
{
  (roll == '4' || roll == '0') && (
    <Link className=" px-4"  to="/gestion/carreras/produccion">
    <button
      
        type="button"
        className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
    style={{width:'220px', height:'90px'}}
    >
      Materias de Producción
    </button>
    </Link>
  )
}
{
  (roll == '2' || roll == '0') && (
    <Link className=" px-4"  to="/gestion/carreras/matematica">
    <button
      
        type="button"
        className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
    style={{width:'220px', height:'90px'}}
    >
      Materias de Matemática
    </button>
    </Link>
  )
}
{
  (roll == '3' || roll == '0') && (
    <Link className=" px-4"  to="/gestion/carreras/fisica">
    <button
      
        type="button"
        className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
    style={{width:'220px', height:'90px'}}
    >
      Materias de Física
    </button>
    </Link>
  )
}
{
  (roll == '1' || roll == '0') && (
    <Link className=" px-4"  to="/gestion/carreras/analisis">
    <button
      
        type="button"
        className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
    style={{width:'220px', height:'90px'}}
    >
      Materias de Análisis de Sistemas
    </button>
    </Link>
  )
}
{
  (roll == '5' || roll == '0') && (
    <Link className=" px-4"  to="/gestion/horarios/telematica">
    <button
      
        type="button"
        className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
    style={{width:'220px', height:'90px'}}
    >
      Horarios de Telemática
    </button>
    </Link>
  )
}
{
  (roll == '6' || roll == '0') && (
    <Link className=" px-4"  to="/gestion/horarios/informatica">
    <button
      
        type="button"
        className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
    style={{width:'220px', height:'90px'}}
    >
      Horarios de Informática
    </button>
    </Link>
  )
}
{
  (roll == '4' || roll == '0') && (
    <Link className=" px-4"  to="/gestion/horarios/produccion">
    <button
      
        type="button"
        className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
    style={{width:'220px', height:'90px'}}
    >
      Horarios de Producción
    </button>
    </Link>
  )
}
{
  (roll == '2' || roll == '0') && (
  <Link className=" px-4"  to="/gestion/horarios/matematica">
  <button
    
      type="button"
      className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
  style={{width:'220px', height:'90px'}}
  >
    Horarios de Matemática
  </button>
  </Link>
  )
}
{
  (roll == '3' || roll == '0') && (
    <Link className=" px-4"  to="/gestion/horarios/fisica">
      <button
        
          type="button"
          className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
      style={{width:'220px', height:'90px'}}
      >
        Horarios de Física
      </button>
    </Link>
  )
}
{
  (roll == '1' || roll == '0') && (
    <Link className=" px-4"  to="/gestion/horarios/analisis">
    <button
      
        type="button"
        className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
    style={{width:'220px', height:'90px'}}
    >
      Horarios de Análisis de Sistemas
    </button>
    </Link>
  )
}

<Link className=" px-4"  to="/gestion/noticias">
<button
  
    type="button"
    className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
style={{width:'220px', height:'90px'}}
>
  Noticias
</button>
</Link>
<Link className=" px-4"  to="/gestion/egresados">
<button
  
    type="button"
    className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
style={{width:'220px', height:'90px'}}
>
  Egresados
</button>
</Link>
<Link className=" px-4"  to="/gestion/mensajes">
<button
  
    type="button"
    className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
style={{width:'220px', height:'90px'}}
>
  Mensajes
</button>
</Link>
<Link className=" px-4"  to="/gestion/preguntas-frecuentes">
<button
  
    type="button"
    className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
style={{width:'220px', height:'90px'}}
>
  Preguntas Frecuentes
</button>
</Link>
<Link className=" px-4"  to="/gestion/calendario">
<button
  
    type="button"
    className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
style={{width:'220px', height:'90px'}}
>
 Calendario
</button>
</Link>
<Link className=" px-4"  to="/gestion/contacto">
<button
  
    type="button"
    className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
style={{width:'220px', height:'90px'}}
>
 Contactos
</button>
</Link>
<Link className=" px-4"  to="/gestion/eventos">
<button
  
    type="button"
    className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
style={{width:'220px', height:'90px'}}
>
 Eventos
</button>
</Link>
<Link className=" px-4"  to="/gestion/tesis">
<button
  
    type="button"
    className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
style={{width:'220px', height:'90px'}}
>
 Trabajos de grado
</button>
</Link>
</div>
  <button
    onClick={cerrarSesion}
      type="button"
      className="mt-4 px-4 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white text-lg font-medium hover:text-gray-100 py-2 rounded-lg mx-auto block "
  >
    Cerrar sesión
  </button>
</div>
</div>
</div>
  )
}

export default Gestion