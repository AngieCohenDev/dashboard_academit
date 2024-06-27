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

export const updateItemHeaders = async (id, data) => {

  const { item1, item2, item3, item4, logo, Nav1, Nav2, Nav3, Nav4 } = data;

  const formdata = new FormData();
  formdata.append("item01", item1);
  formdata.append("item02", item2);
  formdata.append("item03", item3);
  formdata.append("item04", item4);
  formdata.append("NavegacionItem01", Nav1);
  formdata.append("NavegacionItem02", Nav2);
  formdata.append("NavegacionItem03", Nav3);
  formdata.append("NavegacionItem04", Nav4);
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

  console.log(formValues);

  const { item1, item2, item3, item4, logo, Nav1, Nav2, Nav3, Nav4 } = formValues;


  console.table(formValues);
  const formdata = new FormData();
  formdata.append("item01", item1);
  formdata.append("item02", item2);
  formdata.append("item03", item3);
  formdata.append("item04", item4);
  formdata.append("NavegacionItem01", Nav1);
  formdata.append("NavegacionItem02", Nav2);
  formdata.append("NavegacionItem03", Nav3);
  formdata.append("NavegacionItem04", Nav4);
  formdata.append("logo", logo);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow"
  };

  const datos = await fetch("http://localhost:8080/headers", requestOptions);

  console.log(datos);
  return datos
};