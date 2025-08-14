const tabela = document.getElementById('tabelaUsuarios');
const res = document.getElementById('mensagem');

fetch('http://localhost:3000/usuario')
    .then(resp => resp.json())
    .then(dados => {
        tabela.innerHTML = ""; 

        dados.forEach(usuario => {
            const nascimento = new Date(usuario.birthDate);
            const dia = String(nascimento.getDate()).padStart(2, '0');
            const mes = String(nascimento.getMonth() + 1).padStart(2, '0');
            const ano = nascimento.getFullYear();
            const dataFormatada = `${dia}/${mes}/${ano}`;

            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${usuario.idUsuario}</td>
                <td>${usuario.firstName || ''}</td>
                <td>${usuario.lastName || ''}</td>
                <td>${usuario.age || ''}</td>
                <td>${usuario.email || ''}</td>
                <td>${usuario.phone || ''}</td>
                <td>${usuario.address || ''}</td>
                <td>${usuario.city || ''}</td>
                <td>${usuario.state || ''}</td>
                <td>${dataFormatada}</td>
                <td>
                    <button onclick="apagarUsuario(${usuario.idUsuario})">Apagar</button>
                </td>
            `;
            tabela.appendChild(tr);
        });
    })
    .catch(err => res.innerHTML = "Erro ao listar: " + err);
