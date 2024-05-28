// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

// inserir um novo genero
const insertGenero = async (generoDados) => {
    try {

        let sql

        sql = `insert into tbl_genero (
                                            nome
                                        )values (
                                            '${generoDados.nome}'
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
const updateGenero = async (generoDados, id) => {
    
    try {

        let sql

        sql = `update tbl_genero  set  
                                    nome = "${generoDados.nome}"
                                    
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
const deleteGenero = async (id) => {

    try {
        
        let sql = `delete from tbl_genero where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsGenero
        let rsGenero = await prisma.$executeRawUnsafe(sql)
        
        return rsGenero
        
    } catch (error) {
        
        return false
    }

}

// listar todos as nacionalidades
const selectAllGeneros = async () => {

    try {
        let sql = 'select * from tbl_genero order by id desc'
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsGenero
        let rsGenero = await prisma.$queryRawUnsafe(sql)
        return rsGenero
    } catch (error) {
        return false
    }
}

// buscar o filme existente filtrando pelo ID
const selectByIdGenero = async (id) => {

    try {

        // realiza a busca da nacionalidade pelo id
        let sql = `select * from tbl_genero where id=${id}`

        // executa no DBA o script SQL
        let rsGenero = await prisma.$queryRawUnsafe(sql)
        return rsGenero

    } catch (error) {
        return false
    }
}

const selectByNome = async (nome) => {
    
    try {
        let sql = `select * from tbl_genero where nome like '%${nome}%'`
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsNacionalidade
        let rsGenero = await prisma.$queryRawUnsafe(sql)

        return rsGenero
    } catch (error) {
        return false
    }
}

const selectLastId = async () => {
    try {

        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_genero limit 1' 

        let rsGenero = await prisma.$queryRawUnsafe(sql)
        return rsGenero

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
    selectByNome,
    selectLastId
}