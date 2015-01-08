var level = require('level');
var multilevel = require('multilevel');
var net = require('net');
var liveStream = require('level-live-stream');

var db = level(__dirname + '/db', {
  valueEncoding: 'json'
});
liveStream.install(db);
multilevel.writeManifest(db, 'manifest.json');

var server = net.createServer(function(con){
  con.pipe(multilevel.server(db)).pipe(con);
});

server.listen(8001);
console.log('tcp://localhost:8001');
