import ItemFormPopup from '../components/shared/FormCreation/FormCreation';
import { Table } from './shared/Table';
import { DynamicForm } from './shared/DinamicForm/DynamicForm';
import { useHeaderLogic } from './hooks/useHeaderLogic';


const articlesField = {
  keys: ['id', 'item01', 'item02', 'item03', 'item04', 'logo', 'createdAt', 'updatedAt'],
  labels: ['Id', 'Item01', 'Item02', 'Item03', 'Item04', 'Logo', 'Creado', 'Actualizado'],
};

const fields = [
  { id: 'id', label: 'Id', type: 'text', required: false },
  { id: 'item01', label: 'Item01', type: 'text', required: false },
];

const Createfields = [
  { id: 'item01', label: 'Item01', type: 'text', required: true },
  { id: 'NavegacionItem01', label: 'Navegacion Item 01', type: 'text', required: true },
  { id: 'item02', label: 'Item02', type: 'text', required: false },
  { id: 'NavegacionItem02', label: 'Navegacion Item 02', type: 'text', required: false },
  { id: 'item03', label: 'Item03', type: 'text', required: false },
  { id: 'NavegacionItem03', label: 'Navegacion Item 03', type: 'text', required: false },
  { id: 'item04', label: 'Item04', type: 'text', required: false },
  { id: 'NavegacionItem04', label: 'Navegacion Item 04', type: 'text', required: false },
  { id: 'logo', label: 'Logo', type: 'file', required: false },
];


function HeaderGrid() {
  
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
  } = useHeaderLogic()

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
          config={articlesField}
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

export default HeaderGrid;
