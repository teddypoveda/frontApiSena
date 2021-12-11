import React from 'react'
import { Stack,Button,Card,Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { uiOpenModalDelete,uiOpenModalCountryId } from '../../actions/ui';


export const CountryItem = (props) => {
    const dispatch = useDispatch();
    const Update = (guid)=>(dispatch(uiOpenModalCountryId(guid))); 
    const Delete = (guid)=>(dispatch(uiOpenModalDelete(guid))); 

    if (props.id==='') {
        return (<Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
    </Spinner>);
    }
    
    return (
       
        <Card 
        bg='Primary'
        key={props.id}
        text='dark'
        style={{ width: '12rem', height:'12rem' }} 
        className="mb-2 card animate__animated animate__bounce shadow p-3 mb-5 bg-body rounded border border-secondary"
        >
        <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{props.shortName}</Card.Subtitle>
            <Stack gap={2} className="col-md-8 mx-auto">
                <Button size="sm" onClick={()=>Update(props)}>editar</Button>
                <Button variant="danger" size="sm" onClick={()=>Delete(props.id)}>eliminar</Button>
            </Stack>
        </Card.Body>
        </Card>
    )
}

