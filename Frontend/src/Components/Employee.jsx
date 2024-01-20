import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Employee = () => {
  const [Employee, setEmployee] = useState([]);
  //const navigate = useNavigate();

  //useEffect hook is use to fetch the record or extract the record
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/Employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  //---------End of use effect hook------------

  const handleDelete = (EmpId) => {
    axios
      .delete("http://localhost:3000/auth/delete_employee/" + EmpId)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Address</th>
            </tr>
          </thead>

          <tbody>
            {Employee.map((e) => (
              <tr>
                <td>{e.EmpName}</td>
                <td>
                  <img
                    src={`http://localhost:3000/Images/` + e.EmpImage}
                    className="employ_Image"
                    alt=""
                  />
                </td>
                <td>{e.EmpEmail}</td>
                <td>{e.EmpSalary}</td>
                <td>{e.EmpAddress}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_employee/` + e.EmpId}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.EmpId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
