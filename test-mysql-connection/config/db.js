const { createPool } = require('mysql2');

const pool = createPool({
  host: 'localhost',
  user: 'nextJsTemp',
  password: 'next1234',
  port: 3306,
  database: 'tempdata'
});

// Check the connection to the database during application startup
pool.getConnection((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database...');
  }
});

const executeQuery = (query, arrayParams) => {
  return new Promise((resolve, reject) => {
    console.log(query)
    pool.query(query, arrayParams, (err, data) => {
      if (err) {
        console.error('Error executing query:', err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = { executeQuery, pool };