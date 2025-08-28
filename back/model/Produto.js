const {DataTypes} = require('sequelize')
const db = require('../db/conn')
const Produto = db.define('produto',{
    idProduto:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING(30), // definido como 30, para títulos mais compridos
        allowNull:false
    },
    description:{
        type:DataTypes.STRING(30), // definido como 30, para descrições mais compridas
        allowNull:false
    },
    category:{
        type:DataTypes.STRING(30), // definido como 30, para categorias mais compridas ex.: moda esportiva
         allowNull:false
    },
    price:{
        type:DataTypes.DECIMAL(10,2), // definido como duas casas decimais após a vírgula
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
        type:DataTypes.STRING(30), // 30 para marcas mais compridas como a marca de computadores Lenovo
        allowNull:false
    },
    thumbnail:{
        type:DataTypes.STRING(255), // 255 pois é um link 
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