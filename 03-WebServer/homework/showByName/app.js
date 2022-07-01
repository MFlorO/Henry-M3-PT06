var fs = require("fs")
var http = require("http")


//LO MISMO PERO FACTORIZADO Y LLAMDA SINCRONA

http.createServer((req, res) => {

    if (req.url === "/") {
        res.end("ShowByName Api")
    }

    else {
        try {
            const readImage = fs.readFileSync(__dirname + `/images/${req.url}_doge.jpg`)
            
            res.end(readImage)

        } catch (error) {
            res.end("Error 404 imagen no encontrada")
        }
    }
 
}).listen(3001, () => {console.log("Server listen on port 3001")});










//LO MISMO PERO SIN FACTORIZAR
// http.createServer((req,res) => {
//     if(req.url === "/"){
//         res.end("ShowByName Api")
//     }
//     else if(req.url === "/arcoiris"){
//         const readImage = fs.readFileSync(__dirname + "/images/arcoiris_doge.jpg")
//         res.writeHead(200, { 'Content-Type':'image/jpeg' }) 
//         res.end(readImage)
//     }
//     else if(req.url === "/badboy"){
//         const readImage = fs.readFileSync(__dirname + "/images/badboy_doge.jpg")
//         res.writeHead(200, { 'Content-Type':'image/jpeg' }) 
//         res.end(readImage)
//     }
//     else if(req.url === "/code"){
//         const readImage = fs.readFileSync(__dirname + "/images/code_doge.jpg")
//         res.writeHead(200, { 'Content-Type':'image/jpeg' }) 
//         res.end(readImage)
//     }
//     else if(req.url === "/resaca"){
//         const readImage = fs.readFileSync(__dirname + "/images/resaca_doge.jpg")
//         res.writeHead(200, { 'Content-Type':'image/jpeg' }) 
//         res.end(readImage)
//     }
//     else if(req.url === "/retrato"){
//         const readImage = fs.readFileSync(__dirname + "/images/retrato_doge.jpg")
//         res.writeHead(200, { 'Content-Type':'image/jpeg' }) 
//         res.end(readImage)
//     } 
//     else if(req.url === "/sexy"){
//         const readImage = fs.readFileSync(__dirname + "/images/sexy_doge.jpg")
//         res.writeHead(200, { 'Content-Type':'image/jpeg' }) 
//         res.end(readImage)
//     }
//     else {
//         "NO SE PUEDE MOSTRAR LA IMAGEN"
//     }
// }).listen(1337, '127.0.0.1');








//FACTORISADO Y LLAMADA ASINCRONA
// http.createServer((req, res) => {

//     if (req.url === "/") {
//         res.end("ShowByName Api")
//     }

//     else {
//             const readImage = fs.readFile("__dirname + `/images/${req.url}_doge.jpg`","utf-8",((errores,data)=>{
//                 if(errores){
//                     console.log("NO EXISTE ESA IMAGEN")
//                 } else if(data) {
//                     res.end(readImage)
//                 }
//             }))
//     }
 
// }).listen(3001, () => {console.log("Server listen on port 3001")});

