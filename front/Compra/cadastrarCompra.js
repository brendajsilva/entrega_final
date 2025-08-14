let cad = document.getElementById('formCadastroCompra');
let res = document.getElementById('mensagem');

let labelPrecoFinal = document.createElement('p');
labelPrecoFinal.style.fontWeight = "bold";
labelPrecoFinal.style.marginTop = "8px";
cad.descontoAplicado.parentNode.appendChild(labelPrecoFinal);

function calcularPrecoFinal() {
    let preco = Number(cad.precoUnitario.value) || 0;
    let desconto = Number(cad.descontoAplicado.value) || 0;
    let precoFinal = preco - (preco * (desconto / 100));
    cad.precoFinal.value = precoFinal.toFixed(2);
    labelPrecoFinal.textContent = `Preço final com desconto: R$ ${precoFinal.toFixed(2)}`;
}

cad.precoUnitario.addEventListener('input', calcularPrecoFinal);
cad.descontoAplicado.addEventListener('input', calcularPrecoFinal);

cad.addEventListener('submit', (e) => {
    e.preventDefault();

    calcularPrecoFinal();

    let valores = {
        idUsuario: Number(cad.idUsuario.value),
        idProduto: Number(cad.idProduto.value),
        quantidade: Number(cad.quantidade.value),
        dataCompra: cad.dataCompra.value,
        precoUnitario: Number(cad.precoUnitario.value),
        descontoAplicado: Number(cad.descontoAplicado.value),
        precoFinal: Number(cad.precoFinal.value),
        formaPagamento: cad.formaPagamento.value,
        status: cad.status.value
    };

    fetch('http://localhost:3000/compra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(data => {
        res.innerHTML = "Compra cadastrada com sucesso!";
        console.log('funcionou', data);
    })
    .catch(err => console.error('Erro:', err));
});
