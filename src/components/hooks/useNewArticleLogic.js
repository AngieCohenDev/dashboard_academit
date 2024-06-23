import { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { FaMinus } from "react-icons/fa6";
import { callApiNewArticle, updateItemNewArticle, createItemNewArticle, deleteItemNewArticle } from '../../services/peticionesNewArticle'

export const useNewArticleLogic = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [data, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItem, setCurrentItem] = useState(null);
    const [searchParams, setSearchParams] = useState({});
    const [resetForm, setResetForm] = useState(false);
    const [formAction, setFormAction] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await callApiNewArticle(currentPage, 5, searchParams);
                setData(response.data);
                setTotalItems(response.pagination.totalItems);
                setTotalPages(response.pagination.pageCount);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [currentPage, searchParams]);

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setCurrentItem(null);
    };

    const handleFormSubmit = async (event) => {

        try {
            event.preventDefault();
            const formData = new FormData(event.target);
            const formValues = Object.fromEntries(formData.entries());
            (formAction ? await createItemNewArticle({ ...formValues }) : await updateItemNewArticle(currentItem.Id, { ...formValues }))
            closePopup()
            setCurrentPage(1);
            const response = await callApiNewArticle(currentPage, 5, searchParams);
            setData(response.data);
        } catch (error) {
            console.log('Ocurrio un error en el servidor', error);
        }

    };

    const searchFormSubmit = async (form) => {

        console.log(form)

        setSearchParams(form);

        const response = await callApiNewArticle(currentPage, 5, form);
        setData(response.data);

        //resetAllForms();
    };

    const handleCreate = () => {
        setFormAction(true)
        openPopup();
    };

    const handleEdit = (item) => {
        console.log('Edit item:', item);
        setCurrentItem(item);
        setFormAction(false)
        openPopup();
    };

    const handleDelete = async (item) => {
        console.log('Delete item:', item);
        try {
            await deleteItemNewArticle(item.Id);
            const response = await callApiNewArticle(currentPage, 5, searchParams);
            setData(response.data);
            setTotalItems(response.pagination.totalItems);
            setTotalPages(response.pagination.pageCount);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const resetAllForms = () => {
        setSearchParams({});
        setCurrentPage(1);
        setCurrentItem(null);
        setResetForm(true); // Trigger form reset
        setTimeout(() => setResetForm(false), 0); // Reset the flag
    };

    const extraButtons = [
        {
            label: 'Crear New Article',
            onClick: handleCreate,
            className: 'bg-indigo-500 hover:bg-indigo-700 crear',
            icon: PlusIcon,
        },
        {
            label: 'Restablecer',
            onClick: resetAllForms,
            className: 'bg-red-500 hover:bg-red-700',
            icon: FaMinus,
        },
    ];

    const actions = [
        { label: 'Editar', onClick: handleEdit },
        { label: 'Eliminar', onClick: handleDelete },
    ];

    return {
        extraButtons,
        actions,
        handlePageChange,
        searchFormSubmit,
        handleFormSubmit,
        showPopup,
        data,
        totalItems,
        totalPages,
        resetForm,
        currentItem,
        closePopup,
        formAction,
        setCurrentItem,
        currentPage
    }
}
