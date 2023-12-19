import React, { useState, useEffect } from "react";
import Button from "../Components/Button";
import { useSelector } from "react-redux";
import { Wrapper } from "../style/TaskLIstStyle";
import AddModal from "../Components/AddModal";
import Filter from "../Components/Filter";
import EditModal from "../Components/EditModal";
import axios from "axios";
import { addTask } from "../actions";

const TaskList = () => {
  const [data, setData] = useState([]);
  const items = useSelector((state)=>state.AddTaskReducer.list)
  // console.log("items:-",items);
  const [filteredData, setFilteredData] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState("All");

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/datalist/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.log("error deleting item:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/datalist");
        setData(response.data);
      } catch (error) {
        console.log("error:-", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []); // Run only once during the initial render

  useEffect(() => {
   
    if (selectedStatus === "All") {
      setFilteredData(data);
    } else {
      // Otherwise, filter data based on the selected status
      setFilteredData(data.filter((item) => item.status === selectedStatus));
    }
  }, [data, selectedStatus]);

  const handleAddTask = async (newTask) => {
    try {
      // Make an API request to add the new task
      await axios.post("http://localhost:5000/datalist", newTask);

      // Refetch the data to get the updated list
      const response = await axios.get("http://localhost:5000/datalist");
      setData(response.data);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <Wrapper>
      <div className="task-maincontainer">
        <h3>Task List</h3>
        <Filter setSelectedStatus={setSelectedStatus} />
        <AddModal onAddTask={handleAddTask} />
      </div>
      <div className="table-style">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((items, key) => {
                return (
                  <tr key={key}>
                    <th scope="row">{items.id}</th>
                    <td>{items.title}</td>
                    <td>{items.taskDescription}</td>
                    <td className={items.status === "Pending" ? "pending-task" : "completed-task"}>
                      {items.status}
                    </td>
                    <td>
                      <EditModal items={items} />
                      <button type="button" className="btn btn-danger btn-edit" onClick={() => handleDelete(items.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <div className="empty-div">No Data Present with the Status</div>
            )}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default TaskList;