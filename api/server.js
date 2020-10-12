const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const server = express();

const authRouter = require("../auth/auth-router"); 
const usersRouter = require("../users/usersRouter"); 
const authenticateUser = require("../auth/auth-middleware"); 

const sessionConfig = {
    name: 'MyName',
    secret: 'secret-MyName',
    cookie: {
        maxAge: 1000 * 10,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
}

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(session(sessionConfig));

server.use("/api/auth", authRouter);
server.use("/api/users", authenticateUser, usersRouter);

server.get("/", (req, res) => {
    res.send({ message: "Welcome to all you weird coders!"})
});

module.exports = server;
