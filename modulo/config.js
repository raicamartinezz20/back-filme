/**********************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelas variaveis globais do projeto, onde haverão mensagens, status_code e outros conteúdos                               *
 * Data: 30/01/2024                                                                                                                                       *
 * Autor: Gustavo Henrique                                                                                                                                *
 * 1.0                                                                                                                                                    *
 *********************************************************************************************************************************************************/

/************************ MENSAGENS DE ERRO DO PROJETO ************************/

const ERROR_INVALID_ID = {status: false, status_code: 400, message: 'O ID encaminhado na requisão não é válido!'}
const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Nenhum item encontrado na requisão!'}
const ERROR_INTERNAL_SERVER_DB = {status: false, status_code: 500, message: 'Ocorreram Erros no processamento do Banco de dados. Contate o administrador da API!'}

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB
}