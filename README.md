
# Choppi Backend – Prueba Técnica Fullstack

Este proyecto es un backend desarrollado con **NestJS**, **TypeORM** y **PostgreSQL** como parte de una prueba técnica Fullstack.  
Incluye autenticación, manejo de tiendas, productos, inventario (store-products), migraciones, seeds y documentación Swagger.

---

## Tecnologías Utilizadas

- **Node.js + NestJS**
- **TypeScript**
- **PostgreSQL**
- **TypeORM** (migraciones + entidades)
- **Autenticación JWT**
- **Swagger** (documentación pública del API)

---

## Configuración del Proyecto

### 1️ Clonar el repositorio
```bash
git clone https://github.com/manuel00085/choppi-backend.
cd choppi-backend
```

### 2️ Instalar dependencias
```bash
npm install
```

### 3️ Configurar variables de entorno

Crear un archivo `.env` en la raíz:

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=admin
DB_NAME=choppi
JWT_SECRET=supersecret
JWT_EXPIRES_IN=1d
```

### 4️ Crear base de datos en PostgreSQL

```sql
CREATE DATABASE choppi;
```

---

## Migraciones

Este proyecto usa **migraciones de TypeORM** (sin synchronize en producción).

### Generar migraciones
```bash
npm run migration:generate
```

### Ejecutar migraciones
```bash
npm run migration:run
```

---

## Seeds (Datos Iniciales)

Este comando pobla la base de datos con:

- Usuario administrador  
- 3 tiendas  
- 10 productos  
- Inventario por tienda  

Ejecutar:

```bash
npm run seed
```

---

## Iniciar el Servidor

```bash
npm run start
```

El servidor estará disponible en:

```
http://localhost:3000
```

---

## Swagger (Documentación Pública)

Disponible automáticamente en:

```
http://localhost:3000/swagger
```

Incluye:

- Autenticación  
- Tiendas  
- Productos  
- Store-Products  
- Schemas  
- Parámetros  

---

## Autenticación

### Login
```
POST /auth/login
```

### Respuesta
```json
{
  "access_token": "..."
}
```

En Swagger puedes usarlo con **Authorize → Bearer Token**.

---

## Endpoints Principales

### Stores
```
GET    /stores
GET    /stores/:id
POST   /stores
PUT    /stores/:id
DELETE /stores/:id
```

### Products
```
GET    /products/:id
POST   /products
PUT    /products/:id
DELETE /products/:id
```

### Store-Products (Inventario)
```
POST   /stores/:storeId/products
GET    /stores/:storeId/products
GET    /stores/:storeId/products/:storeProductId
PUT    /stores/:storeId/products/:storeProductId
DELETE /stores/:storeId/products/:storeProductId
```

---

## Probar el API

Puedes probar todo desde Swagger o con cURL:

```
curl -X POST http://localhost:3000/auth/login   -H "Content-Type: application/json"   -d '{"email":"admin@admin.com","password":"123456"}'
```

---

## Estructura del Proyecto

```
src/
│── auth/
│── users/
│── stores/
│── products/
│── store-products/
│── migrations/
│── seeds/
│── app.module.ts
│── main.ts
```

---

## Autor

Prueba técnica desarrollada por **Manuel Rincón**.

---


