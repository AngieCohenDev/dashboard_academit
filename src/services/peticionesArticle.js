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
    try {
      const response = await axios.request(config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return {
        type: 'unsucces',
        message: error.response.data.message
      }
    }
  };
  
export const updateItemArticle = async (id, data) => {
  
    const formdata = new FormData();
    formdata.append("titulo", data['Título']);
    formdata.append("navegacionTitulo", data['Navegación']);
    formdata.append("descripcion", data['Descripción']);
    formdata.append("archivoImagen", data['Imagen']);
    
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

    console.log(formValues)
  
    console.table(formValues )
    const formdata = new FormData();
    formdata.append("titulo", formValues['Título']);
    formdata.append("navegacionTitulo", formValues['Navegación']);
    formdata.append("descripcion", formValues['Descripción']);
    formdata.append("archivoImagen", formValues['Imagen']);
    
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