import ItemFormPopup from '../components/shared/FormCreation/FormCreation';
import { Table } from './shared/Table';
import { DynamicForm } from './shared/DinamicForm/DynamicForm';
import { useHeaderLogic } from './hooks/useHeaderLogic';
import { Alert } from './shared/Alerts';


const articlesField = {
  keys: ['id', 'item01', 'NavegacionItem01', 'item02', 'NavegacionItem02', 'item03', 'NavegacionItem03', 'item04', 'NavegacionItem04', 'logo', 'createdAt', 'updatedAt'],
  labels: ['Id', 'item1', 'Nav1', 'item2', 'Nav2', 'item3', 'Nav3', 'item4', 'Nav4', 'Logo', 'Creado', 'Actualizado'],
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
    alert,
    setAlert,
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
    <div className="min-h-screen bg-white flex flex-col" >
      <DynamicForm fields={fields} onSubmit={searchFormSubmit} extraButtons={extraButtons} resetForm={resetForm} />
      {alert && <Alert alert={alert} setAlert={setAlert}/>}
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
