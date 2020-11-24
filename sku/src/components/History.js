import React from "react";
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {compose} from "redux";

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div>

        </div> );
    }
}

const mapStatetoProps = (state) =>{
    return{
        profile: state.firebase.profile,
        auth: state.firebase.auth,
        styrke: state.firestore.data.Styrke,
        kondition: state.firestore.data.Kondition,
        udholdenhed: state.firestore.data.udholdenhed
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        Slet: (payload) => {
            
        },
    };
};


export default compose(
    connect(mapStatetoProps,mapDispatchToProps),
    firestoreConnect([
        {collection:"Styrke"},
        {collection:"Kondition"},
        {collection:"Udholdenhed"}
    ])
)(History);