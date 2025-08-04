    const {DataTypes} = require('sequelize')
    const db = require('../db/conn')
    const Usuario = db.define('usuario',{
        idUsuario:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        firstName:{
            type:DataTypes.STRING(30),
            allowNull:false
        },
        lastName:{
            type:DataTypes.STRING(30),
            allowNull:false
        },
        age:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING(30),
            allowNull:false
        },
        phone:{
            type:DataTypes.STRING(11),
            allowNull:false
        },
        address:{
            type:DataTypes.STRING(30),
            allowNull:false
        },
        city:{
            type:DataTypes.STRING(30),
            allowNull:false
        },
        state:{
            type:DataTypes.STRING(30),
            allowNull:false
        },
        birthDate:{
            type:DataTypes.DATE,
            allowNull:false
        },

    },{
        timestamps:false,
        tableName:'usuarios'
    })

    module.exports = Usuario


    // ● ID (id)
    // ● Primeiro nome (firstName)
    // ● Sobrenome (lastName)
    // ● Idade (age)
    // ● E-mail (email)
    // ● Telefone (phone)
    // ● Endereço (address)
    // ● Cidade (city)
    // ● Estado (state)
    // ● Data de nascimento (birthDate)