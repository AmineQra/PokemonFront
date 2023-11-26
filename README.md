# PC Pokemon API Project

This project provides a PC Pokemon API with the following details:

- Swagger is available at the root of the bundle and is named `pokemonAPI-swagger.yaml`.

## Getting Started

To run the project, follow these steps:

1. Start the MySQL database using Docker Compose:

   ```bash
   docker-compose up db
   ```

Please note that it might take some time to initialize the MySQL database.

2. Once the database is up, start the API:

   ```bash
   docker-compose up api
   ```

3. Wait for the message "Database is up." This indicates that the API is ready.

4. You can access the API locally at `http://localhost:8000`.

That's it! You are now ready to use the PC Pokemon API.
