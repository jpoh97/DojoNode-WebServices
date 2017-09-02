var express = require('express'); //libreria de express
var bodyParser = require('body-parser'); //Para manejar solicitudes POST en Express.js versión 4 y superior
var routes = require('./routes'); //manejador de rutas de express

var app = express();  //crea el servicio

app.listen(8080, function() {     //se pone a escuchar en el puerto 8080
	console.log("puerto 8080 escuchando");
});

app.use(bodyParser.urlencoded({extend: true})); //le digo al sistema que voy a parsear el cuerpo de la respuesta de la solic
app.use('/', routes); //app.use obtiene el prefijo de URL que desea y el manejador de ruta para él. Esto permite la modularidad en el enrutamiento del lado del servidor.
