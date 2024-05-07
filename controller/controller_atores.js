// import do arquivo DAO para manipular dados do BD
const atoresDAO = require('../model/DAO/ator.js')
const controllerSexo = require('./controller_sexo.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// post: função para inserir um novo ator no DBA
const setNovoAtor = async (dadosAtor, contentType) => {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosAtor = {}
            let validacaoSexo = await controllerSexo.getBuscarGender(dadosAtor.sexo_id) 

            //Validação para verificar campos obrigatórios e conistência de dados
            if (dadosAtor.nome == ''             || dadosAtor.nome == undefined              || dadosAtor.nome.length > 150       ||
                dadosAtor.data_nascimento == ''  || dadosAtor.data_nascimento == undefined   ||
                dadosAtor.biografia == ''        || dadosAtor.biografia == undefined         || dadosAtor.biografia.length > 65535 ||
                dadosAtor.sexo_id == ''          || dadosAtor.sexo_id == undefined           || validacaoSexo.status_code == false
            ) {

                return message.ERROR_REQUIRED_FIELDS // 400

            } else {

                if(
                    dadosAtor.data_falecimento != null      &&
                    dadosAtor.data_falecimento != ''        &&
                    dadosAtor.data_falecimento != undefined &&
                    dadosAtor.data_falecimento.length != 10
                ){

                    return message.ERROR_REQUIRED_FIELDS

                }

                    //envia os dados para o DAO inserir no BD
                    let novoAtor = await atoresDAO.insertAtor(dadosAtor);

                    //validação para verificar se os dados foram inseridos pelo DAO no BD 
                    if (novoAtor) {

                        let id = await atoresDAO.selectLastId()

                        dadosAtor.id = Number(id[0].id)

                        // cria o padrão de JSON para retorno dos dados criados no DB
                        resultDadosAtor.status = message.SUCCESS_CREATED_ITEM.status
                        resultDadosAtor.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        resultDadosAtor.message = message.SUCCESS_CREATED_ITEM.message
                        resultDadosAtor.ator = dadosAtor

                        return resultDadosAtor

                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER // 500

    }


}

// put: função para atualizar um ator existente
const setAtualizarAtor = async (dadosAtor, contentType, id) => {

    
    try {
        
        let ator = id
        
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosAtor = {}
            let validacaoSexo = await controllerSexo.getBuscarGender(dadosAtor.sexo_id) 

            if (ator == ''                       || ator == undefined                        || 
                dadosAtor.nome == ''             || dadosAtor.nome == undefined              || dadosAtor.nome.length > 150        ||
                dadosAtor.data_nascimento == ''  || dadosAtor.data_nascimento == undefined   ||
                dadosAtor.biografia == ''        || dadosAtor.biografia == undefined         || dadosAtor.biografia.length > 65535 ||
                dadosAtor.sexo_id == ''          || dadosAtor.sexo_id == undefined           || validacaoSexo.status_code == false
            ) {

                return message.ERROR_REQUIRED_FIELDS; // 400

            } else {

                if(
                    dadosAtor.data_falecimento != null      &&
                    dadosAtor.data_falecimento != ''        &&
                    dadosAtor.data_falecimento != undefined &&
                    dadosAtor.data_falecimento.length != 10
                ){
            
                    return message.ERROR_REQUIRED_FIELDS
                    
                }

                
                //envia os dados para o DAO inserir no BD
                let atorAtt = await atoresDAO.updateAtor(dadosAtor, ator);

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (atorAtt) {
                    
                    dadosAtor.id = ator

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosAtor.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosAtor.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosAtor.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosAtor.ator = dadosAtor

                    return resultDadosAtor

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

// delete: função para excluir um ator existente
const setExcluirAtor = async (id) => {

    try {

        let ator = id

        let valAtor  = await getBuscarAtor(ator)

        let resultDadosAtor

        if (ator == '' || ator == undefined || isNaN(ator)) {

            return message.ERROR_INVALID_ID // 400

        } else if(valAtor.status == false){

            return message.ERROR_NOT_FOUND // 404

        }else {

            //Envia os dados para a model inserir no BD
            resultDadosAtor = await atoresDAO.deleteAtor(ator)

            //Valida se o BD inseriu corretamente os dados
            if (resultDadosAtor)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// get: função para listar todas os atores existentes no DBA
const getListarAtores = async () => {
    let atoresJSON = {}

    let dadosAtores = await atoresDAO.selectAllAtores()

    if (dadosAtores) {
        if (dadosAtores.length > 0) {
            const promisse = dadosAtores.map(async(ator) => {

                let sexo = await controllerSexo.getBuscarGender(ator.sexo_id)

                if(sexo.status_code == 200){
                    ator.sexo = sexo.gender 
                }
            })

            await Promise.all(promisse)

            atoresJSON.atores = dadosAtores
            atoresJSON.qt = dadosAtores.length
            atoresJSON.status_code = 200
            return atoresJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }


}

// get: função para buscar um ator pelo ID
const getBuscarAtor = async (id) => {
    // recebe o id da GegetBuscarClassificacao
    let idAtor = id;
    let atoresJSON = {}

    // validação para ID vazio, indefinido ou não numérico
    if (idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosAtor = await atoresDAO.selectByIdAtor(idAtor)

        if (dadosAtor) {
            // validação para verificar se existem dados de retorno
            if (dadosAtor.length > 0) {
                // diva 🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺
                atoresJSON.ator = dadosAtor
                atoresJSON.status_code = 200
                return atoresJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// get: função para buscar um ator filtrando pelo nome
const getAtorByNome = async (nome) => {
    let atoresJSON = {}

    let filtro = nome

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let dadosAtor = await atoresDAO.selectByNome(filtro)
        if (dadosAtor) {
            if (dadosAtor.length > 0) {
                atoresJSON.classificacoes = dadosAtor
                atoresJSON.qt = dadosAtor.length
                atoresJSON.status_code = 200
                return atoresJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

module.exports = {
    setNovoAtor,
    setAtualizarAtor,
    setExcluirAtor,
    getListarAtores,
    getBuscarAtor,
    getAtorByNome
}