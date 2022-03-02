import React, { useState, useEffect } from 'react';
import {
  Modal, 
  TextField, 
  Button, 
  MenuItem, 
  InputLabel, 
  Select, 
  List, 
  ListItem, 
  ListItemText, 
  Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {  eventAddNewUser, eventUpdateUser, eventDeleteUser } from '../../../actions/events';
import '../../styles.css';
import { uiCloseModal, uiCloseModalDelete } from '../../../actions/ui';
import { ManageAccounts} from '@mui/icons-material';
import { CheckboxesRoles } from './CheckBoxesRoles';
import { UsersFichas } from './UsersFichas';
import { Typography } from '@mui/material';




  const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 500,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      boxShadow: 24,
      borderRadius:'15px',
      padding: theme.spacing(0, 2, 1),
      top: '50%',
      left: '50%',
      bgcolor: 'background.paper',
      transform: 'translate(-50%, -50%)'
      
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      margin: '9px 0',
      width: '100%',
      color:'secondary'
    },
    valor:{
    }

  }));

  export const Bodies= () => {
    const styles= useStyles();
    const dispatch = useDispatch();
    const {resourceSelector,  modalNew, modalOpen, modalDelete, idSelector, modalDetails } = useSelector(state => state.ui);
    const [userSelect, setUserSelect]=useState({})
    

    useEffect(() => {
        setUserSelect(resourceSelector);
      }, [resourceSelector]);

  
    const handleChange=e=>{
      const {name, value}=e.target;
      setUserSelect(prevState=>({
        ...prevState,
        [name]: value
      })); 
    }
  

      const bodyDetails=(
      <div className={styles.modal}>
        { <h3><ManageAccounts fontSize="large"/> Detalles de Usuario </h3>}
        <Box sx={styles.modal}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          <List sx={{ width: '30%', maxWidth: 100, bgcolor: 'background.paper' }}>
          <ListItem>
            <ListItemText secondary="Id" primary={userSelect.id} />
          </ListItem>
          <ListItem>
            <ListItemText secondary="Estado del usuario" primary={userSelect.estado} />
          </ListItem>
          <ListItem>
            <ListItemText secondary="Nombres" primary={userSelect.nombres} />
            <ListItemText secondary="Apellidos" primary={userSelect.apellidos} />
          </ListItem>
          <ListItem>
            <ListItemText secondary="Tipo de Documento" primary={userSelect.tipoDocumentoId} />
            <ListItemText secondary="Numero de Documento" primary={userSelect.numeroDocumento} />
          </ListItem>
          <ListItem>
            <ListItemText secondary="Email" primary={userSelect.email} />
          </ListItem>
        </List>
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
          <CheckboxesRoles />
        <UsersFichas/>
          </Typography>
        </Box>
        

        

        <div align="right">
            <Button  onClick={()=>dispatch(uiCloseModal())}>Terminar</Button>
        </div>
      </div>
    ) 
    
    const bodyNewEdit=(
        <div className={styles.modal}>
            <h2>{ (modalNew)?'Nuevo ':'Editar '} Usuario</h2>
            { (modalNew)?<TextField className={styles.inputMaterial} label="Nombres" name="nombres" onChange={handleChange}  />:<TextField className={styles.inputMaterial} label="Nombres" name="nombres" onChange={handleChange} value={userSelect.nombres}  />}

            { (modalNew)?<TextField className={styles.inputMaterial} label="Apellidos" name="apellidos" onChange={handleChange}  />:<TextField className={styles.inputMaterial} label="Apellidos" name="apellidos" onChange={handleChange} value={userSelect.apellidos}  />}         
            <br/>
            <br/>
            <InputLabel id="demo-simple-select-label" className={styles.inputMaterial} >Tipo de Documento</InputLabel>
            <Select
                className={styles.inputMaterial}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userSelect.tipoDocumentoId}
                label="Tipo de Documento"
                name="tipoDocumentoId"
                onChange={handleChange}
 
                >
                <MenuItem value={"1"}>Cédula de ciudadania</MenuItem>
                <MenuItem value={"2"}>Tarjeta de identidad</MenuItem>
                <MenuItem value={"3"}>Pasaporte</MenuItem>
              </Select>

            { (modalNew)?<TextField className={styles.inputMaterial} label="Numero de Documento" name="numeroDocumento" onChange={handleChange} />:<TextField className={styles.inputMaterial} label="Numero de Documento" name="numeroDocumento" onChange={handleChange} value={userSelect.numeroDocumento}  />}

            { (!modalNew)||<TextField className={styles.inputMaterial} label="Contraseña" name="password" onChange={handleChange} margin="dense"/>}


            {(modalNew)?<TextField className={styles.inputMaterial} label="Email" name="email" onChange={handleChange} margin="dense"/>:<TextField  className={styles.inputMaterial} label="Email" name="email" onChange={handleChange} value={userSelect.email}  />}
            <br/>
            <br/>
             { (!modalNew)?<TextField disabled className={styles.inputMaterial} label="Rol" name="rol" onChange={handleChange} value={userSelect.rol} margin="dense"/>:
             <InputLabel id="demo-simple-select-label" >Rol</InputLabel>
            } 

            { (!modalNew)||
              <Select
                className={styles.inputMaterial}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userSelect.rol}
                label="rol"
                name="rol"
                onChange={handleChange}
                >
                <MenuItem value={"Aprendiz"}>Aprendiz</MenuItem>
                <MenuItem value={"Instructor"}>Instructor</MenuItem>
                <MenuItem value={"Administrador"}>Administrador</MenuItem>
              </Select>
            } 
            
            <br/>
            <br/><br/>
            <div align="right">
                <Button color="primary" onClick={()=>(modalNew)?dispatch(eventAddNewUser(userSelect)):dispatch(eventUpdateUser(userSelect))}>{(modalNew)?'Nuevo ':'Editar '} Usuario</Button>
                <Button onClick={()=>dispatch(uiCloseModal())}>Cancelar</Button>
            </div>
        </div>
    ) 
    
      const bodyEliminar=(
        <div className={styles.modal}>
          <p>Estás seguro que deseas eliminar al usuario <b>{resourceSelector.nombres+" "+resourceSelector.apellidos}</b>? </p>
          <div align="right">
            <Button color="secondary" onClick={()=>dispatch(eventDeleteUser(idSelector))}>Sí</Button>
            <Button onClick={()=>dispatch(uiCloseModalDelete())}>No</Button>
    
          </div>
    
        </div>
      )

      return(
        <> 
          <Modal
          open={modalOpen}>
          {bodyNewEdit}
          </Modal>

          <Modal
          open={modalDetails}>
            {bodyDetails}
          </Modal>
  
          <Modal
          open={modalDelete}>
            {bodyEliminar}
          </Modal>

      </>
      );
  }