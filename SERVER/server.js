const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const Jwt = require("jsonwebtoken");
const db = require('./mysql/registermodel');

// Registration route
app.post('/register', async (req, res) => {
  const { firstName, lastName, username, email, gender, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (firstName, lastName, username, email, gender, password) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [firstName, lastName, username, email, gender, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error registering user');
    }
    res.status(201).send('User registered successfully');
  });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login request received with email:', email); // Debugging
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error during database query:', err); // Debugging
      return res.status(500).send('Error logging in');
    }
    if (results.length === 0) {
      console.log('User not found'); // Debugging
      return res.status(401).send('User not found');
    }
    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // Generate a token and set it in a cookie
      const token = Jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true });
      console.log('Login successful'); // Debugging
      res.status(200).send('Login successful');
    } else {
      console.log('Incorrect password'); // Debugging
      res.status(401).send('Incorrect password');
    }
  });
});

// Logout route
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).send('Logged out successfully');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
