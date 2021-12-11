import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap';


export const StateResource = () => {
    console.log("Me ejecuto");
    const tipo= "hotel";
    return (
        <ToastContainer>
            <Toast>
                <Toast.Header>
                    <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                    <strong className="me-auto"></strong>
                    <small>{(tipo==="hotel")?("Nuevo Hotel"):("Nuevo País")}</small>
                </Toast.Header>
                <Toast.Body></Toast.Body>
            </Toast>
        </ToastContainer>
        
    )
}
