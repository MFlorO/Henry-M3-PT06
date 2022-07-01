// const bodyParser = require("body-parser");
const express = require("express");


const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.

const posts = [];
var id = 1;

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());



// TODO: your code to handle requests


server.post('/posts', function (req, res) {
    const { author, title, contents } = req.body
    if (!author || !title || !contents) {
        res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para crear el Post" })
    } else {
        let objetoPost = {
            author,
            title,
            contents,
            id
        }

        id++; // asignándole un valor numérico único como propiedad id
        posts.push(objetoPost) //Agregar dicho objeto al array de posts. 
        res.status(200).json(objetoPost)
    }

});

server.post("/posts/author/:author", (req, res) => {
    const { title, contents } = req.body
    const { author } = req.params
    if (!title || !contents || !author) {
        res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para crear el Post" })
        // } else{
        //     let objetoPost = {
        //         author,
        //         title,
        //         contents,
        //         id
        //     }

        //     id++; // asignándole un valor numérico único como propiedad id
        //     posts.push(objetoPost) //Agregar dicho objeto al array de posts. 
        //     res.status(200).json(objetoPost)
    }
})

server.get("/posts", (req, res) => {
    const { term } = req.query;
    if (term) {
        let newArray = []
        posts.map((post) => {
            if (post.title.includes(term) || post.contents.includes(term)) {
                newArray.push(post)
            }
        })
        return res.status(200).json(newArray)
    } else {
        return res.status(200).json(posts)
    }
})



server.get("/posts/:author", (req, res) => {
    const { author } = req.params;

    let newArray = posts.filter((post) => post.author === author)

    if (newArray.length > 0) return res.status(200).json(newArray);

    else return res.status(STATUS_USER_ERROR).json({ error: "No existe ningun post del autor indicado" })

})



server.get("/posts/:author/:title", (req, res) => {
    const { author, title } = req.params;

    let newArray = posts.filter((post) => {
        return post.author === author && post.title === title

    })

    if (newArray.length > 0) return res.status(200).json(newArray);

    else return res.status(STATUS_USER_ERROR).json({ error: "No existe ningun post con dicho titulo y autor indicado" })


})


server.put("/posts", (req, res) => {

    const { id, title, contents } = req.body;

    if (!id || !title || !contents) {
        return res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para modificar el Post" })
    }

    let postFound = posts.find(post => post.id === id)

    if (postFound) {
        postFound.title = title;
        postFound.contents = contents;
        res.status(200).json(postFound)

    } else {
        return res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para modificar el Post" })
    }

})


server.delete("/posts", (req,res) =>{

    const { id } = req.body;

    if (!id) return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})

    let postFound = posts.find(post => post.id === id)

    if (!postFound) return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})

    else {
        posts.forEach((post,index) => {
            if(post.id === id){
                posts.splice(index, 1)
            } 
        })
        return res.status(200).json({ success: true })
    }

})


server.delete("/author", (req,res) => {
    const { author } = req.body;

    if (!author ) {
        return res.status(STATUS_USER_ERROR).json({ error: "No existe el autor indicado"})
    }

    let postFound = posts.find(post => post.author === author)

    if (!postFound) {
        return res.status(STATUS_USER_ERROR).json({ error: "No existe el autor indicado"})
    } else {

        let postArray = posts.filter(post => post.author === author)

        posts.forEach((post,index) => {
            if(post.author === author){
                posts.splice(index,1)
            } 
    })

    res.status(200).json(postArray)
  }
  })

module.exports = { posts, server };
