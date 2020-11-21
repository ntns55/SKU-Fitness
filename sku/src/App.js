import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Signup from "./components/Signup"

const routes = [
  { path: "/", name: "Login", Component: Login },
  { path: "/Main", name: "Landing", Component: Landing },
  { path: "/Signup", name: "Signup", Component: Signup },
];

class App extends React.Component {
  render() {
    if (this.props.profile.isLoaded) {
      return (
        <BrowserRouter>
          <Container className="app">
            <Switch>
              {routes.map(({ path, Component }) => (
                <Route key={path} exact path={path} component={Component} />
              ))}
            </Switch>
          </Container>
        </BrowserRouter>
      );
    } else {
      //TODO: INDSÆT LOADING SCREEN!
      return <div></div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(App);