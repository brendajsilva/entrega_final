let tabela = document.getElementById('tabelaCompras');
let res = document.getElementById('mensagem');

fetch('http://localhost:3000/compra')
    .then(resp => resp.json())
    .then(dados => {
        tabela.innerHTML = "";
        dados.forEach(compra => {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${compra.idCompra}</td>
                <td>${compra.idUsuario}</td>
                <td>${compra.idProduto}</td>
                <td>${compra.quantidade}</td>
                <td>${new Date(compra.dataCompra).toLocaleDateString('pt-BR')}</td>
                <td>${compra.precoUnitario}</td>
                <td>${compra.descontoAplicado}</td>
                <td>${compra.precoFinal}</td>
                <td>${compra.formaPagamento}</td>
                <td>${compra.status}</td>
                <td>
                    <button onclick="apagarCompra(${compra.id})">Apagar</button>
                </td>
            `;
            tabela.appendChild(tr);
        });
    })
    .catch(err => res.innerHTML = "Erro ao listar: " + err);

function apagarCompra(id) {
    fetch(`http://localhost:3000/compras/${id}`, { method: 'DELETE' })
        .then(resp => resp.json())
        .then(() => {
            res.innerHTML = "Compra apagada!";
            location.reload();
        })
        .catch(err => console.error(err));
}