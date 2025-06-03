import Navbar from "./Navbar";
import Foo from "./Foo";
import './Profesores.css';
import './PublicView.css';
import { useState, useEffect } from "react";
import axios from 'axios';

const Contacto = () => {
    const [contactos, setContactos] = useState([]);
      

      useEffect(() => {
        const fetchProfesores = async () => {
            try {
                const response = await axios.get('gestion/contacto/');
                setContactos(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error al obtener los profesores:', error);
            }
        };
    
        fetchProfesores();
      }, []);

  return (
    <>
      <div id="inicio" className="page">
        <Navbar />
        <section className="sec-general-banner">
          <div className="cont-h1-tele">
            <h1 className="h1-tele font-robot font-normal text-white ">Contacto</h1>
          </div>
        </section>
        <div className="contenido">
          <section className="section-profesores">
            <h1 className="h1-pags">Correos de la Universidad</h1>
            <div className="cont-intro flex justify-center mb-4">
          <p className="p-profesores text-j">A continuación, se presenta una lista de correos de contacto de diversas áreas de la universidad. Si necesitas asistencia, no dudes en ponerte en contacto con la dependencia correspondiente.</p>
          </div>

            <div className="cont-intro flex justify-center mb-8">
              <div className="overflow-x-auto border border-gray-200 mb-4">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-lg">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Departamento</th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Correo</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {contactos.map((contacto) => (
                      <tr key={contacto.id} className="odd:bg-gray-50">
                        <td className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900" style={{ minWidth: '400px' }}>
                          {contacto.data.dependencia}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700" style={{ minWidth: '300px' }}>
                          {contacto.data.correo}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
        <Foo />
      </div>
    </>
  );
};

export default Contacto;
