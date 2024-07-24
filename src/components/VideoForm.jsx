import { Table } from './shared/Table';
import { VideoStep } from './shared/VideoStep'
import { useVideoLocic } from './hooks/useVideoLocic';
import { DynamicForm } from './shared/DinamicForm/DynamicForm'
import { Alert } from './shared/Alerts';

const videoField = {
  keys: ['idCurso', 'nombreCurso', 'descripcionCurso', 'estatus', 'nivel', 'fotografiaDelCurso', 'categoria', 'createdAt', 'updatedAt'],
  labels: ['ID', 'Nombre', 'Descripción', 'Estatus', 'Nivel', 'Miniatura', 'Categoria', 'Creado', 'Actualizado'],
};

const fields = [
  { id: 'id', label: 'Id', type: 'text', required: false },
  { id: 'title', label: 'Título', type: 'text', required: false },
];


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
    <>
      <div className="min-h-screen bg-white flex flex-col">

        <DynamicForm fields={fields} extraButtons={extraButtons} onSubmit={searchFormSubmit} resetForm={resetForm} />
        {alert && <Alert alert={alert} setAlert={setAlert} />}
        {showPopup && (<VideoStep closePopup={closePopup}  isOpen={showPopup}/>)}

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
    </>

  );
}

