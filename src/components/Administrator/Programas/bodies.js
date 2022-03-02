import React, { useState, useEffect } from 'react';
import {
  Modal, 
  InputLabel,
  TextField, 
  Button, 
  MenuItem, 
  Select, 
  List, 
  ListItem, 
  ListItemText } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {  eventAddNewProgram, eventUpdateProgram, eventDeleteProgram } from '../../../actions/events';
import '../../styles.css';
import { uiCloseModal, uiCloseModalDelete } from '../../../actions/ui';
import { ManageAccounts} from '@mui/icons-material';




  const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 500,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      boxShadow: theme.shadows[12],
      borderRadius:'15px',
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
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
    const [programSelect, setPromgramSelect]=useState({})
    

    useEffect(() => {
        setPromgramSelect(resourceSelector);
      }, [resourceSelector]);

  
    const handleChange=e=>{
      const {name, value}=e.target;
      setPromgramSelect(prevState=>({
        ...prevState,
        [name]: value
      })); 
    }
  

      const bodyDetails=(
      <div className={styles.modal}>
        { <h3><ManageAccounts fontSize="large"/> Detalles del Programa </h3>}
          
        <List sx={{ width: '30%', maxWidth: 100, bgcolor: 'background.paper' }}>
          <ListItem>
            <ListItemText secondary="Id" primary={programSelect.id} />
          </ListItem>
          <ListItem>
            <ListItemText secondary="Nombre" primary={programSelect.nombre} />
          </ListItem>
          <ListItem>
            <ListItemText secondary="Descripción" primary={programSelect.descripcion} />
            <ListItemText secondary="Versión" primary={programSelect.version} />
          </ListItem>
          <ListItem>
            <ListItemText secondary="Tipo de Programa" primary={programSelect.tipoProgramaId} />
          </ListItem>
        </List>

        <div align="right">
            <Button  onClick={()=>dispatch(uiCloseModal())}>Terminar</Button>
        </div>
      </div>
    ) 
    
    const bodyNewEdit=(
        <div className={styles.modal}>
            <h2>{ (modalNew)?'Nuevo ':'Editar '} Programa</h2>
            { (modalNew)?<TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange} />:<TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange} value={programSelect.nombre}  />}

            { (modalNew)?<TextField className={styles.inputMaterial} label="Descripción" name="descripcion" onChange={handleChange} />:<TextField className={styles.inputMaterial} label="Descripción" name="descripcion" onChange={handleChange} value={programSelect.descripcion}  />}        
            { (modalNew)?<TextField className={styles.inputMaterial} label="Versión" name="version" onChange={handleChange} />:<TextField className={styles.inputMaterial} label="Versión" name="version" onChange={handleChange} value={programSelect.version}  />}        
            <br/>
            <br/>
            <InputLabel id="demo-simple-select-label" className={styles.inputMaterial} >Tipo de Programa</InputLabel>
            <Select
                className={styles.inputMaterial}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={programSelect.tipoProgramaId}
                label="Tipo de Programa"
                name="tipoProgramaId"
                onChange={handleChange}
 
                >
                <MenuItem value={"1"}>Técnico</MenuItem>
                <MenuItem value={"2"}>Tecnólogo</MenuItem>
                <MenuItem value={"3"}>Especializacón</MenuItem>
              </Select>            

            
            <br/>
            <br/><br/>
            <div align="right">
                <Button color="primary" onClick={()=>(modalNew)?dispatch(eventAddNewProgram(programSelect)):dispatch(eventUpdateProgram(programSelect))}>{(modalNew)?'Agregar ':'Editar '} Programa</Button>
                <Button onClick={()=>dispatch(uiCloseModal())}>Cancelar</Button>
            </div>
        </div>
    ) 
    
      const bodyEliminar=(
        <div className={styles.modal}>
          <p>Estás seguro que deseas eliminar el programa <b>{resourceSelector.nombre}</b>? </p>
          <div align="right">
            <Button color="secondary" onClick={()=>dispatch(eventDeleteProgram(idSelector))}>Sí</Button>
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