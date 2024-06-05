import classNames from "classnames";
import { useForm } from "react-hook-form";

const styleLabel = "text-red-500 py-1";
const styleInput =
  "rounded-md w-[500px] h-[40px] px-5 text-slate-400 text-sm italic my-1";

export default function VideoForm() {

    const { register, handleSubmit, reset, watch } = useForm();

     const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
     })

  return (
    <form onSubmit={onSubmit} className="flex flex-col font-sans">
      {/* Título */}
      <label htmlFor="title" className={classNames(styleLabel)}>
        Ingrese el título de la clase
      </label>
      <input
        className={classNames(styleInput)}
        type="text"
        placeholder="Por favor ingrese el nuevo título"
        {...register("title")}
      />

      {/* Descripcion */}
      <label htmlFor="descripcion" className={classNames(styleLabel)}>
        Ingrese la descripción
      </label>
      <input
        className={classNames(styleInput)}
        type="text"
        placeholder="Por favor ingrese la descripción de la clase"
        {...register("description")}
      />

      {/* Fondo */}
      <label htmlFor="file" className={classNames(styleLabel)}>
        Seleccione el video a subir
      </label>
      <input type="file" className={classNames(styleInput)} />

      <button type="submit">Enviar</button>

      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </form>
  );
  
}
