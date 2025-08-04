document.getElementById('formConsultarUsuario').addEventListener('submit', async function(event) {
  event.preventDefault();
  const id = document.getElementById('usuarioId').value;
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = '';
  try {
    const response = await fetch(`http://localhost:3000/usuario/${id}`);
    if (!response.ok) throw new Error('Usuário não encontrado');
    const usuario = await response.json();
    resultado.innerHTML = `
      <div class="card">
        <h3>${usuario.firstName} ${usuario.lastName}</h3>
        <p><strong>ID:</strong> ${usuario.idUsuario || usuario.id}</p>
        <p><strong>Idade:</strong> ${usuario.age}</p>
        <p><strong>Email:</strong> ${usuario.email}</p>
        <p><strong>Telefone:</strong> ${usuario.phone}</p>
        <p><strong>Endereço:</strong> ${usuario.address}</p>
        <p><strong>Cidade:</strong> ${usuario.city}</p>
        <p><strong>Estado:</strong> ${usuario.state}</p>
        <p><strong>Data de Nascimento:</strong> ${usuario.birthDate}</p>
      </div>
    `;
  } catch (error) {
    resultado.innerHTML = `<div class='alert alert-danger'>Usuário não encontrado.</div>`;
  }
}); 