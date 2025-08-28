const Usuario = require('../model/Usuario')
const Produto = require('../model/Produto')
const Compra = require('../model/Compra')

Produto.hasMany(Compra,{
    ForeignKey: 'idProduto', //Aqui a tabela Produto está relacionada com a Tabela Compra
    as: 'compras_Produto',
    onDelete:'CASCADE'
})

Usuario.hasMany(Compra,{
    ForeignKey: 'idUsuario', //Aqui a tabela Usuario está relacionada com a Tabela Compra
    as: 'compras_Usuario',
    onDelete:'CASCADE'
})

Compra.belongsTo(Produto,{
    ForeignKey: 'idProduto', //Aqui a tabela Compra está relacionada com a Tabela Produto
    as: 'produto_Compra',
    allowNull:false
})
Compra.belongsTo(Usuario,{
    ForeignKey: 'idUsuario', //Aqui a tabela Compra está relacionada com a Tabela Usuario
    as: 'usuario_Compra',
    allowNull:false
})

module.exports = {Usuario, Produto, Compra}

//Aqui é onde relacionamos as tabelas que temos no Banco de Dados