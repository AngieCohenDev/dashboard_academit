import { Table } from './shared/Table';
import {VideoStep} from './shared/VideoStep'
import { useVideoLocic } from './hooks/useVideoLocic';
import { Alert } from './shared/Alerts';

const videoField = {
  keys: ['idCurso', 'nombreCurso', 'descripcionCurso','estatus','nivel','fotografiaDelCurso','categoria', 'createdAt', 'updatedAt'],
  labels: ['ID','Nombre','Descripción','Estatus','Nivel','Miniatura','Categoria','Creado', 'Actualizado'],
};


export default function VideoForm() {

 const {
    alert,
    setAlert,
    extraButtons,
    actions,
    handlePageChange,
    searchFormSubmit,
    handleFormSubmit,
    showPopup,
    data,
    totalItems,
    totalPages,
    resetForm,
    currentItem,
    closePopup,
    formAction,
    setCurrentItem,
    currentPage
  } = useVideoLocic();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <VideoStep/>
      {alert && <Alert alert={alert} setAlert={setAlert}/>}

      <div className="overflow-x-auto mx-4">
        <Table
          config={videoField}
          data={data}
          totalItems={totalItems}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          actions={actions}
        />
      </div>
    </div>
  );
}

