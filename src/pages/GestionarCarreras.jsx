import { useState } from "react";

function CrearCarreras(isModalOpen) {

    if (isModalOpen === false) {
        return null;
    }

 
  return (
    <>
        <div className="contenedor ">
       {/** <Link to="/"><button className="bg-transparent hover:bg-white text-white font-semibold hover:text-gray-600 py-2 px-6 border border-white hover:border-transparent rounded mb-2">
        Atrás
    </button></Link> */}
        <div className="w-[400px] md:w-[500px] lg:w-[700px]  p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-500 mt-8 mb-6">Registrar Carrera</h1>
        <form className="pl-8 pr-8">
            <div className="mb-4">
            <label htmlFor="nombre" className="block mb-2 text-base text-gray-600">
                Nombre
            </label>
            <input
                type="text"
                id="nombre"
                name="nombre"
                className="class-input w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="apellido" className="block mb-2 text-base text-gray-600">
                Apellido
            </label>
            <input
                type="text"
                id="apellido"
                name="apellido"
                className="class-input  w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-base text-gray-600">
                Correo electrónico
            </label>
            <input
                type="email"
                id="email"
                name="email"
                className="class-input  w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-base text-gray-600">
                Materia que imparte
            </label>
            <input
                type="password"
                id="password"
                name="password"
                className="class-input  w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
            />
            </div>
            <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-2 text-base text-gray-600">
               URL de la foto de perfil 
            </label>
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="class-input  w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
            />
            </div>
            <button
            type="submit"
            className=" w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
            >
            Registro
            </button>
        </form>
        </div>
        </div>
</>
  )
}

export default CrearCarreras