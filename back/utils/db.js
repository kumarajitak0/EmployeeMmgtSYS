import mysql from "mysql";

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "Mysql@123#MS",
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
