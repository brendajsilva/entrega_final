// Funções de busca
async function fetchProdutos() {
  const resp = await fetch('http://localhost:3000/produto');
  return resp.json();
}

async function fetchUsuarios() {
  const resp = await fetch('http://localhost:3000/usuario');
  return resp.json();
}

// Filtro por ID com limite de 10
function filtrarPorIdEDecimar(arr, idField, idIni, idFim) {
  let filtrado = arr;
  if (idIni) filtrado = filtrado.filter(item => (item[idField] || item.id) >= idIni);
  if (idFim) filtrado = filtrado.filter(item => (item[idField] || item.id) <= idFim);
  return filtrado.slice(0, 10);
}

// Tema escuro moderno Chart.js
const darkChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: '#ccc',
        font: {
          family: 'Arial',
          size: 14,
          weight: 'bold'
        }
      }
    },
    title: {
      display: false
    },
    tooltip: {
      backgroundColor: '#222',
      titleColor: '#fff',
      bodyColor: '#eee',
      borderColor: '#666',
      borderWidth: 1
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#ccc'
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: '#ccc'
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    }
  }
};

// Gráfico de produtos por estoque
let chartProdutoEstoque = null;
async function renderGraficoProdutoEstoque() {
  const produtos = await fetchProdutos();
  const idIni = parseInt(document.getElementById('graficoProdutoEstoqueIdIni').value);
  const idFim = parseInt(document.getElementById('graficoProdutoEstoqueIdFim').value);
  const filtrados = filtrarPorIdEDecimar(produtos, 'idProduto', idIni, idFim);
  const labels = filtrados.map(p => p.title);
  const data = filtrados.map(p => p.stock);
  const ctx = document.getElementById('graficoProdutoEstoque').getContext('2d');

  if (chartProdutoEstoque) chartProdutoEstoque.destroy();

  chartProdutoEstoque = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Estoque',
        data,
        backgroundColor: 'rgba(108, 92, 231, 0.8)',
        borderColor: 'rgba(108, 92, 231, 1)',
        borderWidth: 2
      }]
    },
    options: darkChartOptions
  });
}

// Gráfico de usuários por idade
let chartUsuarioIdade = null;
async function renderGraficoUsuarioIdade() {
  const usuarios = await fetchUsuarios();
  const idIni = parseInt(document.getElementById('graficoUsuarioIdadeIdIni').value);
  const idFim = parseInt(document.getElementById('graficoUsuarioIdadeIdFim').value);
  const filtrados = filtrarPorIdEDecimar(usuarios, 'idUsuario', idIni, idFim);
  const labels = filtrados.map(u => `${u.firstName} ${u.lastName}`);
  const data = filtrados.map(u => u.age);
  const ctx = document.getElementById('graficoUsuarioIdade').getContext('2d');

  if (chartUsuarioIdade) chartUsuarioIdade.destroy();

  chartUsuarioIdade = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Idade',
        data,
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2
      }]
    },
    options: darkChartOptions
  });
}

// Eventos de filtro
document.getElementById('btnFiltrarGraficoProdutoEstoque').addEventListener('click', renderGraficoProdutoEstoque);
document.getElementById('btnFiltrarGraficoUsuarioIdade').addEventListener('click', renderGraficoUsuarioIdade);
