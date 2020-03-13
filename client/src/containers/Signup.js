import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { signup } from "../actions";
import { Form, Button } from "react-bootstrap"
import { Redirect } from 'react-router-dom'
import NavBar from "./../components/NavBar"
import monday from "./../images/6.jpg";

class Signup extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      redirect : false
    }

  }

  onSubmit = () => {
    const data = {
      username : this.state.username,
      password : this.state.password
    }
    this.props.signup(data, () => {
      this.setState({redirect: true})
    })
  }

  renderRedirect = () => {
    if (this.state.redirect || this.props.auth) {
      return <Redirect to='/tasks'/>
    }
  }

  render() {

    const { handleSubmit } = this.props;
    return (
      <div>
        <NavBar navType = {[{name: "Home", href: "/home"}, {name: "Sign Up", href: "/signup"}, {name: "Sign In", href: "/signin"}, "Sign Up"]}/>
        <div style = {{position: "relative"}}>
        {this.renderRedirect()}
        <img
            src={monday}
            className="img-fluid"
            alt=""
            style={{ height: "100vh", width: "100vw" }}
          />
        <div style={{
              alignContent: "center",
              width: "100%",
              position: "absolute",
              top: "80px",
              opacity: "0.8"
            }}>
              <div
              className="container"
              style={{ width: "38%", marginLeft: "31%", marginRight: "31%" }}
            >
              <div className = "jumbotron">
            <div style = {{textAlign: "center"}}>
                <h2>Sign Up</h2>
            </div>
            <Form onSubmit={handleSubmit(this.onSubmit)}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Usename</Form.Label>
                <Form.Control type="username" placeholder="Enter username" onChange ={(e) => { this.setState({ username : e.target.value }) }}/>

              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange ={(e) => { this.setState({ password : e.target.value }) }}/>
              </Form.Group>
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </Form>
          </div>
            </div>
          
        </div>

        </div>
      </div>
      


    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
    auth: state.auth.authenticated
  };
}





export default compose(
  connect(mapStateToProps, { signup }),
  reduxForm({
    form: 'signup'
  })
)(Signup);

