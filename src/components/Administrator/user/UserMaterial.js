import React from 'react';
import MaterialTable from "material-table";
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import '../../styles.css';
import { uiOpenModal, uiOpenModalDelete, uiOpenModalDetails } from '../../../actions/ui';
import { Bodies } from './bodies';


const columns= [
    { field: 'id', hidden:false},
    { title: 'Nombres', field: 'nombres'},
    { title: 'Apellidos', field: 'apellidos' },
    { title: 'Email', field: 'email' },
    { title: 'Estado', field: 'estado', type:'boolean' },
    { title: 'Tipo de Documento', field: 'tipoDocumentoId',  lookup: { 1: 'Cédula', 2: 'Tarjeta', 3: 'Pasaporte' }},
    { title: 'Numero de Documento', field: 'numeroDocumento', type: 'numeric'},
    { title: 'Roles', field: 'roles' },

  ];


  export const UserMaterial= () => {
    const dispatch = useDispatch();
  

      const tableRef = React.createRef();
      return(
        <div className="App">
        <br />
        <Button onClick={()=>dispatch(uiOpenModal("new"))}>Insertar usuario</Button>
        <br /><br />
       <MaterialTable
            columns={columns}
            tableRef={tableRef}
            data={query =>
              new Promise((resolve, reject) => {
                let url = 'https://localhost:44374/api/Usuarios?'
                url += 'pageSize=' + query.pageSize
                url += '&pageNumber=' + (query.page + 1)
                fetch(url)
                  .then(response => response.json())
                  .then(result => {
                    resolve({
                      data: result.apiUser,
                      page: result.metadata.currentPage -1,
                      totalCount: result.metadata.totalCount,
                    })
                  })
              })
            }
            title="Usuarios Sena Ceet"  
            actions={[
              {
                icon: 'refresh',
                tooltip: 'Refresh Data',
                isFreeAction: true,
                onClick: () => tableRef.current && tableRef.current.onQueryChange(),
              },
              {
                icon: 'edit',
                tooltip: 'Editar Usuario',
                onClick: (event, rowData) => dispatch(uiOpenModal("edit", rowData))
              },
              {
                icon: 'view_column',
                tooltip: 'Saber Mas',
                onClick: (event, rowData) => dispatch(uiOpenModalDetails(rowData))
              },
              {
                icon: 'delete',
                tooltip: 'Eliminar Usuario',
                onClick: (event, rowData) => dispatch(uiOpenModalDelete(rowData))
              }
            ]}
            options={{
              actionsColumnIndex: -1,
              exportButton: true,
              showFirstLastPageButtons: true,
              pageSize: 5,
              padding: 'dense',
              pageSizeOptions: [5, 10, 20],
              rowStyle: {
                backgroundColor: '#EEE',
              }
              
            }}
            
          />
          <Bodies/>  

      </div>
      );
  }