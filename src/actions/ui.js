import { types } from '../types/types';



export const uiOpenModal = (option, selector=null) => ({ type: types.uiOpenModal, options:option, select:selector });
export const uiModalJustificacion = (id) => ({ type: types.uiModalJustificacion, select:id });
export const uiOpenModalDetails = (details) => ({ type: types.uiOpenModalDetails, select:details });
export const uiOpenModalDelete = (del) => ({ type: types.uiModalDelete, resourceDelete:del });

export const uiChangeFicha = (id) => ({ type: types.uiChangeFicha, Payload:id });
export const uiChangeRol = (rol) => ({ type: types.uiChangeRol, Payload:rol });

export const uiCloseModalDelete = () => ({ type: types.uiModalDeleteClose });
export const uiCloseModal = () => ({ type: types.uiCloseModal });