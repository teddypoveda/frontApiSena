import React from 'react';
import { useDispatch } from 'react-redux';
import { uiOpenModalHotel,uiOpenModalCountry } from '../../actions/ui';

export const AddNewResource = ({tipo}) => {

    const dispatch = useDispatch();

    const handleClickNew = () => {
        dispatch( (tipo==='hotel')?uiOpenModalHotel():uiOpenModalCountry());
    }


    return (
        
        <button className="btn btn-success" onClick={()=>{handleClickNew()}}>Agregar {(tipo==='hotel')?"Hotel":"País"}</button>
        // {/*  this.modalInsertar() */}
    )
}