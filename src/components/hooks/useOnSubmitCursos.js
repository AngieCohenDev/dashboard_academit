import { useForm } from "react-hook-form";
import { solicitudFetch } from "../../helpers/solicitudesFetch";
import { useState } from "react";

export const useOnSubmitCursos = () => {
    const { register, handleSubmit, reset, } = useForm();
    const [videoFile, setVideoFile] = useState(null);

  const handleFileChange = (file) => {
    setVideoFile(file);
  };

    const onSubmit = handleSubmit(async (data) => {
        const formData = new FormData();
        //creamos una variabe "fields" en donde pondremos el nombre de cada uno de los inputs
        const fields = ['title', 'description'];
        //creamos un contador que empieza en cero, esto para determinar si se llamara a POST o PATCH
        let itemCount = 0;

        //a la variable fields le aplicamos el metodo forEach para ir agregado al formData el nombre de cada 
        //dato en fields y el value que nos envian desde data
        fields.forEach(field => {
            if (data[field] !== "") {
                formData.append(field, data[field]);
                itemCount++;
            }
        });

        if (videoFile !== null) {
            formData.append("video", videoFile);
            itemCount++;
            setVideoFile(null)
        }

        if (itemCount === 3) {
            try {
                await solicitudFetch(formData, 'POST', 'cursos');
                reset();
                return;
            } catch (error) {
                console.error("Error:", error);
            }
            reset();
        } else {
            try {
                const { id } = await solicitudFetch(undefined, 'GET','cursos');
                await solicitudFetch(formData, 'PATCH','cursos', id);
                reset();
                return;
            } catch (error) {
                console.error("Error:", error);
            }
            reset();
        }
    });

    return {
        handleFileChange,
        onSubmit,
        register
    }

}
