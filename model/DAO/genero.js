//Import da bibiblioteca do prisma client 
const { PrismaClient } = require('@prisma/client')

//Instanciando a classe PrismaClient
const prisma = new PrismaClient()

//Função para inserir um genero no Banco de Dados
const insertGenero = async () => {

}

//Função para atualizar um genero no Banco de Dados
const updateGenero = async () => {

}

//Função para deletar um Genero no Banco de Dados
const deleteGenero = async () => {

}

//Função para retornar todos os Genero do Banco de Dados
const selectAllGeneros = async () => {

    try{

    
    //Script SQL para buscar todos os registros do database
    let sql = 'select * from tbl_generos'

    //$queryRawUnsafe(sql) ------ Encaminha uma variavel
    //$queryRaw('select * from tbl_generos') ------------- Encaminha direto o script

    //Executa o scriptSQL no DB e guarda o retorno dos dados
    let rsGeneros = await prisma.$queryRawUnsafe(sql)

    return rsGeneros
    
    } catch (error) {
        return false
    }

}

//Função para buscar um Genero no Banco de Dados filtrando pelo ID
const selectByIdGenero = async (id) => {

    try {
        let sql = `select * from tbl_generos where id = ${id}`

        let rsGeneros = await prisma.$queryRawUnsafe(sql)

        return rsGeneros
    
    } catch (error) {
        return false
    }


}

const selectGeneroByName = async function(name) {
    try {
        let sql = `select * from tbl_generos where nome like "%${name}%"`

        let rsGeneros = await prisma.$queryRawUnsafe(sql)

        return rsGeneros
    } catch (error) {
        return false
    }
}

module.exports = {
    insertGenero,
    updateGenero,
    deleteGenero, 
    selectAllGeneros,
    selectByIdGenero,
    selectGeneroByName
}