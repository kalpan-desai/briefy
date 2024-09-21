const mysql = require('mysql2');

// Create connection to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'root', // Replace with your MySQL password
  database: 'register' // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('MySQL Connected...');
});

// Create table if it doesn't exist
db.query(
  `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    username VARCHAR(255),
    email VARCHAR(255),
    gender VARCHAR(50),
    password VARCHAR(255)
  )`,
  (err, result) => {
    if (err) throw err;
    console.log('Users table created or exists already');
  }
);

module.exports = db;
