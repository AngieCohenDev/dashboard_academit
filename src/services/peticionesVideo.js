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

export const updateCurso = async (id, cursoData) => {
  const formdata = new FormData();
  formdata.append('nombreCurso', cursoData.nombreCurso);
  formdata.append('estatus', cursoData.estatus);
  formdata.append('categoria', cursoData.categoria);
  formdata.append('nivel', cursoData.nivel);
  formdata.append('descripcionCurso', cursoData.descripcionCurso);
  formdata.append('fotografiaDelCurso', cursoData.fotografiaDelCurso);

  if (cursoData.videos) {
    cursoData.videos.forEach((video, index) => {
      formdata.append(`videos[${index}].tituloVideo`, video.tituloVideo);
      formdata.append(`videos[${index}].archivoVideo`, video.archivoVideo);
      formdata.append(`videos[${index}].estatus`, video.estatus);
      formdata.append(`videos[${index}].clase`, video.clase);
      formdata.append(`videos[${index}].descripcion`, video.descripcion);
      formdata.append(`videos[${index}].archivoMiniatura`, video.archivoMiniatura);
      if (video.materiales) {
        video.materiales.forEach((material, mIndex) => {
          formdata.append(`videos[${index}].materiales[${mIndex}].nombre`, material.nombre);
          formdata.append(`videos[${index}].materiales[${mIndex}].descripcionMaterial`, material.descripcionMaterial);
          formdata.append(`videos[${index}].materiales[${mIndex}].estatus`, material.estatus);
          formdata.append(`videos[${index}].materiales[${mIndex}].archivoMaterial`, material.archivoMaterial);
        });
      }
    });
  }

  const config = {
    method: 'patch',
    url: `http://localhost:8080/cursos/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formdata,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    return {
      type: 'unsuccess',
      message: error.response.data.message,
    };
  }
};

// Función para crear un curso
export const createCurso = async (cursoData) => {
  const formdata = new FormData();
  formdata.append('nombreCurso', cursoData.nombreCurso);
  formdata.append('estatus', cursoData.estatus);
  formdata.append('categoria', cursoData.categoria);
  formdata.append('nivel', cursoData.nivel);
  formdata.append('descripcionCurso', cursoData.descripcionCurso);
  formdata.append('fotografiaDelCurso', cursoData.fotografiaDelCurso);

  if (cursoData.videos) {
    cursoData.videos.forEach((video, index) => {
      formdata.append(`videos[${index}].tituloVideo`, video.tituloVideo);
      formdata.append(`videos[${index}].archivoVideo`, video.archivoVideo);
      formdata.append(`videos[${index}].estatus`, video.estatus);
      formdata.append(`videos[${index}].clase`, video.clase);
      formdata.append(`videos[${index}].descripcion`, video.descripcion);
      formdata.append(`videos[${index}].archivoMiniatura`, video.archivoMiniatura);
      if (video.materiales) {
        video.materiales.forEach((material, mIndex) => {
          formdata.append(`videos[${index}].materiales[${mIndex}].nombre`, material.nombre);
          formdata.append(`videos[${index}].materiales[${mIndex}].descripcionMaterial`, material.descripcionMaterial);
          formdata.append(`videos[${index}].materiales[${mIndex}].estatus`, material.estatus);
          formdata.append(`videos[${index}].materiales[${mIndex}].archivoMaterial`, material.archivoMaterial);
        });
      }
    });
  }

  const config = {
    method: 'post',
    url: 'http://localhost:8080/cursos',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formdata,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    return {
      type: 'unsuccess',
      message: error.response.data.message,
    };
  }
};

export const deleteCurso = async (id) => {
  const config = {
    method: 'delete',
    url: `http://localhost:8080/cursos/${id}`,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    return {
      type: 'unsuccess',
      message: error.response.data.message,
    };
  }
};