import React, { Component } from 'react';
import Navbar from "./../components/NavBar/index" 
import { connect } from "react-redux";
import GeneralTemplate from "./../components/GeneralTable/GeneralTemplate"
import GeneralButton from "./../components/Button/GeneralButton" /* Takes in "type", "handleClick", "name" */
import { Table } from "react-bootstrap"
import { getSingleGroceryList, addNewItem, updateItem, deleteItem, createCostSplit, updateCostSplist, getCostSplit, addMultipleItems } from "./../actions"
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
            emilio: 0,
            chris: 0,
            andrew: 0,
            merryle: 0,
            charles: 0,
            matthew: 0,
            authenticated: false,
            amount: 0,
            paid: 0, 
            largeInputList: "",
            date: ""
        };
        this.newItemHandle = this.newItemHandle.bind(this)
        this.largeInputHandle = this.largeInputHandle.bind(this)
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
            let date = params.get("date").split("_")[0] + " " + params.get("date").split("_")[1]
            this.setState({
                id: id,
                status: status,
                date : date
            }, () => {
                this.props.getSingleGroceryList(id, () => {                    
                    this.props.getCostSplit(id, ()=> {
                        this.setState({
                            item_list: [...this.props.grocery],
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
                            authenticated: this.props.costSplit.authenticated
                        }, ()=> {
                            let total_amount = 0
                            let total_paid = 0
                            this.state.item_list.map((item, index)=> {
                                if (item.price > 0){
                                    total_amount += item.price
                                }
                                else{
                                    total_paid += (-item.price)
                                }
                            })
                            this.setState({
                                amount: total_amount,
                                paid: total_paid
                            })
                        })
                    })
                })
            })
        }
        
    }

    largeInputHandle() {
        let listString = this.state.largeInputList
        let id = this.state.id
        let data = {
            string: listString, 
            id: id
        }
        this.props.addMultipleItems(data, ()=> {
            this.setState({
                item_list : this.props.grocery
            }, ()=>{
                this.handleCostAllocation()
            })
        })
        
    }
    newItemHandle () {
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
            CW: 0,
            AL: 1,
            MW: 1,
            CY: 1,
            MR: 1,
            shareBetween: 9,
            ppp: (this.state.newItemPrice/9).toFixed(2)
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
        else if (person === "CW") {
            if (item_list[index].CW === 0) {
                item_list[index].CW = 1
                item_list[index].shareBetween ++
            }
            else {
                item_list[index].shareBetween --
                item_list[index].CW = 0
            }
        }
        else if (person === "AL") {
            if (item_list[index].AL === 0) {
                item_list[index].AL = 1
                item_list[index].shareBetween ++
            }
            else {
                item_list[index].shareBetween --
                item_list[index].AL = 0
            }
        }
        else if (person === "MW") {
            if (item_list[index].MW === 0) {
                item_list[index].MW = 1
                item_list[index].shareBetween ++
            }
            else {
                item_list[index].shareBetween --
                item_list[index].MW = 0
            }
        }
        else if (person === "CY") {
            if (item_list[index].CY === 0) {
                item_list[index].CY = 1
                item_list[index].shareBetween ++
            }
            else {
                item_list[index].shareBetween --
                item_list[index].CY = 0
            }
        }
        else if (person === "MR") {
            if (item_list[index].MR === 0) {
                item_list[index].MR = 1
                item_list[index].shareBetween ++
            }
            else {
                item_list[index].shareBetween --
                item_list[index].MR = 0
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
    handleLargeInput(value) {
        this.setState({
            largeInputList: value
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
                            <input defaultChecked = {this.state.item_list[index].CW === 1} type = "checkbox" onChange = {event => {this.handleShareBetween(index, "CW")}}/>
                        </th>
                        <th>
                            <input defaultChecked = {this.state.item_list[index].AL === 1} type = "checkbox" onChange = {event => {this.handleShareBetween(index, "AL")}}/>
                        </th>
                        <th>
                            <input defaultChecked = {this.state.item_list[index].MW === 1} type = "checkbox" onChange = {event => {this.handleShareBetween(index, "MW")}}/>
                        </th>
                        <th>
                            <input defaultChecked = {this.state.item_list[index].CY === 1} type = "checkbox" onChange = {event => {this.handleShareBetween(index, "CY")}}/>
                        </th>
                        <th>
                            <input defaultChecked = {this.state.item_list[index].MR === 1} type = "checkbox" onChange = {event => {this.handleShareBetween(index, "MR")}}/>
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
        let chris = 0
        let andrew = 0
        let merryle = 0
        let charles = 0
        let matthew = 0
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
            if (list[i].CW) {
                chris += parseFloat(list[i].ppp)
            }
            if (list[i].AL) {
                andrew += parseFloat(list[i].ppp)
            }
            if (list[i].MW) {
                merryle += parseFloat(list[i].ppp)
            }
            if (list[i].CY) {
                charles += parseFloat(list[i].ppp)
            }
            if (list[i].MR) {
                matthew += parseFloat(list[i].ppp)
            }
        }
        const data = {
            TC: toby,
            MJ: michael,
            JC: john,
            CO: chibuzor,
            ER: emilio,
            CW: chris,
            AL: andrew,
            MW: merryle,
            CY: charles,
            MR: matthew,
            id: this.state.id
        }
        this.props.updateCostSplist(data, () => {
            this.setState({
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
            })
        })
        
    }

    getPersonShare(person, input) {
        if (person === input) {
            return 1
        }
        else{
            return 0
        }
    }

    getName(person) {
        if (person === "TC") {
            return "Toby Payment"
        }
        else if(person === "MJ") {
            return "Michael Payment"
        }
        else if(person === "JC") {
            return "John Payment"
        }
        else if(person === "CO") {
            return "Chibuzor Payment"
        }
        else if(person === "CW") {
            return "Chris Payment"
        }
        else if(person === "AL") {
            return "Phillip Payment"
        }else if(person === "MW") {
            return "Merryle Payment"
        }else if(person === "CY") {
            return "Joe Payment"
        }else if(person === "MR") {
            return "Tony Payment"
        }else if(person === "ER") {
            return "Emilio Payment"
        }
    }

    handlePaidButton(amount, person) {
        const item = {
            id: this.state.id,
            index: uuid(),
            name: this.getName(person),
            price: amount,
            TC: this.getPersonShare("TC", person),
            MJ: this.getPersonShare("MJ", person),
            JC: this.getPersonShare("JC", person),
            CO: this.getPersonShare("CO", person),
            ER: this.getPersonShare("ER", person),
            CW: this.getPersonShare("CW", person),
            AL: this.getPersonShare("AL", person),
            MW: this.getPersonShare("MW", person),
            CY: this.getPersonShare("CY", person),
            MR: this.getPersonShare("MR", person),
            shareBetween: 1,
            ppp: amount
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

    renderPaidButton(amount, person){
        if (amount > 0) {
            return (
                <GeneralButton type = "primary" buttonName ="Pay" handleClick = {()=> {this.handlePaidButton(-amount, person)}}/>
            )
        }else {
            return (
                <GeneralButton type = "inactive" buttonName = "Paid"/>
            )
        }

    }

    render() {
        if (this.state.authenticated){
            return (
                <div class = "container">
                    {/* <Navbar navType = "grocery"/> */}
                    <div className = "row">
                        <div className = "kjga-display-block col-lg-12">
                            <GeneralTemplate name = "Split">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Toby</th>
                                            <th>Michael</th>
                                            <th>Rhodes</th>
                                            <th>Chibubu</th>
                                            <th>Emilio</th>
                                            <th>Chris</th>
                                            <th>Philip</th>
                                            <th>Mary</th>
                                            <th>Joe</th>
                                            <th>Tony</th>
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
                                        <tr>
                                            <th>{this.renderPaidButton(this.state.toby, "TC")}</th>
                                            <th>{this.renderPaidButton(this.state.michael, "MJ")}</th>
                                            <th>{this.renderPaidButton(this.state.john, "JC")}</th>
                                            <th>{this.renderPaidButton(this.state.chibuzor, "CO")}</th>
                                            <th>{this.renderPaidButton(this.state.emilio, "ER")}</th>
                                            <th>{this.renderPaidButton(this.state.chris, "CW")}</th>
                                            <th>{this.renderPaidButton(this.state.andrew, "AL")}</th>
                                            <th>{this.renderPaidButton(this.state.merryle, "MW")}</th>
                                            <th>{this.renderPaidButton(this.state.charles, "CY")}</th>
                                            <th>{this.renderPaidButton(this.state.matthew, "MR")}</th>
                                        </tr>
                                    </tbody>
                                </Table>
                            </GeneralTemplate>
                        
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "kjga-display-block col-lg-12">
                            <GeneralTemplate name = "Grocery List">
                                <div className = "row">
                                    <div>
                                        Total: {this.state.amount} |
                                    </div>
                                    <div>
                                        Paid: {this.state.paid}
                                    </div>
                                    <div>
                                        date: {this.state.date}
                                    </div>
                                </div>
                                
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
                                <div className = "row">
                                    <div className = "col-lg-6">
                                        <label className = "col-md-12">Large Input</label>
                                        <textarea className = "col-md-12 kjga-input-box"type = "text" onChange = {event => {this.handleLargeInput(event.target.value)}} value = {this.state.largeInputList}/> 
                                    </div>
                                    <div className = "col-lg-6">
                                        <br></br>
                                        <GeneralButton type = "primary" buttonName = "Add Large List" handleClick = {this.largeInputHandle}/>
                                    </div>
                                
                                </div>
                                
                                
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>/Person</th>
                                        <th>Toby</th>
                                        <th>Mike</th>
                                        <th>Rhodes</th>
                                        <th>Chib</th>
                                        <th>Emy</th>
                                        <th>Chris</th>
                                        <th>Phil</th>
                                        <th>Mary</th>
                                        <th>Joe</th>
                                        <th>Tony</th>
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
        else{ 
            return (
                <div class = "container">
                    <Navbar navType = "grocery"/>
                    <div className = "row">
                        <div className = "kjga-display-block col-lg-12">
                            <GeneralTemplate name = "User Unauthenticated">
                                <h1>Sorry, You can't edit this page</h1>
                            </GeneralTemplate>
                        
                        </div>
                    </div>
                </div>
                
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

export default connect(mapStateToProps, { getSingleGroceryList, addNewItem, updateItem, deleteItem, createCostSplit, updateCostSplist, getCostSplit, addMultipleItems })(GroceryListEdit)