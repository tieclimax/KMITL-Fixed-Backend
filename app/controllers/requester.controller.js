const db = require("../models");

// Retrieve all or Search Jobrequest from the database.
exports.findRequester = (req, res) => {
    const Topic = req.query.Topic;
    const Search = req.query.Search;
    db.sequelize
        .query("CALL search_requesters('" + Topic + "','" + Search + "')")
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Jobrequests.",
            });
        });
};

exports.EditProfile = (req, res) => {

    const User_ID = req.body.User_ID;
    const email = req.body.email;
    const Firstname = req.body.Firstname;
    const Lastname = req.body.Lastname;
    const Tel = req.body.Tel;
    const img_profile = req.body.img_profile;

    db.sequelize
        .query(
            "CALL edit_profile('" + User_ID + "','" + email + "','" + Firstname + "','" + Lastname + "','" + Tel + "','" + img_profile + "')"
        )
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Jobrequests.",
            });
        });
};


exports.ChangePassword = (req, res) => {

    const User_ID = req.body.User_ID;
    const username = req.body.username;
    const Oldpassword = req.body.Oldpassword;
    const Newpassword = req.body.Newpassword;

    db.sequelize
        .query(
            "CALL change_password('" + User_ID + "','" + username + "','" + Oldpassword + "','" + Newpassword + "')"
        )
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Jobrequests.",
            });
        });
};  