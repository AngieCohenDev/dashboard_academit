// postRequest.js

// Función para realizar una solicitud POST a un endpoint usando fetch
export const solicitudPost = async (formData, param) => {
    try {

        // Realiza la solicitud POST al endpoint especificado
        const response = await fetch(`http://localhost:8080/${param}`, {
            method: 'POST',
            body: formData
        });

        // Verifica si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        // Analiza la respuesta como JSON
        const data = await response.json();

        // Muestra los datos en la consola
        console.log('Datos recibidos:', data);
    } catch (error) {
        // Manejo de errores
        console.error('Error al realizar la solicitud:', error);
    }
}

export const solicitudPatch = async (formData , param,id) => {
    try {

        // Realiza la solicitud PATCH al endpoint especificado
        const response = await fetch(`http://localhost:8080/${param}/${id}`, {
            method: 'PATCH',
            body: formData
        });

        // Verifica si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        // Analiza la respuesta como JSON
        const data = await response.json();

        // Muestra los datos en la consola
        console.log('Datos recibidos:', data);
    } catch (error) {
        // Manejo de errores
        console.error('Error al realizar la solicitud:', error);
    }
}

export const solicitudGet = async (param) => {
    try {
        // Realiza la solicitud POST al endpoint especificado
        const response = await fetch(`http://localhost:8080/${param}`);

        // Verifica si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        // Analiza la respuesta como JSON
        const data = await response.json();

        // Muestra los datos en la consola
        console.log('Datos recibidos:', data);
        return data[0];
    } catch (error) {
        // Manejo de errores
        console.error('Error al realizar la solicitud:', error);
    }
}