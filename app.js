const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dotenv = require('dotenv');
const func = require('./functions');

const app = express();
dotenv.config();

//session
app.use(session({
	secret: 'thisisasecrettext',
	resave: true,
	saveUninitialized: true
}));
//body parser
app.use(bodyParser.json());

//create db connection
const conn = mysql.createConnection({
	host:  process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
});

//connect to db
conn.connect((err) => {
	if(err) {
		console.error('DB Error: ', err);
		return;
	}
	console.log('DB connected!');
});

//user login
app.post('/api/login', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	if(username && password) {
		if(req.session.loggedin && req.session.userid === req.body.user_id) {
			res.send(func.apiResponse(null, 'User already logged in'));
			res.end();
		}

        conn.query('SELECT * FROM users WHERE username = ? AND password = ? ', [username, password], (err, results) => {
			if(err) console.error(err);
			if(results.length > 0) {
				req.session.loggedin = true;
				req.session.userid = results[0].user_id;
				res.send(func.apiResponse('Logged in success!'));
			} else {
				res.send(func.apiResponse(null, 'Incorrect username & password!'));
			}
			res.end();
		});

	} else {
		res.send(func.apiResponse(null, 'Please enter username & password!'));
		res.end();
	}
});

//get all movies
app.get('/api/movies', (req, res) => {
	let sqlQuery = 'SELECT m.*, AVG(mr.rate) as average_rating FROM movies m LEFT JOIN movies_rating mr ON m.movies_id = mr.movies_id GROUP BY m.movies_id';
	conn.query(sqlQuery, (err, results) => {
		if(err) console.error(err);
		res.send(func.apiResponse(results, err));
	});
});

//get single movie
app.get('/api/movies/:id', (req, res) => {
	let sqlQuery = 'SELECT m.*, AVG(mr.rate) as average_rating FROM movies m LEFT JOIN movies_rating mr ON m.movies_id = mr.movies_id WHERE m.movies_id = ' + req.params.id;
	conn.query(sqlQuery, (err, results) => {
		if(err) console.error(err);
		res.send(func.apiResponse(results, err));
	});
});

//add new movie
app.post('/api/movies/add', (req, res) => {
	let data = {
		title: req.body.title,
		country: req.body.country,
		year: req.body.year,
		created_at: func.getCurrentDate()
	};
	let sqlQuery = 'INSERT INTO movies SET ?';
	conn.query(sqlQuery, data, (err, results) => {
		if(err) console.error(err);
		res.send(func.apiResponse(results, err));
	});
});

//update existing movie
app.put('/api/movies/update/:id', (req, res) => {
	let sqlQuery = 'UPDATE movies SET title = ?, country = ?, year = ?, updated_at = ? WHERE movies_id = ?';
	let data = [req.body.title, req.body.country, req.body.year, func.getCurrentDate(), req.params.id];
	conn.query(sqlQuery, data, (err, results) => {
		if(err) console.error(err);
		res.send(func.apiResponse(results, err));
	});
});

//delete movie
app.delete('/api/movies/delete/:id',(req, res) => {
	conn.query('DELETE FROM movies WHERE movies_id = ?', [req.params.id], (err, results) => {
		if(err) console.error(err);
		res.send(func.apiResponse(results, err));
	});
});

//rate movie
app.post('/api/movies/rate', (req, res) => {
	//user must be logged in to rate a movie
	if(!req.session.loggedin || (req.session.loggedin && req.session.userid !== req.body.user_id)) {
		res.send(func.apiResponse(null,'Please login first!'));
	} else {
		let data = {
			movies_id: req.body.movie_id,
			user_id: req.body.user_id,
			rate: req.body.rate
		};

		if (data.rate < 1 || data.rate > 5) {
			res.send(func.apiResponse(null,'Rate must be between 1 to 5!'));
			return;
		}

		let sqlQuery = 'INSERT INTO movies_rating SET ? ON DUPLICATE KEY UPDATE movies_id = values(movies_id), user_id = values(user_id), rate = values(rate)';
		conn.query(sqlQuery, data, (err, results) => {
			if(err) console.error(err);
			res.send(func.apiResponse(results, err));
		});		
	}
});

//get all users
app.get('/api/users', (req, res) => {
	conn.query('SELECT * FROM users', (err, results) => {
		if(err) console.error(err);
		res.send(func.apiResponse(results, err));
	});
});

//get single users
app.get('/api/users/:id', (req, res) => {
	conn.query('SELECT * FROM users WHERE user_id = ?', [req.params.id], (err, results) => {
		if(err) console.error(err);
		res.send(func.apiResponse(results, err));
	});
});

//add new users
app.post('/api/users/add', (req, res) => {
	let data = {
		username: req.body.username,
		password: req.body.password,
		email: req.body.email
	};
	//check if username exists
	conn.query('SELECT * FROM users WHERE username = ?', [data.username], (err, results) => {
		if(err) console.error(err);
		let isExist = false;
		isExist = results.length > 0;
		//add new user if not exists
		if(!isExist) {
			conn.query('INSERT INTO users SET ?', data, (err, results) => {
				if(err) console.error(err);
				res.send(func.apiResponse(results, err));
			});
		} else {
			res.send(func.apiResponse(null,'Username already exists!'));
		}
	});
});

//update existing users
app.put('/api/users/update/:id', (req, res) => {
	let sqlQuery = 'UPDATE users SET password = ?, email = ? WHERE user_id = ?';
	let data = [req.body.password, req.body.email, req.params.id];
	conn.query(sqlQuery, data, (err, results) => {
		if(err) console.error(err);
		res.send(func.apiResponse(results, err));
	});
});

//delete user
app.delete('/api/users/delete/:id',(req, res) => {
	let sqlQuery = 'DELETE FROM users WHERE user_id = ' + req.params.id;
	conn.query(sqlQuery, (err, results) => {
		if(err) console.error(err);
		res.send(func.apiResponse(results, err));
	});
});

//listen to port
const port = process.env.APP_PORT;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

