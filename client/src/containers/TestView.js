import React, { Component } from "react"; 
import BottomBox from "./../components/bottomBox/bottomBox"
import PeopleBox from "./../components/peopleBox/peopleBox"
class TestView extends Component {
    constructor (props) {
        super(props); 
        this.state = {
            data : { 
                containers: {
                    car: {
                        _id: "car",
                        name: "car",
                        size: 3
                    }
                },
                items: {
                    michael: {
                        _id: 'michael', 
                        name: "michael", 
                        size : 1
                    },
                    chibuzor: {
                        _id: "chibuzor",
                        name: "chibuzor",
                        size: 1
                    }
                }
            }
        }
    }

    render () {
        return (
            <div>
                Hello
                <BottomBox class = "none" data = "none"><PeopleBox data = {this.state.data}>we don't usually do this, but here we are</PeopleBox></BottomBox>
                
            </div>
        )
    }
}

export default TestView