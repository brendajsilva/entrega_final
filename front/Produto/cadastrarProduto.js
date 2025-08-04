document.getElementById('formCadastroProduto').addEventListener('submit', async function(event) {
    event.preventDefault();
    const cadastroProduto = document.getElementById('cadastroProduto');
    const mensagem = document.getElementById('mensagem');
    
    // Coleta os valores dos campos
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const price = parseFloat(document.getElementById('price').value);
    const discountPercentage = parseFloat(document.getElementById('discountPercentage').value);
    const stock = parseInt(document.getElementById('stock').value);
    const brand = document.getElementById('brand').value;
    const thumbnail = document.getElementById('thumbnail').value;

    // Validação simples
    if (!title || !description || !category || isNaN(price) || isNaN(discountPercentage) || isNaN(stock) || !brand || !thumbnail) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const valores = {
        title,
        description,
        category,
        price,
        discountPercentage,
        stock,
        brand,
        thumbnail
    };

    cadastroProduto.textContent = 'Cadastrando...';
    cadastroProduto.disabled = true;
    mensagem.innerHTML = '';

    try {
        const resp = await fetch('http://localhost:3000/produto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(valores)
        });
        if (!resp.ok) throw new Error('Erro ao cadastrar produto');
        const produto = await resp.json();
        mensagem.innerHTML = `<div class='alert alert-success'>Produto cadastrado com sucesso!</div>`;
        mensagem.innerHTML += `
            <table border="1" style="margin-top:10px;">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Preço</th>
                        <th>Desconto (%)</th>
                        <th>Estoque</th>
                        <th>Marca</th>
                        <th>Imagem</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${produto.idProduto || produto.id}</td>
                        <td>${produto.title}</td>
                        <td>${produto.description}</td>
                        <td>${produto.category}</td>
                        <td>${produto.price}</td>
                        <td>${produto.discountPercentage}</td>
                        <td>${produto.stock}</td>
                        <td>${produto.brand}</td>
                        <td><img src="${produto.thumbnail}" width="50"></td>
                    </tr>
                </tbody>
            </table>
        `;
        alert('Produto cadastrado com sucesso!');
        document.getElementById('formCadastroProduto').reset();
    } catch (err) {
        console.error('Erro ao cadastrar produto:', err);
        mensagem.innerHTML = `<div class='alert alert-danger'>Erro ao cadastrar produto. Verifique os dados e tente novamente.</div>`;
    } finally {
        cadastroProduto.textContent = 'Cadastrar';
        cadastroProduto.disabled = false;
    }
});


