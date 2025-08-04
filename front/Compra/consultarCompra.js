document.getElementById('formConsultarCompra').addEventListener('submit', async function(event) {
  event.preventDefault();
  const id = document.getElementById('compraId').value;
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = '';
  try {
    const response = await fetch(`http://localhost:3000/compras/${id}`);
    if (!response.ok) throw new Error('Compra não encontrada');
    const compra = await response.json();
    resultado.innerHTML = `
      <div class="card">
        <h3>Compra #${compra.idCompra || compra.id}</h3>
        <p><strong>ID Usuário:</strong> ${compra.idUsuario}</p>
        <p><strong>ID Produto:</strong> ${compra.idProduto}</p>
        <p><strong>Quantidade:</strong> ${compra.quantidade}</p>
        <p><strong>Data da Compra:</strong> ${compra.dataCompra ? new Date(compra.dataCompra).toLocaleDateString() : ''}</p>
        <p><strong>Preço Unitário:</strong> R$ ${compra.precoUnitario}</p>
        <p><strong>Desconto:</strong> ${compra.descontoAplicado}%</p>
        <p><strong>Preço Final:</strong> R$ ${compra.precoFinal}</p>
        <p><strong>Forma de Pagamento:</strong> ${compra.formaPagamento}</p>
        <p><strong>Status:</strong> ${compra.status}</p>
      </div>
    `;
  } catch (error) {
    resultado.innerHTML = `<div class='alert alert-danger'>Compra não encontrada.</div>`;
  }
}); 