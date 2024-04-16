/**********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar CRUD no Banco de Dados MySQL                                *
 * Data: 30/01/2024                                                                                       *
 * Autor: Raica Martinez                                                                               *
 * 1.0                                                                                                    *
 *********************************************************************************************************/

//Import da bibiblioteca do prisma client 
const { PrismaClient } = require('@prisma/client')

//Instanciando a classe PrismaClient
const prisma = new PrismaClient()

//Função para inserir um filme no Banco de Dados
const insertFilme = async () => {

}

//Função para atualizar um filme no Banco de Dados
const updateFilme = async () => {

}

//Função para deletar um filme no Banco de Dados
const deleteFilme = async () => {

}

//Função para retornar todos os Filme do Banco de Dados
const selectAllFilmes = async () => {

    try{

    
    //Script SQL para buscar todos os registros do database
    let sql = 'select * from tbl_filmes'

    //$queryRawUnsafe(sql) ------ Encaminha uma variavel
    //$queryRaw('select * from tbl_generos') ------------- Encaminha direto o script

    //Executa o scriptSQL no DB e guarda o retorno dos dados
    let rsFilmes = await prisma.$queryRawUnsafe(sql)

    return rsFilmes
    
    } catch (error) {
        return false
    }

}

//Função para buscar um filme no Banco de Dados filtrando pelo ID
const selectByIdFilme = async (id) => {

    try {
        let sql = `select * from tbl_filmes where id = ${id}`

        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes
    
    } catch (error) {
        return false
    }


}

const selectFilmeByName = async function(name) {
    try {
        let sql = `select * from tbl_filme where nome like "%${name}%"`

        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme
    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme, 
    selectAllFilmes,
    selectFilmeById,
    selectFilmeByName
}