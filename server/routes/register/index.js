var crypto = require('crypto')
const { MongoClient } = require("mongodb");
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_NAME}`;


const register = async (req, res) => {
    let { username, password, cPassword, email } = req.body;
    username = username.toLowerCase()
    
    let query = { username };
    let status, code
    const client = new MongoClient(uri);
    await client.connect();
    let user = await client.db(`${process.env.db_name}`).collection("users").findOne(query);
    if (!user) {

//-----------------------------------------------------------------------------------------------------        
        if(username.length<5){
            status = "Unsuccess"
            msg = "Username must have at least 5 charactors" //Username length check
            code = 400
        }
 //-----------------------------------------------------------------------------------------------------  

        else{
        let emailQuery = { email }
        emailQuery = await client.db(`${process.env.db_name}`).collection("users").findOne(emailQuery);
        if (!emailQuery) {
//------------------------------------------------------------------------------------------------------
            if(password.length<8){
                status = "Unsuccess"
                msg = "Password must have at least 8 charactors"
                code = 400
            }
//------------------------------------------------------------------------------------------------------
            else if (password == cPassword) {
                let salt = crypto.randomBytes(16).toString('hex')
                let hashPassword = crypto.pbkdf2Sync(password, salt,
                    1000, 64, `sha512`).toString(`hex`);
                let doc = { username, email, hashPassword, salt, admin: true }
                await client.db(`${process.env.db_name}`).collection("users").insertOne(doc);
                status = "Success"
                msg = "Register Successful"
                code = 200
            }
            else {
                status = "Unsuccess"
                msg = "Password and Confirm password doesn't match"
                code = 400
            }

        }
        else {
            status = "Unsuccess"
            msg = "Email already exist"
            code = 400
        }}

    }
    else {
        status = "Unsuccess"
        msg = "Username already exist"
        code = 400
    }
    client.close();
    let JSONdata = JSON.stringify({
        status: status,
        msg: msg
    });
    res.status(code).end(JSONdata);

}
module.exports = {
    register
}