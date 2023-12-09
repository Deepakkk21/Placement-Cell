const employee = require("../models/employee");

// Middleware to authenticate the employee, as the employee should be logged in to perform every task
module.exports.isAuthenticate = function (req, res, next) {
    if (!req.cookies.user_Id) {
        return res.redirect('../employee/sign-in');
    }

    employee.findOne({ email: req.cookies.user_Id })
        .then(function (emp) {
            if (!emp) {
                // No employee found for the given user_Id
                return res.redirect('../employee/sign-in');
            }

            // Employee found, proceed to the next middleware or route handler
            next();
        })
        .catch(function (err) {
            // Error while finding employee
            console.error("Error while authenticating:", err);
            return res.redirect('back');
        });
};
