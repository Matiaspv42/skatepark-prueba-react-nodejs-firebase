## Skatepark

En el lado del cliente hay un FrontEnd hecho con React utilizando los hooks useState, useEffect. Para el manejo de usuarios see realizan llamadas HTTP a un servidor utilizando Axios y para manejar el uso de imagenes se está usando Firebase Storage.

El servidor está montado con NodeJs + Express y se interactúa con la base de datos utilizando el paquete pg. Además se creó un sistema de autenticación con JWT para restringir el acceso de rutas en el FrontEnd

Estoy usando una base de datos PostgreSQL con las siguientes tablas: 

```sql
CREATE DATABASE skatepark;

CREATE TABLE skaters (id SERIAL, email VARCHAR(50) NOT NULL, nombre
VARCHAR(25) NOT NULL, password VARCHAR(25) NOT NULL, anos_experiencia
INT NOT NULL, especialidad VARCHAR(50) NOT NULL, foto VARCHAR(255) NOT
NULL, estado BOOLEAN NOT NULL);
```

