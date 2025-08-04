const Usuario = require('../model/Usuario')
const Produto = require('../model/Produto')
const Compra = require('../model/Compra')

Produto.hasMany(Compra,{
    ForeignKey: 'idProduto',
    as: 'compras_Produto',
    onDelete:'CASCADE'
})

Usuario.hasMany(Compra,{
    ForeignKey: 'idUsuario',
    as: 'compras_Usuario',
    onDelete:'CASCADE'
})

Compra.belongsTo(Produto,{
    ForeignKey: 'idProduto',
    as: 'produto_Compra',
    allowNull:false
})
Compra.belongsTo(Usuario,{
    ForeignKey: 'idUsuario',
    as: 'usuario_Compra',
    allowNull:false
})

module.exports = {Usuario, Produto, Compra}