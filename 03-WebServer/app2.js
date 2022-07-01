


var http = require('http'); // importamos el módulo http para poder trabajar con el protocolo
var fs = require('fs'); //Importamos el módulo fs que nos permite leer y escribir archivos del file system


http.createServer( function(req, res){ // Creamos una serie de events listener, que van a escuchar por requests que ocurren en este socket
 //Para crear un response empezamos escribiendo el header
 res.writeHead(200, { 'Content-Type':'application/json' }) //Le ponemos el status code y algunos pair-values en el header
 
 var obj = {
    nombre: 'Juan',
    apellido: 'Perez'
   }; //Creamos un objeto de ejemplo para enviar como response
   
   res.end( JSON.stringify(obj) ); //Antes de enviar el objeto, debemos parsearlo y transformarlo a un string JSON

}).listen(1337, '127.0.0.1'); //Por último tenemos que especificar en que puerto y en qué dirección va a estar escuchando nuestro servidor

