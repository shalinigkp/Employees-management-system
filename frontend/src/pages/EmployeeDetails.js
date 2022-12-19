import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const EmployeeDetails=()=>{
    const history = useNavigate();
    const location = useLocation();
    const { empData } = location.state;
    return(
        <div><h5>Employee Detail</h5>
 <div><label><b>Name:</b>{empData.firstName} {empData.lastName}</label></div>
 <div><label><b>Dob:</b>{empData.dateOfBirth} </label></div>
 <div><label><b>Doj:</b>{empData.dateOfJoining} </label></div>
 <div><label><b>Salary:</b>{empData.salary} </label></div>
 <div><label><b>Designation:</b>{empData.designation} </label></div>
 <div><label><b>Department:</b>{empData.department} </label>
</div>
<div> <input
          class="btn btn-dark"
          type="button"
          value="Cancel"
          onClick={() => history("/dashboard")}
        /></div>
        </div>
    )
}
export default EmployeeDetails;