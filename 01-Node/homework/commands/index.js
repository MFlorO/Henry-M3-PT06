var fs = require('fs');
const request = require('request');

function date() {
    process.stdout.write(Date()); 
}

function pwd(){ //pwd es un arrego vacio.. porque anteriormente cmd le saque el primer valor pwd
    process.stdout.write(process.cwd())
}

function ls(){
    fs.readdir('.', function(err, files) { 
        //diredctorio hace referencia a una carpeta. y el "." hace referencia a la carpeta donde estoy parado
        if (err) throw err;
        
        // console.log(files). FILES ES UN ARREGLO!


        // OPCION 1:

        process.stdout.write(files.join("    "));
        process.stdout.write("\nprompt > ")
        
        // OPCION 2:
        // files.forEach(function(file) {
        //   process.stdout.write(file.toString() + "\n");
        // })

        // process.stdout.write("prompt > ");
      });
}

function clear(){
    console.clear()
}

function echo(cmd){
    
    process.stdout.write(cmd.join(" "));
    
}

function cat(cmd){
    console.log(cmd)
    const readFile = fs.readFileSync(cmd[0],"utf8");
    //cmd es un arreglo! Yo quiero recibir solo el valor no el arreglo entero
    process.stdout.write(readFile);

}

function head(cmd){
    fs.readFile(cmd[0],"utf8", function (err,lectura){
        if (err) throw err
        else {
            process.stdout.write(lectura.split("\n").splice(0,10).join("\n"))
        }
        process.stdout.write("\nprompt > ")
    })
}

function tail(cmd){
    fs.readFile(cmd[0],"utf8", function (err,lectura){
        if (err) throw err
        else {

            let ultimasLineas = lectura.split("\n").splice(lineas.length - 6, lineas.length).join("\n")
            process.stdout.write(ultimasLineas)
        }
        process.stdout.write("\nprompt > ")
    })
}

function curl(cmd){

    request(`https://${cmd[0]}`, function(err,repuesta,body){
        if(err) throw new err;
        else{
            process.stdout.write(body);
            process.stdout.write("\nprompt > ")
        }
    })
}



module.exports = {
    date, 
    pwd,
    ls,
    clear,
    echo,
    cat,
    head,
    tail,
    curl,

    
   
}


