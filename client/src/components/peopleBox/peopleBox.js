import React, {Component} from "react";

class PeopleBox extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            data : ""
        }
    }

    renderPeople(){
        const people = this.props.data
        console.log(people, "this is people")
        return 
    }
    render() {
        return(
            <div>
                {this.renderPeople()}
                {this.props.children}
            </div>
        )
    }
}

export default PeopleBox