import { createPool } from 'mysql2';

const pool = createPool({
  host: 'localhost',
  user: 'root', 
  password: 'your_password', 
  database: 'messagedb', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
pool.query('SELECT 1 + 1 AS result', (error, results, fields) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Export the connection pool
export default pool;
