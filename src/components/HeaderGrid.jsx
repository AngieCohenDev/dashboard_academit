import { useEffect, useState } from 'react';
import { Table } from './shared/Table';
import { Input } from './shared/Input';
import { DynamicForm } from './shared/DinamicForm/DynamicForm';
import { PlusIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import ItemFormPopup from '../components/shared/FormCreation/FormCreation';
import { useOnSubmitHeader } from './hooks/useOnSubmitHeader';

const articlesField = {
  keys: ['id', 'item01', 'item02', 'item03', 'item04', 'logo', 'createdAt', 'updatedAt'],
  labels: ['Id', 'Item01', 'Item02', 'Item03', 'Item04', 'Logo', 'Creado', 'Actualizado'],
};

const fields = [
  { id: 'id', label: 'Id', type: 'text', required: false },
  { id: 'item01', label: 'Item01', type: 'text', required: false },
];

const Createfields = [
  { id: 'Item01', label: 'Item01', type: 'text', required: true },
  { id: 'Item02', label: 'Item02', type: 'text', required: true },
  { id: 'Item03', label: 'Item03', type: 'text', required: true },
  { id: 'Item04', label: 'Item04', type: 'text', required: true },
  { id: 'logo', label: 'Logo', type: 'file', required: true },
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
  console.log(id);
  const config = {
    method: 'delete',
    url: `http://localhost:8080/headers/${id}`,
  };
  const response = await axios.request(config);
  return response.data;
};

const createItem = async (formValues) => {
 
  const myHeaders = new Headers();

  const { Item01, Item02, Item03, Item04 ,logo} = formValues;
  

  console.table(formValues );
  const formdata = new FormData();
  formdata.append("item01", Item01);
  formdata.append("item02", Item02);
  formdata.append("item03", Item03);
  formdata.append("item04", Item04);
  formdata.append("logo", logo);


  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow"
  };

  const datos =await fetch("http://localhost:8080/headers", requestOptions);

  console.log(datos);
  return datos
};

function HeaderGrid() {
  const { handleFileChange, onSubmit, register, inputList, setInputList } = useOnSubmitHeader();
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  const [resetForm, setResetForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await callApi(currentPage, 5, searchParams);
        setData(response.data);
        setTotalItems(response.pagination.totalItems);
        setTotalPages(response.pagination.pageCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, searchParams]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setCurrentItem(null);
  };

  const handleFormSubmit = async (event) => {

    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      const formValues = Object.fromEntries(formData.entries());
      await createItem({ ...formValues });
      closePopup()
      setCurrentPage(1);
      const response = await callApi(currentPage, 5, searchParams);
      setData(response.data);
    } catch (error) {
      console.log('Ocurrio un error en el servidor' , error);
    }

  };

  const searchFormSubmit = async (form) => {

    console.log(form)
 
    setSearchParams(form);

    const response = await callApi(currentPage, 5, form);
    setData(response.data);

    //resetAllForms();
  };

  const handleEdit = (item) => {
    console.log('Edit item:', item);
    setCurrentItem(item);
    openPopup();
  };

  const handleDelete = async (item) => {
    console.log('Delete item:', item);
    try {
      await deleteItem(item.Id);
      const response = await callApi(currentPage, 5, searchParams);
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

  const resetAllForms = () => {
    setSearchParams({});
    setCurrentPage(1);
    setCurrentItem(null);
    setInputList([<Input key={0} number={1} register={register} />]);
    setResetForm(true); // Trigger form reset
    setTimeout(() => setResetForm(false), 0); // Reset the flag
  };

  const extraButtons = [
    {
      label: 'Crear Header',
      onClick: openPopup,
      className: 'bg-indigo-500 hover:bg-indigo-700 crear',
      icon: PlusIcon,
    },
    {
      label: 'Resetear',
      onClick: resetAllForms,
      className: 'bg-red-500 hover:bg-red-700',
      icon: PlusIcon,
    },
  ];

  const actions = [
    { label: 'Editar', onClick: handleEdit },
    { label: 'Eliminar', onClick: handleDelete },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DynamicForm fields={fields} onSubmit={searchFormSubmit} extraButtons={extraButtons} resetForm={resetForm} />

      {showPopup && (
        <ItemFormPopup
          currentItem={currentItem}
          closePopup={closePopup}
          handleFormSubmit={handleFormSubmit}
          fields={Createfields}
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
