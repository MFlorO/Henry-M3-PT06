

const commands = require('./commands');





// Output un prompt
process.stdout.write('prompt > ');





// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  let cmd = data.toString().trim().split(" "); // remueve la nueva línea

  let comando = cmd.shift() 
  
  // Utilizo el shift porque lo que escribo en consola es un array entonces yo quiero que el primer comando 
  // me lo saque de el array con el metodo shift.
  
 if (commands[comando]){
     commands[comando](cmd)
 }


//Commands es un objeto que contiene como propiedades todo lo que exporto.
//
// module.exports = {
//     date: function()
//     pwd:function()
// }
//
// Yo se que commands es un objeto por ende voy a buscar dentro de commands el cmd.. Si en el objeto existe cmd,
// osea si cmd existe, osea es true.... Llama a commands en ese comando y invocarlo porque es una funcion.


  else process.stdout.write("El comando no es reconocido")
   
  process.stdout.write('\nprompt > ');

});

