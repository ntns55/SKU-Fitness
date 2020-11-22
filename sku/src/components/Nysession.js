import React from "react";
import {Table, Dropdown, Container, FormControl, Button, InputGroup, Modal} from "react-bootstrap";
import {connect} from "react-redux"
import {register} from "./../Redux/actions/trainingactions"

class NewSession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show:false, type:"ingen", tableHeaders:{}, reps:5, øvelse:{}}
    }

    logdata = (event) =>{
        event.preventDefault();
        if(this.state.type !== "ingen"){
            this.props.logvægt({uid:this.props.auth.uid, type:this.state.type, reps:this.state.reps, ex: this.state.øvelse,id:this.props.profile.navn+" "+this.state.type})
            this.setState({show:true})
        }else{
            console.log(this.props)
        }
    }

    getTableRows = (keys) =>{
        let iterations = 0
        keys.forEach(element => {
            if(this.state.tableHeaders[element]>iterations){
                iterations = this.state.tableHeaders[element]
            }
        });
        let data = [];
        for(let item = 1; item < iterations+1; item++){
            data.push(
                <tr className="d-flex" key={this.state.type+""+item}>
                {keys.map((key,i)=>{
                    if(item > this.state.tableHeaders[key]){
                        return <td className="bg-dark col-3" key={key+item}></td>
                    }else if(key==="Sets"){
                        return <td key={"Sets"+item} className="col-1">{item}</td>
                    }else if(
                        key === "Deadlift" 
                        || key === "Squat"
                        || key === "Benchpress"
                        || key === "Overhead_press"
                        || key === "Pull_ups"
                        || key === "Dips"
                        || key === "Rowing_machine"
                    ){
                        return <td className="col-3" key={key+item}><FormControl
                            type="number"
                            step={0.1}
                            placeholder="Vægt i Kg"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(event)=>{
                                const name = key + "SetNumber" + item
                                this.setState({øvelse:{...this.state.øvelse, [name]:Number(event.target.value)}})}
                            }
                            /></td>
                    }else if(
                        key==="Push_ups"||
                        key === "Crunches"||
                        key === "Leg_raises"
                    ){
                        return <td className="col-3" key={key+item}><FormControl
                            type="number"
                            step={1}
                            placeholder="Tid taget / Antal nået"
                            onChange={(event)=>{
                                const name = key + "SetNumber" + item
                                this.setState({øvelse:{...this.state.øvelse, [name]:Number(event.target.value)}})}
                            }
                            /></td>
                    }else if(
                            key ==="Interval_sprint"||
                            key === "Run" ||
                            key === "Incline_walk"
                    ){
                        return <td className="col-3" key={key+item}><FormControl
                            type="number"
                            step={1}
                            placeholder="Distance nået"
                            onChange={(event)=>{
                                const name = key + "SetNumber" + item
                                this.setState({øvelse:{...this.state.øvelse, [name]:Number(event.target.value)}})}
                            }
                            /></td>
                    }else{
                        return <td></td>
                    }
                })}
                </tr>
            )
        }
        return data
    }

    render() { 
        const keys = Object.keys(this.state.tableHeaders);
        return ( 
        <div className="rounded my-5">
            <Container>
                <Dropdown className="my-3">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {this.state.type === "ingen" ? "Vælg type" : this.state.type}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item 
                        onSelect={()=>{
                            this.setState({
                                type:"Styrke",
                                reps:5, 
                                tableHeaders:{
                                    Sets:4, 
                                    Deadlift:2, 
                                    Squat:4, 
                                    Benchpress: 4, 
                                    Overhead_press:4, 
                                    Pull_ups:4, 
                                    Dips:4,
                                }
                            })
                        }}>
                        Styrke
                        </Dropdown.Item>
                        <Dropdown.Item 
                            onSelect={()=>{
                                this.setState({
                                    type:"Kondition",
                                    reps:5,
                                    tableHeaders:{
                                        Sets:4,
                                        Push_ups:3,
                                        Rowing_machine:3,
                                        Crunches:3,
                                        Leg_raises:3,
                                        Interval_sprint:4,
                                    }
                                })
                            }}>
                                Kondition
                            </Dropdown.Item>
                        <Dropdown.Item 
                            onSelect={()=>{
                                this.setState({
                                    type:"Udholdenhed",
                                    reps:20,
                                    tableHeaders:{
                                        Sets:1,
                                        Run:1,
                                        Incline_walk:1,
                                    }
                                })
                            }}>
                                Udholdenhed
                            </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item disabled onSelect={()=>{this.setState({type:"Bruger Defineret"})}}>Bruger defineret</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> 
            </Container>
            <Container>
            <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">{this.state.type !== "Udholdenhed"?"Reps":"Reps i Minutter"}</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        min={0}
                        value={this.state.reps}
                        type="number"
                        placeholder="Number of reps"
                        aria-label="Reps"
                        aria-describedby="basic-addon1"
                        onChange={(event)=>{this.setState({reps:Number(event.target.value)})}}
                        />
                    </InputGroup>
            </Container>
                    
            <Container>
                <h6 className="text-light">Type valgt: <strong>{this.state.type}</strong></h6>
            </Container>
            <div className="rounded bg-white">
            <Table responsive striped bordered hover>
                    <thead>
                        <tr className="d-flex">
                            {this.state.tableHeaders !== null ? keys.map((key,i)=>{
                                if(key === "Sets"){
                                    return<th className="col-1">{key}</th>
                                }else{
                                    return<th className="col-3">{key.replace("_"," ")}</th>
                                }
                            }): null} 
                        </tr>
                    </thead>
                    <tbody>
                        {this.getTableRows(keys)}
                    </tbody>
                </Table>
            </div>
            <Button className="my-2" onClick={(event)=>{this.logdata(event)}} block size="lg" variant="success">Færdig</Button>
            
            <Modal show={this.state.show} onHide={()=>{this.setState({show:false})}}>
                <Modal.Header closeButton>
                    <Modal.Title>Træning Registreret</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Din data er registreret. Du har mulighed for at interagere mere med den når denne hjemmeside bliver lavet færdig.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={()=>{this.setState({show:false})}}>OK!</Button>
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
        logvægt: (payload) => {
            dispatch(register(payload));
        },
    };
};


export default connect(mapStatetoProps,mapDispatchToProps)(NewSession);