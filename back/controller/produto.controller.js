const Produto = require('../model/Produto');

const cadastrar = async(req,res)=>{
    const dados = req.body;
    try{
        const valores = await Produto.create(dados);
        res.status(201).json(valores);
    }
    catch(err){
        console.error("Não foi possível cadastrar o produto", err);
        res.status(500).json({
            message: "Não foi possível cadastrar o produto",
            error: err.message
        });
    }
};

const listar = async (req, res) => {
    try {
        const valores = await Produto.findAll();
        res.status(200).json(valores);
    } catch (err) {
        console.error("Não foi possível listar os produtos", err);
        res.status(500).json({ 
            message: "Não foi possível listar os produtos",
            error: err.message
        });
    }
};

const atualizar = async (req,res)=>{
    const id = req.params.id
    const valores = req.body
    try{
        let dados = await Produto.findByPk(id)
        if(dados){
            await Produto.update(valores, {where: { idProduto: id}})
            dados = await Produto.findByPk(id)
            res.status(200).json(dados)
        }else{
            res.status(404).json({message: 'Produto não encontrada!'})
        }
    }catch(err){
        console.error('Erro ao atualizar os dados!',err)
        res.status(500).json({message: 'Erro ao atualizar os dados!'})
    }
}

const apagar = async (req, res) => {
  const id = req.params.id;
  try {
    const dados = await Produto.findByPk(id, {
    })
    if (dados) {
      await Produto.destroy({ where: {idProduto:id } });
      res.status(201).json({ message: 'Dados excluídos com sucesso!' });
    } else {
      res.status(404).json({ message: 'Produto não encontrado!' });
    }
  } catch (err) {
    console.error('Erro ao apagar os dados!', err);
    res.status(500).json({ message: 'Erro ao apagar os dados!' });
  }
};

const buscarPorId = async (req, res) => {
    const idProduto = req.params.id;
    try {
        const produto = await Produto.findByPk(idProduto);
        if (produto) {
            res.status(200).json(produto);
        } else {
            res.status(404).json({ message: 'Produto não encontrado!' });
        }
    } catch (err) {
        console.error('Erro ao buscar produto:', err);
        res.status(500).json({ 
            message: 'Erro ao buscar produto!',
            error: err.message
        });
    }
};

module.exports = {cadastrar, listar, atualizar, apagar, buscarPorId};