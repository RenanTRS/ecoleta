const sqlite3 = require("sqlite3");

//Criar objeto que irá faze alterações no banco de dados
const db = new sqlite3.Database("./src/database/database.db");

//Utilizar o objeto de banco de dados para nossas operações


/*
db.serialize(()=>{
    //Criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            itens TEXT
        );
    `);
    //Inserir dados na tabela
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
        "https://images.unsplash.com/photo-1612965110667-4175024b0dcc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fHJlY3ljbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        "Colectoria",
        "Guilherme Gembala, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ];

    function afterInsertData(err){
        //função callback
        if(err){
            return console.log(err);
        }
        console.log("Cadastrado com sucesso");
        console.log(this);
    }
    //db.run(query, values, afterInsertData);

    //Consultar dados da tabela
    db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err);
        }
        console.log("Aqui estão seus registros: ")
        console.log(rows);
    });
    //Deletar um dado da tabela
    
    db.run(`DELETE FROM places WHERE id = ?`, [3], function(err){
        //db.run(`DELETE FROM places`, function(err){
            if(err){
                return console.log(err);
            }
            console.log("Registro deletado com sucesso!");
        });
    });
*/
    
module.exports = db;