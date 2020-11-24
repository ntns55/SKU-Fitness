import React from "react";
import {connect} from "react-redux";
import { Button, Container, Modal } from "react-bootstrap";
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show:false }
    }

    sletElement = (event, value) => {
        event.preventDefault();
        this.setState({show:false})
    }

    render() { 
       

        const columns = [{
            defaultSort:true,
            Header: 'Dato',
            accessor: 'date', // String-based value accessors!
            Cell: props =>{ 
                if(props.value !== undefined){
                    return <span className='date'>{new Date(props.value.seconds * 1000).toLocaleDateString("DK")}</span>                
                }else{
                    return <span></span>
                }
            } 
        }, {
            Header: 'Reps',
            accessor: 'reps',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Antal Øvelser', // Required because our accessor is not a string
            accessor: 'exercises',
            Cell: d =>{
                if(d.value !== undefined && d.value !== null){
                    return <span className="number">{Object.keys(d.value).length}</span>
                }else{
                    return <span></span>
                }
            }
        },{
            Header: 'Type',
            accessor:'type'
        },
        {Header: "Slet?",
        accessor:"name",
        Cell: props =>{
            return <Button onClick={(event)=>{
                event.preventDefault();
                this.setState({show:true, target:props.value});
                }}>Slet?</Button>
        }}]
        
        return ( <div>
            <Container className="bg-light rounded my-5">
            <ReactTable
                data={this.props.data}
                columns={columns}
            />
            </Container>
            <Modal show={this.state.show} onHide={()=>this.setState({show:false, target:""})}>
                <Modal.Header closeButton>
                <Modal.Title>Du er ved at slette noget!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Du er ved at slette en træningsgang. Er du sikker på du har valgt den rigtige?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>this.setState({show:false, target:""})}>
                    Luk
                </Button>
                <Button variant="primary" onClick={(event)=>this.sletElement(event)}>
                    Slet træning
                </Button>
                </Modal.Footer>
            </Modal>
        </div> );
    }
}

const mapStatetoProps = (state) =>{
    return{
        profile: state.firebase.profile,
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        Slet: (payload) => {
            
        },
    };
};


export default connect(mapStatetoProps,mapDispatchToProps)(History);