const imgController = require('../image')
const { ObjectId } = require('mongodb');
let conn = imgController.conn

const deleteProject = (req, res) => {
    console.log(req.body);
    let { _id } = req.body
    console.log(_id);
    _id = ObjectId(_id)
    conn.collection('project').findOneAndDelete({ _id }, ((err, files) => {
        if (err) {
            console.log(err);
            res.status(500).end();
        }

    }))
    res.status(200).end()
}

const Post = (req, res) => {
    let { name, description, filenames, featureImage, category, _id } = req.body
    if (!featureImage) {
        featureImage = filenames[0] // ถ้าไม่เลือกภาพแสดงมาจะเลือกให้เป็นภาพแรก
    }
    let doc = { name, description, filenames, featureImage, category }
    if (!_id) {
        conn.collection('project').insertOne(doc)
        return res.status(200).end()
    }
    _id = ObjectId(_id)
    let objId = { _id }
    let newValue = { $set: doc };
    conn.collection('project').findOneAndUpdate(objId, newValue, (err, doc) => {
        if (err) {
            console.log(err);
            res.status(500).end()
        }
        res.status(200).end()
    })
}

const postProfile = async(req, res) => {
    let { title, caption, filenames } = req.body
    let doc = {title,caption,filenames};
    await conn.collection('about').find().toArray((err,files)=>{
        
        if(files.length === 0){
            conn.collection('about').insertOne(doc)
            res.status(200).end()
        }
        conn.collection('about').findOneAndUpdate(files[0],{$set:doc},(err,succes)=>{
            if(err){
                console.log(err);
                res.status(500).end()
            }else{
                console.log(succes,"sdsd");
                res.status(200).end()
            }
            
        })
    })
    res.status(200).end()
}

const getProfile = (req,res)=>{
    conn.collection('about').find().toArray((err,files)=>{
        if(err){
            console.log(err);
            res.status(500).end()
        }
        let data = files;
        res.send(data[0])
        console.log(data[0]);
       
    })
}

module.exports = {
    Post,
    deleteProject,
    postProfile,
    getProfile
}