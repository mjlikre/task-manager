import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { signin } from "../actions";
import { Redirect } from 'react-router-dom'
import { Form, Button } from "react-bootstrap"
import NavBar from "./../components/NavBar"
class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            redirect : false
        }

    }
    // undisable =  () => {
    //     if (this.state.disabled){
    //       this.setState({disabled: false})
    //     }
    //     document.getElementById("submit").style = {}; 
    // }

    // renderErrors = () => {
    //     if (this.props.errorMessage){
    //       return <div>{this.props.errorMessage}</div>
    //     }
      
    // }
    renderRedirect = () => {
        if (this.state.redirect || this.props.auth) {  
          return <Redirect to='/tasks' />
        }
    }
    signIn = () =>{
        const data = {
            username: this.state.username, 
            password: this.state.password
        }
        this.props.signin(data, () => {
            this.setState({redirect: true})
        });

    }

    render(){
        // if (this.state.email && this.state.password){
        //     this.undisable()
        // }
        return (
            <div className = "container">
                <NavBar navType = {[{name: "Home", href: "/home"}, {name: "Sign Up", href: "/signup"}, {name: "Sign In", href: "/signin"}, "Sign In"]}/>
                <div className = "row" style = {{marginTop: "80px"}}>
                    {this.renderRedirect()}
                    <div className = "col-md-4"></div>
                    <div className = "col-md-4">
                        <div className = "jumbotron">
                            <div style = {{textAlign: "center"}}>
                                <h2>Sign In</h2>
                            </div>
                            
                            <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="username" placeholder="Enter email" onChange ={(e) => { this.setState({ username : e.target.value }) }}/>

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange ={(e) => { this.setState({ password : e.target.value }) }}/>
                            </Form.Group>
                            <Button variant="primary" onClick={()=>{this.signIn()}}>
                                Sign In
                            </Button>
                            </Form>
                        </div>
                    </div>

                </div>
            </div>
            
    );
    }
    
};
function mapStateToProps(state) {
    return { 
        errorMessage: state.auth.errorMessage,
        auth: state.auth.authenticated
     };
}
export default compose(
    connect(mapStateToProps, { signin })
)(Login);
