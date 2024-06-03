import classNames from "classnames";
import { useForm } from "react-hook-form";

const styleLabel = "text-red-500 py-1";
const styleInput =
  "rounded-md w-[500px] h-[40px] px-5 text-slate-400 text-sm italic my-2";

function HeaderGrid() {
  const { register, handleSubmit, reset, watch } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    alert("¡Los cambios se hicieron exitosamente!");
    reset();
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col font-sans">
      {/* Primer Item */}
      <label htmlFor="items01" className={classNames(styleLabel)}>
        Items #1
      </label>
      <input
        className={classNames(styleInput)}
        type="text"
        placeholder="Por favor ingrese el nuevo valor del items"
        {...register("items01")}
      />

      {/* Segundo Item */}
      <label htmlFor="items02" className={classNames(styleLabel)}>
        Items #2
      </label>
      <input
        className={classNames(styleInput)}
        type="text"
        placeholder="Por favor ingrese el nuevo valor del items"
        {...register("items02")}
      />

      {/* Tercer Item */}
      <label htmlFor="items03" className={classNames(styleLabel)}>
        Items #3
      </label>
      <input
        className={classNames(styleInput)}
        type="text"
        placeholder="Por favor ingrese el nuevo valor del items"
        {...register("items03")}
      />

      {/* Cuarto Item */}
      <label htmlFor="items04" className={classNames(styleLabel)}>
        Items #4
      </label>
      <input
        className={classNames(styleInput)}
        type="text"
        placeholder="Por favor ingrese el nuevo valor del items"
        {...register("items04")}
      />

      {/* Logo */}
      <label htmlFor="file" className={classNames(styleLabel)}>
        Logo
      </label>
      <input type="file" className={classNames(styleInput)} />

      <button type="submit">Enviar</button>

      <pre>
        {JSON.stringify(watch(), null, 2)}
      </pre>
    </form>
  );
}

export default HeaderGrid;
