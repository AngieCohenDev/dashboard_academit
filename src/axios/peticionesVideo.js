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
    const response = await axios.request(config);
    return response.data;
  };
  
 export const updateItemVideos = async (id, data) => {
  
    const { Titulo, Descripcion,Video} = data;
  
    const formdata = new FormData();
    formdata.append("title", Titulo);
    formdata.append("description", Descripcion);
    formdata.append("video", Video);
  
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
  
    const myVideos = new Headers();
  
    const { Titulo, Descripcion, Video} = formValues;
  
    console.table(formValues );
    const formdata = new FormData();
    formdata.append("title", Titulo);
    formdata.append("description", Descripcion);
    formdata.append("video", Video);
    
    const requestOptions = {
      method: "POST",
      headers: myVideos,
      body: formdata,
      redirect: "follow"
    };
  
    const datos =await fetch("http://localhost:8080/cursos", requestOptions);
  
    console.log(datos);
    return datos
  };