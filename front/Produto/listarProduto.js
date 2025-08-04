async function carregarProdutos() {
  const tabela = document.getElementById('tabelaProdutos');
  tabela.innerHTML = '';
  try {
    const response = await fetch('http://localhost:3000/produto');
    const produtos = await response.json();
    produtos.forEach(produto => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${produto.idProduto || produto.id}</td>
        <td>${produto.title}</td>
        <td>${produto.description}</td>
        <td>${produto.category}</td>
        <td>${produto.price}</td>
        <td>${produto.discountPercentage}</td>
        <td>${produto.stock}</td>
        <td>${produto.brand}</td>
        <td><img src="${produto.thumbnail}" width="50"></td>
        <td>
          <button onclick="atualizarProduto(${produto.idProduto || produto.id})">Atualizar</button>
          <button onclick="removerProduto(${produto.idProduto || produto.id})">Remover</button>
        </td>
      `;
      tabela.appendChild(tr);
    });
  } catch (error) {
    document.getElementById('mensagem').innerText = 'Erro ao carregar produtos.';
  }
}

async function removerProduto(id) {
  if (!confirm('Tem certeza que deseja remover este produto?')) return;
  try {
    const response = await fetch(`http://localhost:3000/produto/${id}`, { method: 'DELETE' });
    const result = await response.json();
    alert(result.message || 'Produto removido!');
    carregarProdutos();
  } catch (error) {
    alert('Erro ao remover produto.');
  }
}

function atualizarProduto(id) {
  window.location.href = `atualizarProduto.html?id=${id}`;
}

document.addEventListener('DOMContentLoaded', carregarProdutos); 