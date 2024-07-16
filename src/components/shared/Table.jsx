import React, { useEffect, useState } from 'react';

const mapeo = (config, result) => {
  return result?.map((item) => {
    let mappedItem = {};
    Object.keys(item).forEach((itemKey) => {
      const index = config.keys.indexOf(itemKey);
      if (index !== -1) {
        mappedItem[config.labels[index]] = item[itemKey];
      }
    });
    return mappedItem;
  });
};

export const Table = ({ config, data, totalItems, totalPages, currentPage, onPageChange, actions }) => {
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    setMappedData(mapeo(config, data));
  }, [config, data]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const [openActionsIndex, setOpenActionsIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setOpenActionsIndex(index);
  };

  const handleMouseLeave = () => {
    setOpenActionsIndex(null);
  };  
  return (
    <div className="overflow-x-auto" style={{ maxHeight: '100vh' }}>
      <table className="min-w-full bg-white border border-gray-300" style={{ minHeight: 'calc(100vh - 200px)'}}>
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            {config.labels.map((label, key) => (
              <th key={key} className="py-3 px-6 text-left">{label}</th>
            ))}
            <th className="py-3 px-6 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {
          mappedData?.length === 0 || !mappedData ? (
            <tr>
              <td colSpan={config.labels.length + 1} className="text-center py-10">
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
                  </svg>
                  <p>No hay registros aún</p>
                </div>
              </td>
            </tr>
          ) : (
            mappedData?.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                {config.labels.map((label, key) => (
                  <td key={key} className="py-1 px-5 text-left">{item[label]}</td>
                ))}
                <td className="py-3 px-6 text-left" onMouseLeave={handleMouseLeave}>
                  <div className="relative inline-block text-left" onMouseEnter={() => handleMouseEnter(index)}>
                    <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                      &#8942;
                    </button>
                    {openActionsIndex === index && (
                      <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                        <div className="py-1">
                          {actions.map((action, actionIndex) => (
                            <button
                              key={actionIndex}
                              onClick={() => action.onClick(item)}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <span>Total de elementos: {totalItems}</span>
        <div className="flex items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-lg disabled:opacity-50"
          >
            &lt;
          </button>
          <span className="mx-2">Página {currentPage} de {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-lg disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
