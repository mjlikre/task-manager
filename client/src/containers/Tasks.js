import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "./../components/NavBar";
import { Form, Button, Modal } from "react-bootstrap";
import { test, addTask, importTask } from "./../actions";

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      task_description: "",
      priority: "",
      due_date: "",
      task_list: [],
      show: false
    };
  }
  componentDidMount () {
    this.props.importTask(()=>{
        this.setState({ task_list: this.props.tasks });
    })
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
  renderTasks ()  {
    if (this.state.task_list.length !== 0){ 
        return this.state.task_list.map(item => {
            return(
                <li className="list-group-item">
                    <div>
                        Name: {item.task_name}
                    </div>
                    <div>
                        Description: {item.task_description}
                    </div>
                    <div>
                        Due Date: {item.due_date}
                    </div>
                    <div>
                        Priority: {item.priority}
                    </div>
                    <div>
                        Status: {item.completion_status}
                    </div>
              </li>
            )
        });
    }
    else{
        return(
          <div className="list-group-item">The tasks are still loading, have patience</div>
        )
      }
    

  };
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
        <div style={{ alignContent: "center", display: "block" }}>
          <div
            className="row"
            style={{ width: "50%", marginLeft: "25%", marginRight: "25%" }}
          >
            <div
              className="jumbotron"
              style={{ margin: "15px", width: "100%", textAlign: "center" }}
            >
              <h2>My Tasks</h2>
              <ol className="list-group list-group-flush text-dark">
                    {this.renderTasks()}
                </ol>
              <Button
                variant="primary"
                onClick={() => {
                  this.handleShow();
                }}
              >
                Add Tasks
              </Button>

              {/* <Button
                variant="primary"
                onClick={() => {
                  this.onSubmit()
                }}
              >
                test
              </Button> */}
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
                    //   this.handleClose()
                  }}
                >
                  Add Task
                </Button>
              </Modal.Footer>
            </Modal>
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
