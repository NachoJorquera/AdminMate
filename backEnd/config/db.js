import mysql from 'mysql2';

// Conexión a base de datos MySQL usando variables de entorno
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '11nacho04',
    database: process.env.MYSQL_DATABASE || 'sign_up',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database.');
    }
});

export default db;