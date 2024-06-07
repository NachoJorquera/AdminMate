import jwt from 'jsonwebtoken';

// Middleware para verificar la autenticidad del usuario a través de un token JWT
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({ Error: "You are not authenticated" }); // Entrega mensaje de error si no está autenticado
    } else {
        jwt.verify(token, process.env.JWT_SECRET || "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({ Error: "Token is not correct" }); // Entrega mensaje de error si el token no es válido
            } else {
                req.name = decoded.name; // Extrae el nombre del payload del token
                next(); // Continúa con el siguiente middleware o ruta
            }
        });
    }
};

export default verifyUser;