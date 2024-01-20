import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Category = () => {
  const [Category, setCategory] = useState([]);
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

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Category List</h3>
      </div>
      <Link to="/dashboard/add_category" className="btn btn-success">
        Add Category
      </Link>
      <div>
        <table>
          <thead>
            <tr>
              {/* <th>Id</th> */}
              <th>Name</th>
            </tr>
          </thead>

          <tbody>
            {Category.map((c) => (
              <tr>
                {/* <td>{c.Id}</td> */}
                <td>{c.Name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
