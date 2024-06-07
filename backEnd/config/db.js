import mysql from 'mysql2';
import logger from '../utils/logger.js';

// Conexión a base de datos MySQL usando variables de entorno
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '11nacho04',
    database: process.env.MYSQL_DATABASE || 'sign_up',
});

db.connect((err) => {
    if (err) {
        logger.error('Error connecting to the database:', err);
        console.error('Error connecting to the database:', err);
    } else {
        logger.info('Connected to the database.');
        console.log('Connected to the database.');
    }
});

export default db;