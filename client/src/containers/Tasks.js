import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "./../components/NavBar";
import { Form, Button, Modal } from "react-bootstrap";
import { test } from "./../actions";

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      task_description: "",
      task_list: [],
      show: false
    };
  }
  onSubmit = () => {
    this.props.test();
  };
  //   renderTasks = () => {
  //     this.state.task_list.map(item=>{
  //         console.log(item)
  //     })

  //   }
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
                  <Form.Group controlId="formBasicEmail">
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
                        this.setState({ description: e.target.value });
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
                      this.handleClose()
                    }}
                  >Add Task</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ counter }) {
  return { counter: counter.counter };
}

export default connect(mapStateToProps, { test })(Tasks);
