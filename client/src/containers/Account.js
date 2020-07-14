import React, {Component} from "react";
import Navbar from "./../components/NavBar/index" 
import { connect } from "react-redux";
import GeneralTemplate from "./../components/GeneralTable/GeneralTemplate"
import GeneralButton from "./../components/Button/GeneralButton"
import { Form, Button, Modal } from "react-bootstrap";
import {  GetAllCostSplit, changePass, signout } from "./../actions/index"

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 0,
            username: "",
            show: false,
            password: "",
            newpass: ""
        }
    }
    handleClose = () => {
        this.setState({ show: false });
      };
    handleShow = () => {
        this.setState({ show: true });
    };
    componentDidMount(){
        if (!localStorage.getItem("token")) {
            this.props.history.push("/home")
        }else{

            this.props.GetAllCostSplit(()=> {
                this.setState({
                    data: this.props.costSplits
                }, ()=> {
                    if (this.state.data.user === "TC") {
                        this.setState({
                            username: "Toby Chen"
                        })
                    }else if (this.state.data.user === "MJ") {
                        this.setState({
                            username: "Michael Jiang"
                        })
                    }else if (this.state.data.user === "CO") {
                        this.setState({
                            username: "Chibubu"
                        })
                    }else if (this.state.data.user === "JC") {
                        this.setState({
                            username: "Rhodes Choi"
                        })
                    }else if (this.state.data.user === "ER") {
                        this.setState({
                            username: "Emilio Recinos"
                        })
                    }else if (this.state.data.user === "CW") {
                        this.setState({
                            username: "Chris Wong"
                        })
                    }else if (this.state.data.user === "MW") {
                        this.setState({
                            username: "Merryle Wang"
                        })
                    }else if (this.state.data.user === "CY") {
                        this.setState({
                            username: "Charles Yang"
                        })
                    }else if (this.state.data.user === "AL") {
                        this.setState({
                            username: "Andrew Law"
                        })
                    }else if (this.state.data.user === "MR") {
                        this.setState({
                            username: "Matthew Robberts"
                        })
                    }
                })
            })
        }
        
    }
    onSubmit() {
        const data = {
            username: this.state.data.email,
            password: this.state.password,
            newpass: this.state.newpass
        }
        this.props.changePass(data, this.props.history.push("/signout"))
    }
    render(){
        return (
            <div>
                <Navbar navType = "grocery"/>
                <div className = "row">
                    <div className = "kjga-display-block col-lg-12">
                        <GeneralTemplate name = "Account Details">
                            <div className = "row">
                                <div className = "col-lg-12" style = {{padding: "20px 0 20px 20px"}}>
                                    <h3>Hi, {this.state.username}</h3>
                                </div>
                                <div className = "col-lg-12" style = {{padding: "20px 0 20px 20px"}}>
                                    <h3>Your Total Balance is: {this.state.data.total}</h3>
                                </div>
                                <div className = "col-lg-12">
                                    <GeneralButton type = "primary" buttonName = "Change Password" handleClick = {()=>{this.handleShow()}}/>
                                </div>
                                
                            </div>
                            
                            
                        </GeneralTemplate>
                        
                    </div>
                    
                </div>
                <Modal
                show={this.state.show}
                onHide={() => {
                  this.handleClose();
                }}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Label>{this.state.data.email}</Form.Label>
      
                    <Form.Group controlId="formBasicText">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder=""
                        onChange={(e) => {
                          this.setState({ password: e.target.value });
                        }}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder=""
                        onChange={(e) => {
                          this.setState({ newpass: e.target.value });
                        }}
                      />
                    </Form.Group>
      
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => {
                      this.onSubmit();
                    }}
                    
                  >
                    Change Password
                  </Button>
                </Modal.Footer>
              </Modal>
                

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        costSplits: state.grocery.allCostSplit, 
        costSplitsError: state.grocery.allCostSplitError
    };
  }

export default connect(mapStateToProps, { GetAllCostSplit, changePass, signout })(Account)