let form = document.getElementById('formConsultarCompra');
let res = document.getElementById('resultado');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let id = document.getElementById('compraId').value;

    fetch(`http://localhost:3000/compra/${id}`)
        .then(resp => resp.json())
        .then(data => {
            if (data.id) {
                res.innerHTML = `
                    <p>ID: ${data.id}</p>
                    <p>Usuário: ${data.idUsuario}</p>
                    <p>Produto: ${data.idProduto}</p>
                    <p>Quantidade: ${data.quantidade}</p>
                    <p>Data: ${data.dataCompra}</p>
                    <p>Preço Final: ${data.precoFinal}</p>
                    <p>Status: ${data.status}</p>
                `;
            } else {
                res.innerHTML = "Compra não encontrada.";
            }
        })
        .catch(err => res.innerHTML = "Erro: " + err);
});
