async function carregarCompra() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;
  try {
    const response = await fetch(`http://localhost:3000/compras/${id}`);
    const compra = await response.json();
    document.getElementById('compraId').value = compra.idCompra || compra.id;
    document.getElementById('idUsuario').value = compra.idUsuario;
    document.getElementById('idProduto').value = compra.idProduto;
    document.getElementById('quantidade').value = compra.quantidade;
    document.getElementById('dataCompra').value = compra.dataCompra ? compra.dataCompra.split('T')[0] : '';
    document.getElementById('precoUnitario').value = compra.precoUnitario;
    document.getElementById('descontoAplicado').value = compra.descontoAplicado;
    document.getElementById('precoFinal').value = compra.precoFinal;
    document.getElementById('formaPagamento').value = compra.formaPagamento;
    document.getElementById('status').value = compra.status;
  } catch (error) {
    document.getElementById('mensagem').innerText = 'Erro ao carregar compra.';
  }
}

document.getElementById('formAtualizarCompra').addEventListener('submit', async function(event) {
  event.preventDefault();
  const id = document.getElementById('compraId').value;
  const data = {
    idUsuario: parseInt(document.getElementById('idUsuario').value),
    idProduto: parseInt(document.getElementById('idProduto').value),
    quantidade: parseInt(document.getElementById('quantidade').value),
    dataCompra: document.getElementById('dataCompra').value,
    precoUnitario: parseFloat(document.getElementById('precoUnitario').value),
    descontoAplicado: parseFloat(document.getElementById('descontoAplicado').value),
    precoFinal: parseFloat(document.getElementById('precoFinal').value),
    formaPagamento: document.getElementById('formaPagamento').value,
    status: document.getElementById('status').value
  };
  try {
    const response = await fetch(`http://localhost:3000/compras/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    document.getElementById('mensagem').innerText = result.message || 'Compra atualizada com sucesso!';
  } catch (error) {
    document.getElementById('mensagem').innerText = 'Erro ao atualizar compra.';
  }
});

document.addEventListener('DOMContentLoaded', carregarCompra); 