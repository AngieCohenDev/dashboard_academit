import React, { useState } from 'react';
import { ConfirmationDialog } from '../../shared/ConfirmationDialog';
import { createItemVideos } from '../../../services/peticionesVideo';

const StepThree = ({ prevStep, formData, goToStepOne }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado de recargar la página
    setOpen(true);
  };
  
  const handleClose = () => setOpen(false);

  const [formValues, setFormValues] = useState(formData);

  const handleConfirm = async (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado de recargar la página
    // console.log('formValues:', formValues); // Log para ver los valores del formulario
    try {
      await createItemVideos(formValues);
      setOpen(false);
      goToStepOne();
    } catch (error) {
      console.error('Error al crear el curso:', error);
    }
  };

  return (
    <div className="p-6 w-full mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Revisión del Curso</h2>
      <div>
        <h3 className="text-lg font-semibold my-4">Información del curso</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <p className='my-1'><strong className='text-gray-500'>Nombre del Curso: </strong> {formValues.nombreCurso}</p>
          <p className='my-1'><strong className='text-gray-500'>Descripción: </strong> {formValues.descripcionCurso}</p>
          <p className='my-1'><strong className='text-gray-500'>Categoría: </strong> {formValues.categoria}</p>
          <p className='my-1'><strong className='text-gray-500'>Estatus: </strong> {formValues.estatus}</p>
          <p className='my-1'><strong className='text-gray-500'>Nivel: </strong> {formValues.nivel}</p>
          {formValues.fotografiaDelCurso && (
            <div>
              <strong className='text-gray-500'>Portada del Curso:</strong>
              <img src={URL.createObjectURL(formValues.fotografiaDelCurso)} alt="Portada del curso" className="mt-2 h-32" />
            </div>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Información de los videos</h3>
        {formValues.videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formValues.videos.map((video, index) => (
              <div key={index} className="p-2 border border-gray-300 rounded-md space-y-2">
                <p><strong className='text-gray-500'>Nombre del Video:</strong> {video.tituloVideo}</p>
                <p><strong className='text-gray-500'>Descripción:</strong> {video.descripcion}</p>
                <p><strong className='text-gray-500'> Estatus:</strong> {video.estatus}</p>
                {video.archivoMiniatura && (
                  <div>
                    <strong className='text-gray-500'>Miniatura:</strong>
                    <img src={URL.createObjectURL(video.archivoMiniatura)} alt="Miniatura del video" className="mt-2 h-16" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No se han agregado videos.</p>
        )}
      </div>
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-4 py-2 w-[150px] bg-gray-600 hover:bg-gray-800 text-white rounded-md"
        >
          Anterior
        </button>
        <button
          onClick={handleOpen}
          className="px-4 py-2 bg-green-600 hover:bg-green-800 text-white rounded-md"
        >
          Crear Curso
        </button>
        <ConfirmationDialog
          open={open}
          onClose={handleClose}
          title="Crear curso"
          message="¿Estás seguro de que deseas crear este curso?"
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
};

export default StepThree;
