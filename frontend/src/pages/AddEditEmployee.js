import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

function AddEditEmployee() {
  const history = useNavigate();
  const location = useLocation();
  const { empData } = location.state;

  const [desgList, setDesgList] = useState([]);
  const [deptList, setDeptList] = useState([]);

  const [firstName, setFirstName] = useState(empData ? empData.firstName : "");
  const [lastName, setLastName] = useState(empData ? empData.lastName : "");
  const [dateOfBirth, setDateOfBirth] = useState(
    empData ? empData.dateOfBirth : ""
  );
  const [dateOfJoining, setDateOfJoining] = useState(
    empData ? empData.dateOfJoining : ""
  );
  const [salary, setSalary] = useState(empData ? empData.salary : "");
  const [designation, setDesignation] = useState(
    empData ? empData.designation : ""
  );
  const [department, setDepartment] = useState(
    empData ? empData.department : ""
  );

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/getDesignationList")
      .then(function (response) {
        setDesgList(response.data.desgList);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:4000/api/getDepartmentList")
      .then(function (response) {
        setDeptList(response.data.deptList);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const createRecord = () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      dateOfJoining: dateOfJoining,
      salary: salary,
      designation: designation,
      department: department,
    };
    console.log(data);
    axios
      .post("http://localhost:4000/api/addEmployee", data)
      .then(function (response) {
        console.log(response);
        if (response.data.status === "ok") {
          alert("Employee Added Successfully");
          history("/dashboard");
        } else {
          alert(response.data.error);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const updateRecord = () => {
    const data = {
      id: empData._id,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      dateOfJoining: dateOfJoining,
      salary: salary,
      designation: designation,
      department: department,
    };
    console.log(data);
    axios
      .post("http://localhost:4000/api/updateEmployee", data)
      .then(function (response) {
        console.log(response);
        if (response.data.status === "ok") {
          alert("Employee Updated Successfully");
          history("/dashboard");
        } else {
          alert(response.data.error);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const goBack = () => {
    history("/dashboard");
  };
  return (
    <div className="container">
      <h1 className="text-center">
        {empData ? "Update Employee" : "Add Employee"}
      </h1>
      <form>
        <div className="form-group">
          <label>First name:</label>
          <input
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            className="form-control"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date Of Birth</label>
          <input
            className="form-control"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date Of Joining</label>
          <input
            className="form-control"
            type="date"
            value={dateOfJoining}
            onChange={(e) => setDateOfJoining(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Salary</label>
          <input
            className="form-control"
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Designation</label>
          <select
            className="form-select"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          >
            {desgList.map((item) => {
              return (
                <option value={item.designationName}>
                  {item.designationName}
                </option>
              );
            })}
          </select>
        </div>

        <br />
        <div className="form-group">
          <label htmlFor="">Department</label>
          <select
            className="form-select"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            {deptList.map((item) => {
              return (
                <option value={item.departmentName}>
                  {item.departmentName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group mt-2 text-center">
          {empData ? (
            <input
              className="btn btn-primary"
              type="button"
              value="Update"
              onClick={updateRecord}
            />
          ) : (
            <input
              className="btn btn-primary"
              type="button"
              value="Create"
              onClick={createRecord}
            />
          )}
          <input
            className="btn btn-light"
            type="button"
            value="Cancel"
            onClick={goBack}
          />
        </div>
      </form>
    </div>
  );
}

export default AddEditEmployee;
