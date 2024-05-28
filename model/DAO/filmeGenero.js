const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// inserir um novo gênero para um filme
const insertFilmeGenero = async (dadosFilmeGenero) => {

    try {
        let sql = `insert into tbl_filmes_genero (filme_id, id_genero) values (${dadosFilmeGenero.id_filme}, ${dadosFilmeGenero.id_genero})`
        let resultStatus = await prisma.$executeRawUnsafe(sql)
        if(resultStatus)
            return true
        else
            return false
    } catch (error) {
        return false
    }

}

// atualizar um gênero de um filme existente filtrando pelo ID
const updateFilmeGenero = async (dadosFilmeGenero, idFilmeGenero) => {

    try {
        let sql = `update tbl_filmes_genero set id_filme = ${dadosFilmeGenero.id_filme}, id_genero = ${dadosFilmeGenero.id_genero} where id = ${idFilmeGenero}`   
        let resultStatus = await prisma.$executeRawUnsafe(sql)
        if(resultStatus)
            return true
        else
            return false
    } catch (error) {
        return false
    }

}

// Deletar um gênero existente de um filme filtrando pelo ID
const deleteFilmeGenero = async (id) => {

    try {
        let sql = `delete from tbl_filmes_genero where id = ${id}`
        let rsFilmeGenero = await prisma.$executeRawUnsafe(sql)
        return rsFilmeGenero
    } catch (error) {
        return false
    }

}

// Listar todas as relações de filmes e gêneros existentes na tabela
const selectAllFilmesGeneros = async () => {   

    try {
        let sql = 'select tbl_filmes_genero.id, tbl_filmes_genero.id_filme, tbl_filme.nome as filme, tbl_filmes_genero.id_genero, tbl_genero.nome as genero from tbl_filme_genero as tbl_filmes_genero inner join tbl_filme as tbl_filme on tbl_filmes_genero.id_filme=tbl_filme.id inner join tbl_genero as tbl_genero on tbl_filmes_genero.id_genero=tbl_genero.id order by tbl_filmes_genero.id desc'
        let rsFilmeGenero = await prisma.$queryRawUnsafe(sql)
        return rsFilmeGenero
    } catch (error) {
        return false
    }

}

// Buscar uma relação de filme e gênero existente filtrando pelo ID
const selectByIdFilmeGenero = async (id) => {

    try {
        let sql = `select tbl_filmes_genero.id, tbl_filmes_genero.id_filme, tbl_filme.nome as filme, tbl_filmes_genero.id_genero, tbl_genero.nome as genero from tbl_filme_genero inner join tbl_filme on tbl_filmes_genero.id_filme=tbl_filme.id inner join tbl_genero on tbl_filmes_genero.id_genero=tbl_genero.id where tbl_filmes_genero.id = ${id}`
        let rsFilmeGenero = await prisma.$queryRawUnsafe(sql)
        return rsFilmeGenero
    } catch (error) {
        return false
    }

}

// Buscar o id do último item da tabela
const selectLastId = async () => {
   
    try {
        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_filmes_genero limit 1'
        let rsFilmeGenero = await prisma.$queryRawUnsafe(sql)
        return rsFilmeGenero
    } catch (error) {
        return false
    }

}

module.exports = {
    insertFilmeGenero,
    updateFilmeGenero,
    deleteFilmeGenero,
    selectAllFilmesGeneros,
    selectByIdFilmeGenero,
    selectLastId
}