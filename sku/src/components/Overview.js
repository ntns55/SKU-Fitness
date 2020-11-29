import React from "react"
import { Dropdown, Row } from "react-bootstrap";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.myInput = React.createRef()
        this.state = { overview:"Styrke", width:0 }
    }

    componentDidMount () {
        this.setState({width:this.myInput.current.offsetWidth})
      }

    render() {
        let data = []
        switch(this.state.overview){
            case "Styrke":

                break;
            case "Kondition":
                break;

            case "Udholdenhed":
                break;
            default:

        } 
        return ( <div className="rounded">
        <h1>Oversigt</h1>
        <Row>
                <Dropdown className="my-3">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {this.state.overview}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item 
                        onSelect={()=>{
                            this.setState({
                                overview:"Styrke",})
                                }}
                        >
                        Styrke
                        </Dropdown.Item>
                        <Dropdown.Item 
                            onSelect={()=>{
                                this.setState({
                                    overview:"Kondition",
                                })
                            }}>
                                Kondition
                            </Dropdown.Item>
                        <Dropdown.Item 
                            onSelect={()=>{
                                this.setState({
                                    overview:"Udholdenhed",
                                })
                            }}>
                                Udholdenhed
                            </Dropdown.Item>
                        <Dropdown.Divider />
                    </Dropdown.Menu>
                </Dropdown> 
            </Row>
            <Row ref={this.myInput}>
                <LineChart width={this.state.width} height={this.state.width} data={data}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                </LineChart>
            </Row>
        </div> );
    }
}
 
export default Overview;