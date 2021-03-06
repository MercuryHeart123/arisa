const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const crypto = require('crypto');
const multer = require('multer');
const mongoose = require('mongoose')
const path = require('path');
const { GridFsStorage } = require('multer-gridfs-storage');

const conn = mongoose.createConnection(uri);
let gfs;

conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads"
    });


});

const storage = new GridFsStorage({
    url: uri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });

const Upload = (req, res) => {
    res.status(200).end('success')
}

const View = (req, res) => {
    // console.log(req.params.filename);
    gfs.find({ filename: req.params.filename }).toArray((err, files) => {

        if (!files[0] || files.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No files available',
            });
        }

        if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/svg+xml') {
            gfs.openDownloadStreamByName(req.params.filename).pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image',
            });
        }
    });
}

const List = (req, res) => {
    if (req.params.category == "all-project") {
        conn.collection("project").find().toArray((err, files) => {
            if (err) {
                console.log(err);
            }
            // Check if files
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: 'No files exist'
                });
            }

            // Files exist
            return res.json(files);
        });

    }
    else if (req.params.category == "all") {
        gfs.find().toArray((err, files) => {
            if (err) {
                console.log(err);
            }
            // Check if files
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: 'No files exist'
                });
            }

            // Files exist
            return res.json(files);
        });
    }
    else if (req.params.category) {
        conn.collection('project').find({ category: req.params.category }).toArray((err, files) => {
            // Check if files
            if (err) {
                console.log(err);
            }
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: 'No files exist'
                });
            }

            // Files exist
            return res.json(files);
        });
    }
}

const Delete = (req, res) => {
    gfs.find({ filename: req.params.filename }).toArray((err, files) => {
        if (err) {
            console.log(err);
        }
        // Check if files
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }

        // Files exist
        conn.collection("uploads.files").deleteMany({ _id: files[0]._id })
        conn.collection("uploads.chunks").deleteMany({ files_id: files[0]._id })
        conn.collection('project').find({ filenames: { $all: [`${req.params.filename}`] } })
            .toArray((err, res) => {
                if (err) {
                    console.log(err);
                    res.status(500).end()
                }
                res.forEach((item, index) => {
                    let doc = {}
                    let text = JSON.stringify(item)
                    let newVal = JSON.parse(text)
                    let fileNameIndex = newVal.filenames.indexOf(req.params.filename);
                    if (fileNameIndex !== -1) {
                        newVal.filenames.splice(fileNameIndex, 1)
                        let filenames = newVal.filenames
                        doc.filenames = filenames
                        if (newVal.featureImage == req.params.filename) {
                            doc.featureImage = filenames[0]
                        }
                        let _id = item._id
                        let objId = { _id }
                        let newValue = { $set: doc };
                        conn.collection('project').findOneAndUpdate(objId, newValue, (err, doc) => {
                            if (err) {
                                console.log(err);
                            }
                        })
                    }
                })

            })
        return res.json(files);
    });
}


module.exports = {
    Upload,
    View,
    Delete,
    List,
    upload,
    conn
}