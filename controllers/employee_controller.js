
// importing employee from database

const employee = require("../models/employee");


//sign in functionality
module.exports.signIn= function(req,res){
    return res.render('employee_sign-in',{
        isAuthenticate:false
    });

}

// sign up functionality
module.exports.signUp= function(req,res){
    return res.render('employee_sign-up',{
        isAuthenticate:false
    });
}



module.exports.create=function(req,res){
    console.log(req.body);

    employee.findOne({ email: req.body.email })
        .then(function (docs) {
            if (docs) {
                return res.redirect('../employee/sign-in');
            }

        //checking password and confirm password equal or not
        if(req.body.password!=req.body.confirmPassword){
            console.log("checking password");
            return res.redirect('back');
        }
        employee.create(req.body);
        return res.redirect('../employee/sign-in');
        
    });
    
}

//  creating session

module.exports.createSession = function (req, res) {
    employee.findOne({ email: req.body.email })
        .then(function (foundEmployee) {
            if (!foundEmployee || req.body.password != foundEmployee.password) {
                return res.redirect('back');
            }

            res.cookie("user_Id", foundEmployee.email);
            return res.redirect('../');
        })
        .catch(function (err) {
            console.log("error in signing up", err);
            return res.redirect('back');
        });
};

module.exports.destroySession= function(req,res){
    res.clearCookie("user_Id");
    return res.redirect('../employee/sign-in');
}