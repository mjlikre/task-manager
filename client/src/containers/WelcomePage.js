import React, { Component } from "react";
import NavBar from "./../components/NavBar";
import monday from "./../images/1.jpg"
import {Modal} from "react-bootstrap"

class Welcome extends Component {
    constructor(props){
        super(props)
        this.state = {
          show: true
        }
      }
    componentDidMount () {
        if (!this.state.show) {
            this.setState({show: true})
        } 
    }
    handleClose () {
        this.setState({show: false})
    }
    
    render(){
        return (
            
            <div >
                <NavBar navType = {[{name: "Home", href: "/home"}, {name: "Sign Up", href: "/signup"}, {name: "Sign In", href: "/signin"}, "Home"]}/>
                <div style = {{position: "relative"}}>
                    <img src={monday} className="img-fluid" alt="" style = {{height: "100vh", width: "100vw", position: "fixed"}}/>
                    
                </div>
                <Modal
              show={this.state.show}
              onHide={() => {
                this.handleClose();
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title >
                    Hey There
                    
                    </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <span>Welcome to MTM, Michael's Task Management! </span> 
                <br/>
                <br/>
                <span>If you wish to continue, please <a href= "/signin">Sign In</a> first.</span>
                <br/>
                <span>Or if you don't have an account, just <a href= "/signup">Sign Up</a>! </span>
                <br></br>
                <span>If you wish to contribute to this project, contact Michael Jiang!</span>
              </Modal.Body>
            </Modal>
                
            </div>
            
          );
    }
};

export default Welcome;