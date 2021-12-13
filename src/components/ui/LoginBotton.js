import React from 'react'
import { Navbar, Button } from 'react-bootstrap';

export const LoginBotton = () => {
    return (
        <Navbar.Brand href="">
            <Button variant="secondary" href="/login">Login</Button>
            {'  '}
            <Button variant="info" href="/register">Registrarse</Button>
        </Navbar.Brand>
    )
}
