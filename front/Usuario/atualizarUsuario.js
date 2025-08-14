let btnBuscar = document.getElementById('btnBuscarUsuario');
let formAtualizar = document.getElementById('formAtualizarUsuario');
let res = document.getElementById('mensagem');

btnBuscar.addEventListener('click', () => {
    let id = document.getElementById('buscarIdUsuario').value;
    fetch(`http://localhost:3000/usuario/${id}`)
        .then(resp => {
            if (!resp.ok) throw new Error('Usuário não encontrado');
            return resp.json();
        })
        .then(usuario => {
            document.getElementById('usuarioId').value = usuario.idUsuario;
            formAtualizar.firstName.value = usuario.firstName;
            formAtualizar.lastName.value = usuario.lastName;
            formAtualizar.age.value = usuario.age;
            formAtualizar.email.value = usuario.email;
            formAtualizar.phone.value = usuario.phone;
            formAtualizar.address.value = usuario.address;
            formAtualizar.city.value = usuario.city;
            formAtualizar.state.value = usuario.state;

            // Formata a data para YYYY-MM-DD para o input type="date"
            const nascimento = new Date(usuario.birthDate);
            const ano = nascimento.getFullYear();
            const mes = String(nascimento.getMonth() + 1).padStart(2, '0');
            const dia = String(nascimento.getDate()).padStart(2, '0');
            formAtualizar.birthDate.value = `${ano}-${mes}-${dia}`;
        })
        .catch(err => res.innerHTML = "Erro: " + err);
});

formAtualizar.addEventListener('submit', (e) => {
    e.preventDefault();

    let id = document.getElementById('usuarioId').value;
    let valores = {
        firstName: formAtualizar.firstName.value,
        lastName: formAtualizar.lastName.value,
        age: Number(formAtualizar.age.value),
        email: formAtualizar.email.value,
        phone: formAtualizar.phone.value,
        address: formAtualizar.address.value,
        city: formAtualizar.city.value,
        state: formAtualizar.state.value,
        birthDate: formAtualizar.birthDate.value
    };

    fetch(`http://localhost:3000/usuario/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
    .then(resp => {
        if (!resp.ok) throw new Error('Erro ao atualizar usuário');
        return resp.json();
    })
    .then(() => res.innerHTML = "Usuário atualizado com sucesso!")
    .catch(err => res.innerHTML = "Erro: " + err);
});
