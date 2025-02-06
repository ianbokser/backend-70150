# Usar una imagen oficial de Node.js
FROM node:20

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto al contenedor
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente al contenedor
COPY . .

# Exponer el puerto en el que corre la aplicación
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["npm", "start"]
