const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Inserir nacionalidade para um ator
const insertbl_atores_nacionalidadecionalidadeAtor = async (dadosNacionalidadeAtor) => {

    try {
        let sql = `insert into tbl_atores_nacionalidade (nacionalidade_id, atores_id) values (${dadosNacionalidadeAtor.id_nacionalidade}, ${dadosNacionalidadeAtor.id_ator})`
        let resultStatus = await prisma.$executeRawUnsafe(sql)
        if(resultStatus)
            return true
        else
            return false
    } catch (error) {
        return false
    }

}

// Atualizar nacionalidade de um ator existente filtrando pelo ID
const updateNacionalidadeAtor = async (dadosNacionalidadeAtor, idNacionalidadeAtor) => {

    try {
        let sql = `update tbl_atores_nacionalidade set nacionalidade_id = ${dadosNacionalidadeAtor.id_nacionalidade}, id_atores = ${dadosNacionalidadeAtor.id_atores} where id = ${idNacionalidadeAtor}`   
        let resultStatus = await prisma.$executeRawUnsafe(sql)
        if(resultStatus)
            return true
        else
            return false
    } catch (error) {
        return false
    }

}

// Deletar uma nacionalidade existente de um ator filtrando pelo ID
const deleteNacionalidadeAtor = async (id) => {

    try {
        let sql = `delete from tbl_atores_nacionalidade where id = ${id}`
        let rsNacionalidadeAtor = await prisma.$executeRawUnsafe(sql)
        return rsNacionalidadeAtor
    } catch (error) {
        return false
    }

}

// Listar todas as relações de nacionalidades e atores existentes na tabela
const selectAllNacionalidadesAtores = async () => {   

    try {
        let sql = 'select tbl_atores_nacionalidade.id, tbl_atores_nacionalidade.id_atores, tbl_atores.nome as ator, tbl_atores_nacionalidade.id_nacionalidade, tbl_nacionalidade.nome as nacionalidade from tbl_atores_nacionalidade inner join tbl_nacionalidade on tbl_atores_nacionalidade.id_nacionalidade=tbl_nacionalidade.id inner join tbl_atores on tbl_atores_nacionalidade.atores_id=tbl_atores.id order by tbl_atores_nacionalidade.id desc'
        console.log(sql);
        let rsNacionalidadeAtor = await prisma.$queryRawUnsafe(sql)
        return rsNacionalidadeAtor
    } catch (error) {
        return false
    }

}

// Buscar uma relação de nacionalidade e ator existente filtrando pelo ID
const selectByIdNacionalidadeAtor = async (id) => {

    try {
        let sql = `select tbl_atores_nacionalidade.id, tbl_atores_nacionalidade.id_atores, tbl_atores.nome as ator, tbl_atores_nacionalidade.id_nacionalidade, tbl_nacionalidade.nome as nacionalidade from tbl_atores_nacionalidade inner join tbl_nacionalidade on tbl_atores_nacionalidade.nacionalidade_id=tbl_nacionalidade.id inner join tbl_atores as tbl_atores on tbl_atores_nacionalidade.id_atores=tbl_atores.id where tbl_atores_nacionalidade.id = ${id}`
        let rsNacionalidadeAtor = await prisma.$queryRawUnsafe(sql)
        return rsNacionalidadeAtor
    } catch (error) {
        return false
    }

}

// Buscar as nacionalidades de um ator existente filtrando pelo ID
const selectAllNacionalidadesByIdAtor = async (id) => {

    try {
        let sql = `select tbl_nacionalidade.id, tbl_nacionalidade.nome as nacionalidade from tbl_atores_nacionalidade inner join tbl_nacionalidade on tbl_atores_nacionalidade.id_nacionalidade=tbl_nacionalidade.id where tbl_atores_nacionalidade.id_atores = ${id}`
        let rsNacionalidadeAtor = await prisma.$queryRawUnsafe(sql)
        return rsNacionalidadeAtor
    } catch (error) {
        return false
    }

}

// Buscar o id do último item da tabela
const selectLastId = async () => {
   
    try {
        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_atores_nacionalidade limit 1'
        let rsNacionalidadeAtor = await prisma.$queryRawUnsafe(sql)
        return rsNacionalidadeAtor
    } catch (error) {
        return false
    }

}

module.exports = {
    insertbl_atores_nacionalidadecionalidadeAtor,
    updateNacionalidadeAtor,
    deleteNacionalidadeAtor,
    selectAllNacionalidadesAtores,
    selectAllNacionalidadesByIdAtor,
    selectByIdNacionalidadeAtor,
    selectLastId
}