import './App.css'
import PagPrincipal from './pages/PagPrincipal'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import GestionarCarreras from './pages/GestionarCarreras.jsx'
import Profesores from './pages/Profesores.jsx'
import Login from './pages/Login.jsx'
import Telematica from './pages/Telematica.jsx'
import TableCarreras from './pages/TableCarreras.jsx'
import TableProfesores from './pages/TableProfesores.jsx'
import TableHorarios from './pages/TableHorarios.jsx'
import Gestion from './pages/Gestion.jsx'
import HorarioTelematica from './pages/HorarioTelematica.jsx'
import TablePersonlaAdministrativo from './pages/TablePersonalAdministrativo.jsx'
import PublicPersonalAdministrativo from './pages/PublicPersonalAdministrativo.jsx'
import PublicEgresados from './pages/PublicEgresados.jsx'
import TableEgresados from './pages/TableEgresados.jsx'
import TableMensaje from './pages/TableMensaje.jsx'
import TableNoticias from './pages/TableNoticias.jsx'
import Contacto from './pages/Contacto.jsx'
import Ubicacion from './pages/Ubicacion.jsx'
import NuevaNoticia from './pages/NuevaNoticia.jsx'
import PublicPregunetasFrecuentes from './pages/PublicPreguntasFrecuentes.jsx'
import TablePreguntasFrecuentes from './pages/TablePreguntasFrecuentes.jsx'
import TableCalendario from './pages/TableCalendario.jsx'
import PublicCalendario from './pages/PublicCalendario.jsx'
import PublicNoticias from './pages/PublicNoticias.jsx'
import SlugNoticia from './pages/SlugNoticia.jsx'
import TableContacto from './pages/TableContacto.jsx'
import TableEventos from './pages/TableEventos.jsx'
import PublicEventos from './pages/PublicEventos.jsx'
import NuevoEvento from './pages/NuevoEvento.jsx'
import SlugEvento from './pages/SlugEvento.jsx'



import LoginUsuario from './pages/LoginUsuario.jsx'
import LoginUsuarioV2 from './pages/LoginUsuarioV2.jsx'
import DasboardUser from './pages/DashboardUser.jsx'
import TablePromocionesFotos from './pages/TablePromocionesFotos.jsx'
import TablePagosDeUsuario from './pages/TablePagosDeUsuario.jsx'
import TablePagosAdministrador from './pages/TablePagosAdministrador.jsx'
import ServicioComunty from './pages/ServicioComunity.jsx'
import TableServiciosComunity from './pages/TableServiciosComunity.jsx'
import TableUsuarios from './pages/TableUsuarios.jsx'
import MisSesiones from './pages/MisSesiones.jsx'
import GaleriaPublica from './pages/GaleriaPublica.jsx'
import FotosSesion from './pages/FotosSesion.jsx'

function App() {
  const isAuth = localStorage.getItem('token')
  const isAuthUser = localStorage.getItem('userToken')

  return (
    <div>
      <BrowserRouter>
    <Routes>
      <Route path='/' element={<PagPrincipal />} />
      <Route path='/gestion/carreras' element={<GestionarCarreras />} />
      <Route path='/profesores' element={<Profesores />} />
      <Route path='/personal-administrativo' element={<PublicPersonalAdministrativo />} />
      <Route path='/egresados' element={<PublicEgresados />} />
      <Route path='/ubicacion' element={<Ubicacion />} />
      <Route path='/calendario' element={<PublicCalendario />} />
      <Route path='/preguntas-frecuentes' element={<PublicPregunetasFrecuentes />} />
      <Route path='/contacto' element={<Contacto />} />
      <Route path='/noticias' element={<PublicNoticias />} />
      <Route path='/eventos' element={<PublicEventos />} />
      <Route path='/telematica' element={<Telematica />} />
      
      <Route path='/noticias/:slug' element={<SlugNoticia />} />
      <Route path='/eventos/:slug' element={<SlugEvento />} />
      <Route path='/horario-telematica' element={<HorarioTelematica />} />
      <Route path='//gestion/personal-administrativo' element={isAuth ? <TablePersonlaAdministrativo/> : <Navigate to='/login'/>} />
      <Route path='//gestion/egresados' element={isAuth ? <TableEgresados/> : <Navigate to='/login'/>} />
      <Route path='//gestion/contacto' element={isAuth ? <TableContacto/> : <Navigate to='/login'/>} />
      <Route path='//gestion/preguntas-frecuentes' element={isAuth ? <TablePreguntasFrecuentes/> : <Navigate to='/login'/>} />

      <Route path='//gestion/noticias' element={isAuth ? <TableNoticias/> : <Navigate to='/login'/>} />
      <Route path='//gestion/noticias/nueva' element={isAuth ? <NuevaNoticia/> : <Navigate to='/login'/>} />
      <Route path='//gestion/eventos' element={isAuth ? <TableEventos/> : <Navigate to='/login'/>} />
      <Route path='//gestion/eventos/nuevo' element={isAuth ? <NuevoEvento/> : <Navigate to='/login'/>} />
      <Route path='//gestion/mensajes' element={isAuth ? <TableMensaje/> : <Navigate to='/login'/>} />
      <Route path='//gestion/calendario' element={isAuth ? <TableCalendario/> : <Navigate to='/login'/>} />
      <Route path='//gestion/profesores/telematica' element={isAuth ? <TableProfesores/> : <Navigate to='/login'/>} />
      <Route path='//gestion/carreras/telematica' element={isAuth ? <TableCarreras/> : <Navigate to='/login'/>} />

      <Route path='//gestion/horarios/telematica' element={isAuth ? <TableHorarios/> : <Navigate to='/login'/>} />
      
      <Route path='//gestion/pagos' element={isAuth ? <TablePagosAdministrador/> : <Navigate to='/login'/>} />
      <Route path='/login' element={isAuth ? <Navigate to='/gestion/usuarios'/> : <Login/>}  />
      <Route path='/gestion' element={isAuth ? <Gestion/> : <Navigate to='/login'/>} />
      <Route path='/gestion/promociones-fotos' element={isAuth ? <TablePromocionesFotos/> : <Navigate to='/login'/>}  />
      <Route path='/gestion/servicios' element={isAuth ? <TableServiciosComunity/> : <Navigate to='/login'/>}  />
      <Route path='/gestion/usuarios' element={isAuth ? <TableUsuarios/> : <Navigate to='/login'/>}  />
      <Route path='/login-usuario-no-usado' element={isAuthUser ? <Navigate to='/panel-usuario'/> : <LoginUsuario/>}  />
      <Route path='/login-usuario' element={isAuthUser ? <Navigate to='/panel-usuario'/> : <LoginUsuarioV2/>}  />
      <Route path='/panel-usuario' element={isAuthUser ? <DasboardUser/> : <Navigate to='/login-usuario'/>}  />
      <Route path='/mis-pagos' element={isAuthUser ? <TablePagosDeUsuario/> : <Navigate to='/login-usuario'/>}  />
      <Route path='/servicios' element={isAuthUser ? <ServicioComunty/> : <Navigate to='/login-usuario'/>}  />
      <Route path='/mis-sesiones' element={isAuthUser ? <MisSesiones/> : <Navigate to='/login-usuario'/>}  />
      <Route path="/fotos-sesion/:id" element={isAuthUser ? <FotosSesion/> : <Navigate to='/login-usuario'/>} />
      
      <Route path='/galeria' element={<GaleriaPublica />} />
    </Routes>
  </BrowserRouter>
    </div>
  )
}

export default App
