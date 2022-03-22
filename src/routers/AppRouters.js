import React, { useEffect } from 'react'
import { BrowserRouter as Router,
    Switch,
    Route
    } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { FichasAsignadasScreen } from '../components/Instructor/FichasAsignadas/FichasAsignadasScreen';
import { InasistenciasScreen } from '../components/Aprendiz/InasistenciasScreen';
import { InasistenciasFichaScreen } from '../components/Aprendiz/InasistenciasFichaScreen';
import { NavBarUser } from './NavBarUser';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



export const AppRouters = () => {
    const dispatch = useDispatch();
    const {checking, rol} = useSelector(state => state.auth);
    const { rolSelect} = useSelector(state => state.ui);
    const history = useHistory();
    
    const token = localStorage.getItem('token')||'';
    const {  isExpired } = useJwt(token);
    localStorage.setItem('tokenExpired', isExpired);
    const roles = localStorage.getItem('rol');

    useEffect(() => {

    }, [roles])
    

    return (
    <>    
  
    <Router>
        <NavBarUser/>
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
                return (rolSelect==='Administrador')?<UsersScreen/>:<Dashboard/>;
            }
            }/>
            <Route path="/programas" render={()=>{
                return (rolSelect==='Administrador')?<ProgramsScreen/>:<Dashboard/>;
            }
            }/>
            <Route path="/fichas" render={()=>{
                return (rolSelect==='Administrador')?<FichasScreen/>:<Dashboard/>;
            }
            }/>

            <Route path="/clases" render={()=>{
                return (rolSelect==='Instructor')?<ClasesScreen/>:<Dashboard/>;
            }}/>

            <Route path="/fichasasignadas" render={()=>{
                return (rolSelect==='Instructor')?<FichasAsignadasScreen/>:<Dashboard/>;
            }
            }/>
            <Route path="/inasistencias" render={()=>{
                return (rolSelect==='Aprendiz')?<InasistenciasScreen/>:<Dashboard/>;
            }
            }/>  
            <Route path="/inasistenciasficha" render={()=>{
                return (rolSelect==='Vocero')?<InasistenciasFichaScreen/>:<Dashboard/>;
            }
            }/>   


        </Switch> 
        
    </Router>
  </>  
  );
}    
       
    

