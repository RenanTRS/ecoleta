const express = require("express");
const server = express();

//Pegar o banco de dados
const db = require("./database/db.js");

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
    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err);
        }
        //mostra a página html com os dados do banco de dados.
        return res.render("search-results.html", {places: rows}); 
    });
});
//ligar o servidor
server.listen(5500);