var mongoose = require('mongoose');  //mongoose es algo que nos permite facilidad a la hora de manejar esquemas y hacer consultar
var Schema = mongoose.Schema;    //se defina una variable Schema

mongoose.connect("mongodb://localhost/dojonode");  //se conecta a la base de datos, en el servidor adecuado y con el nombre de esta

var userSchemaJSON = {    //Cestructura del esquema, en formato json, excelente para nodo porque json surge de js y node esta basado en js
  name : String,          //son objetos, es mucho menos rigido de sql
  username : String
}

var user_schema = new Schema(userSchemaJSON);  //Creacion del esquema como tal
 
var User = mongoose.model("User", user_schema);  //creacion del modelo, este es que conecta con la bd, se le pasa el esquema de la tabla a
                                                 // la que va a mapear

function getAll(req, res){ // función para obtener todos los usuarios
	User.find(function(err, doc) {
        res.send(doc);
  	});
};

function getByName(req, res){ // función para obtener un unico usuario apartir del nombre
	User.findOne({name : req.params.name}, function(err, doc) {
        res.send(doc);
  	});
};

function save(req, res) { //función para guardar un usuario
  var user = new User({name: req.body.name, username: req.body.username});

  user.save(function() {
    res.send("Guardamos tus datos");
  });
};

function remove(req, res) { //función para eliminar un usuario
  User.findOneAndRemove({name: req.params.name}, function(err) {
    if(!err) {
        res.send("Usuario eliminado correctamente");
    } 
  });
};

function update(req, res) { //función para actualizar un usuario. Actualiza su username
  User.findOne({name : req.params.name}, function(err, user) {
        if (err) return handleError(err);
        user.pass = 'otherUsername';
        user.save(function() {
          res.send("Actualizamos tus datos");
        });
  	});
};


/*
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "jpoh97",
  // My db
  database: "mydb"
});

function getAll(req, res, next) {

	con.connect(function(err) {
		if (err) throw err;
	  	con.query("SELECT * FROM customers", function (err, result, fields) {
	    	if (err) throw err;
	    	console.log(result);
	  	});
	});

};*/

module.exports = { // Exporta todos los metodos
	getAll: getAll,
  getByName: getByName,
  save: save,
  delete: remove,
  update: update
};
