let formConsultar = document.getElementById('formConsultarProduto');
let res = document.getElementById('resultado');

formConsultar.addEventListener('submit', (e) => {
    e.preventDefault();

    let id = document.getElementById('produtoId').value;

    fetch(`http://localhost:3000/produto/${id}`)
        .then(resp => resp.json())
        .then(produto => {
            if (produto.id) {
                res.innerHTML = `
                    <p><strong>ID:</strong> ${produto.id}</p>
                    <p><strong>Título:</strong> ${produto.title}</p>
                    <p><strong>Descrição:</strong> ${produto.description}</p>
                    <p><strong>Categoria:</strong> ${produto.category}</p>
                    <p><strong>Preço:</strong> ${produto.price}</p>
                    <p><strong>Desconto:</strong> ${produto.discountPercentage}%</p>
                    <p><strong>Estoque:</strong> ${produto.stock}</p>
                    <p><strong>Marca:</strong> ${produto.brand}</p>
                    <img src="${produto.thumbnail}" alt="${produto.title}" width="100">
                `;
            } else {
                res.innerHTML = "Produto não encontrado.";
            }
        })
        .catch(err => res.innerHTML = "Erro ao consultar: " + err);
});
