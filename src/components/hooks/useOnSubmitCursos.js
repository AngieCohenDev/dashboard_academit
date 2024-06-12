import { useForm } from "react-hook-form";
import { solicitudFetch } from "../../helpers/solicitudesFetch";
import { useState } from "react";

export const useOnSubmitCursos = () => {
    const { register, handleSubmit, reset, } = useForm();
    const [videoFile, setVideoFile] = useState(null);
    const [alert, setAlert] = useState(null);

    const handleFileChange = (file) => {
        setVideoFile(file);
    };

    const onSubmit = handleSubmit(async (data) => {
        const formData = new FormData();
        const fields = ['title', 'description'];
        let itemCount = 0;

        fields.forEach(field => {
            if (data[field] !== "") {
                formData.append(field, data[field]);
                itemCount++;
            }
        });

        if (videoFile !== null) {
            formData.append("video", videoFile);
            itemCount++;
            setVideoFile(null);
        }

        try {
            if (itemCount === 3) {
                await solicitudFetch(formData, 'POST', 'cursos');
                setAlert({ type: 'success', message: 'Curso creado exitosamente.' });
                reset();
            } else {
                const { id } = await solicitudFetch(undefined, 'GET', 'cursos');
                await solicitudFetch(formData, 'PATCH', 'cursos', id);
                setAlert({ type: 'success', message: 'Curso actualizado exitosamente.' });
                reset();
            }
        } catch (error) {
            console.error("Error:", error);
            setAlert({ type: 'error', message: 'Ocurrió un error. Por favor, inténtelo de nuevo.' });
        } finally {
            reset();
        }
    });

    return {
        handleFileChange,
        onSubmit,
        register,
        alert,
        setAlert
    };
};
