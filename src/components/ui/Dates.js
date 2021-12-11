import { Nav, Button, Badge } from 'react-bootstrap';
import React from 'react'
//import { useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';


export const Dates = () => {

    //const {firstName, lastName, rol} = useSelector(state => state.auth);

    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const rol = localStorage.getItem('rol');

    return (
        <>
            <span className="navbar-brand">
                {firstName+' '+lastName} <Badge pill bg="success">{rol}</Badge>{' '}

            </span>
            
            <Nav className="me-auto">
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/hotel">Hoteles</Nav.Link>
                <Nav.Link href="/country">Paises</Nav.Link>
                <Nav.Link href="/register"> Usuario Nuevo</Nav.Link>
            </Nav>
            <Button onClick={startLogout()}>
                <i className="fas fa-sign-out-alt"></i> 
                <span> salir</span>
            </Button>
        </>
    )
}
