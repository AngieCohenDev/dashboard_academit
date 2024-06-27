import { Table } from './shared/Table';
import { DynamicForm } from './shared/DinamicForm/DynamicForm';
import ItemFormPopup from '../components/shared/FormCreation/FormCreation';
import { useArticleLogic } from './hooks/useArticleLogic';

const ArticleField = {
  keys: ['id', 'title','description', 'image', 'createdAt', 'updatedAt'],
  labels: ['Id', 'Título','Descripción', 'URL', 'Creado', 'Actualizado'],
};

const fields = [
  { id: 'id', label: 'Id', type: 'text', required: false },
  { id: 'title', label: 'Título', type: 'text', required: false },
];

const Createfields = [
  { id: 'Título', label: 'Título', type: 'text', required: true },
  { id: 'NavegacionTitle ', label: 'Navegación', type: 'text', required: true },
  { id: 'Descripción', label: 'Descripción', type: 'text', required: true },
  { id: 'Imagen', label: 'Imagen', type: 'file', required: true },
];

export default function ArticleForm() {

  const {
    actions,
    data,
    extraButtons,
    handleFormSubmit,
    handlePageChange,
    resetForm,
    searchFormSubmit,
    showPopup,
    totalItems,
    totalPages,
    currentItem,
    closePopup,
    currentPage,
    formAction,
    setCurrentItem
  } = useArticleLogic()

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
          config={ArticleField}
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
