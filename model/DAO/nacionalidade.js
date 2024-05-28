// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

// inserir uma nova nacionalidade
const insertNacionalidade = async (nacionalidadeDados) => {
    try {

        let sql

        sql = `insert into tbl_nacionalidade (
                                            nome
                                        )values (
                                            '${nacionalidadeDados.nome}'
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

// atualizar uma nacionalidade existente filtrando pelo ID
const updateNacionalidade = async (nacionalidadeDados, id) => {
    
    try {

        let sql

        sql = `update tbl_nacionalidade set  
                                    nome = "${nacionalidadeDados.nome}"
                                    
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

// excluir uma nacionalidade existente filtrando pelo ID
const deleteNacionalidade = async (id) => {

    try {
        
        let sql = `delete from tbl_nacionalidade where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsNacionalidade
        let rsNacionalidade = await prisma.$executeRawUnsafe(sql)
        
        return rsNacionalidade
        
    } catch (error) {
        
        return false
    }

}

// listar todos as nacionalidades
const selectAllNacionalidades = async () => {

    try {
        let sql = 'select * from tbl_nacionalidade order by id desc'
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsNacionalidade
        let rsNacionalidade = await prisma.$queryRawUnsafe(sql)
        return rsNacionalidade
    } catch (error) {
        return false
    }
}

// buscar o filme existente filtrando pelo ID
const selectByIdNacionalidade = async (id) => {

    try {

        // realiza a busca da nacionalidade pelo id
        let sql = `select * from tbl_nacionalidade where id=${id}`

        // executa no DBA o script SQL
        let rsNacionalidade = await prisma.$queryRawUnsafe(sql)
        return rsNacionalidade

    } catch (error) {
        return false
    }
}

const selectByNome = async (nome) => {
    
    try {
        let sql = `select * from tbl_nacionalidade where nome like '%${nome}%'`
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsNacionalidade
        let rsNacionalidade = await prisma.$queryRawUnsafe(sql)

        return rsNacionalidade
    } catch (error) {
        return false
    }
}

const selectLastId = async () => {
    try {

        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_nacionalidade limit 1' 

        let rsNacionalidade = await prisma.$queryRawUnsafe(sql)
        return rsNacionalidade

    } catch (error) {

        return false
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    }
}

module.exports = {
    insertNacionalidade,
    updateNacionalidade,
    deleteNacionalidade,
    selectAllNacionalidades,
    selectByIdNacionalidade,
    selectByNome,
    selectLastId
}