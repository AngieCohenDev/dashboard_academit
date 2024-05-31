import classNames from "classnames";
import { useForm } from "react-hook-form";

const styleLabel = "text-red-500 py-1";
const styleInput =
  "rounded-md w-[500px] h-[40px] px-5 text-slate-400 text-sm italic my-1";

export default function MainArticleForm() {
  const { register, handleSubmit, reset, watch } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    alert("¡Los cambios se hicieron exitosamente!");
    reset();
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col font-sans">
      {/* Titulo */}
      <label htmlFor="title" className={classNames(styleLabel)}>
        Ingrese el titulo
      </label>
      <input
        className={classNames(styleInput)}
        type="text"
        placeholder="Por favor ingrese el nuevo titulo"
        {...register("title")}
      />

      {/* Descripcion */}
      <label htmlFor="descripcion" className={classNames(styleLabel)}>
        Ingrese la descripción
      </label>
      <input
        className={classNames(styleInput)}
        type="text"
        placeholder="Por favor ingrese la Descripción"
        {...register("descripcion")}
      />

      {/* Texto del boton */}
      <label htmlFor="text-btn" className={classNames(styleLabel)}>
        Ingrese el texto para el botón
      </label>
      <input
        className={classNames(styleInput)}
        type="text"
        placeholder="Por favor ingrese el nuevo texto del botón"
        {...register("text-btn")}
      />

      {/* Fondo */}
      <label htmlFor="img" className={classNames(styleLabel)}>
        Seleccione la nueva fondo a utilizar
      </label>
      <input type="file" className={classNames(styleInput)} />

      <button type="submit">Enviar</button>

      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </form>
  );
}
