import React, { Component } from "react";
import Navbar from "./../components/NavBar/index";
import { connect } from "react-redux";
import GeneralTemplate from "./../components/GeneralTable/GeneralTemplate";
import GeneralButton from "./../components/Button/GeneralButton";
import { Form, Button, Modal, Table } from "react-bootstrap";
import {
  GetAllCostSplit,
  changePass,
  signout,
  getTotalBalance,
} from "./../actions/index";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 0,
      username: "",
      show: false,
      password: "",
      newpass: "",
      totalBalance: 0,
    };
  }
  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };
  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/home");
    } else {
      this.props.GetAllCostSplit(() => {
        this.setState(
          {
            data: this.props.costSplits,
          },
          () => {
            this.props.getTotalBalance(() => {
              // console.log(this.props.totalBalance)
              this.setState({
                totalBalance: this.props.totalBalance,
              });
            });
            if (this.state.data.user === "TC") {
              this.setState({
                username: "Toby Chen",
              });
            } else if (this.state.data.user === "MJ") {
              this.setState({
                username: "Michael Jiang",
              });
            } else if (this.state.data.user === "CO") {
              this.setState({
                username: "Chibubu",
              });
            } else if (this.state.data.user === "JC") {
              this.setState({
                username: "Rhodes Choi",
              });
            } else if (this.state.data.user === "ER") {
              this.setState({
                username: "Emilio Recinos",
              });
            } else if (this.state.data.user === "CW") {
              this.setState({
                username: "Chris Wong",
              });
            } else if (this.state.data.user === "MW") {
              this.setState({
                username: "Merryle Wang",
              });
            } else if (this.state.data.user === "CY") {
              this.setState({
                username: "Joe",
              });
            } else if (this.state.data.user === "AL") {
              this.setState({
                username: "Phillip Nham",
              });
            } else if (this.state.data.user === "MR") {
              this.setState({
                username: "Tony",
              });
            }
          }
        );
      });
    }
  }
  renderPayments() {
    if (this.state.data !== 0) {
      return this.state.data.results.map((item, index) => {
        let item_list = Object.entries(item);

        return (
          <tr>
            <th>{item_list[2][1]}</th>
            <th>{item_list[3][1]}</th>
            <th>{item_list[1][1]}</th>
            <th>{item_list[5][1]}</th>
          </tr>
        );
      });
    }
  }
  renderPaymentBoxO() {
    if (this.state.totalBalance !== 0) {
      console.log(this.state.totalBalance)
      return this.state.totalBalance.data.map((item, index) => {
        if (item[0] === this.state.data.user) {
          for (let i = 1; i < item[1].length; i += 2) {
            if (item[1][i] > 0) {
              return (
                <tr>
                  <th>{this.nameConversion(item[1][i - 1])}</th>
                  <th>{item[1][i]}</th>
                </tr>
              );
            }
          }
        }
      });
    }else{
        console.log("data can't be found")
    }
  }
  renderPaymentBoxOs() {
    if (this.state.totalBalance !== 0) {
      return this.state.totalBalance.data.map((item, index) => {
        if (item[0] !== this.state.data.user) {
          for (let i = 0; i < item[1].length; i += 2) {
            if (item[1][i] === this.state.data.user && item[1][i + 1] > 0) {
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
  onSubmit() {
    const data = {
      username: this.state.data.email,
      password: this.state.password,
      newpass: this.state.newpass,
    };
    this.props.changePass(data, this.props.history.push("/signout"));
  }
  render() {
    return (
      <div>
        <Navbar navType="grocery" />
        <div className="row">
          <div className="kjga-display-block col-lg-12">
            <GeneralTemplate name="Account Details">
              <div className="row">
                <div
                  className="col-lg-12"
                  style={{ padding: "20px 0 20px 20px" }}
                >
                  <h3>Hi, {this.state.username}</h3>
                </div>
                <div className="col-lg-12">
                  <h4>Basic detail</h4>
                  <Table>
                    <thead>
                      <tr>
                        <th>Shop Date</th>
                        <th>Total</th>
                        <th>You Pay</th>
                        <th>Pay To</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderPayments()}</tbody>
                  </Table>
                  <br />
                  <br />
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
                </div>
                <div className="col-lg-12">
                  <GeneralButton
                    type="primary"
                    buttonName="Change Password"
                    handleClick={() => {
                      this.handleShow();
                    }}
                  />
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
    );
  }
}
function mapStateToProps(state) {
  return {
    costSplits: state.grocery.allCostSplit,
    costSplitsError: state.grocery.allCostSplitError,
    totalBalance: state.grocery.totalBalance,
  };
}

export default connect(mapStateToProps, {
  GetAllCostSplit,
  changePass,
  signout,
  getTotalBalance,
})(Account);
