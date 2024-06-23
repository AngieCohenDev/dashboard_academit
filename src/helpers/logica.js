import {callApiHeaders, createItemHeaders, deleteItemHeaders, updateItemHeaders} from '../axios/peticionesHeaders'

const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setCurrentItem(null);
  };

 export const handleFormSubmit = async (event) => {

    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      const formValues = Object.fromEntries(formData.entries());
      (formAction ? await createItemHeaders({ ...formValues }) : await updateItemHeaders(currentItem.Id, { ...formValues }))
      closePopup()
      setCurrentPage(1);
      const response = await callApiHeaders(currentPage, 5, searchParams);
      setData(response.data);
    } catch (error) {
      console.log('Ocurrio un error en el servidor' , error);
    }

  };

  const searchFormSubmit = async (form) => {

    console.log(form)
 
    setSearchParams(form);

    const response = await callApiHeaders(currentPage, 5, form);
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
      await deleteItemHeaders(item.Id);
      const response = await callApiHeaders(currentPage, 5, searchParams);
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
