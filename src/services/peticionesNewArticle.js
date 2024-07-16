import axios from 'axios';

export const callApiNewArticle = async (page = 1, limit = 5, searchParams = {}) => {
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
  try {
    const {data} = await axios.request(config);
    console.log(data)
    return data;
  } catch (error) {
    return {
      type: 'unsucces',
      message: error.response.data.message
    }
  }
};

export const updateItemNewArticle = async (id, data) => {

  const requestData = {
    tituloSeccion: data['Título'],
    navegacionArticleTitle: data['navegación'],
    tituloArticulo: data['Subtitulo'],
    descripcion: data['Descripción']
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

export const deleteItemNewArticle = async (id) => {
  console.log(id);
  const config = {
    method: 'delete',
    url: `http://localhost:8080/new-article/${id}`,
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

export const createItemNewArticle = async (formValues) => {


  console.table(formValues);

  const requestData = {
    tituloSeccion: formValues['Título'],
    navegacionArticleTitle: formValues['navegación'],
    tituloArticulo: formValues['Subtitulo'],
    descripcion: formValues['Descripción']
  };

  console.log(requestData);


  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
    redirect: "follow"
  };

    const response = await fetch("http://localhost:8080/new-article", requestOptions);

    const data = await response.text();
    console.log(data);
    return data;
};