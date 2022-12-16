import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

const DashBoard = () => {
  const history = useNavigate();
  const [empList, setEmpList] = useState([]);
  const [filteredEmpList, setFilteredEmpList] = useState([]);
  const [desgList, setDesgList] = useState([]);
  const [deptList, setDeptList] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedDesg, setSelectedDesg] = useState("");
  const [fromSalary, setFromSalary] = useState("");
  const [toSalary, setToSalary] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      history("/");
    }

    axios
      .get("http://localhost:4000/api/getEmployeeList")
      .then(function (response) {
        // console.log(response.data.employeeList[0])
        setEmpList(response.data.employeeList);
        setFilteredEmpList(response.data.employeeList);
      })
      .catch(function (error) {
        console.log(error);
      });

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

  const filteredData = () => {
    if (
      selectedDept != "" &&
      selectedDesg != "" &&
      fromSalary != "" &&
      toSalary != ""
    ) {
      const filteredData = empList.filter((i) => {
        return (
          i.department == selectedDept &&
          i.designation == selectedDesg &&
          parseInt(i.salary) >= parseInt(fromSalary) &&
          parseInt(i.salary) <= parseInt(toSalary)
        );
      });
      setFilteredEmpList(filteredData);

    } else if (selectedDept != "" && selectedDesg != "") {
      const filteredData = empList.filter((i) => {
        return i.department == selectedDept && i.designation == selectedDesg;
      });
      setFilteredEmpList(filteredData);

    } else if (selectedDept != "" && fromSalary != "" && toSalary != "") {
      const filteredData = empList.filter((i) => {
        return (
          i.department == selectedDept &&
          parseInt(i.salary) >= parseInt(fromSalary) &&
          parseInt(i.salary) <= parseInt(toSalary)
        );
      });
      setFilteredEmpList(filteredData);

    } else if (selectedDesg != "" && fromSalary != "" && toSalary != "") {
      const filteredData = empList.filter((i) => {
        return (
          i.designation == selectedDesg &&
          parseInt(i.salary) >= parseInt(fromSalary) &&
          parseInt(i.salary) <= parseInt(toSalary)
        );
      });
      setFilteredEmpList(filteredData);

 }
 else if (selectedDesg == "" && selectedDept=="" && fromSalary == "" && toSalary == "") {
  
  setFilteredEmpList(empList);

}
    
    else {
      if (selectedDept != "") {
        const filteredData = empList.filter((i) => {
          return i.department == selectedDept;
        });
        setFilteredEmpList(filteredData);
        return true;
      }
      if (selectedDesg != "") {
   
        const filteredData = empList.filter((i) => {
          return i.designation == selectedDesg;
        });
        setFilteredEmpList(filteredData);
        return true;
      } 
      if (fromSalary != "" && toSalary != "") {
       
        const filteredData = empList.filter((i) => {
          return (
            parseInt(i.salary) >= parseInt(fromSalary) &&
            parseInt(i.salary) <= parseInt(toSalary)
          );
        });
        setFilteredEmpList(filteredData);
        return true;
      } 
    }
  };

  return (
    <div className="container">
     
      <div className="form-group">
    <button className="btn btn-light"> <Link  to="/addEditEmployee" state={{ empData: null }}>
          Add New Employee
        </Link></button>
     <button className="btn btn-light"> <Link to="/department">Add New Department</Link></button>
    <button className="btn btn-light"> <Link to="/designation">Add New Designation</Link></button>
    </div>


      <br/>
      <div className='form-group'>
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          <option value="">--Please select department--</option>
          {deptList.map((item) => {
            return (
              <option value={item.departmentName}>{item.departmentName}</option>
            );
          })}
        </select>

        <select
          value={selectedDesg}
          onChange={(e) => setSelectedDesg(e.target.value)}
        >
          <option value="">--Please select designation--</option>
          {desgList.map((item) => {
            return (
              <option value={item.designationName}>
                {item.designationName}
              </option>
            );
          })}
        </select>

        <label>
          <b>Salary From:</b>
        </label>
        <input
          type="text"
          value={fromSalary}
          onChange={(e) => setFromSalary(e.target.value)}
        />
        <label>
          <b>To:</b>
        </label>
        <input
          type="text"
          value={toSalary}
          onChange={(e) => setToSalary(e.target.value)}
        />
        <input class="btn btn-secondary" type="button" value="Filter" onClick={filteredData} />
      </div>
<br/>
      <div>
        <EmployeeList data={filteredEmpList} />
      </div>
    </div>
  );
};

const EmployeeList = (props) => {
  
  const deleteEmployee = (id) => {
    axios
      .get("http://localhost:4000/api/deleteEmployeeRecord/" + id)
      .then(function (response) {
        alert("Record deleted!");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
   <div>
      {props.data.length > 0 ? (
        <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Dob</th>
        <th>Joining date</th>
        <th>Salary</th>
        <th>Designation</th>
        <th>Department</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {props.data.map((emp) => {
          return (
          
            <tr>
              <td>{emp.firstName} {emp.lastName}</td>
              <td>{emp.dateOfBirth}</td>
              <td>{emp.dateOfJoining}</td>
              <td>{emp.salary}</td>
              <td>{emp.designation}</td>
              <td> {emp.department}</td>
              <td> <button className="btn btn-light">
                <Link to="/addEditEmployee" state={{ empData: emp }}>
                  Update
                </Link>
              </button>
              <input
              class="btn btn-danger"
                type="button"
                value="Delete"
                onClick={() => deleteEmployee(emp._id)}
              /></td>
            </tr>
          
          );
        })
        }
        </tbody>
    </table>
      ) : (
        <div>Record not found</div>
      )}
    </div>
  );
};
export default DashBoard;
