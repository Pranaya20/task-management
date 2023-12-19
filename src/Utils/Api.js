import axios from "axios";
import { addTask } from "../actions";

const API_URL = "http://localhost:5000/tasks"; // Replace with your JSON server URL

// Async action creator using redux-thunk
export const addTaskToServer = (task) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(API_URL, task);
      dispatch(addTask(task)); // Dispatch another action for local state update
      console.log('Task added to JSON server:', response.data);
    } catch (error) {
      console.error('Error adding task to JSON server:', error);
    }
  };
};