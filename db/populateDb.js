// #!/usr/bin/env node
// require('dotenv').config({ path: '../.env' });
// const { Client } = require('pg');

// const client = new Client({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

// async function main() {
//   console.log('Seeding database...');

//   try {
//     await client.connect();

//     await client.query(`
//       CREATE TABLE IF NOT EXISTS tasks (
//         id SERIAL PRIMARY KEY,
//         title VARCHAR(255) NOT NULL,
//         description TEXT,
//         status BOOLEAN NOT NULL DEFAULT false,
//         due_date DATE NOT NULL
//       );
//     `);

//     const taskInsertQuery = `
//       INSERT INTO tasks (title, description, status, due_date)
//       VALUES ($1, $2, $3, $4)
//       RETURNING id, title, description, status, due_date;
//     `;

//     const values = [
//       'Submit court report',
//       'Detailed report on case #1234',
//       false,
//       '2025-04-10',
//     ];

//     const taskResult = await client.query(taskInsertQuery, values);
//     const insertedTask = taskResult.rows[0];

//     console.log('Inserted task:', insertedTask);
//   } catch (err) {
//     console.error('Error during seeding:', err);
//   } finally {
//     await client.end();
//   }
// }

// main();
