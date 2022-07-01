
var express = require("express");
var app = express();

app.listen(3000);



app.use("/", function (req, res, next) {
    console.log("Hicieron un Request a " + req.url);
    next();
  });


// en app.use tiene tres parámetros: los que ya conociamos req y res y uno nuevo, next. 
// Lo que esto quiere decir es que cuando el request vaya a la ruta que especificamos en el primer 
// argumento, en este caso '/', express va a ejecutar el callback, cuando encuentre la función next() 
// le estamos indicando que corra el siguiente middleware, 
// podemos pensar que todos los app.get que veniamos programando también son middleware, por lo tanto 
// son esas funciones las que se ejecutaran luego.



app.get("/", function (req, res) {
    res.send("Hola"); //Ruta para un GET a /
});




app.get("/api", function (req, res) {
    var obj = {
        nombre: "prueba",
        framework: "express",
        ventaja: "serializó por nosotros",
    };
    res.json(obj);
});




//Pasando parametros a la Rutas

//Simple

app.get("/api/:id", function (req, res) {
    res.json({ parametro: req.params.id });
});



//Varios
app.get("/api/:id/:nombre/:valor", function (req, res) {
    res.json({ parametro: req.params.id,
               nombre: req.params.nombre,
               valor: req.params.valor
             });
});




//ENVIAR DATOS AL SERVIDOR

//TOMANDO LOS DATOS

app.get("/datos/", function (req, res) {
    res.json(req.query);
  });


//Query String
// Una forma de enviar datos es hacerlo en la URL a la que apuntamos el request. 
// Para ello nos valemos de una serie de parámetros o datos que se incluyen en la URL. 
// Normalmente distinguimos en la URL por un nombre y un valor separados por el signo igual, 
// y se separan del endpoint por el caracter ?, y entre cada variable por el signo &.






// #################################################

// Si queremos tomar datos que vienen de un formulario vamos a tener que usar un middleware
// Ahora usamos express.json(). También vamos a necesitar crear un formulario en html. 
// Haremos que un GET en /form devuelva un formulario HTML simple. 
// También creamos una nueva ruta, que reciba un POST en la misma URL.

app.get("/form", function (req, res) {
  res.send(
    '<html><head> \
   <link href="/assets/style.css" rel="stylesheet"> \
   </head><body>\
    <form method="POST" action="/form">\
    Nombre <input name="nombre" type="text"><br>\
    Apellido <input name="apellido" type="text"><br>\
    Curso <input name="curso" type="text"><br>\
    <input type="submit">\
    </form>\
   </body></html>'
  );
});

app.use(express.urlencoded({ extended: false }));

app.post("/form", function (req, res) {
  res.json(req.body);
});

// Le decimos a app que use el middelware express.ulrencoded. Ahora vamos a ir a /form y vamos a probar 
// submitear el formulario. Cuando hacemos el submit, el browser genera un request tipo POST, ese request 
// será capturado en la nueva ruta .post() que definimos y luego enviará como response el objeto req.body, 
// que es donde express.son() guarda los datos procesados.


app.use(express.json());
app.post("/formjson", function (req, res) {
  res.json(req.body);
});