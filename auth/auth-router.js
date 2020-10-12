const express = require("express"); 
const bcrypt = require("bcryptjs");
const db = require("../users/usersModel"); 
const router = express.Router(); 

router.post("/register", (req, res) => {
    const { username, password } = req.body; 
    const rounds = process.env.BCRYPT_ROUNDS || 4;
    db.add({ username, password: bcrypt.hashSync(password, rounds) })
        .then(user => {
            res.status(201).json({ message: `Welcome ${username}!` }); 
        })
        .catch(error => {
            res.status(500).json(error); 
        });
});

router.post("/login", (req, res) => {
    const { username, password } = req.body; 
    db.findBy(username)
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user; 
                res.status(200).json({ message: `Welcome to back ${username}!` })
            } else {
                res.status(401).json({ message: "Credentials unauthorized" }); 
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Unable to login user" }); 
        }); 
}); 

router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            if (error) {
                res.json({ message: "You can checkout but you can never leave" }); 
            } else {
                res.status(200).json({ message: "You will be back" }); 
            }
        })
    } else {
        res.status(200).json({ message: "How did you get here?" }); 
    }
}); 

module.exports = router; 