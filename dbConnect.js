const express = require('express');
const mysql = require('mysql2');
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mypaie'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connecté à la base de donnée');
});

app.use((req, res, next) => {
    if (db.state === 'disconnected') {
        db.connect((err) => {
            if (err) {
                console.error('Error reconnecting to the database:', err);
                return res.status(500).send('Database connection error');
            }
            console.log('Reconnected to the database');
            next(); 
        });
    } else {
        next();
    }
});
app.get('/', (req, res) => {
    db.query('SELECT * FROM agent', (err, results) => {
        if(err) throw err;
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Serveur est démaré http://localhost:3000');
});

