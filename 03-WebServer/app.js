
var http = require('http'); // importamos el módulo http para poder trabajar con el protocolo
var fs = require('fs'); //Importamos el módulo fs que nos permite leer y escribir archivos del file system


http.createServer( function(req, res){ // Creamos una serie de events listener, que van a escuchar por requests que ocurren en este socket
 //Para crear un response empezamos escribiendo el header
 res.writeHead(200, { 'Content-Type':'text/html' }) //Le ponemos el status code y algunos pair-values en el header
 
 var html = fs.readFileSync(__dirname +'/template.html', 'utf8'); //Codificamos el buffer para que sea una String
 var nombre = 'Soy Henry'; //Esta es la variable con la que vamos a reemplazar el template
 html = html.replace('{nombre}', nombre); // Usamos el método replace es del objeto String
 res.end(html);

}).listen(1337, '127.0.0.1'); //Por último tenemos que especificar en que puerto y en qué dirección va a estar escuchando nuestro servidor

