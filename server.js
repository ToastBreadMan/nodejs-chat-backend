let express = require("express")
var app = express()
var bodyParser = require('body-parser')
var PouchDB = require('pouchdb')
PouchDB.plugin(require("pouchdb-find"))
var db = new PouchDB('testdb')
var cookieParser = require('cookie-parser')
var nodemailer = require("nodemailer")

const {v4: uuidv4} = require("uuid")

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { send } = require("process")
const io = new Server(server);


app.use(express.static('static'))
app.use(bodyParser.json());
app.use(cookieParser())


io.on("connection", (socket) => {
    let user;
    socket.on('message', (data) => {
        io.emit('message', data)
        // find all here satus is offline and send to each of those email with nodemailer
        db.find({
            selector: {status: false},
            fields: ['_id', 'email']
        }).then((data) => {
            if (data.docs.length){
                for (let i = 0; i <=data.docs.length-1;i++) {
                    
                }
            }
        })
    })
    socket.on('join', (data) => {
        console.log('user joined')
         db.find({
             selector: {email: data.email},
             fields: ['_id']
         }).then((data) => {
            if (data.docs.length) {
             user = data.docs[0]   
             db.get(user._id).then((data) => {
                 data.status = true
             }) 
            }
         })
    })
    socket.on('disconnect', () => {
        user.status = false
    })
})

/**
 *
 app.get("/", (req,res) => {
     res.sendfile("test_templates/index.html")
 })
 * 
 */

//Doing all kindes of register stuff 
app.post("/login", (req,res) => {
    var payload = {
       _id: uuidv4(),
       email: req.body.email,
       nodify: req.body.nodify,
       status: false
    }
     db.find({
         selector: {email: req.body.email},
         fields: []
     }).then((data) => {
         if (!data.docs.length){
             db.put(payload, function callback(err, result) {
             if (!err){
                 console.log("user was put in db")
             }
         }).catch((err) => {
             console.log(err)
         })
         }
     })
    res.send({"status": "success"})
})

server.listen(8000, () => {
    console.log("listening on port 8000")
})
