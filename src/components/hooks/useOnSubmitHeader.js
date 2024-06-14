import { useForm } from "react-hook-form";
import { solicitudFetch } from "../../helpers/solicitudesFetch";
import { useState } from "react";
import { Input } from "../shared/Input";


export const useOnSubmitHeader = () => {

    const { register, handleSubmit, reset, } = useForm();

    const [imageFile, setImageFile] = useState(null);

    const [inputList, setInputList] = useState([<Input key={0} number={1} register={register} />]);

    const handleFileChange = (file) => {
        setImageFile(file);
    };

    const onSubmit = handleSubmit(async (data) => {

        const formData = new FormData();
        const fields = Object.keys(data);
        //creamos un contador que empieza en cero, esto para determinar si se llamara a POST o PATCH

        // a la variable fields le aplicamos el metodo forEach para ir agregado al formData el nombre de cada 
        // dato en fields y el value que nos envian desde data
        fields.forEach(field => {
            formData.append(field, data[field]);
        });

        if (imageFile !== null) {
            console.log(imageFile);
            formData.append("logo", imageFile);
            setImageFile(null)
        }

        // Para ver cada uno de los datos enviados en el form data.
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        try {
            await solicitudFetch(formData, 'POST', 'headers');
            reset();
            setInputList([<Input key={0} number={1} register={register} />])
        } catch (error) {
            console.error("Error:", error);
        }


    });

    return {
        handleFileChange,
        onSubmit,
        register,
        inputList,
        setInputList
    }

}
