const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs-extra');
const fileUpload = require('express-fileupload');
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ewkr7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('courses'));
app.use(fileUpload());


const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send("hello FAHIM")
})



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const servicesCollection = client.db("codeGlobe").collection("services");
    const testimonialsCollection = client.db("codeGlobe").collection("testimonials");
    console.log('database connected');


    app.get('/services', (req, res) => {
        servicesCollection.find({})
            .toArray((err, service) => {
                res.send(service);
            })
    })


    app.get('/course/:id', (req, res) => {
        const id = req.params.id
        servicesCollection.findOne({ _id: ObjectId(id) })
            .toArray((err, item) => {
                res.send(item);
            })
    })

    app.post('/addService', (req, res) => {
        const file = req.files.file;
        const serviceTitle = req.body.serviceTitle;
        const description = req.body.description;
        const newImg = file.data;
        const encImg = newImg.toString('base64');

        var image = {
            contentType: file.mimetype,
            size: file.size,
            img: Buffer.from(encImg, 'base64')
        };

        testimonialsCollection.insertOne({ serviceTitle, description, image })
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    })

    app.get('/admins', (req, res) => {
        testimonialsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    });

    app.post('/isAdmin', (req, res) => {
        const email = req.body.email;
        testimonialsCollection.find({ email: email })
            .toArray((err, admin) => {
                res.send(admin.length > 0);
            })
    })


});






app.listen(process.env.PORT || port)