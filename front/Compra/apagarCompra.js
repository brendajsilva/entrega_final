document.getElementById('formApagarCompra').addEventListener('submit', async function(event) {
  event.preventDefault();
  const id = document.getElementById('compraId').value;
  if (!confirm('Tem certeza que deseja apagar a compra de ID ' + id + '?')) return;
  try {
    const response = await fetch(`http://localhost:3000/compras/${id}`, { method: 'DELETE' });
    const result = await response.json();
    document.getElementById('mensagem').innerHTML = `<div class='alert alert-success'>${result.message || 'Compra apagada com sucesso!'}</div>`;
  } catch (error) {
    document.getElementById('mensagem').innerHTML = `<div class='alert alert-danger'>Erro ao apagar compra.</div>`;
  }
}); 