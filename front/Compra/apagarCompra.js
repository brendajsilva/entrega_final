let btnBuscarCompra = document.getElementById('btnBuscarCompra');
let dadosCompra = document.getElementById('dadosCompra');
let btnApagarCompra = document.getElementById('btnApagarCompra');
let res = document.getElementById('mensagem');

// Buscar compra
btnBuscarCompra.addEventListener('click', () => {
    let id = document.getElementById('buscarIdCompra').value.trim();
    if (!id) {
        dadosCompra.innerHTML = "Informe um ID válido.";
        btnApagarCompra.style.display = "none";
        return;
    }

    fetch(`http://localhost:3000/compra`)
        .then(resp => resp.json())
        .then(compras => {
            const compra = compras.find(c => c.idCompra == id);
            if (compra) {
                dadosCompra.innerHTML = `
                    <p><strong>ID Compra:</strong> ${compra.idCompra}</p>
                    <p><strong>ID Usuário:</strong> ${compra.idUsuario}</p>
                    <p><strong>ID Produto:</strong> ${compra.idProduto}</p>
                    <p><strong>Quantidade:</strong> ${compra.quantidade}</p>
                    <p><strong>Preço Final:</strong> R$ ${compra.precoFinal.toFixed(2)}</p>
                `;
                btnApagarCompra.style.display = "inline-block";
                btnApagarCompra.setAttribute('data-id', compra.idCompra);
            } else {
                dadosCompra.innerHTML = "Compra não encontrada.";
                btnApagarCompra.style.display = "none";
            }
        })
        .catch(err => {
            dadosCompra.innerHTML = "Erro: " + err;
            btnApagarCompra.style.display = "none";
        });
});

// Apagar compra
btnApagarCompra.addEventListener('click', () => {
    let id = btnApagarCompra.getAttribute('data-id');
    if (!id) return;

    fetch(`http://localhost:3000/compra/${id}`, { method: 'DELETE' })
        .then(resp => {
            if (!resp.ok) throw new Error('Erro ao apagar compra');
            return resp.json();
        })
        .then(() => {
            res.innerHTML = "Compra apagada com sucesso!";
            dadosCompra.innerHTML = "";
            btnApagarCompra.style.display = "none";
        })
        .catch(err => res.innerHTML = "Erro ao apagar: " + err);
});
