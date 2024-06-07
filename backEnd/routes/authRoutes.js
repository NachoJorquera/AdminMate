import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import logger from '../utils/logger.js';

const router = express.Router();
const salt = 10;

// Ruta POST para el registro de usuarios
router.post('/register', (req, res) => {
    logger.debug(`Registration data received: ${JSON.stringify(req.body)}`);
    const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err) {
            logger.error("Error hashing password", { error: err });
            return res.json({ Error: "Error for hashing password" }); // Error al hashear la contraseña
        }
        const values = [
            req.body.name,
            req.body.email,
            hash // Constraseña hasheada
        ];
        db.query(sql, [values], (err, result) => {
            if(err) {
                logger.error("Inserting data error", { error: err });
                return res.json({ Error: "Inserting data Error in server" }); // Error al insertar los datos
            }
            logger.info("User registered successfully", { user: req.body.name });
            return res.json({ Status: "Success" }); // Exito en la inserción de datos
        });
    });
});

// Ruta POST para el inicio de sesión de usuarios
router.post('/login', (req, res) => {
    logger.debug(`Login attempt for email: ${req.body.email}`);
    const sql = 'SELECT * FROM login WHERE email = ?';
    db.query(sql, [req.body.email], (err, data) => {
        if(err) {
            logger.error("Login error in server", { error: err });
            return res.json({ Error: "Login error in server" }); // Error en la consulta
        } 
        if(data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if(err) {
                    logger.error("Password compare error", { error: err});
                    return res.json({ Error: "Password compare error" }); // Error al comparar contraseñas
                }
                if(response) {
                    const name = data[0].name;
                    const token = jwt.sign({name}, process.env.JWT_SECRET || "jwt-secret-key", {expiresIn: '1d'}); // Genera un nuevo JWT
                    res.cookie('token', token); // Envía el token como una cookie
                    logger.info("User logged in successfully", { user: name });
                    return res.json({ Status: "Success" }); // Inicio de sesión exitoso
                } else {
                    logger.debug("Wrong password atempt", { email: req.body.email });
                    return res.json({ Error: "Wrong password" }); // Mensaje de contraseña incorrecta
                }
            });
        } else {
            logger.debug("Login attempt with non-existent account", { email: req.body.email });
            return res.json({ Error: "You don't have an account" }); // Mensaje si no hay usuario con ese email
        }
    });
});

// Ruta GET para cerrar la sesión del usuario
router.get('/logout', (req, res) => {
    res.clearCookie('token'); // Elimina la cookie del token
    logger.info("User logged out successfully");
    return res.json({ Status: "Success" }); // Confirmación de la salida
});

export default router;