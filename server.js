let express = require("express")
var app = express()
var bodyParser = require('body-parser')
var PouchDB = require('pouchdb')
PouchDB.plugin(require("pouchdb-find"))
var db = new PouchDB('testdb')

const {v4: uuidv4} = require("uuid")

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.use(express.static('static'))
app.use(bodyParser.json());


io.on("connection", (socket) => {
    socket.on('message', (data) => {
        io.emit('message', data)
        console.log(data)
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
            else {
                console.log(err)
            }
        })
        }
    })
    res.send({"status": "success"})
})

server.listen(8000, () => {
    console.log("listening on port 8000")
})
