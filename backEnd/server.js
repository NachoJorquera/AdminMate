// Importación de bibliotecas y módulos necesarios
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
const salt = 10; // Nivel de sal para el hash de bcrypt

const app = express(); // Creación de aplicación Express
app.use(express.json()); // Middleware para parsear JSON
app.use(cors({
    origin: ["http://localhost:5173"], // Config de CORS para aceptar solicitudes del origen indicado
    methods: ["POST", "GET"], // Métodos permitidos
    credentials: true // Permite el envío de cookies y headers de autorización
}));
app.use(cookieParser()); // Activa el middleware para manejar cookies

// Conexión a base de datos MySQL usando variables de entorno
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '11nacho04',
    database: process.env.MYSQL_DATABASE || 'sign_up'
});

// Middleware para verificar la autenticidad del usuario a través de un token JWT
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Error: "You are not authenticated"}); // Entrega mensaje de error si no está autenticado
    } else {
        jwt.verify(token, process.env.JWT_SECRET || "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({Error: "Token is not correct"}); // Entrega mensaje de error si el token no es válido
            } else {
                req.name = decoded.name; // Extrae el nombre del payload del token
                next(); // Continúa con el siguiente middleware o ruta
            }
        })
    }
};

// Ruta GET para verificar si el usuario está autenticado
app.get('/', verifyUser, (req, res) => {
    return res.json({Status: "Success", name: req.name});
});

// Ruta POST para el registro de usuarios
app.post('/register', (req, res) => {
    const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err) return res.json({Error: "Error for hashing password"}); // Error al hashear la contraseña
        const values = [
            req.body.name,
            req.body.email,
            hash // Constraseña hasheada
        ]
        db.query(sql, [values], (err, result) => {
            if(err) return res.json({Error: "Inserting data Error in server"}); // Error al insertar los datos
            return res.json({Status: "Success"}); // Exito en la inserción de datos
        });
    })
});

// Ruta POST para el inicio de sesión de usuarios
app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM login WHERE email = ?';
    db.query(sql, [req.body.email], (err, data) => {
        if(err) return res.json({Error: "Login error in server"}); // Error en la consulta
        if(data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if(err) return res.json({Error: "Password compare error"}); // Error al comparar contraseñas
                if(response) {
                    const name = data[0].name;
                    const token = jwt.sign({name}, process.env.JWT_SECRET || "jwt-secret-key", {expiresIn: '1d'}); // Genera un nuevo JWT
                    res.cookie('token', token); // Envía el token como una cookie
                    return res.json({Status: "Success"}); // Inicio de sesión exitoso
                } else {
                    return res.json({Error: "Wrong password"}); // Mensaje de contraseña incorrecta
                }
            })
        } else {
            return res.json({Error: "You don't have an account"}); // Mensaje si no hay usuario con ese email
        }
    })
});

// Ruta GET para cerrar la sesión del usuario
app.get('/logout', (req, res) => {
    res.clearCookie('token'); // Elimina la cookie del token
    return res.json({Status: "Success"}); // Confirmación de la salida
});

// Configuración del servidor para escuchar en el puerto específico
app.listen(8081, ()=> {
    console.log("Running..."); // Mensaje de servidor en ejecución
});