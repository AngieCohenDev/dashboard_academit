import { Table } from './shared/Table';
import { DynamicForm } from './shared/DinamicForm/DynamicForm';
import ItemFormPopup from '../components/shared/FormCreation/FormCreation';
import { useVideoLocic } from './hooks/useVideoLocic';

const videoField = {
  keys: ['id', 'title', 'description', 'video', 'createdAt', 'updatedAt'],
  labels: ['Id', 'Título', 'Descripción', 'URL', 'Creado', 'Actualizado'],
};

const fields = [
  { id: 'id', label: 'Id', type: 'text', required: false },
  { id: 'title', label: 'Título', type: 'text', required: false },
];

const Createfields = [
  { id: 'Título', label: 'Título', type: 'text', required: true },
  { id: 'Descripción', label: 'Descripción', type: 'text', required: true },
  { id: 'Video', label: 'Video', type: 'file', required: true },
];

export default function VideoForm() {

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
  } = useVideoLocic();

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

