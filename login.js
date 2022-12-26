const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const path = require("path");

const connection = mysql.createConnection({
	host: "10.32.6.165",
	user: "dev",
	password: "1rstwap",
	database: "nodelogin"
});

const app = express();

app.use(session({
	secret: 'arifqieyah',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'static')));


app.get('/', (req, res) => {
	if(req.session.loggedin) {
		res.redirect('/home');
	} else {
		res.sendFile(path.join(__dirname + '/login.html'));
	}
});

app.post('/auth', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	if(username && password) {
		connection.query("SELECT * FROM accounts WHERE username = ? AND password = ? ", [username, password], (err, results, fields) => {
			if(err) throw err;

			if(results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/home');
			} else {
				res.send("Incorrect username & password!");
			}

			res.end();
		})

	} else {
		res.send("Please enter username & password!");
		res.end();
	}
});

app.get('/home', (req, res) => {
	if(req.session.loggedin) {		
		res.send("Welcome back " + req.session.username + " click here to <a href='/logout'>Logout</a>");
	} else {
		res.send("Please login to view this page!");
	}
	res.end();
});

app.get('/logout', (req, res) => {
	 req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        // Hapus cokie yang masih tertinggal
//        res.clearCookie('secretname');
		console.log("Logout berhasil!")
        res.redirect('/');
    });
});

app.listen(8000, () => console.log("Listening to port 8000"));