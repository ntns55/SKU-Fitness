import react from "react";
import { connect } from "react-redux";
import {Tab, Col, Nav, Row} from "react-bootstrap";
import Overview from "./Overview"
import NewSession from "./Nysession";
import History from "./History";

class Login extends react.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password:"", selected:"first" }
    }
    render() { 
        console.log(this.props,"Landing")
        return ( 
        <div className="vertical-center">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col md={2} className="offset-md-2">
                <Nav defaultActiveKey="first" className="flex-column" variant="pills" fill>
                  <Nav.Link 
                  className="my-1" 
                  eventKey="first" 
                  name="first" 
                  bsPrefix={this.state.selected === "first" ? "btn btn-link btn-lg" :"btn btn-lg btn-secondary"} 
                  onClick={(event)=>{this.setState({selected:event.target.name})}}
                  >
                    Oversigt
                  </Nav.Link>
                  <Nav.Link 
                  className="my-1" 
                  eventKey="second" 
                  name ="second" 
                  bsPrefix={this.state.selected === "second" ? "btn btn-link btn-lg" :"btn btn-lg btn-secondary"} 
                  onClick={(event)=>{this.setState({selected:event.target.name})}}
                  >
                    Ny træning
                  </Nav.Link>
                  <Nav.Link 
                  className="my-1" 
                  eventKey="third" 
                  name="third" 
                  onClick={(event)=>{this.setState({selected:event.target.name})}} 
                  bsPrefix={this.state.selected === "third" ? "btn btn-lg btn-link" :"btn btn-lg btn-secondary"}
                  >
                    Historik
                  </Nav.Link>
                </Nav>
              </Col>
              <Col md={6} className="bg-secondary rounded">
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Overview/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <NewSession />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <History />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div> );
    }
}
 
const mapStateToProps = (state) => {
    return {
      profile: state.firebase.profile,
      auth: state.firebase.auth,
    };
  };
  
export default connect(mapStateToProps)(Login);
