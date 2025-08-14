let formCadastro = document.getElementById('formCadastroProduto');
let res = document.getElementById('mensagem');

let labelPrecoFinal = document.createElement('p');
labelPrecoFinal.style.fontWeight = "bold";
labelPrecoFinal.style.marginTop = "8px";
formCadastro.discountPercentage.parentNode.appendChild(labelPrecoFinal);

function calcularPrecoComDesconto() {
    let preco = Number(formCadastro.price.value) || 0;
    let desconto = Number(formCadastro.discountPercentage.value) || 0;
    let precoFinal = preco - (preco * (desconto / 100));
    labelPrecoFinal.textContent = `Preço final com desconto: R$ ${precoFinal.toFixed(2)}`;
    return precoFinal.toFixed(2);
}

formCadastro.price.addEventListener('input', calcularPrecoComDesconto);
formCadastro.discountPercentage.addEventListener('input', calcularPrecoComDesconto);

formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();

    let valores = {
        title: formCadastro.title.value,
        description: formCadastro.description.value,
        category: formCadastro.category.value,
        price: Number(formCadastro.price.value),
        discountPercentage: Number(formCadastro.discountPercentage.value),
        stock: Number(formCadastro.stock.value),
        brand: formCadastro.brand.value,
        thumbnail: formCadastro.thumbnail.value,
        precoFinal: Number(calcularPrecoComDesconto())
    };

    fetch('http://localhost:3000/produto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(data => {
        res.innerHTML = ` Produto cadastrado com sucesso!<br>💰 Preço final: R$ ${valores.precoFinal}`;
        console.log(data);
    })
    .catch(err => res.innerHTML = " Erro ao cadastrar: " + err);
});
