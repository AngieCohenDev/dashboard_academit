import { useForm } from "react-hook-form";
import { solicitudPost, solicitudPatch, solicitudGet } from "../../helpers/solicitudesFetch";
import { useState } from "react";

export const useOnSubmitArticle = () => {

    const { register, handleSubmit, reset, } = useForm();

    const [imageFile, setImageFile] = useState(null);
    
    const handleFileChange = (file) => {
        setImageFile(file);
    };

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
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

        if (imageFile !== null) {
            formData.append("image", imageFile);
            itemCount++;
            setImageFile(null)
        }

        //Para ver cada uno de los datos enviados en el form data.
        // for (let pair of formData.entries()) {
        //   console.log(`${pair[0]}: ${pair[1]}`);
        // }

        if (itemCount === 3) {
            try {
                await solicitudPost(formData, 'articulos');
                reset();
                return;
            } catch (error) {
                console.error("Error:", error);
            }
            reset();
        } else {
            try {
                const { id } = await solicitudGet('articulos');
                await solicitudPatch(formData, 'articulos',id);
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
