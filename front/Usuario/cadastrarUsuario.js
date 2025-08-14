let btnCad = document.getElementById('cadastroUsuario');
let res = document.getElementById('mensagem');

btnCad.addEventListener('click', (e) => {
    e.preventDefault();

    let valores = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        age: Number(document.getElementById('age').value),
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        birthDate: document.getElementById('birthDate').value
    };

    fetch('http://localhost:3000/usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' 
        },
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(data => {
        res.innerHTML = " Usuário cadastrado com sucesso!";
        console.log(data);
    })
    .catch(err => res.innerHTML = " Erro ao cadastrar: " + err);
});
