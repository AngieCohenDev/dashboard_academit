import axios from 'axios';

export const callApiHeaders = async (page = 1, limit = 5, searchParams = {}) => {
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

export const updateItemHeaders = async (id, data) => {

    const { Item01, Item02, Item03, Item04 ,logo} = data;
  
    const formdata = new FormData();
    formdata.append("item01", Item01);
    formdata.append("item02", Item02);
    formdata.append("item03", Item03);
    formdata.append("item04", Item04);
    formdata.append("logo", logo);
  
    const config = {
      method: 'patch',
      url: `http://localhost:8080/headers/${id}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formdata,
    };
    const response = await axios.request(config);
    return response.data;
  };
  
export const deleteItemHeaders = async (id) => {
    console.log(id);
    const config = {
      method: 'delete',
      url: `http://localhost:8080/headers/${id}`,
    };
    const response = await axios.request(config);
    return response.data;
  };
  
export const createItemHeaders = async (formValues) => {
   
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