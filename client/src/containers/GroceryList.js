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
            emilio: 0,
            chris: 0,
            andrew: 0,
            merryle: 0,
            charles: 0,
            matthew: 0,
            amount: 0,
            total: 0,
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
            let total = params.get("total")
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
                            emilio: this.props.costSplit[0].ER,
                            chris: this.props.costSplit[0].CW,
                            andrew: this.props.costSplit[0].AL,
                            merryle: this.props.costSplit[0].MW,
                            charles: this.props.costSplit[0].CY,
                            matthew: this.props.costSplit[0].MR,
                            total: total
                        }, ()=> {
                            let total_amount = 0
                            this.state.grocery_list.map((item, index) => {
                                total_amount += item.price
                            })
                            this.setState({
                                amount: total_amount
                            })
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
                                        <th>Chris</th>
                                        <th>Andrew</th>
                                        <th>Merryle</th>
                                        <th>Charles</th>
                                        <th>Matthew</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>${this.state.toby}</th>
                                        <th>${this.state.michael}</th>
                                        <th>${this.state.john}</th>
                                        <th>${this.state.chibuzor}</th>
                                        <th>${this.state.emilio}</th>
                                        <th>${this.state.chris}</th>
                                        <th>${this.state.andrew}</th>
                                        <th>${this.state.merryle}</th>
                                        <th>${this.state.charles}</th>
                                        <th>${this.state.matthew}</th>
                                    </tr>

                                </tbody>
                            </Table>
                        </GeneralTemplate>
                    
                    </div>
                </div>
                <div className = "row">
                    <div className = "kjga-display-block col-lg-12">
                    <GeneralList name = "Grocery List" groceryList = {this.state.grocery_list}>
                        <div>
                        Total: {this.state.total}
                        </div>
                        <div>
                        Paid: {this.state.amount}
                        </div>
                        
                        
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
  