require('dotenv').config()
const conn = require('./db/conn')
const {Usuario, Compra, Produto} = require('./model/rel')

async function syncDataBase(){
    try{
        await conn.sync({force: true})
    }catch(err){
        console.error('erro ao sincronizar com o banco de dados',err)
    }finally{
        await conn.close()
        console.log('conexão com o banco fechada')
    }
}
syncDataBase()