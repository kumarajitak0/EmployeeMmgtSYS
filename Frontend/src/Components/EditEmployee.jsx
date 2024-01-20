import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditEmployee = () => {
  const { EmpId } = useParams();
  const [Employee, setEmployee] = useState({
    EmpName: "",
    EmpEmail: "",
    EmpSalary: "",
    EmpAddress: "",
    CategoryId: "",
  });

  const [Category, setCategory] = useState([]);
  const navigate = useNavigate(); //Instance for navigate to Employee dashboard
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/Category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/auth/Employee/" + EmpId)
      .then((result) => {
        setEmployee({
          ...Employee,
          EmpName: result.data.Result[0].EmpName,
          EmpEmail: result.data.Result[0].EmpEmail,
          EmpSalary: result.data.Result[0].EmpSalary,
          EmpAddress: result.data.Result[0].EmpAddress,
          CategoryId: result.data.Result[0].CategoryId,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/auth/edit_employee/" + EmpId, Employee)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/Employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3>Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="inputName"
              placeholder="Enter your Name"
              className="form-control rounded-0"
              value={Employee.EmpName}
              onChange={(e) =>
                setEmployee({ ...Employee, EmpName: e.target.value })
              }
            ></input>
          </div>

          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="inputEmail4"
              placeholder="Enter your Email"
              className="form-control rounded-0"
              autoComplete="off"
              value={Employee.EmpEmail}
              onChange={(e) =>
                setEmployee({ ...Employee, EmpEmail: e.target.value })
              }
            ></input>
          </div>

          <div className="col-12">
            <label htmlFor="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              id="inputSalary"
              placeholder="Enter Salary"
              className="form-control rounded-0"
              autoComplete="off"
              value={Employee.EmpSalary}
              onChange={(e) =>
                setEmployee({ ...Employee, EmpSalary: e.target.value })
              }
            ></input>
          </div>

          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              id="inputAddress"
              placeholder="Enter your Address"
              className="form-control rounded-0"
              autoComplete="off"
              value={Employee.EmpAddress}
              onChange={(e) =>
                setEmployee({ ...Employee, EmpAddress: e.target.value })
              }
            ></input>
          </div>

          <div className="col-12">
            <label htmlFor="Category" className="form-label">
              Category
            </label>
            <select
              name="Category"
              id="Category"
              className="form-select"
              //value={Employee.CategoryId}
              onChange={(e) =>
                setEmployee({ ...Employee, CategoryId: e.target.value })
              }
            >
              {Category.map((c) => {
                return <option value={c.CategoryId}>{c.Name}</option>;
              })}
            </select>
          </div>

          <button className="btn btn-primary w-100 rounded-0 mb-2">
            Edit Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
