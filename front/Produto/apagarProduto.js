let btnBuscarProd = document.getElementById('btnBuscarProduto');
let dadosProduto = document.getElementById('dadosProduto');
let btnApagar = document.getElementById('btnApagarProduto');
let res = document.getElementById('mensagem');

btnBuscarProd.addEventListener('click', () => {
    let id = document.getElementById('buscarIdProduto').value.trim();
    if (!id) {
        dadosProduto.innerHTML = "Informe um ID válido.";
        btnApagar.style.display = "none";
        return;
    }

    fetch(`http://localhost:3000/produto/${id}`)
        .then(resp => {
            if (!resp.ok) throw new Error('Produto não encontrado');
            return resp.json();
        })
        .then(produto => {
            if (produto.idProduto) { // <-- Correção
                dadosProduto.innerHTML = `
                    <p><strong>${produto.title}</strong> - ${produto.description}</p>
                    <img src="${produto.thumbnail}" alt="${produto.title}" width="100">
                `;
                btnApagar.style.display = "inline-block";
                btnApagar.setAttribute('data-id', produto.idProduto); // <-- Correção
            } else {
                dadosProduto.innerHTML = "Produto não encontrado.";
                btnApagar.style.display = "none";
            }
        })
        .catch(err => {
            dadosProduto.innerHTML = "Erro: " + err;
            btnApagar.style.display = "none";
        });
});

btnApagar.addEventListener('click', () => {
    let id = btnApagar.getAttribute('data-id');
    if (!id) return;

    fetch(`http://localhost:3000/produto/${id}`, { method: 'DELETE' })
        .then(resp => {
            if (!resp.ok) throw new Error('Erro ao apagar produto');
            return resp.json();
        })
        .then(() => {
            res.innerHTML = "Produto apagado com sucesso!";
            dadosProduto.innerHTML = "";
            btnApagar.style.display = "none";
        })
        .catch(err => res.innerHTML = "Erro ao apagar: " + err);
});
