import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Department = () => {
  const history = useNavigate();
  const [department, setDepartment] = useState("");
  const submitDepartment = () => {
    const data = {
      departmentName: department,
    };
    console.log(data);
    axios
      .post("http://localhost:4000/api/addDepartment", data)
      .then(function (response) {
        console.log(response);
        if (response.data.status === "ok") {
          alert("Department Added Successfully");
          history("/dashboard");
        } else {
          alert(response.data.error);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="form-group">
        <label>Enter Department Name:</label>
        <input
          className="form-control"
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>
      <div className="form-group mt-2 text-center">
        <input
          className="btn btn-primary"
          type="button"
          value="Save"
          onClick={submitDepartment}
        />
        <input
          class="btn btn-light"
          type="button"
          value="Cancel"
          onClick={() => history("/dashboard")}
        />
      </div>
    </div>
  );
};
export default Department;
