// Função para buscar produto e exibir dados
async function buscarProdutoPorId(id) {
  const resp = await fetch(`http://localhost:3000/produto/${id}`);
  if (!resp.ok) return null;
  return await resp.json();
}

const btnBuscar = document.getElementById('btnBuscarProduto');
const dadosProduto = document.getElementById('dadosProduto');
const btnApagar = document.getElementById('btnApagarProduto');
const mensagem = document.getElementById('mensagem');
let produtoAtual = null;

if (btnBuscar) {
  btnBuscar.addEventListener('click', async () => {
    const id = document.getElementById('buscarIdProduto').value;
    mensagem.innerHTML = '';
    dadosProduto.innerHTML = '';
    btnApagar.style.display = 'none';
    produtoAtual = null;
    if (!id) {
      mensagem.innerHTML = '<span style="color:red">Digite um ID válido.</span>';
      return;
    }
    const produto = await buscarProdutoPorId(id);
    if (!produto) {
      mensagem.innerHTML = '<span style="color:red">Produto não encontrado.</span>';
      return;
    }
    produtoAtual = produto;
    dadosProduto.innerHTML = `
      <div class="card">
        <h3>${produto.title}</h3>
        <p><strong>ID:</strong> ${produto.idProduto || produto.id}</p>
        <p><strong>Descrição:</strong> ${produto.description}</p>
        <p><strong>Categoria:</strong> ${produto.category}</p>
        <p><strong>Preço:</strong> R$ ${produto.price}</p>
        <p><strong>Desconto:</strong> ${produto.discountPercentage}%</p>
        <p><strong>Estoque:</strong> ${produto.stock}</p>
        <p><strong>Marca:</strong> ${produto.brand}</p>
        <img src="${produto.thumbnail}" alt="Imagem do produto" style="max-width:120px; margin-top:10px; border-radius:8px;">
      </div>
    `;
    btnApagar.style.display = 'inline-block';
  });
}

if (btnApagar) {
  btnApagar.addEventListener('click', async () => {
    if (!produtoAtual) return;
    if (!confirm('Tem certeza que deseja apagar este produto?')) return;
    mensagem.innerHTML = '';
    const id = produtoAtual.idProduto || produtoAtual.id;
    const resp = await fetch(`http://localhost:3000/produto/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (resp.ok) {
      mensagem.innerHTML = '<span style="color:green">Produto apagado com sucesso!</span>';
      dadosProduto.innerHTML = '';
      btnApagar.style.display = 'none';
      produtoAtual = null;
    } else {
      mensagem.innerHTML = '<span style="color:red">Erro ao apagar produto.</span>';
    }
  });
} 