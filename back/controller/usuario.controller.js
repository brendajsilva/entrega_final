const Usuario = require('../model/Usuario')

const cadastrar = async(req,res)=>{
    const dados = req.body
    // Garante que birthDate está no formato YYYY-MM-DD
    if (dados.birthDate) {
        // Se vier como 'YYYY-MM-DDTHH:mm:ss' ou 'YYYY-MM-DD HH:mm:ss', pega só a data
        dados.birthDate = dados.birthDate.substring(0, 10);
    }
    try{
        const valores = await Usuario.create(dados)
        res.status(201).json(valores)
    }
    catch(err){
        console.error("não foi possivel cadastrar o usuario",err)
        res.status(500).json({message:"não foi possivel cadastrar o usuario"})
    }
}

const listar = async (req, res) => {
    try {
        const valores = await Usuario.findAll()
        res.status(200).json(valores)
    } catch (err) {
        console.error("não foi possível listar os usuários", err)
        res.status(500).json({ message: "não foi possível listar os usuários" })
    }
};

const atualizar = async (req,res)=>{
    const id = req.params.id
    const valores = req.body
    try{
        let dados = await Usuario.findByPk(id)
        if(dados){
            await Usuario.update(valores, {where: { idUsuario: id}})
            dados = await Usuario.findByPk(id)
            res.status(200).json(valores)
        }else{
            res.status(404).json({message: 'Usuario não encontrado!'})
        }
    }catch(err){
        console.error('Erro ao atualizar os dados!',err)
        res.status(500).json({message: 'Erro ao atualizar os dados!'})
    }
}

const apagar = async (req, res) => {
  const id = req.params.id;
  try {
    const resp = await Usuario.findByPk(id)
    if (resp) {
      await Usuario.destroy({ where: {idUsuario:id } })
      res.status(201).json({ message: 'Dados excluídos com sucesso!' })
    } else {
      res.status(404).json({ message: 'Usuario não encontrado!' })
    }
  } catch (err) {
    console.error('Erro ao apagar os dados!', err);
    res.status(500).json({ message: 'Erro ao apagar os dados!' })
  }
};

const buscarPorId = async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await Usuario.findByPk(id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado!' });
        }
    } catch (err) {
        console.error('Erro ao buscar usuário por ID!', err);
        res.status(500).json({ message: 'Erro ao buscar usuário por ID!' });
    }
}

module.exports = {cadastrar, listar, atualizar, apagar, buscarPorId}