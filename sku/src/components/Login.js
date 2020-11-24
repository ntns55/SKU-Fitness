import react from "react";
import { connect } from "react-redux";
import { InputGroup, FormControl, Col, Jumbotron, Button} from "react-bootstrap"
import {signIn} from "./../Redux/actions/loginactions"
import { Redirect } from "react-router-dom";
class Login extends react.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password:"" }
    }

    loginhandler= (event) =>{
      event.preventDefault();
      if(this.state.username !== "" && this.state.password !== ""){
        this.props.Login({...this.state, email:this.state.username})
      }else{
        /*TODO: indsæt modal om fejl login her. */
      }
    }

    inputhandler = (event) =>{
      this.setState({[event.target.name]:event.target.value})
    }

    render() { 
      console.log(this.props,"Login")
        if(!(this.props.auth.isEmpty && this.props.auth.isLoaded)){
          return <Redirect to="/Main"/>
        }
        return ( <div>
          <Col md={6} className="offset-md-3" >
          <Jumbotron>
          <h1 className="text-center">SKU - Fitness</h1>
          <h3 className="text-center">Styrke, Kondition, Udholdenhed</h3>
          <form onSubmit={this.loginhandler}>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
            onChange={(event)=>this.inputhandler(event)}
            type="email"
            name="username"
              placeholder="Email"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon2">Kode</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
            onChange={(event)=>this.inputhandler(event)}
              type="password"
              name="password"
              placeholder="Kode"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <Button size="lg" block type="submit">Login</Button>
          </form>
          </Jumbotron>
          <Button size="lg" block variant="warning" onClick={()=>{this.props.history.push("/Signup")}}>Ny Bruger</Button>
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
      Login: (payload) => {
        dispatch(signIn(payload));
      },
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(Login);
