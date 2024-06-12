// src/components/VideoUpload.jsx

import React, { useState } from 'react';

const VideoUpload = ({ onFileChange , required}) => {
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith('video/')) {
                setError(null);
                onFileChange(file);
            } else {
                setError('Por favor, sube solamente archivos de video.');
                event.target.value = null; // Resetea el input para que no se cargue el archivo no válido
            }
        }
    };

    return (
        <div>
            <input type="file" accept="video/*" onChange={handleFileChange} required={required} />
            {error && <p style={{ color: 'red', fontSize:'12px', margin:'5px' }}>{error}</p>}
        </div>
    );
};

export default VideoUpload;
