var http = require('http');
var ecstatic = require('ecstatic');
var Engine = require('engine.io-stream');
var multilevel = require('multilevel');
var net = require('net');
var manifest = require('./manifest');

var db = multilevel.client(manifest);

var con = net.connect(8001);
con.pipe(db.createRpcStream()).pipe(con);

var serve = ecstatic(__dirname + '/public');
var server = http.createServer(function(req, res){
  serve(req, res);
});

server.listen(8000, function(){
  console.log('http://localhost:8000');
});

var engine = Engine(function(con){
  con.pipe(multilevel.server(db)).pipe(con);
});

engine.attach(server, '/sock');

