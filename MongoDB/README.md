🧾 Trabajo Práctico – MongoDB
Sistema de Base de Datos NoSQL – “myapp”

Este trabajo práctico tiene como objetivo crear una base de datos en MongoDB usando un script ejecutable en Linux, que genere toda la estructura necesaria: colecciones, registros, relaciones, índices y algunas consultas de prueba.

🧠 Descripción general

La base de datos se llama myapp y simula una pequeña aplicación de e-commerce.
Contiene distintas colecciones que se relacionan entre sí:

products: guarda los productos disponibles.

categories: clasifica los productos en distintas categorías.

users: registra los usuarios del sistema.

orders: almacena los pedidos realizados por los usuarios.

reviews: contiene los comentarios y valoraciones de productos.

🔗 Relaciones entre colecciones

Un producto puede pertenecer a múltiples categorías.

Un usuario puede tener muchos pedidos.

Un pedido puede incluir varios productos.

Un producto puede tener muchos comentarios (reviews).

Estas relaciones se manejan a través de referencias con ObjectId, manteniendo la estructura normalizada.

⚙️ Estructura del script

El script se llama setup_myapp.sh y se puede ejecutar directamente desde Linux si está instalado mongosh.
Internamente realiza las siguientes acciones:

Crea la base de datos myapp.

Genera las colecciones necesarias (categories, products, users, orders, reviews).

Inserta datos de ejemplo en cada colección.

Define las referencias entre documentos (por ejemplo, productos dentro de pedidos).

Ejecuta algunas consultas con $lookup para mostrar las relaciones.

Aplica actualizaciones (updateOne) sobre los registros.

Crea índices básicos para optimizar las búsquedas.

(Opcional) Agrega validaciones de esquema en la colección products.

▶️ Cómo ejecutar el script

Guardar el archivo como setup_myapp.sh.

Darle permisos de ejecución:

chmod +x setup_myapp.sh


Ejecutarlo en la terminal:

./setup_myapp.sh


El script abrirá mongosh y mostrará los resultados de las consultas directamente en la consola.

🔍 Consultas incluidas

Productos con sus categorías ($lookup entre products y categories).

Pedidos mostrando los datos del usuario y los productos incluidos.

Actualización de stock y cambio de estado de pedido.

🧩 Validación opcional

Se agregó una validación de esquema sobre la colección products para asegurar que:

Los campos name, price y stock existan.

Los valores sean del tipo correcto (string, number, int).

Los números no sean negativos.

✅ Resultado final

Luego de ejecutar el script, la base myapp queda lista con toda la información cargada y las relaciones funcionales entre colecciones.
Las consultas de verificación se imprimen en la terminal y sirven como comprobación del correcto funcionamiento del sistema.