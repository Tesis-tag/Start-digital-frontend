import './Foo.css'
import logo from '../img/logom.jpg'
import pin from '../img/pin.svg'
import phone from '../img/phone.svg'
import mail from '../img/mail.svg'
import face from '../img/facebook.svg'
import twitter from '../img/x-twitter.svg'
import insta from '../img/ig.svg'
import pinter from '../img/pinter.svg'

const Foo = () => {
  return (
    <>
    <footer>
        <div className="main-content">
        <div className="left box flex justify-center items-center w-full">
  <div className="logo-f bg-white rounded-full w-32 h-32 flex items-center justify-center">
    <img className='logo-img ' src={logo} alt="" />
  </div>
</div>



            <div className="center box">
            <h2>Nosotros</h2>
            <div className="content">
            <p>Somos una empresa dedicada a capturar momentos únicos de nuestros clientes. Además, gestionamos redes sociales, creando contenido atractivo que conecta con su audiencia y fortalece su marca. Nuestro compromiso es brindar un servicio excepcional que impulse el crecimiento y la visibilidad de su empresa en el mundo digital.</p>

                <div className="social">
                    <a target="_blank" href="#"><img className='ico-social' src={face} alt="" /></a>
                    <a target="_blank" href="#"><span className="fab "><img className='ico-social' src={twitter} alt="" /></span></a>
                    <a target="_blank" href="#"><img className='ico-social' src={insta} alt="" /></a>
                    <a target="_blank" href="#"><span className="fab "><img className='ico-social' src={pinter} alt="" /></span></a>
                </div>
            </div>
            </div>

            <div className="right box">
            <h2>Ubicación</h2>
            <div className="content">
                <div className="ubi">
                <span className="fas "><img className='pin' src={pin} alt="" /></span>
                <span className="text">Calle 6 con carrera 10, El Tocuyo, Lara</span>
                </div>
                <div className="phone">
                <span className="fas "><img className='pin' src={phone} alt="" /></span>
                <span className="text">+58 412-387-2648</span>
                </div>
                <div className="email">
                <span className="fas "><img className='pin' src={mail} alt="" /></span>
                <span className="text">1005.25653055.ucla@gmail.com</span>
                </div>
            </div>
            </div>
        </div>
        <div className="bottom">
            <center>
            <span className="credit">Desarrollado por Luis Pernalete
                | </span>
            <span className="far fa-copyright"></span><span> 2025.</span>
            </center>
        </div>
    </footer>
    </>
  )
}

export default Foo