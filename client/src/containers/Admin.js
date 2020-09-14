import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { GetAllCostSplit, getTotalBalance } from "./../actions/index";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 0,
      totalBalance: 0,
      secret: "moli",
      confirmed: false,
      total: null,
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/home");
    } else {
      let search = window.location.search;
      let params = new URLSearchParams(search);
      let secret = params.get("secret");
      if (secret === this.state.secret) {
        this.setState({ confirmed: true });
      }
      this.props.GetAllCostSplit(() => {
        this.props.getTotalBalance(() => {
          // console.log(this.props.totalBalance)

          this.setState(
            {
              data: this.props.costSplits,
              totalBalance: this.props.totalBalance,
            },
            () => {
              if (this.state.data.user === "TC") {
                this.setState({
                  username: "Toby",
                });
              } else if (this.state.data.user === "MJ") {
                this.setState({
                  username: "Michael",
                });
              } else if (this.state.data.user === "CO") {
                this.setState({
                  username: "Chibubu",
                });
              } else if (this.state.data.user === "JC") {
                this.setState({
                  username: "John",
                });
              } else if (this.state.data.user === "ER") {
                this.setState({
                  username: "Emilio",
                });
              } else if (this.state.data.user === "CW") {
                this.setState({
                  username: "Chris",
                });
              } else if (this.state.data.user === "MW") {
                this.setState({
                  username: "Merryle",
                });
              } else if (this.state.data.user === "CY") {
                this.setState({
                  username: "Joe",
                });
              } else if (this.state.data.user === "AL") {
                this.setState({
                  username: "Phillip",
                });
              } else if (this.state.data.user === "MR") {
                this.setState({
                  username: "Tony",
                });
              }
            }
          );
        });
      });
    }
  }

  renderPaymentBoxOs() {
    if (this.state.totalBalance !== 0) {
      return this.state.totalBalance.data.map((item, index) => {
        return (
          <tr>
            <th>{this.nameConversion(item[0])}</th>
            <th>{item[1][1]}</th>
            <th>{item[1][3]}</th>
            <th>{item[1][5]}</th>
            <th>{item[1][7]}</th>
            <th>{item[1][9]}</th>
            <th>{item[1][11]}</th>
            <th>{item[1][13]}</th>
            <th>{item[1][15]}</th>
            <th>{item[1][17]}</th>
            <th>{item[1][19]}</th>
            <th>
              {item[1][1] +
                item[1][3] +
                item[1][5] +
                item[1][7] +
                item[1][9] +
                item[1][11] +
                item[1][13] +
                item[1][15] +
                item[1][17] +
                item[1][19]}
            </th>
          </tr>
        );
      });
    }
  }

  nameConversion(name) {
    if (name === "TC") {
      return "Toby";
    } else if (name === "MJ") {
      return "Michael";
    } else if (name === "CO") {
      return "Chibubu";
    } else if (name === "JC") {
      return "John";
    } else if (name === "ER") {
      return "Emilio";
    } else if (name === "CW") {
      return "Chris";
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
    if (this.state.confirmed) {
      return (
        <div>
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="kjga-display-block col-lg-10">
              <div className="row">
                <div className="col-lg-12">
                  <h4>Balance Sheet</h4>
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Michael</th>
                        <th>Toby</th>
                        <th>Phillip</th>
                        <th>Emilio</th>
                        <th>John</th>
                        <th>Chibuzor</th>
                        <th>Merryle</th>
                        <th>Chris</th>
                        <th>Joe</th>
                        <th>Tony</th>
                        <th>Owes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.renderPaymentBoxOs()
                      } 
                    </tbody>
                    
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <br />
          <br />
          <br />
          <div>No access</div>
        </div>
      );
    }
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
})(Admin);
