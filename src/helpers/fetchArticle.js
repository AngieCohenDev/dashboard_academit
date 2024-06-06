// postRequest.js

// Función para realizar una solicitud POST a un endpoint usando fetch
export const postArticle = async ({ title, description }) => {
    // Cuerpo de la solicitud POST
    const requestBody = {
        title,
        description
    };
    try {

        // Realiza la solicitud POST al endpoint especificado
        const response = await fetch('http://localhost:8080/articles/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
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
