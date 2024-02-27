/**********************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelas variaveis globais do projeto, onde haverão mensagens, status_code e outros conteúdos                               *
 * Data: 30/01/2024                                                                                                                                       *
 * Autor: Raica Martinez                                                                                                                              *
 * 1.0                                                                                                                                                    *
 *********************************************************************************************************************************************************/

/************************ MENSAGENS DE ERRO DO PROJETO ************************/

const ERROR_INVALID_ID = { status: false, status_code: 400, message: "Id invalido" }

const ERROR_NOTFOUND = { status: false, status_code: 404, message: "Nenhum item encontrado" }

const ERROR_INTERNAL_SERVER_DB = { status: false, status_code: 500, message: "Ocorreram erros no processamento da DB. Contate o administrador da API" }

const ERROR_INVALID_NAME = { status: false, status_code: 400, message: "Formato de Nome Invalido" }

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOTFOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_INVALID_NAME
}