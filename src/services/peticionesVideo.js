import axios from 'axios';

export const callApiCursos = async(page = 1, limit = 5, searchParams = {}) => {
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

export const callApiOneCurso = async(idCurso) => {

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:8080/cursos/${idCurso}`,
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

export const updateCurso = async (idCurso, formValues) => {

  console.log(idCurso, formValues);

  const myCursos = new Headers();

  const formData = new FormData();

  // Añadir los valores del formulario directamente
  formData.append("nombreCurso", formValues['nombreCurso']);
  formData.append("descripcionCurso", formValues['descripcionCurso']);
  formData.append("estatus", formValues['estatus']);
  formData.append("nivel", formValues['nivel']);
  formData.append("fotografiaDelCurso", formValues['rutaFotografiaCurso']);
  formData.append("categoria", formValues['categoria']);

  // Procesar los videos
  formValues.videos.forEach((video, idx) => {
    for (let key in video) {
      if (typeof video[key] === 'object' && video[key] !== null && !(video[key] instanceof File)) {
        for (let subKey in video[key]) {
          formData.append(`videos[${idx}][${subKey}]`, video[key][subKey]);
        }
      } else {
        if (key === 'rutaMiniatura') {
          formData.append(`videos[${idx}][archivoMiniatura]`, video[key]);
        } else if (key === 'rutaVideo') {
          formData.append(`videos[${idx}][archivoVideo]`, video[key]);
        } else {
          formData.append(`videos[${idx}][${key}]`, video[key]);
        }
      }
    }
  });

  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  const requestOptions = {
    method: "PATCH",
    headers: myCursos,
    body: formData,
    redirect: "follow"
  };

  const datos = await fetch(`http://localhost:8080/cursos/${idCurso}`, requestOptions);

  console.log(datos);
};

export const addVideoToCurso = async (formValues) => {

  const myCursos = new Headers();

  const formData = new FormData();
  // Añadir los valores del formulario directamente
  formData.append("tituloVideo", formValues['tituloVideo']);
  formData.append("clase", formValues['clase']);
  formData.append("archivoVideo", formValues['archivoVideo']);
  formData.append("estatus", formValues['estatus']);
  formData.append("descripcion", formValues['descripcion']);
  formData.append("archivoMiniatura", formValues['archivoMiniatura']);
  formData.append("idCurso", formValues['idCurso']);

  // Procesar los videos
  formValues.materiales?.forEach((material, idx) => {
    for (let key in material) {
      formData.append(`materiales[${idx}][${key}]`, material[key]);
    }
  });

  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  const requestOptions = {
    method: "POST",
    headers: myCursos,
    body: formData,
    redirect: "follow"
  };

  const datos = await fetch(`http://localhost:8080/videos`, requestOptions);

  console.log(datos);
};

export const deleteCursos = async (id) => {
  console.log(id);
  const config = {
    method: 'delete',
    url: `http://localhost:8080/cursos/${id}`,
  };
  const response = await axios.request(config);
  return response.data;
};

export const createItemVideos = async (formValues) => {
  console.log(formValues);

  const myCursos = new Headers();
  const formData = new FormData();
  formData.append("nombreCurso", formValues['nombreCurso']);
  formData.append("descripcionCurso", formValues['descripcionCurso']);
  formData.append("estatus", formValues['estatus']);
  formData.append("nivel", formValues['nivel']);
  formData.append("fotografiaDelCurso", formValues['fotografiaDelCurso']);
  formData.append("categoria", formValues['categoria']);
  formValues.videos.forEach((video, idx) => {
    for (let key in video) {
      if (typeof video[key] === 'object' && video[key] !== null && !(video[key] instanceof File)) {
        for (let subKey in video[key]) {
          formData.append(`videos[${idx}][${subKey}]`, video[key][subKey]);
        }
      } else {
        formData.append(`videos[${idx}][${key}]`, video[key]);
      }
    }
  });

  formData.forEach((value, key) => {
    console.log(key, value);
  });

  const requestOptions = {
    method: "POST",
    headers: myCursos,
    body: formData,
    redirect: "follow"
  };

  const datos = await fetch("http://localhost:8080/cursos", requestOptions);
  console.log(datos);
}