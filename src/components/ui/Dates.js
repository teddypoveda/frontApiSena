import { Nav, Button, Badge, NavDropdown } from 'react-bootstrap';
import React from 'react'
//import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fichasUser, startLogout } from '../../actions/auth';




export const Dates = () => {
    const dispatch = useDispatch();

    //const {firstName, lastName, rol} = useSelector(state => state.auth);
    
    const firstName = localStorage.getItem('nombres');
    const lastName = localStorage.getItem('apellidos');
    const idUser = localStorage.getItem('id');
    const rol = localStorage.getItem('rol');
    
    //console.log(fich);
    //<NavDropdown.Item eventKey={x.id}>{x.fichaId}</NavDropdown.Item>
    return (
        <>
            <span className="navbar-brand">
                {firstName+' '+lastName} <Badge pill bg="success">{rol}</Badge>{' '}

            </span>
            
            <Nav className="me-auto">
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                {(!(rol==="Administrador"))||<Nav.Link href="/usuarios">Usuarios</Nav.Link>}
                {(!(rol==="Administrador"))||<Nav.Link href="/programas">Programas</Nav.Link>}
                {(!(rol==="Administrador"))||<Nav.Link href="/fichas">Fichas</Nav.Link>}
                {(!(rol==="Instructor"))||<Nav.Link href="/clases">Clases</Nav.Link>}
                {(!(rol==="Instructor"))||
                <NavDropdown title="Fichas Asignadas" id="nav-dropdown">
                    {}
                </NavDropdown>}
                {(!(rol==="Aprendiz"))||<Nav.Link href="/asistencias">Mis Asistencias</Nav.Link>}

            </Nav>
            <Button onClick={startLogout()}>
                <i className="fas fa-sign-out-alt"></i> 
                <span> salir</span>
            </Button>
        </>
    )
}
