import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [Employee, setEmployee] = useState({
    EmpName: "",
    EmpEmail: "",
    EmpPassword: "",
    EmpSalary: "",
    EmpAddress: "",
    EmpImage: "",
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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending Request:", Employee);

    const formData = new FormData();
    formData.append("EmpName", Employee.EmpName);
    formData.append("EmpEmail", Employee.EmpEmail);
    formData.append("EmpPassword", Employee.EmpPassword);
    formData.append("EmpSalary", Employee.EmpSalary);
    formData.append("EmpAddress", Employee.EmpAddress);
    formData.append("EmpImage", Employee.EmpImage);
    formData.append("CategoryId", Employee.CategoryId);

    axios
      .post("http://localhost:3000/auth/add_employee", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/Employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log("Error:", err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3>Add Employee</h3>
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
              onChange={(e) =>
                setEmployee({ ...Employee, EmpEmail: e.target.value })
              }
            ></input>
          </div>

          <div className="col-12">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="text"
              id="inputpassword4"
              placeholder="Enter your Password"
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({ ...Employee, EmpPassword: e.target.value })
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
              onChange={(e) =>
                setEmployee({ ...Employee, EmpAddress: e.target.value })
              }
            ></input>
          </div>

          <div className="col-12 mb-3">
            <label htmlFor="inputGroupFile01" className="form-label">
              Select Image
            </label>
            <input
              type="file"
              id="inputGroupFile01"
              name="EmpImage"
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({ ...Employee, EmpImage: e.target.files[0] })
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
              onChange={(e) =>
                setEmployee({ ...Employee, CategoryId: e.target.value })
              }
            >
              {Category.map((c) => {
                return (
                  <option key={c.CategoryId} value={c.CategoryId}>
                    {c.Name}
                  </option>
                );
              })}
            </select>
          </div>

          <button className="btn btn-primary w-100 rounded-0 mb-2">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
