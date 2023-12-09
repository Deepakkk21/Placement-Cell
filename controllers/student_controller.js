//  importing students and interviews from datbase

const student = require("../models/student");
const interviews = require("../models/interview");


const { Parser } = require("json2csv");

//  creating students in database
module.exports.createStudent=function(req,res){
    student.create(req.body);
    return res.redirect('back');
}


module.exports.placementPage = async function (req, res) {
    try {
        let students = await student.find({});
        let interviewsList = await interviews.find({});

        return res.render('placementCell', {
            interviews: interviewsList,
            students: students,
            isAuthenticate: true,
            email: req.cookies.user_Id
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports.createInterview=function(req,res){

    interviews.create(req.body);
    return res.redirect('back');
}


// functionality to download the done work
module.exports.download = async function (req, res) {
    try {
        const docs = await interviews.find({});
        const allInterview = [];

        for (let i of docs) {
            let temp = {};
            temp["Company Name"] = i.c_name;
            temp["Student Name"] = i.s_name;
            temp["Status"] = i.status;
            temp["Date"] = i.date;

            // Find the student using promise
            let st = await student.findOne({ s_name: i.s_name });

            temp["College Name"] = st.s_college;
            temp["Dsa Score"] = st.dsa_score;
            temp["Web Score"] = st.web_score;
            temp["React Score"] = st.react_score;
            temp["Batch"] = st.s_batchName;

            allInterview.push(temp);
        }

        const csvheader = ["Company Name", "Student Name", "Status", "Date", "College Name", "Dsa Score", "Web Score", "React Score", "Batch"];
        const parser = new Parser({ csvheader });
        const csv = parser.parse(allInterview);

        res.attachment("placementCellData.csv");
        res.status(200).send(csv);
    } catch (err) {
        console.error("Error while downloading", err);
        return res.status(500).send("Internal Server Error");
    }
};