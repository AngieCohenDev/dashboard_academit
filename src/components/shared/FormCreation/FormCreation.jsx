import React from 'react';
import PropTypes from 'prop-types';

const ItemFormPopup = ({
    currentItem,
    closePopup,
    handleFormSubmit,
    fields,
    handleFieldChange,
    formAction
}) => {
    // Agrupar los campos de a 3
    const groupedFields = [];
    for (let i = 0; i < fields.length; i += 3) {
        groupedFields.push(fields.slice(i, i + 3));
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {formAction ? 'Formulario de Items' : 'Editar Item'}
                    </h1>
                    <button onClick={closePopup} className="text-gray-600 hover:text-gray-700 focus:outline-none">
                        X
                    </button>
                </div>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    {groupedFields.map((group, index) => (
                        <div key={index} className="flex flex-wrap -mx-2">
                            {group.map(field => (
                                <div key={field.id} className="w-full md:w-1/3 px-2 mb-4">
                                    <label htmlFor={field.id} className="font-medium text-gray-700">
                                        {field.label}
                                    </label>
                                    {field.type === 'select' ? (
                                        <select
                                            id={field.id}
                                            name={field.id}
                                            value={currentItem ? currentItem[field.id] : ''}
                                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                            className="mt-1 mb-3 block w-full p-2 border border-gray-300 rounded-md"
                                        >
                                            {field.options.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            id={field.id}
                                            name={field.id}
                                            type={field.type}
                                            required={field.required}
                                            value={currentItem ? currentItem[field.id] : ''}
                                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                            className="mt-1 mb-3 block w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:shadow-outline"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

ItemFormPopup.propTypes = {
    currentItem: PropTypes.object,
    closePopup: PropTypes.func.isRequired,
    handleFormSubmit: PropTypes.func.isRequired,
    fields: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        required: PropTypes.bool,
        options: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        }))
    })).isRequired,
    handleFieldChange: PropTypes.func.isRequired
};

export default ItemFormPopup;
