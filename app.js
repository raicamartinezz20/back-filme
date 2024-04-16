/***********************************************************************************************
 * Objetivo: Criar uma estrutura para trazer informações sobre os dados da ACME Filmes         *
 * Autor: Raica Martinez                                                                   *
 * Data: 23/01/2024                                                                            *
 * Versão: 1.0                                                                                 *
***********************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()


app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors())

    next()
})

/*************************** Import dos arquivos internos do projeto***********************/

const controllerFilmes = require('./controller/controller_filme.js')

/******************************************************************************************/

//EndPoints: listar todos os filmes
app.get('/v1/acme/filmes', cors(), async (request, response, next) => {

    let controleListaFilmes = require('./controller/funcoes.js')
    let filmes = controleListaFilmes.getListarFilmes()
    response.json(filmes)
    response.status(200)
})

//EndPoints: listar filmes pelo id
app.get('/v1/acme/filme/:id', cors(), async (request, response, next) => {

    let controleFilmeId = require('./controller/funcoes.js')
    let id = request.params.id

    let dadosFilme = controleFilmeId.getIdFilme(id)

    if (dadosFilme) {
        response.json(dadosFilme)
        response.status(200)
    } else {
        response.status(404)
        response.json({ erro: "Não foi possivel encontrar um item" })
    }


})

//New EndPoint: retorna dados do Banco De Dados
app.get('/v2/acme/filmes', cors(), async (request, response, next) => {

    //Chama a função para retornar os dados de FIlme
    let dadosFilmes = await controllerFilmes.getListarFilmes()

    //Validação para retornar os dados ou o erro 404
    if (dadosFilmes) {
        response.json(dadosFilmes)
        response.status(200)
    } else {
        response.json({ message: 'Nenhum resgistro encontrado' })
        response.status(404)
    }

})

//EndPoints: listar filmes filtrando pelo id
app.get('/v2/acme/filme/:id', cors(), async (request, response, next) => {

    //Recebe o ID encaminhando a requisição
    let idFilme = request.params.id

    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

app.get('/v2/acmefilmes/filtro/filme/', cors(), async(request, response, next) => {
    let name = request.query.nome

    let dadosFilme = await controllerFilmes.getFilmeNome(name)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

// genero
//New EndPoint: retorna dados do Banco De Dados
app.get('/v2/acme/generos', cors(), async (request, response, next) => {

    //Chama a função para retornar os dados de FIlme
    let dadosGeneros = await controllerGeneros.getListarGenero()

    //Validação para retornar os dados ou o erro 404
    if (dadosGeneros) {
        response.json(dadosGeneros)
        response.status(200)
    } else {
        response.json({ message: 'Nenhum resgistro encontrado' })
        response.status(404)
    }

})

//EndPoints: listar generos filtrando pelo id
app.get('/v2/acme/genero/:id', cors(), async (request, response, next) => {

    //Recebe o ID encaminhando a requisição
    let idGenero = request.params.id

    let dadosGenero = await controllerGeneros.getBuscarGenero(idGenero)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})

app.get('/v2/acmefilmes/filtro/filme/', cors(), async(request, response, next) => {
    let name = request.query.nome

    let dadosFilme = await controllerFilmes.getFilmeNome(name)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

app.listen(8080, function () {
    console.log('servidor rodando na porta 8080')
})