import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import verifyUser from '../middleware/auth.js';
import db from '../config/db.js';
import logger from '../utils/logger.js';
import dotenv from 'dotenv';

const router = express.Router();
const salt = 10;
dotenv.config();

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
                    const token = jwt.sign({name}, process.env.JWT_SECRET, {expiresIn: '1d'}); // Genera un nuevo JWT
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

// Ruta para verificar el número de departamento
router.post('/check-apartment', (req, res) => {
    const { apartment_number } = req.body;
    const query = 'SELECT COUNT(*) AS count FROM residents WHERE apartment_number = ?';
    db.query(query, [apartment_number], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result[0].count > 0) {
            res.send({ exists: true });
            console.log('Resident exists');
        } else {
            res.send({ exists: false });
            console.log('Resident do not exists')
        }
    });
});

// Ruta para obtener información de los residentes por número de departamento
router.get('/deliveries/:apartment_number', (req, res) => {
    const { apartment_number } = req.params;
    const query = "SELECT name, phone_number FROM residents WHERE apartment_number = ?";
    db.query(query, [apartment_number], (err, result) => {
        if (err) {
            return res.status(500).send(err);
            // return res.json({Message: "Error inside server"});
        }
        res.json(result);
        // console.log(result);
    });
});

router.post('/park', (req, res) => {
    const { patente, nombre, departamento, estacionamiento } = req.body;

    const sqlInsert = "INSERT INTO parking (patente, nombre, departamento, estacionamiento) VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [patente, nombre, departamento, estacionamiento], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ status: 'error', message: 'Error inserting data' });
        } else {
            res.status(200).json({ status: 'success', message: 'Data inserted successfully' });
        }
    });
});

router.get('/parking/:patente', (req, res) => {
    const patente = req.params.patente;
    const sqlSearch = "SELECT name, department, rut FROM frequent_visits WHERE patente = ?";
    const sqlSearch2 = "SELECT nombre, departamento, estacionamiento, created_at FROM parking WHERE patente = ?";

    db.query(sqlSearch, [patente], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ status: 'error', message: 'Error fetching data' });
        } else {
            if (result.length > 0) {
                res.status(200).json({ status: 'success', source: 'frequent_visits', data: result[0] });
            } else {
                db.query(sqlSearch2, [patente], (err2, result2) => {
                    if (err2) {
                        console.error('Error fetching data:', err2);
                        res.status(500).json({ status: 'error', message: 'Error fetching data' });
                    } else {
                        if (result2.length > 0) {
                            res.status(200).json({ status: 'success', source: 'parking', data: result2[0] });
                        } else {
                            res.status(404).json({ status: 'error', message: 'No data found in both tables' });
                        }
                    }
                });
                //res.status(404).json({ status: 'error', message: 'No data found' });
            }
        }
    });
});

// Ruta para agregar una visita frecuente
router.post('/visitas/frequent', (req, res) => {
    logger.debug(`Frequent visit data received: ${JSON.stringify(req.body)}`);
    const { department, name, birthdate, rut, patente } = req.body;
    const sql = 'INSERT INTO frequent_visits (department, name, birthdate, rut, patente, ingreso) VALUES (?, ?, ?, ?, ?, NOW())';
    db.query(sql, [department, name, birthdate, rut, patente], (err, result) => {
        if (err) {
            logger.error("Error adding frequent visit", { error: err });
            return res.status(500).json({ Error: "Error adding frequent visit", Details: err });
        }
        logger.info("Frequent visit added successfully", { visitor: name });
        return res.status(200).json({ Status: "Success" });
    });
});

// Ruta para verificar si una visita es frecuente
router.get('/visitas/check/:rut', (req, res) => {
    logger.debug(`Checking frequent visit for RUT: ${req.params.rut}`);
    const { rut } = req.params;
    const sql = 'SELECT * FROM frequent_visits WHERE rut = ?';
    db.query(sql, [rut], (err, result) => {
        if (err) {
            logger.error("Error checking frequent visit", { error: err });
            return res.status(500).json({ Error: "Error checking frequent visit" });
        }
        if (result.length > 0) {
            const visitor = result[0];
            visitor.birthdate = new Date(visitor.birthdate).toISOString(); // Asegurar el formato correcto
            visitor.ingreso = new Date(visitor.ingreso).toISOString(); // Asegurar el formato correcto
            logger.info("Frequent visit found", { visitor: result[0].name });
            return res.status(200).json({ isFrequent: true, visitor });
        } else {
            logger.info("No frequent visit found for RUT", { rut });
            return res.status(200).json({ isFrequent: false });
        }
    });
});

// Ruta para registrar una visita no frecuente
router.post('/visitas/register', (req, res) => {
    logger.debug(`Registering visit: ${JSON.stringify(req.body)}`);
    const { department, name, birthdate, rut, patente } = req.body;
    const sql = 'INSERT INTO other_visits (department, name, birthdate, rut, patente, ingreso) VALUES (?, ?, ?, ?, ?, NOW())';
    db.query(sql, [department, name, birthdate, rut, patente], (err, result) => {
        if (err) {
            logger.error("Error registering visit", { error: err });
            return res.status(500).json({ Error: "Error registering visit" });
        }
        logger.info("Visit registered successfully", { visitor: name });
        return res.status(200).json({ Status: "Success" });
    });
});

router.post('/deliveries', verifyUser, (req, res) => {
    res.send('This is a protected route');
    console.log('This is a protected route');
});

export default router;