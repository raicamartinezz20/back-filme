// import do arquivo DAO para manipular dados do BD
const atoresDAO = require('../model/DAO/ator.js')
const atoresNacionalidadeDAO = require('../model/DAO/atorNacionalidade.js')
const controllerSexo = require('./controller_sexo.js')
const controllerNacionalidadeAtores = require('./controller_atoreNacionalidade.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// post: função para inserir um novo ator no DBA
const setNovoAtor = async (atorDados, contentType) => {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosAtor = {}
            let sexoValidacao = await controllerSexo.getBuscarSexo(atorDados.id_sexo) 

            //Validação para verificar campos obrigatórios e conistência de dados
            if (atorDados.nome == ''             || atorDados.nome == undefined              || atorDados.nome.length > 200       ||
                atorDados.data_nascimento == ''  || atorDados.data_nascimento == undefined   ||
                atorDados.biografia == ''        || atorDados.biografia == undefined         || atorDados.biografia.length > 7000 ||
                atorDados.id_sexo == ''          || atorDados.id_sexo == undefined           || sexoValidacao.status_code == false
            ) {

                return message.ERROR_REQUIRED_FIELDS // 400

            } else {

                if(
                    atorDados.data_falecimento != null      &&
                    atorDados.data_falecimento != ''        &&
                    atorDados.data_falecimento != undefined &&
                    atorDados.data_falecimento.length != 10
                ){

                    return message.ERROR_REQUIRED_FIELDS

                }

                    //envia os dados para o DAO inserir no BD
                    let novoAtor = await atoresDAO.insertAtor(atorDados);

                    //validação para verificar se os dados foram inseridos pelo DAO no BD 
                    if (novoAtor) {

                        let id = await atoresDAO.selectLastId()

                        atorDados.id = Number(id[0].id)

                        // cria o padrão de JSON para retorno dos dados criados no DB
                        resultDadosAtor.status = message.SUCCESS_CREATED_ITEM.status
                        resultDadosAtor.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        resultDadosAtor.message = message.SUCCESS_CREATED_ITEM.message
                        resultDadosAtor.ator = atorDados

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
const setAtualizarAtor = async (atorDados, contentType, id) => {

    
    try {
        
        let ator = id
        
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosAtor = {}
            let sexoValidacao = await controllerSexo.getBuscarGender(atorDados.sexo_id) 

            if (ator == ''                       || ator == undefined                        || 
                atorDados.nome == ''             || atorDados.nome == undefined              || atorDados.nome.length > 200        ||
                atorDados.data_nascimento == ''  || atorDados.data_nascimento == undefined   ||
                atorDados.biografia == ''        || atorDados.biografia == undefined         || atorDados.biografia.length > 7000 ||
                atorDados.id_sexo == ''          || atorDados.id_sexo == undefined           || sexoValidacao.status_code == false
            ) {

                return message.ERROR_REQUIRED_FIELDS; // 400

            } else {

                if(
                    atorDados.data_falecimento != null      &&
                    atorDados.data_falecimento != ''        &&
                    atorDados.data_falecimento != undefined &&
                    atorDados.data_falecimento.length != 10
                ){
            
                    return message.ERROR_REQUIRED_FIELDS
                    
                }

                
                //envia os dados para o DAO inserir no BD
                let atorAtt = await atoresDAO.updateAtor(atorDados, ator);

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (atorAtt) {
                    
                    atorDados.id = ator

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosAtor.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosAtor.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosAtor.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosAtor.ator = atorDados

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

    let atoresDados = await atoresDAO.selectAllAtores()

    if (atoresDados) {
        if (atoresDados.length > 0) {
            const promisse = atoresDados.map(async(ator) => {

                let sexo = await controllerSexo.getBuscarSexo(ator.id_sexo)
                let nacionalidade = await controllerNacionalidadeAtores.getListarNacionalidadesAtores(ator.id)

                if(sexo.status_code == 200){
                    ator.sexo = sexo.sexo2 
                }


                if(nacionalidade.status_code == 200){
                    ator.nacionalidades = nacionalidade.nacionalidade_ator 
                }
            })

            await Promise.all(promisse)

            atoresJSON.atores = atoresDados
            atoresJSON.qt = atoresDados.length
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
        let atorDados = await atoresDAO.selectByIdAtor(idAtor)

        if (atorDados) {
            // validação para verificar se existem dados de retorno
            if (atorDados.length > 0) {

                let sexo = await controllerSexo.getBuscarSexo(ator.id_sexo)
                let nacionalidade = await controllerNacionalidadeAtores.getListarNacionalidadesAtores(ator.id)

                if(sexo.status_code == 200){
                    ator.sexo = sexo.sexo2 
                }

                if(nacionalidade.status_code == 200){
                    ator.nacionalidades = nacionalidade.nacionalidade_ator 
                }

                atoresJSON.ator = atorDados
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

        let atorDados = await atoresDAO.selectByNome(filtro)
        if (atorDados) {
            if (atorDados.length > 0) {
                atoresJSON.classificacoes = atorDados
                atoresJSON.qt = atorDados.length
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

const getListarNacionalidadesAtor = async(id) => {
    try {
        
        let idAtor = id
        let nacionalidadeJSON = {} 

        if (idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
            return message.ERROR_INVALID_ID // 400
        } else {
            let dadosNacionalidades = await atoresNacionalidadeDAO.selectAllNacionalidadesByIdAtor(idAtor)

            if(dadosNacionalidades){
                if(dadosNacionalidades.length > 0){
                    nacionalidadeJSON.nacionalidades = dadosNacionalidades
                    nacionalidadeJSON.status_code = 200
                    return nacionalidadeJSON
                } else {
                    return message.ERROR_NOT_FOUND // 404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DBA
            }

        }

    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

module.exports = {
    setNovoAtor,
    setAtualizarAtor,
    setExcluirAtor,
    getListarAtores,
    getBuscarAtor,
    getAtorByNome,
    getListarNacionalidadesAtor
}