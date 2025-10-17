# =======================================
# TP MongoDB con Script Automático
# =======================================

# Imagen base de MongoDB
FROM mongo:7.0

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el script al contenedor
COPY setup_myapp.sh /app/setup_myapp.sh

# Damos permisos de ejecución al script
RUN chmod +x /app/setup_myapp.sh

# Exponemos el puerto por si se quiere conectar desde Compass
EXPOSE 27017

# Comando que se ejecuta al iniciar el contenedor:
# 1. Arranca mongod en background
# 2. Espera unos segundos
# 3. Ejecuta el script para crear la base "myapp"
CMD ["bash", "-c", "mongod --fork --logpath /var/log/mongodb.log && sleep 5 && bash /app/setup_myapp.sh && tail -f /var/log/mongodb.log"]
