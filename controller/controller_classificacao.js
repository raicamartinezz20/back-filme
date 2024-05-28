// import do arquivo DAO para manipular dados do BD
const classificacaoDAO = require('../model/DAO/classificacao.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// função para inserir uma nova nacionalidade no DBA
const setNovaClassificacao = async (classificacaoDados, contentType) => {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosClassificacao = {}

            //Validação para verificar campos obrigatórios e conistência de dados
            if (classificacaoDados.sigla == ''     || classificacaoDados.sigla == undefined     || classificacaoDados.sigla.length > 2      ||
                classificacaoDados.icone == ''     || classificacaoDados.icone == undefined     || classificacaoDados.icone.length > 200    ||
                classificacaoDados.descricao == '' || classificacaoDados.descricao == undefined || classificacaoDados.descricao.length > 200
            ) {

                return message.ERROR_REQUIRED_FIELDS // 400

            } else {

                    //envia os dados para o DAO inserir no BD
                    let novaClassicacao = await classificacaoDAO.insertClassificacao(classificacaoDados);

                    //validação para verificar se os dados foram inseridos pelo DAO no BD 
                    if (novaClassicacao) {

                        let id = await classificacaoDAO.selectLastId()

                        classificacaoDados.id = Number(id[0].id)

                        // cria o padrão de JSON para retorno dos dados criados no DB
                        resultDadosClassificacao.status = message.SUCCESS_CREATED_ITEM.status
                        resultDadosClassificacao.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        resultDadosClassificacao.message = message.SUCCESS_CREATED_ITEM.message
                        resultDadosClassificacao.classificacao = classificacaoDados

                        return resultDadosClassificacao

                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER // 500

    }


}

//função para atualizar uma nacionalidade existente
const setAtualizarClassificacao = async (classificacaoDados, contentType, id) => {

    
    try {
        
        let classificacao = id
        
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosClassificacao = {}

            //Validação para verificar campos obrigatórios e consistência de dados
            if (classificacao == ''                || classificacao == undefined            || 
                classificacaoDados.sigla == ''     || classificacaoDados.sigla == undefined     || classificacaoDados.sigla.length > 2      ||
                classificacaoDados.icone == ''     || classificacaoDados.icone == undefined     || classificacaoDados.icone.length > 200    ||
                classificacaoDados.descricao == '' || classificacaoDados.descricao == undefined || classificacaoDados.descricao.length > 200
            ) {

                return message.ERROR_REQUIRED_FIELDS; // 400

            } else {

                //envia os dados para o DAO inserir no BD
                let classificacaoAtt = await classificacaoDAO.updateClassificacao(classificacaoDados, classificacao);

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (classificacaoAtt) {
                    
                    classificacaoDados.id = classificacao

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosClassificacao.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosClassificacao.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosClassificacao.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosClassificacao.classificacao = classificacaoDados

                    return resultDadosClassificacao

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

// função para excluir uma nacionalidade existente
const setExcluirClassificacao = async (id) => {

    try {

        let classificacao = id

        let valClassificacao  = await getBuscarClassificacao(classificacao)

        let resultDadosClassificacao

        if (classificacao == '' || classificacao == undefined || isNaN(classificacao)) {

            return message.ERROR_INVALID_ID // 400

        } else if(valClassificacao.status == false){

            return message.ERROR_NOT_FOUND // 404

        }else {

            //Envia os dados para a model inserir no BD
            resultDadosClassificacao = await classificacaoDAO.deleteClassificacao(classificacao)

            //Valida se o BD inseriu corretamente os dados
            if (resultDadosClassificacao)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// função para listar todas as nacionalidade existentes no DBA
const getListarClassificacoes = async () => {
    let classificacaoJSON = {}

    let classificacoesDados = await classificacaoDAO.selectAllClassificacao()
    if (classificacoesDados) {
        if (classificacoesDados.length > 0) {
            classificacaoJSON.classificacoes = classificacoesDados
            classificacaoJSON.qt = classificacoesDados.length
            classificacaoJSON.status_code = 200
            return classificacaoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }


}

// função para buscar uma nacionalidade pelo ID
const getBuscarClassificacao = async (id) => {
    // recebe o id da GegetBuscarClassificacao
    let idClassificacao = id;
    let classificacaoJSON = {}

    // validação para ID vazio, indefinido ou não numérico
    if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let classificacaoDados = await classificacaoDAO.selectByIdClassificacao(idClassificacao)

        if (classificacaoDados) {
            // validação para verificar se existem dados de retorno
            if (classificacaoDados.length > 0) {
                classificacaoJSON.classificacao = classificacaoDados
                classificacaoJSON.status_code = 200
                return classificacaoJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// função para buscar uma nacionalidade filtrando pelo nome
const getClassificacaoByNome = async (nome) => {
    let classificacoesJSON = {}

    let filtro = nome

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let classificacaoDados = await classificacaoDAO.selectByNome(filtro)
        if (classificacaoDados) {
            if (classificacaoDados.length > 0) {
                classificacoesJSON.classificacoes = classificacaoDados
                classificacoesJSON.qt = classificacaoDados.length
                classificacoesJSON.status_code = 200
                return classificacoesJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

module.exports = {
    setNovaClassificacao,
    setAtualizarClassificacao,
    setExcluirClassificacao,
    getListarClassificacoes,
    getBuscarClassificacao,
    getClassificacaoByNome
}