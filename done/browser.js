var engine = require('engine.io-stream');
var multilevel = require('multilevel');
var manifest = require('./manifest.json');
var EnterInput = require('enter-input');
var List = require('level-list');

var sock = engine('/sock');
var db = multilevel.client(manifest);
sock.pipe(db.createRpcStream()).pipe(sock);

window.db = db;

var input = EnterInput(function(ev) {
  db.put(String(Date.now()), { body: this.value });
  this.value = '';
});

document.body.appendChild(input);

var list = List(db, function (row) {
  var el = document.createElement('p');
  el.appendChild(document.createTextNode(row.body));
  return el;
});

document.body.appendChild(list.el);
