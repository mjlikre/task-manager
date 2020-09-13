import React, { Component } from "react";
import Navbar from "./../components/NavBar/index";
import { connect } from "react-redux";
import GeneralTalbe from "./../components/GeneralTable/GeneralTable";
import GeneranButton from "./../components/Button/GeneralButton";
import { Form, Button, Modal, Table } from "react-bootstrap";
import { createNewGroceryList, getAllGroceryList, createCostSplit, test, getTotalBalance, getUserName } from "./../actions";
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GeneralTemplate from "../components/GeneralTable/GeneralTemplate";
class GroceryOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      store_name: "",
      total: 0,
      date: "",
      show: false,
      payto: "",
      redirect: false,
      id: "",
      grocery_list: false,
      startDate: "",
      totalBalance: 0,
      userName: ""
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("token")
    if (!token) {
      this.props.history.push("/home")
    }
    else{
      this.props.getAllGroceryList(() => {
        this.props.getTotalBalance( ()=> {
          this.props.getUserName(() => {
            this.setState(
              {
                data: this.props.costSplits,
                totalBalance: this.props.totalBalance,
                grocery_list: this.props.grocery,
                userName: this.props.username
              })
            })
            
          })
        })
      }
  }
  renderPaymentBoxO() {
    if (this.state.totalBalance !== 0) {
        return this.state.totalBalance.data.map((item, index) => {
            if (item[0] === this.state.userName.data) {
              return item[1].map((person, personIndex) => {
                  if (!isNaN(person) && person > 0){
                    return (
                        <tr>
                            <th>{this.nameConversion(item[1][personIndex-1])}</th>
                            <th>{item[1][personIndex]}</th>
                        </tr>
                    )
                  }
              })
            }
        });
    }
  }
  renderPaymentBoxOs() {
    if (this.state.totalBalance !== 0) {
      console.log(this.state.userName.data)
      return this.state.totalBalance.data.map((item, index) => {
        if (item[0] !== this.state.userName.data) {
          for (let i = 0; i < item[1].length; i += 2) {
            if (item[1][i] === this.state.userName.data && item[1][i + 1] > 0) {
              return (
                <tr>
                  <th>{this.nameConversion(item[0])}</th>
                  <th>{item[1][i + 1]}</th>
                </tr>
              );
            }
          }
        }
      });
    }
  }
  nameConversion(name) {
    if (name === "TC") {
      return "Toby Chen";
    } else if (name === "MJ") {
      return "Michael Jiang";
    } else if (name === "CO") {
      return "Chibubu";
    } else if (name === "JC") {
      return "John Choi";
    } else if (name === "ER") {
      return "Emilio";
    } else if (name === "CW") {
      return "Chris Wong";
    } else if (name === "AL") {
      return "Phillip";
    } else if (name === "MR") {
      return "Tony";
    } else if (name === "MW") {
      return "Merryle";
    } else if (name === "CY") {
      return "Joe";
    }
  }
  handleDateChange = date => { 
    
    this.setState ({
      startDate: date
    }, ()=> {
      let timestamp = Date.parse(date)
      let thedate = new Date(timestamp)
      let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
      let day = thedate.getDate()
      let monthNum = thedate.getMonth()
      let year = thedate.getFullYear()
      let dateString = month[monthNum] + " " + day + ", " + year
      this.setState({
        date: dateString
      })

    })
  }
  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };
  onSubmit(callback) {
    const data = {
      shopper: this.state.name,
      store: this.state.store_name,
      total: this.state.total,
      date: this.state.date,
      payto: this.state.payto
    };
    this.props.createNewGroceryList(data, () => {
      this.setState({
        id: this.props.newGrocery[0].id,
      }, () => { 
        this.props.createCostSplit(this.state.id)
      });
      
    });
    this.setState({
      show: false,
      redirect: true,
    });
  }
  renderRedirect = () => {
    if (this.state.redirect && this.state.id) {
      let url = "/gle?id=" + this.state.id + "&status=new&total=" + this.state.total;
      return <Redirect to={url}/>;
    }
  };


  render() {
      if (this.state.grocery_list) {
        return (
          
            <div className = "container">
              {this.renderRedirect()}
              <div className = "row">
                    <div className = "kjga-display-block col-lg-12">
              <Navbar navType="grocery" />
              <GeneralTalbe name="Grocery Overview" itemList = {this.state.grocery_list}>
                <GeneranButton
                  buttonName="Add New List"
                  type="primary"
                  handleClick={() => {
                    this.handleShow();
                  }}
                />
              </GeneralTalbe>
              <GeneralTemplate name = "Balance Sheet">
                  <h4>Who you owe</h4>
                  <Table>
                    <thead>
                      <tr>
                        <th className="paymentTable">Person</th>
                        <th className="paymentTable">Amount</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderPaymentBoxO()}</tbody>
                  </Table>
                  <h4>Who owes you</h4>
                  <Table>
                    <thead>
                      <tr>
                        <th className="paymentTable">Person</th>
                        <th className="paymentTable">Amount</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderPaymentBoxOs()}</tbody>
                  </Table>

              </GeneralTemplate>
      
              <Modal
                show={this.state.show}
                onHide={() => {
                  this.handleClose();
                }}
              >
                <Modal.Header closeButton>
                  <Modal.Title>New List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group controlId="formBasicText">
                      <Form.Label>Shopper</Form.Label>
                      <Form.Control
                        type="grocery"
                        placeholder="Shopper's name"
                        onChange={(e) => {
                          this.setState({ name: e.target.value });
                        }}
                      />
                    </Form.Group>
      
                    <Form.Group controlId="formBasicText">
                      <Form.Label>Store</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Store Name"
                        onChange={(e) => {
                          this.setState({ store_name: e.target.value });
                        }}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                      <Form.Label>Total</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Total $$"
                        onChange={(e) => {
                          this.setState({ total: e.target.value });
                        }}
                      />
                    </Form.Group>
      
                    <Form.Group controlId="formBasicText">
                      <Form.Label>Date: </Form.Label>
                      <div>
                      <DatePicker
                        selected={this.state.startDate}
                        onChange= {this.handleDateChange}
                      />
                      </div>
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                      <Form.Label>Pay To</Form.Label>
                      
                      <Form.Control
                        type="text"
                        placeholder="Person who paid for this"
                        onChange={(e) => {
                          this.setState({ payto: e.target.value });
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
                    Add List
                  </Button>
                </Modal.Footer>
              </Modal>
              </div>
              </div>
            </div>
          );
      }
      else{
          return(
              <h1> Loading </h1>
          )
      }
   
  }
}
function mapStateToProps(state) {
  return {
    grocery: state.grocery.allGrocery,
    newGrocery: state.grocery.newGrocery,
    newGroceryError: state.grocery.newGroceryError,
    groceryError: state.grocery.allGroceryError,
    totalBalance: state.grocery.totalBalance,
    username: state.auth.username
  };
}

export default connect(mapStateToProps, {
  createNewGroceryList,
  getAllGroceryList,
  createCostSplit,
  test,
  getTotalBalance,
  getUserName
})(GroceryOverview);
