import { useEffect } from 'react';

const ModalVerPago = ({ datosProfesor }) => {
    useEffect(() => {
        if (!datosProfesor) {
            console.error('No se proporcionaron datos del profesor.');
        }
    }, [datosProfesor]);

    return (
        <div className="w-full">
            <div className="p-2 bg-white rounded-lg shadow-lg">
                <h3 className="text-3xl font-semibold text-center text-gray-500 mt-4 mb-2">Comprobante de Pago</h3>
                <div className="flex justify-center">
                    {datosProfesor && datosProfesor.img ? (
                        <img 
                            src={datosProfesor.img} 
                            alt="Comprobante de Pago" 
                            style={{ maxHeight: '80vh', borderRadius: '5px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }} 
                        />
                    ) : (
                        <p className="text-gray-600">No hay imagen disponible.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ModalVerPago;
