# Simple Crud API with Node JS & MySQL

This is a simple application built using Node JS and MySQL.

## Libraries

1. express
2. express-session
3. body-parser
4. mysql
5. dotenv
6. nodemon

## API Endpoints

| Endpoint | Method | Note |
| ----------- | ----------- | ----------- |
| /api/users | GET | To get all the users data |
| /api/users/:id | GET | To get a single user data |
| /api/users/add | POST | To add a new user |
| /api/users/update/:id | PUT | To update an existing user by user id |
| /api/users/delete/:id | DELETE | To delete an existing user by user id |
| /api/movies | GET | To get all the movies data including the average rating |
| /api/movies/:id | GET | To get a single movie data including the average rating |
| /api/movies/add | POST | To add a new user |
| /api/movies/update/:id | PUT | To update an existing user by user id |
| /api/movies/delete/:id | DELETE | To delete an existing user by user id |
| /api/login | POST | To login before rating a movie |
| /api/movies/rate | POST | To rate a movie |

## Database

See and run the `db.sql` to restore the tables in database, there are 3 tables for this application (users, movies and movies_rating)


## How to use

1. Install the necessary libraries by running command `npm install` or `npm i`
2. Change the configuration accordingly in `.env` file
3. Start the application by running command `npm start`
4. Go to Postman and fill the url, e.g: http://localhost:3000/<endpoint>

### 1. /api/users

![get_all_users](https://github.com/arifqieyah/movies_api/blob/master/examples/get_all_users.png?raw=true)

### 2. /api/users/:id

![get_one_user](https://github.com/arifqieyah/movies_api/blob/master/examples/get_one_user.png?raw=true)

### 3. /api/users/add

![add_user](https://github.com/arifqieyah/movies_api/blob/master/examples/add_user.png?raw=true)

### 4. /api/users/update/:id

![update_user](https://github.com/arifqieyah/movies_api/blob/master/examples/update_user.png?raw=true)

### 5. /api/users/delete/:id

![delete_user](https://github.com/arifqieyah/movies_api/blob/master/examples/delete_user.png?raw=true)

### 6. /api/movies

![get_all_movies](https://github.com/arifqieyah/movies_api/blob/master/examples/get_all_movies.png?raw=true)

### 7. /api/movies/:id

![get_one_movie](https://github.com/arifqieyah/movies_api/blob/master/examples/get_one_movie.png?raw=true)

### 8. /api/movies/add

![add_movie](https://github.com/arifqieyah/movies_api/blob/master/examples/add_movie.png?raw=true)

### 9. /api/movies/update/:id

![update_movie](https://github.com/arifqieyah/movies_api/blob/master/examples/update_movie.png?raw=true)

### 10. /api/movies/delete/:id

![delete_movie](https://github.com/arifqieyah/movies_api/blob/master/examples/delete_movie.png?raw=true)

### 11. /api/login

![login_user_empty](https://github.com/arifqieyah/movies_api/blob/master/examples/login_user_empty.png?raw=true)

![login_user_incorrect](https://github.com/arifqieyah/movies_api/blob/master/examples/login_user_incorrect.png?raw=true)

![login_user_success](https://github.com/arifqieyah/movies_api/blob/master/examples/login_user_success.png?raw=true)

### 12. /api/movies/rate

![rate_failed](https://github.com/arifqieyah/movies_api/blob/master/examples/rate_failed.png?raw=true)

![rate_not_loggedin](https://github.com/arifqieyah/movies_api/blob/master/examples/rate_not_loggedin.png?raw=true)

![rate_success](https://github.com/arifqieyah/movies_api/blob/master/examples/rate_success.png?raw=true)
