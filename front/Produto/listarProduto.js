let tabela = document.getElementById('tabelaProdutos');
let res = document.getElementById('mensagem');

fetch('http://localhost:3000/produto')
    .then(resp => resp.json())
    .then(dados => {
        tabela.innerHTML = "";
        dados.forEach(produto => {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${produto.idProduto}</td>
                <td>${produto.title}</td>
                <td>${produto.description}</td>
                <td>${produto.category}</td>
                <td>${produto.price}</td>
                <td>${produto.discountPercentage}</td>
                <td>${produto.stock}</td>
                <td>${produto.brand}</td>
                <td><img src="${produto.thumbnail}" alt="${produto.title}" width="60"></td>
            `;
            tabela.appendChild(tr);
        });
    })
    .catch(err => res.innerHTML = "Erro ao listar: " + err);
