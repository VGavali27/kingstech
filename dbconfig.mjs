// import db from './db.mjs';
// import dotenv from 'dotenv';


// dotenv.config();

// // Determine the environment from an environment variable or any other method you prefer.
// const environment = process.env.NODE_ENV || 'DEV';

// // Create a MySQL pool for the selected environment
// const pool = db(environment);

// // Check if the database is connected
// pool.getConnection((err, connection) => {
//     if (err) {
//       console.error('Database connection failed:', err);
//     } else {
//       console.log('Database connected.');
//       connection.release(); // Release the connection
//     }
//   });
 
// export default pool;

import e from 'express';
import createDatabasePool from './db.mjs'; // Import the database pool creation function
import dotenv from 'dotenv';

dotenv.config();
// console.log('process.env:', process.env.JWT_SECRET_KEY);
const initializeApp = async () => {
  try {
    const environment = process.env.NODE_ENV || 'DEV_STAGING';
    const pool = await createDatabasePool(environment);
    console.log('Database connected.'+environment);
    const connection = await pool.getConnection();
    connection.release(); // Release the connection
    return pool;  
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

const pool = await initializeApp();
     
export default pool;

