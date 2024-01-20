import mysql from "mysql";

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "own database psw",
  database: "employeems",
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Connection error:", err);
  } else {
    console.log("Connected to MySQL");
    connection.release();
  }
});

export default pool;
