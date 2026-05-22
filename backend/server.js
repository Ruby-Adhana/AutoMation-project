const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'db-ferrari.cdya8sowa2t3.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: '123456789',
    database: 'db-ferrari'
});

db.connect((err) => {

    if(err){
        console.log(err);
    } else {
        console.log("MySQL Connected");
    }

});

app.get('/', (req,res)=>{
    res.send("Backend Running");
});

app.post('/addBook', (req, res) => {

    const {
        book,
        author,
        status,
        days,
        student,
        className
    } = req.body;

    const sql = `
    INSERT INTO books
    (book_name, author, status, issue_days, student, class_name)
    VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [book, author, status, days, student, className],
        (err, result) => {

            if(err){
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send("Book Added Successfully");
            }

        }
    );

});

app.get('/books', (req,res)=>{

    db.query(
        "SELECT * FROM books",
        (err,result)=>{

            if(err){
                res.status(500).send(err);
            } else {
                res.json(result);
            }

        }
    );

});

app.listen(3000, ()=>{
    console.log("Server Running On Port 3000");
});