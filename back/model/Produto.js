const {DataTypes} = require('sequelize')
const db = require('../db/conn')
const Produto = db.define('produto',{
    idProduto:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING(30),
        allowNull:false
    },
    description:{
        type:DataTypes.STRING(30),
        allowNull:false
    },
    category:{
        type:DataTypes.STRING(30),
        allowNull:false
    },
    price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    discountPercentage:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    stock:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    brand:{
        type:DataTypes.STRING(30),
        allowNull:false
    },
    thumbnail:{
        type:DataTypes.STRING(255),
        allowNull:false
    }
},{
    timestamps:false,
    tableName:'produto'
})

module.exports = Produto

// ● ID (id)
// ● Título (title)
// ● Descrição (description)
// ● Categoria (category)
// ● Preço (price)
// ● Percentual de desconto (discountPercentage)
// ● Estoque (stock)
// ● Marca (brand)

// ● Imagem (thumbnail) - URL da imagem