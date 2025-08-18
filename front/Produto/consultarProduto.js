// Seleciona o formulário e a div de resultado
const formConsultar = document.getElementById('formConsultarProduto');
const res = document.getElementById('resultado');

formConsultar.addEventListener('submit', async (e) => {
    e.preventDefault();
    res.innerHTML = "Consultando..."; // Feedback visual

    const id = document.getElementById('produtoId').value.trim();
    if (!id) {
        res.innerHTML = "Informe um ID válido.";
        return;
    }

    try {
        const resp = await fetch(`http://localhost:3000/produto/${id}`);
        
        if (!resp.ok) {
            // Se a resposta não for OK, tenta obter a mensagem de erro
            const errorData = await resp.json().catch(() => ({}));
            throw new Error(errorData.message || `Produto com ID ${id} não encontrado`);
        }

        const produto = await resp.json();

        // Verifica se o produto foi encontrado mesmo com status 200
        if (!produto || !produto.idProduto) {
            throw new Error(`Produto com ID ${id} não encontrado`);
        }

        // Exibe os dados do produto formatados
        res.innerHTML = `
            <div class="product-details">
                <h3>${produto.title}</h3>
                <p><strong>ID:</strong> ${produto.idProduto}</p>
                <p><strong>Descrição:</strong> ${produto.description}</p>
                <p><strong>Categoria:</strong> ${produto.category}</p>
                <p><strong>Preço:</strong> R$ ${Number(produto.price).toFixed(2)}</p>
                <p><strong>Desconto:</strong> ${produto.discountPercentage}%</p>
                <p><strong>Estoque:</strong> ${produto.stock} unidades</p>
                <p><strong>Marca:</strong> ${produto.brand}</p>
                <img src="${produto.thumbnail}" alt="${produto.title}" class="product-image">
            </div>
        `;
    } catch (err) {
        console.error("Erro na consulta:", err);
        res.innerHTML = `
            <div class="error-message">
                <p>Erro ao consultar produto</p>
                <p>${err.message}</p>
                <p>Verifique se o ID está correto e tente novamente.</p>
            </div>
        `;
    }
});