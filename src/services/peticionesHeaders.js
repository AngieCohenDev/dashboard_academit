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

  const formdata = new FormData();
  formdata.append("item01", data['item1']);
  formdata.append("item02", data['item2']);
  formdata.append("item03", data['item3']);
  formdata.append("item04", data['item4']);
  formdata.append("navegacionItem01", data['Nav1']);
  formdata.append("navegacionItem02", data['Nav2']);
  formdata.append("navegacionItem03", data['Nav3']);
  formdata.append("navegacionItem04", data['Nav4']);
  formdata.append("archivoLogo", data['logo']);
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

  console.table(formValues);
  const formdata = new FormData();
  formdata.append("item01", formValues['item1']);
  formdata.append("item02", formValues['item2']);
  formdata.append("item03", formValues['item3']);
  formdata.append("item04", formValues['item4']);
  formdata.append("navegacionItem01", formValues['Nav1']);
  formdata.append("navegacionItem02", formValues['Nav2']);
  formdata.append("navegacionItem03", formValues['Nav3']);
  formdata.append("navegacionItem04", formValues['Nav4']);
  formdata.append("archivoLogo", formValues['logo']);

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