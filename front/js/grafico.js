// SPA Navigation
const navLinks = [
  { id: 'navUsuarios', section: 'secUsuarios' },
  { id: 'navProdutos', section: 'secProdutos' },
  { id: 'navCompras', section: 'secCompras' },
  { id: 'navRelatorios', section: 'secRelatorios' },
  { id: 'navGraficos', section: 'secGraficos' }
];

function showSection(sectionId) {
  document.querySelectorAll('main > section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
  navLinks.forEach(link => {
    document.getElementById(link.id).classList.remove('active');
  });
  const nav = navLinks.find(l => l.section === sectionId);
  if (nav) document.getElementById(nav.id).classList.add('active');
}

navLinks.forEach(link => {
  document.getElementById(link.id).addEventListener('click', e => {
    e.preventDefault();
    showSection(link.section);
  });
});

// Inicialização: mostrar Usuários
showSection('secUsuarios');

document.getElementById('usuarioFormContainer').innerHTML = '<em>Formulário de cadastro de usuário aqui</em>';
document.getElementById('usuarioListContainer').innerHTML = '<em>Lista de usuários aqui</em>';
document.getElementById('produtoFormContainer').innerHTML = '<em>Formulário de cadastro de produto aqui</em>';
document.getElementById('produtoListContainer').innerHTML = '<em>Lista de produtos aqui</em>';
document.getElementById('compraFormContainer').innerHTML = '<em>Formulário de cadastro de compra aqui</em>';
document.getElementById('compraListContainer').innerHTML = '<em>Lista de compras aqui</em>';
document.getElementById('relatorioContainer').innerHTML = '<em>Selecione um relatório acima</em>';

// Relatórios: alternar exibição
const relBtns = document.querySelectorAll('#relatorioBtns button');
relBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('relatorioContainer').innerHTML = `<em>Relatório: ${btn.textContent} (implementar fetch e renderização)</em>`;
  });
});

// Gráficos: placeholders
import Chart from 'https://cdn.jsdelivr.net/npm/chart.js';
window.atualizarGraficoProdutoEstoque = function() {
  document.getElementById('graficoProdutoEstoque').getContext('2d').clearRect(0,0,600,300);
  // Exemplo de gráfico
  new Chart(document.getElementById('graficoProdutoEstoque').getContext('2d'), {
    type: 'bar',
    data: { labels: ['Produto 1','Produto 2'], datasets: [{ label: 'Estoque', data: [5,10] }] },
    options: { responsive: true }
  });
}
window.atualizarGraficoUsuarioIdade = function() {
  document.getElementById('graficoUsuarioIdade').getContext('2d').clearRect(0,0,600,300);
  new Chart(document.getElementById('graficoUsuarioIdade').getContext('2d'), {
    type: 'bar',
    data: { labels: ['Usuário 1','Usuário 2'], datasets: [{ label: 'Idade', data: [30,25] }] },
    options: { responsive: true }
  });
}
document.getElementById('btnFiltrarGraficoProdutoEstoque').onclick = window.atualizarGraficoProdutoEstoque;
document.getElementById('btnFiltrarGraficoUsuarioIdade').onclick = window.atualizarGraficoUsuarioIdade; 