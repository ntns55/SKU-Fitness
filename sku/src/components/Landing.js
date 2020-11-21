import react from "react";
import { connect } from "react-redux";
import {Tab, Tabs, Col, TabContainer} from "react-bootstrap";
import Overview from "./Overview"

class Login extends react.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password:"" }
    }
    render() { 
        console.log(this.props,"Landing")
        return ( <div>
        <Col md={6} className="offset-md-3 bg-secondary">
          <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example" variant="pills">
            <Tab eventKey="overview" title="Overblik">
              <TabContainer className="bg-secondary">
                <Overview/>
              </TabContainer>
              {/*Do Rechart here also make navbar i stedet for tabs*/}
            </Tab>
            <Tab eventKey="training" title="Ny træning">
            </Tab>
            <Tab eventKey="history" title="Historik">
            </Tab>
          </Tabs>
        </Col>
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
