import Navbar from "../pages/Navbar";
import Foo from "../pages/Foo";
import "./Telematica.css";
import fotom1 from "../img/fotom1.jpg";
import fotom2 from "../img/fotom2.jpg";
import fotom3 from "../img/fotom3.jpg";
import fotom4 from "../img/port-m.jpg";
import fotom5 from "../img/fotom5.jpg";
import fotom6 from "../img/fotom6.jpg";
import fotom7 from "../img/fotom7.jpg";
import fotom8 from "../img/fotom8.jpg";
import fotom9 from "../img/fotom9.jpg";
import fotom10 from "../img/fotom10.jpg";
import fotom11 from "../img/fotom11.jpg";
import fotom12 from "../img/fotom12.jpg";

const images = [
  fotom1, fotom2, fotom3, fotom4, fotom5, fotom6,
  fotom7, fotom8, fotom9, fotom10, fotom11, fotom12
];

const GaleriaPublica = () => {
  return (
    <div>
      <Navbar />
      <main className="main-tele">
        <section className="sec-tele-banner">
          <div className="cont-h1-tele">
            <h1 className="h1-tele font-robot font-normal text-white">
            Galería de Imágenes
            </h1>
          </div>
        </section>

        <div className="container px-5 py-12 mx-auto">
       
          <p className="text-lg text-gray-600 mb-8 text-center">
            Esta sección muestra un poco de nuestro trabajo en la empresa, donde realizamos sesiones de fotos profesionales para capturar momentos únicos. ¡Explora nuestra galería!
          </p>
          <div className="flex flex-wrap -m-2">
            {images.map((image, index) => (
              <div key={index} className="md:p-2 p-1 w-1/3">
                <img alt={`Galería ${index + 1}`} className="w-full h-full object-cover" src={image} />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Foo />
    </div>
  );
};

export default GaleriaPublica;
