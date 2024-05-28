// import do arquivo DAO para manipular dados do BD
const diretoresDAO = require('../model/DAO/diretor.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// função para inserir um novo Diretor no DBA
const setNovoDiretor = async (diretorDados, contentType) => {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosDiretor = {}

            //Validação para verificar campos obrigatórios e conistência de dados
            if (diretorDados.nome == '' || diretorDados.nome == undefined || diretorDados.nome.length > 200) {

                return message.ERROR_REQUIRED_FIELDS // 400

            } else {

                    //envia os dados para o DAO inserir no BD
                    let novoDiretor = await diretoresDAO.insertDiretor(diretorDados);

                    //validação para verificar se os dados foram inseridos pelo DAO no BD 
                    if (novoDiretor) {

                        let id = await diretoresDAO.selectLastId()

                        diretorDados.id = Number(id[0].id)

                        // cria o padrão de JSON para retorno dos dados criados no DB
                        resultDadosDiretor.status = message.SUCCESS_CREATED_ITEM.status
                        resultDadosDiretor.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        resultDadosDiretor.message = message.SUCCESS_CREATED_ITEM.message
                        resultDadosDiretor.diretor = diretorDados

                        return resultDadosDiretor
                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER // 500

    }


}

//função para atualizar um diretor existente
const setAtualizarDiretor = async (diretorDados, contentType, id) => {
    
    try {
        
        let diretor = id
        
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosDiretor = {}

            //Validação para verificar campos obrigatórios e consistência de dados
            if (diretor == '' || diretor == undefined || 
                diretorDados.nome == '' || diretorDados.nome == undefined || diretorDados.nome.length > 200) {

                return message.ERROR_REQUIRED_FIELDS // 400

            } else {

                    //envia os dados para o DAO inserir no BD
                    let diretorAtt = await diretoresDAO.updateDiretor(diretorDados, diretor);

                    //validação para verificar se os dados foram inseridos pelo DAO no BD 
                    if (diretorAtt) {
                        
                        diretorDados.id = diretor

                        // cria o padrão de JSON para retorno dos dados criados no DB
                        resultDadosDiretor.status = message.SUCCESS_UPDATED_ITEM.status
                        resultDadosDiretor.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        resultDadosDiretor.message = message.SUCCESS_UPDATED_ITEM.message
                        resultDadosDiretor.diretor = diretorDados

                        return resultDadosDiretor

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

// função para excluir um diretor existente
const setExcluirDiretor = async (id) => {

    try {

        let diretor = id

        let valDiretor  = await getBuscarDiretor(diretor)

        let resultDadosDiretor

        if (diretor == '' || diretor == undefined || isNaN(diretor)) {

            return message.ERROR_INVALID_ID // 400

        } else if(valDiretor.status == false){

            return message.ERROR_NOT_FOUND // 404

        }else {

            //Envia os dados para a model inserir no BD
            resultDadosDiretor = await diretoresDAO.deleteDiretor(diretor)

            //Valida se o BD inseriu corretamente os dados
            if (resultDadosDiretor)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// função para listar todos os diretores existentes no DBA
const getListarDiretores = async () => {
    let diretoresJSON = {}

    let diretoresDados = await diretoresDAO.selectAllDiretores()

    if (diretoresDados) {
        if (diretoresDados.length > 0) {
            diretoresJSON.diretores = diretoresDados
            diretoresJSON.qt = diretoresDados.length
            diretoresJSON.status_code = 200
            return diretoresJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }


}

// função para buscar um diretores pelo ID
const getBuscarDiretor = async (id) => {
    // recebe o id do diretor
    let idDiretor = id
    let diretorJSON = {}

    // validação para ID vazio, indefinido ou não numérico
    if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let diretorDados = await diretoresDAO.selectByIdDiretor(idDiretor)

        if (diretorDados) {
            // validação para verificar se existem dados de retorno
            if (diretorDados.length > 0) {
                diretorJSON.diretor = diretorDados
                diretorJSON.status_code = 200
                return diretorJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// função para buscar um diretor filtrando pelo nome
const getDiretorByNome = async (nome) => {
    let diretoresJSON = {}

    let filtro = nome

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let diretoresDados = await diretoresDAO.selectByNome(filtro)
        if (diretoresDados) {
            if (diretoresDados.length > 0) {
                diretoresJSON.diretores = diretoresDados
                diretoresJSON.qt = diretoresDados.length
                diretoresJSON.status_code = 200
                return diretoresJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

module.exports = {
    setNovoDiretor,
    setAtualizarDiretor,
    setExcluirDiretor,
    getListarDiretores,
    getBuscarDiretor,
    getDiretorByNome
}