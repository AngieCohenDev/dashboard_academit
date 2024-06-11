import { useForm } from "react-hook-form";
import { solicitudFetch } from "../../helpers/solicitudesFetch";
import { useState } from "react";

export const useOnSubmitHeader = () => {

    const { register, handleSubmit, reset, } = useForm();

    const [imageFile, setImageFile] = useState(null);

    const handleFileChange = (file) => {
        setImageFile(file);
    };

    const onSubmit = handleSubmit(async (data) => {
        const formData = new FormData();
        //creamos una variabe "fields" en donde pondremos el nombre de cada uno de los inputs
        const fields = ['item01', 'item02', 'item03', 'item04'];
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

        if (imageFile !== null) {
            formData.append("logo", imageFile);
            itemCount++;
            setImageFile(null)
        }

        //Para ver cada uno de los datos enviados en el form data.
        // for (let pair of formData.entries()) {
        //   console.log(`${pair[0]}: ${pair[1]}`);
        // }

        if (itemCount === 5) {
            try {
                await solicitudFetch(formData, 'POST', 'headers');
                reset();
                return;
            } catch (error) {
                console.error("Error:", error);
            }
            reset();
        } else {
            try {
                const { id } = await solicitudFetch(undefined, 'GET', 'headers');
                await solicitudFetch(formData, 'PATCH', 'headers', id);
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
