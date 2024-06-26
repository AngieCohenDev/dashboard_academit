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
  const response = await axios.request(config);
  return response.data;
};

export const updateItemNewArticle = async (id, data) => {

  const { Título,NavegacionArticleTitle, Subtitulo, Descripción } = data;

  const requestData = {
    sectiontitle: Título,
    NavegacionArticleTitle:NavegacionArticleTitle, 
    articletitle: Subtitulo,
    description: Descripción
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
  const response = await axios.request(config);
  return response.data;
};

export const createItemNewArticle = async (formValues) => {

  console.log(formValues);

  const { Título,NavegacionArticleTitle, Subtitulo, Descripción } = formValues;

  console.table(formValues);

  const requestData = {
    sectiontitle: Título,
    NavegacionArticleTitle:NavegacionArticleTitle,
    articletitle: Subtitulo,
    description: Descripción
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