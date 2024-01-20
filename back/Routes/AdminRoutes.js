import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const router = express.Router();

// Admin login route
router.post("/adminlogin", (req, res) => {
  // Check admin credentials in the database
  const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      return res.json({ loginStatus: false, Error: "Query error: " + err.message });
    }
    if (result.length > 0) {
      // Create JWT token for successful login
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});

// Get all categories
router.get("/category", (req, res) => {
  // Retrieve all categories from the database
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }
    return res.json({ Status: true, Result: result });
  });
});

// Add a new category
router.post("/add_category", (req, res) => {
  // Insert a new category into the database
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  con.query(sql, [req.body.Category], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }
    return res.json({ Status: true });
  });
});

// Image upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

// Add a new employee with image upload
router.post("/add_employee", upload.single("EmpImage"), (req, res) => {
  // Insert a new employee into the database with hashed password
  const sql = `INSERT INTO employee 
    (EmpName,EmpEmail,EmpPassword, EmpSalary, EmpAddress,EmpImage, CategoryId) 
    VALUES (?)`;
  bcrypt.hash(req.body.EmpPassword, 10, (err, hash) => {
    if (err) {
      return res.json({ Status: false, Error: "Hashing Error: " + err.message });
    }
    const values = [
      req.body.EmpName,
      req.body.EmpEmail,
      hash,
      req.body.EmpSalary,
      req.body.EmpAddress,
      req.file.filename,
      req.body.CategoryId,
    ];
    con.query(sql, [values], (err, result) => {
      if (err) {
        return res.json({ Status: false, Error: "Query Error: " + err.message });
      }
      return res.json({ Status: true });
    });
  });
});

// Get all employees
router.get("/employee", (req, res) => {
  // Retrieve all employees from the database
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }
    return res.json({ Status: true, Result: result });
  });
});

// Get employee by ID
router.get("/employee/:EmpId", (req, res) => {
  const EmpId = req.params.EmpId;
  // Retrieve an employee by ID from the database
  const sql = "SELECT * FROM employee WHERE EmpId = ?";
  con.query(sql, [EmpId], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }
    return res.json({ Status: true, Result: result });
  });
});

// Update employee by ID
router.put("/edit_employee/:EmpId", (req, res) => {
  const EmpId = req.params.EmpId;
  // Update an employee by ID in the database
  const sql = `UPDATE employee 
        SET EmpName = ?, EmpEmail = ?, EmpSalary = ?, EmpAddress = ?, CategoryId = ? 
        WHERE EmpId = ?`;
  const values = [
    req.body.EmpName,
    req.body.EmpEmail,
    req.body.EmpSalary,
    req.body.EmpAddress,
    req.body.CategoryId,
  ];
  con.query(sql, [...values, EmpId], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }
    return res.json({ Status: true, Result: result });
  });
});

// Delete employee by ID
router.delete("/delete_employee/:EmpId", (req, res) => {
  const EmpId = req.params.EmpId;
  // Delete an employee by ID from the database
  const sql = "DELETE FROM employee WHERE EmpId = ?";
  con.query(sql, [EmpId], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }
    return res.json({ Status: true, Result: result });
  });
});

// Get count of admin records
router.get("/admin_count", (req, res) => {
  // Get the count of admin records in the database
  const sql = "SELECT COUNT(id) as admin FROM admin";
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }
    return res.json({ Status: true, Result: result });
  });
});

// Get count of employee records
router.get("/employee_count", (req, res) => {
  // Get the count of employee records in the database
  const sql = "SELECT COUNT(EmpId) as employee FROM employee";
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }
    return res.json({ Status: true, Result: result });
  });
});

// Get total salary count of employees
router.get("/salary_count", (req, res) => {
  // Get the sum of EmpSalary for all employees in the database
  const sql = "SELECT SUM(EmpSalary) as salaryOFEmp FROM employee";
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }
    return res.json({ Status: true, Result: result });
  });
});

// Get all admin records
router.get("/admin_records", (req, res) => {
  // Retrieve all admin records from the database
  const sql = "SELECT * FROM admin";
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }
    return res.json({ Status: true, Result: result });
  });
});

// Logout route
router.get("/logout", (req, res) => {
  // Clear the token cookie for logout
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as adminRouter };
