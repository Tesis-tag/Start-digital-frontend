import {  useState, useEffect } from 'react'

const ModalMateriasTelematicas = (datosMateria) => {

  const [materia, setMateria] = useState({
    datosMateria: {
      data:{
          semestre: '',
          asignatura: '',
          codigo: '',
          uc: '',
          descripcion: '',
          profesores: {
              profesorSeccion1: '',
          },
          idProfesor: '',
          prelacion: ''
      }
  }
  });

  useEffect(() => {
    const cargarMateria = async () => {
      setMateria(datosMateria)
      console.log(materia)
    };
    cargarMateria();
  }, []);

  
  return (
    <div className="card-auto w-full">
    <div
href="#"
className="bg-white relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
>
<span
className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-500 via-blue-300  to-red-600"
></span>

<div className="sm:flex sm:justify-between sm:gap-4">
<div>
<h3 className="text-lg font-bold text-gray-900 sm:text-xl">
{materia.datosMateria.data.asignatura}
</h3>
<p className="mt-1 text-md font-medium text-gray-600">Profesor de la asignatura: {materia.datosMateria.data.profesores.profesorSeccion1 ? materia.datosMateria.data.profesores.profesorSeccion1 : ' Actualmente no tiene un profesor'}</p>
<p className="text-sm text-gray-500">Semestre: {materia.datosMateria.data.semestre}</p>
</div>
<div className="flex justify-center sm:block sm:shrink-0">
</div>
</div>
<div className="mt-4">
<p className="text-pretty text-sm text-gray-500">
{materia.datosMateria.data.descripcion}
</p>
</div>
<dl className="mt-6 flex gap-4 sm:gap-6">
<div className="flex flex-col">
<p className="text-xs text-gray-500">Código de la materia:</p>
<p className="text-sm font-medium text-gray-600">{materia.datosMateria.data.codigo}</p>
</div>

<div className="flex flex-col">
<p className="text-xs text-gray-500">Materia que la prela:</p>
<p className="text-sm font-medium text-gray-600">{materia.datosMateria.data.prelacion ? materia.datosMateria.data.prelacion : 'Esta materia no tiene una prelación'}</p>
</div>
</dl>
</div>
   </div>
  )
}

export default ModalMateriasTelematicas