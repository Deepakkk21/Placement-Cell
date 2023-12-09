// Importing Students from the database
const students = require("../models/student");

module.exports.home = function (req, res) {
    students.find({})
        .then(function (studentsList) {
            return res.render('home', {
                students: studentsList,
                isAuthenticate: true,
                email: req.cookies.user_Id
            });
        })
        .catch(function (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        });
};
