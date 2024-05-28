/***********************************************************************************************
 * Objetivo: Criar uma estrutura para trazer informações sobre os dados da ACME Filmes         *
 * Autor: Raica Martinez                                                                   *
 * Data: 23/01/2024                                                                            *
 * Versão: 1.0                                                                                 *
***********************************************************************************************/
const dados = require('../modulo/filmes.js')


// função para puxar os filmes
const getFilmes = () => {
    const filmesInfo = dados.filmes.filmes

    // array = filmes
    // json = será enviado p array
    let filmesArray = []
    let filmesJSON = {}

    // criando o JSON
    filmesInfo.forEach((filme) => {
        let filmesJSON = {
            id: filme.id,
            nome: filme.nome,
            foto_capa: filme.foto_capa,
            sinopse: filme.sinopse,
            duracao: filme.duracao,
            data_lancamento: filme.data_lancamento,
            data_relancamento:filme.data_relancamento,
            preco: filme.valor_unitario
        }

        filmesArray.push(filmesJSON)
    })

    filmesJSON.filmes = filmesArray
    filmesJSON.quantidade = filmesInfo.length

    return filmesJSON
}

// puxa os filmes pelo id (é a intenção)
const getIdFilmes = (idFilme) => {
    let id = idFilme
    let status = false
    let filme = {}


    const filmesInfo = dados.filmes.filmes

    filmesInfo.forEach((filmes) => {
        if (filmes.id == id){
            filme.nome = filmes.nome,
            filme.capa = filmes.foto_capa,
            filme.sinopse = filmes.sinopse,
            filme.duracao = filmes.duracao,
            filme.data_lancamento = filmes.data_lancamento,
            filme.data_relancamento = filmes.data_relancamento,
            filme.preco = filmes.valor_unitario

            status = true    
            
        }
    })
    
    if(status){
        return filme
    } else {
        return false
    }
}

module.exports={
    getFilmes,
    getIdFilmes
}