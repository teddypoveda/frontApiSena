import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { eventLoadingInasistenciasFicha } from '../../actions/events';


export const InasistenciasFichaScreen = () => {
  const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch(eventLoadingInasistenciasFicha());
    
    }, [dispatch]);

  return (
    <div>InasistenciasFichaScreen</div>
  )
}
