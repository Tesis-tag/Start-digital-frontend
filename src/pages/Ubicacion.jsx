import Navbar from "./Navbar";
import Foo from "./Foo";
import './Profesores.css';
import './PublicView.css';

const Ubicacion = () => {


  return (
    <>
      <div id="inicio" className="page">
        <Navbar />
        <section className="sec-general-banner">
          <div className="cont-h1-tele">
            <h1 className="h1-tele font-robot font-normal text-white ">Ubicación</h1>
          </div>
        </section>
        <div className="contenido">
          <section className="section-profesores">
          <h1 className="h1-pags">Ubicación de Start Digital</h1>
<div className="cont-intro flex justify-center mb-4">
  <div className="cont-intro flex justify-center">
    <p className="text-center text-gray-600 mb-8 px-4">
      Start Digital se encuentra ubicado en la Calle 6, Sector La Concordia, El Tocuyo, Estado Lara, con código postal 3018. Sus coordenadas geográficas son aproximadamente 10.0800° N, 69.3370° O.
      <br /><br />
      El acceso a nuestras instalaciones es fácil y conveniente. Estamos situados a menos de 55 km de Barquisimeto, la capital del estado Lara. El Tocuyo, que es la capital del municipio Morán, está rodeado de ocho parroquias y limita al norte con el municipio Torres, al sur con el estado Portuguesa, al este con los municipios Andrés Eloy Blanco y Jiménez, y al oeste con el estado Trujillo.
      <br /><br />
      Nuestra ubicación en la Calle 6 permite un acceso directo desde las principales vías de la ciudad, facilitando la llegada a nuestros clientes y colaboradores. Nos encontramos cerca de puntos de interés que hacen de nuestra sede un lugar estratégico para el desarrollo de nuestros servicios.
    </p>
  </div>
</div>


            <div className="cont-intro flex justify-center mb-8">
              <div className="overflow-x-auto border border-gray-200 mb-4">
                
            
              <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2388.1968324501663!2d-69.79175306673426!3d9.791953421719237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwNDcnMzEuMCJOIDY5wrA0NycyNi4xIlc!5e1!3m2!1ses!2sve!4v1743886881020!5m2!1ses!2sve" width="1200" height="700" style={{border:0, margin:0, padding:0,}} allowfullscreen="" loading="lazy" className='rounded'></iframe>
              </div>
            </div>
          </section>
        </div>
        <Foo />
      </div>
    </>
  );
};

export default Ubicacion;
