const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'messagedb'
});

const app = express();

app.post('/messages', (req, res) => {
    const { name, photo, status } = req.body;
  
    connection.query('INSERT INTO messages (name, photo, status) VALUES (?, ?, ?)', [name, photo, status], (error, results, fields) => {
      if (error) {
        console.error('Error storing message:', error);
        res.status(500).send('Error storing message');
      } else {
        console.log('Message stored successfully:', results);
        res.status(200).send('Message stored successfully');
      }
    });
  });
  

app.listen(3000, () => {
  console.log('Go to http://localhost:3000/users so you can see the data.');
});