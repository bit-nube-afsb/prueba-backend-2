# Usaremos la imagen base de NodeJS de la que vamos a partir para virtualizar nuestra aplicación
FROM node:22

# Definir un directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos que tienen las reglas de las dependencias que necesito
COPY package*.json ./
# De forma alternativa al asterisco
# COPY package.json ./
# COPY package-lock.json ./

# Descargamos las dependencias
RUN npm install

# Copiamos el resto de archivos del proyecto al contenedor
COPY . .

# Exponemos el puerto especificado en la variable de entorno PORT
EXPOSE ${PORT}

# Corremos el comando que está en el script del package.json
CMD ["npm", "run" , "dev"]