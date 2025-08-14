const btnBuscarUsu = document.getElementById('btnBuscarUsuario');
const dadosUsuario = document.getElementById('dadosUsuario');
const btnApagar = document.getElementById('btnApagarUsuario');
const res = document.getElementById('mensagem');

// Busca usuário por ID
btnBuscarUsu.addEventListener('click', () => {
    let id = document.getElementById('buscarIdUsuario').value;
    if (!id) {
        dadosUsuario.innerHTML = "Informe um ID válido.";
        btnApagar.style.display = "none";
        return;
    }

    fetch(`http://localhost:3000/usuario/${id}`)
        .then(resp => {
            if (!resp.ok) throw new Error('Usuário não encontrado');
            return resp.json();
        })
        .then(usuario => {
            if (usuario.idUsuario) {
                dadosUsuario.innerHTML = `
                    <p><strong>${usuario.firstName} ${usuario.lastName}</strong></p>
                    <p>Email: ${usuario.email}</p>
                `;
                btnApagar.style.display = "inline-block";
                btnApagar.setAttribute('data-id', usuario.idUsuario);
            } else {
                dadosUsuario.innerHTML = "Usuário não encontrado.";
                btnApagar.style.display = "none";
            }
        })
        .catch(err => {
            dadosUsuario.innerHTML = "Erro: " + err;
            btnApagar.style.display = "none";
        });
});

// Apaga usuário
btnApagar.addEventListener('click', () => {
    let id = btnApagar.getAttribute('data-id');
    if (!id) return;

    fetch(`http://localhost:3000/usuario/${id}`, { method: 'DELETE' })
        .then(resp => {
            if (!resp.ok) throw new Error('Erro ao apagar usuário');
            return resp.json();
        })
        .then(() => {
            res.innerHTML = "Usuário apagado com sucesso!";
            dadosUsuario.innerHTML = "";
            btnApagar.style.display = "none";
        })
        .catch(err => res.innerHTML = "Erro ao apagar: " + err);
});
