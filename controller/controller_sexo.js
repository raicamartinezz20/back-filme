// import do arquivo DAO para manipular dados do BD
const sexoDAO = require('../model/DAO/sexo.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// função para inserir um novo genero no DBA
const setNovoSexo = async (sexoDados, contentType) => {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosSexo = {}

            //Validação para verificar campos obrigatórios e conistência de dados
            if (sexoDados.nome == '' || sexoDados.nome == undefined || sexoDados.nome.length > 50 ||
                sexoDados.sigla == '' || sexoDados.sigla == undefined || sexoDados.sigla.length > 2
            ) {

                return message.ERROR_REQUIRED_FIELDS // 400

            } else {

                //envia os dados para o DAO inserir no BD
                let novoSexo = await sexoDAO.insertSexo(sexoDados)

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (novoSexo) {

                    let id = await sexoDAO.selectLastId()

                    sexoDados.id = Number(id[0].id)

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosSexo.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosSexo.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosSexo.message = message.SUCCESS_CREATED_ITEM.message
                    resultDadosSexo.sexo = sexoDados

                    return resultDadosSexo

                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER // 500

    }


}

//função para atualizar um genero existente
const setAtualizarSexo = async (sexoDados, contentType, id) => {

    
    try {
        
        let sexo = id
        
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosSexo = {}

            //Validação para verificar campos obrigatórios e consistência de dados
            if (sexo == '' || sexo == undefined || 
                sexoDados.nome == '' || sexoDados.nome == undefined || sexoDados.nome.length > 20 ||
                sexoDados.sigla == '' || sexoDados.sigla == undefined || sexoDados.sigla.length > 2) {

                return message.ERROR_REQUIRED_FIELDS; // 400

            } else {

                //envia os dados para o DAO inserir no BD
                let sexoAtt = await sexoDAO.updateSexo(sexoDados, sexo);

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (sexoAtt) {
                    
                    sexoDados.id = sexo

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosSexo.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosSexo.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosSexo.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosSexo.sexo = sexoDados

                    return resultDadosSexo

                } else {

                    return message.ERROR_INTERNAL_SERVER_DBA // 500

                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER // 500

    }
    

}

// função para excluir um genero existente
const setExcluirSexo = async (id) => {

    try {

        let sexo = id

        let valSexo  = await getBuscarSexo(sexo)

        let resultDadosNac

        if (sexo == '' || sexo == undefined || isNaN(sexo)) {

            return message.ERROR_INVALID_ID // 400

        } else if(valSexo.status == false){

            return message.ERROR_NOT_FOUND // 404

        }else {

            //Envia os dados para a model inserir no BD
            resultDadosSexo = await sexoDAO.deleteSexo(sexo)

            //Valida se o BD inseriu corretamente os dados
            if (resultDadosSexo)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// função para listar todos os generos existentes no DBA
const getListarSexos = async () => {
    let sexosJSON = {}

    let sexosDados = await sexoDAO.selectAllSexos()

    if (sexosDados) {
        if (sexosDados.length > 0) {
            sexossJSON.sexos = sexosDados
            sexossJSON.qt = sexosDados.length
            sexosJSON.status_code = 200
            return sexosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }


}

// função para buscar um genero pelo ID
const getBuscarSexo = async (id) => {
    // recebe o id do genero
    let idSexo = id;
    let sexoJSON = {}

    // validação para ID vazio, indefinido ou não numérico
    if (idSexo == '' || idSexo == undefined || isNaN(idSexo)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let sexoDados = await sexoDAO.selectByIdSexo(idSexo)

        if (sexoDados) {
            // validação para verificar se existem dados de retorno
            if (sexoDados.length > 0) {
                sexoJSON.sexo = sexoDados
                sexoJSON.status_code = 200
                return sexoJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// função para buscar um genero filtrando pelo nome
const getSexoByNome = async (nome) => {
    let sexosJSON = {}

    let filtro = nome

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let sexoDados = await sexoDAO.selectByNome(filtro)
        if (sexoDados) {
            if (sexoDados.length > 0) {
                sexosJSON.sexos = sexoDados
                sexosJSON.qt = sexoDados.length
                sexosJSON.status_code = 200
                return sexosJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

module.exports = {
    setNovoSexo,
    setAtualizarSexo,
    setExcluirSexo,
    getListarSexos,
    getBuscarSexo,
    getSexoByNome
}