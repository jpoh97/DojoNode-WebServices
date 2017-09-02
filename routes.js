var express = require('express');
var router = express.Router();  //Modulo de express que hace mas simple y mas organizado el e manejo de las rutas del proyecto
var fs = require("fs");  //filesystem

var db = require('./queries');  //Se requiere el el modulo queries que esta dentro del proyecto


router.get("/",  function(req, res){   //para que solo llame cuando esta en esta ruta
	fs.readFile("./views/index.html", function(err,html){   //cargar la pagina de manera asincrona, se pasa el callback con paramtero error y
															// dato, en este caso el html
    res.write(html); //Probar escribiendo el contenido de index  (paso 8)
    res.end();       //finalizar la petición
  });
});

router.get('/users', db.getAll);  		//mediante un metodo get al url ...../users ser le ejecutara la funcion getALL
router.get('/users/:name', db.getByName);  // proveniente de la clase queries y cuya instancia es la variable bd
router.post('/save', db.save);
router.put('/update/:name', db.update);
router.delete('/delete/:name', db.delete);

module.exports = router;    //exporta todo lo que esta almacenado en router
