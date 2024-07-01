import classNames from "classnames";

const styleLabel = "font-medium text-sm py-1 ";
const styleInput = "w-full h-[40px] px-2 text-slate-400 text-xs my-1 rounded-lg border bg-gray-100";

export const Input = ({number, register}) => {
    return (
        <div className="my-2">
            {/* Primer Item */}
            <label htmlFor={`items0${number}`} className={classNames(styleLabel)}>
                Items {number}
            </label>
            <input
                className={classNames(styleInput)}
                type="text"
                placeholder="Por favor ingrese el nuevo valor"
                {...register(`item0${number}`)}
            />
        </div>
    )
}
