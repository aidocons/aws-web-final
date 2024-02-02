const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

db.query('CREATE TABLE IF NOT EXISTS data (id INT AUTO_INCREMENT PRIMARY KEY, message VARCHAR(255))', (err) => {
  if (err) {
    console.error('Error creating table:', err);
  }
});

app.use(express.json());

const path = require('path');




app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) {
      console.error('Error querying data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const data = results.length > 0 ? results[0].message : 'No data available';
    res.json({ message: data });
  });
});

app.get('/api/student/:id', (req, res) => {
  const studentId = req.params.id;

  db.query('SELECT * FROM students WHERE id = ?', [studentId], (err, results) => {
    if (err) {
      console.error('Error querying student data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      res.json({ message: 'Student not found' });
    } else {
      const studentDetails = {ID: `${results[0].id}`, Name: `${results[0].name}`, Age: `${results[0].age}`};
      res.json({ message: studentDetails });
    }
  });
});

app.listen(PORT, () => {
    console.log(`server is running on ${3000}`)
});