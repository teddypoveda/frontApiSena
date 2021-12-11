import React from 'react'
import { Navbar, Button } from 'react-bootstrap';

export const LoginBotton = () => {
    return (
        <Navbar.Brand href="">
            <Button variant="secondary" href="/Fronted-React-js/login">Login</Button>
            {'  '}
            <Button variant="info" href="/Fronted-React-js/register">Registrarse</Button>
        </Navbar.Brand>
    )
}
