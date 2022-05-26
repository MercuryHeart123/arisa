const { MongoClient } = require("mongodb");
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
var crypto = require('crypto')


const loginGet = (req, res) => {
    if (req.session.username) {
        res.send({
            loggedIn: true,
            username: req.session.username,
            admin: req.session.admin
        });
    } else {
        res.send({ loggedIn: false });
    }
}

const loginPost = async (req, res) => {
    let { username, password } = req.body;
    username = username.toLowerCase()
    let query = { username };
    const client = new MongoClient(uri);
    await client.connect();
    let user = await client.db(`${process.env.db_name}`).collection("users").findOne(query);
    if (user) {
        let testPassword = crypto.pbkdf2Sync(password, user.salt,
            1000, 64, `sha512`).toString(`hex`);
        if (testPassword == user.hashPassword) {
            req.session.username = user.username;
            req.session.admin = user.admin;
            let JSONdata = JSON.stringify({
                status: "Authorized",
                username: req.session.username,
                admin: req.session.admin
            });
            client.close();
            res.status(200).end(JSONdata);
        }
        else {
            let JSONdata = JSON.stringify({
                status: "Unauthorized",
                msg: "Username or password was wrong",
            });
            client.close();
            res.status(401).end(JSONdata);
        }
    }
    else {
        let JSONdata = JSON.stringify({
            status: "Unauthorized",
            msg: "Username or password was wrong",
        });
        client.close();
        res.status(401).end(JSONdata);
    }

}

module.exports = {
    loginGet,
    loginPost
}