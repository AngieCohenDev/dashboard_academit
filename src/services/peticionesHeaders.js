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

  const { item01, item02, item03, item04, logo, NavegacionItem01, NavegacionItem02, NavegacionItem03, NavegacionItem04 } = data;

  const formdata = new FormData();
  formdata.append("item01", item01);
  formdata.append("item02", item02);
  formdata.append("item03", item03);
  formdata.append("item04", item04);
  formdata.append("NavegacionItem01", NavegacionItem01);
  formdata.append("NavegacionItem02", NavegacionItem02);
  formdata.append("NavegacionItem03", NavegacionItem03);
  formdata.append("NavegacionItem04", NavegacionItem04);
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

  const { item01, item02, item03, item04, logo, NavegacionItem01, NavegacionItem02, NavegacionItem03, NavegacionItem04 } = formValues;


  console.table(formValues);
  const formdata = new FormData();
  formdata.append("item01", item01);
  formdata.append("item02", item02);
  formdata.append("item03", item03);
  formdata.append("item04", item04);
  formdata.append("NavegacionItem01", NavegacionItem01);
  formdata.append("NavegacionItem02", NavegacionItem02);
  formdata.append("NavegacionItem03", NavegacionItem03);
  formdata.append("NavegacionItem04", NavegacionItem04);
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