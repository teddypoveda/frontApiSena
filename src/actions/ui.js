import { types } from '../types/types';



export const uiOpenModal = (option, selector=null) => ({ type: types.uiOpenModal, options:option, select:selector });
export const uiOpenModalDetails = (details) => ({ type: types.uiOpenModalDetails, select:details });
export const uiOpenModalDelete = (del) => ({ type: types.uiModalDelete, resourceDelete:del });

export const uiCloseModalDelete = () => ({ type: types.uiModalDeleteClose });
export const uiCloseModal = () => ({ type: types.uiCloseModal });