import { useEffect, useState } from 'react';
import { Table } from './shared/Table';
import { Input } from './shared/Input';
import { DynamicForm } from './shared/DinamicForm/DynamicForm';
import { PlusIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import ItemFormPopup from '../components/shared/FormCreation/FormCreation';
import { useOnSubmitHeader } from './hooks/useOnSubmitHeader';

const NewArticleField = {
  keys: ['id', 'sectiontitle', 'articletitle', 'description', 'createdAt', 'updatedAt'],
  labels: ['Id', 'Titulo', 'Subtitulo', 'Descripcion', 'Creado', 'Actualizado'],
};

const fields = [
  { id: 'id', label: 'Id', type: 'text', required: false },
  { id: 'title', label: 'Titulo', type: 'text', required: false },
];


const Createfields = [
  { id: 'Titulo', label: 'Titulo', type: 'text', required: true },
  { id: 'Subtitulo', label: 'Subtitulo', type: 'text', required: true },
  { id: 'Descripcion', label: 'Descripcion', type: 'text', required: true },
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
    url: `http://localhost:8080/new-article?page=${page}&limit=${limit}${paramsSearch}`,
    headers: {
      Accept: 'application/json',
    },
  };
  const response = await axios.request(config);
  return response.data;
};

const updateItem = async (id, data) => {

  const { Titulo, Subtitulo, Descripcion } = data;

  const requestData = {
    sectiontitle: Titulo,
    articletitle: Subtitulo,
    description: Descripcion
  };

  const config = {
    method: 'patch',
    url: `http://localhost:8080/new-article/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: requestData,
  };
  const response = await axios.request(config);
  return response.data;
};

const deleteItem = async (id) => {
  console.log(id);
  const config = {
    method: 'delete',
    url: `http://localhost:8080/new-article/${id}`,
  };
  const response = await axios.request(config);
  return response.data;
};

const createItem = async (formValues) => {
  
  const { Titulo, Subtitulo, Descripcion } = formValues;

  console.table(formValues);

  const requestData = {
    sectiontitle: Titulo,
    articletitle: Subtitulo,
    description: Descripcion
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),  // Convertir requestData a JSON string
    redirect: "follow"
  };

  try {
    const response = await fetch("http://localhost:8080/new-article", requestOptions);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default function NewArticleForm() {
  const { handleFileChange, onSubmit, register, inputList, setInputList } = useOnSubmitHeader();
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  const [resetForm, setResetForm] = useState(false);
  const [formAction, setFormAction] = useState(true)

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
      (formAction ? await createItem({ ...formValues }) : await updateItem(currentItem.Id, { ...formValues }))
      closePopup()
      setCurrentPage(1);
      const response = await callApi(currentPage, 5, searchParams);
      setData(response.data);
    } catch (error) {
      console.log('Ocurrio un error en el servidor', error);
    }

  };

  const searchFormSubmit = async (form) => {

    console.log(form)

    setSearchParams(form);

    const response = await callApi(currentPage, 5, form);
    setData(response.data);

    //resetAllForms();
  };

  const handleCreate = () => {
    setFormAction(true)
    openPopup();
  };

  const handleEdit = (item) => {
    console.log('Edit item:', item);
    setCurrentItem(item);
    setFormAction(false)
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
      label: 'Crear New Article',
      onClick: handleCreate,
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
