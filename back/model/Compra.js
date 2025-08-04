const {DataTypes} = require('sequelize')
const db = require('../db/conn')
const Compra = db.define('compra',{
    idCompra:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    idProduto:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model:'produtos',
            key:'idProduto'
        }
    },
    idUsuario:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model:'usuarios',
            key:'idUsuario'
        }
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dataCompra: {
        type: DataTypes.DATE,
        allowNull: false
    },
    precoUnitario: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    descontoAplicado: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    precoFinal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    formaPagamento: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
},{
    timestamps:false,
    tableName:'compras'
})

module.exports = Compra

// ● ID da compra (chave primária)
// ● ID do usuário (chave estrangeira)
// ● ID do produto (chave estrangeira)
// ● Quantidade
// ● Data da compra
// ● Preço unitário
// ● Desconto aplicado (%)
// ● Preço final (calculado)
// ● Forma de pagamento
// ● Status da compra