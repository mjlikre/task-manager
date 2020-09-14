import React, { Component } from "react";
import { connect } from "react-redux";
import {  Table } from "react-bootstrap";
import { GetAllCostSplit, getTotalBalance } from "./../actions/index";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 0,
      totalBalance: 0,
    };
  }

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
      return this.state.totalBalance.data.map((item, index) => {
        if (item[0] === this.state.data.user) {
          return item[1].map((person, personIndex) => {
            if (!isNaN(person) && person > 0) {
              return (
                <tr>
                  <th>{this.nameConversion(item[1][personIndex - 1])}</th>
                  <th>{item[1][personIndex]}</th>
                </tr>
              );
            }
          });
        }
      });
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

  render() {
    return (
      <div>
        
        <div className="row">
            <div className = "col-lg-3"></div>
          <div className="kjga-display-block col-lg-6">
              <div className="row">
                <div
                  className="col-lg-12"
                  style={{ padding: "20px 0 20px 20px" }}
                >
                  <h3>Hi, {this.state.username}</h3>
                </div>
                <div className="col-lg-12">
                  <h4>Latest Shopping Detail</h4>
                  <Table striped bordered hover>
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
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th className="paymentTable">Person</th>
                        <th className="paymentTable">Amount</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderPaymentBoxO()}</tbody>
                  </Table>
                  <h4>Who owes you</h4>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th className="paymentTable">Person</th>
                        <th className="paymentTable">Amount</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderPaymentBoxOs()}</tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
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
  getTotalBalance,
})(Dashboard);
