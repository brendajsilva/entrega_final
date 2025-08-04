// Função para buscar usuário e exibir dados
async function buscarUsuarioPorId(id) {
  const resp = await fetch(`http://localhost:3000/usuario/${id}`);
  if (!resp.ok) return null;
  return await resp.json();
}

// Buscar e exibir usuário ao clicar em Buscar
const btnBuscar = document.getElementById('btnBuscarUsuario');
const dadosUsuario = document.getElementById('dadosUsuario');
const btnApagar = document.getElementById('btnApagarUsuario');
const mensagem = document.getElementById('mensagem');
let usuarioAtual = null;

if (btnBuscar) {
  btnBuscar.addEventListener('click', async () => {
    const id = document.getElementById('buscarIdUsuario').value;
    mensagem.innerHTML = '';
    dadosUsuario.innerHTML = '';
    btnApagar.style.display = 'none';
    usuarioAtual = null;
    if (!id) {
      mensagem.innerHTML = '<span style="color:red">Digite um ID válido.</span>';
      return;
    }
    const usuario = await buscarUsuarioPorId(id);
    if (!usuario) {
      mensagem.innerHTML = '<span style="color:red">Usuário não encontrado.</span>';
      return;
    }
    usuarioAtual = usuario;
    dadosUsuario.innerHTML = `
      <div class="card">
        <h3>${usuario.firstName} ${usuario.lastName}</h3>
        <p><strong>ID:</strong> ${usuario.idUsuario || usuario.id}</p>
        <p><strong>Idade:</strong> ${usuario.age}</p>
        <p><strong>Email:</strong> ${usuario.email}</p>
        <p><strong>Telefone:</strong> ${usuario.phone}</p>
        <p><strong>Endereço:</strong> ${usuario.address}</p>
        <p><strong>Cidade:</strong> ${usuario.city}</p>
        <p><strong>Estado:</strong> ${usuario.state}</p>
        <p><strong>Data de Nascimento:</strong> ${usuario.birthDate ? usuario.birthDate.substring(0,10) : ''}</p>
      </div>
    `;
    btnApagar.style.display = 'inline-block';
  });
}

// Apagar usuário ao clicar em Apagar
if (btnApagar) {
  btnApagar.addEventListener('click', async () => {
    if (!usuarioAtual) return;
    if (!confirm('Tem certeza que deseja apagar este usuário?')) return;
    mensagem.innerHTML = '';
    const id = usuarioAtual.idUsuario || usuarioAtual.id;
    const resp = await fetch(`http://localhost:3000/usuario/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (resp.ok) {
      mensagem.innerHTML = '<span style="color:green">Usuário apagado com sucesso!</span>';
      dadosUsuario.innerHTML = '';
      btnApagar.style.display = 'none';
      usuarioAtual = null;
    } else {
      mensagem.innerHTML = '<span style="color:red">Erro ao apagar usuário.</span>';
    }
  });
} 