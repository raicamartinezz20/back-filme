// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

// inserir um novo diretor
const insertDiretor = async (diretorDados) => {
    try {

        let sql

        sql = `insert into tbl_diretores (
                                            nome
                                        )values (
                                            '${diretorDados.nome}'
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

// atualizar um diretor existente filtrando pelo ID
const updateDiretor = async (diretorDados, id) => {
    
    try {

        let sql

        sql = `update tbl_diretores set  
                                    nome = "${diretorDados.nome}"
                                    
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

// excluir um diretor existente filtrando pelo ID
const deleteDiretor = async (id) => {

    try {
        
        let sql = `delete from tbl_diretores where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsDiretor
        let rsDiretor = await prisma.$executeRawUnsafe(sql)
        
        return rsDiretor
        
    } catch (error) {
        
        return false
    }

}

// listar todos os diretores
const selectAllDiretores = async () => {

    try {
        let sql = 'select * from tbl_diretores order by id desc'
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsDiretores
        let rsDiretor = await prisma.$queryRawUnsafe(sql)
        return rsDiretor
    } catch (error) {
        return false
    }
}

// buscar o filme existente filtrando pelo ID
const selectByIdDiretor = async (id) => {

    try {

        // realiza a busca do filme pelo id
        let sql = `select * from tbl_diretores where id=${id}`

        // executa no DBA o script SQL
        let rsDiretor = await prisma.$queryRawUnsafe(sql)
        return rsDiretor

    } catch (error) {
        return false
    }
}

const selectByNome = async (nome) => {
    
    try {
        let sql = `select * from tbl_diretores where nome like '%${nome}%'`
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsDiretor
        let rsDiretor = await prisma.$queryRawUnsafe(sql)

        return rsDiretor
    } catch (error) {
        return false
    }
}

const selectLastId = async () => {
    try {

        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_diretores limit 1' 

        let rsDiretor = await prisma.$queryRawUnsafe(sql)
        return rsDiretor

    } catch (error) {

        return false
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    }
}

module.exports = {
    insertDiretor,
    updateDiretor,
    deleteDiretor,
    selectAllDiretores,
    selectByIdDiretor,
    selectByNome,
    selectLastId
}