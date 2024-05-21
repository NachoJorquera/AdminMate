# Usamos una imagen base oficial de Node.js 21
FROM node:21.4.0

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos package.json y package-lock.json
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto de los archivos de la aplicación
COPY . .

# Ejecutamos el build de la aplicación
RUN npm run build

# Instalamos un servidor estático para servir la aplicación
RUN npm install -g serve

# Exponemos el puerto en el que la aplicación escucha
EXPOSE 5000

# Comando para iniciar el servidor estático
CMD ["serve", "-s", "dist"]