import React from 'react';
import MaterialTable from "material-table";
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import '../../styles.css';
import { uiOpenModal, uiOpenModalDelete, uiOpenModalDetails } from '../../../actions/ui';
import { Bodies } from './bodies';


const columns= [
    { title: 'Id', field: 'id'},
    { title: 'Fecha y hora', field: 'fechaHora', type:'datetime'},
    { title: 'Aula', field: 'aula' },
    { title: 'Nombre', field: 'nombre' },
    { title: 'Ficha', field: 'fichaId'},

  ];


  export const ClasesMaterial= () => {
    const dispatch = useDispatch();

      const tableRef = React.createRef();
      return(
        <div className="App">
        <br />
        <Button onClick={()=>dispatch(uiOpenModal("new"))}>Asignar Nueva Clase</Button>
        <br /><br />
       <MaterialTable
            columns={columns}
            tableRef={tableRef}
            data={query =>
              new Promise((resolve, reject) => {
                let url = 'https://localhost:44374/api/Clases?'
                url += 'pageSize=' + query.pageSize
                url += '&pageNumber=' + (query.page + 1)
                fetch(url)
                  .then(response => response.json())
                  .then(result => {
                    console.log(result)
                    resolve({
                      data: result.clases,
                      page: result.metadata.currentPage -1,
                      totalCount: result.metadata.totalCount,
                    })
                  })
              })
            }
            title="Fichas Sena Ceet"  
            actions={[
              {
                icon: 'refresh',
                tooltip: 'Refresh Data',
                isFreeAction: true,
                onClick: () => tableRef.current && tableRef.current.onQueryChange(),
              },
              {
                icon: 'edit',
                tooltip: 'Editar Ficha',
                onClick: (event, rowData) => dispatch(uiOpenModal("edit", rowData))
              },
              {
                icon: 'view_column',
                tooltip: 'Saber Mas',
                onClick: (event, rowData) => dispatch(uiOpenModalDetails(rowData))
              },
              {
                icon: 'delete',
                tooltip: 'Eliminar Ficha',
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