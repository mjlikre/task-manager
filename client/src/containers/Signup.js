import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { signup } from "../actions";
import { Form, Button } from "react-bootstrap"
import { Redirect } from 'react-router-dom'

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
      return <Redirect to='/tasks' />
    }
  }

  render() {

    const { handleSubmit } = this.props;
    return (

      <div className = "row">
        {this.renderRedirect()}
        <div className = "col-md-4"></div>
        <div className = "col-md-4">
          <div className = "jumbotron">
            <Form onSubmit={handleSubmit(this.onSubmit)}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="username" placeholder="Enter email" onChange ={(e) => { this.setState({ username : e.target.value }) }}/>

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

