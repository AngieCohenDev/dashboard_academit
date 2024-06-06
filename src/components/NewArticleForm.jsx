import classNames from "classnames";
import { useForm } from "react-hook-form";
import { postNewArticle } from "../helpers/fetchNewArticle";

const styleLabel = "text-red-500 py-1";
const styleInput =
  "rounded-md w-[500px] h-[40px] px-5 text-slate-400 text-sm italic my-1";

export default function NewArticleForm() {
  const { register, handleSubmit, reset, } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    postNewArticle(data);
    reset();
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col font-sans">
      {/* Título de la sección */}
      <label htmlFor="title_seccion" className={classNames(styleLabel)}>
        Ingrese el título de la sección
      </label>
      <input
        className={classNames(styleInput)}
        type="text"
        placeholder="Por favor ingrese el nuevo título de la sección"
        {...register("sectiontitle")}
      />

      {/* Título del artículo */}
      <label htmlFor="title_article" className={classNames(styleLabel)}>
        Ingrese el título del artículo
      </label>
      <input
        className={classNames(styleInput)}
        type="text"
        placeholder="Por favor ingrese el nuevo título del artículo"
        {...register("articletitle")}
      />

      {/* Descripcion */}
      <label htmlFor="descripcion" className={classNames(styleLabel)}>
        Ingrese la descripción
      </label>
      <input
        className={classNames(styleInput)}
        type="text"
        placeholder="Por favor ingrese la descripción del artículo"
        {...register("description")}
      />

      <button type="submit">Enviar</button>


    </form>
  );
}
