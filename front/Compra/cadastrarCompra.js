function calcularPrecoFinal() {
  const precoUnitario = parseFloat(document.getElementById('precoUnitario').value) || 0;
  const quantidade = parseInt(document.getElementById('quantidade').value) || 0;
  const desconto = parseFloat(document.getElementById('descontoAplicado').value) || 0;
  let precoFinal = precoUnitario * quantidade;
  precoFinal = precoFinal * (1 - desconto / 100);
  document.getElementById('precoFinal').value = precoFinal.toFixed(2);
}

document.getElementById('precoUnitario').addEventListener('input', calcularPrecoFinal);
document.getElementById('quantidade').addEventListener('input', calcularPrecoFinal);
document.getElementById('descontoAplicado').addEventListener('input', calcularPrecoFinal);


document.getElementById('formCadastroCompra').addEventListener('submit', async function(event) {
  event.preventDefault();
  const form = event.target;
  const data = {
    idUsuario: parseInt(form.idUsuario.value),
    idProduto: parseInt(form.idProduto.value),
    quantidade: parseInt(form.quantidade.value),
    dataCompra: form.dataCompra.value,
    precoUnitario: parseFloat(form.precoUnitario.value),
    descontoAplicado: parseFloat(form.descontoAplicado.value),
    precoFinal: parseFloat(form.precoFinal.value),
    formaPagamento: form.formaPagamento.value,
    status: form.status.value
  };
  try {
    const response = await fetch('http://localhost:3000/compra', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    document.getElementById('mensagem').innerText = result.message || 'Compra cadastrada com sucesso!';
    form.reset();
    calcularPrecoFinal();
  } catch (error) {
    document.getElementById('mensagem').innerText = 'Erro ao cadastrar compra.';
  }
}); 