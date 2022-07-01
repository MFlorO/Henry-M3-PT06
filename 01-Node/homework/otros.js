// BASH.JS!


const commands = require('./commands');

const print = function (output) {
    process.stdout.write(output);
    process.stdout.write("\nprompt > ")
}

process.stdout.write("prompt > ");

process.stdin.on("data", function (data) {

    let args = data.toString().trim().split(" ");
    
    let cmd = args.shift();


    if (commands[cmd]) {

        commands[cmd](args, print);

    } else {
        print("Cmd NOT FOUND")
    }
})



// INDEX.JS!!!




let fs = require('fs');

let request = require("request")



module.exports = {
    pwd: function(print) {
        print(process.cwd())
    },
    date: function(print) {
        print(Date())
    },
    ls: function(args,print){
        fs.readdir(".", function(err,files){
            // console.log(files)
            if(err) throw err;
            print(files.join("n"))
        })
    },
    echo: function(args,print) {
        print(args.join(" "))
    },

    cat: function(args,print){
        fs.readFile(args[0],"utf8",function(err,data){
            if(err) throw err;
            print(data)
        })
    },
    head:function(args,print){
        fs.readFile(args[0],"utf8",function(err,data){
            if(err) throw err;
            print(data.split("\n").splice(0,10).join("\n"))
        })
    },
    tail:function(args,print){
        fs.readFile(args[0],"utf8",function(err,data){
            if(err) throw err;
            print(data.split("\n").splice(-args[1]).join("\n"))
        })
    },
    curl:function(args,print){
        request(args[0],function(err,data){
            if(err) throw err;
            print(data.body)
        })
    }




}


