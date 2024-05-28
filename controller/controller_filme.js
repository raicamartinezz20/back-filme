/**********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistencias e regra de negócio para os filmes *
 * Data: 30/01/2024                                                                                       *
 * Autor: Raica Martinez                                                                              *
 * 1.0                                                                                                    *
 *********************************************************************************************************/
// import do arquivo DAO para manipular dados do BD
const filmesDAO = require('../model/DAO/filme.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// função para inserir um novo filme no DBA
const setNovoFilme = async (filmeDados, contentType) => {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosFilme = {}

            //Validação para verificar campos obrigatórios e conistência de dados
            if (filmeDados.nome == ''              || filmeDados.nome == undefined              || filmeDados.nome.length > 100              ||
                filmeDados.sinopse == ''           || filmeDados.sinopse == undefined           || filmeDados.sinopse.length > 7000        ||
                filmeDados.duracao == ''           || filmeDados.duracao == undefined           || filmeDados.duracao.length > 20           ||
                filmeDados.data_lancamento == ''   || filmeDados.data_lancamento == undefined   || filmeDados.data_lancamento.length > 10   ||
                filmeDados.foto_capa == ''         || filmeDados.foto_capa == undefined         || filmeDados.foto_capa.length > 200        ||
                filmeDados.link_trailer == ''      || filmeDados.link_trailer == undefined      || filmeDados.link_trailer.length > 200     || 
                filmeDados.id_classificacao == ''  || filmeDados.id_classificacao == undefined
            ) {

                return message.ERROR_REQUIRED_FIELDS; // 400

            } else {

                // variável para lidar se poderemos chamar o DAO para inserir os dados
                let dadosValitaded = false


                // validação de digitação  para data de relançamento que não é um campo obrigatório
                if (filmeDados.data_relancamento != null && filmeDados.data_relancamento != '' && filmeDados.data_relancamento != undefined) {


                    if (filmeDados.data_relancamento.length != 10) {

                        return message.ERROR_REQUIRED_FIELDS

                    } else {
                        dadosValitaded = true
                    }

                } else {
                    dadosValitaded = true
                }

                if (dadosValitaded) {
        
                    //envia os dados para o DAO inserir no BD
                    let novoFilme = await filmesDAO.insertFilme(filmeDados);

                    //validação para verificar se os dados foram inseridos pelo DAO no BD 
                    if (novoFilme) {

                        let id = await filmesDAO.selectLastId()

                        filmeDados.id = Number(id[0].id)

                        // cria o padrão de JSON para retorno dos dados criados no DB
                        resultDadosFilme.status = message.SUCCESS_CREATED_ITEM.status
                        resultDadosFilme.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        resultDadosFilme.message = message.SUCCESS_CREATED_ITEM.message
                        resultDadosFilme.filme = filmeDados

                        return resultDadosFilme

                    } else {

                        return message.ERROR_INTERNAL_SERVER_DBA // 500

                    }

                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER // 500

    }


}

//função para atualizar um filme existente
const setAtualizarFilme = async (filmeDados, contentType, id) => {

    
    try {
        
        let filme = id
        
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosFilme = {}

            //Validação para verificar campos obrigatórios e consistência de dados
            if (filme == ''                        || filme == undefined                        || 
                filmeDados.nome == ''              || filmeDados.nome == undefined              || filmeDados.nome.length > 100             ||
                filmeDados.sinopse == ''           || filmeDados.sinopse == undefined           || filmeDados.sinopse.length > 7000         ||
                filmeDados.duracao == ''           || filmeDados.duracao == undefined           || filmeDados.duracao.length > 20           ||
                filmeDados.data_lancamento == ''   || filmeDados.data_lancamento == undefined   || filmeDados.data_lancamento.length > 10   ||
                filmeDados.foto_capa == ''         || filmeDados.foto_capa == undefined         || filmeDados.foto_capa.length > 200        ||
                filmeDados.link_trailer == ''      || filmeDados.link_trailer == undefined      || filmeDados.link_trailer.length > 200     || 
                filmeDados.id_classificacao == ''  || filmeDados.id_classificacao == undefined
            ) {

                return message.ERROR_REQUIRED_FIELDS; // 400

            } else {

                // variável para lidar se poderemos chamar o DAO para inserir os dados
                let dadosValitaded = false


                // validação de digitação  para data de relançamento que não é um campo obrigatório
                if (filmeDados.data_relancamento != null && filmeDados.data_relancamento != '' && filmeDados.data_relancamento != undefined) {


                    if (filmeDados.data_relancamento.length != 10) {

                        return message.ERROR_REQUIRED_FIELDS

                    } else {
                        dadosValitaded = true
                    }

                } else {
                    dadosValitaded = true
                }

                if (dadosValitaded) {

                    //envia os dados para o DAO inserir no BD
                    let filmeAtt = await filmesDAO.updateFilme(filmeDados, filme)

                    //validação para verificar se os dados foram inseridos pelo DAO no BD 
                    if (filmeAtt) {
                        
                        filmeDados.id = filme

                        // cria o padrão de JSON para retorno dos dados criados no DB
                        resultDadosFilme.status = message.SUCCESS_UPDATED_ITEM.status
                        resultDadosFilme.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        resultDadosFilme.message = message.SUCCESS_UPDATED_ITEM.message
                        resultDadosFilme.filme = filmeDados

                        return resultDadosFilme

                    } else {

                        return message.ERROR_INTERNAL_SERVER_DBA // 500

                    }

                } else {
                    return message.ERROR_REQUIRED_FIELDS // 400
                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER // 500

    }
    

}

// função para excluir um filme existente
const setExcluirFilme = async (id) => {

    try {

        let filme = id

        let valFilme  = await getBuscarFilme(filme)

        let resultDadosFilme

        if (filme == '' || filme == undefined || isNaN(filme)) {

            return message.ERROR_INVALID_ID // 400

        } else if(valFilme.status == false){

            return message.ERROR_NOT_FOUND // 404

        }else {

            //Envia os dados para a model inserir no BD
            resultDadosFilme = await filmesDAO.deleteFilme(filme)

            //Valida se o BD inseriu corretamente os dados
            if (resultDadosFilme)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// função para listar todos os filmes existentes no DBA
const getListarFilmes = async () => {
    let filmesJSON = {}

    let filmesDados = await filmesDAO.selectAllFilmes()

    if (filmesDados) {
        if (filmesDados.length > 0) {
            filmesJSON.filmes = filmesDados
            filmesJSON.qt = filmesDados.length
            filmesJSON.status_code = 200
            return filmesJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }


}

// função para buscar um filme pelo ID
const getBuscarFilme = async (id) => {
    // recebe o id do filme
    let idFilme = id;
    let filmeJSON = {}

    // validação para ID vazio, indefinido ou não numérico
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let filmeDados = await filmesDAO.selectByIdFilme(idFilme)

        if (filmeDados) {
            // validação para verificar se existem dados de retorno
            if (filmeDados.length > 0) {
                filmeJSON.filmes = filmeDados
                filmeJSON.status_code = 200
                return filmeJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// função para buscar um filme filtrando pelo nome
const getFilmeByNome = async (nome) => {
    let filmesJSON = {}

    let filtro = nome

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let filmesDados = await filmesDAO.selectByNome(filtro)
        if (filmesDados) {
            if (filmesDados.length > 0) {
                filmesJSON.filmes = filmesDados
                filmesJSON.qt = filmesDados.length
                filmesJSON.status_code = 200
                return filmesJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

// função para buscar filmes filtrando pela classificacao
const getFilmeByClassificacao = async (classificacao) => {
    let filmesJSON = {}

    let filtro = classificacao

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let filmesDados = await filmesDAO.selectByClassificacao(filtro)
        if (filmesDados) {
            if (filmesDados.length > 0) {
                filmesJSON.filmes = filmesDados
                filmesJSON.qt = filmesDados.length
                filmesJSON.status_code = 200
                return filmesJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

module.exports = {
    setNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getFilmeByNome,
    getFilmeByClassificacao
}