async function carregarCompras() {
  const tabela = document.getElementById('tabelaCompras');
  tabela.innerHTML = '';
  try {
    const response = await fetch('http://localhost:3000/compras');
    const compras = await response.json();
    compras.forEach(compra => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${compra.idCompra || compra.id}</td>
        <td>${compra.idUsuario}</td>
        <td>${compra.idProduto}</td>
        <td>${compra.quantidade}</td>
        <td>${compra.dataCompra ? new Date(compra.dataCompra).toLocaleDateString() : ''}</td>
        <td>${compra.precoUnitario}</td>
        <td>${compra.descontoAplicado}</td>
        <td>${compra.precoFinal}</td>
        <td>${compra.formaPagamento}</td>
        <td>${compra.status}</td>
        <td>
          <button onclick="atualizarCompra(${compra.idCompra || compra.id})">Atualizar</button>
          <button onclick="removerCompra(${compra.idCompra || compra.id})">Remover</button>
        </td>
      `;
      tabela.appendChild(tr);
    });
  } catch (error) {
    document.getElementById('mensagem').innerText = 'Erro ao carregar compras.';
  }
}

async function removerCompra(id) {
  if (!confirm('Tem certeza que deseja remover esta compra?')) return;
  try {
    const response = await fetch(`http://localhost:3000/compras/${id}`, { method: 'DELETE' });
    const result = await response.json();
    alert(result.message || 'Compra removida!');
    carregarCompras();
  } catch (error) {
    alert('Erro ao remover compra.');
  }
}

function atualizarCompra(id) {
  window.location.href = `atualizarCompra.html?id=${id}`;
}

document.addEventListener('DOMContentLoaded', carregarCompras); 