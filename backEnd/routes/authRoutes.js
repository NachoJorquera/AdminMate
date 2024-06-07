import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

const router = express.Router();
const salt = 10;

// Ruta POST para el registro de usuarios
router.post('/register', (req, res) => {
    const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err) {
            return res.json({ Error: "Error for hashing password" }); // Error al hashear la contraseña
        }
        const values = [
            req.body.name,
            req.body.email,
            hash // Constraseña hasheada
        ];
        db.query(sql, [values], (err, result) => {
            if(err) {
                return res.json({ Error: "Inserting data Error in server" }); // Error al insertar los datos
            }
            return res.json({ Status: "Success" }); // Exito en la inserción de datos
        });
    });
});

// Ruta POST para el inicio de sesión de usuarios
router.post('/login', (req, res) => {
    const sql = 'SELECT * FROM login WHERE email = ?';
    db.query(sql, [req.body.email], (err, data) => {
        if(err) return res.json({ Error: "Login error in server" }); // Error en la consulta
        if(data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if(err) return res.json({ Error: "Password compare error" }); // Error al comparar contraseñas
                if(response) {
                    const name = data[0].name;
                    const token = jwt.sign({name}, process.env.JWT_SECRET || "jwt-secret-key", {expiresIn: '1d'}); // Genera un nuevo JWT
                    res.cookie('token', token); // Envía el token como una cookie
                    return res.json({ Status: "Success" }); // Inicio de sesión exitoso
                } else {
                    return res.json({ Error: "Wrong password" }); // Mensaje de contraseña incorrecta
                }
            });
        } else {
            return res.json({ Error: "You don't have an account" }); // Mensaje si no hay usuario con ese email
        }
    });
});

// Ruta GET para cerrar la sesión del usuario
router.get('/logout', (req, res) => {
    res.clearCookie('token'); // Elimina la cookie del token
    return res.json({ Status: "Success" }); // Confirmación de la salida
});

export default router;