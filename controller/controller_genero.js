// import do arquivo DAO para manipular dados do BD
const generosDAO = require('../model/DAO/genero.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// função para inserir uma nova nacionalidade no DBA
const setNovoGenero = async (generoDados, contentType) => {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosGenero = {}

            //Validação para verificar campos obrigatórios e conistência de dados
            if (generoDados.nome == '' || generoDados.nome == undefined || generoDados.nome.length > 50) {

                return message.ERROR_REQUIRED_FIELDS // 400

            } else {

                    //envia os dados para o DAO inserir no BD
                    let novoGenero = await generosDAO.insertGenero(generoDados);

                    //validação para verificar se os dados foram inseridos pelo DAO no BD 
                    if (novoGenero) {

                        let id = await generosDAO.selectLastId()

                        generoDados.id = Number(id[0].id)

                        // cria o padrão de JSON para retorno dos dados criados no DB
                        resultDadosGenero.status = message.SUCCESS_CREATED_ITEM.status
                        resultDadosGenero.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        resultDadosGenero.message = message.SUCCESS_CREATED_ITEM.message
                        resultDadosGenero.genero = generoDados

                        return resultDadosGenero

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
const setAtualizarGenero = async (generoDados, contentType, id) => {

    
    try {
        
        let genero = id
        
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosGenero = {}

            //Validação para verificar campos obrigatórios e consistência de dados
            if (genero == '' || genero == undefined || 
                generoDados.nome == '' || generoDados.nome == undefined || generoDados.nome.length > 100) {

                return message.ERROR_REQUIRED_FIELDS; // 400

            } else {

                //envia os dados para o DAO inserir no BD
                let generoAtt = await generosDAO.updateGenero(generoDados, genero);

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (generoAtt) {
                    
                    generoDados.id = genero

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosGenero.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosGenero.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosGenero.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosGenero.genero = generoDados

                    return resultDadosGenero

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
const setExcluirGenero = async (id) => {

    try {

        let genero = id

        let valGenero  = await getBuscarGenero(genero)

        let resultDadosGenero

        if (genero == '' || genero == undefined || isNaN(genero)) {

            return message.ERROR_INVALID_ID // 400

        } else if(valGenero.status == false){

            return message.ERROR_NOT_FOUND // 404

        }else {

            //Envia os dados para a model inserir no BD
            resultDadosGenero = await generosDAO.deleteGenero(genero)

            //Valida se o BD inseriu corretamente os dados
            if (resultDadosGenero)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// função para listar todas as nacionalidade existentes no DBA
const getListarGeneros = async () => {
    let generosJSON = {}

    let generoDados = await generosDAO.selectAllGeneros()

    if (generoDados) {
        if (generoDados.length > 0) {
            generosJSON.generos = generoDados
            generosJSON.qt = generoDados.length
            generosJSON.status_code = 200
            return generosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }


}

// função para buscar uma nacionalidade pelo ID
const getBuscarGenero = async (id) => {
    // recebe o id da GegetBuscarGenero
    let idGenero = id;
    let generoJSON = {}

    // validação para ID vazio, indefinido ou não numérico
    if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let generoDados = await generosDAO.selectByIdGenero(idGenero)

        if (generoDados) {
            // validação para verificar se existem dados de retorno
            if (generoDados.length > 0) {
                generoJSON.genero = generoDados
                generoJSON.status_code = 200
                return generoJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// função para buscar uma nacionalidade filtrando pelo nome
const getGeneroByNome = async (nome) => {
    let generosJSON = {}

    let filtro = nome

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let generoDados = await generosDAO.selectByNome(filtro)
        if (generoDados) {
            if (generoDados.length > 0) {
                generosJSON.generos = generoDados
                generosJSON.qt = generoDados.length
                generosJSON.status_code = 200
                return generosJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

module.exports = {
    setNovoGenero,
    setAtualizarGenero,
    setExcluirGenero,
    getListarGeneros,
    getBuscarGenero,
    getGeneroByNome
}