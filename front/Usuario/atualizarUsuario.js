async function atualizarUsuario(id, usuario) {
  const response = await fetch(`http://localhost:3000/usuario/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario)
  });
  return response.json();
}

// Função para obter parâmetro da URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Preencher formulário ao carregar a página
window.addEventListener('DOMContentLoaded', async () => {
  const id = getQueryParam('id');
  if (!id) return;
  const resp = await fetch(`http://localhost:3000/usuario/${id}`);
  if (!resp.ok) return;
  const usuario = await resp.json();
  document.getElementById('usuarioId').value = usuario.idUsuario || usuario.id;
  document.getElementById('firstName').value = usuario.firstName;
  document.getElementById('lastName').value = usuario.lastName;
  document.getElementById('age').value = usuario.age;
  document.getElementById('email').value = usuario.email;
  document.getElementById('phone').value = usuario.phone;
  document.getElementById('address').value = usuario.address;
  document.getElementById('city').value = usuario.city;
  document.getElementById('state').value = usuario.state;
  // birthDate para input type=date
  if (usuario.birthDate) {
    document.getElementById('birthDate').value = usuario.birthDate.substring(0, 10);
  }
});

// Submeter atualização
const form = document.getElementById('formAtualizarUsuario');
if (form) {
  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const id = document.getElementById('usuarioId').value;
    const usuario = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      age: parseInt(document.getElementById('age').value),
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      birthDate: document.getElementById('birthDate').value
    };
    try {
      await atualizarUsuario(id, usuario);
      document.getElementById('mensagem').innerHTML = '<span style="color:green">Usuário atualizado com sucesso!</span>';
    } catch (err) {
      document.getElementById('mensagem').innerHTML = '<span style="color:red">Erro ao atualizar usuário.</span>';
    }
  });
}

// Buscar usuário pelo ID digitado
const btnBuscar = document.getElementById('btnBuscarUsuario');
if (btnBuscar) {
  btnBuscar.addEventListener('click', async () => {
    const id = document.getElementById('buscarIdUsuario').value;
    if (!id) {
      document.getElementById('mensagem').innerHTML = '<span style="color:red">Digite um ID válido.</span>';
      return;
    }
    const resp = await fetch(`http://localhost:3000/usuario/${id}`);
    if (!resp.ok) {
      document.getElementById('mensagem').innerHTML = '<span style="color:red">Usuário não encontrado.</span>';
      return;
    }
    const usuario = await resp.json();
    document.getElementById('usuarioId').value = usuario.idUsuario || usuario.id;
    document.getElementById('firstName').value = usuario.firstName;
    document.getElementById('lastName').value = usuario.lastName;
    document.getElementById('age').value = usuario.age;
    document.getElementById('email').value = usuario.email;
    document.getElementById('phone').value = usuario.phone;
    document.getElementById('address').value = usuario.address;
    document.getElementById('city').value = usuario.city;
    document.getElementById('state').value = usuario.state;
    if (usuario.birthDate) {
      document.getElementById('birthDate').value = usuario.birthDate.substring(0, 10);
    }
    document.getElementById('mensagem').innerHTML = '';
  });
} 