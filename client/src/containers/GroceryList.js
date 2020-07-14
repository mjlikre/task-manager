import React, { Component } from 'react';
import Navbar from "./../components/NavBar/index" 
import { connect } from "react-redux";
import GeneralList from "./../components/GeneralTable/GeneralList"
import GeneralTemplate from "./../components/GeneralTable/GeneralTemplate"
import GeneralButton from "./../components/Button/GeneralButton"
import {Table} from "react-bootstrap"
import { getSingleGroceryList, getCostSplit } from "./../actions"

class GroceryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grocery_list: [],
            id: "",
            toby: 0,
            michael: 0,
            john: 0,
            chibuzor: 0,
            emilio: 0
        };
    }
    componentDidMount () {
        const token = localStorage.getItem("token")
        if (!token) {
          this.props.history.push("/home")
        }
        else{
            let search = window.location.search;
            let params = new URLSearchParams(search);
            let id = params.get('id');
            this.setState({
                id: id
            }, () => {
                this.props.getSingleGroceryList(id, () => {                    
                    this.props.getCostSplit(id, ()=> {
                        this.setState({
                            grocery_list: [...this.props.grocery],
                            toby: this.props.costSplit[0].TC,
                            michael: this.props.costSplit[0].MJ,
                            john: this.props.costSplit[0].JC,
                            chibuzor: this.props.costSplit[0].CO,
                            emilio: this.props.costSplit[0].ER

                        })
                    })
                })
            })
        }
        
    }
    render() {
        if (this.state.grocery_list.length !== 0) {
            return (
                <div>
                    <Navbar navType = "grocery"/>
                    <div className = "row">
                    <div className = "kjga-display-block col-lg-12">
                        <GeneralTemplate name = "Split">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Toby</th>
                                        <th>Michael</th>
                                        <th>John</th>
                                        <th>Chibubu</th>
                                        <th>Emilio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>${this.state.toby}</th>
                                        <th>${this.state.michael}</th>
                                        <th>${this.state.john}</th>
                                        <th>${this.state.chibuzor}</th>
                                        <th>${this.state.emilio}</th>
                                    </tr>

                                </tbody>
                            </Table>
                        </GeneralTemplate>
                    
                    </div>
                </div>
                <div className = "row">
                    <div className = "kjga-display-block col-lg-12">
                    <GeneralList name = "Grocery List" groceryList = {this.state.grocery_list}>
                        <a href = {"/gle?id="+this.state.id + "&status=edit"}><GeneralButton buttonName = "Edit List" type = "primary"/></a>
                    </GeneralList>
                    </div>
                </div>
                    
                </div>
                
            )
        }
        else {
            return (
                <div>Error</div>
            )
        }
        
    }

}
function mapStateToProps(state) {
    return {
      grocery: state.grocery.oneGrocery,
      groceryError: state.grocery.oneGroceryError,
      costSplit: state.grocery.costSplit,
      costSplitError: state.grocery.costSplitError
    };
  }
  
export default connect(mapStateToProps, {
    getSingleGroceryList,
    getCostSplit
})(GroceryList);
  