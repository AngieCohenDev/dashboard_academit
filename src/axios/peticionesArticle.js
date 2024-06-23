import axios from 'axios';

export const callApiArticle = async (page = 1, limit = 5, searchParams = {}) => {
    const paramsSearch = Object.keys(searchParams)?.reduce((acc, key) => {
      const label = key;
      const value = searchParams[key];
      return acc + `&${label}=${value}`;
    }, '');
  
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/articulos?page=${page}&limit=${limit}${paramsSearch}`,
      headers: {
        Accept: 'application/json',
      },
    };
    const response = await axios.request(config);
    return response.data;
  };
  
export const updateItemArticle = async (id, data) => {
  
  const { Título, Descripción, Imagen} = data;
  
    const formdata = new FormData();
    formdata.append("title", Título);
    formdata.append("description", Descripción);
    formdata.append("image", Imagen);
  
    const config = {
      method: 'patch',
      url: `http://localhost:8080/articulos/${id}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formdata,
    };
    const response = await axios.request(config);
    return response.data;
  };
  
export const deleteItemArticle = async (id) => {
    console.log(id);
    const config = {
      method: 'delete',
      url: `http://localhost:8080/articulos/${id}`,
    };
    const response = await axios.request(config);
    return response.data;
  };
  
export const createItemArticle = async (formValues) => {
  
    const myArticles = new Headers();
  
    const { Título, Descripción, Imagen} = formValues;
  
    console.table(formValues )
    const formdata = new FormData();
    formdata.append("title", Título);
    formdata.append("description", Descripción);
    formdata.append("image", Imagen);
    
    const requestOptions = {
      method: "POST",
      headers: myArticles,
      body: formdata,
      redirect: "follow"
    };
  
    const datos =await fetch("http://localhost:8080/articulos", requestOptions);
  
    console.log(datos);
    return datos
  };