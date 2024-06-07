// Importación de bibliotecas y módulos necesarios
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import verifyUser from './middleware/auth.js';
import logger from './utils/logger.js';

const app = express(); // Creación de aplicación Express
app.use(express.json()); // Middleware para parsear JSON
app.use(cors({
    origin: ["http://localhost:5173"], // Config de CORS para aceptar solicitudes del origen indicado
    methods: ["POST", "GET"], // Métodos permitidos
    credentials: true // Permite el envío de cookies y headers de autorización
}));
app.use(cookieParser()); // Activa el middleware para manejar cookies

// Ruta GET para verificar si el usuario está autenticado
app.get('/', verifyUser, (req, res) => {
    return res.json({Status: "Success", name: req.name});
});

app.use(authRoutes);

// Configuración del servidor para escuchar en el puerto específico
app.listen(8081, () => {
    logger.info("Server running on port 8081"); // Mensaje de servidor en ejecución
});