import { Table } from './shared/Table';
import { DynamicForm } from './shared/DinamicForm/DynamicForm';
import ItemFormPopup from '../components/shared/FormCreation/FormCreation';
import { useMainArticleLogic } from './hooks/useMainArticleLogic';

const MainarticleField = {
  keys: ['id', 'title', 'description', 'textButton', 'image', 'NavegacionBoton', 'createdAt', 'updatedAt'],
  labels: ['Id', 'Título', 'Descripción', 'Botón', 'URL','navegacion', 'Creado', 'Actualizado'],
};

const fields = [
  { id: 'id', label: 'Id', type: 'text', required: false },
  { id: 'title', label: 'Título', type: 'text', required: false },
];

const Createfields = [
  { id: 'Título', label: 'Título', type: 'text', required: true },
  { id: 'Descripción', label: 'Descripción', type: 'text', required: true },
  { id: 'Botón', label: 'Botón', type: 'text', required: true },
  { id: 'NavegacionBoton', label: 'Navegacion del botón', type: 'text', required: true },
  { id: 'Imagen', label: 'Imagen', type: 'file', required: true },
];



function MainArticleForm() {

  const {
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
  } = useMainArticleLogic()
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DynamicForm fields={fields} onSubmit={searchFormSubmit} extraButtons={extraButtons} resetForm={resetForm} />

      {showPopup && (
        <ItemFormPopup
          currentItem={currentItem}
          closePopup={closePopup}
          handleFormSubmit={handleFormSubmit}
          formAction={formAction}
          fields={Createfields}
          handleFieldChange={(fieldId, value) => {
            setCurrentItem({ ...currentItem, [fieldId]: value });
          }}
        />
      )}

      <div className="overflow-x-auto mx-4">
        <Table
          config={MainarticleField}
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

export default MainArticleForm;
