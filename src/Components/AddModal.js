import React, { useState } from "react";
import { Dispatch, useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { addTask } from "../actions";
import Modal from "react-bootstrap/Modal";
import { addTaskToServer } from "../Utils/Api";

import axios from "axios";

function AddModal() {
 
  const API_URL = "http://localhost:5000/datalist";
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    title: "",
    taskDescription: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
 
  
  const onChangeHandle = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleAddTask = () => {
    dispatch(addTask({ ...inputData, status: selectedOption }));
    try {
        const response =  axios.post(API_URL, { ...inputData, status: selectedOption });
        dispatch(addTask({ ...inputData, status: selectedOption })); 
        console.log('Task added to JSON server:', response.data);
      } catch (error) {
        console.error('Error adding task to JSON server:', error);
      }
    handleClose();
    addTaskToServer({ ...inputData, status: selectedOption })
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Task
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="form-group">
            <label>Title</label>
            <input
              type="text"
              class="form-control"
              id="title"
              name="title"
              placeholder="Enter the Title"
              value={inputData.title}
              onChange={onChangeHandle}
            />
          </div>
          <div class="form-group">
            <label>Task Description</label>
            <textarea
              value={inputData.taskDescription}
              class="form-control"
              id="taskDescription"
              rows="3"
              name="taskDescription"
              onChange={onChangeHandle}
            ></textarea>
          </div>
          <div class="form-group">
            <label>Status</label>
            <select
              id="dropdown"
              className="form-control"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="Completed">Select a Data</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            class="btn btn-success"
            onClick={handleAddTask}
          >
            Submit
          </Button>
          <Button
            variant="primary"
            onClick={handleClose}
            class="btn btn-danger"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddModal;
