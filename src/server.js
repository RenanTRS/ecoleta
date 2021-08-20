const express = require("express");
const server = express();

//Pegar o banco de dados
const db = require("./database/db.js");

//Configurar pasta public
server.use(express.static("public"));

//Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}));

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
    return res.render("create-point.html"); //Com nunjucks
});
server.post("/savepoint", (req, res)=>{
    //Vai pegar os dados do /create-point
    //console.log(req.body);
    //Inserindo dados na tabela
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            itens
        ) VALUES (?,?,?,?,?,?,?);
    `;
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.itens
    ];
    function afterInsertData(err){
        if(err){
            return console.log(err);
        }
        return res.send("ok");
    }
    db.run(query, values, afterInsertData);
});

server.get("/search", (req, res)=>{
    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err);
        }
        const total = rows.length;
        //mostra a página html com os dados do banco de dados.
        return res.render("search-results.html", {places: rows, total: total}); 
    });
});
//ligar o servidor
server.listen(5500);