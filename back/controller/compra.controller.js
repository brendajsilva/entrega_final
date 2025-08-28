const Compra = require('../model/Compra')

const cadastrar = async(req,res)=>{
    const dados = req.body
    try{
        const valores = await Compra.create(dados)
        res.status(201).json({message:"cadastro das compras realizada com sucesso"})
    }
    catch(err){
        console.error("não foi possivel cadastrar as compras",err)
        res.status(500).json({message:"não foi possivel cadastrar as compras"})
    }
}

const listar = async (req, res) => {
    try {
        const valores = await Compra.findAll()
        res.status(200).json(valores)
    } catch (err) {
        console.error("não foi possível listar as compras", err)
        res.status(500).json({ message: "não foi possível listar as compras" })
    }
};

const atualizar = async (req,res)=>{
    const id = req.params.id
    const valores = req.body
    try{
        let dados = await Compra.findByPk(id)
        if(dados){
            await Compra.update(valores, {where: { idCompra: id}})
            dados = await Compra.findByPk(id)
            res.status(200).json(dados)
        }else{
            res.status(404).json({message: 'Compra não encontrada!'})
        }
    }catch(err){
        console.error('Erro ao atualizar os dados!',err)
        res.status(500).json({message: 'Erro ao atualizar os dados!'})
    }
}

const apagar = async (req, res) => {
  const id = req.params.id;
  try {
    const dados = await Compra.findByPk(id, {
    })
    if (dados) {
      await Compra.destroy({ where: {idCompra:id } });
      res.status(201).json({ message: 'Dados excluídos com sucesso!' });
    } else {
      res.status(404).json({ message: 'Compra não encontrado!' });
    }
  } catch (err) {
    console.error('Erro ao apagar os dados!', err);
    res.status(500).json({ message: 'Erro ao apagar os dados!' });
  }
};

module.exports = {cadastrar, listar, atualizar, apagar}