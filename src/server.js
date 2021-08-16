const express = require("express");
const server = express();

//Configurar pasta public
server.use(express.static("public"));

//Utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

//Configurar caminhos da minha aplicação
//página inicial
//req: requisição
//res: resposta
server.get("/", (req, res)=>{
    //res.sendFile(__dirname + "/views/index.html"); //Sem nunjucks
    return res.render("index.html", {title: "Alguma coisa aqui"}); //Com nunjucks
});
server.get("/create-point", (req, res)=>{
    //res.sendFile(__dirname + "/views/create-point.html"); //Sem nunjucks
    return res.render("create-point.html"); //Com nunjucks
});
server.get("/search", (req, res)=>{
    //res.sendFile(__dirname + "/views/search-results.html"); //Sem nunjucks
    return res.render("search-results.html"); //Com nunjucks
});
//ligar o servidor
server.listen(5500);