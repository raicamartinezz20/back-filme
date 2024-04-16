//Import do arquivo de configuração do Projeto
const message = require('../modulo/config.js')

//import do arquivo DAO para manipular dados dos genero 
const generoDAO = require('../model/DAO/genero.js')

//Função para inserir um novo genero
const setNovoGenero = async (dadosGenero) => {

    // cria a variável JSON
    let resultDadosGenero = {}

    //Validação para verificar campos obrigatórios e conistência de dados
    if (dadosGenero.nome == ''            || dadosGenero.nome == undefined            || dadosGenero.nome.length > 80 
    ) {

        return message.ERROR_REQUIRED_FIELDS; // 400

    }

    //envia os dados para o DAO inserir no BD
    let novoGenero = await generoDAO.insertGenero(dadosGenero);

    //validação para verificar se os dados foram inseridos pelo DAO no BD 
    if (novoGenero) {

        // cria o padrão de JSON para retorno dos dados criados no DB
        resultDadosGenero.status = message.SUCCESS_CREATED_ITEM.status
        resultDadosGenero.status_code = message.SUCCESS_CREATED_ITEM.status_code
        resultDadosGenero.message = message.SUCCESS_CREATED_ITEM.message
        resultDadosGenero.genero = dadosGenero

        return resultDadosGenero

    } else {

        return message.ERROR_INTERNAL_SERVER_DBA; // 500  
    }
}
//Função para atualizar um genero existente
const setAtualizarGenero = async () => {

}

//Função para excluir um genero existente
const setExcluirGenero = async () => {

}

//Função para retornar todos os genero do database
const getListarGenero = async () => {

    //Cria o objeto JSON
    let generoJSON = {}

    //Cria a função DAO para retornar os dados do BD
    let dadosGenero = await generoDAODAO.selectAllGenero()



    //Validação para criar o JSON de dados
    if (dadosGenero) {
        if (dadosGenero.length > 0) {
            generoJSON.genero = dadosGeneros
            generoJSON.quantidade = dadosGenero.length
            generoJSON.status_code = 200

            return generoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }


}

//Função para retornar filtro do genero pelo ID
const getBuscarGenero = async (id) => {

    let idGenero = id

    let generoJSON = {}

    //Validação para verificar o ID do genero antes de encaminhar para o DAO
    if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {
        return message.ERROR_INVALID_ID
    } else {

        //Encaminha o ID do genero para o DAO para o retorno do Banco de Dados
        let dadosGenero = await generoDAO.selectByIdGenero(idGenero)

        //Validação para verificar se o DAO retornou dados
        if (dadosGenero) {

            if (dadosGenero.length > 0) {
                //Cria o JSON de retorno de dados
                generoJSON.genero = dadosGenero
                generoJSON.status_code = 200

                return generoJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}


const getGeneroNome = async function(name) {
    let nomeGenero = name

    let generoJson = {}

    if (nomeGenero == '' || nomeGenero == undefined) {
        return ERROR_Messages.ERROR_INVALID_NAME
    } else {
        let dadosGenero = await generoDAO.selectGeneroByName(nomeGenero)

        if (dadosGenero) {

            if (dadosGenero.length > 0) {

                generoJson.genero = dadosGenero
                generoJson.status_code = 200

                return generoJson
            } else {
                return ERROR_Messages.ERROR_NOTFOUND
            }
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setNovoGenero,
    setAtualizarGenero,
    setExcluirGenero,
    getListarGenero,
    getBuscarGenero,
    getGeneroNome
}
