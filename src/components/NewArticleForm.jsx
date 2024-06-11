import classNames from "classnames";
import { useOnSubmitNewArticle } from "./hooks/useOnSubmitNewArticle";

const styleLabel = "font-medium text-sm py-1 ";
const styleInput = "w-full h-[40px] px-2 text-slate-400 text-xs my-1 rounded-lg border bg-gray-100";

export default function NewArticleForm() {

  const { onSubmit, register } = useOnSubmitNewArticle()

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-2/5 h-3/5 mx-4">
        <div className="mb-6">
          <h1 className="text-2xl flex items-center justify-center font-bold">Formulario new article</h1>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col font-sans">

          {/* Título de la sección */}
          <div className="my-2">
            <label htmlFor="title_seccion" className={classNames(styleLabel)}>
              Ingrese el título de la sección
            </label>
            <input
              className={classNames(styleInput)}
              type="text"
              placeholder="Por favor ingrese el título de la sección"
              {...register("sectiontitle")}
            />
          </div>

          {/* Título del artículo */}
          <div className="my-2">
            <label htmlFor="title_article" className={classNames(styleLabel)}>
              Ingrese el título del artículo
            </label>
            <input
              className={classNames(styleInput)}
              type="text"
              placeholder="Por favor ingrese el título del artículo"
              {...register("articletitle")}
            />
          </div>

          {/* Descripcion */}
          <div className="my-2">
            <label htmlFor="descripcion" className={classNames(styleLabel)}>
              Ingrese la descripción
            </label>
            <input
              className={classNames(styleInput)}
              type="text"
              placeholder="Por favor ingrese la descripción"
              {...register("description")}
            />
          </div>

          <button
            type="submit"
            className="self-center mt-6 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
