/**********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistencias e regra de negócio para os filmes *
 * Data: 30/01/2024                                                                                       *
 * Autor: Raica Martinez                                                                              *
 * 1.0                                                                                                    *
 *********************************************************************************************************/

//Import do arquivo de configuração do Projeto
const message = require('../modulo/config.js')

//import do arquivo DAO para manipular dados dos filmes 
const filmesDAO = require('../model/DAO/filme.js')

//Função para inserir um novo filme
const setNovoFilme = async (dadosFilme) => {

    // cria a variável JSON
    let resultDadosFilme = {}

    //Validação para verificar campos obrigatórios e conistência de dados
    if (dadosFilme.nome == ''            || dadosFilme.nome == undefined            || dadosFilme.nome.length > 80 ||
        dadosFilme.sinopse == ''         || dadosFilme.sinopse == undefined         || dadosFilme.sinopse.length > 65535 ||
        dadosFilme.duracao == ''         || dadosFilme.duracao == undefined         || dadosFilme.duracao.length > 18 ||
        dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento.length > 10 ||
        dadosFilme.foto_capa == ''       || dadosFilme.foto_capa == undefined       || dadosFilme.foto_capa.length > 200 ||
        dadosFilme.valor_unitario.length > 200
    ) {

        return message.ERROR_REQUIRED_FIELDS; // 400

    } else {

        // variável para lidar se poderemos chamar o DAO para inserir os dados
        let dadosValitaded = false

        
        // validação de digitação  para data de relançamento que não é um campo obrigatório
        if (dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != '' && dadosFilme.data_relancamento != undefined) {
            
            
            if (dadosFilme.data_relancamento.length != 10) {
                
                return message.ERROR_REQUIRED_FIELDS
                
            } else {
                dadosValitaded = true
            }
            
        } else {
            dadosValitaded = true
        }
        
        if (dadosValitaded) {
            
            //envia os dados para o DAO inserir no BD
            let novoFilme = await filmesDAO.insertFilme(dadosFilme);

            //validação para verificar se os dados foram inseridos pelo DAO no BD 
            if (novoFilme) {

                // cria o padrão de JSON para retorno dos dados criados no DB
                resultDadosFilme.status = message.SUCCESS_CREATED_ITEM.status
                resultDadosFilme.status_code = message.SUCCESS_CREATED_ITEM.status_code
                resultDadosFilme.message = message.SUCCESS_CREATED_ITEM.message
                resultDadosFilme.filme = dadosFilme

                return resultDadosFilme

            } else {

                return message.ERROR_INTERNAL_SERVER_DBA; // 500  

            }

        }

    }

}


//Função para atualizar um filme existente
const setAtualizarFilme = async () => {

}

//Função para excluir um Filme existente
const setExcluirFilme = async () => {

}

//Função para retornar todos os filmes do database
const getListarFilmes = async () => {

    //Cria o objeto JSON
    let filmesJSON = {}

    //Cria a função DAO para retornar os dados do BD
    let dadosFilmes = await filmesDAO.selectAllFilmes()



    //Validação para criar o JSON de dados
    if (dadosFilmes) {
        if (dadosFilmes.length > 0) {
            filmesJSON.filmes = dadosFilmes
            filmesJSON.quantidade = dadosFilmes.length
            filmesJSON.status_code = 200

            return filmesJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }


}

//Função para retornar filtro do filme pelo ID
const getBuscarFilme = async (id) => {

    let idFilme = id

    let filmeJSON = {}

    //Validação para verificar o ID do Filme antes de encaminhar para o DAO
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID
    } else {

        //Encaminha o ID do filme para o DAO para o retorno do Banco de Dados
        let dadosFilme = await filmesDAO.selectByIdFilme(idFilme)

        //Validação para verificar se o DAO retornou dados
        if (dadosFilme) {

            if (dadosFilme.length > 0) {
                //Cria o JSON de retorno de dados
                filmeJSON.filme = dadosFilme
                filmeJSON.status_code = 200

                return filmeJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}


const getFilmeNome = async function(name) {
    let nomeFilme = name

    let filmeJson = {}

    if (nomeFilme == '' || nomeFilme == undefined) {
        return ERROR_Messages.ERROR_INVALID_NAME
    } else {
        let dadosFilme = await filmesDAO.selectFilmeByName(nomeFilme)

        if (dadosFilme) {

            if (dadosFilme.length > 0) {

                filmeJson.filme = dadosFilme
                filmeJson.status_code = 200

                return filmeJson
            } else {
                return ERROR_Messages.ERROR_NOTFOUND
            }
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getFilmeNome
}
