# 1. Imagen base recomendada para NestJS + TypeORM
FROM node:22-slim

# 2. Crear directorio de la app
WORKDIR /app

# 3. Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# 4. Copiar todo el código fuente
COPY . .

# 5. Compilar el proyecto NestJS
RUN npm run build

# 6. Exponer puerto
EXPOSE 3000

# 7. Comando para iniciar NestJS
CMD ["npm", "run", "start:prod"]
