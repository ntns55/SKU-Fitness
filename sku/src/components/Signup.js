import React from "react"
import { Col, InputGroup, Jumbotron, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import {signUp} from "./../Redux/actions/loginactions";
import {Redirect} from "react-dom"

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { navn: "", password: "", passwordrepeat: "", email: "", }
    }

    inputhandler = (event) =>{
        this.setState({[event.target.name]:event.target.value})
    }

    createUser = (event) =>{
        event.preventDefault()
        if(this.state.password === this.state.passwordrepeat){
            this.props.sign({
                email:this.state.email, 
                password:this.state.email, 
                navn:this.state.navn, 
                vægt: this.state.weight !==undefined ? this.state.weight : null,
            });
        }else{

        }
    }

    render() { 
        console.log(this.props, "Signup")
        if(!(this.props.auth.isEmpty && this.props.auth.isLoaded)){
            return <Redirect to="/Main"/>
        }
        return ( <div>
        <Col md={6} className="offset-md-3">
            <Jumbotron>
            <h1 className="text-center">Lav bruger</h1>
                <form onSubmit={(event)=>{this.createUser(event)}}>
                    <InputGroup className="my-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        required
                        onChange={(event)=>this.inputhandler(event)}
                        type="email"
                        name="email"
                        placeholder="Email"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="my-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Navn</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        required
                        onChange={(event)=>this.inputhandler(event)}
                        type="text"
                        name="navn"
                        placeholder="Navn"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="my-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Vægt(Kg)</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        onChange={(event)=>this.inputhandler(event)}
                        type="number"
                        step={0.01}
                        name="weight"
                        placeholder="Vægt"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="my-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Kode</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        required
                        onChange={(event)=>this.inputhandler(event)}
                        type="password"
                        name="password"
                        placeholder="Kode"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="my-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon2">Kode Gentaget</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        required
                        onChange={(event)=>this.inputhandler(event)}
                        type="password"
                        name="passwordrepeat"
                        placeholder="Gentag kode"
                        aria-label="Username"
                        aria-describedby="basic-addon2"
                        />
                    </InputGroup>
                    <Button type="submit" variant="success" block>Godkend</Button>
                    <Button variant="danger" block>Tilbage</Button>
                </form>
            </Jumbotron>
        </Col>
        </div> );
    }
}
const mapStateToProps = (state) => {
    return {
      profile: state.firebase.profile,
      auth: state.firebase.auth
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      sign: (payload) => {
        dispatch(signUp(payload));
      },
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(Signup);