import React from 'react';


const NavBar = () => {


    return (
        <div>
            <nav className="navbar navbar-light bg-light" >
                <form className="form-inline" style={{marginLeft: "25%", marginRight: "25%"}}>
                    <button className="btn btn-outline-success" type="button" ><a href="/task">View Tasks</a></button>
                    <button className="btn btn-outline-success" type="button"><a href="/addTasks">Add Tasks</a></button>
                    <button className="btn btn-outline-success" type="button"><a href="/signout">Exit</a></button>
                </form>
            </nav>

        </div>
    );
};

export default NavBar;
