var restify = require('restify');

function Contato(id, nome, email, idade, restricao) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.idade = idade;
    this.restricao = restricao;
}

var contato1 = new Contato(1, "João", "joao@gmail.com", 46, false)
var contato2 = new Contato(2, "Maria", "maria@gmail.com", 21, false);
var contato3 = new Contato(3, "José", "jose@gmail.com", 18, true);

var contatos = [
    contato1, contato2, contato3
];

function getLastID() {
    return contatos[contatos.length -1].id;
}

/**
 * @api {get} /api/v1/contact Retorna todos os contatos cadastrados
 * @apiName GetContatos
 * @apiGroup Contato
 *
 * @apiSuccess {Object} Lista de contatos.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 * "contatos": [
 *     {
 *       "id": 1,
 *       "nome": "João",
 *       "email": "joao@gmail.com",
 *       "idade": 46,
 *       "restricao": false
 *     },
 *     {
 *       "id": 2,
 *       "nome": "Maria",
 *       "email": "maria@gmail.com",
 *       "idade": 21,
 *       "restricao": false
 *     },
 *     {
 *       "id": 3,
 *       "nome": "José",
 *       "email": "jose@gmail.com",
 *       "idade": 18,
 *       "restricao": true
 *     }
 * ]
 * }
 */
function getAllContacts(request, response, next) {
    var data = {
        contatos: contatos
    };
    response.send(JSON.parse(JSON.stringify(data)));
}

/**
 * @api {get} /api/v1/contact:id Retorna um contato previamente cadastrado através do seu id.
 *
 * @apiParam {Number} id do contato
 *
 * @apiName GetContato
 * @apiGroup Contato
 *
 * @apiSuccess {Integer} id ID do contato
 * @apiSuccess {String} nome Nome do contato
 * @apiSuccess {String} email E-mail do contato
 * @apiSuccess {Boolean} restricao Restrição do contato 
 *
 *  * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * {
 *   "id": 1,
 *   "nome": "João",
 *   "email": "joao@gmail.com",
 *   "idade": 46,
 *   "restricao": false
 * }
 */
function getContactByID(request, response, next) {
    var id = request.params['id'];
    var encontrou = false;
    
    for (var i = 0, tamanho = contatos.length; i < tamanho; i++) {
        if (id == contatos[i].id) {
            response.send(JSON.parse(JSON.stringify(contatos[i])));
            encontrou = true;
            break;
        }
    }
    
    if (!encontrou) {
        var erro = {status:"erro", mensagem: "Registro não encontrado"};
        response.send(JSON.parse(JSON.stringify(erro)));
    }
}

/**
 * @api {post} /api/v1/contact Cria um novo contato.
 *
 * @apiParam {String} nome Mandatory Nome do contato
 * @apiParam {String} email Mandatory E-mail do contato
 * @apiParam {Integer} idade Mandatory Idade do contato 
 * @apiParam {Boolean} restricao Mandatory Restrição do contato
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *       "nome": "Elias",
 *       "email": "elias@gmail.com",
 *       "idade": 35,
 *       "restricao": true
 *    }
 *
 * @apiName PostContato
 * @apiGroup Contato
 *
 * @apiSuccess (201) {String} status Status da submissão (sucesso | erro)
 * @apiSuccess (201) {Object} contato Contato cadastrado com o retorno do ID
 *
 *  * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *
 * {
 *   "status": "sucesso",
 *   "contato": {
 *     "id": 4,
 *     "nome": "Elias",
 *     "email": "elias@gmail.com",
 *     "idade": "35",
 *     "restricao": "true"
 *   }
 * }
 */
function createContact(request, response, next) {
    var body = request.body;
    
    var contato_new = new Contato(
        getLastID() + 1,
        body.nome,
        body.email,
        body.idade,
        body.restricao
    );
    
    var data = {
        status: "sucesso",
        contato: contato_new
    };
    contatos.push(contato_new);
    
    response.send(201, JSON.parse(JSON.stringify(data)));
}


/**
 * @api {put} /api/v1/contact:id Modifica um contato existente.
 *
 * @apiParam {Number} id do contato
 *
 * @apiParam {String} [nome] Optional Nome do contato
 * @apiParam {String} [email] Optional E-mail do contato
 * @apiParam {Integer} [idade] Optional Idade do contato 
 * @apiParam {Boolean} [restricao] OptionalRestrição do contato
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *       "nome": "Elias",
 *       "email": "elias@gmail.com",
 *       "idade": 35,
 *       "restricao": true
 *    }
 *
 * @apiName UpdateContato
 * @apiGroup Contato
 *
 * @apiSuccess {String} status Status da submissão (sucesso | erro)
 * @apiSuccess {Object} contato Contato cadastrado com o retorno do ID
 *
 *  * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 Created
 *
 * {
 *   "status": "sucesso",
 *   "contato": {
 *     "id": 4,
 *     "nome": "Elias",
 *     "email": "elias@gmail.com",
 *     "idade": "35",
 *     "restricao": "true"
 *   }
 * }
 */
function updateContact(request, response, next) {
    var id = request.params['id'];
    var encontrou = false;
    var contatoRetornada;
    
    var body = request.body;
    
    for (var i = 0, tamanho = contatos.length; i < tamanho; i++) {
        if (id == contatos[i].id) {
            encontrou = true;
            contatoRetornado = contatos[i];
            break;
        }
    }
    
    if (encontrou) {
        
        if (body.nome != null) {
            contatoRetornado.nome = body.nome;
        }

        if (body.email != null) {
            contatoRetornado.email = body.email;
        }

        if (body.idade != null) {
            contatoRetornado.idade = body.idade;
        }

        if (body.restricao != null) {
            contatoRetornado.nome = body.restricao;
        }
        
        var data = {
            status: "sucesso",
            contato: contatoRetornado
        };
        
        response.send(JSON.parse(JSON.stringify(data)));
        
    } else {
        var data = {
            status: "erro",
            mensagem: "Registro não encontrado"
        };
        response.send(JSON.parse(JSON.stringify(data)));
    }
}

/**
 * @api {delete} /api/v1/contact:id Remove um contato existente.
 *
 * @apiParam {Number} id do contato
 *
 * @apiName DeleteContato
 * @apiGroup Contato
 *
 * @apiSuccess (202) {String} status Status da submissão (sucesso | erro)
 * @apiSuccess (202) {String} mensagem Mensgaem de retorno da remoção
 * @apiSuccess (202) {Object} contato Contato removido
 *
 *  * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 202 Accepted
 *
 * {
 *   "status": "sucesso",
 *   "mensagem": "Registro removido",
 *   "contato": {
 *     "id": 4,
 *     "nome": "Elias",
 *     "email": "elias@gmail.com",
 *     "idade": "35",
 *     "restricao": "true"
 *   }
 * }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 204 No Content
 */
function deleteContact(request, response, next) {
    var id = request.params['id'];
    var encontrou = false;
    var contato;
    
    for (var i = 0, tamanho = contatos.length; i < tamanho; i++) {
        if (id == contatos[i].id) {
            encontrou = true;
            contato = contatos[i];
            contatos.splice(i, 1);
            break;
        }
    }
    
    if (encontrou) {
        var data = {
            status: "sucesso",
            mensagem: "Registro removido",
            contato: contato
        };
        response.send(202, JSON.parse(JSON.stringify(data)));
    } else {
        var data = {
            status: "erro",
            mensagem: "Registro não encontrado"
        };
        response.send(204, JSON.parse(JSON.stringify(data)));
    }
}

var app = restify.createServer();
app.use(restify.bodyParser());
app.use(restify.authorizationParser());

app.use(function (req, res, next) {
    var users;
    
    users = {
        admin: {
            id: 1,
            password: '12345'
        }
    };

    if (req.username == 'anonymous' || !users[req.username] || req.authorization.basic.password !== users[req.username].password) {
        next(new restify.NotAuthorizedError());
    } else {
        next();
    }

    next();
});


app.get('/api/v1/contact', getAllContacts);
app.get('/api/v1/contact/:id', getContactByID);
app.post('/api/v1/contact', createContact);
app.put('/api/v1/contact/:id', updateContact);
app.del('/api/v1/contact/:id', deleteContact);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('%s escutando em %s', app.name, app.url);    
});