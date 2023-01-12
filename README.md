# Task API

This is a simple task management API built with Node.js, Sequelize and PostgreSQL. It allows users to create, read, update and delete tasks. The routes are protected with authentication to ensure only authorized users can access the task data.


## Endpoints

- `POST /tasks`: Create a new task
- `GET /tasks`: Retrieve all tasks
- `GET /tasks/:id`: Retrieve a single task by its id
- `PUT /tasks/:id`: Update a single task by its id
- `DELETE /tasks/:id`: Delete a single task by its id

## Authentication

Authentication is required for all endpoints. The API uses JSON Web Tokens (JWT) for authentication. Users must register and login to receive a token which must be included in the header of every request.

Authorization: Bearer <token>

## Getting started

1. Clone the repository

   git clone git@github.com:erikomis/tasks-backend.git

2. Install the dependencies

  npm install

3. Set up the database
This API uses Sequelize for database management, so you will need to set up your database credentials in the `config/config.json` file.

4. Run the migrations

    npm run sequelize db:migrate

5. Start the server
    npm start

The API will be running on `http://localhost:3000`.


## Conclusion
This is a simple example of a task management API built with Node.js, Sequelize and PostgreSQL. It can be used as a starting point for building more complex applications with similar functionality. It's important to keep in mind that security and scalability of the API need to be taken into account before deploying it in a production environment.
