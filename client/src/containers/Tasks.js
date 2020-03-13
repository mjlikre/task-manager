import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "./../components/NavBar";
import { Form, Button, Modal } from "react-bootstrap";
import { test, addTask, importTask } from "./../actions";
import monday from "./../images/2.jpg";

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      task_description: "",
      priority: "",
      due_date: "",
      task_list: [],
      show: false,
      showTask: false,
      index : ""
    };
  }
  componentDidMount() {
    this.props.importTask(() => {
      this.setState({ task_list: this.props.tasks });
    });
  }
  onSubmit() {
    const data = {
      task: this.state.task,
      description: this.state.task_description,
      priority: this.state.priority,
      due_date: this.state.due_date,
      completion_status: "uncompleted"
    };
    this.props.addTask(data, () => {
      this.setState({ task_list: this.props.tasks });
    });
    this.setState({ show: false });
  }
  handleCloseTask(){
    this.setState({showTask: false})
  }
  renderPopUp() {
    if (this.state.showTask){
      return (
        <Modal
          show={this.state.showTask}
          onHide={() => {
            this.handleCloseTask();
          }}
        >
          <Modal.Body>
            <span>{this.state.task_list[this.state.index].task_name} </span>
            <br />
            <br />
            <span>
            {this.state.task_list[this.state.index].task_description}
            </span>
            <br />
            <span>
            {this.state.task_list[this.state.index].priority}
            </span>
            <br></br>
            <span>
            {this.state.task_list[this.state.index].completion_status}
            </span>
          </Modal.Body>
        </Modal>
      );

    }
    
  }

  renderTasks() {
    if (this.state.task_list.length !== 0) {
      return this.state.task_list.map((item, index) => {
        return (
          <li className="list-group-item" >
            <div>Name: {item.task_name}</div>
            <div>Priority: {item.priority}</div>
            <div>Status: {item.completion_status}</div>
            <button className= "primary" onClick = {()=>{this.setState({index: index, showTask: true })}}>Click me</button>
          </li>
          
        );
      });
    } else {
      return (
        <div className="list-group-item">
          The tasks are still loading, have patience
        </div>
      );
    }
  }
  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <div>
        <NavBar />
        <div style={{ position: "relative" }}>
          <img
            src={monday}
            className="img-fluid"
            alt=""
            style={{ height: "100vh", width: "100vw" }}
          />
          <div
            style={{
              alignContent: "center",
              width: "100%",
              position: "absolute",
              top: "80px"
            }}
          >
            <div
              className="container"
              style={{ width: "38%", marginLeft: "31%", marginRight: "31%" }}
            >
              <div
                className="jumbotron"
                style={{ margin: "15px", width: "100%", textAlign: "center" }}
              >
                <h2>My Tasks</h2>
                <div>
                  <ol className="list-group list-group-flush text-dark">
                    {this.renderTasks()}
                  </ol>
                </div>

                <br />
                <br />
                <Button
                  variant="primary"
                  onClick={() => {
                    this.handleShow();
                  }}
                >
                  Add Tasks
                </Button>
              </div>
              <Modal
                show={this.state.show}
                onHide={() => {
                  this.handleClose();
                }}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Burden Yourself</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group controlId="formBasicText">
                      <Form.Label>Task</Form.Label>
                      <Form.Control
                        type="task"
                        placeholder="Task Name"
                        onChange={e => {
                          this.setState({ task: e.target.value });
                        }}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicText">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        onChange={e => {
                          this.setState({ task_description: e.target.value });
                        }}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                      <Form.Label>Priority</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Priority"
                        onChange={e => {
                          this.setState({ priority: e.target.value });
                        }}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicText">
                      <Form.Label>Due Date</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="xx/xx/xxxx"
                        onChange={e => {
                          this.setState({ due_date: e.target.value });
                        }}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => {
                      this.onSubmit();
                    }}
                  >
                    Add Task
                  </Button>
                </Modal.Footer>
              </Modal>
              {this.renderPopUp()}
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks.tasks,
    error: state.tasks.error
  };
}

export default connect(mapStateToProps, { test, addTask, importTask })(Tasks);
