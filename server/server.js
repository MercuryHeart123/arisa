require('dotenv').config()
const express = require("express")
const loginRoute = require('./routes/loginRoute')
const logoutRoute = require('./routes/logoutRoute')
const registerRoute = require('./routes/registerRoute')
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express()
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const port = process.env.PORT || 8080
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(express.json({ limit: "100mb" }));
app.use(cookieParser());
app.use(
    session({
        name: process.env.SESSION_NAME,
        resave: false,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET,
        store: MongoStore.create({
            mongoUrl: uri,
            ttl: 3600000 / 1000,
        }),
        cookie: {
            maxAge: 3600000,
            sameSite: true,
            httpOnly: true,
            secure: false,
        },
    })
);


app.use('/login', loginRoute)
app.use('/logout', logoutRoute)
app.use('/register', registerRoute)


app.use((req, res) => {
    res.status(404).send('Error 404 not found')
})

app.listen(port, () => {
    console.log(`server started at port : ${port}`);
})