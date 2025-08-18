let btnBuscarProduto = document.getElementById('btnBuscarProduto');
let formAtualizarProduto = document.getElementById('formAtualizarProduto');
let res = document.getElementById('mensagem');

// Buscar produto por ID
btnBuscarProduto.addEventListener('click', async () => {
    let id = document.getElementById('buscarIdProduto').value.trim();
    if (!id) {
        res.innerHTML = "Informe um ID válido.";
        return;
    }

    try {
        const resp = await fetch(`http://localhost:3000/produto/${id}`);
        if (!resp.ok) {
            const errorData = await resp.json();
            throw new Error(errorData.message || 'Produto não encontrado');
        }
        const produto = await resp.json();

        // Preenche os campos apenas se o produto existir
        if (produto && produto.idProduto) {
            document.getElementById('produtoId').value = produto.idProduto;
            document.getElementById('title').value = produto.title || '';
            document.getElementById('description').value = produto.description || '';
            document.getElementById('category').value = produto.category || '';
            document.getElementById('price').value = produto.price || 0;
            document.getElementById('discountPercentage').value = produto.discountPercentage || 0;
            document.getElementById('stock').value = produto.stock || 0;
            document.getElementById('brand').value = produto.brand || '';
            document.getElementById('thumbnail').value = produto.thumbnail || '';

            res.innerHTML = "Produto carregado com sucesso!";
        } else {
            res.innerHTML = "Produto não encontrado.";
        }
    } catch (err) {
        res.innerHTML = "Erro ao buscar produto: " + err.message;
        console.error("Erro detalhado:", err);
    }
});

// Atualizar produto - CORREÇÃO DA LINHA 56
formAtualizarProduto.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        let id = document.getElementById('produtoId').value;
        if (!id) {
            throw new Error('ID do produto não encontrado');
        }

        // Validação dos campos numéricos
        let price = parseFloat(document.getElementById('price').value) || 0;
        let discount = parseFloat(document.getElementById('discountPercentage').value) || 0;
        let stock = parseInt(document.getElementById('stock').value) || 0;

        let dados = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            category: document.getElementById('category').value,
            price: price,
            discountPercentage: discount,
            stock: stock,
            brand: document.getElementById('brand').value,
            thumbnail: document.getElementById('thumbnail').value
        };

        const resp = await fetch(`http://localhost:3000/produto/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (!resp.ok) {
            const errorData = await resp.json();
            throw new Error(errorData.message || 'Erro ao atualizar');
        }

        res.innerHTML = "Produto atualizado com sucesso!";
    } catch (err) {
        res.innerHTML = "Erro ao atualizar: " + err.message;
        console.error("Erro na atualização:", err);
    }
});