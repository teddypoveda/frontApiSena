import React from 'react'
import { BrowserRouter as Router,
    Switch,
    Route
    } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, Container } from 'react-bootstrap';
import { LoginScreen } from '../components/auth/LoginScreen';
import { Dates } from '../components/ui/Dates';
import { useJwt } from "react-jwt";
import { LoginBotton } from '../components/ui/LoginBotton';
import { Dashboard } from '../components/dashboard/Dashboard';
import { PublicRoute } from './PublicRoute';
import { RegisterScreen } from '../components/user/RegisterScreen';
import { PrivateRoute } from './PrivateRoute';
import { UsersScreen } from '../components/Administrator/user/UsersScreen';
import { ProgramsScreen } from '../components/Administrator/Programas/ProgramsScreen';
import { FichasScreen } from '../components/Administrator/Fichas/FichasScreen';
import { ClasesScreen } from '../components/Instructor/Clases/ClasesScreen';



export const AppRouters = () => {
    //const dispatch = useDispatch();
    const {checking} = useSelector(state => state.auth);
    
    const token = localStorage.getItem('token')||'';
    const {  isExpired } = useJwt(token);
    localStorage.setItem('tokenExpired', isExpired);
    const rol = localStorage.getItem('rol');
    console.log(checking);

    return (
    <>
    

    <Navbar expand="lg" variant="light" bg="light">
        <Container fluid>
            <Navbar.Brand href="/">
                <img
                    src= "https://previews.123rf.com/images/djvstock/djvstock1702/djvstock170202599/70845774-icono-del-reloj-cuadrado-ilustraci%C3%B3n-imagen-del-dise%C3%B1o-del-vector.jpg?fj=1"
                    width= "50"
                    height="50"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />{'  '}

            </Navbar.Brand>
            <span className="navbar-brand fontletter">
                No Falles, Asiste.
            </span>
            
             {(isExpired)?<LoginBotton/>:<Dates />} 
            
        </Container>
  </Navbar> 
  
    <Router>
   
        <Switch>
            <Route path="/register" component={ RegisterScreen } />

            <PrivateRoute 
                exact 
                path="/login" 
                component={ LoginScreen }
                isAuthenticated={ isExpired }
 
            /> 

            <PublicRoute 
                exact 
                path="/dashboard" 
                component={ Dashboard }
                isAuthenticated={ isExpired }
 
            />
            

           <Route path="/usuarios" render={()=>{
                return (rol==='Administrador')?<UsersScreen/>:<Dashboard/>;
            }
            }/>
            <Route path="/programas" render={()=>{
                return (rol==='Administrador')?<ProgramsScreen/>:<Dashboard/>;
            }
            }/>
            <Route path="/fichas" render={()=>{
                return (rol==='Administrador')?<FichasScreen/>:<Dashboard/>;
            }
            }/>

            <Route path="/clases" render={()=>{
                return (rol==='Instructor')?<ClasesScreen/>:<Dashboard/>;
            }
            }/>
            {/* <Route path="/fichasAsignadas" render={()=>{
                return (rol==='Administrador')?<FichasAsignadasScreen/>:<Dashboard/>;
            }
            }/>   */}


        </Switch> 
        
    </Router>
  </>  
  );
}    
       
    

