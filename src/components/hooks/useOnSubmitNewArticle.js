import { useForm } from "react-hook-form";
import { solicitudFetch } from "../../helpers/solicitudesFetch";

export const useOnSubmitNewArticle = () => {

    const { register, handleSubmit, reset, } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        // Primero convertimos el objeto en un array de [key, value] pares
        const bodyArray = Object.entries({ ...data });
        // Filtramos los pares donde el valor no es una cadena vacía
        const filteredBodyArray = bodyArray.filter(([key, value]) => value !== "");
        // Convertimos el array filtrado de nuevo a un objeto
        const bodyToRequest = Object.fromEntries(filteredBodyArray);


        if (filteredBodyArray.length === 3) {
            try {
                await solicitudFetch(bodyToRequest, 'POST', 'new-article');
                reset();
                return;
            } catch (error) {
                console.error("Error:", error);
            }
            reset();
        } else {
            try {
                if (data['sectiontitle'] === "" && data['articletitle'] !== "" && data['description'] !== "") {
                    const { sectiontitle } = await solicitudFetch(undefined, 'GET', 'new-article');
                    bodyToRequest.sectiontitle = sectiontitle;
                    await solicitudFetch(bodyToRequest, 'POST', 'new-article');
                    reset();
                    return;
                }
                const { id } = await solicitudFetch(undefined, 'GET', 'new-article');
                await solicitudFetch(bodyToRequest, 'PATCH', 'new-article', id);
                reset();
                return;
            } catch (error) {
                console.error("Error:", error);
            }
            reset();
        }
    });

    return {
        onSubmit,
        register
    }
}
