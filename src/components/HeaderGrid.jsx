import classNames from "classnames";
import ImageUpload from "../helpers/ImageUpload";
import { useOnSubmitHeader } from "./hooks/useOnSubmitHeader";

const styleLabel = "font-medium text-sm py-1 ";
const styleInput = "w-full h-[40px] px-2 text-slate-400 text-xs my-1 rounded-lg border bg-gray-100";

function HeaderGrid() {

  //Hook personalizado para manejar las solicitudes fetch
  const { handleFileChange, onSubmit, register} = useOnSubmitHeader()

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-2/5 h-3/5 mx-4">
        <div className="mb-6">
          <h1 className="text-2xl flex items-center justify-center font-bold">Formulario header</h1>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col font-sans">
          <div className="my-2">
            {/* Primer Item */}
            <label htmlFor="items01" className={classNames(styleLabel)}>
              Items 1
            </label>
            <input
              className={classNames(styleInput)}
              type="text"
              placeholder="Por favor ingrese el nuevo valor del items"
              {...register("item01")}
            />
          </div>

          <div className="my-2">
            {/* Segundo Item */}
            <label htmlFor="items02" className={classNames(styleLabel)}>
              Items 2
            </label>
            <input
              className={classNames(styleInput)}
              type="text"
              placeholder="Por favor ingrese el nuevo valor del items"
              {...register("item02")}
            />
          </div>

          <div className="my-2">
            {/* Tercer Item */}
            <label htmlFor="items03" className={classNames(styleLabel)}>
              Items 3
            </label>
            <input
              className={classNames(styleInput)}
              type="text"
              placeholder="Por favor ingrese el nuevo valor del items"
              {...register("item03")}
            />
          </div>

          <div className="my-2">
            {/* Cuarto Item */}
            <label htmlFor="items04" className={classNames(styleLabel)}>
              Items 4
            </label>
            <input
              className={classNames(styleInput)}
              type="text"
              placeholder="Por favor ingrese el nuevo valor del items"
              {...register("item04")}
            />
          </div>
          {/* Logo */}
          <label htmlFor="file" className={classNames(styleLabel)}>
            Ingrese el logo
          </label>
          <ImageUpload onFileChange={handleFileChange} />

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

export default HeaderGrid;
