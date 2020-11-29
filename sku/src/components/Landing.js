import react from "react";
import { connect } from "react-redux";
import {Tab, Col, Nav, Row} from "react-bootstrap";
import Overview from "./Overview"
import NewSession from "./Nysession";
import History from "./History";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";

class Login extends react.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password:"", selected:"first" }
    }
    render() {
      let tempData = []
      if(this.props.styrke !== undefined && this.props.kondition !== undefined && this.props.udholdenhed !== undefined){
          const temp = {...this.props.styrke,...this.props.kondition,...this.props.udholdenhed}
          const keys = Object.keys(temp);
          keys.forEach(element => {
              if(temp[element].owner === this.props.auth.uid){
                  tempData.push({...temp[element],name:element})
              }
          });
      }
      tempData.sort((a,b)=>{return new Date(b.date) - new Date(a.date)})
      const data = tempData 
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
                    <Overview 
                      data={data} 
                      styrke={this.props.styrke} 
                      udholdenhed={this.props.udholdenhed} 
                      kondition={this.props.kondition}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <NewSession />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <History data={data}/>
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
      styrke: state.firestore.data.Styrke,
      kondition: state.firestore.data.Kondition,
      udholdenhed: state.firestore.data.Udholdenhed
    };
  };
  
export default compose(connect(mapStateToProps),firestoreConnect([
  {collection:"Styrke"},
  {collection:"Kondition"},
  {collection:"Udholdenhed"}
]))(Login);
