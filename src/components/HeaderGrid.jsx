import classNames from 'classnames';
import ImageUpload from '../helpers/ImageUpload';
import { useOnSubmitHeader } from './hooks/useOnSubmitHeader';
import { useEffect, useState } from 'react';
import { Table } from './shared/Table';
import { Input } from './shared/Input';
import { DynamicForm } from './shared/DinamicForm/DynamicForm';
import { PlusIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { solicitudFetch } from '../helpers/solicitudesFetch'; // Asegúrate de que esta ruta es correcta

const articlesField = {
  keys: ['id', 'item01', 'item02', 'item03', 'item04', 'logo', 'createdAt', 'updatedAt'],
  labels: ['Id', 'Item01', 'Item02', 'Item03', 'Item04', 'Logo', 'Creado', 'Actualizado'],
};

const fields = [
  { id: 'id', label: 'Id', type: 'text', required: false },
];

const callApi = async (page = 1, limit = 5, searchParams = {}) => {
  const paramsSearch = Object.keys(searchParams)?.reduce((acc, key) => {
    const label = key;
    const value = searchParams[key];
    return acc + `&${label}=${value}`;
  }, '');

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:8080/headers?page=${page}&limit=${limit}${paramsSearch}`,
    headers: {
      Accept: 'application/json',
    },
  };
  const response = await axios.request(config);
  return response.data;
};

const updateItem = async (id, data) => {
  const config = {
    method: 'patch',
    url: `http://localhost:8080/headers/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  };
  const response = await axios.request(config);
  return response.data;
};

const deleteItem = async (id) => {
  const config = {
    method: 'delete',
    url: `http://localhost:8080/headers/${id}`,
  };
  const response = await axios.request(config);
  return response.data;
};

function HeaderGrid() {
  const { handleFileChange, onSubmit, register, inputList, setInputList, resetForm } = useOnSubmitHeader();
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await callApi(currentPage);
        setData(response.data);
        setTotalItems(response.pagination.totalItems);
        setTotalPages(response.pagination.pageCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setCurrentItem(null);
    resetForm();
  };

  const addItem = () => {
    setInputList([
      ...inputList,
      <Input key={inputList.length} number={inputList.length + 1} register={register} />,
    ]);
  };

  const removeItem = () => {
    if (inputList.length > 1) {
      setInputList(inputList.slice(0, -1));
    }
  };

  const handleFormSubmit = async (formData) => {
    console.log('Form data submitted:', formData);
    console.log('Entrando aca:', formData);
    try {

      await solicitudFetch(formData, 'POST', 'headers'); // Lógica para crear un nuevo item
      const response = await callApi(1, 5);
      setData(response.data);
      setTotalItems(response.pagination.totalItems);
      setTotalPages(response.pagination.pageCount);
      setCurrentPage(1);
      //callApi
      // if (currentItem) {
      //   await updateItem(currentItem.id, formData);
      // } else {
      //   await solicitudFetch(formData, 'POST', 'headers'); // Lógica para crear un nuevo item
      // }
  
    } catch (error) {
      console.error('Error updating data:', error);
    }
    closePopup();
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setInputList(fields.map((field, index) => (
      <Input
        key={index}
        number={index + 1}
        register={register}
        defaultValue={item[field.id]}
        name={field.id}
      />
    )));
    openPopup();
  };

  const handleDelete = async (item) => {
    console.log('Delete item:', item);
    try {
      await deleteItem(item.id);
      const response = await callApi(currentPage);
      setData(response.data);
      setTotalItems(response.pagination.totalItems);
      setTotalPages(response.pagination.pageCount);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const extraButtons = [
    {
      label: 'Abrir Formulario',
      onClick: openPopup,
      className: 'bg-indigo-500 hover:bg-indigo-700',
      icon: PlusIcon,
    },
  ];

  const actions = [
    { label: 'Editar', onClick: handleEdit },
    { label: 'Eliminar', onClick: handleDelete },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DynamicForm fields={fields} onSubmit={handleFormSubmit} extraButtons={extraButtons} />

      {showPopup && (
        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-75">
          <div className="bg-white shadow-md rounded-lg p-8 w-2/3">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">{currentItem ? 'Editar Item' : 'Formulario de Items'}</h1>
              <button onClick={closePopup} className="text-gray-600 hover:text-gray-700 focus:outline-none">
                X
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="flex flex-col font-sans">
              {inputList}
              <div className="my-2">
                <label htmlFor="file" className={classNames('font-medium text-sm py-1')}>
                  Ingrese el logo
                </label>
                <ImageUpload onFileChange={handleFileChange} />
              </div>
              <div className="mt-8">
                <div className="flex flex-col items-end space-y-4">
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={removeItem}
                      className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                      Remover Item
                    </button>
                    <button
                      type="button"
                      onClick={addItem}
                      className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                      Agregar Item
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
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
