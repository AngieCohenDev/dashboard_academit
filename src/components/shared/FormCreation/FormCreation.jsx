import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ItemFormPopup = ({
    currentItem,
    closePopup,
    handleFormSubmit,
    fields,
    handleFieldChange,
    formAction
}) => {
    return (
        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-75">
            <div className="bg-white shadow-lg rounded-lg p-8 w-11/12 md:w-2/3 lg:w-1/2">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {formAction ? 'Formulario de Items' : 'Editar Item'}
                    </h1>
                    <button onClick={closePopup} className="text-gray-600 hover:text-gray-700 focus:outline-none">
                        X
                    </button>
                </div>
                <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
                    {fields.map(field => (
                        <div key={field.id} className="flex flex-col space-y-1">
                            <label htmlFor={field.id} className="font-medium text-gray-700">
                                {field.label}
                            </label>
                            <input
                                id={field.id}
                                name={field.id} // Añadir name para asegurarse de que FormData lo capture
                                type={field.type}
                                required={field.required}
                                value={currentItem ? currentItem[field.id] : ''}
                                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
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
        required: PropTypes.bool
    })).isRequired,
    handleFieldChange: PropTypes.func.isRequired
};

export default ItemFormPopup;
