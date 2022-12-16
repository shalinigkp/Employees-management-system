import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Designation = () => {
  const history = useNavigate();
  const [designation, setDesignation] = useState("");
  const submitDesignation = () => {
    const data = {
      designationName: designation,
    };
    console.log(data);
    axios
      .post("http://localhost:4000/api/addDesignation", data)
      .then(function (response) {
        console.log(response);
        if (response.data.status === "ok") {
          alert("Designation Added Successfully");
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
        <label>Enter Designation Name:</label>
        <input
          className="form-control"
          type="text"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
      </div>
      <div className="form-group mt-2 text-center">
        <input
          className="btn btn-primary"
          type="button"
          value="Save"
          onClick={submitDesignation}
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
export default Designation;
