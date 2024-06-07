import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';

// Middleware para verificar la autenticidad del usuario a través de un token JWT
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        logger.debug('No token provided, authentication failed.');
        return res.json({ Error: "You are not authenticated" }); // Entrega mensaje de error si no está autenticado
    } else {
        jwt.verify(token, process.env.JWT_SECRET || "jwt-secret-key", (err, decoded) => {
            if(err) {
                logger.error('Token verification failed:', err);
                return res.json({ Error: "Token is not correct" }); // Entrega mensaje de error si el token no es válido
            } else {
                req.name = decoded.name; // Extrae el nombre del payload del token
                logger.info('User authenticated:', req.name);
                next(); // Continúa con el siguiente middleware o ruta
            }
        });
    }
};

export default verifyUser;