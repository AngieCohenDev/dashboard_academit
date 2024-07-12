import axios from 'axios';

export const callApiVideos = async (page = 1, limit = 5, searchParams = {}) => {
  const paramsSearch = Object.keys(searchParams)?.reduce((acc, key) => {
    const label = key;
    const value = searchParams[key];
    return acc + `&${label}=${value}`;
  }, '');

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:8080/cursos?page=${page}&limit=${limit}${paramsSearch}`,
    headers: {
      Accept: 'application/json',
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    return {
      type: 'unsucces',
      message: error.response.data.message
    }
  }
};

export const updateItemVideos = async (id, data) => {

  const formdata = new FormData();
  formdata.append("tituloVideo", data['Título']);
  formdata.append("descripcion", data['Descripción']);
  formdata.append("estatus", data['Estatus']);
  formdata.append("clase", data['Clase']);
  formdata.append("archivoMiniatura", data['Miniatura']);
  formdata.append("materiales", data['Materiales']);
  formdata.append("archivoVideo", data['Video']);
  const config = {
    method: 'patch',
    url: `http://localhost:8080/cursos/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formdata,
  };
  const response = await axios.request(config);
  return response.data;
};

export const deleteItemVideos = async (id) => {
  console.log(id);
  const config = {
    method: 'delete',
    url: `http://localhost:8080/cursos/${id}`,
  };
  const response = await axios.request(config);
  return response.data;
};

export const createItemVideos = async (formValues) => {

  console.log(formValues);

  const myVideos = new Headers();

  console.table(formValues);
  const formdata = new FormData();
  formdata.append("tituloVideo", formValues['Título']);
  formdata.append("descripcion", formValues['Descripción']);
  formdata.append("estatus", formValues['Estatus']);
  formdata.append("clase", formValues['Clase']);
  formdata.append("archivoMiniatura", formValues['Miniatura']);
  formdata.append("materiales", formValues['Materiales']);
  formdata.append("archivoVideo", formValues['Video']);

  const requestOptions = {
    method: "POST",
    headers: myVideos,
    body: formdata,
    redirect: "follow"
  };

  const datos = await fetch("http://localhost:8080/cursos", requestOptions);

  console.log(datos);
  return datos
};