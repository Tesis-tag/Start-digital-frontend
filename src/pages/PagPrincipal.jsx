import './PagPrincipal.css'
import Portada from './Portada'
import Navbar from './Navbar'
import Foo from './Foo'
import ContenidoPrincipal from './ContenidoPrincipal'

const PagPrincipal = () => {
  return (
    <div>
      <Navbar/>
    {/* <Portada/> */}
      <ContenidoPrincipal/>
      <Foo/>
    </div>
  )
}

export default PagPrincipal

