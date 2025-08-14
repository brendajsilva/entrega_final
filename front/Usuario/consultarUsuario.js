let formConsultar = document.getElementById('formConsultarUsuario');
let res = document.getElementById('resultado');

formConsultar.addEventListener('submit', (e) => {
    e.preventDefault();

    let id = document.getElementById('usuarioId').value.trim();
    if (!id) {
        res.innerHTML = "Informe um ID válido.";
        return;
    }

    fetch(`http://localhost:3000/usuario/${id}`)
        .then(resp => {
            if (!resp.ok) throw new Error('Usuário não encontrado');
            return resp.json();
        })
        .then(usuario => {
            if (usuario.idUsuario) {
                const nascimento = new Date(usuario.birthDate);
                const dia = String(nascimento.getDate()).padStart(2, '0');
                const mes = String(nascimento.getMonth() + 1).padStart(2, '0');
                const ano = nascimento.getFullYear();
                const dataFormatada = `${dia}/${mes}/${ano}`;

                res.innerHTML = `
                    <p><strong>ID:</strong> ${usuario.idUsuario}</p>
                    <p><strong>Nome:</strong> ${usuario.firstName} ${usuario.lastName}</p>
                    <p><strong>Idade:</strong> ${usuario.age}</p>
                    <p><strong>Email:</strong> ${usuario.email}</p>
                    <p><strong>Telefone:</strong> ${usuario.phone}</p>
                    <p><strong>Endereço:</strong> ${usuario.address}, ${usuario.city} - ${usuario.state}</p>
                    <p><strong>Data de Nascimento:</strong> ${dataFormatada}</p>
                `;
            } else {
                res.innerHTML = "Usuário não encontrado.";
            }
        })
        .catch(err => res.innerHTML = "Erro: " + err);
});
