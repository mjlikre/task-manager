import React, { Component } from "react";
import {Table} from "react-bootstrap";
import "./General.css";

class GeneralList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item_list: [],
    };
  }
  componentDidMount () {
    console.log(this.props.groceryList)
    this.setState({ 
      item_list: this.props.groceryList
    })
  }
  renderItem() {
    if (this.state.item_list.length !== 0) {
      return this.state.item_list.map((item, index) => {
        return (
          <tr>
                <th> *</th>
                <th>{item.item}</th>
                <th>{item.price}</th>
                <th>{item.ppp}</th>
          </tr>
        );
      });
    } else {
      return <tr><th>There's nothing for you here</th></tr>
    }
  }
  render() {
    return (
      <div className="kjga-wrapper">
        <div className="kjga-outer-container">
          <div className="container kjga-container">
            <div className="jumbotron kjga-box">
              <h2>{this.props.name}</h2>
              {this.props.children}
              <div className="row container">
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Price/Person</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderItem()}
                    </tbody>

                </Table>
                  
                </div>
              <br />
              <br />
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GeneralList;
