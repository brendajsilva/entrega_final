const form = document.getElementById('formConsultarProduto');
if (form) {
  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const id = document.getElementById('produtoId').value;
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    try {
      const response = await fetch(`http://localhost:3000/produto/${id}`);
      if (!response.ok) throw new Error('Produto não encontrado');
      const produto = await response.json();
      resultado.innerHTML = `
        <div class="card">
          <h3>${produto.title}</h3>
          <p><strong>ID:</strong> ${produto.idProduto || produto.id}</p>
          <p><strong>Descrição:</strong> ${produto.description}</p>
          <p><strong>Categoria:</strong> ${produto.category}</p>
          <p><strong>Preço:</strong> R$ ${produto.price}</p>
          <p><strong>Desconto:</strong> ${produto.discountPercentage}%</p>
          <p><strong>Estoque:</strong> ${produto.stock}</p>
          <p><strong>Marca:</strong> ${produto.brand}</p>
          <img src="${produto.thumbnail}" alt="Imagem do produto" style="max-width:120px; margin-top:10px; border-radius:8px;">
        </div>
      `;
    } catch (error) {
      resultado.innerHTML = `<div class='alert alert-danger'>Produto não encontrado.</div>`;
    }
  });
} 