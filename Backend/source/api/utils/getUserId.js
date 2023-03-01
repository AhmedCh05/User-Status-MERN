require('dotenv').config();
const { verify } = require("jsonwebtoken");

const getUserID = (req, res, next) => {
    const auth = req.headers["authorization"];

    const token = auth.split(" ")[1];

    try {
        verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            req.user = user;
            if (!user) {
                return res.sendStatus(401);
            }
            else {
                //console.log(req.user);
                next();
            }
        });

    } catch (err) {
        return res.sendStatus(400).json({ error: err });
    }
}

module.exports = { getUserID }