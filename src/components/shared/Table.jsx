import React, { useEffect, useState } from "react";

// Función de mapeo
const mapeo = (config, result) => {
  return result.map((item) => {
    let mappedItem = {};
    Object.keys(item).forEach(itemKey => {
      const index = config.keys.indexOf(itemKey);
      if (index !== -1) {
        mappedItem[config.labels[index]] = item[itemKey];
      }
    });
    return mappedItem;
  });
};

// Componente de la tabla
export const Table = ({ config, source, page }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    source(page).then((response) => {
      console.log(response);
      setData(mapeo(config, response));
    }).catch((error) => {
      console.error(error)
    })
  }, [page]);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {config.labels.map((label, key) => (
                <th key={key} className="py-3 px-6 text-left">{label}</th>
              ))}
              <th className="py-3 px-6 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {data.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                {config.labels.map((label, key) => (
                  <td key={key} className="py-3 px-6 text-left">{item[label]}</td>
                ))}
                <td className="py-3 px-6 text-left">
                  {/* Aquí puedes añadir acciones como botones de editar/eliminar */}
                  <button className="text-blue-500 hover:text-blue-700">Editar</button>
                  <button className="text-red-500 hover:text-red-700 ml-4">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </>
  );
};
