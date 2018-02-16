const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParaser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const cors = require('cors')
// const uploads = multer({dest:'uploads/'});

app.use(cors())
const matchesRoutes = require('./api/routes/matches')
const userRoutes = require('./api/routes/users');
const teamRoutes = require('./api/routes/teams')
// Configuring DB.
const db = require("./config/database")

mongoose.connect(db.mongoURI);
app.use(morgan('dev'))
// app.use('/uploads', express.static('uploads'))
app.use(bodyParaser.urlencoded({ extended: false }));
app.use(bodyParaser.json());



app.use('/match', matchesRoutes)
app.use('/player', userRoutes)
app.use('/teams', teamRoutes)

// app.use((req, res, next) => {
//     // res.header('Access-Control-Allow-Origin','*');
//     // res.header('Access-Control-Allow-Headers','*');
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     if(req.method === "OPTIONS"){
//         res.header('Access-Control-Allow-Methods','PUT','POST','PATCH','DELETE','GET')
//         res.status(200).json({})
//     }
// })

app.use("/",(req, res, next) => {
    let response = {
        data: "Welcome to IPL FUN SERVER"
    }
    res.status(201).json(response);
})

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app;
