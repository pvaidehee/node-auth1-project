const express = require("express");
const db = require("./usersModel");

const router = express.Router();

router.get("/", (req, res) => {
    db.find()
    .then(item => {
        res.status(200).json(items);
    })
    .catch(error => {
        res.status(500).json({ message: "Error finding users" });
    });
});

module.exports = router;