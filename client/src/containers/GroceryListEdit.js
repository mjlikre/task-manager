import React, { Component } from 'react';
import Navbar from "./../components/NavBar/index" 
import { connect } from "react-redux";
import GeneralTemplate from "./../components/GeneralTable/GeneralTemplate"
import GeneralButton from "./../components/Button/GeneralButton" /* Takes in "type", "handleClick", "name" */
import { Table } from "react-bootstrap"
import { getSingleGroceryList, addNewItem, updateItem, deleteItem, createCostSplit, updateCostSplist, getCostSplit } from "./../actions"
import uuid from "react-uuid"
import "./../styling/main.css"

class GroceryListEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : "",
            status: "",
            newItem: "",
            newItemPrice : 0,
            item_index: 0,
            item_list: [],
            toby: 0,
            michael: 0,
            john: 0,
            chibuzor: 0,
            emilio: 0
        };
        this.newItemHandle = this.newItemHandle.bind(this)
        // this.handleShareBetween = this.handleShareBetween.bind(this)
      }
    componentDidMount () {
        const token = localStorage.getItem("token")
        if (!token) {
          this.props.history.push("/home")
        }
        else {
            let search = window.location.search;
            let params = new URLSearchParams(search);
            let id = params.get('id');
            let status = params.get("status")
            this.setState({
                id: id,
                status: status
            }, () => {
                this.props.getSingleGroceryList(id, () => {                    
                    this.props.getCostSplit(id, ()=> {
                        this.setState({
                            item_list: [...this.props.grocery],
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
    newItemHandle () {
        // let items = [...this.state.item_list]
        const item = {
            id: this.state.id,
            index: uuid(),
            name: this.state.newItem,
            price: this.state.newItemPrice,
            TC: 1,
            MJ: 1,
            JC: 1,
            CO: 1,
            ER: 1,
            shareBetween: 5,
            ppp: (this.state.newItemPrice/5).toFixed(2)
        }
        // items.push(item)
        this.props.addNewItem(item, ()=>{
            this.setState({
                item_list: this.props.grocery,
                newItem: "", 
                newItemPrice: 0,
                item_index: this.state.item_index + 1
            },()=>{
                this.handleCostAllocation()
            })
        })
    }
    handleItemNameInput (value) {
        this.setState({
            newItem : value
        })
    }
    handleItemPriceInput (value) {
        this.setState({
            newItemPrice : value
        })
    }
    handleShareBetween (index, person, done) {
        let item_list = [...this.state.item_list]
        if (person === "TC") {
            
            if (item_list[index].TC === 0) {
                item_list[index].TC = 1
                item_list[index].shareBetween ++
            }
            else {
                item_list[index].shareBetween --
                item_list[index].TC = 0
            }
        }
        else if(person === "MJ") {
            
            if (item_list[index].MJ === 0) {
                item_list[index].MJ = 1
                item_list[index].shareBetween ++
            }
            else {
                item_list[index].shareBetween --
                item_list[index].MJ = 0
            }
        }
        else if (person === "JC") {
            
            if (item_list[index].JC === 0) {
                item_list[index].JC = 1
                item_list[index].shareBetween ++
            }
            else {
                item_list[index].shareBetween --
                item_list[index].JC = 0
            }
        }
        else if (person === "CO") {
            
            if (item_list[index].CO === 0) {
                item_list[index].CO = 1
                item_list[index].shareBetween ++
            }
            else {
                item_list[index].shareBetween --
                item_list[index].CO = 0
            }
        }
        else if (person === "ER") {
            
            if (item_list[index].ER === 0) {
                item_list[index].ER = 1
                item_list[index].shareBetween ++
            }
            else {
                item_list[index].shareBetween --
                item_list[index].ER = 0
            }
        }
        item_list[index].ppp = (parseFloat(item_list[index].price) / parseFloat(item_list[index].shareBetween)).toFixed(2)

        this.props.updateItem(item_list[index], () => {
            this.setState({
                item_list: this.props.grocery
            }, ()=> {this.handleCostAllocation()})
        })
        
        // this.setState({
        //     item_list : item_list
        // }, ()=> {this.handleCostAllocation()})
        
    }
    handleDelete(index) {
        let item_list = [...this.state.item_list]
        console.log(item_list, index)
        const data = {
            index: item_list[index].id,
            id: item_list[index].grocery_list_id
        }
        item_list.splice(index, 1)
        this.props.deleteItem(data, () => {
            this.setState({
                item_list : this.props.grocery
            }, () => {this.handleCostAllocation()})
        })
        

    }
    renderNewItems() {
        if (this.state.item_list.length !== 0) {
            return this.state.item_list.map ((item, index) => {
                return (
                    <tr>
                        <th>{index+1}</th>
                        <th>{item.item}</th>
                        <th>${item.price}</th>
                        <th>${item.ppp}</th>
                        <th>
                            <input defaultChecked = {this.state.item_list[index].TC === 1} type = "checkbox" onChange = {event => {this.handleShareBetween(index, "TC")}}/>
                        </th>
                        <th>
                            <input defaultChecked = {this.state.item_list[index].MJ === 1} type = "checkbox" onChange = {event => {this.handleShareBetween(index, "MJ")}}/>
                        </th>
                        <th>
                            <input defaultChecked = {this.state.item_list[index].JC === 1} type = "checkbox" onChange = {event => {this.handleShareBetween(index, "JC")}}/>
                        </th>
                        <th>
                            <input defaultChecked = {this.state.item_list[index].CO === 1} type = "checkbox" onChange = {event => {this.handleShareBetween(index, "CO")}}/>
                        </th>
                        <th>
                            <input defaultChecked = {this.state.item_list[index].ER === 1} type = "checkbox" onChange = {event => {this.handleShareBetween(index, "ER")}}/>
                        </th>
                        <th>
                            <button className = "cancel-button" onClick = {()=>{this.handleDelete(index)}}>X</button>
                        </th>
                    </tr>
                )

            })
        }
    }
    handleCostAllocation () {
        const list = [...this.state.item_list]
        let michael = 0
        let toby = 0
        let john = 0
        let chibuzor = 0
        let emilio = 0
        for (let i = 0; i < list.length; i ++) {
            if (list[i].TC) {
                toby += parseFloat(list[i].ppp)
            }
            if (list[i].MJ) {
                michael += parseFloat(list[i].ppp)
            }
            if (list[i].JC) {
                john += parseFloat(list[i].ppp)
            }
            if (list[i].CO) {
                chibuzor += parseFloat(list[i].ppp)
            }
            if (list[i].ER) {
                emilio += parseFloat(list[i].ppp)
            }
        }
        const data = {
            TC: toby,
            MJ: michael,
            JC: john,
            CO: chibuzor,
            ER: emilio,
            id: this.state.id
        }
        this.props.updateCostSplist(data, () => {
            this.setState({
                toby: this.props.costSplit[0].TC,
                michael: this.props.costSplit[0].MJ,
                john: this.props.costSplit[0].JC,
                chibuzor: this.props.costSplit[0].CO,
                emilio: this.props.costSplit[0].ER
            })
        })
        
    }
    render() {
        return (
            <div class = "container">
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
                        <GeneralTemplate name = "New List">
                            <div className = "row">
                                <div className = "col-md-3">
                                    <label className = "col-md-12">Item Name</label>
                                    <input className = "col-md-12 kjga-input-box"type = "text" onChange = {event => {this.handleItemNameInput(event.target.value)}} value = {this.state.newItem}/> 
                                </div>
                                <div className = "col-md-3">
                                    <label className = "col-md-12">Item Price</label>
                                    <input className = "col-md-12 kjga-input-box" type = "number" value = {this.state.newItemPrice} onChange = {event => {this.handleItemPriceInput(event.target.value)}}/>
                                </div>
                                <div className = "col-md-3">
                                    <div className = "col-md-12"><br></br> </div>
                                    <div className = "col-md-12">
                                        <GeneralButton type = "primary" buttonName ="ADD" handleClick ={this.newItemHandle}/>
                                    </div>
                                    
                                </div>

                            </div>
                            
                            
                            
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Price/Person</th>
                                        <th>TC</th>
                                        <th>MJ</th>
                                        <th>JC</th>
                                        <th>CO</th>
                                        <th>ER</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderNewItems()}
                                </tbody>
                            </Table>
                            
                            
                            
                                

                            
                        </GeneralTemplate>
                    </div>
                </div>
                
                
            </div>
            
        )
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

export default connect(mapStateToProps, { getSingleGroceryList, addNewItem, updateItem, deleteItem, createCostSplit, updateCostSplist, getCostSplit })(GroceryListEdit)