// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

// inserir um novo genero
const insertSexo = async (sexoDados) => {
    try {

        let sql

        sql = `insert into tbl_sexo (
                                            nome,
                                            sigla
                                        )values (
                                            '${sexoDados.nome}',
                                            '${sexoDados.sigla}'
                                        )`

    // executa o sciptSQL no DB (devemos usar o comando execute e não o query)
    // o comando execute deve ser utilizado para INSERT, UPDATE, DELETE
    let result = await prisma.$executeRawUnsafe(sql)

    // validação para verificar se o insert funcionou no DB
    if(result){
        return true
    } else {
        return false
    }
    
    
} catch (error) {
    
    return false

    }
}

// atualizar um genero existente filtrando pelo ID
const updateSexo = async (sexoDados, id) => {
    
    try {

        let sql

        sql = `update tbl_sexo set  
                                    nome = "${sexoDados.nome}",
                                    sigla = "${sexoDados.sigla}"
                                    
                                    where id = ${id}`

            // executa o sciptSQL no DB (devemos usar o comando execute e não o query)
            // o comando execute deve ser utilizado para INSERT, UPDATE, DELETE
            let result = await prisma.$executeRawUnsafe(sql)
            

            // validação para verificar se o insert funcionou no DB
            if(result){
                return true
            } else {
                return false
            }

    } catch (error) {
        
        return false

    }

}

// excluir um genero existente filtrando pelo ID
const deleteSexo = async (id) => {

    try {
        
        let sql = `delete from tbl_sexo where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsSexo
        let rsSexo = await prisma.$executeRawUnsafe(sql)
        
        return rsSexo
        
    } catch (error) {
        
        return false
    }

}

// listar todos os generos
const selectAllSexos = async () => {

    try {
        let sql = 'select * from tbl_sexo order by id desc'
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsSexo
        let rsSexo = await prisma.$queryRawUnsafe(sql)
        return rsSexo
    } catch (error) {
        return false
    }
}

// buscar o genero existente filtrando pelo ID
const selectByIdSexo = async (id) => {

    try {

        // realiza a busca da nacionalidade pelo id
        let sql = `select * from tbl_sexo where id=${id}`

        // executa no DBA o script SQL
        let rsSexo = await prisma.$queryRawUnsafe(sql)
        return rsSexo

    } catch (error) {
        return false
    }
}

const selectByNome = async (nome) => {
    
    try {
        let sql = `select * from tbl_sexo where nome like '%${nome}%'`
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsSexo
        let rsSexo = await prisma.$queryRawUnsafe(sql)

        return rsSexo
    } catch (error) {
        return false
    }
}

const selectLastId = async () => {
    try {

        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_sexo limit 1' 

        let rsSexo = await prisma.$queryRawUnsafe(sql)
        return rsSexo

    } catch (error) {

        return false
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    }
}

module.exports = {
    insertSexo,
    updateSexo,
    deleteSexo,
    selectAllSexos,
    selectByIdSexo,
    selectByNome,
    selectLastId
}