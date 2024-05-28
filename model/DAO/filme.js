/**********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar CRUD no Banco de Dados MySQL                                *
 * Data: 30/01/2024                                                                                       *
 * Autor: Raica Martinez                                                                               *
 * 1.0                                                                                                    *
 *********************************************************************************************************/
// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

// inserir um novo filme
const insertFilme = async (filmeDados) => {
    try {

        let sql

        if(filmeDados.data_relancamento == null || filmeDados.data_relancamento == '' || filmeDados.data_relancamento == undefined){

            sql = `insert into tbl_filme (
                                                nome, 
                                                sinopse, 
                                                duracao, 
                                                data_lancamento,
                                                data_relancamento,
                                                foto_capa,
                                                link_trailer,
                                                id_classificacao
                                            )values (
                                                '${filmeDados.nome}',
                                                '${filmeDados.sinopse}',
                                                '${filmeDados.duracao}',
                                                '${filmeDados.data_lancamento}',
                                                null,
                                                '${filmeDados.foto_capa}',
                                                '${filmeDados.link_trailer}',
                                                ${filmeDados.id_classificacao}
                                            )`

        } else {
            sql = `insert into tbl_filme (
                                                nome, 
                                                sinopse, 
                                                duracao, 
                                                data_lancamento,
                                                data_relancamento,
                                                foto_capa,
                                                link_trailer,
                                                id_classificacao
                                            )values (
                                                '${filmeDados.nome}',
                                                '${filmeDados.sinopse}',
                                                '${filmeDados.duracao}',
                                                '${filmeDados.data_lancamento}',
                                                '${filmeDados.data_relancamento}',
                                                '${filmeDados.foto_capa}',
                                                '${filmeDados.link_trailer}',
                                                ${filmeDados.id_classificacao}
                                            )`
        }

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

// atualizar um filme existente filtrando pelo ID
const updateFilme = async (filmeDados, id) => {
    
    try {

        let sql

        if(filmeDados.data_relancamento == null || filmeDados.data_relancamento == '' || filmeDados.data_relancamento == undefined){

            sql = `update tbl_filme set  
                                        nome = "${filmeDados.nome}",
                                        sinopse = "${filmeDados.sinopse}", 
                                        duracao = "${filmeDados.duracao}", 
                                        data_lancamento = "${filmeDados.data_lancamento}",
                                        data_relancamento = null,
                                        foto_capa = "${filmeDados.foto_capa}",
                                        link_trailer = "${filmeDados.link_trailer}",
                                        id_classificacao = ${filmeDados.id_classificacao}
                                        
                                        where id = ${id}`

        } else {
            sql = `update tbl_filme set  
                                        nome = "${filmeDados.nome}",
                                        sinopse = "${filmeDados.sinopse}", 
                                        duracao = "${filmeDados.duracao}", 
                                        data_lancamento = "${filmeDados.data_lancamento}",
                                        data_relancamento = "${filmeDados.data_relancamento}",
                                        foto_capa = "${filmeDados.foto_capa}",
                                        link_trailer = "${filmeDados.link_trailer}",
                                        id_classificacao = ${filmeDados.id_classificacao}
                                        
                                        where id = ${id}`
        
        }

        console.log(sql);
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

// excluir um filme existente filtrando pelo ID
const deleteFilme = async (id) => {

    try {
        
        let sql = `delete from tbl_filme where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsFilmes
        let rsFilmes = await prisma.$executeRawUnsafe(sql)
        
        return rsFilmes
        
    } catch (error) {
        
        return false
    }

}

// listar todos os filmes
const selectAllFilmes = async () => {

    try {
        let sql = 'select id, nome, sinopse, date_format(data_lancamento, "%Y-%m-%d") as data_lancamento, date_format(data_relancamento, "%Y-%m-%d") as data_relancamento, time_format(duracao, "%H:%i") as duracao, foto_capa, link_trailer, id_classificacao from tbl_filme order by nome asc'
        
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsFilmes
        let rsFilmes = await prisma.$queryRawUnsafe(sql)
        return rsFilmes
    } catch (error) {
        return false
    }
}

// buscar o filme existente filtrando pelo ID
const selectByIdFilme = async (id) => {

    try {

        // realiza a busca do filme pelo id
        let sql = `select id, nome, sinopse, date_format(data_lancamento, "%Y-%m-%d") as data_lancamento, date_format(data_relancamento, "%Y-%m-%d") as data_relancamento, time_format(duracao, "%H:%i") as duracao, foto_capa, link_trailer, id_classificacao from tbl_filme where id=${id}`

        // executa no DBA o script SQL
        let rsFilmes = await prisma.$queryRawUnsafe(sql)
        return rsFilmes

    } catch (error) {
        return false
    }
}

const selectByNome = async (nome) => {
    
    try {
        let sql = `select * from tbl_filme where nome like '%${nome}%'`
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsFilmes
        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes
    } catch (error) {
        return false
    }
}

const selectByClassificacao = async (classificacao) => {
    
    try {
        let sql = `select * from tbl_filme where id_classificacao where '${classificacao}%'`
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsFilmes
        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes
    } catch (error) {
        return false
    }
}

const selectLastId = async () => {
    try {

        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_filme limit 1' 

        let rsFilmes = await prisma.$queryRawUnsafe(sql)
        return rsFilmes

    } catch (error) {

        return false
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    }
}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectByNome,
    selectByClassificacao,
    selectLastId
}