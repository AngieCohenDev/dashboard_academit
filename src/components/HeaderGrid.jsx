import classNames from "classnames";
import { useForm } from "react-hook-form";
import { postHeaders } from "../helpers/fetchHeaders";
import { useState } from "react";
import ImageUpload from "../helpers/ImageUpload";

const styleLabel = "text-red-500 py-1";
const styleInput =
  "rounded-md w-[500px] h-[40px] px-5 text-slate-400 text-sm italic my-2";

function HeaderGrid() {
  const { register, handleSubmit, reset, watch } = useForm();

  const onSubmit = handleSubmit((data) => {
    postHeaders(data)
    reset();
  });

  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (file) => {
    setImageFile(file);
  };

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
        {...register("item1")}
      />

      {/* Segundo Item */}
      <label htmlFor="items02" className={classNames(styleLabel)}>
        Items #2
      </label>
      <input
        className={classNames(styleInput)}
        type="text"
        placeholder="Por favor ingrese el nuevo valor del items"
        {...register("item2")}
      />

      {/* Tercer Item */}
      <label htmlFor="items03" className={classNames(styleLabel)}>
        Items #3
      </label>
      <input
        className={classNames(styleInput)}
        type="text"
        placeholder="Por favor ingrese el nuevo valor del items"
        {...register("item3")}
      />

      {/* Cuarto Item */}
      <label htmlFor="items04" className={classNames(styleLabel)}>
        Items #4
      </label>
      <input
        className={classNames(styleInput)}
        type="text"
        placeholder="Por favor ingrese el nuevo valor del items"
        {...register("item4")}
      />

      {/* Logo */}
      <label htmlFor="file" className={classNames(styleLabel)}>
        Inserte el logo
      </label>
      <ImageUpload onFileChange={handleFileChange} />

      <button type="submit">Enviar</button>
      
    </form>
  );
}

export default HeaderGrid;
