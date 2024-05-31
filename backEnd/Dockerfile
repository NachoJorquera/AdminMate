# Usamos una imagen base oficial de Node.js 21
FROM node:21

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos package.json y package-lock.json
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto de los archivos de la aplicación
COPY . .

# Exponemos el puerto en el que la aplicación escucha
EXPOSE 8081

# Comando para iniciar la aplicación
CMD ["npm", "start"]