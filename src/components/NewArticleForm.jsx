import { Table } from './shared/Table';
import { DynamicForm } from './shared/DinamicForm/DynamicForm';
import ItemFormPopup from '../components/shared/FormCreation/FormCreation';
import { useNewArticleLogic } from './hooks/useNewArticleLogic';

const NewArticleField = {
  keys: ['id', 'sectiontitle', 'articletitle', 'description', 'createdAt', 'updatedAt'],
  labels: ['Id', 'Título', 'Subtitulo', 'Descripción', 'Creado', 'Actualizado'],
};

const fields = [
  { id: 'id', label: 'Id', type: 'text', required: false },
  { id: 'title', label: 'Título', type: 'text', required: false },
];

const Createfields = [
  { id: 'Título', label: 'Título', type: 'text', required: true },
  { id: 'NavegacionArticleTitle', label: 'NavegacionArticleTitle', type: 'text', required: true },
  { id: 'Subtitulo', label: 'Subtitulo', type: 'text', required: true },
  { id: 'Descripción', label: 'Descripción', type: 'text', required: true },
];

export default function NewArticleForm() {

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
  } = useNewArticleLogic()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DynamicForm fields={fields} onSubmit={searchFormSubmit} extraButtons={extraButtons} resetForm={resetForm} />

      {showPopup && (
        <ItemFormPopup
          currentItem={currentItem}
          closePopup={closePopup}
          handleFormSubmit={handleFormSubmit}
          fields={Createfields}
          formAction={formAction}
          handleFieldChange={(fieldId, value) => {
            setCurrentItem({ ...currentItem, [fieldId]: value });
          }}
        />
      )}

      <div className="overflow-x-auto mx-4">
        <Table
          config={NewArticleField}
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
