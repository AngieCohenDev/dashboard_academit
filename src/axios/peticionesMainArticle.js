import axios from 'axios';

export const callApiMainArticle = async (page = 1, limit = 5, searchParams = {}) => {
    const paramsSearch = Object.keys(searchParams)?.reduce((acc, key) => {
      const label = key;
      const value = searchParams[key];
      return acc + `&${label}=${value}`;
    }, '');
  
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/main-article?page=${page}&limit=${limit}${paramsSearch}`,
      headers: {
        Accept: 'application/json',
      },
    };
    const response = await axios.request(config);
    return response.data;
  };
  
 export const updateItemMainArticle = async (id, data) => {
  
    const { Titulo, Descripcion,Boton, Imagen} = data;
  
    const formdata = new FormData();
    formdata.append("title", Titulo);
    formdata.append("description", Descripcion);
    formdata.append("textButton", Boton);
    formdata.append("image", Imagen);
  
    const config = {
      method: 'patch',
      url: `http://localhost:8080/main-article/${id}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formdata,
    };
    const response = await axios.request(config);
    return response.data;
  };
  
 export const deleteItemMainArticle = async (id) => {
    console.log(id);
    const config = {
      method: 'delete',
      url: `http://localhost:8080/main-article/${id}`,
    };
    const response = await axios.request(config);
    return response.data;
  };
  
 export const createItemMainArticle = async (formValues) => {
  
    const myMainArticles = new Headers();
  
    const { Titulo, Descripcion,Boton, Imagen} = formValues;
  
    console.table(formValues );
    const formdata = new FormData();
    formdata.append("title", Titulo);
    formdata.append("description", Descripcion);
    formdata.append("textButton", Boton);
    formdata.append("image", Imagen);
    
    const requestOptions = {
      method: "POST",
      headers: myMainArticles,
      body: formdata,
      redirect: "follow"
    };
  
    const datos =await fetch("http://localhost:8080/main-article", requestOptions);
  
    console.log(datos);
    return datos
  };