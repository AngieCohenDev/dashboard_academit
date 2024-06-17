import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export const DynamicForm = ({ fields, onSubmit, extraButtons, resetForm }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (resetForm) {
            setFormData({});
            setErrors({});
        }
    }, [resetForm]);

    const handleChange = (e, id) => {
        setFormData({ ...formData, [id]: e.target.value });
        if (errors[id]) {
            setErrors({ ...errors, [id]: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        fields.forEach(field => {
            if (field.required && !formData[field.id]) {
                newErrors[field.id] = `${field.label} es requerido`;
            }
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            if (onSubmit) {
                onSubmit(formData);
            }
        }
    };

    return (
        <div className="flex flex-col items-center mx-4 my-8 p-6 border border-gray-300 rounded-lg ">
            <div className="flex flex-wrap w-full items-center">
                <form id="dynamicForm" className="flex flex-wrap gap-4 w-auto flex-grow" onSubmit={handleSubmit}>
                    {fields.map(field => (
                        <div key={field.id} className="flex flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                            <label htmlFor={field.id} className="mb-1 text-gray-700 font-medium">
                                {field.label}
                            </label>
                            <input
                                id={field.id}
                                type={field.type}
                                value={formData[field.id] || ''}
                                onChange={(e) => handleChange(e, field.id)}
                                className={`w-full h-10 p-2 bg-white border ${errors[field.id] ? 'border-red-500' : 'border-gray-300'} rounded box-border`}
                                style={{ boxSizing: 'border-box' }}
                            />
                            {errors[field.id] && <span className="text-red-500 text-xs mt-1">{errors[field.id]}</span>}
                        </div>
                    ))}
                </form>
                <div className="flex items-start p-2 space-x-2">
                    <button form="dynamicForm" type="submit" className="h-10 w-32 bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded-lg flex items-center justify-center shadow-md">
                        <MagnifyingGlassIcon className="w-4 h-4 mr-1" />
                        Buscar
                    </button>
                    {extraButtons && extraButtons.map((button, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={button.onClick}
                            className={`${button.className} h-10 w-48 text-white font-bold py-1 px-2 rounded-lg flex items-center justify-center shadow-md`}
                        >
                            {button.icon && <button.icon className="w-4 h-4 mr-1" />}
                            {button.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
