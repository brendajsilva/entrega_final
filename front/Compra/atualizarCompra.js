let btnBuscar = document.getElementById('btnBuscarCompra');
let formAtualizar = document.getElementById('formAtualizarCompra');
let res = document.getElementById('mensagem');

// Cria label do preço final
let labelPrecoFinal = document.createElement('p');
labelPrecoFinal.style.fontWeight = "bold";
labelPrecoFinal.style.marginTop = "8px";
formAtualizar.precoFinal.parentNode.appendChild(labelPrecoFinal);

// Função para calcular preço final
function calcularPrecoFinal() {
    let preco = Number(formAtualizar.precoUnitario.value) || 0;
    let desconto = Number(formAtualizar.descontoAplicado.value) || 0;
    let quantidade = Number(formAtualizar.quantidade.value) || 1;
    let precoFinal = (preco - (preco * (desconto / 100))) * quantidade;
    labelPrecoFinal.textContent = `Preço final: R$ ${precoFinal.toFixed(2)}`;
    formAtualizar.precoFinal.value = precoFinal.toFixed(2);
    return precoFinal.toFixed(2);
}

// Atualiza preço final quando usuário muda preço, desconto ou quantidade
formAtualizar.precoUnitario.addEventListener('input', calcularPrecoFinal);
formAtualizar.descontoAplicado.addEventListener('input', calcularPrecoFinal);
formAtualizar.quantidade.addEventListener('input', calcularPrecoFinal);

// Buscar compra pelo ID (filtrando localmente)
btnBuscar.addEventListener('click', () => {
    let id = Number(document.getElementById('compraIdBusca').value.trim());
    if (!id) {
        res.innerHTML = "Informe um ID válido.";
        return;
    }

    fetch('http://localhost:3000/compra')
        .then(resp => resp.json())
        .then(compras => {
            const compra = compras.find(c => c.idCompra === id);
            if (compra) {
                document.getElementById('compraId').value = compra.idCompra;
                formAtualizar.idUsuario.value = compra.idUsuario;
                formAtualizar.idProduto.value = compra.idProduto;
                formAtualizar.quantidade.value = compra.quantidade;
                formAtualizar.dataCompra.value = compra.dataCompra.split('T')[0];
                formAtualizar.precoUnitario.value = compra.precoUnitario;
                formAtualizar.descontoAplicado.value = compra.descontoAplicado;
                formAtualizar.formaPagamento.value = compra.formaPagamento;
                formAtualizar.status.value = compra.status;
                calcularPrecoFinal();
                res.innerHTML = "Compra carregada para atualização!";
            } else {
                res.innerHTML = "Compra não encontrada.";
            }
        })
        .catch(err => res.innerHTML = "Erro: " + err);
});

// Atualizar compra
formAtualizar.addEventListener('submit', (e) => {
    e.preventDefault();

    let id = document.getElementById('compraId').value;
    let valores = {
        idUsuario: Number(formAtualizar.idUsuario.value),
        idProduto: Number(formAtualizar.idProduto.value),
        quantidade: Number(formAtualizar.quantidade.value),
        dataCompra: formAtualizar.dataCompra.value,
        precoUnitario: Number(formAtualizar.precoUnitario.value),
        descontoAplicado: Number(formAtualizar.descontoAplicado.value),
        precoFinal: Number(calcularPrecoFinal()),
        formaPagamento: formAtualizar.formaPagamento.value,
        status: formAtualizar.status.value
    };

    fetch(`http://localhost:3000/compra/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(() => res.innerHTML = `Compra atualizada!<br>Preço final: R$ ${valores.precoFinal}`)
    .catch(err => res.innerHTML = "Erro ao atualizar: " + err);
});
