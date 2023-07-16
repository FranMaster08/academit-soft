# Configuración de Docker Compose

Esta configuración de Docker Compose se utiliza para configurar y ejecutar una aplicación multi-contenedor que consta de un servicio de backend y un servicio de frontend. Los servicios de backend y frontend se construyen utilizando sus respectivos archivos Dockerfile y están conectados a través de una red compartida.

## Requisitos previos
- Docker instalado en tu máquina.

## Instrucciones

1. Clona el repositorio que contiene el archivo Docker Compose.

2. Navega al directorio donde se encuentra el archivo `docker-compose.yml`.

3. Abre una terminal o línea de comandos en ese directorio.

4. Construye y ejecuta los contenedores Docker ejecutando el siguiente comando:

   ```
   docker-compose up
   ```

   Este comando construirá los servicios de backend y frontend, creará una red llamada `my-network` y comenzará los contenedores.

5. Una vez que los contenedores estén en ejecución, puedes acceder al servicio de backend en `http://localhost:3000` y al servicio de frontend en `http://localhost:4173` en tu navegador web.

6. Para detener los contenedores, presiona `Ctrl + C` en la terminal o línea de comandos donde se ejecutó el comando `docker-compose up`. Alternativamente, puedes ejecutar el siguiente comando:

   ```
   docker-compose down
   ```

   Este comando detendrá y eliminará los contenedores, pero mantendrá la configuración de red.

## Configuración

### Servicio de Backend

- El servicio de backend se construye utilizando el archivo Dockerfile ubicado en el directorio `./challenge-backend`.

- El servicio de backend expone el puerto `3000` dentro del contenedor.

- El puerto `3000` del contenedor se mapea al puerto `3000` en la máquina host.

- El servicio de backend está conectado a la red `my-network`.

### Servicio de Frontend

- El servicio de frontend se construye utilizando el archivo Dockerfile ubicado en el directorio `./challenge-frontend`.

- El servicio de frontend expone el puerto `4173` dentro del contenedor.

- El puerto `4173` del contenedor se mapea al puerto `4173` en la máquina host.

- El servicio de frontend está conectado a la red `my-network`.

### Redes

- Se crea la red `my-network` para permitir la comunicación entre los servicios de backend y frontend.

---

Asegúrate de tener las dependencias y configuraciones necesarias antes de ejecutar el comando Docker Compose. Para personalización adicional o uso avanzado, consulta la documentación oficial de Docker Compose.

¡Feliz programación!