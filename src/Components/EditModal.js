import React, { useState } from "react";
import { Dispatch, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { addTask } from "../actions";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function EditModal({ items }) {
  const API_URL = "http://localhost:5000/datalist";
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [inputData, setInputData] = useState({
    title: items.title,
    taskDescription: items.taskDescription,
  });
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const onChangeHandle = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleUpdateTask = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        title: inputData.title,
        taskDescription: inputData.taskDescription,
        status: selectedOption,
      });
      dispatch(addTask(response.data));
      console.log("Task updated on JSON server:", response.data);
    } catch (error) {
      console.error("Error updating task on JSON server:", error);
    }
    handleClose();
  };
  
  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Edit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
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
            onClick={() => handleUpdateTask(items.id)}
          >
            Update
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

export default EditModal;
